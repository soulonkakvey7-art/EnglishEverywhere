import { LessonContent } from '../types';

export const COMPREHENSIVE_TENSES_DATA: Record<string, LessonContent> = {
  'Present Simple': {
    title: 'Present Simple Tense',
    explanation: 'The Present Simple tense is the foundational building block of English grammar. It describes actions that happen repeatedly as routines or habits, permanent facts, scientific truths, and scheduled timetables. Unlike continuous tenses, it does not describe what you are doing at this exact second, but rather what is generally true in your life.',
    explanationKhmer: 'បច្ចុប្បន្នកាលធម្មតា (Present Simple Tense) ត្រូវបានប្រើដើម្បីពិពណ៌នាអំពីទម្លាប់ប្រចាំថ្ងៃ សកម្មភាពដដែលៗ ការពិតជាសកល ឬវិទ្យាសាស្ត្រ និងកាលវិភាគដែលបានកំណត់ជាក់លាក់។ វាមិនសំដៅលើអ្វីដែលកំពុងកើតឡើងនៅវិនាទីនេះទេ ប៉ុន្តែពិពណ៌នាអំពីស្ថានភាពទូទៅនៃជីវិត។',
    structure: {
      affirmative: 'Subject + Verb 1 (s/es with he/she/it) + Object',
      negative: 'Subject + do not (don\'t) / does not (doesn\'t) + Verb 1 (base) + Object',
      question: 'Do / Does + Subject + Verb 1 (base) + Object?',
      notes: 'Add -s or -es to the verb when the subject is 3rd-person singular (He, She, It, or singular noun). When using "does" or "doesn\'t", the main verb always returns to its base form!'
    },
    usages: [
      {
        situation: 'Habits, Routines & Daily Life',
        description: 'Used for actions that you perform regularly, repeatedly, or on a consistent schedule.',
        examples: [
          'I **wake up** at 6:30 AM **every day** and drink coffee.',
          'She usually **walks** her dog in the park before breakfast.'
        ]
      },
      {
        situation: 'General Truths & Scientific Facts',
        description: 'Used for universal laws of nature, permanent facts, and realities that never change.',
        examples: [
          'Water **boils** at 100 degrees Celsius under normal atmospheric pressure.',
          'The sun **rises** in the east and **sets** in the west.'
        ]
      },
      {
        situation: 'Permanent States & Long-term Situations',
        description: 'Used for enduring situations, professions, or residences that are generally stable.',
        examples: [
          'My parents **live** in a quiet village outside Phnom Penh.',
          'He **works** as an architectural designer for a global firm.'
        ]
      },
      {
        situation: 'Fixed Timetables & Scheduled Programs',
        description: 'Used for public transportation, school timetables, store hours, and official events (even if referring to the near future).',
        examples: [
          'The morning express train **departs** at exactly 8:15 AM tomorrow.',
          'The grocery store **opens** at 8:00 AM and **closes** at 10:00 PM.'
        ]
      }
    ],
    signalWords: {
      keywords: [
        'always', 'usually', 'often', 'sometimes', 'rarely', 
        'seldom', 'hardly ever', 'never', 'every day', 'every week', 
        'every month', 'on Mondays', 'at weekends', 'once a week', 'twice a year'
      ],
      tip: 'Adverbs of frequency (always, often, usually) typically sit right BEFORE the main verb (e.g., "She always smiles"), but AFTER the verb "to be" (e.g., "He is always polite"). Time phrases with "every..." usually go at the beginning or end of the sentence.',
      examples: [
        'He **always** **arrives** fifteen minutes before the meeting starts.',
        'We visit our grandparents in the countryside **every Sunday**.'
      ]
    },
    examples: [
      'She **drinks** green tea every single morning to stay energized.',
      'They **do not eat** meat because they are strict vegetarians.',
      '**Does your brother speak** fluent English and French?',
      'Water **freezes** at 0 degrees Celsius and boils at 100 degrees.',
      'The university semester **starts** on the first Monday of September.',
      'He **plays** badminton with his colleagues twice a week.',
      'My grandparents **live** in a peaceful village near the green mountains.',
      'The express train to the capital **departs** at exactly 7:30 AM every morning.',
      'She **does not like** waking up early on Sunday mornings.',
      '**Do you practice** conversational English with international friends regularly?',
      'Cats **have** exceptional night vision compared to most other animals.'
    ]
  },

  'Present Continuous': {
    title: 'Present Continuous Tense',
    explanation: 'The Present Continuous tense (also known as the Present Progressive) expresses actions that are actively happening right now at the precise moment of speaking, or temporary situations occurring around this period. It is formed using the auxiliary verb "be" (am/is/are) followed by the main verb with an "-ing" suffix.',
    explanationKhmer: 'បច្ចុប្បន្នកាលកំពុងបន្ត (Present Continuous Tense) ត្រូវបានប្រើដើម្បីបង្ហាញពីសកម្មភាពដែលកំពុងកើតឡើងនៅពេលកំពុងនិយាយ ឬស្ថានភាពបណ្ដោះអាសន្នក្នុងអំឡុងពេលនេះ។ កាលនេះក៏អាចប្រើសម្រាប់គម្រោងអនាគតដែលបានរៀបចំទុកជាមុនយ៉ាងច្បាស់លាស់ផងដែរ។',
    structure: {
      affirmative: 'Subject + am / is / are + Verb-ing + Object',
      negative: 'Subject + am / is / are + not + Verb-ing + Object',
      question: 'Am / Is / Are + Subject + Verb-ing + Object?',
      notes: 'Use "am" with I; "is" with He/She/It; "are" with You/We/They. Stative verbs (verbs of feeling and thinking like love, know, understand, believe, want) are rarely used in continuous tenses.'
    },
    usages: [
      {
        situation: 'Actions Happening Right Now',
        description: 'Used for activities unfolding at this exact second while you are speaking.',
        examples: [
          'Please speak quietly; the baby **is sleeping** in the next room **right now**.',
          'I **am writing** an important email to my supervisor at this moment.'
        ]
      },
      {
        situation: 'Temporary Situations in Progress',
        description: 'Used for activities happening around this time period, even if not at this very instant.',
        examples: [
          'She **is living** with her aunt **these days** until she finds an apartment.',
          'Our engineering team **is developing** a new mobile app this month.'
        ]
      },
      {
        situation: 'Definite Future Arrangements',
        description: 'Used for plans already agreed upon and scheduled with other people in the near future.',
        examples: [
          'I **am meeting** the doctor at 3:00 PM tomorrow afternoon.',
          'They **are flying** to Singapore **next Friday** for a conference.'
        ]
      },
      {
        situation: 'Changing & Developing Situations',
        description: 'Used to describe ongoing gradual trends or evolutions in society and nature.',
        examples: [
          'The weather **is getting** colder as winter approaches.',
          'More students **are using** digital learning platforms every day.'
        ]
      }
    ],
    signalWords: {
      keywords: [
        'now', 'right now', 'at the moment', 'at present', 
        'currently', 'these days', 'this week', 'this month', 
        'Look!', 'Listen!', 'Be quiet!', 'for now'
      ],
      tip: 'Sensory alert words like "Look!" or "Listen!" at the start of a sentence are immediate signals that an action is in progress right in front of the speaker.',
      examples: [
        '**Look!** The children **are playing** in the snow outside.',
        'She **is currently working** on her master\'s thesis **at the moment**.'
      ]
    },
    examples: [
      'He **is studying** in the quiet library for his upcoming licensing exam.',
      'We **are not watching** television right now; we are discussing tomorrow\'s plan.',
      '**Are you listening** carefully to the instructions from the instructor?',
      'The city **is expanding** rapidly toward the northern suburbs.',
      'I **am reading** a fascinating history book about ancient kingdoms this week.',
      'Look outside! It **is snowing** heavily over the green hills.',
      'She **is staying** with her cousin until she finds an affordable apartment.',
      'Why **are you wearing** such a thick coat in this warm weather?',
      'Our software engineers **are updating** the main database server at the moment.',
      'More and more companies **are adopting** flexible remote work policies this year.',
      'Listen! The choir **is singing** beautifully in the auditorium.'
    ]
  },

  'Present Perfect': {
    title: 'Present Perfect Tense',
    explanation: 'The Present Perfect tense creates a bridge connecting the past to the present moment. It describes life experiences at an unspecified time, completed actions whose results directly impact the present, or ongoing actions that started in the past and continue into the present.',
    explanationKhmer: 'បច្ចុប្បន្នកាលបរិបូណ៍ (Present Perfect Tense) ភ្ជាប់អតីតកាលមកកាន់បច្ចុប្បន្នកាល។ ប្រើសម្រាប់បទពិសោធន៍ជីវិតដែលមិនបញ្ជាក់ពេលវេលាច្បាស់លាស់ សកម្មភាពដែលបានបញ្ចប់ថ្មីៗហើយមានផលប៉ះពាល់ដល់បច្ចុប្បន្ន ឬសកម្មភាពដែលបានចាប់ផ្ដើមតាំងពីអតីតកាលហើយបន្តរហូតដល់ពេលនេះ។',
    structure: {
      affirmative: 'Subject + have / has + Past Participle (V3) + Object',
      negative: 'Subject + have / has not (haven\'t / hasn\'t) + Past Participle (V3) + Object',
      question: 'Have / Has + Subject + Past Participle (V3) + Object?',
      notes: 'Use "has" with He/She/It and "have" with I/You/We/They. Do NOT mention a specific past time (e.g. yesterday, 2010); doing so requires the Past Simple instead!'
    },
    usages: [
      {
        situation: 'Life Experiences (Unspecified Past Time)',
        description: 'Used to discuss experiences in your life up to the present moment without specifying when.',
        examples: [
          'I **have visited** Angkor Wat three times in my life.',
          '**Have you ever tried** genuine Japanese ramen?'
        ]
      },
      {
        situation: 'Actions Starting in the Past & Continuing Now',
        description: 'Used with "since" (starting point) and "for" (duration) to show duration up to this moment.',
        examples: [
          'They **have lived** in this house **since** 2018.',
          'She **has worked** as an accountant at this company **for** six years.'
        ]
      },
      {
        situation: 'Recent Actions with Visible Present Results',
        description: 'Used when an action finished moments ago and its result is visibly relevant right now.',
        examples: [
          'I **have lost** my house keys, so I cannot enter my apartment.',
          'He **has just washed** his car; the paint is still wet.'
        ]
      },
      {
        situation: 'Unfinished Time Periods',
        description: 'Used when the time period mentioned (today, this morning, this year) has not yet ended.',
        examples: [
          'I **have drunk** two cups of coffee **this morning** (and it is still morning).',
          'We **have completed** three major chapters **this week**.'
        ]
      }
    ],
    signalWords: {
      keywords: [
        'already', 'just', 'yet', 'ever', 'never', 
        'since', 'for', 'recently', 'lately', 'so far', 
        'up to now', 'how long'
      ],
      tip: '"Already" and "just" sit between have/has and the past participle (e.g., "I have already finished"). "Yet" appears at the end of negative sentences and questions (e.g., "Have you eaten yet?"). "Since" indicates the starting point (since 2015), while "for" indicates duration (for 5 years).',
      examples: [
        'She has **already** **submitted** her application online.',
        'I have not received any response from the admissions office **yet**.'
      ]
    },
    examples: [
      'We **have known** each other since our elementary school days.',
      'He **has not finished** cleaning his room and organizing his desk yet.',
      '**Have they ever traveled** outside of Southeast Asia before?',
      'She **has just baked** fresh chocolate chip cookies for the children.',
      'I **have seen** that award-winning documentary four times already.',
      'They **have lived** in this historic neighborhood for over twenty years.',
      'He **has already submitted** his university scholarship application online.',
      'I **have lost** my car keys, so I cannot drive to work today.',
      '**Has the manager reviewed** the quarterly financial report yet?',
      'She **has never visited** the National Museum in Phnom Penh.',
      'Our team **has accomplished** all major project milestones this month.'
    ]
  },

  'Present Perfect Continuous': {
    title: 'Present Perfect Continuous Tense',
    explanation: 'The Present Perfect Continuous tense emphasizes the ongoing process, duration, or effort of an activity that began in the past and is either still happening right now, or has just stopped with clear evidence in the present. It puts the spotlight on the duration rather than the final completed result.',
    explanationKhmer: 'បច្ចុប្បន្នកាលបរិបូណ៍កំពុងបន្ត (Present Perfect Continuous Tense) សង្កត់ធ្ងន់លើរយៈពេលដំណើរការ និងការខិតខំនៃសកម្មភាពដែលបានចាប់ផ្ដើមកាលពីអតីតកាល ហើយនៅតែកំពុងបន្តរហូតមកដល់បច្ចុប្បន្ន ឬទើបតែបានឈប់ប៉ុន្តែមានភស្តុតាងជាក់ស្តែងនៅចំពោះមុខ។',
    structure: {
      affirmative: 'Subject + have / has + been + Verb-ing + Object',
      negative: 'Subject + have / has not + been + Verb-ing + Object',
      question: 'Have / Has + Subject + been + Verb-ing + Object?',
      notes: 'Formed with have/has + been + verb-ing. When you want to answer "How long?", this is the preferred tense for action verbs.'
    },
    usages: [
      {
        situation: 'Actions Continuing Over a Duration up to Now',
        description: 'Used when an activity started in the past and has been continuing without interruption.',
        examples: [
          'It **has been raining** non-stop **for** three hours.',
          'She **has been studying** for her medical entrance exam **all afternoon**.'
        ]
      },
      {
        situation: 'Recent Continuous Action with Present Evidence',
        description: 'Used when an activity recently ceased, but its physical effects are obvious right now.',
        examples: [
          'My hands are covered in paint because I **have been redecorating** the room.',
          'You look exhausted; **have you been exercising** at the gym?'
        ]
      },
      {
        situation: 'Temporary Habits and Changing Routines',
        description: 'Used to describe a temporary ongoing routine newly adopted in recent times.',
        examples: [
          'I **have been walking** to work **lately** to improve my cardiovascular health.',
          'He **has been practicing** the guitar every evening this week.'
        ]
      }
    ],
    signalWords: {
      keywords: [
        'for', 'since', 'all day', 'all morning', 
        'all week', 'lately', 'recently', 'how long', 
        'these past few days'
      ],
      tip: 'Whenever a sentence asks "How long have you been...?" or includes continuous markers like "all morning" or "for hours", use the Present Perfect Continuous to highlight unbroken duration.',
      examples: [
        'How long **have you been waiting** here in the lobby?',
        'He **has been working** on that research paper **all day**.'
      ]
    },
    examples: [
      'They **have been discussing** the contract terms for over two hours.',
      'She **has not been feeling** well since yesterday evening.',
      '**Have you been reading** that fantasy novel all afternoon?',
      'The children are soaking wet because they **have been swimming** in the pool.',
      'We **have been planning** this international family vacation for several months.',
      'It **has been raining** non-stop across the valley since early morning.',
      'How long **have you been waiting** here in the medical clinic waiting room?',
      'He **has been practicing** his guitar solo for the upcoming music festival.',
      'My eyes hurt because I **have been staring** at computer monitors all day.',
      'She **has been working** as a senior graphic designer at the agency since 2019.',
      'Why **have you been avoiding** my calls these past few days?'
    ]
  },

  'Past Simple': {
    title: 'Past Simple Tense',
    explanation: 'The Past Simple tense is used to describe actions, events, or situations that began and finished completely at a specific, known point in the past. It is the core storytelling tense in English. Regular verbs add "-ed", while irregular verbs change into unique past forms (V2).',
    explanationKhmer: 'អតីតកាលធម្មតា (Past Simple Tense) ត្រូវបានប្រើដើម្បីពិពណ៌នាអំពីសកម្មភាព ព្រឹត្តិការណ៍ ឬស្ថានភាពដែលបានកើតឡើង និងបានបញ្ចប់ទាំងស្រុងនៅពេលវេលាជាក់លាក់ណាមួយក្នុងអតីតកាល។ នេះជាកាលដ៏សំខាន់បំផុតសម្រាប់ការរៀបរាប់ដំណើររឿង។',
    structure: {
      affirmative: 'Subject + Verb 2 (past form: -ed or irregular) + Object',
      negative: 'Subject + did not (didn\'t) + Verb 1 (base form) + Object',
      question: 'Did + Subject + Verb 1 (base form) + Object?',
      notes: 'CRITICAL RULE: In negative sentences and questions, the auxiliary "did" already carries the past tense, so the main verb MUST revert to its base form (e.g., "I didn\'t went" is INCORRECT; "I didn\'t go" is CORRECT).'
    },
    usages: [
      {
        situation: 'Completed Actions at a Definite Past Time',
        description: 'Used for events that finished at a specific, stated past time.',
        examples: [
          'We **visited** our grandparents in Siem Reap **last weekend**.',
          'She **graduated** from the university in **2021** with honors.'
        ]
      },
      {
        situation: 'A Sequence of Consecutive Past Actions',
        description: 'Used in narrative storytelling for actions that happened one after another in chronological order.',
        examples: [
          'He **entered** the room, **took off** his coat, and **sat down** at his desk.',
          'She **opened** the envelope, **read** the letter, and **smiled** with joy.'
        ]
      },
      {
        situation: 'Past Habits & Discontinued States',
        description: 'Used for routines or states that were true in the past, but are no longer true today.',
        examples: [
          'When I was a teenager, I **played** soccer every afternoon.',
          'They **lived** in London for five years before moving to Singapore.'
        ]
      }
    ],
    signalWords: {
      keywords: [
        'yesterday', 'last night', 'last week', 'last month', 
        'last year', '... ago (2 days ago)', 'in 2015', 'in 1999', 
        'the other day', 'when I was young', 'in the past'
      ],
      tip: 'Whenever you see a closed time marker like "yesterday", "ago", "in 2010", or "last...", you MUST use the Past Simple. Never use the Present Perfect with finished past time expressions!',
      examples: [
        'She **called** me ten minutes **ago** to confirm the reservation.',
        'We **bought** this comfortable sofa **last year** during the holiday sale.'
      ]
    },
    examples: [
      'They **built** this historic suspension bridge over a hundred years ago.',
      'He **did not attend** the scheduled staff meeting yesterday afternoon.',
      '**Did you receive** the official tracking number for your package?',
      'I **lost** my wallet on the bus yesterday, but an honest passenger returned it.',
      'She **wrote** three insightful research essays during her final college semester.',
      'We **visited** the majestic Angkor Wat temples during our holiday last December.',
      'The power suddenly **went out** in the middle of the thunderstorm last night.',
      'He **graduated** with top honors from medical school in 2021.',
      'They **sold** their old automobile and bought an electric vehicle last week.',
      '**Did she call** you after she arrived safely at the international airport?',
      'I **woke up** early, **prepared** a nutritious breakfast, and **went** for a morning jog.'
    ]
  },

  'Past Continuous': {
    title: 'Past Continuous Tense',
    explanation: 'The Past Continuous tense describes an ongoing action that was in progress at a specific moment in the past. It often serves as the background action in a story when another shorter event suddenly interrupted it.',
    explanationKhmer: 'អតីតកាលកំពុងបន្ត (Past Continuous Tense) ត្រូវបានប្រើដើម្បីពិពណ៌នាអំពីសកម្មភាពដែលកំពុងដំណើរការនៅពេលវេលាជាក់លាក់ណាមួយក្នុងអតីតកាល។ ជាញឹកញាប់ វាត្រូវបានប្រើជាសកម្មភាពផ្ទៃខាងក្រោយដែលកំពុងដំណើរការ ហើយត្រូវបានកាត់ផ្តាច់ដោយសកម្មភាពខ្លីមួយផ្សេងទៀត (Past Simple)។',
    structure: {
      affirmative: 'Subject + was / were + Verb-ing + Object',
      negative: 'Subject + was / were not (wasn\'t / weren\'t) + Verb-ing + Object',
      question: 'Was / Were + Subject + Verb-ing + Object?',
      notes: 'Use "was" with I, He, She, It (singular); use "were" with You, We, They (plural).'
    },
    usages: [
      {
        situation: 'Action in Progress at a Specific Past Time',
        description: 'Used for an activity that was actively unfolding at an exact clock time yesterday.',
        examples: [
          'At 8:00 PM **last night**, I **was watching** an educational documentary.',
          'At midnight, they **were driving** through the stormy mountain pass.'
        ]
      },
      {
        situation: 'Interrupted Action in the Past',
        description: 'Used when a continuous background action was interrupted by a sudden, completed action (Past Simple).',
        examples: [
          'I **was cooking** dinner **when** the fire alarm suddenly **sounded**.',
          '**While** she **was walking** in the park, she **spotted** a colorful bird.'
        ]
      },
      {
        situation: 'Parallel Simultaneous Actions in the Past',
        description: 'Used when two ongoing actions were happening at the exact same time in the past.',
        examples: [
          'While my brother **was studying** in his room, I **was practicing** the piano.',
          'The children **were laughing** while the teacher **was telling** an engaging story.'
        ]
      },
      {
        situation: 'Atmospheric Story Setting',
        description: 'Used to establish the mood, weather, and setting at the opening of a story.',
        examples: [
          'The sun **was shining** and the birds **were singing** as David left the village.'
        ]
      }
    ],
    signalWords: {
      keywords: [
        'while', 'as', 'when', 'at that exact moment', 
        'at 7:00 PM yesterday', 'all evening yesterday', 'during that time'
      ],
      tip: '"While" or "As" usually introduces the longer continuous background clause (e.g. "While I was sleeping..."), whereas "When" usually introduces the interrupting short action in Past Simple (e.g. "...when the phone rang").',
      examples: [
        '**While** we **were having** dinner, the power went out.',
        'What were you doing **at 10:00 AM yesterday**?'
      ]
    },
    examples: [
      'He **was reading** a gripping mystery novel when the room lights suddenly flickered.',
      'They **were not sleeping** peacefully during the loud midnight thunderstorm.',
      '**Was she working** at her office desk when the general manager walked in?',
      'I **was thinking** about calling you just as your text message popped up.',
      'We **were traveling** across scenic countryside roads throughout the entire summer of 2019.',
      'At 8:30 PM last night, I **was cooking** a traditional dinner for my family.',
      'While my brother **was studying** for his test, I **was practicing** the piano.',
      'The children **were playing** soccer in the backyard when it started to pour.',
      'What **were you doing** at this exact hour yesterday afternoon?',
      'The ambulance siren **was wailing** as the emergency vehicle sped through the intersection.',
      'She **was not paying** attention to the road because she was distracted by her phone.'
    ]
  },

  'Past Perfect': {
    title: 'Past Perfect Tense',
    explanation: 'The Past Perfect tense represents the "past of the past." When you are speaking about the past and need to refer back to an earlier event that happened before another past moment, you use the Past Perfect. It establishes clear chronological sequence between multiple past events.',
    explanationKhmer: 'អតីតកាលបរិបូណ៍ (Past Perfect Tense) ត្រូវបានគេហៅថា "អតីតកាលនៃអតីតកាល"។ ប្រើដើម្បីបញ្ជាក់ពីសកម្មភាពមួយដែលបានកើតឡើង និងបានបញ្ចប់មុនសកម្មភាពមួយផ្សេងទៀតក្នុងអតីតកាល ដោយជួយរៀបលំដាប់លំដោយនៃពេលវេលាឱ្យបានច្បាស់លាស់។',
    structure: {
      affirmative: 'Subject + had + Past Participle (V3) + Object',
      negative: 'Subject + had not (hadn\'t) + Past Participle (V3) + Object',
      question: 'Had + Subject + Past Participle (V3) + Object?',
      notes: '"Had" is used universally for all subjects (I, you, he, she, it, we, they) followed by the past participle (V3).'
    },
    usages: [
      {
        situation: 'Action Completed Before Another Past Action',
        description: 'Used to clarify which of two past events took place first.',
        examples: [
          'The train **had already left** **before** we arrived at the station platform.',
          '**By the time** the doctor arrived, the patient **had regained** consciousness.'
        ]
      },
      {
        situation: 'Cause and Effect in Past Narrative',
        description: 'Used to explain the underlying reason for a past condition.',
        examples: [
          'He was terribly nervous during takeoff because he **had never flown** before.',
          'She felt relieved because she **had passed** her difficult qualifying examination.'
        ]
      },
      {
        situation: 'Unrealized Past Intentions & Regrets',
        description: 'Used with verbs like hope, wish, or intend to show a past plan that did not happen.',
        examples: [
          'I **had hoped** to visit the museum, but it was closed for renovations.'
        ]
      }
    ],
    signalWords: {
      keywords: [
        'already', 'before', 'after', 'by the time', 
        'until then', 'prior to', 'never... before', 'as soon as'
      ],
      tip: 'Look for two past actions linked by "before", "after", or "by the time". The earlier action always gets "had + V3" (Past Perfect), and the subsequent action gets Past Simple.',
      examples: [
        'She realized she **had forgotten** her passport **after** she reached the airport.',
        'By the time the sun set, the climbers **had reached** the mountain peak.'
      ]
    },
    examples: [
      'They **had finished** their dinner before the unexpected surprise guests arrived.',
      'He **had not saved** his manuscript file before the laptop computer crashed.',
      '**Had you studied** basic French grammar before you relocated to Montreal?',
      'She **had lived** in Tokyo for three years before deciding to move to London.',
      'The historic museum **had closed** its gates by the time we bought our entry tickets.',
      'By the time the rescue team reached the peak, the lost hikers **had found** shelter.',
      'He felt relaxed during the flight because he **had flown** on airplanes many times before.',
      'She realized she **had forgotten** her passport only after she reached the airport check-in.',
      'The train **had already departed** from platform 4 before we entered the station.',
      'They **had never seen** real snow in person until they traveled to Switzerland.',
      'As soon as the bell rang, the students **had submitted** their test papers.'
    ]
  },

  'Past Perfect Continuous': {
    title: 'Past Perfect Continuous Tense',
    explanation: 'The Past Perfect Continuous tense shows that an action started in the past and continued up until another point in the past, emphasizing the duration and continuous effort. It is often used to explain the cause of a past condition.',
    explanationKhmer: 'អតីតកាលបរិបូណ៍កំពុងបន្ត (Past Perfect Continuous Tense) បង្ហាញថាសកម្មភាពមួយបានចាប់ផ្ដើមក្នុងអតីតកាល ហើយបានបន្តដំណើរការឥតឈប់ឈររហូតដល់ចំណុចពេលវេលាមួយទៀតក្នុងអតីតកាល ដោយសង្កត់ធ្ងន់លើរយៈពេល។ ជាញឹកញាប់ប្រើដើម្បីពន្យល់ពីមូលហេតុនៃស្ថានភាពអតីតកាល។',
    structure: {
      affirmative: 'Subject + had been + Verb-ing + Object',
      negative: 'Subject + had not (hadn\'t) been + Verb-ing + Object',
      question: 'Had + Subject + been + Verb-ing + Object?',
      notes: 'Combines "had been" with the -ing form of the verb for all subjects.'
    },
    usages: [
      {
        situation: 'Continuous Action Leading Up to Another Past Event',
        description: 'Used to show how long an action was unfolding before another past event occurred.',
        examples: [
          'She **had been studying** English **for five years** before she moved to Australia.',
          'They **had been hiking** for four hours **when** it started to rain heavily.'
        ]
      },
      {
        situation: 'Cause of a Visible Past Condition',
        description: 'Used to describe the ongoing activity that caused a visible result in the past.',
        examples: [
          'The ground was wet and muddy because it **had been raining** all night.',
          'His eyes were tired because he **had been staring** at his computer screen.'
        ]
      }
    ],
    signalWords: {
      keywords: [
        'for', 'since', 'before', 'all day', 
        'all night', 'how long', 'until'
      ],
      tip: 'When a past result ("He was exhausted") is paired with a duration ("for three hours"), use the Past Perfect Continuous to express the continuous effort that caused the state.',
      examples: [
        'He was out of breath because he **had been running** for forty minutes.',
        'How long **had you been waiting** before the bus finally arrived?'
      ]
    },
    examples: [
      'We **had been driving** in circles for an hour before finally finding the hotel.',
      'She **had not been sleeping** well for several weeks prior to her final exams.',
      '**Had they been arguing** before the project manager entered the conference room?',
      'The athlete **had been training** rigorously for months before winning the championship.',
      'The water pipes burst because the temperature **had been dropping** steadily for days.',
      'He was out of breath when he arrived because he **had been running** to catch the bus.',
      'She **had been working** at the multinational firm for ten years before she resigned.',
      'How long **had you been waiting** before the doctor finally called your name?',
      'The ground was soaked and muddy because it **had been raining** heavily all night long.',
      'They **had been saving** money diligently for five years before purchasing their dream home.',
      'My eyes were burning because I **had been reading** microscopic font for hours.'
    ]
  },

  'Future Simple': {
    title: 'Future Simple Tense',
    explanation: 'The Future Simple tense expresses actions that will occur in the future. It is primarily used with the modal verb "will" to make spontaneous on-the-spot decisions, express personal beliefs or predictions, give promises, and state future facts that cannot be altered.',
    explanationKhmer: 'អនាគតកាលធម្មតា (Future Simple Tense) ត្រូវបានប្រើជាមួយ "will" ដើម្បីបង្ហាញពីការសម្រេចចិត្តភ្លាមៗនៅពេលកំពុងនិយាយ ការទស្សន៍ទាយផ្អែកលើគំនិតផ្ទាល់ខ្លួន ការសន្យា ការផ្តល់ជំនួយ និងការពិតដែលនឹងកើតឡើងក្នុងអនាគត។',
    structure: {
      affirmative: 'Subject + will + Verb 1 (base form) + Object',
      negative: 'Subject + will not (won\'t) + Verb 1 (base form) + Object',
      question: 'Will + Subject + Verb 1 (base form) + Object?',
      notes: 'Always use the pure base form of the verb after "will". Never add -s, -ed, or -ing (e.g., "She will goes" is WRONG -> "She will go" is CORRECT).'
    },
    usages: [
      {
        situation: 'Spontaneous Decisions (On the Spot)',
        description: 'Decisions made at the exact instant of speaking without prior deliberation.',
        examples: [
          'The telephone is ringing; I **will answer** it right away!',
          'I am feeling quite hungry; I think I **will make** a fresh sandwich.'
        ]
      },
      {
        situation: 'Predictions Based on Opinion or Guesswork',
        description: 'What you think, believe, or assume will happen in the future.',
        examples: [
          'I think artificial intelligence **will transform** medical research in the next decade.',
          'Meteorologists believe the storm **will pass** by tomorrow morning.'
        ]
      },
      {
        situation: 'Promises, Offers & Commitments',
        description: 'Used to offer help, make assurances, or give solemn promises.',
        examples: [
          'I promise I **will not disclose** your confidential secret to anyone.',
          'Those bags look heavy; I **will help** you carry them upstairs.'
        ]
      },
      {
        situation: 'Incontestable Future Facts',
        description: 'Events that are bound to happen by calendar, nature, or time.',
        examples: [
          'The sun **will rise** tomorrow at 5:48 AM.',
          'Next month, my youngest sister **will turn** eighteen years old.'
        ]
      }
    ],
    signalWords: {
      keywords: [
        'tomorrow', 'next week', 'next month', 'next year', 
        'in the future', 'soon', 'I think', 'I believe', 
        'probably', 'maybe', 'perhaps', 'I promise'
      ],
      tip: 'Phrases expressing subjective belief like "I think...", "I believe...", or commitments like "I promise..." are classic indicators for Future Simple with "will".',
      examples: [
        'I **think** it **will rain** **tomorrow** afternoon.',
        'Don\'t worry, I **will call** you **as soon as** I land.'
      ]
    },
    examples: [
      'Experts believe electric vehicles **will dominate** automotive sales worldwide by 2035.',
      'We **will not tolerate** any form of disrespectful behavior or harassment here.',
      '**Will you join** us for a celebratory dinner at the Italian restaurant tonight?',
      'I **will email** you the finalized commercial contract within the next twenty minutes.',
      'Scientists **will discover** innovative renewable energy solutions in the near future.',
      'The phone is ringing loudly in the hallway; I **will get** it!',
      'Don\'t worry about the heavy grocery bags; I **will help** you carry them upstairs.',
      'I promise I **will never reveal** your confidential personal information to anyone.',
      'The sun **will rise** tomorrow morning at exactly 5:48 AM as usual.',
      'I think she **will pass** her driver\'s license test without any difficulty.',
      'What **will happen** if we do not meet the strict project deadline?'
    ]
  },

  'Future Continuous': {
    title: 'Future Continuous Tense',
    explanation: 'The Future Continuous tense describes an action that will be in progress at a specific time in the future, or actions that will unfold as a natural routine or matter of course. It allows you to project yourself into a future moment and picture an ongoing activity.',
    explanationKhmer: 'អនាគតកាលកំពុងបន្ត (Future Continuous Tense) ត្រូវបានប្រើដើម្បីពិពណ៌នាអំពីសកម្មភាពដែលនឹងកំពុងដំណើរការនៅពេលវេលាជាក់លាក់ណាមួយក្នុងអនាគត ឬសកម្មភាពដែលកើតឡើងតាមកាលវិភាគធម្មតា។',
    structure: {
      affirmative: 'Subject + will be + Verb-ing + Object',
      negative: 'Subject + will not be (won\'t be) + Verb-ing + Object',
      question: 'Will + Subject + be + Verb-ing + Object?',
      notes: '"will be + verb-ing" is used for all subjects without exception.'
    },
    usages: [
      {
        situation: 'Action in Progress at a Specific Future Time',
        description: 'Used when an activity will already be underway at a specified future hour.',
        examples: [
          'At 10:00 AM tomorrow, I **will be taking** my final licensing exam.',
          'This time next Sunday, we **will be relaxing** on the sandy beaches of Koh Rong.'
        ]
      },
      {
        situation: 'Routine Events in the Normal Course of Life',
        description: 'Used for activities that will occur naturally as part of regular habits or scheduled life.',
        examples: [
          'I **will be seeing** the team lead tomorrow morning, so I can hand her your report.',
          'The postman **will be delivering** the packages around noon.'
        ]
      },
      {
        situation: 'Polite Inquiries About Plans',
        description: 'Used to politely ask about someone\'s future plans without sounding demanding.',
        examples: [
          '**Will you be using** the meeting projector this afternoon?',
          '**Will you be joining** us for the company dinner next Friday?'
        ]
      }
    ],
    signalWords: {
      keywords: [
        'at this time tomorrow', 'this time next week', 
        'at 3:00 PM next Monday', 'during the summer', 'all day tomorrow'
      ],
      tip: 'Look for the combination of a specific clock time or marker with a future time expression (e.g., "at 9:00 PM tonight" or "this time next year").',
      examples: [
        'At midnight tonight, our flight **will be cruising** over the ocean.',
        'She **will be studying** in the library **all day tomorrow**.'
      ]
    },
    examples: [
      'By this time next month, we **will be living** in our newly renovated countryside home.',
      'They **will not be playing** tennis if the monsoon rain continues tomorrow.',
      '**Will she be working** late at the emergency clinic again this evening?',
      'I **will be driving** through the national park all afternoon tomorrow.',
      'The IT technicians **will be upgrading** the cloud server infrastructure tonight.',
      'This time next Tuesday, I **will be relaxing** by the turquoise ocean in Thailand.',
      '**Will you be using** the office printer in the next ten minutes, or can I print my slides?',
      'At 9:00 AM tomorrow, thousands of high school students **will be taking** the national exam.',
      'Don\'t call her at 2:00 PM because she **will be giving** a keynote presentation.',
      'We **will be flying** over the Pacific Ocean while you are having your morning breakfast.',
      'The postal carrier **will be delivering** today\'s registered packages between 1:00 PM and 3:00 PM.'
    ]
  },

  'Future Perfect': {
    title: 'Future Perfect Tense',
    explanation: 'The Future Perfect tense expresses an action that will be completed prior to a specific point of time or deadline in the future. It looks backwards from a future milestone to confirm that a milestone or goal will already be achieved.',
    explanationKhmer: 'អនាគតកាលបរិបូណ៍ (Future Perfect Tense) បង្ហាញពីសកម្មភាពដែលនឹងត្រូវបានបញ្ចប់រួចរាល់ មុនចំណុចពេលវេលាជាក់លាក់ណាមួយ ឬមុនថ្ងៃផុតកំណត់ក្នុងអនាគត។ ជាញឹកញាប់ប្រើជាមួយពាក្យ "by" (ត្រឹមពេល...)។',
    structure: {
      affirmative: 'Subject + will have + Past Participle (V3) + Object',
      negative: 'Subject + will not have (won\'t have) + Past Participle (V3) + Object',
      question: 'Will + Subject + have + Past Participle (V3) + Object?',
      notes: 'Always use "will have" + past participle (V3) for all subjects. Never write "will has"!'
    },
    usages: [
      {
        situation: 'Action Completed Before a Future Deadline',
        description: 'Used to state that an activity will be finished no later than a designated future point.',
        examples: [
          '**By next December**, our engineering crew **will have built** the new suspension bridge.',
          'She **will have graduated** from law school **by 2028**.'
        ]
      },
      {
        situation: 'Completion Prior to Another Future Event',
        description: 'Used when one future event will finish before another future event begins (with Present Simple in the time clause).',
        examples: [
          '**By the time** the manager arrives, I **will have compiled** the entire quarterly report.',
          'They **will have sold** out all the concert tickets before Friday.'
        ]
      }
    ],
    signalWords: {
      keywords: [
        'by', 'by the time', 'by next week', 'by next year', 
        'by then', 'before', 'in two years\' time'
      ],
      tip: 'The preposition "by" followed by a future time (e.g. "by 5:00 PM", "by 2030") or "by the time + Present Simple" is the single clearest indicator for Future Perfect.',
      examples: [
        '**By 6:00 PM**, we **will have finished** today\'s workshop.',
        '**By the time** you wake up, I **will have left** for the airport.'
      ]
    },
    examples: [
      'By next autumn, I **will have saved** enough money to purchase a reliable laptop.',
      'He **will not have completed** his master\'s thesis before the end of this semester.',
      '**Will you have finished** the financial audit before the board meeting next Monday?',
      'They **will have repaired** the entire highway bridge before the holiday weekend begins.',
      'By the end of this decade, scientists **will have developed** far more efficient batteries.',
      '**By 8:00 PM tonight**, the kitchen staff **will have served** over three hundred hot meals.',
      'By the time you graduate from university, your younger brother **will have started** high school.',
      'She **will have published** her second poetry book by next summer.',
      'By the time the plane lands in London, we **will have traveled** for fourteen continuous hours.',
      '**Will they have reached** their fundraising goal before the charity gala concludes?',
      'By next year, our company **will have opened** five new regional branch offices.'
    ]
  },

  'Future Perfect Continuous': {
    title: 'Future Perfect Continuous Tense',
    explanation: 'The Future Perfect Continuous tense is used to look ahead to a future milestone and measure the ongoing duration of an action up to that point. It highlights how long an activity will have been continuing by a specified future time.',
    explanationKhmer: 'អនាគតកាលបរិបូណ៍កំពុងបន្ត (Future Perfect Continuous Tense) ត្រូវបានប្រើដើម្បីវាស់វែងរយៈពេលនៃសកម្មភាពដែលកំពុងបន្ត រហូតដល់ចំណុចកំណត់ណាមួយក្នុងអនាគត ដោយសង្កត់ធ្ងន់ថាសកម្មភាពនោះនឹងបានបន្តដំណើរការអស់រយៈពេលប៉ុន្មាន។',
    structure: {
      affirmative: 'Subject + will have been + Verb-ing + Object',
      negative: 'Subject + will not have been + Verb-ing + Object',
      question: 'Will + Subject + have been + Verb-ing + Object?',
      notes: 'Combines "will have been" + verb-ing for all subjects.'
    },
    usages: [
      {
        situation: 'Ongoing Duration Measured at a Future Milestone',
        description: 'Used to celebrate or calculate the continuous duration of an action at a future anniversary or date.',
        examples: [
          '**By next month**, I **will have been teaching** at this university **for exactly ten years**.',
          '**By 8:00 PM**, they **will have been driving** through three countries **for 14 hours**.'
        ]
      },
      {
        situation: 'Cause of a Projected Future State',
        description: 'Used to explain why someone or something will be in a certain condition at a future moment.',
        examples: [
          'When she arrives, she will be exhausted because she **will have been traveling** for 30 hours.'
        ]
      }
    ],
    signalWords: {
      keywords: [
        'by next... for...', 'by the time... for...', 
        'how long... by then', 'for [duration] by [future time]'
      ],
      tip: 'Look for the simultaneous presence of a future deadline ("by next month") AND a duration phrase ("for 5 years"). Whenever you have both, Future Perfect Continuous is required.',
      examples: [
        'By next June, we **will have been living** in this apartment **for three years**.',
        'How long **will she have been practicing** medicine by the time she retires?'
      ]
    },
    examples: [
      'By next week, our team **will have been developing** this software for six continuous months.',
      'He **will not have been working** here long enough to qualify for the full annual bonus.',
      '**Will they have been traveling** for more than twenty-four hours by the time they arrive in London?',
      'By midnight, the marathon runner **will have been resting** peacefully for several hours.',
      'Next January, the doctor **will have been treating** patients in rural clinics for two full decades.',
      'By next June, my wife and I **will have been living** in this cozy apartment for five years.',
      'How long **will you have been studying** English by the time you take the IELTS examination?',
      'When she finishes her medical residency, she **will have been training** for twelve rigorous years.',
      'By 6:00 PM, the construction crew **will have been working** outdoors in the heat for eight hours.',
      'By next month, the author **will have been writing** his historical novel for three whole years.',
      'They will be exhausted because they **will have been hiking** through the mountains all day.'
    ]
  },

  'Conditional Sentences': {
    title: 'Conditional Sentences',
    explanation: 'Conditional sentences explore cause-and-effect relationships where the outcome in the main clause depends on whether the condition in the "if" clause is fulfilled. English features four core conditionals (Zero, First, Second, and Third) ranging from universal scientific realities to imaginary dreams and past regrets.',
    explanationKhmer: 'ប្រយោគលក្ខខណ្ឌ (Conditional Sentences) សិក្សាអំពីទំនាក់ទំនងហេតុនិងផល ដែលលទ្ធផលនៃលក្ខខណ្ឌមួយអាស្រ័យលើការបំពេញនៃលក្ខខណ្ឌមួយទៀត (If-clause)។ មាន ៤ ប្រភេទចម្បង៖ Zero (ការពិតវិទ្យាសាស្ត្រ), First (លទ្ធភាពដែលអាចកើតឡើងក្នុងអនាគត), Second (ការស្រមើស្រមៃក្នុងបច្ចុប្បន្ន), និង Third (ការសោកស្តាយចំពោះអតីតកាល)។',
    structure: {
      affirmative: 'If + Condition Clause, + Main Result Clause',
      negative: 'If + Negative Condition, + Negative Result (or use "Unless" = If not)',
      question: 'What + modal + Subject + do + if + condition?',
      notes: 'Core Types: Zero (If + Present, Present); 1st (If + Present, will + Verb); 2nd (If + Past Simple, would + Verb); 3rd (If + Past Perfect, would have + V3).'
    },
    usages: [
      {
        situation: 'Zero Conditional (Universal Truths & Natural Laws)',
        description: 'Used for scientific facts, general rules, and automatic consequences.',
        examples: [
          'If you **heat** water to 100 degrees Celsius, it **boils**.',
          'If you **mix** red and blue paint, you **get** purple.'
        ]
      },
      {
        situation: 'First Conditional (Real & Probable Future Scenarios)',
        description: 'Used for realistic future situations that have a genuine likelihood of happening.',
        examples: [
          'If it **rains** heavily tomorrow, we **will postpone** the soccer match.',
          'If you **study** consistently every day, you **will pass** the IELTS exam.'
        ]
      },
      {
        situation: 'Second Conditional (Hypothetical & Imaginary Situations)',
        description: 'Used for dreams, hypothetical ideas, or situations that are contrary to current reality.',
        examples: [
          'If I **won** the grand lottery, I **would build** a modern hospital for the community.',
          'If she **had** more free time, she **would learn** how to play the cello.'
        ]
      },
      {
        situation: 'Third Conditional (Past Regrets & Imaginary Past)',
        description: 'Used to talk about past events that cannot be changed and to express regret.',
        examples: [
          'If we **had left** twenty minutes earlier, we **would have caught** the express flight.',
          'If he **had not forgotten** his umbrella, he **would not have gotten** soaked in the rain.'
        ]
      }
    ],
    signalWords: {
      keywords: [
        'if', 'unless (if not)', 'provided that', 'as long as', 
        'in case', 'even if', 'supposing'
      ],
      tip: '"Unless" means "if not" (e.g., "Unless you study" = "If you do not study"). Memorize the verb pair harmony: Present -> will; Past -> would; Had + V3 -> would have + V3.',
      examples: [
        '**Unless** you leave right now, you **will be** late for your interview.',
        'I will lend you my vehicle **as long as** you drive carefully.'
      ]
    },
    examples: [
      'If you heat water to 100 degrees Celsius, it **boils** and turns into steam.',
      'If you mix red and yellow pigments together, you **get** bright orange.',
      'If it **rains** heavily tomorrow morning, we **will cancel** our outdoor picnic.',
      'If you **practice** speaking English every single day, your fluency **will improve** rapidly.',
      'If she **studies** diligently for the scholarship exam, she **will win** full university tuition.',
      'If I **had** a million dollars, I **would travel** around the world in a sailboat.',
      'If I **were** you, I **would accept** that exciting job offer without second thoughts.',
      'What **would you do** if you encountered a lost child in a crowded market?',
      'If we **had left** twenty minutes earlier, we **would have caught** the express flight.',
      'If he **had known** about the surprise party, he **would have arrived** on time.',
      'If they **had listened** to the safety warning, the unfortunate accident **would not have occurred**.'
    ]
  },

  'Future with Going To & Will': {
    title: 'Future with Going To & Will',
    explanation: 'Both "be going to" and "will" refer to future events, but native English speakers choose between them based on planning and evidence. Use "be going to" for pre-arranged intentions or predictions backed by visible present evidence. Use "will" for spontaneous decisions made on the spot or predictions based purely on personal opinion.',
    explanationKhmer: 'ការប្រៀបធៀប Going To និង Will៖ ទាំងពីរត្រូវបានប្រើសម្រាប់អនាគត ប៉ុន្តែមានអត្ថន័យខុសគ្នា។ ប្រើ "be going to" សម្រាប់គម្រោងឬបំណងដែលបានសម្រេចចិត្តទុកជាមុន ឬការទស្សន៍ទាយដែលមានភស្តុតាងជាក់ស្តែងចំពោះមុខ។ ប្រើ "will" សម្រាប់ការសម្រេចចិត្តភ្លាមៗនៅពេលកំពុងនិយាយ ឬការទស្សន៍ទាយផ្អែកលើការស្មាននិងគំនិតផ្ទាល់ខ្លួន។',
    structure: {
      affirmative: 'Going to: Subject + am/is/are + going to + Verb (base) | Will: Subject + will + Verb (base)',
      negative: 'Going to: Subject + am/is/are not + going to + Verb | Will: Subject + won\'t + Verb',
      question: 'Going to: Am/Is/Are + Subject + going to + Verb? | Will: Will + Subject + Verb?',
      notes: 'Shortcut Rule: "Going to" = Planned earlier OR physical evidence visible now. "Will" = Decided right now OR personal belief/offer.'
    },
    usages: [
      {
        situation: 'Prior Plans & Intentions ("Going To")',
        description: 'Used when a decision was already made before the conversation started.',
        examples: [
          'We **are going to paint** our living room this weekend; we bought the paint yesterday.',
          'She **is going to study** computer science at university next fall.'
        ]
      },
      {
        situation: 'Spontaneous On-the-Spot Decisions ("Will")',
        description: 'Used when you decide to do something at the very moment you are speaking.',
        examples: [
          'Someone is knocking at the door. I **will open** it!',
          'That box looks too heavy for you; I **will carry** it.'
        ]
      },
      {
        situation: 'Predictions with Present Physical Evidence ("Going To")',
        description: 'Used when you can see, hear, or feel evidence right now that an event is imminent.',
        examples: [
          'Look at those dark storm clouds! It **is going to rain** within minutes.',
          'Watch out! That unstable stack of books **is going to collapse**!'
        ]
      },
      {
        situation: 'Predictions Based on Opinion or Intuition ("Will")',
        description: 'Used for predictions without present physical evidence, often with think/believe.',
        examples: [
          'I think technology **will continue** to make remote work easier.',
          'She believes their team **will win** the championship match.'
        ]
      }
    ],
    signalWords: {
      keywords: [
        'Look at... (Going to)', 'Watch out! (Going to)', 'already decided (Going to)', 
        'planned (Going to)', 'I think (Will)', 'I believe (Will)', 
        'probably (Will)', 'I promise (Will)', 'on the spot (Will)'
      ],
      tip: 'If you can point to sensory evidence with your eyes right now ("Look at the clouds!"), use "be going to". If you are making a quick offer or expressing a personal feeling ("I\'ll help you!"), use "will".',
      examples: [
        '**Look at** that speeding car! It **is going to crash** into the curb.',
        'I am feeling chilly; I think I **will close** the window.'
      ]
    },
    examples: [
      'They **are going to visit** their relatives in Canada next summer; the flights are already booked.',
      'Don\'t worry about the dirty dinner dishes; I **will wash** them for you right now.',
      'Watch out! That wooden ladder is shaking violently; you **are going to fall**!',
      'Look at those dark, heavy storm clouds gathering! It **is going to rain** any minute.',
      'I promise I **will return** your borrowed notebook first thing tomorrow morning.',
      'The phone is ringing in the other room. I **will answer** it!',
      'What **are you going to wear** to the graduation ceremony next Saturday?',
      'I feel completely exhausted after that long run; I think I **will take** a warm bath.',
      'She **is going to start** her new accounting position at the national bank next Monday.',
      'I believe electric transport **will replace** fossil-fuel vehicles in the coming decades.',
      'He has bought flour, eggs, and sugar because he **is going to bake** a surprise birthday cake.'
    ]
  }
};

