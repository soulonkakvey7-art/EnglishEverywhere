import { useState, useEffect } from "react";
import { LOCAL_KHMER_TRANSLATIONS } from "./localDictionaryTranslations";
import { 
  getTranslationsFromDB, 
  saveTranslationsToDB, 
  getTranslationsForLetter, 
  saveTranslationsForLetter 
} from "./firebase";
import { translateWordsBatch } from "./geminiService";

// In-memory cache for fast lookups
const memoryCache: Record<string, string> = { ...LOCAL_KHMER_TRANSLATIONS };


// Queue of words waiting to be translated
const queue: Set<string> = new Set();
const subscribers: Set<() => void> = new Set();
let timeoutId: any = null;

// Subscribe to cache updates
export function subscribeToTranslations(callback: () => void) {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
}

function notifySubscribers() {
  subscribers.forEach(cb => cb());
}

// Get translation synchronously if cached
export function getCachedTranslation(word: string): string | null {
  const w = word.toLowerCase().trim();
  return memoryCache[w] || null;
}

// Request translation of a word (non-blocking, batched)
export function requestTranslation(word: string) {
  const w = word.toLowerCase().trim();
  if (memoryCache[w] || queue.has(w)) return;

  queue.add(w);

  // Debounce/batch requests
  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(processQueue, 150);
}

async function processQueue() {
  const wordsToTranslate = Array.from(queue);
  queue.clear();
  if (wordsToTranslate.length === 0) return;

  try {
    // 1. Try to load from Firestore cache
    const fromDB = await getTranslationsFromDB(wordsToTranslate);
    Object.entries(fromDB).forEach(([word, khmer]) => {
      memoryCache[word] = khmer;
    });

    const stillMissing = wordsToTranslate.filter(w => !memoryCache[w]);

    // 2. If still missing, translate using Gemini
    if (stillMissing.length > 0) {
      // Slice into chunks of 25 to keep Gemini requests highly stable
      const chunkSize = 25;
      for (let i = 0; i < stillMissing.length; i += chunkSize) {
        const chunk = stillMissing.slice(i, i + chunkSize);
        const geminiTranslations = await translateWordsBatch(chunk);
        
        Object.entries(geminiTranslations).forEach(([word, khmer]) => {
          memoryCache[word.toLowerCase()] = khmer;
        });

        // Save new translations to Firestore so they are shared
        await saveTranslationsToDB(geminiTranslations);
      }
    }

    // Notify all active components that translations have loaded!
    notifySubscribers();
  } catch (err) {
    console.error("Error processing translation queue:", err);
  }
}

// Custom React Hook to consume Khmer translations reactively
export function useKhmerTranslation(word: string): string | null {
  const [translation, setTranslation] = useState<string | null>(() => getCachedTranslation(word));

  useEffect(() => {
    const cached = getCachedTranslation(word);
    if (cached) {
      setTranslation(cached);
      return;
    }

    // Subscribe to updates
    const unsubscribe = subscribeToTranslations(() => {
      const updated = getCachedTranslation(word);
      if (updated) {
        setTranslation(updated);
      }
    });

    // Request translation
    requestTranslation(word);

    return unsubscribe;
  }, [word]);

  return translation;
}

// Prefetch translations for a bulk list of words (e.g. from a selected letter or search)
export async function preloadTranslationsForWords(letter: string, words: string[]): Promise<void> {
  if (!letter || words.length === 0) return;
  const cleanLetter = letter.trim().toLowerCase();
  
  try {
    // 1. Fetch letter-wide document from Firestore
    const cachedLetterTranslations = await getTranslationsForLetter(cleanLetter);
    let updated = false;

    // Merge whatever we found into our in-memory memoryCache
    Object.entries(cachedLetterTranslations).forEach(([word, khmer]) => {
      const lowerWord = word.toLowerCase().trim();
      if (!memoryCache[lowerWord]) {
        memoryCache[lowerWord] = khmer;
        updated = true;
      }
    });

    if (updated) {
      notifySubscribers();
    }

    // 2. See what words are still missing from the local memoryCache
    const missing = words
      .map(w => w.toLowerCase().trim())
      .filter(w => !memoryCache[w]);

    if (missing.length > 0) {
      // Slice into chunk sizes of 40 to translate via Gemini in parallel
      const chunkSize = 40;
      const allNewTranslations: Record<string, string> = { ...cachedLetterTranslations };

      for (let i = 0; i < missing.length; i += chunkSize) {
        const chunk = missing.slice(i, i + chunkSize);
        try {
          const geminiTranslations = await translateWordsBatch(chunk);
          
          Object.entries(geminiTranslations).forEach(([word, khmer]) => {
            const lowerWord = word.toLowerCase().trim();
            memoryCache[lowerWord] = khmer;
            allNewTranslations[lowerWord] = khmer;
          });

          // Notify UI to render what we got so far progressively!
          notifySubscribers();
        } catch (err) {
          console.error(`Error translating chunk ${i} for letter ${letter}:`, err);
        }
      }

      // 3. Save the updated letter-wide document back to Firestore
      await saveTranslationsForLetter(cleanLetter, allNewTranslations);
    }
  } catch (err) {
    console.error(`Error in preloadTranslationsForWords for letter ${letter}:`, err);
  }
}


