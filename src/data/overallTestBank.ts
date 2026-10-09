import { Quiz, QuizQuestion, CEFRLevel } from '../types';
import { balanceQuizOptions } from '../utils/quizUtils';

export interface BankQuestion extends QuizQuestion {
  level: CEFRLevel;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  domain?: 'parts_of_speech' | 'tenses' | 'conditionals' | 'modals' | 'passives' | 'advanced_syntax' | 'clauses';
}

/**
 * Curated comprehensive question bank covering:
 * 1. Parts of Speech (Noun, Pronoun, Verb, Adjective, Adverb, Preposition, Conjunction, Interjection)
 * 2. All 12 English Tenses (Present, Past, Future, Continuous, Perfect, Perfect Continuous)
 * 3. The Others (Conditionals, Passives, Reported Speech, Modals, Gerunds & Infinitives, Inversion, Subjunctive, Clefts, etc.)
 * Progressive difficulty balance: Easy (A1-A2), Medium (B1-B2), Hard/Mastery (C1-C2).
 */
export const OVERALL_TEST_BANK: BankQuestion[] = [
  // ==========================================
  // LEVEL A1: BEGINNER (EASY) - 12 Questions
  // ==========================================
  {
    question: "Choose the correct form of 'to be': Maria and I ____ students at the university.",
    options: ["am", "is", "are", "be"],
    correctAnswer: "are",
    explanation: "'Maria and I' equals 'we' (first-person plural), which takes **are**.",
    level: "A1",
    difficulty: "Easy",
    domain: "parts_of_speech"
  },
  {
    question: "Which sentence uses the correct Present Simple third-person singular form?",
    options: [
      "Daniel work at an engineering firm.",
      "Daniel works at an engineering firm.",
      "Daniel is work at an engineering firm.",
      "Daniel working at an engineering firm."
    ],
    correctAnswer: "Daniel works at an engineering firm.",
    explanation: "In Present Simple with he/she/it subjects, we append **-s** or **-es** to the base verb (works).",
    level: "A1",
    difficulty: "Easy",
    domain: "tenses"
  },
  {
    question: "Select the correct article: She needs ____ umbrella because it is beginning to rain.",
    options: ["a", "an", "the", "no article"],
    correctAnswer: "an",
    explanation: "We use **an** before singular countable nouns beginning with a vowel sound ('umbrella').",
    level: "A1",
    difficulty: "Easy",
    domain: "parts_of_speech"
  },
  {
    question: "Complete the sentence with the correct preposition of time: The conference begins ____ 9:00 AM on Monday.",
    options: ["in", "on", "at", "to"],
    correctAnswer: "at",
    explanation: "We use **at** for specific clock times (at 9:00 AM, at midnight).",
    level: "A1",
    difficulty: "Easy",
    domain: "parts_of_speech"
  },
  {
    question: "Choose the correct possessive adjective: Mark lost ____ keys while walking through the park.",
    options: ["him", "his", "he's", "her"],
    correctAnswer: "his",
    explanation: "**His** is the third-person masculine singular possessive adjective modifying 'keys'.",
    level: "A1",
    difficulty: "Easy",
    domain: "parts_of_speech"
  },
  {
    question: "Choose the correct demonstrative pronoun: Look at ____ birds high up in the distant sky!",
    options: ["this", "that", "these", "those"],
    correctAnswer: "those",
    explanation: "**Those** is used for plural nouns that are distant in space or time.",
    level: "A1",
    difficulty: "Easy",
    domain: "parts_of_speech"
  },
  {
    question: "Complete the negative Present Simple sentence: They ____ live in this residential district.",
    options: ["do not", "does not", "are not", "is not"],
    correctAnswer: "do not",
    explanation: "With plural subjects like 'they', the negative auxiliary in Present Simple is **do not** (don't).",
    level: "A1",
    difficulty: "Easy",
    domain: "tenses"
  },
  {
    question: "Choose the correct question word: '____ is your English teacher?' — 'Mr. Henderson.'",
    options: ["Who", "Where", "When", "What"],
    correctAnswer: "Who",
    explanation: "**Who** is the question word used to inquire about identity of people.",
    level: "A1",
    difficulty: "Easy",
    domain: "parts_of_speech"
  },
  {
    question: "Select the correct irregular plural noun: There are four ____ playing in the courtyard.",
    options: ["childs", "children", "childrens", "childes"],
    correctAnswer: "children",
    explanation: "The plural of 'child' is the irregular noun **children** without an 's'.",
    level: "A1",
    difficulty: "Easy",
    domain: "parts_of_speech"
  },
  {
    question: "Complete with the correct preposition of place: The laptop computer is ____ the desk.",
    options: ["on", "in", "at", "underneath of"],
    correctAnswer: "on",
    explanation: "We use **on** when an object is resting upon a horizontal surface.",
    level: "A1",
    difficulty: "Easy",
    domain: "parts_of_speech"
  },
  {
    question: "Which word is an interjection expressing sudden joy or celebration in: '____! We finally passed the examination!'",
    options: ["Hooray", "Because", "Quickly", "Between"],
    correctAnswer: "Hooray",
    explanation: "**Hooray** is an interjection used to express sudden joy, excitement, or victory.",
    level: "A1",
    difficulty: "Easy",
    domain: "parts_of_speech"
  },
  {
    question: "Choose the correct object pronoun: My sister called ____ yesterday evening to invite us to dinner.",
    options: ["we", "us", "our", "ours"],
    correctAnswer: "us",
    explanation: "**Us** is the first-person plural object pronoun receiving the action of the verb 'called'.",
    level: "A1",
    difficulty: "Easy",
    domain: "parts_of_speech"
  },

  // ==========================================
  // LEVEL A2: ELEMENTARY (EASY-MEDIUM) - 12 Questions
  // ==========================================
  {
    question: "Identify the correct Past Simple sentence:",
    options: [
      "Yesterday we go to the seaside.",
      "Yesterday we went to the seaside.",
      "Yesterday we goed to the seaside.",
      "Yesterday we was going to the seaside."
    ],
    correctAnswer: "Yesterday we went to the seaside.",
    explanation: "'Go' is an irregular verb whose past simple form is **went**.",
    level: "A2",
    difficulty: "Easy",
    domain: "tenses"
  },
  {
    question: "Select the correct comparative adjective: Mount Everest is ____ than Mount Kilimanjaro.",
    options: ["more high", "higher", "highest", "more higher"],
    correctAnswer: "higher",
    explanation: "For single-syllable adjectives, we add **-er** to form the comparative (high -> higher).",
    level: "A2",
    difficulty: "Easy",
    domain: "parts_of_speech"
  },
  {
    question: "Complete the sentence: Listen! The baby ____ in the nursery right now.",
    options: ["sleeps", "is sleeping", "slept", "was sleep"],
    correctAnswer: "is sleeping",
    explanation: "Actions currently happening at the moment of speech ('right now', 'Listen!') use **Present Continuous** (is sleeping).",
    level: "A2",
    difficulty: "Easy",
    domain: "tenses"
  },
  {
    question: "Choose the correct quantifier: We do not have ____ milk left in the refrigerator.",
    options: ["many", "some", "much", "few"],
    correctAnswer: "much",
    explanation: "'Milk' is an uncountable noun. In negative sentences, we use **much** for uncountable quantities.",
    level: "A2",
    difficulty: "Easy",
    domain: "parts_of_speech"
  },
  {
    question: "Complete with the correct superlative form: That was the ____ movie I have ever watched.",
    options: ["baddest", "worse", "worst", "most bad"],
    correctAnswer: "worst",
    explanation: "The superlative of the irregular adjective 'bad' is **worst** (bad -> worse -> worst).",
    level: "A2",
    difficulty: "Easy",
    domain: "parts_of_speech"
  },
  {
    question: "Which modal verb expresses polite permission or possibility in: '____ I open the window?'",
    options: ["Must", "May", "Should", "Would"],
    correctAnswer: "May",
    explanation: "**May** is the formal, polite modal auxiliary used to request permission.",
    level: "A2",
    difficulty: "Easy",
    domain: "modals"
  },
  {
    question: "Choose the correct future expression: Look at those dense black clouds! It is ____ rain.",
    options: ["going to", "will to", "go to", "shall to"],
    correctAnswer: "going to",
    explanation: "We use **be going to** for predictions based on present sensory evidence (dark clouds).",
    level: "A2",
    difficulty: "Easy",
    domain: "tenses"
  },
  {
    question: "Select the correct Past Continuous sentence:",
    options: [
      "While I was reading a book, the telephone rang.",
      "While I read a book, the telephone was ringing.",
      "While I were reading a book, the telephone rang.",
      "While I am reading a book, the telephone rang."
    ],
    correctAnswer: "While I was reading a book, the telephone rang.",
    explanation: "We use **Past Continuous (was reading)** for the background ongoing action interrupted by a shorter action in Past Simple (rang).",
    level: "A2",
    difficulty: "Easy",
    domain: "tenses"
  },
  {
    question: "Select the correct adverb of manner: She speaks English very ____ and clearly.",
    options: ["fluent", "fluently", "more fluent", "fluentest"],
    correctAnswer: "fluently",
    explanation: "Adverbs of manner modify verbs ('speaks') and typically end in **-ly** (fluently).",
    level: "A2",
    difficulty: "Easy",
    domain: "parts_of_speech"
  },
  {
    question: "Choose the correct quantifier: I have ____ questions to ask before the meeting concludes.",
    options: ["a few", "a little", "much", "any"],
    correctAnswer: "a few",
    explanation: "We use **a few** with plural countable nouns ('questions') to mean a small number.",
    level: "A2",
    difficulty: "Easy",
    domain: "parts_of_speech"
  },
  {
    question: "Identify the interjection expressing sudden pain in: '____! I accidentally pinched my finger in the drawer.'",
    options: ["Ouch", "Therefore", "Although", "Beside"],
    correctAnswer: "Ouch",
    explanation: "**Ouch** is the natural interjection in English expressing sudden physical pain.",
    level: "A2",
    difficulty: "Easy",
    domain: "parts_of_speech"
  },
  {
    question: "Select the correct Zero Conditional sentence expressing a universal scientific fact:",
    options: [
      "If water reaches 100°C, it boils.",
      "If water will reach 100°C, it boils.",
      "If water reached 100°C, it would boil.",
      "If water reaches 100°C, it will have boiled."
    ],
    correctAnswer: "If water reaches 100°C, it boils.",
    explanation: "Zero Conditional for universal scientific truths uses **If + Present Simple, Present Simple**.",
    level: "A2",
    difficulty: "Easy",
    domain: "conditionals"
  },

  // ==========================================
  // LEVEL B1: INTERMEDIATE (MEDIUM) - 13 Questions
  // ==========================================
  {
    question: "Choose the correct verb form: They ____ in London since October 2021.",
    options: ["lived", "are living", "have lived", "were living"],
    correctAnswer: "have lived",
    explanation: "The preposition **since** indicates an action that started in the past and continues into the present, requiring the **Present Perfect**.",
    level: "B1",
    difficulty: "Medium",
    domain: "tenses"
  },
  {
    question: "Select the correct First Conditional sentence:",
    options: [
      "If it rains tomorrow, we will cancel the outdoor picnic.",
      "If it will rain tomorrow, we cancel the outdoor picnic.",
      "If it rained tomorrow, we will cancel the outdoor picnic.",
      "If it rains tomorrow, we would cancel the outdoor picnic."
    ],
    correctAnswer: "If it rains tomorrow, we will cancel the outdoor picnic.",
    explanation: "First Conditional structure: **If + Present Simple, will + base verb** for realistic future conditions.",
    level: "B1",
    difficulty: "Medium",
    domain: "conditionals"
  },
  {
    question: "Complete the sentence with the correct relative pronoun: The architect ____ designed the museum won an international prize.",
    options: ["which", "whom", "who", "whose"],
    correctAnswer: "who",
    explanation: "We use **who** as the subject relative pronoun referring to people ('The architect').",
    level: "B1",
    difficulty: "Medium",
    domain: "clauses"
  },
  {
    question: "Which sentence correctly converts into the passive voice: 'The chef prepares the dessert daily.'",
    options: [
      "The dessert is prepared daily by the chef.",
      "The dessert was prepared daily by the chef.",
      "The dessert has been prepared daily by the chef.",
      "The dessert is being prepared daily by the chef."
    ],
    correctAnswer: "The dessert is prepared daily by the chef.",
    explanation: "Present Simple passive is formed with **am/is/are + past participle** (is prepared).",
    level: "B1",
    difficulty: "Medium",
    domain: "passives"
  },
  {
    question: "Choose the correct phrase: When I was a child, I ____ walk to school every morning.",
    options: ["used to", "use to", "was used to", "got used to"],
    correctAnswer: "used to",
    explanation: "**Used to + base verb** describes past habitual states or routines that are no longer true.",
    level: "B1",
    difficulty: "Medium",
    domain: "tenses"
  },
  {
    question: "Complete with the correct modal of deduction: The streets are soaking wet. It ____ during the night.",
    options: ["must rain", "can rain", "must have rained", "should rain"],
    correctAnswer: "must have rained",
    explanation: "To express logical certainty about a past event based on strong present evidence, use **must have + past participle**.",
    level: "B1",
    difficulty: "Medium",
    domain: "modals"
  },
  {
    question: "Choose the correct Second Conditional form: If I won a substantial lottery prize, I ____ travel across the globe.",
    options: ["will", "would", "can", "shall"],
    correctAnswer: "would",
    explanation: "Second Conditional for hypothetical scenarios: **If + Past Simple, would + base verb**.",
    level: "B1",
    difficulty: "Medium",
    domain: "conditionals"
  },
  {
    question: "Select the correct form: Sarah is exhausted because she ____ for six hours without a break.",
    options: ["has been studying", "has studied", "is studying", "was studying"],
    correctAnswer: "has been studying",
    explanation: "The **Present Perfect Continuous** emphasizes duration and ongoing effort leading up to the present moment.",
    level: "B1",
    difficulty: "Medium",
    domain: "tenses"
  },
  {
    question: "Choose the correct preposition and verb pattern: He apologized for ____ late to the presentation.",
    options: ["being", "be", "to be", "been"],
    correctAnswer: "being",
    explanation: "Verbs following prepositions ('for') must be in the **gerund (-ing)** form.",
    level: "B1",
    difficulty: "Medium",
    domain: "parts_of_speech"
  },
  {
    question: "Which modal verb denotes mandatory legal obligation in: 'All drivers ____ wear a seatbelt.'",
    options: ["must", "might", "could", "would"],
    correctAnswer: "must",
    explanation: "**Must** expresses strict legal obligation or necessity imposed by law or authority.",
    level: "B1",
    difficulty: "Medium",
    domain: "modals"
  },
  {
    question: "Complete the sentence with the appropriate subordinating conjunction of contrast: '____ it rained heavily, we completed the hike.'",
    options: ["Although", "Despite", "In spite of", "Because"],
    correctAnswer: "Although",
    explanation: "**Although** is a subordinating conjunction followed by a full subject-verb clause ('it rained heavily').",
    level: "B1",
    difficulty: "Medium",
    domain: "parts_of_speech"
  },
  {
    question: "Choose the correct Future Continuous form: At 8:00 PM tomorrow evening, we ____ dinner at the French bistro.",
    options: ["will be having", "will have had", "are had", "will have been"],
    correctAnswer: "will be having",
    explanation: "**Future Continuous (will be + verb-ing)** expresses an activity in progress at a specific designated future time.",
    level: "B1",
    difficulty: "Medium",
    domain: "tenses"
  },
  {
    question: "Choose the correct reflexive pronoun: After weeks of trial and error, Liam taught ____ how to write computer software.",
    options: ["himself", "hisself", "him", "oneself"],
    correctAnswer: "himself",
    explanation: "**Himself** is the third-person masculine singular reflexive pronoun used when the subject and object refer to the same person.",
    level: "B1",
    difficulty: "Medium",
    domain: "parts_of_speech"
  },

  // ==========================================
  // LEVEL B2: UPPER-INTERMEDIATE (MEDIUM-HARD) - 13 Questions
  // ==========================================
  {
    question: "Complete the Third Conditional sentence: If I ____ about the traffic jam, I would have taken the subway.",
    options: ["knew", "have known", "had known", "would know"],
    correctAnswer: "had known",
    explanation: "Third Conditional structure: **If + Past Perfect (had known), would have + past participle** for hypothetical past situations.",
    level: "B2",
    difficulty: "Medium",
    domain: "conditionals"
  },
  {
    question: "Identify the correct participle clause: ____ his key, Liam had to wait outside until his roommate arrived.",
    options: [
      "Having lost",
      "Lost",
      "Have lost",
      "To lose"
    ],
    correctAnswer: "Having lost",
    explanation: "The perfect participle **Having + past participle** highlights an action completed before the main past action.",
    level: "B2",
    difficulty: "Medium",
    domain: "clauses"
  },
  {
    question: "Select the sentence with the correct causative structure:",
    options: [
      "She got her laptop repaired by a certified technician.",
      "She had repaired her laptop by a certified technician.",
      "She got repair her laptop by a certified technician.",
      "She has her laptop repair by a certified technician."
    ],
    correctAnswer: "She got her laptop repaired by a certified technician.",
    explanation: "Causative structure: **have/get + object + past participle** indicates arranging for someone else to perform a service.",
    level: "B2",
    difficulty: "Medium",
    domain: "passives"
  },
  {
    question: "Choose the correct future form: By this time next year, the company ____ its European headquarters.",
    options: [
      "will establish",
      "will have established",
      "will be establish",
      "is establishing"
    ],
    correctAnswer: "will have established",
    explanation: "**Future Perfect (will have + past participle)** expresses an action that will be completed prior to a designated point in the future ('By this time next year').",
    level: "B2",
    difficulty: "Medium",
    domain: "tenses"
  },
  {
    question: "Complete the sentence with Past Perfect Continuous: When the rescue team arrived, the hikers ____ in the wilderness for over eighteen hours.",
    options: ["had been surviving", "have been surviving", "were survived", "would survive"],
    correctAnswer: "had been surviving",
    explanation: "The **Past Perfect Continuous (had been + verb-ing)** expresses an ongoing action that continued up until another point in the past.",
    level: "B2",
    difficulty: "Medium",
    domain: "tenses"
  },
  {
    question: "Select the correct form for Future Perfect Continuous: By next September, Professor Vance ____ at this university for three decades.",
    options: ["will have been teaching", "will be teaching", "has been teaching", "had taught"],
    correctAnswer: "will have been teaching",
    explanation: "**Future Perfect Continuous (will have been + verb-ing)** emphasizes the duration of an activity up to a specific future milestone.",
    level: "B2",
    difficulty: "Medium",
    domain: "tenses"
  },
  {
    question: "Choose the appropriate phrasal verb meaning 'to tolerate': I cannot ____ such rude behavior any longer.",
    options: ["put up with", "come down with", "make up for", "look up to"],
    correctAnswer: "put up with",
    explanation: "The three-part phrasal verb **put up with** means to tolerate or endure an unpleasant situation.",
    level: "B2",
    difficulty: "Medium",
    domain: "parts_of_speech"
  },
  {
    question: "Select the correct reporting passive construction:",
    options: [
      "It is believed that the artifacts date back to the Bronze Age.",
      "It believes that the artifacts date back to the Bronze Age.",
      "The artifacts are believe to date back to the Bronze Age.",
      "It was believing that the artifacts date back to the Bronze Age."
    ],
    correctAnswer: "It is believed that the artifacts date back to the Bronze Age.",
    explanation: "Impersonal reporting passives use **It is + past participle (believed/said/reported) + that-clause**.",
    level: "B2",
    difficulty: "Medium",
    domain: "passives"
  },
  {
    question: "Select the correct expression of past regret: I wish I ____ harder for yesterday's qualifying exam.",
    options: ["had studied", "studied", "have studied", "would study"],
    correctAnswer: "had studied",
    explanation: "To express regret about a past situation, use **wish + Past Perfect (had studied)**.",
    level: "B2",
    difficulty: "Medium",
    domain: "advanced_syntax"
  },
  {
    question: "Select the grammatically correct indirect question:",
    options: [
      "Could you please tell me where the administrative office is?",
      "Could you please tell me where is the administrative office?",
      "Could you please tell me where does the administrative office be?",
      "Could you please tell me where did the administrative office is?"
    ],
    correctAnswer: "Could you please tell me where the administrative office is?",
    explanation: "In indirect questions, the clause retains standard declarative word order: **Subject + Verb** (where the office is).",
    level: "B2",
    difficulty: "Medium",
    domain: "advanced_syntax"
  },
  {
    question: "Select the phrasal verb meaning 'to cancel': Due to severe snowstorms, the committee had to ____ the symposium.",
    options: ["call off", "call in", "call on", "call out"],
    correctAnswer: "call off",
    explanation: "**Call off** means to cancel an event or engagement.",
    level: "B2",
    difficulty: "Medium",
    domain: "parts_of_speech"
  },
  {
    question: "Complete the non-defining relative clause: Dr. Evans, ____ leads the research team, published groundbreaking findings.",
    options: ["who", "which", "that", "whom"],
    correctAnswer: "who",
    explanation: "Non-defining relative clauses modifying people set off by commas require **who** (never 'that').",
    level: "B2",
    difficulty: "Medium",
    domain: "clauses"
  },
  {
    question: "Select the correct dependent preposition: She succeeded ____ securing venture capital for the startup.",
    options: ["in", "on", "at", "with"],
    correctAnswer: "in",
    explanation: "The verb 'succeed' takes the dependent preposition **in + gerund** (succeeded in securing).",
    level: "B2",
    difficulty: "Medium",
    domain: "parts_of_speech"
  },

  // ==========================================
  // LEVEL C1: ADVANCED (HARD) - 11 Questions
  // ==========================================
  {
    question: "Select the sentence with the correct negative inversion for emphasis:",
    options: [
      "Seldom have we witnessed such extraordinary dedication.",
      "Seldom we have witnessed such extraordinary dedication.",
      "Seldom we did witness such extraordinary dedication.",
      "Seldom witnessed we such extraordinary dedication."
    ],
    correctAnswer: "Seldom have we witnessed such extraordinary dedication.",
    explanation: "When negative or limiting adverbs (seldom, rarely, hardly, scarcely) begin a clause, the auxiliary verb precedes the subject: **Adverb + Auxiliary + Subject + Main Verb**.",
    level: "C1",
    difficulty: "Hard",
    domain: "advanced_syntax"
  },
  {
    question: "Which inverted conditional correctly replaces: 'If you should require further assistance, please notify us'?",
    options: [
      "Should you require further assistance, please notify us.",
      "Were you require further assistance, please notify us.",
      "Had you require further assistance, please notify us.",
      "Should you required further assistance, please notify us."
    ],
    correctAnswer: "Should you require further assistance, please notify us.",
    explanation: "Inverted First Conditional without 'if' uses **Should + Subject + base verb**.",
    level: "C1",
    difficulty: "Hard",
    domain: "conditionals"
  },
  {
    question: "Identify the correct mandative subjunctive sentence in formal English:",
    options: [
      "The board insisted that the chief executive resign immediately.",
      "The board insisted that the chief executive resigns immediately.",
      "The board insisted that the chief executive would resign immediately.",
      "The board insisted that the chief executive resigned immediately."
    ],
    correctAnswer: "The board insisted that the chief executive resign immediately.",
    explanation: "The mandative subjunctive requires the base form of the verb (**resign**, not resigns) in the that-clause following verbs of demand, recommendation, or insistence.",
    level: "C1",
    difficulty: "Hard",
    domain: "advanced_syntax"
  },
  {
    question: "Complete the Cleft Sentence for focus: '____ fascinated the researchers was the resilience of the ecosystem.'",
    options: ["What", "That which", "It was", "Which"],
    correctAnswer: "What",
    explanation: "A wh-cleft sentence begins with **What** (acting as a nominal relative pronoun) + clause + be + focal element.",
    level: "C1",
    difficulty: "Hard",
    domain: "advanced_syntax"
  },
  {
    question: "Choose the correct Mixed Conditional form: If he ____ medical school years ago, he ____ a practicing surgeon today.",
    options: [
      "had finished / would be",
      "finished / would have been",
      "would finish / will be",
      "had finished / would have been"
    ],
    correctAnswer: "had finished / would be",
    explanation: "A past condition (had finished) causing a present outcome (would be) forms a standard **Mixed Conditional**.",
    level: "C1",
    difficulty: "Hard",
    domain: "conditionals"
  },
  {
    question: "Choose the correct phrase expressing unreal past: 'It is high time we ____ concrete measures to combat inflation.'",
    options: ["took", "take", "had taken", "would take"],
    correctAnswer: "took",
    explanation: "The structure **It is high time + subject + past subjunctive/simple** indicates something should already have happened.",
    level: "C1",
    difficulty: "Hard",
    domain: "advanced_syntax"
  },
  {
    question: "Select the sentence with correct correlative negative inversion using 'No sooner... than':",
    options: [
      "No sooner had we entered the hall than the performance began.",
      "No sooner we had entered the hall than the performance began.",
      "No sooner did we enter the hall when the performance began.",
      "No sooner we entered the hall before the performance began."
    ],
    correctAnswer: "No sooner had we entered the hall than the performance began.",
    explanation: "**No sooner + had + subject + past participle + than** triggers subject-auxiliary inversion.",
    level: "C1",
    difficulty: "Hard",
    domain: "advanced_syntax"
  },
  {
    question: "Identify the correct inverted hypothetical conditional with 'Were':",
    options: [
      "Were she to accept the appointment, our division would thrive.",
      "Were she accepts the appointment, our division would thrive.",
      "Were she will accept the appointment, our division would thrive.",
      "Were she accepted the appointment, our division would thrive."
    ],
    correctAnswer: "Were she to accept the appointment, our division would thrive.",
    explanation: "Inverted Second Conditional uses **Were + subject + to-infinitive** to replace 'If she accepted'.",
    level: "C1",
    difficulty: "Hard",
    domain: "conditionals"
  },
  {
    question: "Complete the cleft construction: 'It was not until dusk ____ the expedition reached safe shelter.'",
    options: ["that", "when", "which", "then"],
    correctAnswer: "that",
    explanation: "In 'It was not until...' cleft sentences, the subordinate clause is introduced by **that**.",
    level: "C1",
    difficulty: "Hard",
    domain: "advanced_syntax"
  },
  {
    question: "Choose the correct participle clause expressing cause: '____ by the intricacy of the theorem, the mathematician took several hours to respond.'",
    options: ["Intrigued", "Intriguing", "Having intrigue", "To intrigue"],
    correctAnswer: "Intrigued",
    explanation: "The past participle clause **Intrigued by...** functions as a passive participial adjunct modifying the subject.",
    level: "C1",
    difficulty: "Hard",
    domain: "clauses"
  },
  {
    question: "Which literary interjection expresses deep sorrow or regret in: '____! All their heroic sacrifices were in vain.'",
    options: ["Alas", "Bravo", "Aha", "Gosh"],
    correctAnswer: "Alas",
    explanation: "**Alas** is an archaic and formal literary interjection expressing grief, pity, or regret.",
    level: "C1",
    difficulty: "Hard",
    domain: "parts_of_speech"
  },

  // ==========================================
  // LEVEL C2: MASTERY (HARD / EXPERT) - 11 Questions
  // ==========================================
  {
    question: "Which sentence exhibits high-register stylistic fronting with locative inversion?",
    options: [
      "At the summit of the hill stood a solitary, ancient stone monolith.",
      "At the summit of the hill, a solitary, ancient stone monolith stood there.",
      "Stood a solitary stone monolith at the summit of the hill.",
      "At the summit of the hill did stand a solitary stone monolith."
    ],
    correctAnswer: "At the summit of the hill stood a solitary, ancient stone monolith.",
    explanation: "In literary and descriptive prose, locative prepositional phrases fronted before the verb invert the subject and main verb without do-support: **Prepositional phrase + verb + subject**.",
    level: "C2",
    difficulty: "Hard",
    domain: "advanced_syntax"
  },
  {
    question: "Identify the correct archaic fixed subjunctive formula expressing concession:",
    options: [
      "Be that as it may, our fundamental strategic priorities remain unaltered.",
      "Is that as it may, our fundamental strategic priorities remain unaltered.",
      "May that be as it is, our fundamental strategic priorities remain unaltered.",
      "Being that as it may, our fundamental strategic priorities remain unaltered."
    ],
    correctAnswer: "Be that as it may, our fundamental strategic priorities remain unaltered.",
    explanation: "**Be that as it may** is an idiomatic fixed subjunctive expression signifying 'regardless of that' or 'nevertheless'.",
    level: "C2",
    difficulty: "Hard",
    domain: "advanced_syntax"
  },
  {
    question: "Which sentence demonstrates syntactically correct gapping (ellipsis of the repeated verb in coordinated clauses)?",
    options: [
      "The chancellor advocated fiscal conservatism; the minister, regulatory liberalization.",
      "The chancellor advocated fiscal conservatism; the minister advocated for regulatory liberalization too.",
      "The chancellor advocated fiscal conservatism, while the minister he advocated regulatory liberalization.",
      "The chancellor advocated fiscal conservatism, the minister also regulatory liberalization."
    ],
    correctAnswer: "The chancellor advocated fiscal conservatism; the minister, regulatory liberalization.",
    explanation: "**Gapping** omits a previously stated verb in the second parallel clause, punctuated with a comma where the verb would occur.",
    level: "C2",
    difficulty: "Hard",
    domain: "advanced_syntax"
  },
  {
    question: "Identify the rhetorical syntactical device utilized in: 'Never let a fool kiss you or a kiss fool you.'",
    options: ["Chiasmus", "Asyndeton", "Polysyndeton", "Cataphora"],
    correctAnswer: "Chiasmus",
    explanation: "**Chiasmus** (antimetabole) is a rhetorical schema where grammatical structures and words are repeated in inverted symmetrical order (A-B / B-A).",
    level: "C2",
    difficulty: "Hard",
    domain: "advanced_syntax"
  },
  {
    question: "Select the sentence where the modal verb expresses subtle epistemic modality conveying distant probability:",
    options: [
      "He might conceivably have misunderstood our original directives.",
      "He must have understood our directives accurately.",
      "He can understand the directives if he wishes.",
      "He should have been understanding the directives."
    ],
    correctAnswer: "He might conceivably have misunderstood our original directives.",
    explanation: "**Might conceivably have + past participle** conveys cautious, low-probability epistemic speculation in academic and formal commentary.",
    level: "C2",
    difficulty: "Hard",
    domain: "modals"
  },
  {
    question: "Complete with the sophisticated concessive conjunction: '____ we appreciate your candor, we cannot authorize this expenditure.'",
    options: ["Much as", "Inasmuch", "Albeit", "Notwithstanding that"],
    correctAnswer: "Much as",
    explanation: "**Much as + clause** functions as an emphatic, high-register conjunction of concession equivalent to 'even though' or 'although we greatly...'.",
    level: "C2",
    difficulty: "Hard",
    domain: "parts_of_speech"
  },
  {
    question: "Complete the sentence with the formulaic subjunctive expression: '____, we shall persevere until the task is fulfilled.'",
    options: ["Come what may", "May what come", "Whatever comes", "Coming what will"],
    correctAnswer: "Come what may",
    explanation: "**Come what may** is an archaic formulaic subjunctive idiom meaning 'whatever happens'.",
    level: "C2",
    difficulty: "Hard",
    domain: "advanced_syntax"
  },
  {
    question: "Identify the sentence featuring correct inversion following a restrictive 'Only by' prepositional phrase:",
    options: [
      "Only by examining every empirical metric can the researchers draw an unbiased conclusion.",
      "Only by examining every empirical metric the researchers can draw an unbiased conclusion.",
      "Only by examining every empirical metric did the researchers could draw an unbiased conclusion.",
      "Only by examining every empirical metric the researchers drew an unbiased conclusion."
    ],
    correctAnswer: "Only by examining every empirical metric can the researchers draw an unbiased conclusion.",
    explanation: "Fronting restrictive phrases with **Only by + gerund** mandates subject-auxiliary inversion in the main clause (**can the researchers draw**).",
    level: "C2",
    difficulty: "Hard",
    domain: "advanced_syntax"
  },
  {
    question: "Choose the correct high-register litotes (affirmation expressed by negating its opposite): 'Her analytical contribution was by no means ____.'",
    options: ["negligible", "negligently", "neglectful", "negligence"],
    correctAnswer: "negligible",
    explanation: "**By no means negligible** is a classic litotes understatement signifying 'immensely significant'.",
    level: "C2",
    difficulty: "Hard",
    domain: "advanced_syntax"
  },
  {
    question: "Identify the correct rhetorical parallel antithesis: 'To err is human; to forgive, ____.'",
    options: ["divine", "divinity", "is divine", "being divine"],
    correctAnswer: "divine",
    explanation: "Alexander Pope's famous antithesis uses ellipsis of the copula: 'to forgive, **divine**'.",
    level: "C2",
    difficulty: "Hard",
    domain: "advanced_syntax"
  },
  {
    question: "Select the sentence with correct subjunctive usage following 'lest':",
    options: [
      "They reinforced the levees lest the floodwaters breach the residential perimeter.",
      "They reinforced the levees lest the floodwaters breaches the residential perimeter.",
      "They reinforced the levees lest the floodwaters will breach the residential perimeter.",
      "They reinforced the levees lest the floodwaters would have breached the residential perimeter."
    ],
    correctAnswer: "They reinforced the levees lest the floodwaters breach the residential perimeter.",
    explanation: "In formal literary English, clauses following the negative purpose conjunction **lest** trigger the present subjunctive base verb (**breach**).",
    level: "C2",
    difficulty: "Hard",
    domain: "advanced_syntax"
  }
];