/**
 * Enriches the single explanatory text inside the Detailed Explanation area
 * with comprehensive Usages, Signal Words / Keywords with identification tips,
 * and clear everyday example sentences.
 */
export function buildEnrichedExplanation(item: LessonContent): string {
  if (!item) return '';
  if (item.explanation && item.explanation.includes('WHEN AND WHY TO USE THIS TENSE (USAGES):')) {
    return item.explanation;
  }

  const sections: string[] = [];

  // 1. Core Overview
  if (item.explanation) {
    sections.push(item.explanation);
  }

  // 2. Usages: When and Why each tense is used
  if (item.usages && item.usages.length > 0) {
    const usageLines: string[] = [
      'WHEN AND WHY TO USE THIS TENSE (USAGES):',
      ...item.usages.map((u, idx) => {
        let text = `${idx + 1}. ${u.situation}\n${u.description}`;
        if (u.examples && u.examples.length > 0) {
          const exList = u.examples.map(ex => `• Example: "${ex.replace(/\*\*/g, '')}"`).join('\n');
          text += `\n${exList}`;
        }
        return text;
      })
    ];
    sections.push(usageLines.join('\n\n'));
  }

  // 3. Signal Words & Keywords (How learners use them to identify the tense)
  if (item.signalWords) {
    const swLines: string[] = [
      'SIGNAL WORDS & KEY TIME MARKERS (HOW TO IDENTIFY):',
      `• Key Clues: ${item.signalWords.keywords.join(', ')}`,
      `• How Learners Can Identify This Tense: ${item.signalWords.tip}`
    ];
    if (item.signalWords.examples && item.signalWords.examples.length > 0) {
      swLines.push('• Everyday Example Sentences with Keywords:');
      item.signalWords.examples.forEach(ex => {
        swLines.push(`  - ${ex.replace(/\*\*/g, '')}`);
      });
    }
    sections.push(swLines.join('\n'));
  }

  // 4. Important Conjugation / Grammar Rule
  if (item.structure?.notes) {
    sections.push(`IMPORTANT LEARNER TIP:\n${item.structure.notes}`);
  }

  return sections.join('\n\n');
}

