import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, getDocFromServer } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";
import { getLocalFallbackLesson } from "../data/preGeneratedLessons";

const app = initializeApp(firebaseConfig);

// Initialize Firestore with the named database ID as required by Firebase skill
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): FirestoreErrorInfo {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.warn('Firestore Notice: ', JSON.stringify(errInfo));
  return errInfo;
}

// Timeout helper to ensure network delays or offline states never stall the UI
function withTimeout<T>(promise: Promise<T>, timeoutMs = 3500): Promise<T | null> {
  return Promise.race([
    promise,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), timeoutMs))
  ]);
}

// Validate connection to Firestore as per SKILL.md guidelines
async function testConnection() {
  try {
    await withTimeout(getDocFromServer(doc(db, 'test', 'connection')), 4000);
    console.log("Firebase connection validated successfully.");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Please check your Firebase configuration: client is offline.");
    } else {
      console.log("Firebase initialized in standard mode.");
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
    const docSnap = await withTimeout(getDoc(docRef), 3500);
    if (docSnap && docSnap.exists()) {
      return docSnap.data().content;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `cached_lessons/${key}`);
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
    handleFirestoreError(error, OperationType.WRITE, `cached_lessons/${key}`);
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
      const snap = await withTimeout(getDoc(docRef), 3000);
      if (snap && snap.exists()) {
        const data = snap.data();
        if (data && data.khmer) {
          results[cleanWord.toLowerCase()] = data.khmer;
        }
      }
    });
    await Promise.all(promises);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, "dictionary_translations");
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
    handleFirestoreError(error, OperationType.WRITE, "dictionary_translations");
  }
}

export async function getTranslationsForLetter(letter: string): Promise<Record<string, string>> {
  const cleanLetter = letter.trim().toLowerCase();
  if (!cleanLetter) return {};
  try {
    const docRef = doc(db, "dictionary_letters", cleanLetter);
    const snap = await withTimeout(getDoc(docRef), 3000);
    if (snap && snap.exists()) {
      const data = snap.data();
      return data.translations || {};
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `dictionary_letters/${cleanLetter}`);
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
    handleFirestoreError(error, OperationType.WRITE, `dictionary_letters/${cleanLetter}`);
  }
}