/**
 * Returns a balanced, 50-question Overall English Proficiency test spanning
 * EVERY CEFR level (A1, A2, B1, B2, C1, C2) and every core curriculum domain:
 * - Parts of Speech (Nouns, Pronouns, Verbs, Adjectives, Adverbs, Prepositions, Conjunctions, Interjections)
 * - Tenses (Present, Past, Future, Continuous, Perfect, Perfect Continuous forms)
 * - The Others (Conditionals, Passives, Reported Speech, Modals, Inversions, Subjunctives, Clefts, etc.)
 * Distribution:
 * - A1: 8 questions (Easy)
 * - A2: 8 questions (Easy-Medium)
 * - B1: 9 questions (Medium)
 * - B2: 9 questions (Medium-Hard)
 * - C1: 8 questions (Hard)
 * - C2: 8 questions (Challenging / Mastery)
 * Total: 50 Questions.
 * Dynamically balances options so answer letters rotate across A, B, C, D
 * with no consecutive identical answer letters.
 */
export function getCuratedOverallTest(): Quiz {
  const levelAllocations: { level: CEFRLevel; count: number }[] = [
    { level: 'A1', count: 8 },
    { level: 'A2', count: 8 },
    { level: 'B1', count: 9 },
    { level: 'B2', count: 9 },
    { level: 'C1', count: 8 },
    { level: 'C2', count: 8 }
  ];
  const selectedQuestions: QuizQuestion[] = [];

  for (const item of levelAllocations) {
    const levelQuestions = OVERALL_TEST_BANK.filter(q => q.level === item.level);
    // Shuffle the questions in this level
    const shuffled = [...levelQuestions].sort(() => Math.random() - 0.5);
    // Take allocated questions per level
    selectedQuestions.push(...shuffled.slice(0, item.count));
  }

  // Balance options so answer letters rotate and vary across A, B, C, D without consecutive repetition
  const balanced = balanceQuizOptions(selectedQuestions);

  return {
    title: 'General English Proficiency Overall Test (50 Questions)',
    questions: balanced
  };
}

