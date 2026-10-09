import { GoogleGenAI, Type } from "@google/genai";
import { LessonContent, VocabularyLesson, Quiz, CEFRLevel, DrillSet, DictionaryEntry, DictionaryLetterSet, TranslationResult, QuizAnalysisResult } from "../types";
import { balanceQuizOptions } from "../utils/quizUtils";
import { getCuratedOverallTest, getCuratedLevelTest } from "../data/overallTestBank";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function withRetry<T>(fn: () => Promise<T>, retries = 5, delay = 2000): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    const errorStr = JSON.stringify(error).toLowerCase();
    const isQuotaError = errorStr.includes('429') || 
                        errorStr.includes('resource_exhausted') || 
                        errorStr.includes('quota');
    
    if (retries > 0 && isQuotaError) {
      console.warn(`Quota hit, retrying in ${delay}ms... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

export async function generateGrammarTopics(level: CEFRLevel): Promise<string[]> {
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide an exhaustive list of grammar topics for the CEFR ${level} level. Return a JSON array of strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text);
  });
}

export async function generateGrammarLesson(topic: string, level?: string): Promise<LessonContent> {
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain the English grammar topic: "${topic}" ${level ? `for level ${level}` : ''}.
      Provide a significantly thorough, in-depth, and comprehensive conceptual breakdown in the 'explanation' field tailored specifically to this topic:
      1. Core Concept & Underlying Logic: Explain the fundamental nature, purpose, and communicative role of this grammar concept. Why does it exist and how does it work conceptually?
      2. Classifications, Rules & Patterns: Provide an organized breakdown of its key types, positions, grammatical rules, and syntactic behaviors.
      3. Everyday Context & Practical Illustrative Examples: Naturally integrate clear, realistic examples directly within the explanatory text to demonstrate how the grammar behaves in real conversations, writing, and professional situations.
      4. Nuances, Pitfalls & Essential Learning Tips: Point out common mistakes learners often make, why they happen, how to avoid them, and practical memory shortcuts.
      5. Do NOT force rigid tense formulas or artificial signal word boxes; let the explanation flow naturally and pedagogically according to the unique subject matter.
      6. Provide at least 12-15 varied, high-quality, and realistic sentences in the 'examples' array to cover all facets of the topic.
      IMPORTANT: In each example sentence in the 'examples' array, wrap the specific word(s) or phrase(s) demonstrating the grammar rule in double asterisks like **this**.
      If this topic has standard grammatical sentence structures (like Affirmative, Negative, and Question formulas/forms, e.g., for modals, pronouns, modifiers, etc.), include them in the optional 'structure' object.
      Also, provide a complete, rich translation and pedagogical explanation of the topic into Khmer in the 'explanationKhmer' field. Keep standard English grammatical terms in English within the Khmer explanation for clarity.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            explanation: { type: Type.STRING },
            explanationKhmer: { type: Type.STRING },
            structure: {
              type: Type.OBJECT,
              properties: {
                affirmative: { type: Type.STRING },
                negative: { type: Type.STRING },
                question: { type: Type.STRING }
              },
              required: ["affirmative", "negative", "question"]
            },
            examples: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "explanation", "explanationKhmer", "examples"]
        }
      }
    });
    return JSON.parse(response.text);
  });
}

export async function generateTenseLesson(tense: string): Promise<LessonContent & { structure: { affirmative: string, negative: string, question: string, notes?: string } }> {
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain the English tense: "${tense}". 
      Provide a beginner-friendly, deeply comprehensive breakdown with:
      1. Formula & Sentence Structure showing Positive (+), Negative (-), and Question (?) sentence patterns, along with critical learner notes.
      2. Usages: Specific situations (when and why to use it) with clear beginner explanations and 2 practical example sentences per usage rule.
      3. Signal Words & Keywords: All common time markers and adverbs of frequency, plus a helpful learner tip on how to identify the tense, and example sentences.
      4. At least 6-8 varied, high-quality examples.
      IMPORTANT: In each example sentence, wrap the verb(s) and keywords demonstrating the tense in double asterisks like **this**.
      Also, provide a complete translation of the detailed explanation into Khmer in the 'explanationKhmer' field. For English grammatical terms or words that do not need translation, keep them in English within the Khmer explanation.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            explanation: { type: Type.STRING },
            explanationKhmer: { type: Type.STRING },
            structure: {
              type: Type.OBJECT,
              properties: {
                affirmative: { type: Type.STRING },
                negative: { type: Type.STRING },
                question: { type: Type.STRING },
                notes: { type: Type.STRING }
              },
              required: ["affirmative", "negative", "question"]
            },
            usages: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  situation: { type: Type.STRING },
                  description: { type: Type.STRING },
                  examples: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ["situation", "description", "examples"]
              }
            },
            signalWords: {
              type: Type.OBJECT,
              properties: {
                keywords: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                tip: { type: Type.STRING },
                examples: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["keywords", "tip"]
            },
            examples: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "explanation", "explanationKhmer", "structure", "examples"]
        }
      }
    });
    return JSON.parse(response.text);
  });
}

export async function generateVocabularyLesson(topic: string): Promise<VocabularyLesson> {
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a COMPREHENSIVE and EXHAUSTIVE list of words and essential terms for the English vocabulary topic: "${topic}".
      Include a wide variety of words covering different aspects of the situation (e.g., for a "Restaurant": menu items, staff, physical objects, actions/verbs, and descriptive adjectives).
      For EACH word, provide:
      1. The part of speech (noun, verb, adjective, etc.)
      2. The IPA phonetic transcription
      3. A detailed, clear definition
      4. Exactly 5 highly detailed and natural example sentences demonstrating diverse usages, settings, and conversational contexts for the word.
      5. The Khmer translation/word equivalent in the 'translationKhmer' field (e.g., if the word is 'Son', translationKhmer should be 'កូនប្រុស'). Only the word itself is translated, do not translate the definitions or examples into Khmer unless specified.
      
      Aim to provide a massive, comprehensive list of at least 50-60 high-quality, relevant words and essential terms to ensure extremely exhaustive, detailed coverage of the topic.
      IMPORTANT: In each example sentence, wrap the target word in double asterisks like **this**.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING },
            words: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  word: { type: Type.STRING },
                  partOfSpeech: { type: Type.STRING },
                  ipa: { type: Type.STRING },
                  definition: { type: Type.STRING },
                  translationKhmer: { type: Type.STRING },
                  examples: { 
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                  }
                },
                required: ["word", "partOfSpeech", "ipa", "definition", "translationKhmer", "examples"]
              }
            }
          },
          required: ["topic", "words"]
        }
      }
    });
    return JSON.parse(response.text);
  });
}

export async function generateIdiomTopics(category: string): Promise<string[]> {
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a comprehensive list of English idiom sub-categories or specific common idioms for the category: "${category}". Return a JSON array of strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text);
  });
}

export async function generateIdiomLesson(topic: string): Promise<VocabularyLesson> {
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a detailed list of English idioms related to: "${topic}".
      For EACH idiom, provide the part of speech (usually 'idiom' or 'phrase'), the IPA (optional if standard), a clear definition, the historical origin (brief), and exactly 4 diverse example sentences showcasing real-world application.
      Include at least 10-12 idioms.
      IMPORTANT: In each example sentence, wrap the idiom itself in double asterisks like **this**.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING },
            words: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  word: { type: Type.STRING },
                  partOfSpeech: { type: Type.STRING },
                  ipa: { type: Type.STRING },
                  definition: { type: Type.STRING },
                  origin: { type: Type.STRING },
                  examples: { 
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                  }
                },
                required: ["word", "partOfSpeech", "definition", "origin", "examples"]
              }
            }
          },
          required: ["topic", "words"]
        }
      }
    });
    return JSON.parse(response.text);
  });
}

export async function generateQuiz(
  topic: string, 
  type: 'grammar' | 'vocabulary', 
  level?: string, 
  isOverall?: boolean,
  excludedQuestions?: string[]
): Promise<Quiz> {
  const isPartsOfSpeechOverall = topic.toLowerCase().includes('parts of speech');
  const isTensesOverall = topic.toLowerCase().includes('tense');
  const isCoreEverywhereOverall = (topic === 'General English Proficiency' || (Boolean(isOverall) && !level)) && !isPartsOfSpeechOverall && !isTensesOverall;
  const isLevelOverall = Boolean(level && (isOverall || topic.toLowerCase().includes('overall')));
  const isMainTopicOrLevelOverall = Boolean(
    isOverall || 
    isCoreEverywhereOverall || 
    isLevelOverall ||
    isPartsOfSpeechOverall ||
    isTensesOverall ||
    topic.toLowerCase().startsWith('overall') || 
    ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'CEFR Levels', 'All Levels'].includes(topic) ||
    ['Tenses', 'Parts of Speech', 'Modals', 'Sentences', 'Conditionals', 'Passive Voice', 'Relative Clauses', 'Reported Speech', 'Gerunds & Infinitives', 'Articles & Nouns', 'Adjectives & Adverbs', 'Prepositions', 'Advanced Grammar'].includes(topic)
  );

  try {
    return await withRetry(async () => {
      // 50 questions for general proficiency overall test, 24 for domain/level overall tests, 15 for individual subtopics
      const numQuestions = isCoreEverywhereOverall ? 50 : (isMainTopicOrLevelOverall ? 24 : 15);

      const randomSeed = Math.floor(Math.random() * 1000000);
      const angles = [
        'real-world conversational dialogues and practical usage',
        'common learner pitfalls, subtle distinctions and error identification',
        'formal/professional and academic sentence contexts',
        'expressive literary and narrative communication scenarios',
        'idiomatic, communicative and authentic modern English phrasing',
        'contrasting similar grammatical forms and nuanced meaning shifts',
        'sentence completion with realistic contextual clues and diverse subjects'
      ];
      const angle1 = angles[Math.floor(Math.random() * angles.length)];
      const angle2 = angles[Math.floor(Math.random() * angles.length)];

      const exclusionContext = excludedQuestions && excludedQuestions.length > 0
        ? `\nCRITICAL ANTI-REPETITION REQUIREMENT:
The user has previously taken tests on this topic and seen the following questions. You MUST NOT repeat, duplicate, or rephrase any of these questions or sentences:
${excludedQuestions.slice(-30).map((q, idx) => `${idx + 1}. "${q.slice(0, 100)}..."`).join('\n')}
Generate COMPLETELY FRESH, BRAND-NEW questions with different subjects, vocabulary, verbs, and sentence structures.`
        : '';

      let contents = '';

      if (isCoreEverywhereOverall) {
        contents = `Generate a COMPREHENSIVE exactly 50-question Overall English Proficiency Test covering EVERY CEFR LEVEL of English (A1, A2, B1, B2, C1, C2) and ALL core grammar lessons.
Seed: ${randomSeed}.
Session Focus: ${angle1} AND ${angle2}.

CRITICAL MANDATORY DOMAIN COVERAGE (The 50 questions MUST thoroughly include ALL three pillars):
1. PARTS OF SPEECH:
   - Nouns (countable/uncountable, irregular plurals, collective & compound nouns)
   - Pronouns (subject, object, possessive, demonstrative, reflexive, relative)
   - Verbs (regular/irregular, to be, auxiliary, causative, phrasal verbs)
   - Adjectives (comparatives, superlatives, order of adjectives)
   - Adverbs (manner, frequency, degree)
   - Prepositions (time, place, direction, dependent prepositions)
   - Conjunctions (coordinating, subordinating, contrast, correlative)
   - Interjections (exclamations expressing pain, joy, surprise, or relief, e.g. Ouch, Hooray, Phew, Alas)
2. ENGLISH TENSES:
   - Present Simple, Present Continuous, Present Perfect, Present Perfect Continuous
   - Past Simple, Past Continuous, Past Perfect, Past Perfect Continuous
   - Future Simple, Future with 'going to', Future Continuous, Future Perfect, Future Perfect Continuous
3. THE OTHERS (COMPLEX & ADVANCED STRUCTURES):
   - Conditionals (Zero, First, Second, Third, Mixed, and Inverted Conditionals)
   - Voice: Passive voice, Impersonal/Reporting passives, and Causatives
   - Reported Speech & Indirect Questions
   - Modals of ability, permission, obligation, deduction, and subtle epistemic probability
   - Gerunds vs. Infinitives and dependent verb patterns
   - Defining and Non-defining Relative Clauses, Participle Clauses
   - Advanced Syntax: Cleft sentences, Negative & restrictive inversion, Mandative & formulaic subjunctives, Unreal past (I wish, It is high time), Ellipsis/gapping, and Stylistic fronting

CRITICAL PROGRESSIVE DIFFICULTY (50 Questions across A1 to C2 — NOT always easy and NOT always hard):
- Questions 1 to 8: CEFR A1 (Easy) - Foundations: Verb 'to be', subject pronouns, articles (a/an/the), basic prepositions of place/time (in/on/at), present simple habits, singular/plural nouns, common questions, basic interjections.
- Questions 9 to 16: CEFR A2 (Easy-Medium) - Elementary: Past simple regular & irregular, comparative & superlative adjectives, present continuous, quantifiers (much/many/a few), modals of ability (can/could), future with 'going to', zero conditional, reflexive pronouns.
- Questions 17 to 25: CEFR B1 (Medium) - Intermediate: Present perfect vs past simple, first and second conditionals, defining relative clauses, passive voice basics, used to, gerunds after prepositions, future continuous, modals of deduction (must have).
- Questions 26 to 34: CEFR B2 (Medium-Hard) - Upper-intermediate: Third conditional, past perfect continuous, future perfect & future perfect continuous, past modals of deduction, participle clauses, causatives, essential phrasal verbs, indirect questions, wish + past perfect.
- Questions 35 to 42: CEFR C1 (Hard) - Advanced structures: Negative inversion (Seldom/Never/No sooner), inverted conditionals without 'if' (Had I known / Should you need / Were they to), mandative subjunctive, cleft sentences, mixed conditionals, unreal past (It is high time), correlative conjunction parallelism.
- Questions 43 to 50: CEFR C2 (Mastery / Expert) - High-register mastery: Stylistic fronting & locative inversion, formulaic/archaic subjunctive (Be that as it may / Come what may / lest), subtle epistemic modality, ellipsis & gapping, rhetorical parallel syntax, litotes, chiasmus.

CRITICAL ANSWER ROTATION REQUIREMENT (Letters MUST ALWAYS change):
- For each question, provide exactly 4 distinct, plausible options.
- The letter of the correct answer MUST rotate and change from question to question. It must NEVER always be A, NEVER always be B, NEVER always be C, and NEVER always be D.
- Rotate the correct answer position dynamically across options A, B, C, and D.
- Do NOT hardcode letter prefixes like "A)" or "B)" in the option texts; provide clean option text.
- Provide a clear explanation wrapping target words or example sentences in double asterisks like **this**.
${exclusionContext}`;
      } else if (isPartsOfSpeechOverall) {
        contents = `Generate a COMPREHENSIVE exactly 24-question Overall Test for ENGLISH PARTS OF SPEECH.
Seed: ${randomSeed}.
Session Focus: ${angle1} and ${angle2}.

COVERAGE REQUIREMENT:
The test MUST cover ALL 8 Parts of Speech:
1. Nouns (countable/uncountable, irregular plurals, collective nouns, abstract nouns)
2. Pronouns (subject, object, possessive, demonstrative, reflexive, relative)
3. Verbs (action, linking, auxiliary, phrasal, causative)
4. Adjectives (comparatives, superlatives, order of adjectives)
5. Adverbs (manner, frequency, degree)
6. Prepositions (time, place, direction, dependent prepositions)
7. Conjunctions (coordinating, subordinating, correlative)
8. Interjections (exclamations expressing pain, joy, surprise, relief, e.g. Ouch, Hooray, Phew, Alas)

DIFFICULTY REQUIREMENT:
Provide balanced difficulty: 8 Easy questions, 8 Medium questions, 8 Hard questions across diverse CEFR levels.

ANSWER ROTATION REQUIREMENT:
- Exactly 4 distinct options per question.
- The correct answer position MUST rotate dynamically across choices A, B, C, and D (never always A, B, C, or D).
- Do NOT prefix options with letters.
- Wrap target words in double asterisks like **this** in explanations.
${exclusionContext}`;
      } else if (isTensesOverall) {
        contents = `Generate a COMPREHENSIVE exactly 24-question Overall Test for ENGLISH TENSES.
Seed: ${randomSeed}.
Session Focus: ${angle1} and ${angle2}.

COVERAGE REQUIREMENT:
The test MUST cover ALL 12 English Tenses and key temporal aspects:
- Present Simple & Present Continuous
- Present Perfect & Present Perfect Continuous
- Past Simple & Past Continuous
- Past Perfect & Past Perfect Continuous
- Future Simple & Future with 'going to'
- Future Continuous, Future Perfect, and Future Perfect Continuous
- Conditionals & temporal time markers (since, for, by the time, while)

DIFFICULTY REQUIREMENT:
Balanced distribution: 8 Easy questions, 8 Medium questions, 8 Hard questions.

ANSWER ROTATION REQUIREMENT:
- Exactly 4 distinct options per question.
- The correct answer letter MUST rotate across A, B, C, and D (never always A, B, C, or D).
- Clean option texts without prefixes.
- Highlight target explanations with **double asterisks**.
${exclusionContext}`;
      } else if (isLevelOverall && level) {
        contents = `Generate a COMPREHENSIVE ${numQuestions}-question Overall Test for CEFR ${level} English covering ALL lessons and grammatical topics of level ${level}.
Seed: ${randomSeed}.
Session Focus: ${angle1} and ${angle2}.

DIFFICULTY REQUIREMENT:
The test must NOT be always easy and NOT be always hard! Provide a balanced distribution:
- Approximately one-third Easy foundational questions for level ${level}
- Approximately one-third Medium core questions for level ${level}
- Approximately one-third Hard nuanced/tricky questions for level ${level}

ANSWER ROTATION REQUIREMENT:
- Exactly 4 distinct options per question.
- The correct answer position MUST rotate and vary across options A, B, C, and D (never always A, never always B, never always C, or D).
- Do NOT prefix options with letters like "A)" or "B)".
- Wrap key terms in explanations with double asterisks like **this**.
${exclusionContext}`;
      } else {
        contents = `Generate a ${numQuestions}-question 100% BRAND NEW, randomized, non-repeating quiz for the English ${type} ${isMainTopicOrLevelOverall ? 'main topic / overall test' : 'sub-lesson topic'}: "${topic}" ${level ? `at level ${level}` : ''}.
Seed: ${randomSeed}.
Session Focus: ${angle1} and ${angle2}.
DIFFICULTY REQUIREMENT: Provide varied difficulty ranging from foundational to nuanced (not always easy and not always hard).
ANSWER ROTATION REQUIREMENT: Exactly 4 distinct options. The correct answer MUST vary across choices A, B, C, and D (not always A, B, C, or D).
${exclusionContext}
You MUST generate exactly ${numQuestions} quiz questions. Include a clear explanation for the correct answer with **highlighted** examples.`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    options: { 
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
                    correctAnswer: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                    level: { type: Type.STRING },
                    difficulty: { type: Type.STRING }
                  },
                  required: ["question", "options", "correctAnswer", "explanation"]
                }
              }
            },
            required: ["title", "questions"]
          }
        }
      });

      const quizData = JSON.parse(response.text);
      if (quizData && Array.isArray(quizData.questions) && quizData.questions.length > 0) {
        if (quizData.questions.length > numQuestions) {
          quizData.questions = quizData.questions.slice(0, numQuestions);
        }
        // Balance options so the correct answer letter ALWAYS changes and is evenly distributed across A, B, C, D
        quizData.questions = balanceQuizOptions(quizData.questions);
        return quizData;
      }
      throw new Error("Invalid quiz structure received from AI model");
    });
  } catch (err) {
    console.warn("AI quiz generation error, using curated comprehensive fallback test bank:", err);
    // Reliable fallback so users never hit a broken screen
    if (isCoreEverywhereOverall) {
      return getCuratedOverallTest();
    } else if (level && ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(level)) {
      return getCuratedLevelTest(level as CEFRLevel);
    }
    // Return standard curated overall test as safe fallback
    return getCuratedOverallTest();
  }
}

export async function generateGrammarDrills(topic: string, level?: string): Promise<DrillSet> {
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a set of 10 interactive grammar drills for the topic: "${topic}" ${level ? `at level ${level}` : ''}.
      The drills should be varied and include:
      1. 'fill_blanks': A sentence with one or more blanks. Provide the parts of the sentence in 'blanks' array (e.g., ["I ", " to the store yesterday."]) and the 'solution'.
      2. 'reorder': A scrambled sentence. Provide the individual words in 'options' array and the 'solution'.
      3. 'structure': Choosing the correct sentence structure. Provide 4 options and the 'solution'.
      
      For each drill, provide a clear 'prompt' and 2 helpful 'hints'.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING },
            drills: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING, enum: ['fill_blanks', 'reorder', 'structure'] },
                  prompt: { type: Type.STRING },
                  options: { 
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  blanks: { 
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  solution: { type: Type.STRING },
                  hints: { 
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ["type", "prompt", "solution", "hints"]
              }
            }
          },
          required: ["topic", "drills"]
        }
      }
    });
    return JSON.parse(response.text);
  });
}

export async function askAI(
  question: string,
  history: { role: 'user' | 'assistant'; content: string }[] = []
): Promise<{ answer: string; relatedTopics?: string[] }> {
  return withRetry(async () => {
    const systemInstruction = `You are an elite, friendly English AI Coach.
      Answer the user's question, clarify doubts, or explain the requested grammar/vocabulary topic.
      Always provide a highly detailed, clear, and comprehensive response.
      Use professional yet conversational Markdown syntax. Keep it beautiful and clean.
      IMPORTANT formatting instructions:
      1. Always wrap any key vocabulary, target structures, or foreign words in double asterisks like **this** so they are highlighted in the UI.
      2. Feel free to structure with subheaders, crisp bullet points, or numbered lists to make it highly scannable and readable.
      Also, suggest exactly 3 or 4 short grammatical or vocabulary related topics for active follow-up study (as a simple array of short strings).`;

    const mappedHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model' as const,
      parts: [{ text: msg.content }]
    }));

    const contents = [
      ...mappedHistory,
      {
        role: 'user' as const,
        parts: [{ text: question }]
      }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: { type: Type.STRING },
            relatedTopics: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["answer"]
        }
      }
    });
    return JSON.parse(response.text);
  });
}

export async function translateTextFast(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<TranslationResult> {
  return withRetry(async () => {
    const systemInstruction = `You are an expert real-time translation tool like Google Translate.
      Translate the given text from the source language to the target language as quickly and accurately as possible.
      If the source language is "Auto-detect", identify the language of the source text and output it in "detectedSourceLanguage".
      If applicable, provide a pronunciation guide or phonetic spelling of the translated text ("pronunciationGuide") to help the user speak it.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Translate: "${text}" from ${sourceLang} to ${targetLang}.`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            translatedText: { type: Type.STRING },
            detectedSourceLanguage: { type: Type.STRING },
            pronunciationGuide: { type: Type.STRING }
          },
          required: ["translatedText"]
        }
      }
    });
    return JSON.parse(response.text);
  });
}

export async function translateTextDeep(
  text: string,
  sourceLang: string,
  targetLang: string,
  translatedText: string
): Promise<any> {
  return withRetry(async () => {
    const systemInstruction = `You are a linguist and language tutor. Based on the source text and its translation, provide:
      1. A vocabulary breakdown of individual key words or phrases ("breakdown"). For each item, provide "word", its part of speech "pos" (e.g. noun, verb, adjective, phrase), "definition" in English, and its "translation" in the target language.
      2. A couple of helpful contextual example sentences in the source language with their translations ("examples").
      3. Natural alternative expressions in the target language ("alternatives") such as formal, informal, or slang options.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Source text: "${text}"
Target Language: ${targetLang}
Translation: "${translatedText}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            breakdown: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  word: { type: Type.STRING },
                  pos: { type: Type.STRING },
                  definition: { type: Type.STRING },
                  translation: { type: Type.STRING }
                },
                required: ["word", "pos", "definition", "translation"]
              }
            },
            examples: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  original: { type: Type.STRING },
                  translation: { type: Type.STRING }
                },
                required: ["original", "translation"]
              }
            },
            alternatives: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });
    return JSON.parse(response.text);
  });
}

