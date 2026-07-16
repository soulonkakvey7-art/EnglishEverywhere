import { initializeApp } from "firebase/app";
import { initializeFirestore, doc, getDoc, setDoc, getDocFromServer } from "firebase/firestore";
import { getLocalFallbackLesson } from "../data/preGeneratedLessons";

const firebaseConfig = {
  projectId: "zippy-reflector-fn50x",
  appId: "1:591037436923:web:82918d956a365bb170b15e",
  apiKey: "AIzaSyBSm1bG0bKadj6fiyNgZuCewrvG0xXfhOA",
  authDomain: "zippy-reflector-fn50x.firebaseapp.com",
  storageBucket: "zippy-reflector-fn50x.firebasestorage.app",
  messagingSenderId: "591037436923"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore with the named database ID and force long polling for iframe connectivity
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
}, "ai-studio-englisheverywher-3b1ac224-9e77-4879-9b91-a7cd1d4e5b3e");

// Validate connection to Firestore as per SKILL.md guidelines
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firebase connection validated successfully.");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Please check your Firebase configuration: client is offline.");
    } else {
      console.log("Firebase initialized (offline or pending first fetch).");
    }
  }
}
testConnection();

export async function getCachedLesson(key: string): Promise<any | null> {
  // First check if we have a premium pre-generated static fallback for this key
  const localFallback = getLocalFallbackLesson(key);
  if (localFallback) {
    console.log(`Loaded lesson from premium local static fallback library: ${key}`);
    return localFallback;
  }

  try {
    // Sanitize the key for document ID usage just in case (slash is forbidden in doc IDs)
    const docId = key.replace(/\//g, "_");
    const docRef = doc(db, "cached_lessons", docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().content;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving cached lesson:", error);
    return null;
  }
}

export async function saveCachedLesson(
  key: string,
  data: {
    type: string;
    topic: string;
    level?: string;
    category?: string;
    content: any;
  }
): Promise<void> {
  try {
    const docId = key.replace(/\//g, "_");
    const docRef = doc(db, "cached_lessons", docId);
    await setDoc(docRef, {
      key,
      type: data.type,
      topic: data.topic,
      level: data.level || "",
      category: data.category || "",
      content: data.content,
      createdAt: new Date().toISOString()
    });
    console.log(`Successfully cached lesson: ${key}`);
  } catch (error) {
    console.error("Error saving lesson to cache:", error);
  }
}

export async function getTranslationsFromDB(words: string[]): Promise<Record<string, string>> {
  const results: Record<string, string> = {};
  if (!words || words.length === 0) return results;
  
  try {
    const promises = words.map(async (word) => {
      const cleanWord = word.trim();
      if (!cleanWord) return;
      const docId = cleanWord.toLowerCase().replace(/\//g, "_").replace(/\./g, "_");
      const docRef = doc(db, "dictionary_translations", docId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        if (data && data.khmer) {
          results[cleanWord.toLowerCase()] = data.khmer;
        }
      }
    });
    await Promise.all(promises);
  } catch (error) {
    console.error("Error getting translations from DB:", error);
  }
  return results;
}

export async function saveTranslationsToDB(translations: Record<string, string>): Promise<void> {
  try {
    const promises = Object.entries(translations).map(async ([word, khmer]) => {
      const cleanWord = word.trim();
      if (!cleanWord || !khmer) return;
      const docId = cleanWord.toLowerCase().replace(/\//g, "_").replace(/\./g, "_");
      const docRef = doc(db, "dictionary_translations", docId);
      await setDoc(docRef, {
        word: cleanWord,
        khmer: khmer.trim(),
        updatedAt: new Date().toISOString()
      }, { merge: true });
    });
    await Promise.all(promises);
  } catch (error) {
    console.error("Error saving translations to DB:", error);
  }
}

export async function getTranslationsForLetter(letter: string): Promise<Record<string, string>> {
  const cleanLetter = letter.trim().toLowerCase();
  if (!cleanLetter) return {};
  try {
    const docRef = doc(db, "dictionary_letters", cleanLetter);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      return data.translations || {};
    }
  } catch (error) {
    console.error(`Error getting translations for letter ${letter}:`, error);
  }
  return {};
}

export async function saveTranslationsForLetter(letter: string, translations: Record<string, string>): Promise<void> {
  const cleanLetter = letter.trim().toLowerCase();
  if (!cleanLetter) return;
  try {
    const docRef = doc(db, "dictionary_letters", cleanLetter);
    await setDoc(docRef, {
      translations: translations,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error(`Error saving translations for letter ${letter}:`, error);
  }
}


