import { LessonContent, VocabularyLesson, Quiz } from '../types';
import { COMPREHENSIVE_TENSES_DATA, getTenseDetailedData } from './tensesData';
import { COMPREHENSIVE_GRAMMAR_TOPICS, getGrammarTopicData } from './grammarTopicsData';

export const PRE_GENERATED_LESSONS: Record<string, LessonContent | VocabularyLesson | Quiz> = {
  // === ALL 14 COMPREHENSIVE TENSES ===
  'lesson_Tenses__Present Simple': COMPREHENSIVE_TENSES_DATA['Present Simple'],
  'lesson_Tenses__Present Continuous': COMPREHENSIVE_TENSES_DATA['Present Continuous'],
  'lesson_Tenses__Present Perfect': COMPREHENSIVE_TENSES_DATA['Present Perfect'],
  'lesson_Tenses__Present Perfect Continuous': COMPREHENSIVE_TENSES_DATA['Present Perfect Continuous'],
  'lesson_Tenses__Past Simple': COMPREHENSIVE_TENSES_DATA['Past Simple'],
  'lesson_Tenses__Past Continuous': COMPREHENSIVE_TENSES_DATA['Past Continuous'],
  'lesson_Tenses__Past Perfect': COMPREHENSIVE_TENSES_DATA['Past Perfect'],
  'lesson_Tenses__Past Perfect Continuous': COMPREHENSIVE_TENSES_DATA['Past Perfect Continuous'],
  'lesson_Tenses__Future Simple': COMPREHENSIVE_TENSES_DATA['Future Simple'],
  'lesson_Tenses__Future Continuous': COMPREHENSIVE_TENSES_DATA['Future Continuous'],
  'lesson_Tenses__Future Perfect': COMPREHENSIVE_TENSES_DATA['Future Perfect'],
  'lesson_Tenses__Future Perfect Continuous': COMPREHENSIVE_TENSES_DATA['Future Perfect Continuous'],
  'lesson_Tenses__Conditional Sentences': COMPREHENSIVE_TENSES_DATA['Conditional Sentences'],
  'lesson_Tenses__Future with Going To & Will': COMPREHENSIVE_TENSES_DATA['Future with Going To & Will'],

  // === ALL 8 PARTS OF SPEECH ===
  'lesson_PartsOfSpeech__Noun': COMPREHENSIVE_GRAMMAR_TOPICS['Noun'],
  'lesson_PartsOfSpeech__Pronoun': COMPREHENSIVE_GRAMMAR_TOPICS['Pronoun'],
  'lesson_PartsOfSpeech__Verb': COMPREHENSIVE_GRAMMAR_TOPICS['Verb'],
  'lesson_PartsOfSpeech__Adjective': COMPREHENSIVE_GRAMMAR_TOPICS['Adjective'],
  'lesson_PartsOfSpeech__Adverb': COMPREHENSIVE_GRAMMAR_TOPICS['Adverb'],
  'lesson_PartsOfSpeech__Preposition': COMPREHENSIVE_GRAMMAR_TOPICS['Preposition'],
  'lesson_PartsOfSpeech__Conjunction': COMPREHENSIVE_GRAMMAR_TOPICS['Conjunction'],
  'lesson_PartsOfSpeech__Interjection': COMPREHENSIVE_GRAMMAR_TOPICS['Interjection'],

  // Direct Parts of Speech Keys
  'Noun': COMPREHENSIVE_GRAMMAR_TOPICS['Noun'],
  'Pronoun': COMPREHENSIVE_GRAMMAR_TOPICS['Pronoun'],
  'Verb': COMPREHENSIVE_GRAMMAR_TOPICS['Verb'],
  'Adjective': COMPREHENSIVE_GRAMMAR_TOPICS['Adjective'],
  'Adverb': COMPREHENSIVE_GRAMMAR_TOPICS['Adverb'],
  'Preposition': COMPREHENSIVE_GRAMMAR_TOPICS['Preposition'],
  'Conjunction': COMPREHENSIVE_GRAMMAR_TOPICS['Conjunction'],
  'Interjection': COMPREHENSIVE_GRAMMAR_TOPICS['Interjection'],

  // === CORE GRAMMAR BY LEVELS ===
  'lesson_Levels_A1_Subject Pronouns': COMPREHENSIVE_GRAMMAR_TOPICS['Subject Pronouns'],
  'lesson_Levels_A1_To Be (am, is, are)': COMPREHENSIVE_GRAMMAR_TOPICS['To Be (am, is, are)'],
  'lesson_Levels_A1_Articles (a, an, the)': COMPREHENSIVE_GRAMMAR_TOPICS['Articles (a, an, the)'],
  'lesson_Levels_A1_Demonstratives (this, that, these, those)': COMPREHENSIVE_GRAMMAR_TOPICS['Demonstratives (this, that, these, those)'],
  'lesson_Levels_A1_Singular and Plural Nouns': COMPREHENSIVE_GRAMMAR_TOPICS['Singular and Plural Nouns'],
  'lesson_Levels_A1_Countable & Uncountable Nouns Basics': COMPREHENSIVE_GRAMMAR_TOPICS['Countable & Uncountable Nouns'],
  'lesson_Levels_A1_Can/Can\'t': COMPREHENSIVE_GRAMMAR_TOPICS['Can/Can\'t'],
  'lesson_Levels_A1_Prepositions of Place': COMPREHENSIVE_GRAMMAR_TOPICS['Preposition'],
  'lesson_Levels_A1_Prepositions of Time': COMPREHENSIVE_GRAMMAR_TOPICS['Preposition'],

  'lesson_Levels_A2_Comparative Adjectives': COMPREHENSIVE_GRAMMAR_TOPICS['Comparative Adjectives'],
  'lesson_Levels_A2_Subject-Verb Agreement Essentials': COMPREHENSIVE_GRAMMAR_TOPICS['Subject-Verb Agreement'],
  'lesson_Levels_A2_Gerunds vs Infinitives Basics': COMPREHENSIVE_GRAMMAR_TOPICS['Gerunds vs Infinitives'],

  'lesson_Levels_B1_Passive Voice': COMPREHENSIVE_GRAMMAR_TOPICS['Passive Voice'],
  'lesson_Levels_B1_Reported Speech': COMPREHENSIVE_GRAMMAR_TOPICS['Reported Speech'],
  'lesson_Levels_B2_Gerunds vs Infinitives': COMPREHENSIVE_GRAMMAR_TOPICS['Gerunds vs Infinitives'],

  // === CONDITIONALS (Zero, First, Second, Third, Mixed, Inverted) ===
  'Mixed Conditionals': COMPREHENSIVE_GRAMMAR_TOPICS['Mixed Conditionals'],
  'lesson_Levels_C1_Mixed Conditionals': COMPREHENSIVE_GRAMMAR_TOPICS['Mixed Conditionals'],
  'lesson_Levels_B2_Mixed Conditionals Introduction': COMPREHENSIVE_GRAMMAR_TOPICS['Mixed Conditionals'],
  'lesson_Levels_B2_Mixed Conditionals in Full': COMPREHENSIVE_GRAMMAR_TOPICS['Mixed Conditionals'],

  'Zero Conditional': COMPREHENSIVE_GRAMMAR_TOPICS['Zero Conditional'],
  'lesson_Levels_B1_Zero Conditional': COMPREHENSIVE_GRAMMAR_TOPICS['Zero Conditional'],

  'First Conditional': COMPREHENSIVE_GRAMMAR_TOPICS['First Conditional'],
  'lesson_Levels_B1_First Conditional': COMPREHENSIVE_GRAMMAR_TOPICS['First Conditional'],

  'Second Conditional': COMPREHENSIVE_GRAMMAR_TOPICS['Second Conditional'],
  'lesson_Levels_B1_Second Conditional Introduction': COMPREHENSIVE_GRAMMAR_TOPICS['Second Conditional'],
  'lesson_Levels_B2_Second Conditional': COMPREHENSIVE_GRAMMAR_TOPICS['Second Conditional'],

  'Third Conditional': COMPREHENSIVE_GRAMMAR_TOPICS['Third Conditional'],
  'lesson_Levels_B1_Third Conditional Introduction': COMPREHENSIVE_GRAMMAR_TOPICS['Third Conditional'],
  'lesson_Levels_B2_Third Conditional': COMPREHENSIVE_GRAMMAR_TOPICS['Third Conditional'],

  'Inverted Conditionals': COMPREHENSIVE_GRAMMAR_TOPICS['Inverted Conditionals'],
  'lesson_Levels_B2_Inverted Conditionals (Had I known, Should you need)': COMPREHENSIVE_GRAMMAR_TOPICS['Inverted Conditionals'],
  'lesson_Levels_C1_Inversion in Conditionals': COMPREHENSIVE_GRAMMAR_TOPICS['Inverted Conditionals'],
  'lesson_Levels_C1_Inverted Conditional Structures without If': COMPREHENSIVE_GRAMMAR_TOPICS['Inverted Conditionals'],
  'lesson_Levels_C1_Advanced Conditionals (but for, had it not been for, should you need)': COMPREHENSIVE_GRAMMAR_TOPICS['Inverted Conditionals'],

  'lesson_Levels_A1_Present Simple': {
    title: 'A1 Present Simple Tense',
    explanation: 'At the A1 level, Present Simple is taught to help you express daily routines, facts, and permanent situations.',
    structure: {
      affirmative: 'Subject + Verb (adds -s/-es for he/she/it)',
      negative: 'Subject + do/does not + Verb',
      question: 'Do/Does + Subject + Verb?'
    },
    examples: [
      'He **lives** in a small apartment in Madrid.',
      'They **do not speak** Russian or Chinese.',
      '**Do you drink** coffee or tea in the morning?',
      'I **wake up** at 7:00 AM every day.',
      'Cats **like** milk and sleeping in warm places.'
    ]
  } as LessonContent,

  // === VOCABULARY LESSONS ===
  'vocab_Greetings & Small Talk': {
    topic: 'Greetings & Small Talk',
    words: [
      {
        word: 'Acquaintance',
        ipa: '/əˈkweɪntəns/',
        partOfSpeech: 'noun',
        definition: 'A person one knows slightly, but who is not a close friend.',
        examples: [
          'He is just a business **acquaintance** rather than a friend.',
          'I ran into an old **acquaintance** at the shopping mall.',
          'She has many **acquaintances** but only a few trusted confidants.'
        ]
      },
      {
        word: 'Pleasantry',
        ipa: '/ˈplezntri/',
        partOfSpeech: 'noun',
        definition: 'A mild, polite, or casual remark, typically made to initiate a conversation.',
        examples: [
          'After exchanging the usual **pleasantries**, they began the meeting.',
          'They chatted about weather and other safe **pleasantries**.',
          'He bypassed the polite **pleasantries** and went straight to business.'
        ]
      },
      {
        word: 'Socialize',
        ipa: '/ˈsoʊʃəlaɪz/',
        partOfSpeech: 'verb',
        definition: 'To mix socially with others or participate in social activities.',
        examples: [
          'I love to **socialize** with friends after a busy workweek.',
          'The event is a great opportunity to **socialize** and network.',
          'He is quite shy and finds it difficult to **socialize** in large crowds.'
        ]
      }
    ]
  } as VocabularyLesson,

  'vocab_Restaurant & Dining Out': {
    topic: 'Restaurant & Dining Out',
    words: [
      {
        word: 'Appetizer',
        ipa: '/ˈæpɪtaɪzər/',
        partOfSpeech: 'noun',
        definition: 'A small dish of food or a drink taken before a meal to stimulate the appetite.',
        examples: [
          'We ordered garlic bread as an **appetizer** before the main course.',
          'The restaurant offers a wide selection of hot and cold **appetizers**.',
          'Would you like to look at the **appetizer** menu first?'
        ]
      },
      {
        word: 'Entrée',
        ipa: '/ˈɑːntreɪ/',
        partOfSpeech: 'noun',
        definition: 'The main course of a meal (especially in North American usage).',
        examples: [
          'For my **entrée**, I chose the grilled salmon with roasted vegetables.',
          'They offer delicious vegetarian and gluten-free **entrées**.',
          'The steak is the most popular **entrée** on our seasonal menu.'
        ]
      },
      {
        word: 'Gratuity',
        ipa: '/ɡrəˈtuːəti/',
        partOfSpeech: 'noun',
        definition: 'A tip given to a waiter, taxicab driver, or other service worker for service rendered.',
        examples: [
          'An eighteen percent **gratuity** is automatically added for tables of six or more.',
          'The bill includes both the food cost and the standard **gratuity**.',
          'We left a generous **gratuity** for the waiter because of his exceptional service.'
        ]
      }
    ]
  } as VocabularyLesson,

  'vocab_At the Airport & Hotels': {
    topic: 'At the Airport & Hotels',
    words: [
      {
        word: 'Concierge',
        ipa: '/ˌkoʊnsiˈerʒ/',
        partOfSpeech: 'noun',
        definition: 'A hotel staff member who helps guests by arranging tours, booking tickets, or offering recommendations.',
        examples: [
          'The hotel **concierge** booked premium tickets for the Broadway show.',
          'Ask the **concierge** for the best dining recommendations in the neighborhood.',
          'Our friendly **concierge** arranged a private shuttle to the airport.'
        ]
      },
      {
        word: 'Boarding Pass',
        ipa: '/ˈbɔːrdɪŋ pæs/',
        partOfSpeech: 'noun',
        definition: 'A document provided by an airline during check-in, giving a passenger permission to board an aircraft.',
        examples: [
          'Please show your passport and **boarding pass** at the gate.',
          'I downloaded my electronic **boarding pass** directly to my phone.',
          'Keep your **boarding pass** handy for the security screening process.'
        ]
      },
      {
        word: 'Amenities',
        ipa: '/əˈmenətiz/',
        partOfSpeech: 'noun',
        definition: 'Desirable or useful features of a building, place, or hotel that provide comfort and convenience.',
        examples: [
          'The luxury resort features superb **amenities**, including an indoor pool and spa.',
          'Guests can enjoy complimentary **amenities** such as high-speed Wi-Fi and breakfast.',
          'The hotel room was fully stocked with premium bath **amenities**.'
        ]
      }
    ]
  } as VocabularyLesson,

  // === GENERAL CORE QUIZZES ===
  'quiz_grammar_Present Simple_specific_': {
    title: 'Present Simple Grammar Quiz',
    questions: [
      {
        question: 'Choose the correct form: She ____ (live) in New York.',
        options: ['live', 'lives', 'living', 'is live'],
        correctAnswer: 'lives',
        explanation: 'For third-person singular (he, she, it) in Present Simple, we add "-s" or "-es" to the verb.'
      },
      {
        question: 'Choose the correct negative form: They ____ (not like) cold weather.',
        options: ['does not like', 'not like', 'do not like', 'are not like'],
        correctAnswer: 'do not like',
        explanation: 'We use "do not" (don\'t) for plural subjects (they, we, you, I) in Present Simple negatives.'
      }
    ]
  } as Quiz
};

