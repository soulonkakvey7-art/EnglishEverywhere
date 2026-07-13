import dotenv from 'dotenv';
dotenv.config();

import { 
  generateTenseLesson, 
  generateGrammarLesson, 
  generateVocabularyLesson, 
  generateIdiomTopics, 
  generateIdiomLesson 
} from '../src/services/geminiService.js';
import { getCachedLesson, saveCachedLesson } from '../src/services/firebase.js';

const TENSES = [
  'Present Simple', 'Present Continuous', 'Present Perfect', 'Present Perfect Continuous',
  'Past Simple', 'Past Continuous', 'Past Perfect', 'Past Perfect Continuous',
  'Future Simple', 'Future Continuous', 'Future Perfect', 'Future Perfect Continuous',
  'Conditional Sentences', 'Future with Going To & Will'
];

const CORE_GRAMMAR = [
  { level: 'A1', category: 'Levels', topic: 'Subject Pronouns' },
  { level: 'A1', category: 'Levels', topic: 'To Be (am, is, are)' },
  { level: 'A1', category: 'Levels', topic: 'Present Simple' },
  { level: 'A2', category: 'Levels', topic: 'Present Continuous' },
  { level: 'A2', category: 'Levels', topic: 'Simple Past' },
  { level: 'A2', category: 'Levels', topic: 'Comparative Adjectives' },
  { level: 'B1', category: 'Levels', topic: 'Present Perfect' },
  { level: 'B1', category: 'Levels', topic: 'First Conditional' },
  { level: 'B2', category: 'Levels', topic: 'Second Conditional' },
  { level: 'B2', category: 'Levels', topic: 'Passive Voice in Full' },
  { level: 'C1', category: 'Levels', topic: 'Mixed Conditionals' },
  { level: 'C1', category: 'Levels', topic: 'Inversion in Conditionals' },
  { level: 'C2', category: 'Levels', topic: 'Sophisticated Inversion & Fronting' }
];

const CORE_VOCAB = [
  'Greetings & Small Talk',
  'Expressing Feelings & Emotions',
  'At the Airport & Hotels',
  'Restaurant & Dining Out',
  'Formal Emails & Requests',
  'Meetings & Negotiations'
];

const CORE_IDIOMS = [
  { category: 'Work & Business', topic: 'Corporate Buzzwords' },
  { category: 'Travel', topic: 'Travel & Leisure Idioms' },
  { category: 'Weather', topic: 'Weather Idioms' },
  { category: 'Emotions', topic: 'Idioms for Daily Situations' }
];

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runSeeding() {
  console.log("Starting lesson caching and pre-generation...");

  // 1. Seed Tenses
  console.log("\n=== Seeding Tenses ===");
  for (const tense of TENSES) {
    const cacheKey = `lesson_Tenses__${tense}`;
    try {
      const existing = await getCachedLesson(cacheKey);
      if (existing) {
        console.log(`[PASS] Tense "${tense}" already cached.`);
        continue;
      }
      console.log(`[GEN] Generating Tense: "${tense}"...`);
      const res = await generateTenseLesson(tense);
      await saveCachedLesson(cacheKey, {
        type: 'tense',
        topic: tense,
        content: res
      });
      console.log(`[OK] Saved Tense: "${tense}"`);
      await sleep(1500); // Friendly rate-limit delay
    } catch (err) {
      console.error(`[ERROR] Failed to seed Tense "${tense}":`, err);
      await sleep(5000); // Longer pause on error
    }
  }

  // 2. Seed Grammar Topics
  console.log("\n=== Seeding Grammar Levels ===");
  for (const item of CORE_GRAMMAR) {
    const cacheKey = `lesson_${item.category}_${item.level || ''}_${item.topic}`;
    try {
      const existing = await getCachedLesson(cacheKey);
      if (existing) {
        console.log(`[PASS] Grammar topic "${item.topic}" (${item.level}) already cached.`);
        continue;
      }
      console.log(`[GEN] Generating Grammar topic: "${item.topic}" (${item.level})...`);
      const res = await generateGrammarLesson(item.topic, item.level);
      await saveCachedLesson(cacheKey, {
        type: 'grammar',
        topic: item.topic,
        level: item.level,
        category: item.category,
        content: res
      });
      console.log(`[OK] Saved Grammar: "${item.topic}" (${item.level})`);
      await sleep(1500);
    } catch (err) {
      console.error(`[ERROR] Failed to seed Grammar topic "${item.topic}":`, err);
      await sleep(5000);
    }
  }

  // 3. Seed Vocabulary Topics
  console.log("\n=== Seeding Vocabulary ===");
  for (const topic of CORE_VOCAB) {
    const cacheKey = `vocab_${topic}`;
    try {
      const existing = await getCachedLesson(cacheKey);
      if (existing) {
        console.log(`[PASS] Vocabulary topic "${topic}" already cached.`);
        continue;
      }
      console.log(`[GEN] Generating Vocabulary topic: "${topic}"...`);
      const res = await generateVocabularyLesson(topic);
      await saveCachedLesson(cacheKey, {
        type: 'vocabulary',
        topic,
        content: res
      });
      console.log(`[OK] Saved Vocabulary: "${topic}"`);
      await sleep(1500);
    } catch (err) {
      console.error(`[ERROR] Failed to seed Vocabulary topic "${topic}":`, err);
      await sleep(5000);
    }
  }

  // 4. Seed Idiom Topics & Category Idioms
  console.log("\n=== Seeding Idioms ===");
  const categoriesToSeed = ['Work & Business', 'Travel', 'Weather', 'Emotions'];
  for (const category of categoriesToSeed) {
    const cacheKey = `idiom_topics_${category}`;
    try {
      const existing = await getCachedLesson(cacheKey);
      if (existing) {
        console.log(`[PASS] Idiom Category "${category}" topics already cached.`);
      } else {
        console.log(`[GEN] Generating Idiom topics for category: "${category}"...`);
        const res = await generateIdiomTopics(category);
        await saveCachedLesson(cacheKey, {
          type: 'idiom_topics',
          topic: category,
          content: res
        });
        console.log(`[OK] Saved Idiom Category topics: "${category}"`);
        await sleep(1500);
      }
    } catch (err) {
      console.error(`[ERROR] Failed to seed Idiom Category "${category}":`, err);
      await sleep(5000);
    }
  }

  // Seed individual idiom lessons from CORE_IDIOMS
  for (const item of CORE_IDIOMS) {
    const cacheKey = `idiom_${item.topic}`;
    try {
      const existing = await getCachedLesson(cacheKey);
      if (existing) {
        console.log(`[PASS] Idiom lesson "${item.topic}" already cached.`);
        continue;
      }
      console.log(`[GEN] Generating Idiom lesson: "${item.topic}"...`);
      const res = await generateIdiomLesson(item.topic);
      await saveCachedLesson(cacheKey, {
        type: 'idiom',
        topic: item.topic,
        category: item.category,
        content: res
      });
      console.log(`[OK] Saved Idiom lesson: "${item.topic}"`);
      await sleep(1500);
    } catch (err) {
      console.error(`[ERROR] Failed to seed Idiom lesson "${item.topic}":`, err);
      await sleep(5000);
    }
  }

  console.log("\nPre-generation and Seeding process completed successfully!");
}

runSeeding().catch(err => {
  console.error("FATAL: Seeding process failed:", err);
});
