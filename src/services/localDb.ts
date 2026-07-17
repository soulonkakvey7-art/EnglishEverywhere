const DB_NAME = 'english_everywhere_local_db';
const STORE_NAME = 'lessons_cache';
const DB_VERSION = 1;

let dbInstance: IDBDatabase | null = null;

export function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };

      request.onsuccess = () => {
        dbInstance = request.result;
        resolve(dbInstance);
      };

      request.onerror = () => {
        reject(request.error || new Error('Failed to open IndexedDB'));
      };
    } catch (error) {
      reject(error);
    }
  });
}

export async function getLocalCachedLesson(key: string): Promise<any | null> {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (error) {
    console.error('Error in getLocalCachedLesson from IndexedDB:', error);
    return null;
  }
}

export async function saveLocalCachedLesson(key: string, value: any): Promise<void> {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(value, key);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (error) {
    console.error('Error in saveLocalCachedLesson to IndexedDB:', error);
  }
}

export async function getAllLocalLessons(): Promise<Record<string, any>> {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const results: Record<string, any> = {};

      if (store.getAllKeys && store.getAll) {
        const keysRequest = store.getAllKeys();
        keysRequest.onsuccess = () => {
          const keys = keysRequest.result as string[];
          const valuesRequest = store.getAll();
          valuesRequest.onsuccess = () => {
            const values = valuesRequest.result;
            keys.forEach((key, index) => {
              results[key] = values[index];
            });
            resolve(results);
          };
          valuesRequest.onerror = () => reject(valuesRequest.error);
        };
        keysRequest.onerror = () => reject(keysRequest.error);
      } else {
        // Fallback for older browsers
        const request = store.openCursor();
        request.onsuccess = (event) => {
          const cursor = (event.target as any).result;
          if (cursor) {
            results[cursor.key as string] = cursor.value;
            cursor.continue();
          } else {
            resolve(results);
          }
        };
        request.onerror = () => {
          reject(request.error);
        };
      }
    });
  } catch (error) {
    console.error('Error in getAllLocalLessons from IndexedDB:', error);
    return {};
  }
}