/**
 * Enriches the Khmer explanation with Usages, Signal Words, and Examples.
 */
export function buildEnrichedExplanationKhmer(item: LessonContent): string {
  if (!item) return '';
  if (item.explanationKhmer && item.explanationKhmer.includes('របៀប និងកាលៈទេសៈនៃការប្រើប្រាស់ (When & Why to Use):')) {
    return item.explanationKhmer;
  }

  const sections: string[] = [];

  if (item.explanationKhmer) {
    sections.push(item.explanationKhmer);
  }

  if (item.usages && item.usages.length > 0) {
    const khmerUsages: string[] = [
      'របៀប និងកាលៈទេសៈនៃការប្រើប្រាស់ (When & Why to Use):',
      ...item.usages.map((u, idx) => {
        let text = `${idx + 1}. ${u.situation}៖\n${u.description}`;
        if (u.examples && u.examples.length > 0) {
          const exList = u.examples.map(ex => `• ឧទាហរណ៍៖ "${ex.replace(/\*\*/g, '')}"`).join('\n');
          text += `\n${exList}`;
        }
        return text;
      })
    ];
    sections.push(khmerUsages.join('\n\n'));
  }

  if (item.signalWords) {
    const swLines: string[] = [
      'ពាក្យគន្លឹះ និងសញ្ញាសម្គាល់កាល (Signal Words & Keywords):',
      `• ពាក្យសម្គាល់សំខាន់ៗ៖ ${item.signalWords.keywords.join(', ')}`,
      `• គន្លឹះក្នុងការចំណាំ និងជ្រើសរើសកាលនេះ៖ ${item.signalWords.tip}`
    ];
    if (item.signalWords.examples && item.signalWords.examples.length > 0) {
      swLines.push('• ឧទាហរណ៍ជាក់ស្តែងជាមួយពាក្យសម្គាល់៖');
      item.signalWords.examples.forEach(ex => {
        swLines.push(`  - ${ex.replace(/\*\*/g, '')}`);
      });
    }
    sections.push(swLines.join('\n'));
  }

  return sections.join('\n\n');
}

