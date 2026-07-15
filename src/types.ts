export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type GrammarCategory = 'Levels' | 'PartsOfSpeech' | 'Tenses' | 'Idioms' | 'LearningPath';

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  topics: {
    title: string;
    type: 'grammar' | 'vocabulary' | 'idiom';
    category?: GrammarCategory;
    level?: CEFRLevel;
  }[];
}

export interface GrammarTopic {
  id: string;
  title: string;
  level?: CEFRLevel;
  category: GrammarCategory;
}

export interface LessonContent {
  title: string;
  explanation: string;
  explanationKhmer?: string;
  examples: string[];
  structure?: {
    affirmative: string;
    negative: string;
    question: string;
  };
}

export interface VocabularyWord {
  word: string;
  ipa: string;
  partOfSpeech: string;
  definition: string;
  examples: string[];
  origin?: string;
  translationKhmer?: string;
}

export interface VocabularyLesson {
  topic: string;
  words: VocabularyWord[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

export type DrillType = 'fill_blanks' | 'reorder' | 'structure';

export interface DrillQuestion {
  type: DrillType;
  prompt: string;
  options?: string[]; // For structure or reorder (words)
  blanks?: string[]; // For fill_blanks parts
  solution: string; // The full correct phrase/sentence
  hints: string[];
}

export interface DrillSet {
  topic: string;
  drills: DrillQuestion[];
}

export type ViewState = 
  | { type: 'home' }
  | { type: 'grammar_menu'; category: GrammarCategory }
  | { type: 'grammar_level_menu'; level: CEFRLevel }
  | { type: 'grammar_lesson'; topic: string; level?: CEFRLevel; category: GrammarCategory }
  | { type: 'grammar_test'; topic: string; level?: CEFRLevel; category: GrammarCategory; isOverall?: boolean }
  | { type: 'grammar_drills'; topic: string; level?: CEFRLevel; category: GrammarCategory }
  | { type: 'idiom_menu' }
  | { type: 'idiom_topics'; category: string }
  | { type: 'vocabulary_menu' }
  | { type: 'vocabulary_lesson'; topic: string }
  | { type: 'vocabulary_test'; topic: string; isOverall?: boolean }
  | { type: 'search_results'; query: string }
  | { type: 'learning_paths' }
  | { type: 'learning_path_detail'; pathId: string }
  | { type: 'dictionary_menu' }
  | { type: 'dictionary_letter'; letter: string }
  | { type: 'dictionary_irregular' }
  | { type: 'dictionary_test' }
  | { type: 'ask_ai' }
  | { type: 'translate' };

export interface DictionaryEntry {
  word: string;
  ipa: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  variant?: string;
  isIrregular?: boolean;
  synonyms?: string[];
  antonyms?: string[];
  origin?: string;
}

export interface DictionaryLetterSet {
  letter: string;
  words: DictionaryEntry[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  awardedAt: number;
}

export interface UserProgress {
  completedLessons: string[]; // array of topic IDs or cacheKeys
  completedQuizzes: Record<string, number>; // cacheKey -> best score (%)
  points: number;
  badges: Badge[];
  streak: number;
  lastActiveDate: string | null; // ISO date string
}

export interface TranslationResult {
  translatedText: string;
  detectedSourceLanguage?: string;
  pronunciationGuide?: string;
  breakdown?: { word: string; pos: string; definition: string; translation: string }[];
  examples?: { original: string; translation: string }[];
  alternatives?: string[];
}

export interface QuizAnalysisResult {
  summary: string;
  insights: string[];
  recommendations: string[];
}

