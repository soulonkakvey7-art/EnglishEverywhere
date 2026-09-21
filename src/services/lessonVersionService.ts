import { PRE_GENERATED_LESSONS, getLocalFallbackLesson } from '../data/preGeneratedLessons';
import { clearAllLocalLessons, saveLocalCachedLesson } from './localDb';

export const LESSON_VERSION = '2.1';
export const LESSON_VERSION_KEY = 'app_lesson_version';
export const SAVED_LESSONS_KEY = 'app_saved_lessons';

/**
 * Validates that cached lesson content corresponds to the expected topic in the cache key.
 * Protects against accidental mismatched fallbacks (e.g. Mixed Conditionals mapped to Conditional Sentences).
 */
export function isLessonContentMatchingTopic(cacheKey: string, lessonContent: any): boolean {
  if (!lessonContent || typeof lessonContent !== 'object') return false;
  const title = (lessonContent.title || '').trim().toLowerCase();
  if (!title) return false;

  const keyLower = cacheKey.toLowerCase();

  // Strict check: if key is for a specific conditional (mixed, zero, first, second, third, inverted),
  // it MUST NOT have the generic title "Conditional Sentences"
  const isSpecificConditionalKey = 
    keyLower.includes('mixed') ||
    keyLower.includes('zero') ||
    keyLower.includes('first') ||
    keyLower.includes('second') ||
    keyLower.includes('third') ||
    keyLower.includes('invert');

  if (isSpecificConditionalKey && (title === 'conditional sentences' || title === 'conditionals sentences' || title === 'conditional sentence')) {
    return false;
  }

  return true;
}

/**
 * Checks whether the stored lesson version in localStorage matches the current LESSON_VERSION.
 */
export function isLessonVersionCurrent(): boolean {
  try {
    return localStorage.getItem(LESSON_VERSION_KEY) === LESSON_VERSION;
  } catch {
    return false;
  }
}

/**
 * Clears old cached lesson data from localStorage and IndexedDB
 * while ensuring user scores, badges, and streaks remain completely intact.
 */
export function clearOldLessonCache(): void {
  try {
    // Clear outdated lesson caches from localStorage
    localStorage.removeItem(SAVED_LESSONS_KEY);
    localStorage.removeItem('english_everywhere_cache');
    localStorage.removeItem('english_everywhere_cache_version');

    // Remove any loose legacy lesson keys in localStorage
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('lesson_') || key.startsWith('vocab_') || key.startsWith('idiom_'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));

    // Clear outdated lessons in IndexedDB
    clearAllLocalLessons().catch(err => {
      console.warn('Error clearing IndexedDB lessons during version update:', err);
    });
  } catch (e) {
    console.warn('Warning while clearing old lesson cache:', e);
  }
}

/**
 * Returns fresh updated pre-generated lesson library content.
 */
export function getFreshLessonContent(): Record<string, any> {
  const fresh: Record<string, any> = {};

  // Hydrate all available comprehensive lessons from PRE_GENERATED_LESSONS
  for (const [key, lesson] of Object.entries(PRE_GENERATED_LESSONS)) {
    fresh[key] = lesson;
  }

  return fresh;
}

/**
 * Loads all saved lessons directly from localStorage.
 */