/**
 * Helper to get enriched tense data by matching tense name or lesson title
 */
export function getTenseDetailedData(topicOrTitle: string): LessonContent | null {
  if (!topicOrTitle) return null;
  const clean = topicOrTitle.trim().toLowerCase();

  let matched: LessonContent | null = null;

  for (const [key, data] of Object.entries(COMPREHENSIVE_TENSES_DATA)) {
    const keyClean = key.toLowerCase();
    if (clean === keyClean || clean.includes(keyClean) || keyClean.includes(clean)) {
      matched = data;
      break;
    }
  }

  // Check aliases like "Simple Past" for "Past Simple"
  if (!matched) {
    if (clean.includes('simple past')) {
      matched = COMPREHENSIVE_TENSES_DATA['Past Simple'];
    } else if (clean.includes('present progressive')) {
      matched = COMPREHENSIVE_TENSES_DATA['Present Continuous'];
    } else if (clean.includes('past progressive')) {
      matched = COMPREHENSIVE_TENSES_DATA['Past Continuous'];
    } else if (clean.includes('future progressive')) {
      matched = COMPREHENSIVE_TENSES_DATA['Future Continuous'];
    } else if (clean.includes('conditional')) {
      matched = COMPREHENSIVE_TENSES_DATA['Conditional Sentences'];
    } else if (clean.includes('going to') || clean.includes('will vs')) {
      matched = COMPREHENSIVE_TENSES_DATA['Future with Going To & Will'];
    }
  }

  if (matched) {
    return {
      ...matched,
      explanation: buildEnrichedExplanation(matched),
      explanationKhmer: buildEnrichedExplanationKhmer(matched)
    };
  }

  return null;
}