export async function analyzeQuizPerformance(
  quizTitle: string,
  questions: { question: string; correctAnswer: string; explanation: string }[],
  userAnswers: { questionIndex: number; selected: string; isCorrect: boolean }[],
  score: number,
  total: number
): Promise<QuizAnalysisResult> {
  return withRetry(async () => {
    const systemInstruction = `You are an elite, friendly English AI Coach.
      Your task is to analyze a student's performance on a grammar/vocabulary quiz and provide highly personalized, supportive, and educational feedback.
      Your response must be in JSON format matching the schema provided.
      
      Instructions for each field:
      1. summary: A 2-3 sentence personalized coach summary. Address the user directly (using "you"). If they got 100%, celebrate enthusiastically. If they passed (>=70%), congratulate them and point out their strong areas. If they scored below 70%, be incredibly encouraging, remind them that mistakes are how we learn, and motivate them.
      2. insights: An array of 2-3 specific insights. Each insight should analyze their answers. Look for patterns in what they missed or got right. E.g., "You displayed strong mastery of conditional sentence patterns, correctly identifying when to use 'would have'." or "You seem to be confused between 'for' and 'since' for durations of time. Remember, 'for' is for a period (e.g., 5 years) and 'since' is for a specific point in time (e.g., 2018)." Always explain the grammar rule simply in the insight itself.
      3. recommendations: An array of exactly 3 actionable, clear next steps or learning suggestions (e.g., "Practice irregular past participles with Drills", "Review the Present Perfect tense rules and examples", "Ask the AI Coach for more examples of state verbs versus action verbs").`;

    const contents = `Analyze my performance on the quiz: "${quizTitle}"
Score: ${score} out of ${total} (${Math.round((score / total) * 100)}%)

Quiz details and my answers:
${questions.map((q, idx) => {
  const answer = userAnswers.find(a => a.questionIndex === idx);
  return `Question ${idx + 1}: ${q.question}
Correct Answer: ${q.correctAnswer}
My Answer: ${answer ? answer.selected : 'Unanswered'}
Result: ${answer ? (answer.isCorrect ? 'Correct' : 'Incorrect') : 'Incorrect'}
Explanation of topic: ${q.explanation}
`;
}).join('\n')}

Please analyze these results and generate the summary, insights, and recommendations. Make sure the insights are educational and explain relevant grammar rules/vocabulary nuance.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            insights: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["summary", "insights", "recommendations"]
        }
      }
    });
    return JSON.parse(response.text);
  });
}

export async function translateWordsBatch(words: string[]): Promise<Record<string, string>> {
  if (words.length === 0) return {};
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Translate the following English words to their primary, standard Khmer word equivalents (only the Khmer word translation itself, short and concise).
      English words: ${JSON.stringify(words)}
      Return a JSON array under the key "translations" containing objects with "english" and "khmer" properties.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            translations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  english: { type: Type.STRING },
                  khmer: { type: Type.STRING }
                },
                required: ["english", "khmer"]
              }
            }
          },
          required: ["translations"]
        }
      }
    });
    
    const parsed = JSON.parse(response.text);
    const result: Record<string, string> = {};
    if (parsed && Array.isArray(parsed.translations)) {
      parsed.translations.forEach((item: any) => {
        if (item && item.english && item.khmer) {
          result[item.english.toLowerCase()] = item.khmer;
        }
      });
    }
    return result;
  });
}



