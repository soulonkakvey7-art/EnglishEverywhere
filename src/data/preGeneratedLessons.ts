import { LessonContent, VocabularyLesson, Quiz } from '../types';

export const PRE_GENERATED_LESSONS: Record<string, LessonContent | VocabularyLesson | Quiz> = {
  // === ALL 14 TENSES ===
  'lesson_Tenses__Present Simple': {
    title: 'Present Simple Tense',
    explanation: 'The Present Simple tense is used to describe habits, unchanging situations, general truths, fixed arrangements, and repeating actions. It is one of the most fundamental structures in English and is essential for daily conversation.',
    structure: {
      affirmative: 'Subject + Verb (s/es for 3rd person singular)',
      negative: 'Subject + do/does not + Verb (base form)',
      question: 'Do/Does + Subject + Verb (base form)?'
    },
    examples: [
      'She **runs** in the park every single morning to stay healthy.',
      'We **do not live** in London; we reside in Manchester.',
      '**Does he speak** French fluently after studying abroad?',
      'Water **boils** at 100 degrees Celsius under normal pressure.',
      'The train **leaves** at exactly 8:00 AM tomorrow morning.',
      'They usually **play** soccer on Saturday afternoons.'
    ]
  } as LessonContent,

  'lesson_Tenses__Present Continuous': {
    title: 'Present Continuous Tense',
    explanation: 'The Present Continuous tense (also known as Present Progressive) describes actions happening right now, at this exact moment, or temporary situations that are currently in progress.',
    structure: {
      affirmative: 'Subject + am/is/are + Verb-ing',
      negative: 'Subject + am/is/are not + Verb-ing',
      question: 'Am/Is/Are + Subject + Verb-ing?'
    },
    examples: [
      'He **is studying** English for his exam at the library right now.',
      'They **are not watching** television; they are playing cards.',
      '**Are you listening** to the teacher during this presentation?',
      'She **is living** with her aunt until she finds a new apartment.',
      'The company **is growing** rapidly this quarter.'
    ]
  } as LessonContent,

  'lesson_Tenses__Present Perfect': {
    title: 'Present Perfect Tense',
    explanation: 'The Present Perfect connects the past to the present. It describes experiences, actions that occurred at an unspecified time in the past, or actions that started in the past and continue into the present.',
    structure: {
      affirmative: 'Subject + have/has + Past Participle',
      negative: 'Subject + have/has not + Past Participle',
      question: 'Have/Has + Subject + Past Participle?'
    },
    examples: [
      'I **have visited** Paris three times in my life.',
      'She **has not finished** her homework assignment yet.',
      '**Have they ever tried** authentic Italian pasta?',
      'We **have lived** in this cozy house since 2015.',
      'He **has lost** his keys and cannot enter his apartment.'
    ]
  } as LessonContent,

  'lesson_Tenses__Present Perfect Continuous': {
    title: 'Present Perfect Continuous Tense',
    explanation: 'The Present Perfect Continuous tense emphasizes the duration or ongoing nature of an action that began in the past and continues in the present, or has just finished with clear results.',
    structure: {
      affirmative: 'Subject + have/has + been + Verb-ing',
      negative: 'Subject + have/has not + been + Verb-ing',
      question: 'Have/Has + Subject + been + Verb-ing?'
    },
    examples: [
      'It **has been raining** heavily for three consecutive hours.',
      'They **have not been practicing** their music lessons lately.',
      '**Have you been waiting** in the cold queue for a long time?',
      'She **has been working** on this complex software project all day.',
      'My hands are dirty because I **have been gardening**.'
    ]
  } as LessonContent,

  'lesson_Tenses__Past Simple': {
    title: 'Past Simple Tense',
    explanation: 'The Past Simple tense is used to describe completed actions that occurred at a specific, finished time in the past.',
    structure: {
      affirmative: 'Subject + Verb-ed (or irregular past form)',
      negative: 'Subject + did not + Verb (base form)',
      question: 'Did + Subject + Verb (base form)?'
    },
    examples: [
      'We **watched** an incredible science-fiction film last night.',
      'He **did not attend** the corporate meeting yesterday.',
      '**Did you buy** the groceries from the local supermarket?',
      'They **built** this famous bridge back in the nineteenth century.',
      'She **left** the office early to catch her evening flight.'
    ]
  } as LessonContent,

  'lesson_Tenses__Past Continuous': {
    title: 'Past Continuous Tense',
    explanation: 'The Past Continuous tense describes an ongoing action that was in progress at a specific moment in the past, often interrupted by another shorter action.',
    structure: {
      affirmative: 'Subject + was/were + Verb-ing',
      negative: 'Subject + was/were not + Verb-ing',
      question: 'Was/Were + Subject + Verb-ing?'
    },
    examples: [
      'I **was reading** an engaging novel when the lights suddenly went out.',
      'They **were not sleeping** during the loud midnight thunderstorm.',
      '**Was she cooking** dinner when you arrived at her house?',
      'At noon yesterday, we **were traveling** through the mountains.',
      'He **was talking** on his phone while driving the car.'
    ]
  } as LessonContent,

  'lesson_Tenses__Past Perfect': {
    title: 'Past Perfect Tense',
    explanation: 'The Past Perfect refers to an action completed before another specific action or point in the past. It is often called the "past of the past."',
    structure: {
      affirmative: 'Subject + had + Past Participle',
      negative: 'Subject + had not + Past Participle',
      question: 'Had + Subject + Past Participle?'
    },
    examples: [
      'The train **had already left** before we reached the platform.',
      'She realized she **had not locked** the front door of her house.',
      '**Had you met** him before he joined our corporate team?',
      'By the time the guest arrived, we **had prepared** the meal.',
      'He **had saved** enough money before purchasing his new car.'
    ]
  } as LessonContent,

  'lesson_Tenses__Past Perfect Continuous': {
    title: 'Past Perfect Continuous Tense',
    explanation: 'The Past Perfect Continuous tense is used to show that an action started in the past and continued up until another point in the past, emphasizing duration.',
    structure: {
      affirmative: 'Subject + had been + Verb-ing',
      negative: 'Subject + had not been + Verb-ing',
      question: 'Had + Subject + been + Verb-ing?'
    },
    examples: [
      'He **had been working** at the company for five years before he got promoted.',
      'They **had not been sleeping** well for weeks, which made them exhausted.',
      '**Had she been practicing** the piano for hours before the concert started?',
      'The ground was wet because it **had been raining** all afternoon.',
      'We **had been driving** in circles before finding the correct highway.'
    ]
  } as LessonContent,

  'lesson_Tenses__Future Simple': {
    title: 'Future Simple Tense',
    explanation: 'The Future Simple tense is used to express beliefs, predictions, instant decisions, promises, or offers about the future, typically using "will" or "shall".',
    structure: {
      affirmative: 'Subject + will + Verb (base form)',
      negative: 'Subject + will not (won\'t) + Verb (base form)',
      question: 'Will + Subject + Verb (base form)?'
    },
    examples: [
      'I think technology **will change** our lives dramatically.',
      'They **will not attend** the exhibition tomorrow afternoon.',
      '**Will you help** me carry these heavy boxes upstairs?',
      'I **will call** you as soon as I arrive at the hotel.',
      'The sun **will rise** tomorrow at 6:00 AM as usual.'
    ]
  } as LessonContent,

  'lesson_Tenses__Future Continuous': {
    title: 'Future Continuous Tense',
    explanation: 'The Future Continuous tense describes an action that will be in progress at a specific time or over a period in the future.',
    structure: {
      affirmative: 'Subject + will be + Verb-ing',
      negative: 'Subject + will not be + Verb-ing',
      question: 'Will + Subject + be + Verb-ing?'
    },
    examples: [
      'At this time tomorrow, I **will be flying** over the Atlantic Ocean.',
      'They **will not be playing** tennis if it rains tomorrow.',
      '**Will you be using** your laptop this evening?',
      'She **will be studying** in the library all day next Saturday.',
      'We **will be celebrating** our anniversary next week.'
    ]
  } as LessonContent,

  'lesson_Tenses__Future Perfect': {
    title: 'Future Perfect Tense',
    explanation: 'The Future Perfect tense expresses an action that will be completed before a specific point of time in the future, often used with "by" or "by the time".',
    structure: {
      affirmative: 'Subject + will have + Past Participle',
      negative: 'Subject + will not have + Past Participle',
      question: 'Will + Subject + have + Past Participle?'
    },
    examples: [
      'By next year, they **will have built** the new office complex.',
      'I **will not have finished** writing the report by 5:00 PM.',
      '**Will you have completed** your degree by next summer?',
      'She **will have retired** by the time she turns sixty-five.',
      'By next Tuesday, we **will have lived** here for a decade.'
    ]
  } as LessonContent,

  'lesson_Tenses__Future Perfect Continuous': {
    title: 'Future Perfect Continuous Tense',
    explanation: 'The Future Perfect Continuous tense is used to describe an ongoing action that will continue up until a specific point of time in the future, emphasizing duration.',
    structure: {
      affirmative: 'Subject + will have been + Verb-ing',
      negative: 'Subject + will not have been + Verb-ing',
      question: 'Will + Subject + have been + Verb-ing?'
    },
    examples: [
      'By next month, I **will have been studying** English for five full years.',
      'He **will not have been working** there long enough to get the bonus.',
      '**Will they have been traveling** for more than twenty hours by tomorrow?',
      'By midnight, we **will have been driving** through three states.',
      'She **will have been teaching** at this school for twenty-five years when she retires.'
    ]
  } as LessonContent,

  'lesson_Tenses__Conditional Sentences': {
    title: 'Conditional Sentences',
    explanation: 'Conditional sentences describe situations where one thing depends on another. They include Zero, First, Second, and Third conditionals.',
    structure: {
      affirmative: 'If + Condition, + Result Clause',
      negative: 'If + Negative Condition, + Negative Result Clause',
      question: 'What + modal + Subject + do + if + condition?'
    },
    examples: [
      'If you heat ice, it **melts** quickly.',
      'If it rains tomorrow, we **will cancel** our picnic.',
      'If I won the lottery, I **would travel** around the world.',
      'If they had studied harder, they **would have passed** the test.',
      'What **would you do** if you lost your passport?'
    ]
  } as LessonContent,

  'lesson_Tenses__Future with Going To & Will': {
    title: 'Future with Going To & Will',
    explanation: 'Use "will" for spontaneous decisions, predictions, offers, and promises. Use "be going to" for pre-existing plans, intentions, and predictions based on present evidence.',
    structure: {
      affirmative: 'Subject + will + Verb OR Subject + am/is/are + going to + Verb',
      negative: 'Subject + won\'t + Verb OR Subject + am/is/are not + going to + Verb',
      question: 'Will + Subject + Verb? OR Am/Is/Are + Subject + going to + Verb?'
    },
    examples: [
      'Look at those dark clouds! It **is going to rain** very soon.',
      'I **will carry** those heavy groceries for you.',
      'We **are going to visit** our grandparents in Canada next month.',
      'I promise I **will not forget** to mail this letter.',
      'What **are you going to do** after graduation?'
    ]
  } as LessonContent,

  // === CORE GRAMMAR BY LEVELS ===
  'lesson_Levels_A1_Subject Pronouns': {
    title: 'Subject Pronouns (I, you, he, she, it, we, they)',
    explanation: 'Subject pronouns replace nouns that act as the subject of a sentence (the person or thing performing the action). They are essential for simple, clear sentence construction.',
    examples: [
      '**I** am a student studying English at school.',
      '**They** live in a beautiful house in San Francisco.',
      '**She** works as a dedicated nurse at the city hospital.',
      '**It** is a lovely day to take a walk outside.',
      '**We** play football together every weekend.'
    ]
  } as LessonContent,

  'lesson_Levels_A1_To Be (am, is, are)': {
    title: 'The Verb "To Be" (am, is, are)',
    explanation: 'The verb "to be" is the most important verb in English. It is used to describe states of being, identity, nationality, age, profession, and characteristics.',
    structure: {
      affirmative: 'Subject + am/is/are',
      negative: 'Subject + am/is/are not',
      question: 'Am/Is/Are + Subject?'
    },
    examples: [
      'She **is** an expert graphic designer from Germany.',
      'They **are not** angry; they are simply tired.',
      '**Are you** excited about starting your new job?',
      'I **am** twenty-five years old today.',
      'We **are** proud of your academic achievements.'
    ]
  } as LessonContent,

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
  return null;
}