export function getSavedLessonsFromLocalStorage(): Record<string, any> {
  try {
    const raw = localStorage.getItem(SAVED_LESSONS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch (e) {
    console.warn('Failed to parse saved lessons from localStorage:', e);
    return {};
  }
}

/**
 * Retrieves a specific saved lesson directly from localStorage or fallback library.
 */
export function getSavedLessonDirectly(cacheKey: string): any | null {
  try {
    const saved = getSavedLessonsFromLocalStorage();
    if (saved[cacheKey]) {
      if (isLessonContentMatchingTopic(cacheKey, saved[cacheKey])) {
        return saved[cacheKey];
      } else {
        // Discard poisoned / mismatched cache entry immediately
        delete saved[cacheKey];
        try {
          localStorage.setItem(SAVED_LESSONS_KEY, JSON.stringify(saved));
        } catch { /* ignore */ }
      }
    }
    // Also check if available in fresh pre-generated library
    const fallback = getLocalFallbackLesson(cacheKey);
    if (fallback && isLessonContentMatchingTopic(cacheKey, fallback)) {
      // Save it to localStorage so future reads are instantaneous
      saveLessonToLocalStorage(cacheKey, fallback);
      return fallback;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Saves a single lesson to localStorage under SAVED_LESSONS_KEY,
 * and sets the app_lesson_version.
 */
export function saveLessonToLocalStorage(cacheKey: string, lessonContent: any): void {
  try {
    const current = getSavedLessonsFromLocalStorage();
    current[cacheKey] = lessonContent;

    // Save back to localStorage safely
    try {
      localStorage.setItem(SAVED_LESSONS_KEY, JSON.stringify(current));
    } catch (quotaError) {
      console.warn('localStorage quota warning when saving lesson. Pruning old non-core lessons...', quotaError);
      // If quota exceeded, keep only the most essential 30 lessons
      const entries = Object.entries(current);
      if (entries.length > 30) {
        const pruned = Object.fromEntries(entries.slice(-30));
        pruned[cacheKey] = lessonContent;
        try {
          localStorage.setItem(SAVED_LESSONS_KEY, JSON.stringify(pruned));
        } catch {}
      }
    }

    // Ensure lesson version is recorded
    localStorage.setItem(LESSON_VERSION_KEY, LESSON_VERSION);

    // Also persist to IndexedDB asynchronously for robust backup
    saveLocalCachedLesson(cacheKey, lessonContent).catch(() => {});
  } catch (e) {
    console.warn('Could not save lesson to localStorage:', e);
  }
}

/**
 * Saves multiple lessons to localStorage and updates the version key.
 */
export function saveAllLessonsToLocalStorage(lessons: Record<string, any>): void {
  try {
    localStorage.setItem(SAVED_LESSONS_KEY, JSON.stringify(lessons));
    localStorage.setItem(LESSON_VERSION_KEY, LESSON_VERSION);
  } catch (e) {
    console.warn('Failed to save all lessons to localStorage:', e);
  }
}

/**
 * Initializes the version and cache system:
 * - If version does NOT match: clears old cached data, loads fresh updated lessons,
 *   saves to localStorage, and updates localStorage.setItem("app_lesson_version", LESSON_VERSION).
 * - If version MATCHES: loads saved lessons directly from localStorage.
 */
export function initLessonVersioning(): Record<string, any> {
  try {
    const storedVersion = localStorage.getItem(LESSON_VERSION_KEY);

    if (storedVersion !== LESSON_VERSION) {
      console.log(`[Versioning] Detected outdated or missing lesson version (${storedVersion} -> ${LESSON_VERSION}). Refreshing cache...`);
      // 1. Clear old cached lesson data
      clearOldLessonCache();

      // 2. Load fresh updated lesson content
      const freshContent = getFreshLessonContent();

      // 3. Save new lesson content and update localStorage with LESSON_VERSION
      saveAllLessonsToLocalStorage(freshContent);

      return freshContent;
    } else {
      console.log(`[Versioning] Lesson version ${LESSON_VERSION} matches localStorage. Loading saved lessons directly from localStorage.`);
      const saved = getSavedLessonsFromLocalStorage();

      // If empty for some reason, hydrate with fresh content
      if (Object.keys(saved).length === 0) {
        const fresh = getFreshLessonContent();
        saveAllLessonsToLocalStorage(fresh);
        return fresh;
      }

      return saved;
    }
  } catch (e) {
    console.error('Error during initLessonVersioning:', e);
    return getFreshLessonContent();
  }
}
