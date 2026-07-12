import { GoogleGenAI, Type } from "@google/genai";
import { LessonContent, VocabularyLesson, Quiz, CEFRLevel, DrillSet, DictionaryEntry, DictionaryLetterSet, TranslationResult, QuizAnalysisResult } from "../types";

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
      Provide a highly detailed, easy-to-understand explanation and at least 8 varied examples.
      IMPORTANT: In each example sentence, wrap the specific word(s) or phrase(s) that demonstrate the grammar topic (e.g., the specific nouns, verbs, or tenses being taught) in double asterisks like **this**.
      If this topic has clear, standard grammatical forms or sentence structures (like Affirmative, Negative, and Question formulas/forms, e.g., for modals, conditional clauses, pronouns, modifiers, etc.), please provide them in the optional 'structure' object. If the topic does not have standard forms or formulas, do not include the 'structure' field.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            explanation: { type: Type.STRING },
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
          required: ["title", "explanation", "examples"]
        }
      }
    });
    return JSON.parse(response.text);
  });
}

export async function generateTenseLesson(tense: string): Promise<LessonContent & { structure: { affirmative: string, negative: string, question: string } }> {
  return withRetry(async () => {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain the English tense: "${tense}". 
      Provide the structure/formula (Affirmative, Negative, Question), deep explanation of usage contexts, and at least 5 examples for each usage context.
      IMPORTANT: In each example sentence, wrap the verb(s) demonstrating the "${tense}" tense in double asterisks like **this**.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            explanation: { type: Type.STRING },
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
          required: ["title", "explanation", "structure", "examples"]
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
      4. Exactly 3 example sentences that show natural usage.
      
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
                  examples: { 
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                  }
                },
                required: ["word", "partOfSpeech", "ipa", "definition", "examples"]
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
      For EACH idiom, provide the part of speech (usually 'idiom' or 'phrase'), the IPA (optional if standard), a clear definition, the historical origin (brief), and exactly 2 example sentences.
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

export async function generateQuiz(topic: string, type: 'grammar' | 'vocabulary', level?: string, isOverall?: boolean): Promise<Quiz> {
  return withRetry(async () => {
    const isCoreEverywhereOverall = topic === 'General English Proficiency';
    const numQuestions = isCoreEverywhereOverall ? 50 : 20;

    const contents = isCoreEverywhereOverall 
      ? `Generate a COMPREHENSIVE 50-question randomized, non-repeating quiz covering the ENTIRE spectrum of English grammar and vocabulary (General English Proficiency).
         The questions should cover a wide array of categories (including tenses, parts of speech, active/passive voice, common vocabulary, idioms, etc.) to provide a complete standalone English proficiency assessment.
         You MUST generate exactly 50 quiz questions.
         Questions should be multiple choice with exactly 4 options. Include a clear explanation for the correct answer.
         IMPORTANT: In explanations, wrap any example sentences or target words in double asterisks like **this** for highlighting.`
      : `Generate a 20-question randomized, non-repeating quiz for the English ${type} topic: "${topic}" ${level ? `at level ${level}` : ''}.
         The questions should cover various sub-topics of "${topic}" to provide a thorough test.
         You MUST generate exactly 20 quiz questions.
         Questions should be multiple choice with exactly 4 options. Include a clear explanation for the correct answer.
         IMPORTANT: In explanations, wrap any example sentences or target words in double asterisks like **this** for highlighting.`;

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
                  explanation: { type: Type.STRING }
                },
                required: ["question", "options", "correctAnswer", "explanation"]
              }
            }
          },
          required: ["title", "questions"]
        }
      }
    });
    return JSON.parse(response.text);
  });
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


