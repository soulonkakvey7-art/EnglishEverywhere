import { DICTIONARY_DATA } from "../dictionaryData";
import { Quiz, QuizQuestion } from "../types";

export interface WordSuggestion {
  word: string;
  letter: string;
}

let allWordsCache: WordSuggestion[] | null = null;

export function getAllWords(): WordSuggestion[] {
  if (allWordsCache) return allWordsCache;

  const suggestions: WordSuggestion[] = [];
  Object.keys(DICTIONARY_DATA).forEach((letter) => {
    DICTIONARY_DATA[letter].words.forEach((entry) => {
      suggestions.push({
        word: entry.word,
        letter: letter
      });
    });
  });

  allWordsCache = suggestions;
  return suggestions;
}

export function getIrregularVerbs() {
  const irregulars: { word: string; letter: string; data: any }[] = [];
  Object.keys(DICTIONARY_DATA).forEach((letter) => {
    DICTIONARY_DATA[letter].words.forEach((entry) => {
      if (entry.isIrregular) {
        irregulars.push({
          word: entry.word,
          letter: letter,
          data: entry
        });
      }
    });
  });
  return irregulars.sort((a, b) => a.word.localeCompare(b.word));
}

export function searchWords(query: string, limit = 5): WordSuggestion[] {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  const allWords = getAllWords();
  
  return allWords
    .filter((s) => s.word.toLowerCase().startsWith(lowerQuery))
    .slice(0, limit);
}