/**
 * Returns a curated test specifically covering ALL 8 PARTS OF SPEECH:
 * Noun, Pronoun, Verb, Adjective, Adverb, Preposition, Conjunction, and Interjection.
 */
export function getCuratedPartsOfSpeechTest(): Quiz {
  const posQuestions = OVERALL_TEST_BANK.filter(q => q.domain === 'parts_of_speech');
  const shuffled = [...posQuestions].sort(() => Math.random() - 0.5);
  // Pick up to 20 questions
  const selected = shuffled.slice(0, Math.min(20, shuffled.length));
  const balanced = balanceQuizOptions(selected);

  return {
    title: 'Overall English Parts of Speech Test (20 Questions)',
    questions: balanced
  };
}

/**
 * Returns a curated test specifically covering the 12 ENGLISH TENSES
 * plus conditionals and temporal verb aspects across levels.
 */
export function getCuratedTensesTest(): Quiz {
  const tensesQuestions = OVERALL_TEST_BANK.filter(q => q.domain === 'tenses' || q.domain === 'conditionals');
  const shuffled = [...tensesQuestions].sort(() => Math.random() - 0.5);
  // Pick up to 24 questions
  const selected = shuffled.slice(0, Math.min(24, shuffled.length));
  const balanced = balanceQuizOptions(selected);

  return {
    title: 'Overall English Tenses Test (24 Questions)',
    questions: balanced
  };
}

/**
 * Returns a curated level-specific overall test (e.g. Overall B1 English)
 * covering that level's lessons with progressive difficulty.
 */
export function getCuratedLevelTest(level: CEFRLevel): Quiz {
  const levelQuestions = OVERALL_TEST_BANK.filter(q => q.level === level);
  const shuffled = [...levelQuestions].sort(() => Math.random() - 0.5);
  
  // If we have fewer than 15 in bank, borrow from adjacent levels to ensure a rich test
  let finalSet = shuffled;
  if (finalSet.length < 15) {
    const adjacent = OVERALL_TEST_BANK.filter(q => q.level !== level).sort(() => Math.random() - 0.5);
    finalSet = [...finalSet, ...adjacent.slice(0, 15 - finalSet.length)];
  }

  const balanced = balanceQuizOptions(finalSet);

  return {
    title: `Overall ${level} English Proficiency Test`,
    questions: balanced
  };
}