export function getLocalFallbackLesson(key: string): any | null {
  // Try to match the key exactly
  if (PRE_GENERATED_LESSONS[key]) {
    return PRE_GENERATED_LESSONS[key];
  }
  
  // Try to match key case-insensitively or with minor spacing differences
  const normalizedKey = key.toLowerCase().trim();
  for (const k of Object.keys(PRE_GENERATED_LESSONS)) {
    if (k.toLowerCase().trim() === normalizedKey) {
      return PRE_GENERATED_LESSONS[k];
    }
  }

  // If the key is specifically for Grammar Levels or Parts of Speech, check grammar topics first!
  const isGrammarKey = 
    key.includes('Levels_') || 
    key.includes('PartsOfSpeech_') ||
    normalizedKey.includes('conditional') ||
    normalizedKey.includes('clause') ||
    normalizedKey.includes('voice') ||
    normalizedKey.includes('speech');

  if (isGrammarKey) {
    const grammarMatch = getGrammarTopicData(key);
    if (grammarMatch) {
      return grammarMatch;
    }
  }

  // Check if this key corresponds to any of the 14 comprehensive English tenses
  const tenseMatch = getTenseDetailedData(key);
  if (tenseMatch) {
    return tenseMatch;
  }

  // Check if this key corresponds to any of the comprehensive non-tense grammar topics
  const grammarMatch = getGrammarTopicData(key);
  if (grammarMatch) {
    return grammarMatch;
  }

  return null;
}