export function generateDictionaryTest(): Quiz {
  const allEntries: { word: string; definition: string; partOfSpeech: string; synonyms?: string[]; antonyms?: string[]; variant?: string; isIrregular?: boolean; origin?: string; example: string }[] = [];
  
  Object.keys(DICTIONARY_DATA).forEach((letter) => {
    DICTIONARY_DATA[letter].words.forEach((entry) => {
      allEntries.push(entry);
    });
  });

  if (allEntries.length === 0) {
    return {
      title: "Dictionary Vocabulary Test",
      questions: []
    };
  }

  // Helper to shuffle array
  const shuffle = <T>(arr: T[]): T[] => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  const questions: QuizQuestion[] = [];
  const shuffledEntries = shuffle(allEntries);
  const usedWords = new Set<string>();

  const irregularVerbs = shuffledEntries.filter(e => e.isIrregular && e.variant);
  const wordsWithSynonyms = shuffledEntries.filter(e => e.synonyms && e.synonyms.length > 0);
  const wordsWithAntonyms = shuffledEntries.filter(e => e.antonyms && e.antonyms.length > 0);
  const wordsWithOrigin = shuffledEntries.filter(e => e.origin);
  const generalWords = shuffledEntries;

  const getIncorrectOptions = (correct: string, pool: string[], count = 3): string[] => {
    const filtered = pool.filter(p => p && p.toLowerCase() !== correct.toLowerCase());
    const unique = Array.from(new Set(filtered));
    return shuffle(unique).slice(0, count);
  };

  const getIncorrectWords = (correct: string, pool: string[], count = 3): string[] => {
    const filtered = pool.filter(p => p && p.toLowerCase() !== correct.toLowerCase());
    const unique = Array.from(new Set(filtered));
    return shuffle(unique).slice(0, count);
  };

  // 1. Word Origin question (aim for 1-2 questions)
  for (const entry of wordsWithOrigin) {
    if (questions.length >= 2) break; // Allow up to 2 origin questions if available
    if (usedWords.has(entry.word)) continue;

    const correctWord = entry.word;
    const otherWords = generalWords.map(w => w.word).filter(w => w !== correctWord);
    const incorrects = getIncorrectWords(correctWord, otherWords, 3);

    if (incorrects.length === 3) {
      questions.push({
        question: `Which English word has the following etymological origin: "${entry.origin}"?`,
        options: shuffle([correctWord, ...incorrects]),
        correctAnswer: correctWord,
        explanation: `The word "${entry.word}" has the origin: "${entry.origin}"`
      });
      usedWords.add(entry.word);
    }
  }

  // 2. Irregular past/participle form questions (aim for 2 questions)
  for (const entry of irregularVerbs) {
    if (questions.length >= 4) break; // 2 origins + 2 irregs = 4
    if (usedWords.has(entry.word)) continue;

    const correctVariant = entry.variant || "";
    const otherVariants = irregularVerbs.map(v => v.variant || "").filter(v => v !== correctVariant);
    const incorrects = getIncorrectOptions(correctVariant, otherVariants, 3);
    
    if (incorrects.length === 3) {
      questions.push({
        question: `What are the past tense and past participle forms of the irregular verb "${entry.word}"?`,
        options: shuffle([correctVariant, ...incorrects]),
        correctAnswer: correctVariant,
        explanation: `The irregular forms of "${entry.word}" are "${correctVariant}". Example: ${entry.example}`
      });
      usedWords.add(entry.word);
    }
  }

  // 3. Synonyms questions (aim for 4 questions)
  for (const entry of wordsWithSynonyms) {
    if (questions.length >= 8) break; // 4 + 4 = 8
    if (usedWords.has(entry.word)) continue;

    const correctSynonym = entry.synonyms![0];
    const otherSynonyms = wordsWithSynonyms.flatMap(w => w.synonyms || []).filter(s => s !== correctSynonym);
    const incorrects = getIncorrectOptions(correctSynonym, otherSynonyms, 3);

    if (incorrects.length === 3) {
      questions.push({
        question: `Which of the following is a synonym of the word "${entry.word}"?`,
        options: shuffle([correctSynonym, ...incorrects]),
        correctAnswer: correctSynonym,
        explanation: `"${correctSynonym}" is a synonym of "${entry.word}", which means "${entry.definition}".`
      });
      usedWords.add(entry.word);
    }
  }

  // 4. Antonyms questions (aim for 3 questions)
  for (const entry of wordsWithAntonyms) {
    if (questions.length >= 11) break; // 8 + 3 = 11
    if (usedWords.has(entry.word)) continue;

    const correctAntonym = entry.antonyms![0];
    const otherAntonyms = wordsWithAntonyms.flatMap(w => w.antonyms || []).filter(a => a !== correctAntonym);
    const incorrects = getIncorrectOptions(correctAntonym, otherAntonyms, 3);

    if (incorrects.length === 3) {
      questions.push({
        question: `Which of the following is an antonym (opposite meaning) of the word "${entry.word}"?`,
        options: shuffle([correctAntonym, ...incorrects]),
        correctAnswer: correctAntonym,
        explanation: `"${correctAntonym}" is an antonym of "${entry.word}", which means "${entry.definition}".`
      });
      usedWords.add(entry.word);
    }
  }

  // 5. Part of speech questions (aim for 4 questions)
  const posMapFull: Record<string, string> = {
    noun: "Noun",
    verb: "Verb",
    adj: "Adjective",
    adv: "Adverb",
    prep: "Preposition",
    pron: "Pronoun",
    conj: "Conjunction",
    interj: "Interjection",
    excl: "Interjection"
  };

  for (const entry of generalWords) {
    if (questions.length >= 15) break; // 11 + 4 = 15
    if (usedWords.has(entry.word)) continue;

    const cleanPosKey = Object.keys(posMapFull).find(k => entry.partOfSpeech.toLowerCase().includes(k));
    if (!cleanPosKey) continue;
    const correctPos = posMapFull[cleanPosKey];

    const otherPoss = Object.values(posMapFull).filter(p => p !== correctPos);
    const incorrects = getIncorrectOptions(correctPos, otherPoss, 3);

    if (incorrects.length === 3) {
      questions.push({
        question: `What is the part of speech of the word "${entry.word}"?`,
        options: shuffle([correctPos, ...incorrects]),
        correctAnswer: correctPos,
        explanation: `The word "${entry.word}" is a ${correctPos.toLowerCase()}. Definition: "${entry.definition}"`
      });
      usedWords.add(entry.word);
    }
  }

  // 6. Definition questions (aim for 20 questions total)
  for (const entry of generalWords) {
    if (questions.length >= 20) break;
    if (usedWords.has(entry.word)) continue;

    const correctDef = entry.definition;
    const otherDefs = generalWords.map(g => g.definition).filter(d => d !== correctDef);
    const incorrects = getIncorrectOptions(correctDef, otherDefs, 3);

    if (incorrects.length === 3) {
      questions.push({
        question: `What is the correct definition of the word "${entry.word}"?`,
        options: shuffle([correctDef, ...incorrects]),
        correctAnswer: correctDef,
        explanation: `"${entry.word}" means "${entry.definition}". Example: "${entry.example}"`
      });
      usedWords.add(entry.word);
    }
  }

  // Fill remaining questions if any to guarantee exactly 20 questions
  if (questions.length < 20) {
    for (const entry of generalWords) {
      if (questions.length >= 20) break;
      if (usedWords.has(entry.word)) continue;
      
      const correctDef = entry.definition;
      const otherDefs = generalWords.map(g => g.definition).filter(d => d !== correctDef);
      const incorrects = getIncorrectOptions(correctDef, otherDefs, 3);

      if (incorrects.length === 3) {
        questions.push({
          question: `What is the correct definition of the word "${entry.word}"?`,
          options: shuffle([correctDef, ...incorrects]),
          correctAnswer: correctDef,
          explanation: `"${entry.word}" means "${entry.definition}". Example: "${entry.example}"`
        });
        usedWords.add(entry.word);
      }
    }
  }

  return {
    title: "Essential Dictionary Overall Test",
    questions: shuffle(questions)
  };
}
