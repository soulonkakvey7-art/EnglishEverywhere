/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Layers, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Home as HomeIcon,
  GraduationCap,
  Volume2,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Search,
  BrainCircuit,
  Menu,
  X,
  Eye,
  FileText,
  Award,
  Trophy,
  Star,
  Flame,
  Compass,
  Shuffle,
  Layout,
  MessageSquare,
  Sparkles,
  Type,
  Link,
  Library,
  Book,
  Play,
  Zap,
  User,
  GitCommit,
  RotateCcw,
  Mic,
  MicOff,
  Bookmark,
  Download,
  Settings,
  Check,
  Moon,
  Sun,
  Languages,
  Copy,
  Pin,
  Maximize2,
  Minimize2,
  Trash2,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { 
  CEFRLevel, 
  GrammarCategory, 
  ViewState, 
  LessonContent, 
  VocabularyLesson, 
  VocabularyWord,
  DrillSet,
  DrillQuestion,
  Quiz,
  QuizQuestion,
  UserProgress,
  LearningPath,
  DictionaryEntry,
  DictionaryLetterSet,
  TranslationResult,
  QuizAnalysisResult
} from './types';
import { DICTIONARY_DATA } from './dictionaryData';
import { searchWords, getIrregularVerbs, generateDictionaryTest, WordSuggestion } from './services/dictionaryService';
import { useKhmerTranslation, preloadTranslationsForWords } from './services/translationService';
import { 
  generateGrammarTopics, 
  generateGrammarLesson, 
  generateTenseLesson, 
  generateVocabularyLesson, 
  generateIdiomTopics,
  generateIdiomLesson,
  generateQuiz,
  generateGrammarDrills,
  askAI,
  translateTextFast,
  translateTextDeep,
  analyzeQuizPerformance
} from './services/geminiService';
import { getCachedLesson, saveCachedLesson } from './services/firebase';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

const LEVELS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const PARTS_OF_SPEECH = ['Noun', 'Pronoun', 'Verb', 'Adjective', 'Adverb', 'Preposition', 'Conjunction', 'Interjection'];
const TENSES = [
  'Present Simple', 'Present Continuous', 'Present Perfect', 'Present Perfect Continuous',
  'Past Simple', 'Past Continuous', 'Past Perfect', 'Past Perfect Continuous',
  'Future Simple', 'Future Continuous', 'Future Perfect', 'Future Perfect Continuous',
  'Conditional Sentences', 'Future with Going To & Will'
];
const IDIOM_CATEGORIES = ['Animals', 'Body Parts', 'Colors', 'Food & Drink', 'Nature', 'Time', 'Money', 'Weather', 'Emotions', 'Travel', 'Work & Business', 'Health', 'Relationships', 'Success & Failure'];

const KHMER_TRANSLATIONS: Record<string, string> = {
  // Parts of Speech
  'Noun': 'នាម',
  'Pronoun': 'សព្វនាម',
  'Verb': 'កិរិយាសព្ទ',
  'Adjective': 'គុណនាម',
  'Adverb': 'គុណកិរិយា',
  'Preposition': 'ធ្នាក់',
  'Conjunction': 'ឈ្នាប់',
  'Interjection': 'ឧទានសព្ទ',

  // Tenses
  'Present Simple': 'បច្ចុប្បន្នកាលធម្មតា',
  'Present Continuous': 'បច្ចុប្បន្នកាលកំពុងបន្ត',
  'Present Perfect': 'បច្ចុប្បន្នកាលបរិបូណ៍',
  'Present Perfect Continuous': 'បច្ចុប្បន្នកាលបរិបូណ៍កំពុងបន្ត',
  'Past Simple': 'អតីតកាលធម្មតា',
  'Simple Past': 'អតីតកាលធម្មតា',
  'Past Continuous': 'អតីតកាលកំពុងបន្ត',
  'Past Perfect': 'អតីតកាលបរិបូណ៍',
  'Past Perfect Continuous': 'អតីតកាលបរិបូណ៍កំពុងបន្ត',
  'Future Simple': 'អនាគតកាលធម្មតា',
  'Future Continuous': 'អនាគតកាលកំពុងបន្ត',
  'Future Perfect': 'អនាគតកាលបរិបូណ៍',
  'Future Perfect Continuous': 'អនាគតកាលបរិបូណ៍កំពុងបន្ត'
};

function getMatchingFixedKey(title: string): string | null {
  // Normalize whitespace
  let clean = title.replace(/\s+/g, ' ').trim();
  
  // Remove level indicators (e.g., A1, A2, B1, B2, C1, C2) case-insensitively, optionally preceded/followed by "Level" or "Level:"
  clean = clean.replace(/\b(level\s+)?[a-c][1-2]\b/i, '');
  clean = clean.replace(/\b[a-c][1-2](\s+level)?\b/i, '');
  
  // Remove common lesson/quiz/drill trailing words case-insensitively
  clean = clean.replace(/\b(tense|tenses|grammar|quiz|quizzes|drill|drills|lesson|lessons)\b/gi, '');
  
  // Clean up any double spaces, trailing colons or dashes
  clean = clean.replace(/[:\-]/g, '');
  clean = clean.replace(/\s+/g, ' ').trim();
  
  // Check direct matches (case-insensitive)
  const keys = Object.keys(KHMER_TRANSLATIONS);
  for (const key of keys) {
    if (clean.toLowerCase() === key.toLowerCase()) {
      return key;
    }
  }
  
  // Check plural forms for parts of speech (e.g. "Nouns" -> "Noun", "Verbs" -> "Verb")
  // Only for parts of speech (to avoid touching "Continuous")
  const partsOfSpeech = ['Noun', 'Pronoun', 'Verb', 'Adjective', 'Adverb', 'Preposition', 'Conjunction', 'Interjection'];
  for (const pos of partsOfSpeech) {
    const plural = pos + 's';
    if (clean.toLowerCase() === plural.toLowerCase()) {
      return pos;
    }
  }
  
  return null;
}

function formatTitleWithKhmer(title: string, baseSizeClass = "text-lg md:text-xl", isLarge = false) {
  const matchedKey = getMatchingFixedKey(title);
  
  if (matchedKey) {
    const khmer = KHMER_TRANSLATIONS[matchedKey];
    
    let englishClass = baseSizeClass;
    let khmerClass = "";
    let dashClass = "text-gray-400 dark:text-gray-500 font-bold select-none shrink-0";
    let containerClass = "inline-flex items-center gap-x-1.5 flex-wrap min-w-0 max-w-full text-left leading-normal py-0.5";
    
    if (isLarge) {
      // Inside the lesson: big, bold, and prominent
      englishClass = "text-xl md:text-2xl lg:text-3xl font-black";
      khmerClass = "text-[18px] md:text-xl lg:text-2xl font-black font-khmer shrink-0";
      dashClass += " text-lg md:text-xl";
      containerClass = "inline-flex items-center gap-x-2.5 flex-wrap min-w-0 max-w-full text-left leading-relaxed py-1";
    } else {
      // Outside the lesson (in list cards, menus, headers): make it smaller to fit border frames beautifully
      // Remove any text-xl, text-lg, text-base, text-sm, text-xs size classes and map them to clean, compact sizes
      let hasBold = baseSizeClass.includes("font-bold") || baseSizeClass.includes("font-black");
      let hasMedium = baseSizeClass.includes("font-medium");
      
      const isCardTitle = baseSizeClass.includes("text-base md:text-lg") || baseSizeClass.includes("text-lg");
      
      if (isCardTitle) {
        // e.g., Card title outside lesson (Tenses / Parts of Speech)
        englishClass = `${hasBold ? "font-bold" : hasMedium ? "font-medium" : ""} text-xs sm:text-sm md:text-[15px] truncate shrink-0`;
        khmerClass = "text-[11px] sm:text-xs md:text-[13px] font-bold font-khmer text-gray-500 dark:text-gray-400 shrink-0";
        dashClass += " text-xs md:text-sm";
      } else {
        // e.g., Sidebar list item, small subheadings
        englishClass = `${hasBold ? "font-bold" : hasMedium ? "font-medium" : ""} text-[11px] sm:text-xs md:text-sm truncate shrink-0`;
        khmerClass = "text-[10px] sm:text-[11px] md:text-xs font-bold font-khmer text-gray-500 dark:text-gray-400 shrink-0";
        dashClass += " text-[10px] md:text-xs";
      }
    }
    
    return (
      <span className={containerClass}>
        <span className={`${englishClass} text-black dark:text-white truncate`}>{title}</span>
        <span className={dashClass}>-</span>
        <span className={`${khmerClass} text-black dark:text-white font-khmer`}>
          {khmer}
        </span>
      </span>
    );
  }
  
  return <span className={`${baseSizeClass} truncate`}>{title}</span>;
}

const CEFR_LEVELS: { level: CEFRLevel, topics: string[] }[] = [
  {
    level: 'A1',
    topics: [
      'Subject Pronouns',
      'To Be (am, is, are)',
      'Singular and Plural Nouns',
      'Articles (a, an, the)',
      'Demonstratives (this, that, these, those)',
      'Possessive Adjectives',
      'Question Words',
      'Prepositions of Place',
      'Present Simple',
      'Prepositions of Time',
      'Numbers, Days & Months',
      'Object Pronouns',
      'Countable & Uncountable Nouns Basics',
      'Imperatives',
      'There is/There are',
      'Have Got / Has Got',
      'Basic Adjectives/Adverbs',
      'Can/Can\'t',
      'Basic Possessive \'s',
      'Like, Love, Hate + Gerund',
      'Adjectives for Describing People',
      'Telling the Time',
      'Prepositions of Movement (to, into, out of)',
      'Present Simple Questions & Negatives',
      'Wh- Questions with To Be and Do'
    ]
  },
  {
    level: 'A2',
    topics: [
      'Present Continuous',
      'Present Simple vs. Present Continuous Contrast',
      'Adverbs of Frequency',
      'Simple Past',
      'Past Continuous',
      'Past Simple vs. Past Continuous Contrast',
      'Future with Going To',
      'Future with Will / Shall',
      'Comparative Adjectives',
      'Superlative Adjectives',
      'Possessive Pronouns',
      'Reflexive Pronouns (myself, yourself)',
      'Too and Enough',
      'Quantifiers (some, any, much, many)',
      'Adverbs of Manner',
      'Infinitives of Purpose',
      'Modal Verbs for Requests',
      'Relative Pronouns (who, which, that)',
      'Gerunds vs Infinitives Basics',
      'Present Perfect for Experience',
      'As... As Comparisons',
      'Subject and Object Questions',
      'Modals of Ability (can, could, be able to)',
      'Prepositions of Place & Direction (across, through, past)',
      'Something, Anyone, Nowhere (Indefinite Pronouns)',
      'Conjunctions of Contrast and Reason (but, because, although)',
      'Present Perfect with For and Since'
    ]
  },
  {
    level: 'B1',
    topics: [
      'Present Perfect',
      'Present Perfect vs. Past Simple Contrast',
      'Present Perfect Continuous',
      'Past Perfect Simple',
      'Future Continuous',
      'Zero Conditional',
      'First Conditional',
      'Second Conditional Introduction',
      'Wish & If Only Basics',
      'Passive Voice Basics',
      'Active vs Passive Voice',
      'Modal Verbs for Advice',
      'Modals of Permission & Obligation',
      'Defining vs Non-Defining Relative Clauses',
      'Reported Speech Basics',
      'Colloquial Short Answers',
      'Question Tags',
      'So and Such Contrast',
      'Phrasal Verbs Basics',
      'Used to',
      'The Art of Punctuation & Semicolons',
      'Past Habits with Used To and Would',
      'Modals of Deduction/Possibility in the Present (might, may, must, can\'t)',
      'Third Conditional Introduction',
      'Reporting Verbs in Present & Past',
      'Gerunds as Subjects and Objects',
      'Future Tense Review & Contrast',
      'Both, Either, Neither',
      'Relative Clauses with Where, When, Whose'
    ]
  },
  {
    level: 'B2',
    topics: [
      'Narrative Tenses',
      'Present and Past Habits (be/get used to)',
      'Future Perfect & Continuous',
      'Second Conditional',
      'Third Conditional',
      'Mixed Conditionals Introduction',
      'Wish & If Only',
      'Relative Clauses (Defining & Non-defining)',
      'Passive Voice in Full',
      'Passive Voice in Reports',
      'Causative Verbs',
      'Modals of Deduction',
      'Past Modals',
      'Gerunds and Infinitives',
      'Relative Clauses with Prepositions',
      'Participle Clauses',
      'Phrasal Verbs',
      'Sentence Connectors',
      'Negative Inversion',
      'Reporting Verbs',
      'Reported Speech & Indirect Quotes',
      'Dangling & Misplaced Modifiers',
      'Cleft Sentences',
      'Mixed Conditionals in Full',
      'Future in the Past (was going to, would)',
      'Prepositions Following Verbs and Adjectives',
      'Wishes about the Past (Wish + Past Perfect)',
      'Causative Have and Get',
      'Inversion after Negative Adverbials Basics',
      'Non-Finite Participle Clauses'
    ]
  },
  {
    level: 'C1',
    topics: [
      'Mixed Conditionals',
      'Inversion in Conditionals',
      'Inversion for Emphasis',
      'Cleft Sentences',
      'Subjunctive Mood',
      'Diplomatic & Indirect Language',
      'Unreal Past',
      'Advanced Passive Constructions',
      'Advanced Modals',
      'Gerunds and Infinitives after reporting verbs',
      'Advanced Prepositional Relative Clauses',
      'Discourse Markers',
      'Compound Adjectives',
      'Future in the Past',
      'Ellipsis and Substitution',
      'Complex Sentence Structures',
      'Hypothesizing & Speculating',
      'Advanced Adverbials & Modifiers',
      'Parallel Structure in Writing',
      'Nominal Relative Clauses (what, whatever, whoever)',
      'Fronting for Emphasis and Rhetorical Flow',
      'Advanced Conditionals (but for, had it not been for, should you need)',
      'Register and Voice Shifts',
      'Metaphorical Extensions & Idiomatic Grammar',
      'Advanced Punctuation & Rhetorical Transitions',
      'Preposed Adjectives & Absolute Clauses'
    ]
  },
  {
    level: 'C2',
    topics: [
      'Sophisticated Inversion & Fronting',
      'Archaic & Literary Subjunctive',
      'Nuanced Ellipsis & Substitution',
      'Advanced Modality',
      'Complex Parenthetical Clauses',
      'Advanced Narrative Techniques',
      'Rhetorical Devices',
      'Register Shifts',
      'Syntactic Ambiguity',
      'Precise Vocabulary',
      'Advanced Rhetorical Parallelism',
      'Advanced Punctuation & Rhetorical Flow',
      'Subjunctive Mood',
      'Advanced Synthesis and Stylistic Inversion',
      'Idiosyncratic Grammar & Neologisms',
      'Polysyndeton & Asyndeton',
      'Anaphora & Cataphora in Textual Cohesion',
      'Chiasmus and Antimetabole',
      'Rhetorical Litotes and Double Negatives',
      'Syntactic Condensation in Literary Registers'
    ]
  }
];

const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'business_english',
    title: 'Business English',
    description: 'Master professional communication, meetings, and workplace vocabulary.',
    icon: '💼',
    topics: [
      { title: 'Formal Emails & Requests', type: 'vocabulary' },
      { title: 'Meetings & Negotiations', type: 'vocabulary' },
      { title: 'Presentations & Pitching', type: 'vocabulary' },
      { title: 'Business Idioms', type: 'idiom' },
      { title: 'Passive Voice in Reports', type: 'grammar', category: 'Levels', level: 'B2' },
      { title: 'Conditional Sentences', type: 'grammar', category: 'Tenses' },
      { title: 'Job Interviews & Resume', type: 'vocabulary' },
      { title: 'Intercultural Business Etiquette', type: 'vocabulary' },
      { title: 'Diplomatic & Indirect Language', type: 'grammar', category: 'Levels', level: 'C1' },
      { title: 'Marketing & Sales Collocations', type: 'vocabulary' },
      { title: 'Financial English & Reporting', type: 'vocabulary' },
      { title: 'Corporate Buzzwords', type: 'idiom' },
      { title: 'Agreements & Contracts', type: 'vocabulary' },
      { title: 'Performance Reviews & Feedback', type: 'vocabulary' },
      { title: 'Crisis Management Phrases', type: 'vocabulary' },
      { title: 'Project Management Vocabulary', type: 'vocabulary' },
      { title: 'Office Small Talk & Networking', type: 'vocabulary' }
    ]
  },
  {
    id: 'travel_english',
    title: 'Travel & Tourism',
    description: 'Essential phrases and grammar for exploring the world confidently.',
    icon: '🌎',
    topics: [
      { title: 'At the Airport & Hotels', type: 'vocabulary' },
      { title: 'Restaurant & Dining Out', type: 'vocabulary' },
      { title: 'Asking for Directions', type: 'vocabulary' },
      { title: 'Travel Safety & Help', type: 'vocabulary' },
      { title: 'Modal Verbs for Requests', type: 'grammar', category: 'Levels', level: 'A2' },
      { title: 'Future with Going To & Will', type: 'grammar', category: 'Tenses' },
      { title: 'Shopping & Bargaining', type: 'vocabulary' },
      { title: 'Public Transportation', type: 'vocabulary' },
      { title: 'Socializing & Making Friends', type: 'vocabulary' },
      { title: 'Medical Emergencies Abroad', type: 'vocabulary' },
      { title: 'Reporting Travel Problems', type: 'vocabulary' },
      { title: 'Travel & Leisure Idioms', type: 'idiom' },
      { title: 'Car Rentals & Driving Abroad', type: 'vocabulary' },
      { title: 'Booking Tours & Sightseeing', type: 'vocabulary' },
      { title: 'Outdoor Activities & Nature', type: 'vocabulary' },
      { title: 'Festivals & Cultural Events', type: 'vocabulary' },
      { title: 'Currency & Banking Abroad', type: 'vocabulary' }
    ]
  },
  {
    id: 'exam_prep',
    title: 'IELTS/TOEFL Prep',
    description: 'Focus on advanced grammar and academic vocabulary for exam success.',
    icon: '🎓',
    topics: [
      { title: 'Academic Vocabulary List 1', type: 'vocabulary' },
      { title: 'Describing Data & Trends', type: 'vocabulary' },
      { title: 'Complex Sentence Structures', type: 'grammar', category: 'Levels', level: 'C1' },
      { title: 'Subjunctive Mood', type: 'grammar', category: 'Levels', level: 'C2' },
      { title: 'Inversion for Emphasis', type: 'grammar', category: 'Levels', level: 'C1' },
      { title: 'C1 Vocabulary: Abstract Topics', type: 'vocabulary' },
      { title: 'Cohesive Devices & Linking Words', type: 'vocabulary' },
      { title: 'Academic Vocabulary List 2', type: 'vocabulary' },
      { title: 'Expressing Opinions & Arguments', type: 'vocabulary' },
      { title: 'Paraphrasing & Summarizing', type: 'vocabulary' },
      { title: 'Mixed Conditionals', type: 'grammar', category: 'Levels', level: 'C1' },
      { title: 'Relative Clauses (Defining & Non-defining)', type: 'grammar', category: 'Levels', level: 'B2' },
      { title: 'Comparing and Contrasting Ideas', type: 'vocabulary' },
      { title: 'Hypothesizing & Speculating', type: 'grammar', category: 'Levels', level: 'C1' },
      { title: 'Advanced Adverbials & Modifiers', type: 'grammar', category: 'Levels', level: 'C1' },
      { title: 'Describing Processes & Cycles', type: 'vocabulary' },
      { title: 'Synthesizing Multiple Sources', type: 'vocabulary' }
    ]
  },
  {
    id: 'everyday_english',
    title: 'Everyday Conversation',
    description: 'Gain confidence in casual social interactions and daily dialogues.',
    icon: '💬',
    topics: [
      { title: 'Greetings & Small Talk', type: 'vocabulary' },
      { title: 'Expressing Feelings & Emotions', type: 'vocabulary' },
      { title: 'Describing People & Places', type: 'vocabulary' },
      { title: 'Casual & Slang Expressions', type: 'idiom' },
      { title: 'Past Simple vs Past Continuous', type: 'grammar', category: 'Tenses' },
      { title: 'Present Perfect for Life Experience', type: 'grammar', category: 'Tenses' },
      { title: 'Phone Call English', type: 'vocabulary' },
      { title: 'Hobbies & Free Time', type: 'vocabulary' },
      { title: 'Giving Opinions & Agreeing/Disagreeing', type: 'vocabulary' },
      { title: 'Housework & Daily Routines', type: 'vocabulary' },
      { title: 'Ordering Food Online & Deliveries', type: 'vocabulary' },
      { title: 'Talking about Movies & TV Shows', type: 'vocabulary' },
      { title: 'Weather & Expressing Concerns', type: 'vocabulary' },
      { title: 'Family & Relationship Vocabulary', type: 'vocabulary' },
      { title: 'Colloquial Short Answers', type: 'grammar', category: 'Levels', level: 'B1' },
      { title: 'Idioms for Daily Situations', type: 'idiom' }
    ]
  },
  {
    id: 'tech_english',
    title: 'English for Tech Professionals',
    description: 'Communicate effectively in agile teams, code reviews, and tech standups.',
    icon: '💻',
    topics: [
      { title: 'Agile & Scrum Ceremonies', type: 'vocabulary' },
      { title: 'Describing Bugs & Technical Issues', type: 'vocabulary' },
      { title: 'Code Reviews & Feedback', type: 'vocabulary' },
      { title: 'System Architecture & Data Flow', type: 'vocabulary' },
      { title: 'Idioms for Tech Teams', type: 'idiom' },
      { title: 'Explaining Tradeoffs & Decisions', type: 'vocabulary' },
      { title: 'Imperative Mood in Technical Docs', type: 'grammar', category: 'PartsOfSpeech' },
      { title: 'Tech Interview & System Design', type: 'vocabulary' },
      { title: 'Remote Work & Video Calls', type: 'vocabulary' },
      { title: 'Passive Voice in Technical Writing', type: 'grammar', category: 'Levels', level: 'B2' },
      { title: 'Product Launches & Milestones', type: 'vocabulary' },
      { title: 'Cybersecurity & Compliance', type: 'vocabulary' },
      { title: 'AI & Machine Learning Terms', type: 'vocabulary' },
      { title: 'Negotiating Tech Budgets & Timelines', type: 'vocabulary' },
      { title: 'Resolving Team Conflicts & Retros', type: 'vocabulary' }
    ]
  },
  {
    id: 'grammar_writing_mastery',
    title: 'Grammar & Writing Mastery',
    description: 'Develop a strong foundation in complex sentence styling, syntax, and punctuation.',
    icon: '✍️',
    topics: [
      { title: 'Subject-Verb Agreement', type: 'grammar', category: 'PartsOfSpeech' },
      { title: 'Active vs Passive Voice', type: 'grammar', category: 'Levels', level: 'B1' },
      { title: 'Reported Speech & Indirect Quotes', type: 'grammar', category: 'Levels', level: 'B2' },
      { title: 'Gerunds vs Infinitives', type: 'grammar', category: 'PartsOfSpeech' },
      { title: 'Prepositions of Place and Time', type: 'grammar', category: 'PartsOfSpeech' },
      { title: 'Parallel Structure in Writing', type: 'grammar', category: 'Levels', level: 'C1' },
      { title: 'Dangling & Misplaced Modifiers', type: 'grammar', category: 'Levels', level: 'B2' },
      { title: 'The Art of Punctuation & Semicolons', type: 'grammar', category: 'Levels', level: 'B1' },
      { title: 'Transition Words for Logical Flow', type: 'vocabulary' },
      { title: 'Writing Compelling Introductions', type: 'vocabulary' },
      { title: 'Avoiding Wordiness & Redundancy', type: 'vocabulary' },
      { title: 'Noun Clauses & Adjective Clauses', type: 'grammar', category: 'PartsOfSpeech' }
    ]
  },
  {
    id: 'pronunciation_public_speaking',
    title: 'Pronunciation & Public Speaking',
    description: 'Enhance your spoken clarity, intonation, speech pacing, and presentation skills.',
    icon: '🗣️',
    topics: [
      { title: 'Word Stress & Syllable Emphasis', type: 'vocabulary' },
      { title: 'Sentence Intonation & Pitch Changes', type: 'vocabulary' },
      { title: 'Connected Speech & Linking Sounds', type: 'vocabulary' },
      { title: 'Silent Letters & Confusing Spellings', type: 'vocabulary' },
      { title: 'Vowel Sounds Distinction', type: 'vocabulary' },
      { title: 'Consonant Clusters Practice', type: 'vocabulary' },
      { title: 'The Power of Pausing in Speeches', type: 'vocabulary' },
      { title: 'Using Rhetorical Questions', type: 'grammar', category: 'Levels', level: 'C1' },
      { title: 'Body Language & Vocal Variety', type: 'vocabulary' },
      { title: 'Handling Q&A Sessions Confidently', type: 'vocabulary' },
      { title: 'Storytelling Techniques in Speaking', type: 'vocabulary' },
      { title: 'Persuasive Speech Templates', type: 'vocabulary' }
    ]
  }
];
function ExampleText({ text, className = "" }: { text: string, className?: string }) {
  if (!text.includes('**')) return <span className={className}>{text}</span>;
  
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <span key={i} className="bg-emerald-500 text-white px-1.5 py-0.5 rounded-md mx-0.5 font-black whitespace-nowrap shadow-sm">
              {part.slice(2, -2)}
            </span>
          );
        }
        return part;
      })}
    </span>
  );
}

export default function App() {
  const [fontSizeScale, setFontSizeScale] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('english_everywhere_font_scale');
      return saved ? parseInt(saved, 10) : 100;
    } catch {
      return 100;
    }
  });

  const [lineHeightScale, setLineHeightScale] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('english_everywhere_line_height');
      return saved ? parseFloat(saved) : 1.5;
    } catch {
      return 1.5;
    }
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('english_everywhere_theme');
      return (saved === 'dark' || saved === 'light') ? saved : 'light';
    } catch {
      return 'light';
    }
  });

  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('english_everywhere_theme', theme);
    } catch {}
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('english_everywhere_font_scale', fontSizeScale.toString());
    } catch {}
    document.documentElement.style.setProperty('--user-font-scale', (fontSizeScale / 100).toString());
  }, [fontSizeScale]);

  useEffect(() => {
    try {
      localStorage.setItem('english_everywhere_line_height', lineHeightScale.toString());
    } catch {}
    document.documentElement.style.setProperty('--user-line-height', lineHeightScale.toString());
  }, [lineHeightScale]);

  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [isReadingMode, setIsReadingMode] = useState(false);

  useEffect(() => {
    setIsReadingMode(false);
  }, [view]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contentCache, setContentCache] = useState<Record<string, any>>(() => {
    try {
      const CACHE_VERSION = 'v1.5';
      const savedVersion = localStorage.getItem('english_everywhere_cache_version');
      if (savedVersion !== CACHE_VERSION) {
        localStorage.removeItem('english_everywhere_cache');
        localStorage.setItem('english_everywhere_cache_version', CACHE_VERSION);
        return {};
      }
      const saved = localStorage.getItem('english_everywhere_cache');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('english_everywhere_progress');
      const initial = saved ? JSON.parse(saved) : { 
        completedLessons: [], 
        completedQuizzes: {}, 
        points: 0, 
        badges: [], 
        streak: 0, 
        lastActiveDate: null 
      };
      
      // Migration for users who had old progress structure
      if (initial.points === undefined) initial.points = initial.completedLessons.length * 10;
      if (initial.badges === undefined) initial.badges = [];
      if (initial.streak === undefined) initial.streak = 0;
      if (initial.lastActiveDate === undefined) initial.lastActiveDate = null;
      
      return initial;
    } catch {
      return { 
        completedLessons: [], 
        completedQuizzes: {}, 
        points: 0, 
        badges: [], 
        streak: 0, 
        lastActiveDate: null 
      };
    }
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (userProgress.lastActiveDate !== today) {
      setUserProgress(prev => {
        let newStreak = prev.streak;
        if (prev.lastActiveDate) {
          const lastDate = new Date(prev.lastActiveDate);
          const diffTime = Math.abs(new Date(today).getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            newStreak += 1;
          } else if (diffDays > 1) {
            newStreak = 1;
          }
        } else {
          newStreak = 1;
        }

        const streakBadges = [];
        if (newStreak === 3 && !prev.badges.find(b => b.id === 'streak_3')) {
          streakBadges.push({
            id: 'streak_3',
            name: 'On Fire',
            description: '3 Day Activity Streak',
            icon: '🔥',
            awardedAt: Date.now()
          });
        }

        return {
          ...prev,
          lastActiveDate: today,
          streak: newStreak,
          badges: [...prev.badges, ...streakBadges]
        };
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('english_everywhere_cache', JSON.stringify(contentCache));
  }, [contentCache]);

  useEffect(() => {
    localStorage.setItem('english_everywhere_progress', JSON.stringify(userProgress));
  }, [userProgress]);

  const markLessonComplete = (cacheKey: string) => {
    if (!userProgress.completedLessons.includes(cacheKey)) {
      setUserProgress(prev => {
        const newPoints = prev.points + 10;
        const newBadges = [...prev.badges];
        
        if (prev.completedLessons.length === 0 && !newBadges.find(b => b.id === 'first_lesson')) {
          newBadges.push({
            id: 'first_lesson',
            name: 'Welcome Aboard',
            description: 'Completed your first lesson!',
            icon: '🚢',
            awardedAt: Date.now()
          });
        }

        return {
          ...prev,
          completedLessons: [...prev.completedLessons, cacheKey],
          points: newPoints,
          badges: newBadges
        };
      });
    }
  };

  const markQuizComplete = (cacheKey: string, score: number) => {
    setUserProgress(prev => {
      const isFirstTimer = prev.completedQuizzes[cacheKey] === undefined;
      const pointsEarned = isFirstTimer ? Math.round(score / 2) : 0; // Points only for first completion attempts
      const newPoints = prev.points + pointsEarned;
      const newQuizzes = {
        ...prev.completedQuizzes,
        [cacheKey]: Math.max(prev.completedQuizzes[cacheKey] || 0, score)
      };
      
      const newBadges = [...prev.badges];
      if (score === 100 && !newBadges.find(b => b.id === 'high_flyer')) {
        newBadges.push({
          id: 'high_flyer',
          name: 'High Flyer',
          description: 'Achieved 100% on a quiz!',
          icon: '🚀',
          awardedAt: Date.now()
        });
      }

      if (Object.keys(newQuizzes).length === 5 && !newBadges.find(b => b.id === 'five_quizzes')) {
        newBadges.push({
          id: 'five_quizzes',
          name: 'Quiz Enthusiast',
          description: 'Successfully finished 5 different quizzes.',
          icon: '🧠',
          awardedAt: Date.now()
        });
      }

      return {
        ...prev,
        completedQuizzes: newQuizzes,
        points: newPoints,
        badges: newBadges
      };
    });
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  const loadGrammarTopics = async (level: CEFRLevel) => {
    closeMenu();
    setError(null);
    const cacheKey = `topics_${level}`;
    
    const staticTopics = CEFR_LEVELS.find(l => l.level === level)?.topics || [];

    // Always prefer the static list defined in our code to ensure updates are immediately visible.
    // Sync the cache key to have the latest list
    if (!contentCache[cacheKey] || JSON.stringify(contentCache[cacheKey]) !== JSON.stringify(staticTopics)) {
      setContentCache(prev => ({ ...prev, [cacheKey]: staticTopics }));
    }

    setContent(staticTopics);
    setView({ type: 'grammar_level_menu', level });
    markLessonComplete(cacheKey);
  };

  const loadLesson = async (topic: string, category: GrammarCategory, level?: CEFRLevel, forceRefresh = false) => {
    closeMenu();
    setError(null);
    const cacheKey = `lesson_${category}_${level || ''}_${topic}`;
    if (!forceRefresh && contentCache[cacheKey]) {
      setContent(contentCache[cacheKey]);
      setView({ type: 'grammar_lesson', topic, category, level });
      markLessonComplete(cacheKey);
      return;
    }
    setIsLoading(true);
    try {
      let res = null;
      if (!forceRefresh) {
        res = await getCachedLesson(cacheKey);
      }
      if (res) {
        console.log(`Loaded lesson from shared Firestore cache: ${cacheKey}`);
      } else {
        res = category === 'Tenses' ? await generateTenseLesson(topic) : await generateGrammarLesson(topic, level);
        await saveCachedLesson(cacheKey, {
          type: category === 'Tenses' ? 'tense' : 'grammar',
          topic,
          level,
          category,
          content: res
        });
      }
      setContentCache(prev => ({ ...prev, [cacheKey]: res }));
      setContent(res);
      setView({ type: 'grammar_lesson', topic, category, level });
      markLessonComplete(cacheKey);
    } catch (err) { 
      console.error(err);
      setError("We couldn't generate this lesson. Quota might be exhausted. Try again shortly.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadVocabLesson = async (topic: string, forceRefresh = false) => {
    closeMenu();
    setError(null);
    const cacheKey = `vocab_${topic}`;
    if (!forceRefresh && contentCache[cacheKey]) {
      setContent(contentCache[cacheKey]);
      setView({ type: 'vocabulary_lesson', topic });
      markLessonComplete(cacheKey);
      return;
    }
    setIsLoading(true);
    try {
      let res = null;
      if (!forceRefresh) {
        res = await getCachedLesson(cacheKey);
      }
      if (res) {
        console.log(`Loaded vocabulary lesson from shared Firestore cache: ${cacheKey}`);
      } else {
        res = await generateVocabularyLesson(topic);
        await saveCachedLesson(cacheKey, {
          type: 'vocabulary',
          topic,
          content: res
        });
      }
      setContentCache(prev => ({ ...prev, [cacheKey]: res }));
      setContent(res);
      setView({ type: 'vocabulary_lesson', topic });
      markLessonComplete(cacheKey);
    } catch (err) { 
      console.error(err);
      setError("Failed to generate vocabulary. AI rate limits reached. Please try once more.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadIdiomTopics = async (category: string) => {
    closeMenu();
    setError(null);
    const cacheKey = `idiom_topics_${category}`;
    if (contentCache[cacheKey]) {
      setContent(contentCache[cacheKey]);
      setView({ type: 'idiom_topics', category });
      return;
    }
    setIsLoading(true);
    try {
      let res = await getCachedLesson(cacheKey);
      if (res) {
        console.log(`Loaded idiom topics from shared Firestore cache: ${cacheKey}`);
      } else {
        res = await generateIdiomTopics(category);
        await saveCachedLesson(cacheKey, {
          type: 'idiom_topics',
          topic: category,
          content: res
        });
      }
      setContentCache(prev => ({ ...prev, [cacheKey]: res }));
      setContent(res);
      setView({ type: 'idiom_topics', category });
    } catch (err) {
      console.error(err);
      setError("Failed to load idiom topics. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadIdiomLesson = async (topic: string, category?: string, forceRefresh = false) => {
    closeMenu();
    setError(null);
    const cacheKey = `idiom_${topic}`;
    if (!forceRefresh && contentCache[cacheKey]) {
      setContent(contentCache[cacheKey]);
      setView({ type: 'vocabulary_lesson', topic: topic + ' (Idioms)', category } as any);
      markLessonComplete(cacheKey);
      return;
    }
    setIsLoading(true);
    try {
      let res = null;
      if (!forceRefresh) {
        res = await getCachedLesson(cacheKey);
      }
      if (res) {
        console.log(`Loaded idiom lesson from shared Firestore cache: ${cacheKey}`);
      } else {
        res = await generateIdiomLesson(topic);
        await saveCachedLesson(cacheKey, {
          type: 'idiom',
          topic,
          category,
          content: res
        });
      }
      setContentCache(prev => ({ ...prev, [cacheKey]: res }));
      setContent(res);
      setView({ type: 'vocabulary_lesson', topic: topic + ' (Idioms)', category } as any);
      markLessonComplete(cacheKey);
    } catch (err) { 
      console.error(err);
      setError("Failed to generate idioms. Please try again soon.");
    } finally {
      setIsLoading(false);
    }
  };

  const jumpToLesson = (type: 'grammar' | 'vocabulary' | 'idiom', topic: string, category: GrammarCategory = 'Levels', level?: CEFRLevel) => {
    if (type === 'grammar') {
      loadLesson(topic, category, level);
    } else if (type === 'vocabulary') {
      loadVocabLesson(topic);
    } else if (type === 'idiom') {
      loadIdiomLesson(topic);
    }
  };

  const loadQuiz = async (topic: string, type: 'grammar' | 'vocabulary', category?: GrammarCategory, level?: CEFRLevel, isOverall?: boolean, forceRefresh = true) => {
    closeMenu();
    setError(null);
    setIsLoading(true);
    try {
      // Always generate fresh, unique quiz questions from the AI to avoid repeating identical questions.
      const res = await generateQuiz(topic, type, level, isOverall);
      setContent(res);
      setView({ type: type === 'grammar' ? 'grammar_test' : 'vocabulary_test', topic, category: category!, level, isOverall } as any);
    } catch (err) { 
      console.error(err);
      setError("Quiz generation failed. Please wait a moment and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadDrills = async (topic: string, category: GrammarCategory, level?: CEFRLevel, forceRefresh = true) => {
    closeMenu();
    setError(null);
    setIsLoading(true);
    try {
      // Always generate fresh, randomized practice drills from the AI to ensure continuous learning.
      const res = await generateGrammarDrills(topic, level);
      setContent(res);
      setView({ type: 'grammar_drills', topic, category, level });
    } catch (err) { 
      console.error(err);
      setError("Drill generation failed. Please try again in a few moments.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadDictionaryLetter = async (letter: string) => {
    closeMenu();
    setError(null);
    
    // Use the static dictionary data
    const data = DICTIONARY_DATA[letter.toUpperCase()];
    if (data) {
      setContent(data);
      setView({ type: 'dictionary_letter', letter: data.letter });
      // Preload all translations for this letter
      preloadTranslationsForWords(data.letter, data.words.map(w => w.word));
      return;
    }

    // Fallback or handle cases like "Search Results" or letters not in our static set
    if (letter === 'Search Results') {
      setView({ type: 'dictionary_letter', letter });
      return;
    }

    // If somehow a letter is missing, we could fallback to AI or show error
    setError("Failed to load dictionary page. This letter is currently unavailable.");
  };
  
  const loadDictionaryPos = (pos: string) => {
    closeMenu();
    setError(null);
    const results: DictionaryEntry[] = [];
    Object.keys(DICTIONARY_DATA).forEach(letter => {
      DICTIONARY_DATA[letter].words.forEach(word => {
        const wordPos = word.partOfSpeech.toLowerCase();
        let match = false;
        if (pos === 'all') match = true;
        else if (pos === 'interj') {
          match = wordPos.includes('interj') || wordPos.includes('excl');
        } else {
          match = wordPos.includes(pos.toLowerCase());
        }

        if (match) {
          results.push(word);
        }
      });
    });
    
    const sorted = results.sort((a, b) => a.word.localeCompare(b.word));

    const res: DictionaryLetterSet = {
      letter: pos === 'all' ? 'All Vocabulary' : pos.charAt(0).toUpperCase() + pos.slice(1) + 's',
      words: sorted
    };
    setContent(res);
    setView({ type: 'dictionary_letter', letter: pos === 'all' ? 'All' : pos });
    // Preload translations for this custom list
    preloadTranslationsForWords(`pos_${pos}`, sorted.map(w => w.word));
  };

  const loadIrregularVerbs = () => {
    closeMenu();
    setError(null);
    const irregulars = getIrregularVerbs();
    setContent(irregulars);
    setView({ type: 'dictionary_irregular' });
    // Preload translations for irregular verbs
    if (irregulars && Array.isArray(irregulars)) {
      preloadTranslationsForWords('irregular_verbs', irregulars.map(w => w.word));
    }
  };

  const loadDictionaryTest = () => {
    closeMenu();
    setError(null);
    const testQuiz = generateDictionaryTest();
    setContent(testQuiz);
    setView({ type: 'dictionary_test' });
  };

  const loadDictionarySearch = async (query: string) => {
    closeMenu();
    setError(null);
    
    const q = query.toLowerCase();
    const results: DictionaryEntry[] = [];
    
    // Search the static dictionary data
    Object.values(DICTIONARY_DATA).forEach(set => {
      set.words.forEach(word => {
        if (word.word.toLowerCase().includes(q) || word.definition.toLowerCase().includes(q)) {
          results.push(word);
        }
      });
    });

    if (results.length > 0) {
      const res: DictionaryLetterSet = {
        letter: `Results for "${query}"`,
        words: results
      };
      setContent(res);
      setView({ type: 'dictionary_letter', letter: 'Search Results' });
      // Preload translations for search results
      preloadTranslationsForWords(`search_${query}`, results.map(w => w.word));
    } else {
      setError(`No dictionary entries found for "${query}" in our essential list.`);
    }
  };

  return (
    <div className="flex h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans overflow-hidden">
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 transform
        ${isReadingMode ? 'hidden pointer-events-none lg:hidden' : 'lg:relative lg:translate-x-0'}
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 pb-4">
          <div className="flex items-center justify-between lg:justify-start gap-3 mb-6 lg:mb-8">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setView({ type: 'home' }); setSearchQuery(''); closeMenu(); }}>
              <div className="bg-[#1A1A1A] p-1.5 lg:p-2 rounded-xl">
                <GraduationCap className="text-white w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <h1 className="text-lg lg:text-xl font-bold tracking-tight">EnglishEverywhere</h1>
            </div>
            <button onClick={closeMenu} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-6 lg:mb-8 px-1">
            <div className="bg-emerald-50 border border-emerald-100 p-2 lg:p-3 rounded-2xl flex flex-col items-center justify-center gap-1">
              <div className="flex items-center gap-1.5 text-emerald-600">
                <Star size={12} lg:size={14} fill="currentColor" />
                <span className="text-base lg:text-lg font-black">{userProgress.points}</span>
              </div>
              <span className="text-[8px] lg:text-[9px] font-bold uppercase tracking-widest text-emerald-800/60">Points</span>
            </div>
            <div className="bg-orange-50 border border-orange-100 p-2 lg:p-3 rounded-2xl flex flex-col items-center justify-center gap-1">
              <div className="flex items-center gap-1.5 text-orange-600">
                <Flame size={12} lg:size={14} fill="currentColor" />
                <span className="text-base lg:text-lg font-black">{userProgress.streak}</span>
              </div>
              <span className="text-[8px] lg:text-[9px] font-bold uppercase tracking-widest text-orange-800/60">Streak</span>
            </div>
          </div>

          <div className="relative mb-6 px-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
                type="text" 
                placeholder="Search topics..." 
                value={searchQuery}
                onChange={(e) => {
                    const q = e.target.value;
                    setSearchQuery(q);
                    if (q) {
                      setView({ type: 'search_results', query: q });
                    } else if (view.type === 'search_results') {
                      setView({ type: 'home' });
                    }
                }}
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]/5 focus:border-[#1A1A1A] transition-all"
            />
          </div>

          <nav className="space-y-1">
            <NavItem 
              icon={<HomeIcon size={20} />} 
              label="Overview" 
              active={view.type === 'home'} 
              onClick={() => { setView({ type: 'home' }); setSearchQuery(''); closeMenu(); }} 
            />
            
            <div className="pt-4 pb-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 px-3">Grammar</p>
            </div>
            <NavItem 
              icon={<Layers size={20} />} 
              label="CEFR Levels" 
              active={view.type === 'grammar_menu' && (view as any).category === 'Levels'} 
              onClick={() => { setView({ type: 'grammar_menu', category: 'Levels' }); closeMenu(); }} 
            />
            <NavItem 
              icon={<BookOpen size={20} />} 
              label="Parts of Speech" 
              active={view.type === 'grammar_menu' && (view as any).category === 'PartsOfSpeech'} 
              onClick={() => { setView({ type: 'grammar_menu', category: 'PartsOfSpeech' }); closeMenu(); }} 
            />
            <NavItem 
              icon={<Clock size={20} />} 
              label="Tenses" 
              active={view.type === 'grammar_menu' && (view as any).category === 'Tenses'} 
              onClick={() => { setView({ type: 'grammar_menu', category: 'Tenses' }); closeMenu(); }} 
            />

            <div className="pt-4 pb-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 px-3">Vocabulary</p>
            </div>
            <NavItem 
              icon={<MapPin size={20} />} 
              label="Situational Topics" 
              active={view.type === 'vocabulary_menu'} 
              onClick={() => { setView({ type: 'vocabulary_menu' }); closeMenu(); }} 
            />
            <NavItem 
              icon={<BrainCircuit size={20} />} 
              label="Idioms & Phrases" 
              active={view.type === 'idiom_menu'} 
              onClick={() => { setView({ type: 'idiom_menu' }); closeMenu(); }} 
            />
            <NavItem 
              icon={<Compass size={20} />} 
              label="Learning Paths" 
              active={view.type === 'learning_paths'} 
              onClick={() => { setView({ type: 'learning_paths' }); closeMenu(); }} 
            />
            <NavItem 
              icon={<Library size={20} />} 
              label="Essential Dictionary" 
              active={view.type === 'dictionary_menu' || view.type === 'dictionary_letter'} 
              onClick={() => { setView({ type: 'dictionary_menu' }); closeMenu(); }} 
            />

            <div className="pt-4 pb-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#4F46E5] px-3">AI Coach</p>
            </div>
            <NavItem 
              icon={<Sparkles size={20} className="text-[#4F46E5]" />} 
              label="Ask AI Assistant" 
              active={view.type === 'ask_ai'} 
              onClick={() => { setView({ type: 'ask_ai' }); setSearchQuery(''); closeMenu(); }} 
            />
            <NavItem 
              icon={<Languages size={20} className="text-[#4F46E5]" />} 
              label="AI Translator" 
              active={view.type === 'translate'} 
              onClick={() => { setView({ type: 'translate' }); setSearchQuery(''); closeMenu(); }} 
            />

            <div className="pt-4 pb-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 px-3">Preferences</p>
            </div>
            <button 
              onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-[#1A1A1A] transition-all text-left"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon size={20} className="text-gray-500" /> : <Sun size={20} className="text-gray-500" />}
              <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
            <button 
              onClick={() => { setIsAccessibilityOpen(true); closeMenu(); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-[#1A1A1A] transition-all text-left"
            >
              <Settings size={20} className="text-gray-500" />
              <span>Accessibility</span>
            </button>
          </nav>
        </div>
        
        <div className="mt-auto p-8 border-t border-gray-100 italic text-sm text-gray-400 hidden lg:block">
          "The limits of my language mean the limits of my world."
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative flex flex-col">
        {/* Mobile Header */}
        {!isReadingMode && (
          <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-30">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg">
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-[#1A1A1A] p-1.5 rounded-lg">
                <GraduationCap className="text-white w-5 h-5" />
              </div>
              <span className="font-bold tracking-tight">EnglishEverywhere</span>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')} 
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-500" 
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button onClick={() => setIsAccessibilityOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500" title="Accessibility Options">
                <Settings size={20} />
              </button>
            </div>
          </header>
        )}

        <AnimatePresence mode="wait">
          {error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#FDFCFB]/90 backdrop-blur-xl z-50"
            >
              <div className="bg-orange-50 border border-orange-100 p-8 rounded-3xl max-w-md shadow-2xl flex flex-col items-center gap-6">
                <AlertCircle className="text-orange-500 w-16 h-16" />
                <div className="space-y-2">
                  <h3 className="text-2xl font-black">Hold on a moment</h3>
                  <p className="text-gray-500 leading-relaxed">{error}</p>
                </div>
                <button 
                  onClick={() => setError(null)}
                  className="w-full py-4 bg-[#1A1A1A] text-white rounded-2xl font-bold hover:scale-[1.02] transition-all"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          ) : isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50 p-6 text-center"
            >
              <BrainCircuit className="w-12 h-12 text-[#1A1A1A] animate-pulse mb-4" />
              <p className="text-xl font-bold animate-pulse">Generating your customized lesson...</p>
              <p className="text-sm text-gray-400 mt-2">Our AI is drafting a unique curriculum just for you.</p>
            </motion.div>
          ) : (
            <motion.div
              key={JSON.stringify(view)}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className={isReadingMode ? "p-6 md:p-8 max-w-4xl mx-auto w-full flex-1 flex flex-col" : "p-6 md:p-12 max-w-5xl mx-auto w-full"}
            >
              {view.type === 'home' && (
                <HomeView 
                  onStart={() => setView({ type: 'grammar_menu', category: 'Levels' })} 
                  onOverallTest={() => loadQuiz('General English Proficiency', 'grammar', 'Levels', undefined, true)}
                  progress={userProgress}
                  onJumpToLesson={jumpToLesson}
                />
              )}
              
              {view.type === 'grammar_menu' && view.category === 'Levels' && (
                <LevelsGrid 
                  onSelect={loadGrammarTopics} 
                  onOverallTest={(level) => loadQuiz(`Overall ${level} English`, 'grammar', 'Levels', level, true)} 
                  progress={userProgress}
                  contentCache={contentCache}
                />
              )}
              
              {view.type === 'grammar_menu' && view.category === 'PartsOfSpeech' && (
                <SimpleList 
                  title="Parts of Speech" 
                  items={PARTS_OF_SPEECH} 
                  onSelect={(topic) => loadLesson(topic, 'PartsOfSpeech')} 
                  onDrills={(topic) => loadDrills(topic, 'PartsOfSpeech')}
                  onTest={(topic) => loadQuiz(topic, 'grammar', 'PartsOfSpeech')} 
                  onOverallTest={() => loadQuiz('Overall English Parts of Speech', 'grammar', 'PartsOfSpeech', undefined, true)}
                  progress={userProgress}
                  category="PartsOfSpeech"
                />
              )}

              {view.type === 'grammar_menu' && view.category === 'Tenses' && (
                <SimpleList 
                  title="English Tenses" 
                  items={TENSES} 
                  onSelect={(topic) => loadLesson(topic, 'Tenses')} 
                  onDrills={(topic) => loadDrills(topic, 'Tenses')}
                  onTest={(topic) => loadQuiz(topic, 'grammar', 'Tenses')} 
                  onOverallTest={() => loadQuiz('Overall English Tenses', 'grammar', 'Tenses', undefined, true)}
                  progress={userProgress}
                  category="Tenses"
                />
              )}

              {view.type === 'grammar_level_menu' && (
                <div className="space-y-12">
                   <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black">Level {view.level} Ready?</h3>
                        <p className="text-emerald-800 font-medium opacity-80">Test your overall proficiency across all {view.level} grammar topics in one go.</p>
                      </div>
                      <button 
                        onClick={() => loadQuiz(`Overall ${view.level} Grammar`, 'grammar', 'Levels', view.level, true)}
                        className="px-8 py-4 bg-[#1A1A1A] text-white rounded-2xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-xl"
                      >
                        <BrainCircuit size={20} /> Take Overall Level Quiz
                      </button>
                   </div>
                   <TopicList 
                    title={`${view.level} Grammar Topics`} 
                    items={content || []} 
                    onBack={() => setView({ type: 'grammar_menu', category: 'Levels' })}
                    onSelect={(topic) => loadLesson(topic, 'Levels', (view as any).level)}
                    onDrills={(topic) => loadDrills(topic, 'Levels', (view as any).level)}
                    onTest={(topic) => loadQuiz(topic, 'grammar', 'Levels', (view as any).level)}
                    progress={userProgress}
                    level={view.level}
                    category="Levels"
                  />
                </div>
              )}

              {view.type === 'grammar_lesson' && (
                <GrammarLessonView 
                  data={content} 
                  category={view.category}
                  onBack={() => {
                    setIsReadingMode(false);
                    if (view.category === 'Levels') loadGrammarTopics(view.level!);
                    else setView({ type: 'grammar_menu', category: view.category });
                  }}
                  onTakeTest={() => {
                    setIsReadingMode(false);
                    loadQuiz(view.topic, 'grammar', view.category, view.level);
                  }}
                  onTakeDrills={() => {
                    setIsReadingMode(false);
                    loadDrills(view.topic, view.category, view.level);
                  }}
                  onRefresh={() => loadLesson(view.topic, view.category, view.level, true)}
                  isReadingMode={isReadingMode}
                  setIsReadingMode={setIsReadingMode}
                />
              )}

              {view.type === 'grammar_drills' && (
                <DrillView 
                  data={content}
                  onBack={() => {
                    if (view.level && view.category === 'Levels') loadGrammarTopics(view.level);
                    else setView({ type: 'grammar_menu', category: view.category });
                  }}
                  onComplete={() => {
                    // Logic for completion if needed
                  }}
                />
              )}

              {view.type === 'vocabulary_menu' && (
                <VocabularyStart onSelect={loadVocabLesson} />
              )}

              {view.type === 'idiom_menu' && (
                <IdiomMenuView onSelect={loadIdiomTopics} onOverallTest={() => loadQuiz('General English Idioms', 'vocabulary', undefined, undefined, true)} />
              )}

              {view.type === 'idiom_topics' && (
                <IdiomTopicsView 
                  category={view.category} 
                  topics={content || []} 
                  onBack={() => setView({ type: 'idiom_menu' })}
                  onSelectTopic={(topic) => loadIdiomLesson(topic, view.category)}
                />
              )}

              {view.type === 'vocabulary_lesson' && (
                <VocabularyLessonView 
                  data={content} 
                  onBack={() => {
                    if ((view as any).category) {
                      setView({ type: 'idiom_topics', category: (view as any).category });
                    } else {
                      setView({ type: 'vocabulary_menu' });
                    }
                  }}
                  onTakeTest={() => loadQuiz(view.topic, 'vocabulary')}
                  speak={speak}
                  onRefresh={() => {
                    if (view.topic.endsWith(' (Idioms)')) {
                      const realTopic = view.topic.replace(' (Idioms)', '');
                      loadIdiomLesson(realTopic, (view as any).category, true);
                    } else {
                      loadVocabLesson(view.topic, true);
                    }
                  }}
                />
              )}

              {view.type === 'learning_paths' && (
                <LearningPathsView onSelect={(pathId) => setView({ type: 'learning_path_detail', pathId })} />
              )}

              {view.type === 'learning_path_detail' && (
                <LearningPathDetailView 
                  pathId={view.pathId}
                  onBack={() => setView({ type: 'learning_paths' })}
                  onSelectTopic={(topic) => {
                    if (topic.type === 'grammar') loadLesson(topic.title, topic.category!, topic.level);
                    else if (topic.type === 'vocabulary') loadVocabLesson(topic.title);
                    else if (topic.type === 'idiom') loadIdiomLesson(topic.title);
                  }}
                  progress={userProgress}
                  contentCache={contentCache}
                />
              )}

              {view.type === 'dictionary_menu' && (
                <DictionaryStart 
                  onSelect={loadDictionaryLetter} 
                  onSearch={loadDictionarySearch} 
                  onShowIrregulars={loadIrregularVerbs} 
                  onSelectPos={loadDictionaryPos}
                  onShowTest={loadDictionaryTest}
                />
              )}

              {view.type === 'dictionary_letter' && (
                <DictionaryLetterView 
                  data={content} 
                  onSelectLetter={loadDictionaryLetter}
                  onSearch={loadDictionarySearch}
                  speak={speak}
                />
              )}

              {view.type === 'dictionary_irregular' && (
                <DictionaryIrregularView 
                  data={content} 
                  onBack={() => setView({ type: 'dictionary_menu' })}
                  onSearch={loadDictionarySearch}
                  speak={speak}
                />
              )}

              {(view.type === 'grammar_test' || view.type === 'vocabulary_test' || view.type === 'dictionary_test') && (
                <QuizView 
                  data={content}
                  onBack={() => {
                    if (view.type === 'grammar_test') {
                       if ((view as any).category === 'Levels') loadGrammarTopics((view as any).level!);
                       else setView({ type: 'grammar_menu', category: (view as any).category });
                    } else if (view.type === 'dictionary_test') {
                      setView({ type: 'dictionary_menu' });
                    } else {
                      setView({ type: 'vocabulary_menu' });
                    }
                  }}
                  onComplete={(scorePercent) => {
                    if (view.type === 'dictionary_test') {
                      markQuizComplete('dictionary_overall_test', scorePercent);
                    } else if (view.type === 'grammar_test') {
                      markQuizComplete(`grammar_${(view as any).topic}`, scorePercent);
                    } else if (view.type === 'vocabulary_test') {
                      markQuizComplete(`vocab_${(view as any).topic}`, scorePercent);
                    }
                  }}
                  onRetake={() => {
                    if (view.type === 'dictionary_test') {
                      loadDictionaryTest();
                    } else if (view.type === 'grammar_test') {
                      loadQuiz((view as any).topic, 'grammar', (view as any).category, (view as any).level, (view as any).isOverall, true);
                    } else if (view.type === 'vocabulary_test') {
                      loadQuiz((view as any).topic, 'vocabulary', undefined, undefined, (view as any).isOverall, true);
                    }
                  }}
                />
              )}

              {view.type === 'search_results' && (
                <SearchResultsView 
                  query={view.query} 
                  onSelectLesson={(topic, cat, level) => loadLesson(topic, cat, level)}
                  onSelectVocab={loadVocabLesson}
                  onSelectIdioms={loadIdiomLesson}
                  onSelectIdiomCategory={loadIdiomTopics}
                  onSelectDictionarySearch={loadDictionarySearch}
                  onSelectQuiz={(topic, type) => loadQuiz(topic, type, 'Levels', undefined, false, true)}
                  onSelectDrills={(topic) => loadDrills(topic, 'Levels')}
                  onNavigate={(v) => { setView(v); closeMenu(); }}
                />
              )}

              {view.type === 'ask_ai' && (
                <AskAIView 
                  onSelectLesson={(topic, cat, level) => loadLesson(topic, cat, level)}
                  onSelectVocab={loadVocabLesson}
                  onSelectQuiz={(topic, type) => loadQuiz(topic, type, 'Levels', undefined, false, true)}
                  onSelectDrills={(topic) => loadDrills(topic, 'Levels')}
                  onNavigate={(v) => { setView(v); closeMenu(); }}
                />
              )}

              {view.type === 'translate' && (
                <TranslateView />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* About The Creator Section */}
        {!isReadingMode && ['home', 'grammar_menu', 'vocabulary_menu', 'idiom_menu', 'learning_paths', 'dictionary_menu'].includes(view.type) && (
          <div className="w-full max-w-5xl mx-auto px-6 md:px-12 pb-12 pt-6 mt-auto">
            <div className="bg-white dark:bg-zinc-900/60 border border-gray-200/60 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <GraduationCap size={22} />
                </div>
                <h2 className="text-lg md:text-xl font-bold tracking-tight text-[#1A1A1A] dark:text-white">
                  About The Creator
                </h2>
              </div>
              
              <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Hello and Welcome! I am Sou Lonkakvey. I developed EnglishEverywhere as part of my ongoing journey in educational technology. As an educator, my ultimate goal is always to find practical, meaningful ways to help students build confidence in their language skills using modern digital tools. 
                </p>
                <p>
                  I believe that learning shouldn't stop when the school bell rings. That is why I built this app—to give my students and fellow learners a supportive, interactive space where they can reinforce what they learn at their own pace. By combining standard classroom learning with smart AI tools, I hope to make language practice more accessible, engaging, and seamless for everyone.
                </p>
                <p>
                  Thank you so much for testing out the app and exploring this project!
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-zinc-800/80">
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#4F46E5] dark:text-indigo-400 mt-1 font-sans">•</span>
                    <span>
                      <strong className="text-[#1A1A1A] dark:text-white font-semibold">Affiliation:</strong> Prey Veng Regional Teacher Training Center (PVRTTC)
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#4F46E5] dark:text-indigo-400 mt-1 font-sans">•</span>
                    <span>
                      <strong className="text-[#1A1A1A] dark:text-white font-semibold">Purpose:</strong> Strengthening language skills through interactive, demonstration-based digital practice
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#4F46E5] dark:text-indigo-400 mt-1 font-sans">•</span>
                    <span>
                      <strong className="text-[#1A1A1A] dark:text-white font-semibold">Email:</strong> soulonkakvey7@gmail.com
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#4F46E5] dark:text-indigo-400 mt-1 font-sans">•</span>
                    <span>
                      <strong className="text-[#1A1A1A] dark:text-white font-semibold">Telegram:</strong> 097 5394254
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Accessibility Modal */}
      <AnimatePresence>
        {isAccessibilityOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAccessibilityOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            
            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl border border-gray-100 relative z-10 space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#1A1A1A]/5 rounded-xl">
                    <Type size={20} className="text-[#1A1A1A]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-[#1A1A1A]">Accessibility Controls</h2>
                    <p className="text-xs text-gray-400">Optimize lesson size & line heights</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAccessibilityOpen(false)} 
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-[#1A1A1A] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Live Preview Panel */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-2 text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Live Preview</span>
                <p 
                  className="text-xs text-[#1A1A1A] leading-relaxed transition-all"
                  style={{ 
                    fontSize: `${fontSizeScale}%`, 
                    lineHeight: lineHeightScale 
                  }}
                >
                  This is a live preview of how the lesson content and explanation sentences will render on your screen. You can scale the font size and adjust spacing to make reading comfortable.
                </p>
              </div>

              {/* Font Size Scaling */}
              <div className="space-y-3 text-left">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Font Scaling</label>
                  <span className="text-xs font-mono font-bold bg-[#1A1A1A]/5 text-[#1A1A1A] px-2 py-0.5 rounded-lg">
                    {fontSizeScale}%
                  </span>
                </div>
                
                {/* Range Slider */}
                <input 
                  type="range" 
                  min="80" 
                  max="160" 
                  step="5"
                  value={fontSizeScale}
                  onChange={(e) => setFontSizeScale(parseInt(e.target.value))}
                  className="w-full accent-[#1A1A1A] cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
                />

                {/* Quick Presets */}
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {[
                    { label: 'A-', val: 85, name: 'Small' },
                    { label: 'Normal', val: 100, name: 'Default' },
                    { label: 'A+', val: 120, name: 'Large' },
                    { label: 'A++', val: 140, name: 'Huge' }
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      onClick={() => setFontSizeScale(preset.val)}
                      className={`py-1.5 px-1 rounded-xl text-[10px] font-bold transition-all border ${
                        fontSizeScale === preset.val
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                      }`}
                      title={preset.name}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Line Height Adjustments */}
              <div className="space-y-3 text-left">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Line Height Spacing</label>
                  <span className="text-xs font-mono font-bold bg-[#1A1A1A]/5 text-[#1A1A1A] px-2 py-0.5 rounded-lg">
                    {lineHeightScale === 1.3 ? 'Tight' : lineHeightScale === 1.5 ? 'Normal' : lineHeightScale === 1.8 ? 'Spacious' : 'Relaxed'} ({lineHeightScale})
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Tight', val: 1.3 },
                    { label: 'Normal', val: 1.5 },
                    { label: 'Spacious', val: 1.8 },
                    { label: 'Relaxed', val: 2.1 }
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      onClick={() => setLineHeightScale(preset.val)}
                      className={`py-2 px-1 rounded-xl text-[10px] font-bold transition-all border flex flex-col items-center justify-center gap-1 ${
                        lineHeightScale === preset.val
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-xs">≡</span>
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Selection */}
              <div className="space-y-3 text-left">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Theme Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTheme('light')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                      theme === 'light'
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                        : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Sun size={14} />
                    Light Mode
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                      theme === 'dark'
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                        : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Moon size={14} />
                    Dark Mode
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <button 
                  onClick={() => {
                    setFontSizeScale(100);
                    setLineHeightScale(1.5);
                    setTheme('light');
                  }}
                  className="flex-1 py-3 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-700 rounded-xl font-bold text-xs transition-colors"
                >
                  Reset Defaults
                </button>
                <button 
                  onClick={() => setIsAccessibilityOpen(false)}
                  className="flex-1 py-3 bg-[#1A1A1A] text-white hover:bg-black rounded-xl font-bold text-xs transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SearchResultsView({ 
  query, 
  onSelectLesson, 
  onSelectVocab, 
  onSelectIdioms, 
  onSelectIdiomCategory,
  onSelectDictionarySearch,
  onSelectQuiz,
  onSelectDrills,
  onNavigate 
}: { 
  query: string, 
  onSelectLesson: (topic: string, category: GrammarCategory, level?: CEFRLevel) => void, 
  onSelectVocab: (topic: string) => void,
  onSelectIdioms: (topic: string) => void,
  onSelectIdiomCategory: (category: string) => void,
  onSelectDictionarySearch: (query: string) => void,
  onSelectQuiz: (topic: string, type: 'grammar' | 'vocabulary') => void,
  onSelectDrills: (topic: string) => void,
  onNavigate: (view: ViewState) => void
}) {
  const q = (query || '').toLowerCase().trim();
  const words = q.split(/\s+/).filter(Boolean);
  
  const matches = (title: string) => {
    if (!words.length) return false;
    const t = title.toLowerCase();
    return words.every(word => t.includes(word));
  };

  const results: {
    type: 'grammar' | 'vocab' | 'category' | 'path' | 'idiom';
    title: string;
    subtitle?: string;
    onClick: () => void;
  }[] = [];

  // 1. Categories
  if (matches('CEFR Levels Grammar')) {
    results.push({ type: 'category', title: 'CEFR Levels', subtitle: 'Grammar by Level', onClick: () => onNavigate({ type: 'grammar_menu', category: 'Levels' }) });
  }
  if (matches('Parts of Speech Grammar')) {
    results.push({ type: 'category', title: 'Parts of Speech', subtitle: 'Grammar Category', onClick: () => onNavigate({ type: 'grammar_menu', category: 'PartsOfSpeech' }) });
  }
  if (matches('English Tenses Grammar')) {
    results.push({ type: 'category', title: 'English Tenses', subtitle: 'Grammar Category', onClick: () => onNavigate({ type: 'grammar_menu', category: 'Tenses' }) });
  }
  if (matches('Idioms and Phrases Vocabulary')) {
    results.push({ type: 'category', title: 'Idioms & Phrases', subtitle: 'Vocabulary Category', onClick: () => onNavigate({ type: 'idiom_menu' }) });
  }
  if (matches('Learning Paths Goals')) {
    results.push({ type: 'category', title: 'Learning Paths', subtitle: 'Personalized Goals', onClick: () => onNavigate({ type: 'learning_paths' }) });
  }
  if (matches('Dictionary Essential Vocabulary A-Z')) {
    results.push({ type: 'category', title: 'Essential Dictionary', subtitle: 'A-Z Vocabulary', onClick: () => onNavigate({ type: 'dictionary_menu' }) });
  }

  // 1.5 Dictionary Direct Search
  if (q.length > 2) {
    results.push({ 
      type: 'vocab', 
      title: `Search "${q}" in Dictionary`, 
      subtitle: 'Definition & Examples', 
      onClick: () => onSelectDictionarySearch(q)
    });
  }

  // 2. Individual Lessons
  // Grammar by Level (CEFR)
  CEFR_LEVELS.forEach(levelGroup => {
    levelGroup.topics.forEach(topic => {
      if (matches(topic)) {
        results.push({ 
          type: 'grammar', 
          title: topic, 
          subtitle: `${levelGroup.level} Grammar`, 
          onClick: () => onSelectLesson(topic, 'Levels', levelGroup.level) 
        });
      }
    });
  });

  PARTS_OF_SPEECH.forEach(topic => {
    if (matches(topic)) {
      results.push({ type: 'grammar', title: topic, subtitle: 'Parts of Speech', onClick: () => onSelectLesson(topic, 'PartsOfSpeech') });
    }
  });

  TENSES.forEach(topic => {
    if (matches(topic)) {
      results.push({ type: 'grammar', title: topic, subtitle: 'Grammar Tense', onClick: () => onSelectLesson(topic, 'Tenses') });
    }
  });

  IDIOM_CATEGORIES.forEach(topic => {
    if (matches(topic)) {
      results.push({ type: 'idiom', title: topic, subtitle: 'Idiom Category', onClick: () => onSelectIdiomCategory(topic) });
    }
  });

  LEARNING_PATHS.forEach(path => {
    if (matches(path.title) || matches(path.description)) {
      results.push({ type: 'path', title: path.title, subtitle: 'Learning Path', onClick: () => onNavigate({ type: 'learning_path_detail', pathId: path.id }) });
    }
  });

  // 3. Vocab presets
  const vocabPresets = [
    'Family Members', 
    'At the Airport & Hotels', 
    'Restaurant & Dining Out', 
    'Asking for Directions', 
    'Travel Safety & Help',
    'Professional Meetings', 
    'Formal Emails & Requests',
    'Meetings & Negotiations',
    'Presentations & Pitching',
    'Academic Vocabulary List 1',
    'Describing Data & Trends',
    'C1 Vocabulary: Abstract Topics',
    'Medical & Health', 
    'Technology & Innovation'
  ];
  vocabPresets.forEach(topic => {
    if (matches(topic)) {
      results.push({ type: 'vocab', title: topic, subtitle: 'Situational Vocabulary', onClick: () => onSelectVocab(topic) });
    }
  });

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="space-y-1 md:space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Search Results</h2>
        <p className="text-sm md:text-base text-gray-500">Showing matches for "{query}"</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        <section className="lg:col-span-2 space-y-6">
          <h3 className="text-lg md:text-xl font-bold flex items-center gap-2">
            <Compass size={20} className="text-emerald-600" /> Lesson Matches
          </h3>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {results.map((r, i) => (
                <button 
                  key={i} 
                  onClick={r.onClick}
                  className="w-full p-4 md:p-5 bg-white border border-gray-100 rounded-2xl md:rounded-3xl text-left hover:border-[#1A1A1A] hover:shadow-xl transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center ${
                      r.type === 'category' ? 'bg-amber-50 text-amber-600' :
                      r.type === 'path' ? 'bg-blue-50 text-blue-600' :
                      'bg-emerald-50 text-emerald-600'
                    }`}>
                      {r.type === 'category' ? <Layers size={16} md:size={18} /> : 
                       r.type === 'path' ? <Compass size={16} md:size={18} /> : 
                       <BookOpen size={16} md:size={18} />}
                    </div>
                    <div>
                      <div className="font-bold text-sm md:text-base">{formatTitleWithKhmer(r.title, "font-bold text-sm md:text-base")}</div>
                      {r.subtitle && <p className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-gray-400">{r.subtitle}</p>}
                    </div>
                  </div>
                  <ChevronRight size={14} md:size={16} className="text-gray-300 group-hover:text-[#1A1A1A] transition-colors" />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 md:p-12 text-center bg-gray-50 rounded-2xl md:rounded-[3rem] border border-dashed border-gray-200">
               <Search className="w-10 h-10 md:w-12 md:h-12 text-gray-200 mx-auto mb-3 md:mb-4" />
               <p className="text-gray-400 font-medium text-sm md:text-base">No direct lesson matches found.</p>
               <p className="text-gray-400 text-xs mt-1">Try broader terms or use the AI generator.</p>
            </div>
          )}
        </section>

        <section className="space-y-6">
          <h3 className="text-lg md:text-xl font-bold flex items-center gap-2">
            <BrainCircuit size={20} className="text-indigo-600" /> Instant AI Generators
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Our AI can instantly design standard-aligned learning modules specifically for your search query:
          </p>
          <div className="space-y-3">
            {/* CARD 1: Custom Vocabulary */}
            <button 
              onClick={() => onSelectVocab(query)}
              className="w-full p-4 bg-blue-50/50 border border-blue-100 hover:border-blue-400 rounded-2xl text-left hover:shadow-md transition-all group flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <BrainCircuit size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-blue-900 leading-snug">Study Custom Vocabulary</p>
                <p className="text-[10px] text-blue-600/70 mt-0.5">Create a specialized word list with IPA & bilingual examples.</p>
              </div>
              <ChevronRight size={14} className="text-blue-300 group-hover:text-blue-600 shrink-0 self-center transition-colors" />
            </button>

            {/* CARD 2: Custom Grammar */}
            <button 
              onClick={() => onSelectLesson(query, 'Levels')}
              className="w-full p-4 bg-emerald-50/50 border border-emerald-100 hover:border-emerald-400 rounded-2xl text-left hover:shadow-md transition-all group flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                <GraduationCap size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-emerald-900 leading-snug">Create Grammar Guide</p>
                <p className="text-[10px] text-emerald-600/70 mt-0.5">Generate structure formulas, usage notes, and active context.</p>
              </div>
              <ChevronRight size={14} className="text-emerald-300 group-hover:text-emerald-600 shrink-0 self-center transition-colors" />
            </button>

            {/* CARD 3: Custom Drills */}
            <button 
              onClick={() => onSelectDrills(query)}
              className="w-full p-4 bg-indigo-50/50 border border-indigo-100 hover:border-indigo-400 rounded-2xl text-left hover:shadow-md transition-all group flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                <Zap size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-indigo-900 leading-snug">Interactive Structure Drills</p>
                <p className="text-[10px] text-indigo-600/70 mt-0.5">Learn by doing with sentence construction and gap exercises.</p>
              </div>
              <ChevronRight size={14} className="text-indigo-300 group-hover:text-indigo-600 shrink-0 self-center transition-colors" />
            </button>

            {/* CARD 4: Custom Quiz */}
            <button 
              onClick={() => onSelectQuiz(query, 'grammar')}
              className="w-full p-4 bg-amber-50/50 border border-amber-100 hover:border-amber-400 rounded-2xl text-left hover:shadow-md transition-all group flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                <Award size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-amber-900 leading-snug">Take Customized Quiz</p>
                <p className="text-[10px] text-amber-600/70 mt-0.5">Test your understanding with 20 questions and clear feedback.</p>
              </div>
              <ChevronRight size={14} className="text-amber-300 group-hover:text-amber-600 shrink-0 self-center transition-colors" />
            </button>
          </div>

          <div className="p-5 bg-amber-50/40 border border-amber-100 rounded-3xl">
             <div className="flex items-center gap-2 text-amber-700 font-bold uppercase tracking-widest text-[9px] mb-1.5">
               <Star size={12} className="text-amber-500 fill-amber-500" /> Pro Tip
             </div>
             <p className="text-[11px] text-amber-900/60 leading-relaxed font-medium">
               You can type any custom topic—like "Space Travel", "Banking Talk", or complex rules like "Subjunctive Mood"—to trigger immediate AI generation.
             </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function FormattedHtml({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-3 font-sans text-sm md:text-base text-gray-700 leading-relaxed">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        
        // Headers
        if (trimmed.startsWith('###')) {
          return (
            <h4 key={i} className="text-base md:text-lg font-black uppercase text-indigo-950 mt-4 mb-2 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-4 bg-indigo-500 rounded-full inline-block"></span>
              <ExampleText text={trimmed.replace(/^###\s*/, '')} />
            </h4>
          );
        }
        if (trimmed.startsWith('##')) {
          return (
            <h3 key={i} className="text-lg md:text-xl font-black uppercase text-indigo-950 mt-6 mb-3 tracking-tight flex items-center gap-2">
              <span className="w-2 h-5 bg-indigo-600 rounded-full inline-block"></span>
              <ExampleText text={trimmed.replace(/^##\s*/, '')} />
            </h3>
          );
        }
        if (trimmed.startsWith('#')) {
          return (
            <h2 key={i} className="text-xl md:text-2xl font-black uppercase text-indigo-950 mt-8 mb-4 tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-6 bg-indigo-700/80 rounded-full inline-block"></span>
              <ExampleText text={trimmed.replace(/^#\s*/, '')} />
            </h2>
          );
        }

        // Bullet list item
        if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
          const itemText = trimmed.replace(/^[-*]\s*/, '');
          return (
            <div key={i} className="flex items-start gap-2.5 pl-4 py-1">
              <span className="text-indigo-500 shrink-0 mt-1.5 text-xs">✦</span>
              <p className="flex-1 text-gray-700 font-medium"><ExampleText text={itemText} /></p>
            </div>
          );
        }

        // Empty lines
        if (!trimmed) {
          return <div key={i} className="h-2" />;
        }

        // Default paragraph
        return (
          <p key={i} className="text-gray-700 font-medium">
            <ExampleText text={line} />
          </p>
        );
      })}
    </div>
  );
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  relatedTopics?: string[];
}

interface SavedNote {
  id: string;
  title: string;
  content: string;
  savedAt: number;
}

function AskAIView({
  onSelectLesson,
  onSelectVocab,
  onSelectQuiz,
  onSelectDrills,
  onNavigate
}: {
  onSelectLesson: (topic: string, category: GrammarCategory, level?: CEFRLevel) => void, 
  onSelectVocab: (topic: string) => void,
  onSelectQuiz: (topic: string, type: 'grammar' | 'vocabulary') => void,
  onSelectDrills: (topic: string) => void,
  onNavigate: (view: ViewState) => void
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('english_everywhere_chat_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedNotes, setSavedNotes] = useState<SavedNote[]>(() => {
    try {
      const saved = localStorage.getItem('english_everywhere_saved_notes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState<'chat' | 'notebook'>('chat');
  const [inputVal, setInputVal] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [voiceAccent, setVoiceAccent] = useState<'US' | 'UK'>('US');
  const [voiceRate, setVoiceRate] = useState<number>(1.0);
  const [autoReadAloud, setAutoReadAloud] = useState<boolean>(false);
  const [isListening, setIsListening] = useState(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('english_everywhere_chat_history', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('english_everywhere_saved_notes', JSON.stringify(savedNotes));
  }, [savedNotes]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isQuerying) return;

    setErrorMsg(null);
    setInputVal('');

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: trimmed
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsQuerying(true);

    try {
      // Feed full chat history context for smart conversational followup
      const historyContext = updatedMessages.map(m => ({ role: m.role, content: m.content }));
      const res = await askAI(trimmed, historyContext);
      
      const assistantMessage: ChatMessage = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        content: res.answer,
        relatedTopics: res.relatedTopics || []
      };
      
      setMessages(prev => [...prev, assistantMessage]);

      if (autoReadAloud) {
        handleSpeak(assistantMessage.id, assistantMessage.content);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to reach AI Coach. Please check your connection and try again.");
    } finally {
      setIsQuerying(false);
    }
  };

  const handleSpeak = (msgId: string, text: string) => {
    if (speakingId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    
    window.speechSynthesis.cancel();
    // Strip double asterisks for speech
    const cleanText = text.replace(/\*\*/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = voiceAccent === 'UK' ? 'en-GB' : 'en-US';
    utterance.rate = voiceRate;
    
    // Choose specific voice based on accent choice if available in browser
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const filtered = voices.filter(v => v.lang.includes(voiceAccent === 'UK' ? 'GB' : 'US'));
      if (filtered.length > 0) {
        const googleVoice = filtered.find(v => v.name.toLowerCase().includes('google'));
        utterance.voice = googleVoice || filtered[0];
      }
    }
    
    utterance.onend = () => {
      setSpeakingId(null);
    };
    utterance.onerror = () => {
      setSpeakingId(null);
    };

    setSpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMsg("Speech dictation is not available in your browser. Google Chrome is recommended!");
      setTimeout(() => setErrorMsg(null), 5000);
      return;
    }

    try {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onstart = () => {
        setIsListening(true);
        window.speechSynthesis.cancel();
        setSpeakingId(null);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputVal(prev => prev ? prev + ' ' + transcript : transcript);
      };

      rec.onerror = (e: any) => {
        console.error("Speech Recognition Error:", e);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const saveToNotebook = (message: ChatMessage) => {
    // Generate a title based on matching preceding user's query or content
    const correspondingUserMsg = messages.find((_, idx) => {
      const index = messages.findIndex(m => m.id === message.id);
      return idx === index - 1;
    });

    const title = correspondingUserMsg 
      ? correspondingUserMsg.content.slice(0, 45) + (correspondingUserMsg.content.length > 45 ? '...' : '')
      : "Explaining: " + message.content.slice(0, 30) + "...";

    // Prevent duplicate entries
    if (savedNotes.some(note => note.content === message.content)) {
      setErrorMsg("Explanation is already saved in your Study Notebook!");
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }

    const newNote: SavedNote = {
      id: `note_${Date.now()}`,
      title,
      content: message.content,
      savedAt: Date.now()
    };

    setSavedNotes(prev => [newNote, ...prev]);
    setErrorMsg("Saved perfectly to Notebook! 🔖");
    setTimeout(() => setErrorMsg(null), 3000);
  };

  const deleteNote = (noteId: string) => {
    if (expandedNoteId === noteId) setExpandedNoteId(null);
    setSavedNotes(prev => prev.filter(n => n.id !== noteId));
  };

  const handleTopicAction = (topic: string, actionType: 'lesson' | 'vocab' | 'drills' | 'quiz' | 'ask') => {
    window.speechSynthesis.cancel();
    setSpeakingId(null);
    
    if (actionType === 'lesson') {
      onSelectLesson(topic, 'Levels');
    } else if (actionType === 'vocab') {
      onSelectVocab(topic);
    } else if (actionType === 'drills') {
      onSelectDrills(topic);
    } else if (actionType === 'quiz') {
      onSelectQuiz(topic, 'grammar');
    } else if (actionType === 'ask') {
      handleSend(`Explain ${topic}`);
    }
  };

  const clearHistory = () => {
    window.speechSynthesis.cancel();
    setSpeakingId(null);
    setMessages([]);
    localStorage.removeItem('english_everywhere_chat_history');
  };

  const PRESETS = [
    { title: "Make vs Do", q: "Explain the difference between 'make' and 'do' in English, with common collocations." },
    { title: "Third Conditional", q: "Explain the Third Conditional grammar structure and when to use it, with examples." },
    { title: "Corporate Business", q: "Recommend 10 highly useful English vocabulary words for corporate business and formal meetings." },
    { title: "Since vs For", q: "When do I use 'since' versus 'for' when speaking in the present perfect tense?" }
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-100px)] lg:h-[calc(100vh-20px)] max-w-4xl mx-auto w-full pb-6">
      {/* Ask AI Header banner */}
      <div className="flex items-start justify-between border-b border-gray-100 pb-4 shrink-0">
        <div className="space-y-1">
          <h2 className="text-xl md:text-3xl font-black tracking-tight flex items-center gap-2 text-indigo-950">
            <Sparkles className="text-indigo-600 fill-indigo-100 animate-spin-slow" size={24} /> Ask AI Assistant
          </h2>
          <p className="text-xs md:text-sm text-gray-500">Ask any custom grammar questions, compare patterns, or translate rules directly.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowVoiceSettings(!showVoiceSettings)}
            className={`p-2 rounded-xl border transition-all ${showVoiceSettings ? 'bg-indigo-50 border-indigo-200 text-indigo-600 shadow-sm' : 'bg-white border-gray-200 text-gray-500 hover:text-indigo-600'}`}
            title="Audio Voice Options"
          >
            <Settings size={18} />
          </button>
          {messages.length > 0 && activeTab === 'chat' && (
            <button 
              onClick={clearHistory}
              className="px-3 py-1.5 border border-red-100 text-red-500 bg-red-50/50 hover:bg-red-50 rounded-xl text-xs font-bold transition-colors shadow-sm shrink-0"
            >
              Clear Chat
            </button>
          )}
        </div>
      </div>

      {/* Voice Customizer Box */}
      {showVoiceSettings && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 mt-3 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600 shrink-0">
              <Volume2 size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-950">Voice Settings</p>
              <p className="text-[10px] text-indigo-600/70 leading-tight">Customize pronunciation accents & pacing.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            {/* Lang selection */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-gray-400 mr-1 uppercase">Accent:</span>
              <button 
                onClick={() => setVoiceAccent('US')}
                className={`px-2 py-0.5 text-xs font-bold rounded-lg transition-colors ${voiceAccent === 'US' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
              >
                🇺🇸 US
              </button>
              <button 
                onClick={() => setVoiceAccent('UK')}
                className={`px-2 py-0.5 text-xs font-bold rounded-lg transition-colors ${voiceAccent === 'UK' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
              >
                🇬🇧 UK
              </button>
            </div>

            {/* Rate setting */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Speed:</span>
              <input 
                type="range" 
                min="0.7" 
                max="1.4" 
                step="0.1" 
                value={voiceRate}
                onChange={(e) => setVoiceRate(parseFloat(e.target.value))}
                className="w-16 h-1 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <span className="text-[11px] font-bold text-indigo-950 w-8">{voiceRate.toFixed(1)}x</span>
            </div>

            {/* Auto Read option */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox"
                checked={autoReadAloud}
                onChange={(e) => setAutoReadAloud(e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
              />
              <span className="text-[10px] font-bold text-gray-600 uppercase">Auto-read</span>
            </label>
          </div>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-100 mt-4 mb-4 gap-6 px-2 shrink-0">
        <button
          onClick={() => setActiveTab('chat')}
          className={`pb-2.5 font-black text-sm tracking-wide transition-all border-b-2 px-1 ${
            activeTab === 'chat' 
              ? 'border-indigo-600 text-indigo-950' 
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          💬 AI Practice Chat
        </button>
        <button
          onClick={() => setActiveTab('notebook')}
          className={`pb-2.5 font-black text-sm tracking-wide transition-all border-b-2 px-1 flex items-center gap-2 ${
            activeTab === 'notebook' 
              ? 'border-indigo-600 text-indigo-950' 
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          🔖 Saved Notebook
          {savedNotes.length > 0 && (
            <span className="bg-indigo-100 text-indigo-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0">
              {savedNotes.length}
            </span>
          )}
        </button>
      </div>

      {/* Chat messages layout */}
      {activeTab === 'chat' ? (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto pr-2 space-y-6 mb-4 min-h-0">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-6 text-center h-full max-w-xl mx-auto space-y-8">
                <div className="w-16 h-16 rounded-[2rem] bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-lg shadow-indigo-500/10">
                  <Sparkles size={28} className="animate-pulse" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-black text-indigo-950">Your English AI Coach</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-semibold">
                    Type any query—like explaining tricky homophones, comparing passive versus active voice, or translating custom themes. I'll remember our conversation and guide you step by step.
                  </p>
                </div>

                <div className="w-full text-left space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-indigo-500">Suggested Prompts:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(preset.q)}
                        className="p-3 bg-white border border-gray-200 hover:border-indigo-400 hover:shadow-md rounded-2xl text-left text-xs font-semibold text-gray-700 transition-all flex items-center justify-between group"
                      >
                        <span>{preset.title}</span>
                        <ChevronRight size={14} className="text-gray-300 group-hover:text-indigo-500 transition-colors shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}
                >
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                      {msg.role === 'user' ? 'You' : 'AI Coach'}
                    </span>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => handleSpeak(msg.id, msg.content)}
                          className={`p-1 hover:bg-gray-100 rounded-lg transition-colors ${speakingId === msg.id ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400'}`}
                          title="Speak text"
                        >
                          <Volume2 size={14} className={speakingId === msg.id ? "animate-bounce" : ""} />
                        </button>
                        <button 
                          onClick={() => saveToNotebook(msg)}
                          className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-indigo-600 transition-colors"
                          title="Save to study notebook"
                        >
                          <Bookmark size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className={`p-4 md:p-6 rounded-3xl max-w-[90%] md:max-w-[85%] border shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-br from-indigo-950 to-indigo-900 border-indigo-950 text-white font-semibold rounded-tr-none' 
                      : 'bg-white border-gray-200 text-gray-800 rounded-tl-none'
                  }`}>
                    {msg.role === 'user' ? (
                      <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    ) : (
                      <FormattedHtml text={msg.content} />
                    )}
                  </div>

                  {/* Related Actions */}
                  {msg.role === 'assistant' && msg.relatedTopics && msg.relatedTopics.length > 0 && (
                    <div className="pl-2 pr-4 pt-1 space-y-2 mt-2 w-full max-w-[85%]">
                      <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 flex items-center gap-1">
                        <Sparkles size={10} /> Active English Practice:
                      </p>
                      <div className="flex flex-col gap-2.5">
                        {msg.relatedTopics.map((topic, i) => (
                          <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
                            <span className="text-xs font-bold text-gray-800 truncate pr-2">✦ {topic}</span>
                            <div className="flex flex-wrap gap-1.5">
                              <button
                                onClick={() => handleTopicAction(topic, 'ask')}
                                className="bg-white hover:bg-indigo-50 hover:border-indigo-200 border border-gray-200 rounded-xl px-2.5 py-1 text-[10px] font-bold text-indigo-600 transition-colors shadow-sm"
                              >
                                🔍 Learn More
                              </button>
                              <button
                                onClick={() => handleTopicAction(topic, 'vocab')}
                                className="bg-white hover:bg-emerald-50 hover:border-emerald-200 border border-gray-200 rounded-xl px-2.5 py-1 text-[10px] font-bold text-emerald-600 transition-colors shadow-sm"
                              >
                                📚 Vocab List
                              </button>
                              <button
                                onClick={() => handleTopicAction(topic, 'lesson')}
                                className="bg-white hover:bg-blue-50 hover:border-blue-200 border border-gray-200 rounded-xl px-2.5 py-1 text-[10px] font-bold text-blue-600 transition-colors shadow-sm"
                              >
                                ✍️ Grammar Guide
                              </button>
                              <button
                                onClick={() => handleTopicAction(topic, 'drills')}
                                className="bg-white hover:bg-violet-50 hover:border-violet-200 border border-gray-200 rounded-xl px-2.5 py-1 text-[10px] font-bold text-violet-600 transition-colors shadow-sm"
                              >
                                ⚡ Drills
                              </button>
                              <button
                                onClick={() => handleTopicAction(topic, 'quiz')}
                                className="bg-white hover:bg-amber-50 hover:border-amber-200 border border-gray-200 rounded-xl px-2.5 py-1 text-[10px] font-bold text-amber-600 transition-colors shadow-sm"
                              >
                                📝 Quiz
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}

            {isQuerying && (
              <div className="flex flex-col items-start space-y-1.5 animate-pulse">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 pl-1">AI Coach</span>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-3xl rounded-tl-none flex items-center gap-3">
                  <BrainCircuit className="w-5 h-5 text-indigo-500 animate-spin-slow shrink-0" />
                  <span className="text-xs font-bold text-indigo-800/80">Drafting personalized explanation...</span>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-xs font-semibold text-red-600 max-w-[85%] shadow-sm">
                {errorMsg}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Form and voice input */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
            className="bg-white border border-gray-200 rounded-2xl p-2 shadow-md gap-2 flex items-center group focus-within:border-indigo-400 transition-colors shrink-0"
          >
            {/* Mic trigger */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-400 hover:text-indigo-600 hover:bg-gray-50'}`}
              title={isListening ? "Listening... Click to stop" : "Speak to AI Coach (Voice Dictation)"}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            <input 
              type="text"
              placeholder={isListening ? "Listening... Speak clearly in English." : "Type custom rules, words or text (e.g. explain passive voice)"}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={isQuerying}
              className="flex-1 bg-transparent px-2 py-2 text-sm focus:outline-none placeholder-gray-400 font-semibold text-indigo-950"
            />
            
            <button
              type="submit"
              disabled={isQuerying || !inputVal.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 disabled:hover:bg-indigo-600 text-white rounded-xl p-2.5 transition-all shadow-md shrink-0 flex items-center justify-center cursor-pointer"
            >
              <Sparkles size={16} />
            </button>
          </form>
        </div>
      ) : (
        /* Saved study notebook list */
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {savedNotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center h-full max-w-md mx-auto space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-gray-400">
                <Bookmark size={20} />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-gray-800 text-base">Your Study Notebook is Empty</p>
                <p className="text-xs text-gray-500">When asking queries in AI practice chat, click the bookmark icon next to any helpful coach explanation to keep it safe for revision here.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-black uppercase text-indigo-500 tracking-wider">Your Bookmarked Explanations ({savedNotes.length}):</p>
              
              {savedNotes.map((note) => {
                const isExpanded = expandedNoteId === note.id;
                return (
                  <div 
                    key={note.id}
                    className="border border-gray-200 bg-white rounded-2xl hover:border-indigo-300 transition-all shadow-sm overflow-hidden"
                  >
                    {/* Note header bar */}
                    <div 
                      onClick={() => setExpandedNoteId(isExpanded ? null : note.id)}
                      className="p-4 flex items-center justify-between gap-4 cursor-pointer select-none bg-gray-50 hover:bg-indigo-50/20 transition-colors"
                    >
                      <div className="min-w-0 flex-1 flex items-center gap-2.5">
                        <span className="text-xs text-gray-400 shrink-0">
                          {new Date(note.savedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                        <p className="text-sm font-black text-indigo-950 truncate flex-1 leading-tight">{note.title}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSpeak(note.id, note.content);
                          }}
                          className={`p-1.5 hover:bg-gray-200 text-gray-500 rounded-lg transition-colors ${speakingId === note.id ? 'text-indigo-600 bg-indigo-100/50' : ''}`}
                          title="Speak Explanation"
                        >
                          <Volume2 size={14} className={speakingId === note.id ? "animate-bounce" : ""} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNote(note.id);
                          }}
                          className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                          title="Delete note"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Note content */}
                    {isExpanded && (
                      <div className="p-5 md:p-6 border-t border-gray-100 bg-white">
                        <FormattedHtml text={note.content} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface Language {
  name: string;
  code: string;
}

const GOOGLE_LANGUAGES: Language[] = [
  { name: 'Afrikaans', code: 'af-ZA' },
  { name: 'Albanian', code: 'sq-AL' },
  { name: 'Amharic', code: 'am-ET' },
  { name: 'Arabic', code: 'ar-SA' },
  { name: 'Armenian', code: 'hy-AM' },
  { name: 'Azerbaijani', code: 'az-AZ' },
  { name: 'Basque', code: 'eu-ES' },
  { name: 'Belarusian', code: 'be-BY' },
  { name: 'Bengali', code: 'bn-IN' },
  { name: 'Bosnian', code: 'bs-BA' },
  { name: 'Bulgarian', code: 'bg-BG' },
  { name: 'Catalan', code: 'ca-ES' },
  { name: 'Cebuano', code: 'ceb-PH' },
  { name: 'Chinese (Simplified)', code: 'zh-CN' },
  { name: 'Chinese (Traditional)', code: 'zh-TW' },
  { name: 'Croatian', code: 'hr-HR' },
  { name: 'Czech', code: 'cs-CZ' },
  { name: 'Danish', code: 'da-DK' },
  { name: 'Dutch', code: 'nl-NL' },
  { name: 'English', code: 'en-US' },
  { name: 'Esperanto', code: 'eo' },
  { name: 'Estonian', code: 'et-EE' },
  { name: 'Finnish', code: 'fi-FI' },
  { name: 'French', code: 'fr-FR' },
  { name: 'Galician', code: 'gl-ES' },
  { name: 'Georgian', code: 'ka-GE' },
  { name: 'German', code: 'de-DE' },
  { name: 'Greek', code: 'el-GR' },
  { name: 'Gujarati', code: 'gu-IN' },
  { name: 'Haitian Creole', code: 'ht' },
  { name: 'Hausa', code: 'ha-NG' },
  { name: 'Hawaiian', code: 'haw' },
  { name: 'Hebrew', code: 'he-IL' },
  { name: 'Hindi', code: 'hi-IN' },
  { name: 'Hmong', code: 'hmn' },
  { name: 'Hungarian', code: 'hu-HU' },
  { name: 'Icelandic', code: 'is-IS' },
  { name: 'Igbo', code: 'ig-NG' },
  { name: 'Indonesian', code: 'id-ID' },
  { name: 'Irish', code: 'ga-IE' },
  { name: 'Italian', code: 'it-IT' },
  { name: 'Japanese', code: 'ja-JP' },
  { name: 'Javanese', code: 'jv-ID' },
  { name: 'Kannada', code: 'kn-IN' },
  { name: 'Kazakh', code: 'kk-KZ' },
  { name: 'Khmer', code: 'km-KH' },
  { name: 'Kinyarwanda', code: 'rw-RW' },
  { name: 'Korean', code: 'ko-KR' },
  { name: 'Kurdish', code: 'ku' },
  { name: 'Kyrgyz', code: 'ky-KG' },
  { name: 'Lao', code: 'lo-LA' },
  { name: 'Latin', code: 'la' },
  { name: 'Latvian', code: 'lv-LV' },
  { name: 'Lithuanian', code: 'lt-LT' },
  { name: 'Macedonian', code: 'mk-MK' },
  { name: 'Malagasy', code: 'mg-MG' },
  { name: 'Malay', code: 'ms-MY' },
  { name: 'Malayalam', code: 'ml-IN' },
  { name: 'Maltese', code: 'mt-MT' },
  { name: 'Maori', code: 'mi-NZ' },
  { name: 'Marathi', code: 'mr-IN' },
  { name: 'Mongolian', code: 'mn-MN' },
  { name: 'Myanmar (Burmese)', code: 'my-MM' },
  { name: 'Nepali', code: 'ne-NP' },
  { name: 'Norwegian', code: 'no-NO' },
  { name: 'Nyanja (Chichewa)', code: 'ny' },
  { name: 'Odia (Oriya)', code: 'or-IN' },
  { name: 'Pashto', code: 'ps-AF' },
  { name: 'Persian', code: 'fa-IR' },
  { name: 'Polish', code: 'pl-PL' },
  { name: 'Portuguese', code: 'pt-PT' },
  { name: 'Punjabi', code: 'pa-IN' },
  { name: 'Romanian', code: 'ro-RO' },
  { name: 'Russian', code: 'ru-RU' },
  { name: 'Samoan', code: 'sm' },
  { name: 'Scots Gaelic', code: 'gd' },
  { name: 'Serbian', code: 'sr-RS' },
  { name: 'Sesotho', code: 'st' },
  { name: 'Shona', code: 'sn' },
  { name: 'Sindhi', code: 'sd' },
  { name: 'Sinhala (Sinhalese)', code: 'si-LK' },
  { name: 'Slovak', code: 'sk-SK' },
  { name: 'Slovenian', code: 'sl-SI' },
  { name: 'Somali', code: 'so-SO' },
  { name: 'Spanish', code: 'es-ES' },
  { name: 'Sundanese', code: 'su-ID' },
  { name: 'Swahili', code: 'sw-KE' },
  { name: 'Swedish', code: 'sv-SE' },
  { name: 'Tagalog (Filipino)', code: 'tl-PH' },
  { name: 'Tajik', code: 'tg-TJ' },
  { name: 'Tamil', code: 'ta-IN' },
  { name: 'Tatar', code: 'tt' },
  { name: 'Telugu', code: 'te-IN' },
  { name: 'Thai', code: 'th-TH' },
  { name: 'Turkish', code: 'tr-TR' },
  { name: 'Turkmen', code: 'tk' },
  { name: 'Ukrainian', code: 'uk-UA' },
  { name: 'Urdu', code: 'ur-PK' },
  { name: 'Uyghur', code: 'ug' },
  { name: 'Uzbek', code: 'uz-UZ' },
  { name: 'Vietnamese', code: 'vi-VN' },
  { name: 'Welsh', code: 'cy-GB' },
  { name: 'Xhosa', code: 'xh' },
  { name: 'Yiddish', code: 'yi' },
  { name: 'Yoruba', code: 'yo-NG' },
  { name: 'Zulu', code: 'zu-ZA' }
];

function getLanguageFlag(name: string): string {
  const flags: Record<string, string> = {
    'Auto-detect': '🔍',
    'Afrikaans': '🇿🇦',
    'Albanian': '🇦🇱',
    'Amharic': '🇪🇹',
    'Arabic': '🇸🇦',
    'Armenian': '🇦🇲',
    'Azerbaijani': '🇦🇿',
    'Basque': '🇪🇸',
    'Belarusian': '🇧🇾',
    'Bengali': '🇧🇩',
    'Bosnian': '🇧🇦',
    'Bulgarian': '🇧🇬',
    'Catalan': '🇪🇸',
    'Cebuano': '🇵🇭',
    'Chinese (Simplified)': '🇨🇳',
    'Chinese (Traditional)': '🇹🇼',
    'Croatian': '🇭🇷',
    'Czech': '🇨🇿',
    'Danish': '🇩🇰',
    'Dutch': '🇳🇱',
    'English': '🇺🇸',
    'Esperanto': '🌐',
    'Estonian': '🇪🇪',
    'Finnish': '🇫🇮',
    'French': '🇫🇷',
    'Galician': '🇪🇸',
    'Georgian': '🇬🇪',
    'German': '🇩🇪',
    'Greek': '🇬🇷',
    'Gujarati': '🇮🇳',
    'Haitian Creole': '🇭🇹',
    'Hausa': '🇳🇬',
    'Hawaiian': '🌺',
    'Hebrew': '🇮🇱',
    'Hindi': '🇮🇳',
    'Hmong': '🌐',
    'Hungarian': '🇭🇺',
    'Icelandic': '🇮🇸',
    'Igbo': '🇳🇬',
    'Indonesian': '🇮🇩',
    'Irish': '🇮🇪',
    'Italian': '🇮🇹',
    'Japanese': '🇯🇵',
    'Javanese': '🇮🇩',
    'Kannada': '🇮🇳',
    'Kazakh': '🇰🇿',
    'Khmer': '🇰🇭',
    'Kinyarwanda': '🇷🇼',
    'Korean': '🇰🇷',
    'Kurdish': '🌐',
    'Kyrgyz': '🇰🇬',
    'Lao': '🇱🇦',
    'Latin': '🇻🇦',
    'Latvian': '🇱🇻',
    'Lithuanian': '🇱🇹',
    'Macedonian': '🇲🇰',
    'Malagasy': '🇲🇬',
    'Malay': '🇲🇾',
    'Malayalam': '🇮🇳',
    'Maltese': '🇲🇹',
    'Maori': '🇳🇿',
    'Marathi': '🇮🇳',
    'Mongolian': '🇲🇳',
    'Myanmar (Burmese)': '🇲🇲',
    'Nepali': '🇳🇵',
    'Norwegian': '🇳🇴',
    'Nyanja (Chichewa)': '🇲🇼',
    'Odia (Oriya)': '🇮🇳',
    'Pashto': '🇦🇫',
    'Persian': '🇮🇷',
    'Polish': '🇵🇱',
    'Portuguese': '🇵🇹',
    'Punjabi': '🇮🇳',
    'Romanian': '🇷🇴',
    'Russian': '🇷🇺',
    'Samoan': '🇼🇸',
    'Scots Gaelic': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    'Serbian': '🇷🇸',
    'Sesotho': '🇱🇸',
    'Shona': '🇿🇼',
    'Sindhi': '🇵🇰',
    'Sinhala (Sinhalese)': '🇱🇰',
    'Slovak': '🇸🇰',
    'Slovenian': '🇸🇮',
    'Somali': '🇸🇴',
    'Spanish': '🇪🇸',
    'Sundanese': '🇮🇩',
    'Swahili': '🇰🇪',
    'Swedish': '🇸🇪',
    'Tagalog (Filipino)': '🇵🇭',
    'Tajik': '🇹🇯',
    'Tamil': '🇮🇳',
    'Tatar': '🇷🇺',
    'Telugu': '🇮🇳',
    'Thai': '🇹🇭',
    'Turkish': '🇹🇷',
    'Turkmen': '🇹🇲',
    'Ukrainian': '🇺🇦',
    'Urdu': '🇵🇰',
    'Uyghur': '🌐',
    'Uzbek': '🇺🇿',
    'Vietnamese': '🇻🇳',
    'Welsh': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
    'Xhosa': '🇿🇦',
    'Yiddish': '✡️',
    'Yoruba': '🇳🇬',
    'Zulu': '🇿🇦'
  };
  return flags[name] || '🌐';
}

function TranslateView() {
  const [inputText, setInputText] = useState('');
  const [translatedResult, setTranslatedResult] = useState<TranslationResult | null>(null);
  const [isFastLoading, setIsFastLoading] = useState(false);
  const [isDeepLoading, setIsDeepLoading] = useState(false);
  const [sourceLang, setSourceLang] = useState('Auto-detect');
  const [targetLang, setTargetLang] = useState('English');
  const [instantTranslate, setInstantTranslate] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<'source' | 'target' | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Unified responsive language modal selector states
  const [showLanguageModal, setShowLanguageModal] = useState<'source' | 'target' | null>(null);
  const [langSearch, setLangSearch] = useState('');

  const [lastAnalyzedText, setLastAnalyzedText] = useState('');
  const activeRequestRef = useRef<number>(0);

  // Translation history and full-screen states
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [history, setHistory] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('english_everywhere_translation_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('english_everywhere_translation_history', JSON.stringify(history));
  }, [history]);
  
  const [savedNotes, setSavedNotes] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('english_everywhere_saved_notes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('english_everywhere_saved_notes', JSON.stringify(savedNotes));
  }, [savedNotes]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Check if current active result is pinned in history
  const isActiveResultPinned = !!(translatedResult && history.some(
    item => item.inputText.trim().toLowerCase() === inputText.trim().toLowerCase() &&
    item.sourceLang === sourceLang &&
    item.targetLang === targetLang &&
    item.isPinned
  ));

  const handleTogglePinActiveResult = () => {
    if (!translatedResult) return;
    const text = inputText.trim();
    const trans = translatedResult.translatedText;
    const src = sourceLang;
    const tgt = targetLang;
    
    setHistory(prev => {
      const matchIdx = prev.findIndex(
        item => item.inputText.trim().toLowerCase() === text.toLowerCase() &&
        item.sourceLang === src &&
        item.targetLang === tgt
      );
      
      let updated = [...prev];
      if (matchIdx > -1) {
        updated[matchIdx] = {
          ...updated[matchIdx],
          isPinned: !updated[matchIdx].isPinned
        };
      } else {
        updated.unshift({
          id: `history_${Date.now()}`,
          inputText: text,
          translatedText: trans,
          sourceLang: src,
          targetLang: tgt,
          timestamp: Date.now(),
          isPinned: true
        });
      }
      return updated;
    });
  };

  const addOrUpdateHistory = (text: string, translated: string, src: string, tgt: string) => {
    if (!text.trim() || !translated.trim()) return;
    setHistory(prev => {
      const existingIdx = prev.findIndex(
        item => item.inputText.trim().toLowerCase() === text.trim().toLowerCase() && 
        item.sourceLang === src && 
        item.targetLang === tgt
      );
      
      let updated = [...prev];
      if (existingIdx > -1) {
        // Keep existing item, move to top of history, and preserve pin
        const existingItem = updated[existingIdx];
        updated.splice(existingIdx, 1);
        updated.unshift({
          ...existingItem,
          timestamp: Date.now()
        });
      } else {
        // If typing, merge consecutive updates to the latest unpinned item
        const latest = prev.find(item => !item.isPinned);
        if (latest && text.trim().toLowerCase().startsWith(latest.inputText.trim().toLowerCase()) && (Date.now() - latest.timestamp < 15000)) {
          const latestIdx = updated.findIndex(item => item.id === latest.id);
          if (latestIdx > -1) {
            updated[latestIdx] = {
              ...latest,
              inputText: text,
              translatedText: translated,
              sourceLang: src,
              targetLang: tgt,
              timestamp: Date.now()
            };
          }
        } else {
          updated.unshift({
            id: `history_${Date.now()}`,
            inputText: text,
            translatedText: translated,
            sourceLang: src,
            targetLang: tgt,
            timestamp: Date.now(),
            isPinned: false
          });
        }
      }
      return updated;
    });
  };

  const triggerFastTranslate = async (textToTranslate: string, src: string, tgt: string) => {
    if (!textToTranslate.trim()) {
      setTranslatedResult(null);
      setIsFastLoading(false);
      return;
    }

    const requestId = ++activeRequestRef.current;
    setIsFastLoading(true);
    setErrorMsg(null);

    try {
      const result = await translateTextFast(textToTranslate, src, tgt);
      if (requestId !== activeRequestRef.current) return; // Stale request

      setTranslatedResult(prev => {
        const isSameText = textToTranslate === lastAnalyzedText;
        return {
          translatedText: result.translatedText,
          detectedSourceLanguage: result.detectedSourceLanguage,
          pronunciationGuide: result.pronunciationGuide,
          breakdown: isSameText ? prev?.breakdown : undefined,
          examples: isSameText ? prev?.examples : undefined,
          alternatives: isSameText ? prev?.alternatives : undefined,
        };
      });

      // Add to translation history
      addOrUpdateHistory(textToTranslate, result.translatedText, src, tgt);
    } catch (err) {
      if (requestId !== activeRequestRef.current) return;
      console.error(err);
      setErrorMsg("Failed to translate. Click 'Translate' button to try again.");
    } finally {
      if (requestId === activeRequestRef.current) {
        setIsFastLoading(false);
      }
    }
  };

  // Debounced typing auto-translation
  useEffect(() => {
    if (!instantTranslate) return;
    const trimmed = inputText.trim();
    if (!trimmed) {
      setTranslatedResult(null);
      setIsFastLoading(false);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      triggerFastTranslate(trimmed, sourceLang, targetLang);
    }, 600); // 600ms is standard Google Translate-style debounce

    return () => clearTimeout(delayDebounceFn);
  }, [inputText, sourceLang, targetLang, instantTranslate]);

  const handleTranslateClick = () => {
    const trimmed = inputText.trim();
    if (trimmed) {
      triggerFastTranslate(trimmed, sourceLang, targetLang);
    }
  };

  const handleDeepAnalysis = async () => {
    const trimmed = inputText.trim();
    if (!trimmed || !translatedResult?.translatedText) return;
    setIsDeepLoading(true);
    setErrorMsg(null);
    try {
      const result = await translateTextDeep(trimmed, sourceLang, targetLang, translatedResult.translatedText);
      setTranslatedResult(prev => {
        if (!prev) return null;
        return {
          ...prev,
          breakdown: result.breakdown,
          examples: result.examples,
          alternatives: result.alternatives,
        };
      });
      setLastAnalyzedText(trimmed);
    } catch (err) {
      console.error(err);
      setErrorMsg("Could not load deep analysis. Please try again.");
    } finally {
      setIsDeepLoading(false);
    }
  };

  const handleSourceLangChange = (lang: string) => {
    setSourceLang(lang);
    const trimmed = inputText.trim();
    if (trimmed) {
      triggerFastTranslate(trimmed, lang, targetLang);
    }
  };

  const handleTargetLangChange = (lang: string) => {
    setTargetLang(lang);
    const trimmed = inputText.trim();
    if (trimmed) {
      triggerFastTranslate(trimmed, sourceLang, lang);
    }
  };

  const handleSwap = () => {
    if (sourceLang === 'Auto-detect') return;
    const tempSrc = sourceLang;
    const tempTgt = targetLang;
    setSourceLang(tempTgt);
    setTargetLang(tempSrc);
    if (translatedResult?.translatedText) {
      const prevTransText = translatedResult.translatedText;
      setInputText(prevTransText);
      triggerFastTranslate(prevTransText, tempTgt, tempSrc);
    }
  };

  const handleSpeak = (text: string, type: 'source' | 'target') => {
    if (speakingId === type) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/\*\*/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    if (type === 'target') {
      utterance.lang = getLangTag(targetLang);
    } else {
      utterance.lang = sourceLang === 'Auto-detect' && translatedResult?.detectedSourceLanguage 
        ? getLangTag(translatedResult.detectedSourceLanguage)
        : getLangTag(sourceLang);
    }

    utterance.onend = () => {
      setSpeakingId(null);
    };
    utterance.onerror = () => {
      setSpeakingId(null);
    };

    setSpeakingId(type);
    window.speechSynthesis.speak(utterance);
  };

  const getLangTag = (langName: string): string => {
    const match = GOOGLE_LANGUAGES.find(l => l.name === langName);
    return match?.code || 'en-US';
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setErrorMsg("Voice input is not supported in this browser. Please try Google Chrome.");
      setTimeout(() => setErrorMsg(null), 5000);
      return;
    }

    try {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = sourceLang === 'Auto-detect' ? 'en-US' : getLangTag(sourceLang);

      rec.onstart = () => {
        setIsListening(true);
        window.speechSynthesis.cancel();
        setSpeakingId(null);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(prev => prev ? prev + ' ' + transcript : transcript);
      };

      rec.onerror = (e: any) => {
        console.error("Speech Recognition Error:", e);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const handleSaveToNotebook = () => {
    if (!translatedResult) return;
    const title = `Translation: ${inputText.slice(0, 30)}${inputText.length > 30 ? '...' : ''}`;
    const detectedSource = sourceLang === 'Auto-detect' && translatedResult.detectedSourceLanguage 
      ? translatedResult.detectedSourceLanguage 
      : sourceLang;
      
    const content = `### Translation Study Card
**Original Text (${detectedSource}):** 
${inputText}

**Translated Text (${targetLang}):** 
${translatedResult.translatedText}

${translatedResult.pronunciationGuide ? `**Pronunciation Guide:** *${translatedResult.pronunciationGuide}*` : ''}

${translatedResult.breakdown && translatedResult.breakdown.length > 0 ? `
### Vocabulary Breakdown
${translatedResult.breakdown.map(item => `*   **${item.word}** *(${item.pos})* — ${item.definition} (*Translation: ${item.translation}*)`).join('\n')}
` : ''}

${translatedResult.examples && translatedResult.examples.length > 0 ? `
### Context Examples
${translatedResult.examples.map(ex => `*   **Context:** ${ex.original}\n    **Translation:** ${ex.translation}`).join('\n')}
` : ''}

${translatedResult.alternatives && translatedResult.alternatives.length > 0 ? `
### Alternative Expressions
${translatedResult.alternatives.map(alt => `*   ${alt}`).join('\n')}
` : ''}
`;

    if (savedNotes.some(note => note.content === content)) {
      setErrorMsg("This translation is already saved in your Study Notebook!");
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }

    const newNote = {
      id: `note_translate_${Date.now()}`,
      title,
      content,
      savedAt: Date.now()
    };

    setSavedNotes(prev => [newNote, ...prev]);
    setErrorMsg("Saved perfectly to Notebook! 🔖");
    setTimeout(() => setErrorMsg(null), 3000);
  };

  // Google-Translate-style quick language tabs
  const quickSourceLangs = ['Auto-detect', 'English', 'Spanish', 'French', 'German'];
  const quickTargetLangs = ['English', 'Spanish', 'French', 'Japanese', 'German'];

  const sourceTabs = [...quickSourceLangs];
  if (sourceLang && !sourceTabs.includes(sourceLang)) {
    sourceTabs.push(sourceLang);
  }

  const targetTabs = [...quickTargetLangs];
  if (targetLang && !targetTabs.includes(targetLang) && targetLang !== 'Auto-detect') {
    targetTabs.push(targetLang);
  }

  // Scroll lock effect for Full Screen Mode
  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullScreen]);

  // Full Screen dynamic layout configuration
  const boardClasses = isFullScreen
    ? "fixed inset-0 z-50 bg-white flex flex-col h-screen w-screen overflow-hidden animate-fade-in"
    : "bg-white border border-gray-200 rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative";

  const gridClasses = isFullScreen
    ? "grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 items-stretch flex-1 min-h-0 overflow-hidden"
    : "grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 items-stretch min-h-[350px]";

  const colClasses = isFullScreen
    ? "p-4 md:p-8 flex flex-col justify-between overflow-hidden min-h-0 flex-1"
    : "p-4 md:p-8 flex flex-col justify-between";

  const textareaClasses = isFullScreen
    ? "w-full flex-1 bg-transparent border-0 outline-none resize-none text-xl md:text-2xl font-bold text-indigo-950 placeholder-gray-300 min-h-0 overflow-y-auto"
    : "w-full flex-1 min-h-[160px] bg-transparent border-0 outline-none resize-none text-xl md:text-2xl font-bold text-indigo-950 placeholder-gray-300";

  const outputContainerClasses = isFullScreen
    ? "flex-1 overflow-y-auto min-h-0 pr-2"
    : "space-y-4 flex-1 flex flex-col";

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-8 px-4">
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-block p-4 bg-indigo-50 rounded-3xl text-indigo-600 mb-1 shadow-sm">
          <Languages size={40} className="animate-pulse text-[#4F46E5]" />
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900">Google Translate Pro</h2>
        <p className="text-gray-500 max-w-xl mx-auto text-xs md:text-sm font-medium">
          Instant translation as you type. Choose from over 100 global languages and instantly build flashcards, vocabulary lists, and practice tools.
        </p>
      </div>

      {/* Main Container */}
      <div className="space-y-4">
        {/* Real-time Toggle & Full-Screen controls bar */}
        <div className="flex items-center justify-between gap-4 px-6 py-3 bg-white border border-gray-100 rounded-3xl shadow-sm max-w-md mx-auto">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-gray-500">Auto-translate</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={instantTranslate}
                onChange={(e) => setInstantTranslate(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="h-4 w-px bg-gray-200" />

          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="flex items-center gap-1.5 text-xs font-black uppercase text-indigo-600 hover:text-indigo-800 transition-colors"
            title="Toggle full screen mode"
          >
            {isFullScreen ? (
              <>
                <Minimize2 size={15} />
                <span>Exit Full</span>
              </>
            ) : (
              <>
                <Maximize2 size={15} />
                <span>Full Screen</span>
              </>
            )}
          </button>
        </div>

        {/* Translation Board */}
        <div className={boardClasses}>
          {isFullScreen && (
            <div className="flex items-center justify-between p-4 md:px-8 md:py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-2">
                <Languages size={22} className="text-indigo-600 animate-pulse" />
                <span className="font-black text-indigo-950 text-sm md:text-base">Google Translate Pro — Long-form Mode</span>
              </div>
              <button
                onClick={() => setIsFullScreen(false)}
                className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl text-xs font-black uppercase flex items-center gap-1.5 transition-all shadow-sm"
                title="Exit Full Screen"
              >
                <Minimize2 size={14} /> Exit Full Screen
              </button>
            </div>
          )}
          
          {/* Header selectors row */}
          {/* Mobile view: Simple side-by-side selectors with swap button in the center */}
          <div className="block md:hidden border-b border-gray-100 p-3 bg-gray-50/20">
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => setShowLanguageModal('source')}
                className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-black text-indigo-950 flex items-center justify-center gap-1.5 shadow-sm active:bg-gray-50 transition-all text-ellipsis overflow-hidden whitespace-nowrap"
              >
                <span className="truncate flex items-center gap-1.5">
                  <span className="text-base select-none">{getLanguageFlag(sourceLang)}</span>
                  <span>{sourceLang}</span>
                </span>
                <span className="text-gray-400 text-xs">▼</span>
              </button>

              <button
                onClick={handleSwap}
                disabled={sourceLang === 'Auto-detect'}
                className={`p-3 rounded-full border transition-all shrink-0 ${sourceLang === 'Auto-detect' ? 'text-gray-300 border-gray-100 cursor-not-allowed bg-gray-50/50' : 'text-gray-500 bg-white border-gray-200 hover:border-indigo-600 hover:text-indigo-600 active:scale-90 shadow-sm'}`}
                title="Swap Languages"
              >
                <Shuffle size={16} />
              </button>

              <button
                onClick={() => setShowLanguageModal('target')}
                className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-black text-indigo-950 flex items-center justify-center gap-1.5 shadow-sm active:bg-gray-50 transition-all text-ellipsis overflow-hidden whitespace-nowrap"
              >
                <span className="truncate flex items-center gap-1.5">
                  <span className="text-base select-none">{getLanguageFlag(targetLang)}</span>
                  <span>{targetLang}</span>
                </span>
                <span className="text-gray-400 text-xs">▼</span>
              </button>
            </div>
          </div>

          {/* Desktop view: Standard side-by-side tabs layout */}
          <div className="hidden md:grid grid-cols-2 divide-x divide-gray-100 border-b border-gray-100 bg-white rounded-t-3xl md:rounded-t-[2.5rem]">
            {/* SOURCE LANGS TAB (DESKTOP) */}
            <div className="p-3.5 flex items-center justify-between gap-1.5 relative">
              <div className="flex flex-wrap items-center gap-1">
                {sourceTabs.map(lang => (
                  <button
                    key={lang}
                    onClick={() => handleSourceLangChange(lang)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${sourceLang === lang ? 'bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100' : 'text-gray-500 hover:text-indigo-950 hover:bg-gray-50'}`}
                  >
                    <span className="text-base select-none">{getLanguageFlag(lang)}</span>
                    <span>{lang}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowLanguageModal('source')}
                className="px-3 py-1.5 border border-gray-200 text-xs font-bold text-gray-600 rounded-xl hover:bg-gray-50 flex items-center gap-1"
              >
                More ▾
              </button>
            </div>

            {/* TARGET LANGS TAB (DESKTOP) */}
            <div className="p-3.5 flex items-center justify-between gap-1.5 relative bg-gray-50/30 rounded-tr-[2.5rem]">
              <div className="flex flex-wrap items-center gap-1">
                {targetTabs.map(lang => (
                  <button
                    key={lang}
                    onClick={() => handleTargetLangChange(lang)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${targetLang === lang ? 'bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100' : 'text-gray-500 hover:text-indigo-950 hover:bg-gray-50'}`}
                  >
                    <span className="text-base select-none">{getLanguageFlag(lang)}</span>
                    <span>{lang}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowLanguageModal('target')}
                className="px-3 py-1.5 border border-gray-200 text-xs font-bold text-gray-600 rounded-xl hover:bg-gray-50 flex items-center gap-1"
              >
                More ▾
              </button>
            </div>
          </div>

          {/* Dual text area columns */}
          <div className={gridClasses}>
            
            {/* SOURCE TEXT INPUT */}
            <div className={colClasses}>
              <div className="space-y-4 flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1">
                    <span>Translate from</span>
                    <span className="text-gray-500 flex items-center gap-1 font-bold">
                      <span>{getLanguageFlag(sourceLang)}</span>
                      <span>{sourceLang}</span>
                    </span>
                  </span>
                  {inputText.length > 0 && (
                    <button 
                      onClick={() => { setInputText(''); setTranslatedResult(null); }} 
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value.slice(0, 5000))}
                  placeholder="Type or paste text to translate instantly..."
                  className={textareaClasses}
                />
              </div>

              {/* Input utilities */}
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 pt-4 md:pt-6 border-t border-gray-100 mt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`p-3 rounded-2xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'}`}
                    title={isListening ? "Listening... click to stop" : "Voice Input"}
                  >
                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                  {inputText.length > 0 && (
                    <button
                      type="button"
                      onClick={() => handleSpeak(inputText, 'source')}
                      className={`p-3 rounded-2xl transition-all ${speakingId === 'source' ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'}`}
                      title="Speak Source"
                    >
                      <Volume2 size={18} />
                    </button>
                  )}
                  {/* Keep Swap button on desktop only inside input utils since it is already at the top on mobile */}
                  {sourceLang !== 'Auto-detect' && (
                    <button
                      onClick={handleSwap}
                      className="hidden md:flex p-3 bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all"
                      title="Swap Languages"
                    >
                      <Shuffle size={18} />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono font-bold text-gray-400">{inputText.length}/5000</span>
                  {!instantTranslate && (
                    <button
                      onClick={handleTranslateClick}
                      disabled={isFastLoading || !inputText.trim()}
                      className="px-6 py-3 bg-[#1A1A1A] hover:bg-black disabled:opacity-30 text-white font-black rounded-2xl text-sm transition-all shadow-md active:scale-95 animate-fade-in"
                    >
                      Translate
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* TARGET TEXT OUTPUT */}
            <div className={isFullScreen ? "p-4 md:p-8 flex flex-col justify-between bg-gray-50/40 relative min-h-0 flex-1 overflow-hidden" : "p-4 md:p-8 flex flex-col justify-between bg-gray-50/40 relative"}>
              
              {isFastLoading && (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white border border-gray-100 shadow-sm rounded-full px-3 py-1 text-indigo-600 font-bold text-[10px] animate-pulse">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-ping"></span>
                  translating...
                </div>
              )}

              <div className="space-y-4 flex-1 flex flex-col min-h-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 flex items-center flex-wrap gap-1">
                  <span className="flex items-center gap-1">
                    <span>{getLanguageFlag(targetLang)}</span>
                    <span>{targetLang} Translation</span>
                  </span>
                  {sourceLang === 'Auto-detect' && translatedResult?.detectedSourceLanguage && (
                    <span className="text-gray-400 font-bold lowercase normal-case tracking-normal ml-2 flex items-center gap-1">
                      <span>(detected:</span>
                      <span>{getLanguageFlag(translatedResult.detectedSourceLanguage)}</span>
                      <span>{translatedResult.detectedSourceLanguage})</span>
                    </span>
                  )}
                </span>

                {!translatedResult && !isFastLoading ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-8 text-center text-gray-300">
                    <p className="font-semibold text-xs md:text-sm">Translation will appear here instantly as you type.</p>
                  </div>
                ) : (
                  translatedResult && (
                    <div className={outputContainerClasses}>
                      <div className="space-y-3">
                        <p className="text-xl md:text-2xl font-bold text-indigo-950 leading-relaxed whitespace-pre-line">
                          {translatedResult.translatedText}
                        </p>
                        {translatedResult.pronunciationGuide && (
                          <p className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl inline-block border border-emerald-100/50">
                            🗣️ {translatedResult.pronunciationGuide}
                          </p>
                        )}
                      </div>

                      {/* Render Breakdown INSIDE the output column if already analyzed */}
                      {translatedResult.breakdown && inputText.trim() === lastAnalyzedText && (
                        <div className="mt-6 pt-6 border-t border-gray-150 space-y-6 text-left animate-fade-in">
                          <div className="flex items-center gap-2">
                            <Sparkles size={18} className="text-indigo-600 animate-pulse" />
                            <h4 className="font-black text-sm text-indigo-950 uppercase tracking-wider">Advanced Educational Breakdown</h4>
                          </div>

                          {/* Vocabulary breakdown inside */}
                          {translatedResult.breakdown.length > 0 && (
                            <div className="space-y-3">
                              <h5 className="text-[10px] font-black text-indigo-500 uppercase tracking-wider">Vocabulary Breakdown</h5>
                              <div className="grid grid-cols-1 gap-2.5">
                                {translatedResult.breakdown.map((item, idx) => (
                                  <div key={idx} className="p-3.5 bg-white border border-gray-100 rounded-xl hover:border-indigo-100 transition-colors">
                                    <div className="flex items-baseline justify-between gap-2">
                                      <span className="font-bold text-indigo-950 text-sm">{item.word}</span>
                                      <span className="text-[9px] font-black uppercase bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded">
                                        {item.pos}
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">{item.definition}</p>
                                    <div className="pt-2 border-t border-gray-50 mt-2 flex justify-between items-center text-xs">
                                      <span className="text-gray-400 font-medium">Translation:</span>
                                      <span className="font-black text-indigo-600">{item.translation}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Context Examples inside */}
                          {translatedResult.examples && translatedResult.examples.length > 0 && (
                            <div className="space-y-3">
                              <h5 className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">Contextual Examples</h5>
                              <div className="space-y-2">
                                {translatedResult.examples.map((ex, idx) => (
                                  <div key={idx} className="p-3.5 bg-emerald-50/20 border border-emerald-100 rounded-xl space-y-1">
                                    <p className="font-bold text-xs text-emerald-950">{ex.original}</p>
                                    <p className="text-[11px] text-emerald-800/75">{ex.translation}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Alternative Expressions inside */}
                          {translatedResult.alternatives && translatedResult.alternatives.length > 0 && (
                            <div className="space-y-3">
                              <h5 className="text-[10px] font-black text-indigo-500 uppercase tracking-wider">Alternative Formulations</h5>
                              <div className="flex flex-wrap gap-1.5">
                                {translatedResult.alternatives.map((alt, idx) => (
                                  <span key={idx} className="bg-white border border-gray-100 px-2.5 py-1 rounded-lg text-xs font-semibold text-gray-700 shadow-sm">
                                    {alt}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>

              {/* Output utilities */}
              {translatedResult && (
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 pt-4 md:pt-6 border-t border-gray-100 mt-6">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSpeak(translatedResult.translatedText, 'target')}
                      className={`p-3 rounded-2xl transition-all ${speakingId === 'target' ? 'bg-indigo-600 text-white animate-bounce' : 'bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'}`}
                      title="Listen"
                    >
                      <Volume2 size={18} />
                    </button>
                    <button
                      onClick={() => handleCopy(translatedResult.translatedText)}
                      className="p-3 bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all flex items-center justify-center gap-1.5 relative"
                      title="Copy"
                    >
                      {isCopied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                      {isCopied && <span className="text-[10px] font-bold text-emerald-600">Copied</span>}
                    </button>
                    <button
                      onClick={handleTogglePinActiveResult}
                      className={`p-3 rounded-2xl transition-all flex items-center justify-center gap-1.5 ${isActiveResultPinned ? 'bg-amber-100 text-amber-600 border border-amber-200 shadow-sm' : 'bg-gray-50 text-gray-400 hover:text-amber-600 hover:bg-amber-50'}`}
                      title={isActiveResultPinned ? "Unpin Translation" : "Pin Translation"}
                    >
                      <Pin size={18} className={isActiveResultPinned ? 'fill-amber-500 text-amber-500' : ''} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDeepAnalysis}
                      disabled={isDeepLoading}
                      className={`flex items-center gap-1.5 px-3 py-2 border rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all shadow-sm ${
                        translatedResult.breakdown && inputText.trim() === lastAnalyzedText
                          ? 'border-indigo-200 bg-indigo-50 text-indigo-600'
                          : 'border-transparent bg-indigo-650 hover:bg-indigo-700 text-white bg-indigo-600'
                      }`}
                      title="Generate Grammar & Vocab Breakdown"
                    >
                      {isDeepLoading ? (
                        <>
                          <BrainCircuit size={12} className="animate-spin" />
                          <span>Analyzing...</span>
                        </>
                      ) : translatedResult.breakdown && inputText.trim() === lastAnalyzedText ? (
                        <>
                          <Sparkles size={12} className="fill-indigo-100" />
                          <span>Analyzed</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={12} />
                          <span>Educational Breakdown</span>
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={handleSaveToNotebook}
                      className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all"
                    >
                      <Bookmark size={12} /> Bookmark Card
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </div>

      {/* Translation History & Notebook Cards section */}
      {history.length > 0 && (
        <div className="max-w-5xl mx-auto space-y-6 pt-4 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-150 pb-3">
            <div className="space-y-1 text-left">
              <h3 className="text-xl font-black text-indigo-950 flex items-center gap-2">
                <Clock size={20} className="text-indigo-600" /> Translation History
              </h3>
              <p className="text-xs text-gray-500 font-medium">Your recent translations. Pin important translations to keep them at the top.</p>
            </div>
            
            <button
              onClick={() => {
                if (window.confirm("Clear all unpinned translation history?")) {
                  setHistory(prev => prev.filter(item => item.isPinned));
                }
              }}
              className="px-3 py-1.5 border border-red-105 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-1.5"
            >
              <Trash2 size={13} /> Clear History
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(() => {
              const sortedHistory = [...history].sort((a, b) => {
                if (a.isPinned && !b.isPinned) return -1;
                if (!a.isPinned && b.isPinned) return 1;
                return b.timestamp - a.timestamp;
              });

              return sortedHistory.map((item) => (
                <div 
                  key={item.id}
                  className={`p-5 bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden ${item.isPinned ? 'border-amber-200 bg-amber-50/10' : 'border-gray-200'}`}
                >
                  {/* Pinned label badge */}
                  {item.isPinned && (
                    <div className="absolute top-0 right-0 bg-amber-500 text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-bl-xl flex items-center gap-0.5 shadow-sm">
                      <Pin size={8} className="fill-white" /> Pinned
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-gray-400">
                        <span className="flex items-center gap-1">
                          <span>{getLanguageFlag(item.sourceLang)}</span>
                          <span>{item.sourceLang}</span>
                        </span>
                        <span>➔</span>
                        <span className="text-indigo-600 flex items-center gap-1">
                          <span>{getLanguageFlag(item.targetLang)}</span>
                          <span>{item.targetLang}</span>
                        </span>
                      </div>
                      
                      {/* Action buttons on card */}
                      <div className="flex items-center gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            setHistory(prev => prev.map(h => h.id === item.id ? { ...h, isPinned: !h.isPinned } : h));
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${item.isPinned ? 'text-amber-600 hover:bg-amber-100/50' : 'text-gray-400 hover:text-amber-600 hover:bg-amber-50'}`}
                          title={item.isPinned ? "Unpin translation" : "Pin translation"}
                        >
                          <Pin size={13} className={item.isPinned ? "fill-amber-500 text-amber-500" : ""} />
                        </button>
                        <button
                          onClick={() => {
                            setHistory(prev => prev.filter(h => h.id !== item.id));
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete card"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Card Content - Load back to translator on click */}
                    <div 
                      onClick={() => {
                        setInputText(item.inputText);
                        setSourceLang(item.sourceLang);
                        setTargetLang(item.targetLang);
                        setTranslatedResult({
                          translatedText: item.translatedText,
                          detectedSourceLanguage: item.sourceLang === 'Auto-detect' ? item.sourceLang : undefined
                        });
                        // Smoothly scroll to translator board if on mobile/scroll position
                        window.scrollTo({ top: 150, behavior: 'smooth' });
                      }}
                      className="space-y-2 cursor-pointer text-left"
                    >
                      <p className="font-bold text-gray-800 line-clamp-2 text-sm leading-snug">
                        {item.inputText}
                      </p>
                      <p className="text-xs text-indigo-950 font-semibold line-clamp-3 leading-relaxed border-l-2 border-indigo-100 pl-2">
                        {item.translatedText}
                      </p>
                    </div>
                  </div>

                  {/* Footer of card */}
                  <div className="pt-3 border-t border-gray-100 mt-3 flex justify-between items-center text-[10px] text-gray-400 font-medium">
                    <span>{new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <button
                      onClick={() => {
                        setInputText(item.inputText);
                        setSourceLang(item.sourceLang);
                        setTargetLang(item.targetLang);
                        setTranslatedResult({
                          translatedText: item.translatedText,
                          detectedSourceLanguage: item.sourceLang === 'Auto-detect' ? item.sourceLang : undefined
                        });
                        window.scrollTo({ top: 150, behavior: 'smooth' });
                      }}
                      className="text-xs font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5"
                    >
                      Re-use ➔
                    </button>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      )}

      {/* ERROR MESSAGE PANEL */}
      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-3xl text-xs md:text-sm font-bold text-red-600 max-w-xl mx-auto flex items-center gap-3">
          <AlertCircle size={20} className="shrink-0 text-red-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* EDUCATIONAL STUDY ASSISTANT EXPANSION PANEL */}
      <AnimatePresence>
        {translatedResult && !isFastLoading && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="space-y-6 max-w-4xl mx-auto animate-fade-in"
          >
            {/* Deep Analysis trigger card */}
            {(!translatedResult.breakdown || inputText.trim() !== lastAnalyzedText) && (
              <div className="bg-indigo-50/50 border border-indigo-100/60 rounded-3xl md:rounded-[2rem] p-4 md:p-6 text-center space-y-4">
                <div className="space-y-2">
                  <p className="font-bold text-indigo-950 text-base flex items-center justify-center gap-2">
                    <Sparkles size={18} className="text-indigo-600 animate-spin-slow" /> Deep Grammar & Vocabulary Analysis
                  </p>
                  <p className="text-xs text-gray-500 max-w-md mx-auto">
                    Turn this translation into a customized learning experience! Instantly extract dictionary breakdowns of key words, contextual practice examples, and alternative idioms.
                  </p>
                </div>

                <button
                  onClick={handleDeepAnalysis}
                  disabled={isDeepLoading}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-indigo-600/15 active:scale-95 transition-all"
                >
                  {isDeepLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <BrainCircuit size={16} className="animate-spin" /> Analyzing Phrase...
                    </span>
                  ) : "✨ Analyze & Create Study Guide"}
                </button>
              </div>
            )}

            {/* Deep Loading state */}
            {isDeepLoading && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                <BrainCircuit className="w-10 h-10 text-indigo-600 animate-spin" />
                <p className="font-black text-indigo-950 text-sm">Translating grammar patterns and compiling study dictionary...</p>
              </div>
            )}

            {/* Deep Analysis Results (Vocabulary, Examples, Alternatives) */}
            {translatedResult.breakdown && inputText.trim() === lastAnalyzedText && !isDeepLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* Vocabulary Breakdown */}
                {translatedResult.breakdown.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-[2.5rem] p-6 md:p-8 shadow-xl space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-lg md:text-xl font-black text-indigo-950 flex items-center gap-2">
                        <Book size={20} className="text-indigo-500" /> Dictionary Word Breakdown
                      </h3>
                      <p className="text-xs text-gray-400">Master the exact definition, grammar classifications, and translations of each term.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {translatedResult.breakdown.map((item, idx) => (
                        <div key={idx} className="p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:border-indigo-200 hover:bg-indigo-50/10 transition-colors flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex items-baseline justify-between gap-2">
                              <p className="font-bold text-indigo-950 text-base">{item.word}</p>
                              <span className="text-[10px] font-black uppercase bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-lg">
                                {item.pos}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">
                              {item.definition}
                            </p>
                          </div>
                          <div className="pt-3 border-t border-gray-200/50 mt-3 flex justify-between items-center">
                            <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Translation:</span>
                            <span className="text-xs font-black text-indigo-600">{item.translation}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Context Examples */}
                {translatedResult.examples && translatedResult.examples.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-[2.5rem] p-6 md:p-8 shadow-xl space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-lg md:text-xl font-black text-indigo-950 flex items-center gap-2">
                        <Compass size={20} className="text-emerald-500" /> Contextual Usage Sentences
                      </h3>
                      <p className="text-xs text-gray-400">See how this key linguistic concept is applied naturally in daily conversational sentences.</p>
                    </div>

                    <div className="space-y-3">
                      {translatedResult.examples.map((ex, idx) => (
                        <div key={idx} className="p-5 bg-emerald-50/30 border border-emerald-100 rounded-2xl space-y-2">
                          <div className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">•</span>
                            <div className="space-y-1">
                              <p className="font-bold text-sm text-emerald-950">{ex.original}</p>
                              <p className="text-xs text-emerald-800/70">{ex.translation}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Alternatives */}
                {translatedResult.alternatives && translatedResult.alternatives.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-[2.5rem] p-6 md:p-8 shadow-xl space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-lg md:text-xl font-black text-indigo-950 flex items-center gap-2">
                        <Sparkles size={18} className="text-indigo-500 fill-indigo-100" /> Alternative Formulations
                      </h3>
                      <p className="text-xs text-gray-400">Practice formal vs informal variants and other natural phrasing choices.</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {translatedResult.alternatives.map((alt, idx) => (
                        <div 
                          key={idx}
                          className="bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100 hover:border-indigo-200 hover:text-indigo-600 transition-all cursor-default"
                        >
                          {alt}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      {/* NEW PREMIUM RESPONSIVE LANGUAGE PICKER MODAL */}
      <AnimatePresence>
        {showLanguageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with elegant blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setShowLanguageModal(null); setLangSearch(''); }}
              className="absolute inset-0 bg-indigo-950/40 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              {/* Header */}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="space-y-1 text-left">
                  <h3 className="text-lg font-black text-indigo-950">
                    Select {showLanguageModal === 'source' ? 'Source' : 'Target'} Language
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Choose from over 100 supported global languages
                  </p>
                </div>
                <button
                  onClick={() => { setShowLanguageModal(null); setLangSearch(''); }}
                  className="p-2 hover:bg-gray-200/60 text-gray-400 hover:text-gray-700 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search input with search icon */}
              <div className="p-4 border-b border-gray-100 bg-white">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search size={18} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search languages..."
                    value={langSearch}
                    onChange={(e) => setLangSearch(e.target.value)}
                    className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-indigo-950 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    autoFocus
                  />
                  {langSearch && (
                    <button
                      onClick={() => setLangSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-gray-200/50 hover:bg-gray-200 text-gray-500 hover:text-gray-800 rounded-full transition-colors text-xs"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* Scrollable list of languages */}
              <div className="overflow-y-auto p-3 flex-1 divide-y divide-gray-50">
                {showLanguageModal === 'source' && !langSearch && (
                  <button
                    onClick={() => {
                      handleSourceLangChange('Auto-detect');
                      setShowLanguageModal(null);
                      setLangSearch('');
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3.5 text-sm font-bold rounded-xl transition-all ${sourceLang === 'Auto-detect' ? 'text-indigo-600 bg-indigo-50/70 shadow-sm' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base select-none">{getLanguageFlag('Auto-detect')}</span>
                      <span>Auto-detect Language</span>
                    </div>
                    {sourceLang === 'Auto-detect' && <Check size={16} className="text-[#4F46E5]" />}
                  </button>
                )}

                {/* Filter and list languages */}
                {GOOGLE_LANGUAGES.filter(lang => 
                  lang.name.toLowerCase().includes(langSearch.toLowerCase()) &&
                  (showLanguageModal === 'source' || lang.name !== 'Auto-detect')
                ).map(lang => {
                  const isSelected = showLanguageModal === 'source' 
                    ? sourceLang === lang.name 
                    : targetLang === lang.name;

                  return (
                    <button
                      key={lang.name}
                      onClick={() => {
                        if (showLanguageModal === 'source') {
                          handleSourceLangChange(lang.name);
                        } else {
                          handleTargetLangChange(lang.name);
                        }
                        setShowLanguageModal(null);
                        setLangSearch('');
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3.5 text-sm font-bold rounded-xl transition-all ${isSelected ? 'text-indigo-600 bg-indigo-50/70 shadow-sm' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base select-none">{getLanguageFlag(lang.name)}</span>
                        <span>{lang.name}</span>
                      </div>
                      {isSelected && <Check size={16} className="text-[#4F46E5]" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

function LearningPathsView({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="space-y-12 pb-24">
      <div className="space-y-2">
        <h2 className="text-xl md:text-3xl font-black tracking-tight">Personalized Goals</h2>
        <p className="text-xs md:text-sm text-gray-500">Pick a path that aligns with your specific language needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {LEARNING_PATHS.map(path => (
          <motion.div 
            key={path.id}
            whileHover={{ scale: 1.02 }}
            className="group relative bg-white border border-gray-200 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-sm hover:border-[#1A1A1A] hover:shadow-xl transition-all cursor-pointer flex flex-col h-full"
            onClick={() => onSelect(path.id)}
          >
            <div className="mb-4 md:mb-6 text-4xl md:text-5xl">{path.icon}</div>
            <div className="space-y-2 md:space-y-3 flex-1 mb-4 md:mb-6">
              <h3 className="text-xl md:text-2xl font-black">{path.title}</h3>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{path.description}</p>
            </div>
            <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{path.topics.length} Lessons</span>
              <div className="p-2 group-hover:bg-[#1A1A1A] group-hover:text-white rounded-xl transition-all">
                <ChevronRight size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 p-4 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-sm flex flex-col md:flex-row items-center gap-6 md:gap-12">
        <div className="flex-1 space-y-3 md:space-y-4">
          <h3 className="text-xl md:text-3xl font-black text-blue-900">Custom Path Coming Soon</h3>
          <p className="text-blue-800/70 font-medium text-xs md:text-base">We're working on an AI feature that generates a custom curriculum based on your unique interests and professional background.</p>
        </div>
        <div className="w-16 h-16 md:w-24 md:h-24 bg-blue-100/50 rounded-full flex items-center justify-center text-blue-600 animate-pulse">
          <Layers size={32} md:size={40} />
        </div>
      </div>
    </div>
  );
}

function LearningPathDetailView({ pathId, onBack, onSelectTopic, progress, contentCache }: { pathId: string, onBack: () => void, onSelectTopic: (topic: any) => void, progress: UserProgress, contentCache: any }) {
  const path = LEARNING_PATHS.find(p => p.id === pathId);
  if (!path) return null;

  const getTopicProgress = (topic: any) => {
    let lessonKey = '';
    let quizKey = '';
    
    if (topic.type === 'grammar') {
      lessonKey = `lesson_${topic.category || ''}_${topic.level || ''}_${topic.title}`;
      quizKey = `quiz_grammar_${topic.title}_specific_${topic.level || ''}`;
    } else if (topic.type === 'vocabulary') {
      lessonKey = `vocab_${topic.title}`;
      quizKey = `quiz_vocabulary_${topic.title}`;
    } else if (topic.type === 'idiom') {
      lessonKey = `idiom_${topic.title}`;
      quizKey = `quiz_vocabulary_${topic.title} (Idioms)`;
    }

    const isDone = progress.completedLessons.includes(lessonKey);
    const score = progress.completedQuizzes[quizKey];
    const isCached = !!contentCache[lessonKey];

    return { isDone, score, isCached };
  };

  const completedCount = path.topics.reduce((acc, topic) => {
    const { isDone } = getTopicProgress(topic);
    return acc + (isDone ? 1 : 0);
  }, 0);

  const percentComplete = Math.round((completedCount / path.topics.length) * 100);

  return (
    <div className="space-y-12 pb-24">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all shadow-sm">
            <ArrowLeft />
          </button>
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl">{path.icon}</span>
              <h2 className="text-xl md:text-3xl font-black tracking-tight">{path.title}</h2>
            </div>
            <p className="text-xs md:text-sm text-gray-500">{path.description}</p>
          </div>
        </div>
        <div className="w-full md:w-64 bg-gray-50 p-4 md:p-6 rounded-3xl md:rounded-[2rem] border border-gray-100 flex flex-col gap-3">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Progress</span>
            <span className="text-xl md:text-2xl font-black">{percentComplete}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentComplete}%` }}
              className="h-full bg-emerald-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold px-1">Curated Lessons</h3>
        <div className="grid grid-cols-1 gap-4">
          {path.topics.map((topic, i) => {
            const { isDone, score, isCached } = getTopicProgress(topic);
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onSelectTopic(topic)}
                className={`group p-6 rounded-3xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDone ? 'bg-emerald-50/30 border-emerald-100 hover:border-emerald-500 shadow-sm' : 'bg-white border-gray-100 hover:border-[#1A1A1A] hover:shadow-md'}`}
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all ${isDone ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-[#1A1A1A] group-hover:text-white'}`}>
                    {i + 1}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                       <h4 className="font-bold text-lg">{topic.title}</h4>
                       {isDone && <CheckCircle2 size={16} className="text-emerald-500" />}
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                       <span className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 text-gray-500 px-2 py-0.5 rounded-lg">{topic.type}</span>
                       {topic.level && <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg">{topic.level}</span>}
                       {score !== undefined && (
                         <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-lg">SCORE: {score}%</span>
                       )}
                       {!isDone && isCached && <span className="text-[10px] font-bold text-blue-400 italic">In Progress</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 self-end md:self-auto">
                    <span className="text-xs font-bold text-gray-400 group-hover:text-[#1A1A1A] transition-colors">{isDone ? 'Review' : 'Start Lesson'}</span>
                    <ChevronRight size={16} className="text-gray-300 group-hover:text-[#1A1A1A] transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
        active 
          ? 'bg-[#1A1A1A] text-white shadow-lg' 
          : 'text-gray-500 hover:bg-gray-100 hover:text-[#1A1A1A]'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function HomeView({ onStart, onOverallTest, progress, onJumpToLesson }: { onStart: () => void, onOverallTest: () => void, progress: UserProgress, onJumpToLesson: (type: 'grammar' | 'vocabulary' | 'idiom', topic: string, category: GrammarCategory, level: CEFRLevel) => void }) {
  const lessonCount = progress.completedLessons.length;
  const quizCount = Object.keys(progress.completedQuizzes).length;

  return (
    <div className="flex flex-col items-center space-y-16 pt-8 pb-12 w-full">
      <section className="flex flex-col items-center text-center space-y-8 max-w-2xl px-4">
        {lessonCount > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-50 border border-emerald-100 px-6 py-2 rounded-full flex items-center gap-2 mb-4"
          >
            <Star size={16} fill="currentColor" className="text-emerald-500" />
            <span className="text-emerald-700 font-black text-sm uppercase tracking-widest">
              You've earned {progress.points} points!
            </span>
          </motion.div>
        )}
        <div className="bg-gray-50 p-6 rounded-full inline-block border border-gray-100 shadow-sm">
          <GraduationCap className="w-16 h-16 text-[#1A1A1A]" />
        </div>
        <div className="space-y-4">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight md:leading-tight">Master English <br className="hidden md:block"/> Every Single Day.</h1>
          <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg mx-auto px-4 md:px-0">
            Dynamic, AI-powered grammar and vocabulary lessons tailored to your proficiency level.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-4 md:px-0">
          <button 
            onClick={onStart}
            className="px-6 py-4 md:px-10 md:py-5 bg-[#1A1A1A] text-white rounded-2xl font-bold text-base md:text-lg hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-2"
          >
            Start Learning <ChevronRight size={18} />
          </button>
          <button 
            onClick={onOverallTest}
            className="px-6 py-4 md:px-10 md:py-5 bg-white border-2 border-gray-100 text-[#1A1A1A] rounded-2xl font-bold text-base md:text-lg hover:border-[#1A1A1A] transition-all flex items-center justify-center gap-2"
          >
            <BrainCircuit size={18} md:size={20} /> Overall Test
          </button>
        </div>
      </section>

      {/* Gamification Stats */}
      <section className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 px-4">
        <div className="bg-white border border-gray-100 p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-sm flex flex-col items-center justify-center text-center space-y-1 md:space-y-2">
          <p className="text-2xl md:text-3xl font-black">{lessonCount}</p>
          <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400">Lessons</p>
        </div>
        <div className="bg-white border border-gray-100 p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-sm flex flex-col items-center justify-center text-center space-y-1 md:space-y-2">
          <p className="text-2xl md:text-3xl font-black">{quizCount}</p>
          <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400">Quizzes</p>
        </div>
        <div className="bg-white border border-gray-100 p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-sm flex flex-col items-center justify-center text-center space-y-1 md:space-y-2">
          <p className="text-2xl md:text-3xl font-black">{progress.streak}</p>
          <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400">Streak</p>
        </div>
        <div className="bg-white border border-gray-100 p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-sm flex flex-col items-center justify-center text-center space-y-1 md:space-y-2">
          <p className="text-2xl md:text-3xl font-black">{progress.points}</p>
          <div className="flex items-center gap-1">
            <Star size={10} fill="currentColor" className="text-emerald-500" />
            <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400">Reward</p>
          </div>
        </div>
      </section>

      {/* Badges Section */}
      {progress.badges.length > 0 && (
        <section className="w-full space-y-6">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Trophy size={20} className="text-amber-500" />
              <h3 className="text-xl font-black">Your Achievements</h3>
            </div>
            <span className="text-xs font-bold text-gray-400">{progress.badges.length} Badges Earned</span>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-4 px-4 justify-center md:justify-start">
            {progress.badges.map(badge => (
              <motion.div 
                key={badge.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white border border-gray-100 p-3 md:p-6 rounded-2xl md:rounded-3xl shadow-sm flex flex-col items-center text-center space-y-1.5 md:space-y-3 w-28 md:w-40"
              >
                <div className="text-2xl md:text-4xl">{badge.icon}</div>
                <div className="space-y-0.5">
                  <p className="font-bold text-[9px] md:text-sm leading-tight">{badge.name}</p>
                  <p className="text-[7px] md:text-[9px] text-gray-400 font-medium leading-tight">{badge.description}</p>
                </div>
              </motion.div>
            ))}
            {/* Locked Badges Placeholder */}
            {progress.badges.length < 5 && (
              <div className="bg-gray-50 border border-gray-100 border-dashed p-3 md:p-6 rounded-2xl md:rounded-3xl flex flex-col items-center text-center space-y-1.5 md:space-y-3 w-28 md:w-40 opacity-50">
                <div className="text-2xl md:text-4xl grayscale filter px-2 opacity-20"><Trophy /></div>
                <div className="space-y-0.5">
                    <p className="font-bold text-[9px] md:text-sm leading-tight text-gray-300">Locked</p>
                    <p className="text-[7px] md:text-[9px] text-gray-300 font-medium leading-tight">Keep learning</p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

function LevelsGrid({ onSelect, onOverallTest, progress, contentCache }: { onSelect: (level: CEFRLevel) => void, onOverallTest: (level: CEFRLevel) => void, progress: UserProgress, contentCache: any }) {
  const getLevelCompletion = (level: CEFRLevel) => {
    const topics = CEFR_LEVELS.find(l => l.level === level)?.topics || [];
    if (topics.length === 0) return 0;
    let completed = 0;
    topics.forEach((t: string) => {
      if (progress.completedLessons.includes(`lesson_Levels_${level}_${t}`)) completed++;
      if (progress.completedQuizzes[`quiz_grammar_${t}_specific_${level}`] !== undefined) completed++;
    });
    return Math.min(100, Math.round((completed / (topics.length * 2)) * 100));
  };

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">CEFR Levels</h2>
        <p className="text-gray-500">Choose your proficiency level to explore tailored grammar lessons.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {LEVELS.map(level => {
          const completion = getLevelCompletion(level);
          return (
            <div key={level} className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-[#1A1A1A] hover:shadow-xl transition-all flex flex-col">
              <button 
                onClick={() => onSelect(level)}
                className="p-6 md:p-8 text-left flex-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl font-black group-hover:text-emerald-600 transition-colors">{level}</div>
                  {completion > 0 && (
                    <div className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-1 rounded-lg">
                      {completion}% DONE
                    </div>
                  )}
                </div>
                {completion > 0 && (
                  <div className="w-full h-1 bg-gray-100 rounded-full mb-4 overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${completion}%` }} />
                  </div>
                )}
                <div className="font-bold flex items-center gap-2 text-sm md:text-base">
                  Explore Lessons <ChevronRight size={16} />
                </div>
              </button>
              <button 
                onClick={() => onOverallTest(level)}
                className="p-4 bg-gray-50 border-t border-gray-100 font-bold text-xs uppercase tracking-widest text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <BrainCircuit size={14} /> Overall {level} Test
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TopicList({ title, items, onBack, onSelect, onTest, onDrills, progress, level, category }: { title: string, items: string[], onBack: () => void, onSelect: (topic: string) => void, onTest: (topic: string) => void, onDrills: (topic: string) => void, progress: UserProgress, level?: string, category: GrammarCategory }) {
  return (
    <div className="space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-[#1A1A1A] font-medium transition-colors">
        <ArrowLeft size={16} /> Back to proficiency levels
      </button>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden divide-y divide-gray-100">
        {(Array.isArray(items) ? items : []).map(topic => {
          const lessonKey = `lesson_${category}_${level || ''}_${topic}`;
          const quizKey = `quiz_grammar_${topic}_specific_${level || ''}`;
          const isLessonDone = progress.completedLessons.includes(lessonKey);
          const quizScore = progress.completedQuizzes[quizKey];

          return (
            <div key={topic} className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 transition-colors gap-4">
              <div className="flex items-center gap-3 max-w-full truncate">
                {formatTitleWithKhmer(topic, "font-medium text-sm md:text-base truncate")}
                {isLessonDone && <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />}
                {quizScore !== undefined && (
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ${quizScore >= 80 ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                    TEST: {quizScore}%
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => onDrills(topic)}
                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                  title="Practice Drills"
                >
                  <Shuffle size={20} />
                </button>
                <button 
                  onClick={() => onSelect(topic)}
                  className={`px-4 py-2 text-sm font-bold border rounded-xl transition-colors ${
                    isLessonDone ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'border-gray-200 hover:border-[#1A1A1A]'
                  }`}
                >
                  {isLessonDone ? 'Review' : 'Learn'}
                </button>
                <button 
                  onClick={() => onTest(topic)}
                  className="px-4 py-2 text-sm font-bold bg-[#1A1A1A] text-white rounded-xl hover:opacity-90 transition-opacity"
                >
                  {quizScore !== undefined ? 'Retest' : 'Test'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SimpleList({ title, items, onSelect, onDrills, onTest, onOverallTest, progress, category }: { title: string, items: string[], onSelect: (t: string) => void, onDrills: (t: string) => void, onTest: (t: string) => void, onOverallTest: () => void, progress: UserProgress, category: GrammarCategory }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
        <button 
          onClick={onOverallTest}
          className="px-6 py-3 bg-[#1A1A1A] text-white rounded-2xl font-bold text-sm hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <BrainCircuit size={18} /> Take Overall {title} Test
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(Array.isArray(items) ? items : []).map(item => {
          const lessonKey = `lesson_${category}__${item}`;
          const quizKey = `quiz_grammar_${item}_specific_`;
          const isDone = progress.completedLessons.includes(lessonKey);
          const score = progress.completedQuizzes[quizKey];

          return (
            <div key={item} className={`p-5 md:p-6 border rounded-2xl flex items-center justify-between transition-colors ${
              isDone ? 'bg-emerald-50/30 border-emerald-100 hover:border-emerald-500' : 'bg-white border-gray-200 hover:border-[#1A1A1A]'
            }`}>
              <div className="flex flex-col truncate pr-2">
                <div className="flex items-center gap-2 max-w-full truncate">
                  {formatTitleWithKhmer(item, "font-bold text-base md:text-lg truncate")}
                  {isDone && <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />}
                </div>
                {score !== undefined && (
                  <span className="text-[10px] font-bold text-emerald-600">BEST SCORE: {score}%</span>
                )}
              </div>
              <div className="flex gap-1 md:gap-2 flex-shrink-0">
                <button onClick={() => onSelect(item)} className={`p-2 rounded-lg transition-colors ${isDone ? 'text-emerald-600 hover:bg-emerald-50' : 'text-gray-500 hover:bg-gray-100 hover:text-[#1A1A1A]'}`} title="Learn">
                  <BookOpen size={20} />
                </button>
                <button onClick={() => onDrills(item)} className="p-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors" title="Practice Drills">
                  <Shuffle size={20} />
                </button>
                <button onClick={() => onTest(item)} className={`p-2 rounded-lg transition-colors ${score !== undefined ? 'text-emerald-600 hover:bg-emerald-50' : 'text-gray-500 hover:bg-gray-100 hover:text-[#1A1A1A]'}`} title="Quick Test">
                  <BrainCircuit size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Global font cache to prevent redundant CDN fetches and ensure lightning fast PDF loads
let cachedInterReg = '';
let cachedInterBold = '';
let cachedSiemreap = '';

const loadFonts = async (): Promise<{ interReg: string; interBold: string; siemreap: string }> => {
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve((reader.result as string).split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const fetchWithTimeout = async (url: string, timeoutMs: number = 4000): Promise<Response> => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(id);
      return response;
    } catch (err) {
      clearTimeout(id);
      throw err;
    }
  };

  const tryFetchFont = async (urls: string[]): Promise<string> => {
    for (const url of urls) {
      try {
        const res = await fetchWithTimeout(url, 4000);
        if (res && res.ok) {
          const blob = await res.blob();
          const base64 = await blobToBase64(blob);
          if (base64 && base64.length > 100) {
            return base64;
          }
        }
      } catch (err) {
        console.warn(`Font fetch failed for ${url}, trying next fallback...`, err);
      }
    }
    return '';
  };

  const interRegUrls = [
    'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-400-normal.ttf',
    'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp5GP37T.ttf',
    'https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter-Regular.ttf'
  ];

  const interBoldUrls = [
    'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-700-normal.ttf',
    'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp5GP37T.ttf',
    'https://raw.githubusercontent.com/google/fonts/main/ofl/inter/static/Inter-Bold.ttf'
  ];

  const siemreapUrls = [
    'https://fonts.gstatic.com/s/siemreap/v18/lybB2971_G6b81G-w7s6W1M.ttf',
    'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/siemreap/Siemreap.ttf',
    'https://raw.githubusercontent.com/google/fonts/main/ofl/siemreap/Siemreap.ttf',
    'https://fonts.gstatic.com/s/khmer/v18/0Fl_7zeP3YV_GA9X.ttf',
    'https://fonts.gstatic.com/s/battambang/v23/6xK6dSZv6Z7rO9e9v2Oka_0I0tY.ttf'
  ];

  const [reg, bold, khmer] = await Promise.all([
    cachedInterReg ? Promise.resolve(cachedInterReg) : tryFetchFont(interRegUrls),
    cachedInterBold ? Promise.resolve(cachedInterBold) : tryFetchFont(interBoldUrls),
    cachedSiemreap ? Promise.resolve(cachedSiemreap) : tryFetchFont(siemreapUrls)
  ]);

  if (reg) cachedInterReg = reg;
  if (bold) cachedInterBold = bold;
  if (khmer) cachedSiemreap = khmer;

  return { interReg: reg, interBold: bold, siemreap: khmer };
};

function GrammarLessonView({ 
  data, 
  category, 
  onBack, 
  onTakeTest, 
  onTakeDrills, 
  onRefresh,
  isReadingMode,
  setIsReadingMode
}: { 
  data: any, 
  category: GrammarCategory, 
  onBack: () => void, 
  onTakeTest: () => void, 
  onTakeDrills: () => void, 
  onRefresh?: () => void,
  isReadingMode?: boolean,
  setIsReadingMode?: (val: boolean) => void
}) {
  const [showIframeNotice, setShowIframeNotice] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const lessonRef = useRef<HTMLDivElement>(null);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);

  const buildPDF = async (): Promise<jsPDF | null> => {
    try {
      const fonts = await loadFonts();

      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.setProperties({
        title: `${data.title} - Study Guide`,
        subject: `${category ? category.toUpperCase() : 'GRAMMAR'} Lesson Study Guide`,
        author: 'English Everywhere',
        creator: 'English Everywhere Platform',
        keywords: 'English, Khmer, Grammar, Study Guide, Education'
      });

      const hasInterReg = !!fonts.interReg;
      const hasInterBold = !!fonts.interBold;
      const hasSiemreap = !!fonts.siemreap;

      if (hasInterReg) {
        pdf.addFileToVFS('Inter-Regular.ttf', fonts.interReg);
        pdf.addFont('Inter-Regular.ttf', 'Inter', 'normal');
      }
      if (hasInterBold) {
        pdf.addFileToVFS('Inter-Bold.ttf', fonts.interBold);
        pdf.addFont('Inter-Bold.ttf', 'Inter', 'bold');
      }
      if (hasSiemreap) {
        pdf.addFileToVFS('Siemreap.ttf', fonts.siemreap);
        pdf.addFont('Siemreap.ttf', 'Siemreap', 'normal');
        pdf.addFont('Siemreap.ttf', 'Siemreap', 'bold');
      }

      // Fonts have been loaded from cache/fallbacks and registered above.


      // Helper function to draw page header
      const drawPageHeader = () => {
        if (hasInterBold) {
          pdf.setFont('Inter', 'bold');
        } else {
          pdf.setFont('Helvetica', 'bold');
        }
        pdf.setFontSize(8);
        pdf.setTextColor(156, 163, 175); // gray-400
        pdf.text('ENGLISH EVERYWHERE • STUDY GUIDE', 20, 15);
        
        const catText = category ? category.toUpperCase() : 'GRAMMAR';
        pdf.text(catText, 190, 15, { align: 'right' });
        
        pdf.setDrawColor(243, 244, 246); // gray-100
        pdf.setLineWidth(0.3);
        pdf.line(20, 17, 190, 17);
      };

      // Font applying helpers
      const setInterFont = (style: 'normal' | 'bold', size: number, color: [number, number, number] = [31, 41, 55]) => {
        if (style === 'bold' && hasInterBold) {
          pdf.setFont('Inter', 'bold');
        } else if (hasInterReg) {
          pdf.setFont('Inter', 'normal');
        } else {
          pdf.setFont('Helvetica', style);
        }
        pdf.setFontSize(size);
        pdf.setTextColor(color[0], color[1], color[2]);
      };

      const setSiemreapFont = (size: number, color: [number, number, number] = [31, 41, 55]) => {
        if (hasSiemreap) {
          pdf.setFont('Siemreap', 'normal');
        } else {
          pdf.setFont('Helvetica', 'normal');
        }
        pdf.setFontSize(size);
        pdf.setTextColor(color[0], color[1], color[2]);
      };

      // Pagination tracking
      let y = 25;

      const checkPageOverflow = (heightNeeded: number) => {
        if (y + heightNeeded > 272) {
          pdf.addPage();
          y = 25;
          drawPageHeader();
        }
      };

      // Start by drawing Page 1 header
      drawPageHeader();

      // 1. Title section
      setInterFont('bold', 22, [17, 24, 39]); // Deep dark gray
      const titleLines = pdf.splitTextToSize(data.title, 170);
      titleLines.forEach((line: string) => {
        checkPageOverflow(8);
        pdf.text(line, 20, y);
        y += 8;
      });

      const matchedKey = getMatchingFixedKey(data.title);
      if (matchedKey) {
        const khmerTranslation = KHMER_TRANSLATIONS[matchedKey];
        y += 2;
        setSiemreapFont(16, [79, 70, 229]); // Indigo-600
        const khmerLines = pdf.splitTextToSize(khmerTranslation, 170);
        khmerLines.forEach((line: string) => {
          checkPageOverflow(7);
          pdf.text(line, 20, y);
          y += 7;
        });
      }
      y += 6;

      // 2. Grammar Structures Section
      if (data.structure && (data.structure.affirmative || data.structure.negative || data.structure.question)) {
        const formulas = [
          { label: 'AFFIRMATIVE FORMULA', value: data.structure.affirmative },
          { label: 'NEGATIVE FORMULA', value: data.structure.negative },
          { label: 'QUESTION FORMULA', value: data.structure.question }
        ].filter(f => f.value);

        if (formulas.length > 0) {
          checkPageOverflow(10);
          setInterFont('bold', 10, [67, 56, 202]); // Indigo-700
          pdf.text('GRAMMAR STRUCTURES', 20, y);
          y += 6;

          for (const form of formulas) {
            if (!form.value) continue;
            
            setInterFont('normal', 11, [31, 41, 55]);
            const valueLines = pdf.splitTextToSize(form.value, 158);
            const cardHeight = 8 + 4 + (valueLines.length * 5) + 6;

            checkPageOverflow(cardHeight + 4);

            // Draw rounded card container
            pdf.setFillColor(249, 250, 251); // gray-50
            pdf.setDrawColor(243, 244, 246); // gray-100
            pdf.setLineWidth(0.4);
            pdf.roundedRect(20, y, 170, cardHeight, 3, 3, 'FD');

            // Label
            setInterFont('bold', 8, [79, 70, 229]); // Indigo-600
            pdf.text(form.label, 26, y + 6);

            // Value lines
            setInterFont('normal', 11, [31, 41, 55]);
            let lineY = y + 12;
            valueLines.forEach((line: string) => {
              pdf.text(line, 26, lineY);
              lineY += 5;
            });

            y += cardHeight + 4;
          }
          y += 2;
        }
      }

      // 3. Detailed Explanation Section
      checkPageOverflow(12);
      pdf.setDrawColor(243, 244, 246);
      pdf.line(20, y, 190, y);
      y += 8;

      checkPageOverflow(10);
      pdf.setFillColor(79, 70, 229); // Indigo-600
      pdf.roundedRect(20, y - 4.5, 2, 5.5, 0.5, 0.5, 'F');

      setInterFont('bold', 12, [17, 24, 39]);
      pdf.text('Detailed Explanation', 24, y);
      y += 8;

      const expParas = data.explanation.split('\n\n');
      for (const para of expParas) {
        if (!para.trim()) continue;
        setInterFont('normal', 10.5, [55, 65, 81]); // gray-700
        const wrappedLines = pdf.splitTextToSize(para.trim(), 170);
        const paraHeight = wrappedLines.length * 5.5;

        checkPageOverflow(paraHeight + 6);
        wrappedLines.forEach((line: string) => {
          pdf.text(line, 20, y);
          y += 5.5;
        });
        y += 3;
      }
      y += 4;

      // 4. Khmer Explanation Section
      if (data.explanationKhmer) {
        checkPageOverflow(12);
        pdf.setDrawColor(243, 244, 246);
        pdf.line(20, y, 190, y);
        y += 8;

        checkPageOverflow(10);
        pdf.setFillColor(79, 70, 229); // Indigo-600
        pdf.roundedRect(20, y - 4.5, 2, 5.5, 0.5, 0.5, 'F');

        setInterFont('bold', 12, [17, 24, 39]);
        pdf.text('ការពន្យល់ជាភាសាខ្មែរ', 24, y);
        
        setInterFont('normal', 11, [107, 114, 128]); // gray-500
        const subHeaderWidth = hasInterReg ? pdf.getTextWidth('ការពន្យល់ជាភាសាខ្មែរ ') : 40;
        pdf.text(' (Explanation in Khmer)', 24 + subHeaderWidth, y);
        y += 8;

        const khmerParas = data.explanationKhmer.split('\n\n');
        for (const para of khmerParas) {
          if (!para.trim()) continue;
          setSiemreapFont(11, [55, 65, 81]); // gray-700
          const wrappedLines = pdf.splitTextToSize(para.trim(), 170);
          const paraHeight = wrappedLines.length * 6;

          checkPageOverflow(paraHeight + 6);
          wrappedLines.forEach((line: string) => {
            pdf.text(line, 20, y);
            y += 6;
          });
          y += 4;
        }
        y += 4;
      }

      // 5. Usage Examples Section
      if (data.examples && data.examples.length > 0) {
        checkPageOverflow(12);
        pdf.setDrawColor(243, 244, 246);
        pdf.line(20, y, 190, y);
        y += 8;

        checkPageOverflow(10);
        pdf.setFillColor(16, 185, 129); // Emerald-500
        pdf.roundedRect(20, y - 4.5, 2, 5.5, 0.5, 0.5, 'F');

        setInterFont('bold', 12, [17, 24, 39]);
        pdf.text('Usage Examples', 24, y);
        y += 8;

        for (let i = 0; i < data.examples.length; i++) {
          const ex = data.examples[i];
          if (!ex.trim()) continue;

          const containsKhmer = /[\u1780-\u17ff]/.test(ex);
          const fontToUse = containsKhmer ? 'Siemreap' : 'Inter';
          const stepHeight = containsKhmer ? 6 : 5.5;

          if (containsKhmer) {
            setSiemreapFont(10.5);
          } else {
            setInterFont('normal', 10.5);
          }

          const exLines = pdf.splitTextToSize(ex, 154);
          const cardHeight = (exLines.length * stepHeight) + 10;

          checkPageOverflow(cardHeight + 4);

          // Card container
          pdf.setFillColor(240, 253, 244); // bg-emerald-50
          pdf.setDrawColor(209, 250, 229); // border-emerald-100
          pdf.setLineWidth(0.4);
          pdf.roundedRect(20, y, 170, cardHeight, 3, 3, 'FD');

          // Number badge
          pdf.setFillColor(16, 185, 129); // emerald-500
          pdf.circle(28, y + 6.5, 2.5, 'F');

          setInterFont('bold', 7.5, [255, 255, 255]);
          pdf.text(String(i + 1), 28, y + 7.3, { align: 'center' });

          // Example text
          if (containsKhmer) {
            setSiemreapFont(10.5, [31, 41, 55]);
          } else {
            setInterFont('normal', 10.5, [31, 41, 55]);
          }

          let exY = y + 7;
          exLines.forEach((line: string) => {
            pdf.text(line, 34, exY);
            exY += stepHeight;
          });

          y += cardHeight + 4;
        }
      }

      // Add elegant footers dynamically to all generated pages
      const totalPages = (pdf.internal as any).pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        setInterFont('normal', 8, [156, 163, 175]);

        pdf.setDrawColor(243, 244, 246);
        pdf.setLineWidth(0.4);
        pdf.line(20, 280, 190, 280);

        pdf.text('English Everywhere • High Quality Study Guide • Learn English in Khmer & English', 20, 285);
        pdf.text(`Page ${i} of ${totalPages}`, 190, 285, { align: 'right' });
      }

      return pdf;
    } catch (err) {
      console.error("Vector PDF generation failure:", err);
      return null;
    }
  };

  const handleDownloadPDF = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const pdf = await buildPDF();
      if (pdf) {
        const filename = `${data.title.replace(/[^a-zA-Z0-9]/g, '_')}_Study_Guide.pdf`;
        pdf.save(filename);
      }
    } catch (err) {
      console.error("Download PDF error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePreviewPDF = async () => {
    if (isGeneratingPreview) return;
    setIsGeneratingPreview(true);

    try {
      const pdf = await buildPDF();
      if (pdf) {
        const blob = pdf.output('blob');
        const url = URL.createObjectURL(blob);
        if (previewPdfUrl) {
          URL.revokeObjectURL(previewPdfUrl);
        }
        setPreviewPdfUrl(url);
        setIsPreviewOpen(true);
      }
    } catch (err) {
      console.error("Preview PDF error:", err);
    } finally {
      setIsGeneratingPreview(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewPdfUrl) {
        URL.revokeObjectURL(previewPdfUrl);
      }
    };
  }, [previewPdfUrl]);

  if (!data || !data.examples || !Array.isArray(data.examples)) {
    return (
      <div className="p-12 text-center text-gray-500 font-medium space-y-4">
        <p>This grammar lesson module is loading or has format irregularities.</p>
        <button onClick={onBack} className="px-6 py-2 bg-[#1A1A1A] text-white rounded-xl font-bold hover:scale-105 active:scale-95 transition-all">Back</button>
      </div>
    );
  }
  return (
    <div className={`space-y-12 accessibility-content transition-all duration-300 ${isReadingMode ? 'py-4 max-w-4xl mx-auto' : ''}`}>
      {/* Reading Mode Header */}
      {isReadingMode ? (
        <div className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 py-4 px-6 -mx-6 md:-mx-12 -mt-6 md:-mt-12 mb-8 flex items-center justify-between rounded-b-2xl shadow-sm no-print">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <BookOpen size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest leading-none">Reading Mode</p>
              <h2 className="text-sm md:text-base font-black truncate max-w-xs md:max-w-md mt-1 dark:text-white">{data.title}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviewPDF}
              disabled={isGeneratingPreview}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl font-bold text-xs hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all shadow-sm cursor-pointer disabled:opacity-50"
              title="Preview the PDF study guide before downloading"
            >
              {isGeneratingPreview ? (
                <span className="flex items-center gap-1.5 animate-pulse">
                  <svg className="animate-spin h-3 w-3 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Previewing...
                </span>
              ) : (
                <>
                  <Eye size={14} /> Preview PDF
                </>
              )}
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold text-xs hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all shadow-sm cursor-pointer disabled:opacity-50"
              title="Download/Save this lesson as a PDF for offline study"
            >
              {isDownloading ? (
                <span className="flex items-center gap-1.5 animate-pulse">
                  <svg className="animate-spin h-3 w-3 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                <>
                  <Download size={14} /> Save PDF
                </>
              )}
            </button>
            <button
              onClick={() => setIsReadingMode?.(false)}
              className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] text-white dark:bg-white dark:text-[#1A1A1A] rounded-xl font-bold text-xs hover:scale-[1.03] transition-all shadow-md"
            >
              <Minimize2 size={14} /> Exit Reader
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 no-print">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-[#1A1A1A] font-medium transition-colors">
            <ArrowLeft size={16} /> Back to menu
          </button>
          <div className="flex flex-wrap gap-3">
            {onRefresh && (
              <button 
                onClick={onRefresh}
                className="flex-1 md:flex-none px-5 py-3 bg-white border border-gray-200 text-gray-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-gray-300 rounded-2xl font-bold text-sm hover:bg-gray-50 hover:text-[#1A1A1A] hover:border-gray-300 transition-all flex items-center justify-center gap-2"
                title="Regenerate this lesson with updated models or settings"
              >
                <RotateCcw size={16} /> Regenerate
              </button>
            )}
            <button 
              onClick={() => setIsReadingMode?.(true)}
              className="flex-1 md:flex-none px-5 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-gray-300 rounded-2xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-[#1A1A1A] dark:hover:text-white transition-all flex items-center justify-center gap-2"
              title="Reading Mode: Full-screen, distracted-free focused view"
            >
              <Maximize2 size={16} /> Reading Mode
            </button>
            <button 
              onClick={handlePreviewPDF}
              disabled={isGeneratingPreview}
              className="flex-1 md:flex-none px-5 py-3 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl font-bold text-sm hover:bg-indigo-100 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              title="Preview the PDF study guide before downloading"
            >
              {isGeneratingPreview ? (
                <span className="flex items-center gap-2 animate-pulse">
                  <svg className="animate-spin h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Previewing...
                </span>
              ) : (
                <>
                  <Eye size={16} /> Preview PDF
                </>
              )}
            </button>
            <button 
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex-1 md:flex-none px-5 py-3 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-gray-300 rounded-2xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-[#1A1A1A] dark:hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              title="Download/Save this lesson as a PDF for offline study"
            >
              {isDownloading ? (
                <span className="flex items-center gap-2 animate-pulse">
                  <svg className="animate-spin h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Downloading...
                </span>
              ) : (
                <>
                  <Download size={16} /> Download PDF
                </>
              )}
            </button>
            <button 
              onClick={onTakeDrills}
              className="flex-1 md:flex-none px-5 py-3 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl font-bold text-sm hover:bg-indigo-100 transition-all flex items-center justify-center gap-2"
            >
              <Shuffle size={16} /> Practice Drills
            </button>
            <button 
              onClick={onTakeTest}
              className="flex-1 md:flex-none px-5 py-3 bg-[#1A1A1A] text-white rounded-2xl font-bold text-sm hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <BrainCircuit size={16} /> Final Test
            </button>
          </div>
        </div>
      )}

      {isDownloading && (
        <div className="p-5 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl text-indigo-900 dark:text-indigo-200 text-xs md:text-sm flex items-start gap-4 shadow-sm">
          <div className="flex items-start gap-3">
            <svg className="animate-spin h-5 w-5 text-indigo-500 mt-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <div>
              <p className="font-bold text-indigo-800 dark:text-indigo-300">Generating High-Quality PDF Study Guide...</p>
              <p className="text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                Your computer is converting the grammar lesson content into a gorgeous, high-resolution paginated PDF document. 
                This will download directly to your device once finished. Please keep this tab open!
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Printable Area Wrapper */}
      <div ref={lessonRef} className="printable-lesson space-y-12 bg-white dark:bg-transparent rounded-3xl p-1">
        <div className={`space-y-4 ${isReadingMode ? 'max-w-3xl mx-auto text-center' : ''}`}>
          <h1 className={`font-black tracking-tight ${isReadingMode ? 'text-2xl md:text-4xl text-gray-900 dark:text-white border-b border-gray-100 dark:border-zinc-800 pb-6' : 'text-xl md:text-2xl lg:text-3xl'}`}>
            {formatTitleWithKhmer(data.title, isReadingMode ? "text-2xl md:text-4xl font-black tracking-tight" : "text-xl md:text-2xl lg:text-3xl font-black tracking-tight", true)}
          </h1>
          {data.structure && (
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 ${isReadingMode ? 'max-w-2xl mx-auto' : ''}`}>
               {['affirmative', 'negative', 'question'].map(key => (
                 <div key={key} className="bg-gray-50 dark:bg-zinc-900/50 px-4 py-3 rounded-2xl border border-gray-100 dark:border-zinc-800/80 text-left">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mb-1">{key}</p>
                   <p className="font-mono text-xs md:text-sm text-gray-800 dark:text-gray-200 font-semibold">{(data.structure as any)[key]}</p>
                 </div>
               ))}
            </div>
          )}
        </div>

        <div className={isReadingMode ? "max-w-3xl mx-auto space-y-12" : "grid grid-cols-1 md:grid-cols-3 gap-12"}>
          <div className={isReadingMode ? "space-y-12" : "md:col-span-2 space-y-8"}>
            <section className="space-y-4">
              <h3 className="text-base md:text-lg font-bold flex items-center gap-2">
                <div className="w-1.5 h-6 bg-[#1A1A1A] dark:bg-white rounded-full" /> Detailed Explanation
              </h3>
              <div className={`text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap ${isReadingMode ? 'text-base md:text-lg font-serif space-y-6 md:leading-loose' : 'text-xs md:text-sm space-y-4'}`}>
                {data.explanation}
              </div>

              {data.explanationKhmer && (
                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-zinc-800 space-y-4">
                  <h3 className="text-base md:text-lg font-bold font-khmer flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                    <div className="w-1.5 h-6 bg-indigo-500 rounded-full" /> ការពន្យល់ជាភាសាខ្មែរ (Explanation in Khmer)
                  </h3>
                  <div className={`text-gray-700 dark:text-gray-300 font-khmer leading-relaxed whitespace-pre-wrap ${isReadingMode ? 'text-base md:text-lg space-y-6 md:leading-loose' : 'text-xs md:text-sm'}`}>
                    {data.explanationKhmer}
                  </div>
                </div>
              )}
            </section>

            <section className="space-y-4">
               <h3 className="text-base md:text-lg font-bold flex items-center gap-2">
                 <div className="w-1.5 h-6 bg-emerald-500 rounded-full" /> Usage Examples
               </h3>
               <div className="space-y-3">
                 {data.examples.map((ex: string, i: number) => (
                   <div key={i} className="p-4 bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100/60 dark:border-emerald-900/30 rounded-2xl font-medium text-xs md:text-sm relative group leading-relaxed">
                     <span className="absolute -left-2 -top-2 bg-emerald-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm">
                       {i + 1}
                     </span>
                     <ExampleText text={ex} />
                   </div>
                 ))}
               </div>
            </section>
          </div>

          {!isReadingMode && (
            <div className="space-y-6 no-print">
               <div className="bg-[#1A1A1A] p-6 rounded-3xl text-white space-y-3 shadow-xl">
                 <h3 className="text-base md:text-lg font-bold">Ready to test?</h3>
                 <p className="text-gray-400 text-xs">Take the 20-question randomized test for this topic.</p>
                 <button 
                  onClick={onTakeTest}
                  className="w-full py-3 bg-white text-[#1A1A1A] rounded-2xl font-bold hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-xs md:text-sm"
                 >
                   Start Quiz <BrainCircuit size={18} />
                 </button>
               </div>
               
               <div className="p-8 bg-white dark:bg-zinc-900/40 border border-gray-100 dark:border-zinc-800 rounded-3xl shadow-sm">
                 <h4 className="font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                   <Volume2 size={18} /> Pro Tip
                 </h4>
                 <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                   Try reading the examples out loud to practice your prosody and rhythm while focusing on the grammar.
                 </p>
               </div>
            </div>
          )}
        </div>
      </div>
      
      {isReadingMode ? (
        <div className="pt-12 border-t border-gray-100 dark:border-zinc-800 text-center max-w-xl mx-auto space-y-6 no-print">
          <p className="text-gray-500 dark:text-gray-400 font-medium">You have finished reading this lesson! Ready to test your skills?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onTakeDrills}
              className="px-6 py-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl font-bold text-sm hover:bg-indigo-100/60 transition-all flex items-center justify-center gap-2"
            >
              <Shuffle size={16} /> Practice Drills
            </button>
            <button 
              onClick={onTakeTest}
              className="px-6 py-3 bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] rounded-2xl font-bold text-sm hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <BrainCircuit size={16} /> Start Final Test
            </button>
          </div>
        </div>
      ) : (
        <div className="pt-12 border-t border-gray-100 dark:border-zinc-800 text-center no-print">
          <p className="text-gray-400 mb-6 font-medium">Would you like to see more examples, or are you ready to take the 20-question test for this topic?</p>
        </div>
      )}

      {/* PDF Preview Modal */}
      {isPreviewOpen && previewPdfUrl && (
        <div className="fixed inset-0 z-50 overflow-y-auto no-print" id="pdf-preview-modal-overlay">
          {/* Backdrop with backdrop-blur */}
          <div 
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsPreviewOpen(false)} 
          />

          <div className="flex min-h-full items-center justify-center p-4 md:p-6 text-center">
            <div className="relative transform overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 text-left shadow-2xl transition-all w-full max-w-5xl border border-gray-100 dark:border-zinc-800/80 flex flex-col h-[85vh]">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 dark:border-zinc-800/80 flex items-center justify-between bg-gray-50/50 dark:bg-zinc-950/20 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-black text-gray-900 dark:text-white truncate max-w-xs md:max-w-md">
                      Study Guide Preview
                    </h3>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-0.5">
                      {data.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={previewPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800/80 transition-all"
                    title="Open in standard browser tab"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = previewPdfUrl;
                      link.download = `${data.title.replace(/[^a-zA-Z0-9]/g, '_')}_Study_Guide.pdf`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer"
                    title="Download/Save PDF"
                  >
                    <Download size={12} /> Download
                  </button>
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-zinc-300 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800/80 transition-all cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* PDF Content Area */}
              <div className="flex-1 bg-zinc-100 dark:bg-zinc-950/60 p-4 relative flex items-center justify-center">
                <iframe
                  src={`${previewPdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                  className="w-full h-full rounded-2xl shadow-inner border-0 bg-white"
                  title="PDF Document Reader"
                />
              </div>

              {/* Footer Notice */}
              <div className="px-6 py-3 border-t border-gray-100 dark:border-zinc-800/80 bg-gray-50/50 dark:bg-zinc-950/20 text-center">
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                  This preview renders the vector study guide generated directly in your browser. Cambodian Khmer font characters are beautifully compiled.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VocabularyStart({ onSelect }: { onSelect: (topic: string) => void }) {
  const [query, setQuery] = useState('');
  const presets = [
    'Family Members', 
    'At the Airport & Hotels', 
    'Restaurant & Dining Out', 
    'Asking for Directions', 
    'Travel Safety & Help',
    'Professional Meetings', 
    'Formal Emails & Requests',
    'Meetings & Negotiations',
    'Presentations & Pitching',
    'Academic Vocabulary List 1',
    'Describing Data & Trends',
    'C1 Vocabulary: Abstract Topics',
    'Medical & Health', 
    'Technology & Innovation'
  ];
  
  return (
    <div className="space-y-8 md:space-y-12 max-w-2xl mx-auto text-center pt-8">
      <div className="space-y-2">
        <h2 className="text-xl md:text-3xl font-bold tracking-tight px-4">Situational Vocabulary</h2>
        <p className="text-xs text-gray-500 px-4">Enter any situation or theme to generate an exhaustive list of words with IPA and examples.</p>
      </div>
      
      <form onSubmit={(e) => { e.preventDefault(); if (query) onSelect(query); }} className="relative group px-4">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. 'Space Exploration'"
          className="w-full p-4 md:p-6 pr-12 bg-white border-2 border-gray-100 rounded-2xl md:rounded-3xl text-base md:text-xl focus:border-[#1A1A1A] focus:outline-none transition-colors shadow-sm focus:shadow-xl"
        />
        <button type="submit" className="absolute right-8 top-1/2 -translate-y-1/2 p-1.5 md:p-2 bg-[#1A1A1A] text-white rounded-xl">
          <Search size={20} md:size={24} />
        </button>
      </form>

      <div className="space-y-4 px-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-400">Popular Topics</p>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {presets.map(p => (
            <button 
              key={p} 
              onClick={() => onSelect(p)}
              className="px-5 py-2.5 bg-white border border-gray-200 rounded-full font-medium hover:border-[#1A1A1A] transition-colors text-sm shadow-sm"
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function VocabularyLessonView({ data, onBack, onTakeTest, speak, onRefresh }: { data: VocabularyLesson, onBack: () => void, onTakeTest: () => void, speak: (t: string) => void, onRefresh?: () => void }) {
  const [practiceMode, setPracticeMode] = useState<'list' | 'flashcards'>('list');

  if (!data || !data.words || !Array.isArray(data.words) || data.words.length === 0) {
    return (
      <div className="p-12 text-center text-gray-500 font-medium space-y-4">
        <p>This vocabulary lesson module is loading or has format irregularities.</p>
        <button onClick={onBack} className="px-6 py-2 bg-[#1A1A1A] text-white rounded-xl font-bold hover:scale-105 active:scale-95 transition-all">Back</button>
      </div>
    );
  }
  return (
    <div className="space-y-12 accessibility-content">
      <div className="flex-col lg:flex-row flex items-start lg:items-center justify-between sticky top-[57px] lg:top-0 bg-[#FDFCFB]/95 backdrop-blur-md py-4 z-10 border-b border-gray-100 -mx-6 md:-mx-12 px-6 md:px-12 transition-all gap-4">
        <div className="flex items-center gap-4 md:gap-8 w-full lg:w-auto">
          <button onClick={onBack} className="text-gray-400 hover:text-[#1A1A1A] flex-shrink-0"><ArrowLeft /></button>
          <h1 className="text-base md:text-xl lg:text-2xl font-black uppercase tracking-tight truncate max-w-[200px] sm:max-w-md">{data.topic}</h1>
        </div>
        
        <div className="flex items-center gap-2 w-full lg:w-auto flex-wrap">
          {onRefresh && (
            <button 
              onClick={onRefresh}
              className="px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-full font-bold text-xs hover:bg-gray-50 hover:text-[#1A1A1A] transition-all flex items-center gap-1.5 whitespace-nowrap"
              title="Regenerate this lesson with updated models or settings"
            >
              <RotateCcw size={14} />
              Regenerate
            </button>
          )}
          <div className="flex bg-gray-100 p-1 rounded-xl flex-1 lg:flex-none">
            <button 
              onClick={() => setPracticeMode('list')}
              className={`flex-1 lg:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${practiceMode === 'list' ? 'bg-white shadow-sm text-[#1A1A1A]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              List View
            </button>
            <button 
              onClick={() => setPracticeMode('flashcards')}
              className={`flex-1 lg:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${practiceMode === 'flashcards' ? 'bg-white shadow-sm text-[#1A1A1A]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Flashcards
            </button>
          </div>
          <button 
            onClick={onTakeTest}
            className="flex-1 lg:flex-none px-6 py-2.5 bg-[#1A1A1A] text-white rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg whitespace-nowrap"
          >
            Take Quiz
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {practiceMode === 'list' ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {data.words.map((word: VocabularyWord, i: number) => (
              <div key={i} className="p-5 md:p-6 lg:p-8 bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#1A1A1A] transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg md:text-xl font-black">
                        {word.word}
                        {word.translationKhmer && (
                          <span className="font-normal text-indigo-600 dark:text-indigo-400 font-khmer"> - {word.translationKhmer}</span>
                        )}
                      </h3>
                      <span className="text-[10px] uppercase font-black tracking-widest text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                        {word.partOfSpeech}
                      </span>
                    </div>
                    <code className="text-gray-400 font-mono text-xs md:text-sm bg-gray-50 px-2 py-0.5 rounded">{word.ipa}</code>
                  </div>
                  <button 
                    onClick={() => speak(word.word)}
                    className="p-2 md:p-3 bg-gray-50 rounded-2xl text-gray-400 hover:bg-[#1A1A1A] hover:text-white transition-all shadow-sm"
                    title="Listen to pronunciation"
                  >
                    <Volume2 size={20} md:size={24} />
                  </button>
                </div>
                
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4 border-l-2 border-gray-100 pl-4 py-1 italic">
                  {word.definition}
                </p>

                {word.origin && (
                  <div className="mb-6 bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-1">Origin</p>
                    <p className="text-xs text-amber-900/70 leading-relaxed">{word.origin}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Example Usage</p>
                  <div className="space-y-3">
                    {word.examples.slice(0, 3).map((ex: string, j: number) => (
                      <div key={j} className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed group-hover:text-gray-700 transition-colors flex gap-2">
                        <span className="text-emerald-500">•</span>
                        <ExampleText text={ex} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <VocabularyFlashcards data={data} speak={speak} />
        )}
      </AnimatePresence>

      <div className="pt-24 pb-12 border-t border-gray-100 text-center">
        <p className="text-gray-400 font-medium">Would you like to explore another topic, or are you ready for the 20-question test?</p>
      </div>
    </div>
  );
}

function VocabularyFlashcards({ data, speak }: { data: VocabularyLesson, speak: (t: string) => void }) {
  const [index, setIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const currentWord = data.words[index];

  const handleNext = () => {
    if (index < data.words.length - 1) {
      setIndex(index + 1);
      setIsRevealed(false);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
      setIsRevealed(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl mx-auto space-y-12"
    >
      <div className="text-center space-y-2">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Card {index + 1} of {data.words.length}</p>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#1A1A1A]"
            initial={{ width: 0 }}
            animate={{ width: `${((index + 1) / data.words.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="perspective-1000">
        <motion.div 
          onClick={() => setIsRevealed(!isRevealed)}
          className={`relative w-full aspect-[3/4] sm:aspect-[4/3] cursor-pointer group transition-all duration-500 preserve-3d ${isRevealed ? 'rotate-y-180' : ''}`}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-white border-2 border-gray-100 rounded-[2rem] md:rounded-[2.5rem] shadow-xl flex flex-col items-center justify-center p-6 md:p-12 text-center group-hover:border-[#1A1A1A] transition-colors">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              {currentWord.word}
              {currentWord.translationKhmer && (
                <span className="font-normal text-indigo-600 dark:text-indigo-400 font-khmer"> - {currentWord.translationKhmer}</span>
              )}
            </h3>
            <p className="text-gray-400 font-medium text-[10px] md:text-sm uppercase tracking-widest">Click to reveal</p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white border-2 border-[#1A1A1A] rounded-[2rem] md:rounded-[2.5rem] shadow-2xl flex flex-col p-6 md:p-12 overflow-y-auto">
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg md:text-2xl font-bold">
                    {currentWord.word}
                    {currentWord.translationKhmer && (
                      <span className="font-normal text-indigo-600 dark:text-indigo-400 font-khmer text-sm md:text-lg"> - {currentWord.translationKhmer}</span>
                    )}
                  </h3>
                  <span className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                    {currentWord.partOfSpeech}
                  </span>
                </div>
                <code className="text-gray-400 font-mono text-xs md:text-sm bg-gray-50 px-2 py-0.5 rounded">{currentWord.ipa}</code>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); speak(currentWord.word); }}
                className="p-2 md:p-3 bg-gray-50 rounded-xl md:rounded-2xl text-gray-400 hover:bg-[#1A1A1A] hover:text-white transition-all shadow-sm"
              >
                <Volume2 size={20} md:size={24} />
              </button>
            </div>

            <div className="space-y-6 flex-1">
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]">Definition</p>
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed italic border-l-2 border-[#1A1A1A] pl-4">{currentWord.definition}</p>
              </div>

              {currentWord.origin && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-1">Origin</p>
                  <p className="text-xs md:text-sm text-amber-900/70">{currentWord.origin}</p>
                </div>
              )}

              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Context Examples</p>
                <div className="space-y-2">
                  {currentWord.examples.map((ex: string, i: number) => (
                    <div key={i} className="text-xs md:text-sm text-gray-600 font-medium leading-relaxed flex gap-2">
                       <span className="text-emerald-500">•</span>
                       <ExampleText text={ex} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <p className="text-center text-xs text-gray-300 mt-8 font-medium">Click to hide</p>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-between gap-6 px-4">
        <button 
          onClick={handlePrev}
          disabled={index === 0}
          className="p-5 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-[#1A1A1A] hover:border-[#1A1A1A] disabled:opacity-30 disabled:hover:border-gray-100 transition-all shadow-sm"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="flex-1 bg-gray-50 p-4 rounded-2xl text-center">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tip</p>
            <p className="text-sm font-medium text-gray-600">Think of the meaning before you flip!</p>
        </div>

        <button 
          onClick={handleNext}
          disabled={index === data.words.length - 1}
          className="p-5 bg-[#1A1A1A] text-white rounded-2xl hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 transition-all shadow-lg"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </motion.div>
  );
}

function IdiomMenuView({ onSelect, onOverallTest }: { onSelect: (topic: string) => void, onOverallTest: () => void }) {
  const [customTopic, setCustomTopic] = useState('');
  
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">Idioms & Phrases</h2>
          <p className="text-gray-500">Explore the color and history of English through its most common idioms.</p>
        </div>
        <button 
          onClick={onOverallTest}
          className="px-8 py-4 bg-[#1A1A1A] text-white rounded-2xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-xl"
        >
          <BrainCircuit size={20} /> Overall Idioms Test
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Layers className="text-emerald-500" size={20} /> Popular Categories
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {IDIOM_CATEGORIES.map(cat => (
              <button 
                key={cat} 
                onClick={() => onSelect(cat)}
                className="p-4 bg-white border border-gray-200 rounded-2xl font-bold text-sm hover:border-[#1A1A1A] hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <span>{cat} Idioms</span>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-[#1A1A1A] transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Search className="text-blue-500" size={20} /> Custom Category
          </h3>
          <form 
            onSubmit={(e) => { e.preventDefault(); if (customTopic) onSelect(customTopic); }}
            className="p-8 bg-blue-50 border border-blue-100 rounded-3xl space-y-4"
          >
            <p className="text-sm text-blue-800/70 font-medium">Want something specific? AI can generate idioms for any theme.</p>
            <input 
              type="text" 
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="e.g. 'Business', 'Success', 'Failure'..."
              className="w-full p-4 bg-white border-2 border-transparent rounded-2xl focus:border-blue-500 focus:outline-none transition-all shadow-sm"
            />
            <button 
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Generate Theme
            </button>
          </form>
        </div>
      </div>

      <div className="p-8 bg-[#1A1A1A] rounded-[2rem] text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="flex-1 space-y-4 relative z-10">
          <h3 className="text-2xl font-black">Why learn idioms?</h3>
          <p className="text-gray-400 leading-relaxed">
            Idioms make your English sound more natural and fluent. They carry cultural history and often express complex ideas in simple, visual ways.
          </p>
        </div>
        <div className="w-full md:w-auto grid grid-cols-2 gap-4 relative z-10">
          <div className="bg-white/10 p-4 rounded-2xl text-center">
            <p className="text-2xl font-black text-emerald-400">1000+</p>
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Possible Idioms</p>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl text-center">
            <p className="text-2xl font-black text-blue-400">AI</p>
            <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Guided Lessons</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function IdiomTopicsView({ category, topics, onBack, onSelectTopic }: { category: string, topics: string[], onBack: () => void, onSelectTopic: (t: string) => void }) {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-6">
        <button onClick={onBack} className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-all shadow-sm">
          <ArrowLeft />
        </button>
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A] bg-[#1A1A1A]/5 px-2 py-0.5 rounded-lg inline-block">{category} Idioms</p>
          <h2 className="text-xl md:text-2xl font-black tracking-tight">Choose a specific theme</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map((topic, i) => (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            key={topic}
            onClick={() => onSelectTopic(topic)}
            className="group p-6 bg-white border border-gray-100 rounded-[2rem] text-left hover:border-[#1A1A1A] hover:shadow-xl transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-[#1A1A1A] group-hover:text-white transition-all">
                <BookOpen size={18} />
              </div>
              <span className="font-bold text-lg">{topic}</span>
            </div>
            <ChevronRight size={18} className="text-gray-300 group-hover:text-[#1A1A1A] transition-colors" />
          </motion.button>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-100 p-8 rounded-[3rem] text-center max-w-2xl mx-auto space-y-3">
        <Star className="text-amber-500 mx-auto" size={32} />
        <h4 className="font-bold text-amber-900">Custom Generations</h4>
        <p className="text-amber-800/60 text-sm leading-relaxed">
          Each theme is generated live by AI to provide the most culturally relevant and common idioms for learners.
        </p>
      </div>
    </div>
  );
}

function QuizView({ data, onBack, onComplete, onRetake }: { data: Quiz, onBack: () => void, onComplete?: (score: number) => void, onRetake?: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ questionIndex: number; selected: string; isCorrect: boolean }[]>([]);
  const [analysis, setAnalysis] = useState<QuizAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  useEffect(() => {
    if (showResult && onComplete && data && data.questions && data.questions.length > 0) {
       onComplete(Math.round((score / data.questions.length) * 100));
    }
  }, [showResult]);

  useEffect(() => {
    if (showResult && data && data.questions && data.questions.length > 0) {
      const triggerAnalysis = async () => {
        setIsAnalyzing(true);
        setAnalysisError(null);
        try {
          const res = await analyzeQuizPerformance(
            data.title,
            data.questions,
            userAnswers,
            score,
            data.questions.length
          );
          setAnalysis(res);
        } catch (error) {
          console.error("AI analysis error:", error);
          setAnalysisError("Could not load AI performance report. Please try again.");
        } finally {
          setIsAnalyzing(false);
        }
      };
      
      triggerAnalysis();
    }
  }, [showResult]);

  if (!data || !data.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
    return (
      <div className="p-12 text-center text-gray-500 font-medium space-y-4">
        <p>This test matches an invalid, custom, or loading curriculum structure. Please return back to the learning menu.</p>
        <button onClick={onBack} className="px-6 py-2 bg-[#1A1A1A] text-white rounded-xl font-bold hover:scale-105 active:scale-95 transition-all">Return Back</button>
      </div>
    );
  }

  const currentQuestion = data.questions[currentIndex];

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    const isCorrect = option === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(s => s + 1);
    }
    setUserAnswers(prev => [...prev, { questionIndex: currentIndex, selected: option, isCorrect }]);
  };

  const next = () => {
    if (currentIndex < data.questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const percentage = (score / data.questions.length) * 100;
    return (
      <div className="max-w-2xl mx-auto text-center space-y-12 pt-12">
        <div className="space-y-6">
          <div className="relative inline-block">
            <div className={`w-28 h-28 md:w-48 md:h-48 rounded-full border-4 md:border-8 ${percentage >= 70 ? 'border-emerald-500' : 'border-orange-500'} flex items-center justify-center shadow-lg`}>
              <span className="text-2xl md:text-5xl font-black">{score}</span>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-3 md:px-4 py-1 border border-gray-200 rounded-full text-[10px] md:text-base font-bold shadow-md">
              /{data.questions.length}
            </div>
          </div>
          <h2 className="text-lg md:text-2xl font-bold">
            {percentage >= 70 ? 'Great job!' : 'Nice try!'}
          </h2>
          <p className="text-xs md:text-sm text-gray-500">You scored {percentage}% on {data.title}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={onBack}
            className="w-full sm:w-auto px-10 py-4 bg-white border border-gray-200 text-gray-700 rounded-full font-bold hover:border-[#1A1A1A] hover:scale-105 active:scale-95 transition-all shadow-sm"
          >
            Return to Learning
          </button>
          {onRetake && (
            <button 
              onClick={() => {
                // reset internal state before calling onRetake
                setCurrentIndex(0);
                setSelectedOption(null);
                setIsAnswered(false);
                setScore(0);
                setShowResult(false);
                setUserAnswers([]);
                setAnalysis(null);
                setAnalysisError(null);
                setIsAnalyzing(false);
                onRetake();
              }}
              className="w-full sm:w-auto px-10 py-4 bg-[#1A1A1A] text-white rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} /> Retake Quiz
            </button>
          )}
        </div>

        {/* AI Performance Report Section */}
        <div className="space-y-6 pt-8 border-t border-gray-150 text-left">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-indigo-600 animate-pulse shrink-0" />
            <h3 className="text-xl font-black uppercase text-indigo-950 tracking-tight">AI Coach Performance Report</h3>
          </div>

          {isAnalyzing && (
            <div className="p-8 bg-indigo-50/20 border border-indigo-100 rounded-3xl flex flex-col items-center justify-center space-y-4 text-center">
              <BrainCircuit size={40} className="text-indigo-600 animate-spin" />
              <div className="space-y-1">
                <p className="font-bold text-sm text-indigo-950">AI Coach is analyzing your quiz answers...</p>
                <p className="text-xs text-gray-500">Detecting conceptual patterns and formulating study recommendations.</p>
              </div>
            </div>
          )}

          {analysisError && (
            <div className="p-6 bg-red-50 border border-red-100 rounded-3xl flex flex-col items-center justify-center space-y-3 text-center">
              <AlertCircle size={32} className="text-red-500" />
              <p className="text-sm font-semibold text-red-900">{analysisError}</p>
              <button
                onClick={() => {
                  setAnalysisError(null);
                  setIsAnalyzing(true);
                  analyzeQuizPerformance(data.title, data.questions, userAnswers, score, data.questions.length)
                    .then(res => setAnalysis(res))
                    .catch(err => {
                      console.error(err);
                      setAnalysisError("Could not load AI performance report. Please try again.");
                    })
                    .finally(() => setIsAnalyzing(false));
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-indigo-700 transition-all"
              >
                Retry Analysis
              </button>
            </div>
          )}

          {analysis && !isAnalyzing && (
            <div className="p-6 md:p-8 bg-gradient-to-br from-indigo-50/40 to-indigo-50/10 border border-indigo-100/60 rounded-3xl space-y-8 shadow-xs">
              {/* Summary */}
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase text-indigo-500 tracking-wider flex items-center gap-1.5">
                  ✦ Personal Summary
                </p>
                <p className="text-gray-700 leading-relaxed font-semibold text-sm md:text-base">
                  <ExampleText text={analysis.summary} />
                </p>
              </div>

              {/* Insights */}
              {analysis.insights && analysis.insights.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase text-indigo-500 tracking-wider flex items-center gap-1.5">
                    ✦ Concept Analysis & Coach Insights
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analysis.insights.map((insight, idx) => (
                      <div key={idx} className="p-4 bg-white border border-gray-100 rounded-2xl shadow-xs space-y-2 hover:border-indigo-100 transition-colors">
                        <div className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">💡</span>
                          <p className="text-xs text-gray-700 font-medium leading-relaxed">
                            <ExampleText text={insight} />
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {analysis.recommendations && analysis.recommendations.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase text-indigo-500 tracking-wider flex items-center gap-1.5">
                    ✦ Recommended Next Steps
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {analysis.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:border-emerald-100 transition-colors">
                        <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-xs text-gray-700 font-bold">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-8 pt-12">
          <h3 className="text-2xl font-bold flex items-center justify-center gap-3">
             Answer Review
          </h3>
          <div className="space-y-4 text-left">
            {data.questions.map((q, i) => {
              const userAnswer = userAnswers.find(ua => ua.questionIndex === i);
              const isCorrect = userAnswer?.isCorrect;
              return (
                <div key={i} className={`p-6 bg-white dark:bg-zinc-900/40 border ${isCorrect === false ? 'border-red-100 dark:border-red-950/30' : 'border-gray-100 dark:border-zinc-800'} rounded-2xl shadow-sm space-y-3`}>
                  <p className="font-bold flex gap-3"><span className="text-gray-400">{i+1}.</span> <ExampleText text={q.question} /></p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {/* Your Answer */}
                    <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold ${
                      isCorrect === true 
                        ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400' 
                        : isCorrect === false
                          ? 'text-red-700 bg-red-50 dark:bg-red-950/20 dark:text-red-400'
                          : 'text-gray-600 bg-gray-50 dark:bg-zinc-800 dark:text-gray-400'
                    }`}>
                      {isCorrect === true ? (
                        <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
                      ) : (
                        <XCircle size={16} className="shrink-0 text-red-500" />
                      )}
                      <span>Your Answer: {userAnswer ? userAnswer.selected : "Not answered"}</span>
                    </div>

                    {/* Correct Answer */}
                    <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400 px-3 py-2.5 rounded-xl text-sm font-bold">
                      <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
                      <span>Correct Answer: {q.correctAnswer}</span>
                    </div>
                  </div>

                  {q.explanation && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic border-t border-gray-100 dark:border-zinc-800/80 pt-3 mt-2">
                      <ExampleText text={q.explanation} />
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">Question {currentIndex + 1} of {data.questions.length}</p>
          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-emerald-500" 
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / data.questions.length) * 100}%` }}
            />
          </div>
        </div>
        <button onClick={onBack} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><ChevronRight className="rotate-180" /></button>
      </div>

      <div className="space-y-8">
        <h2 className="text-xl md:text-3xl font-bold leading-tight"><ExampleText text={currentQuestion.question} /></h2>
        
        <div className="grid grid-cols-1 gap-3 md:gap-4">
          {currentQuestion.options.map(option => {
            let state = 'default';
            if (isAnswered) {
              if (option === currentQuestion.correctAnswer) state = 'correct';
              else if (option === selectedOption) state = 'wrong';
              else state = 'muted';
            }

            return (
              <button 
                key={option}
                onClick={() => handleSelect(option)}
                disabled={isAnswered}
                className={`p-5 md:p-6 text-left text-base md:text-lg font-medium border-2 rounded-2xl md:rounded-3xl transition-all relative ${
                  state === 'default' ? 'bg-white border-gray-100 hover:border-[#1A1A1A] hover:shadow-md' :
                  state === 'correct' ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm md:shadow-lg md:scale-[1.02]' :
                  state === 'wrong' ? 'bg-red-50 border-red-500 text-red-900' :
                  'bg-gray-50 border-gray-100 opacity-50'
                }`}
              >
                <span className="pr-8">{option}</span>
                {state === 'correct' && <CheckCircle2 className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-emerald-500" size={20} />}
                {state === 'wrong' && <AlertCircle className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-red-500" size={20} />}
              </button>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 p-8 bg-gray-50 border border-gray-100 rounded-3xl"
          >
            <div className="space-y-2">
              <p className="font-bold text-sm uppercase tracking-widest text-[#1A1A1A]">Explanation</p>
              <p className="text-gray-600 leading-relaxed"><ExampleText text={currentQuestion.explanation} /></p>
            </div>
            <button 
              onClick={next}
              className="w-full py-4 bg-[#1A1A1A] text-white rounded-2xl font-bold text-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
            >
              {currentIndex < data.questions.length - 1 ? 'Next Question' : 'Finish Quiz'} <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DictionarySearchInput({ onSearch, variant = 'large' }: { onSearch: (q: string) => void, variant?: 'large' | 'small' }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<WordSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      const matches = searchWords(query, 6);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (word: string) => {
    setQuery(word);
    onSearch(word);
    setShowSuggestions(false);
  };

  if (variant === 'small') {
    return (
      <div className="relative flex-1 group max-w-md" ref={containerRef}>
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Quick lookup..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && setShowSuggestions(true)}
            className="w-full bg-white border border-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm group-hover:shadow-md"
          />
          <button 
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
          >
            Search
          </button>
        </form>

        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden"
            >
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => selectSuggestion(s.word)}
                  className="w-full text-left px-4 py-2 hover:bg-indigo-50 flex items-center justify-between group/item transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover/item:text-indigo-600">{s.word}</span>
                  <span className="text-[10px] font-bold text-gray-300 group-hover/item:text-indigo-400 bg-gray-50 px-1.5 py-0.5 rounded uppercase">{s.letter}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 relative" ref={containerRef}>
      <form onSubmit={handleSearch} className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Search for a word..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowSuggestions(true)}
          className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm shadow-indigo-500/5 group-hover:shadow-md"
        />
        <button 
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
        >
          Search
        </button>
      </form>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-4 right-4 mt-2 bg-white border border-gray-100 rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => selectSuggestion(s.word)}
                className="w-full text-left px-6 py-4 hover:bg-indigo-50 flex items-center justify-between group/item transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Search size={16} className="text-gray-300 group-hover/item:text-indigo-400" />
                  <span className="text-lg font-medium text-gray-700 group-hover/item:text-indigo-600">{s.word}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg uppercase tracking-wider">Letter {s.letter}</span>
                  <ChevronRight size={16} className="text-gray-300 group-hover/item:text-indigo-400" />
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DictionaryStart({ onSelect, onSearch, onShowIrregulars, onSelectPos, onShowTest }: { onSelect: (letter: string) => void, onSearch: (query: string) => void, onShowIrregulars: () => void, onSelectPos: (pos: string) => void, onShowTest: () => void }) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const posList = [
    { label: 'All', value: 'all', icon: <Layers size={18} /> },
    { label: 'Nouns', value: 'noun', icon: <Book size={18} /> },
    { label: 'Verbs', value: 'verb', icon: <Play size={18} /> },
    { label: 'Adjectives', value: 'adj', icon: <Compass size={18} /> },
    { label: 'Adverbs', value: 'adv', icon: <Zap size={18} /> },
    { label: 'Pronouns', value: 'pron', icon: <User size={18} /> },
    { label: 'Prepositions', value: 'prep', icon: <MapPin size={18} /> },
    { label: 'Conjunctions', value: 'conj', icon: <GitCommit size={18} /> },
    { label: 'Interjections', value: 'interj', icon: <AlertCircle size={18} /> }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <div className="text-center space-y-4">
        <div className="inline-block p-4 bg-indigo-50 rounded-3xl text-indigo-600 mb-2">
          <Library size={48} />
        </div>
        <h2 className="text-2xl md:text-4xl font-black tracking-tight">Essential Dictionary</h2>
        <p className="text-gray-500 max-w-lg mx-auto text-xs md:text-sm">Browse curated essential English vocabulary with definitions and examples.</p>
      </div>

      <DictionarySearchInput onSearch={onSearch} />

      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {posList.map(pos => (
            <button
              key={pos.value}
              onClick={() => onSelectPos(pos.value)}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm hover:shadow-md"
            >
              {pos.icon} {pos.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3 md:gap-4 col-span-1 md:col-span-2">
            {alphabet.map(letter => (
              <button
                key={letter}
                onClick={() => onSelect(letter)}
                className="aspect-square flex items-center justify-center text-2xl font-black bg-white border border-gray-100 rounded-2xl hover:border-[#1A1A1A] hover:bg-gray-50 hover:scale-105 transition-all shadow-sm active:scale-95"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={onShowTest}
        className="w-full flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-violet-50 to-indigo-50 border border-indigo-100 p-8 rounded-[3rem] hover:from-indigo-100/30 hover:to-violet-100/30 transition-all group shadow-sm hover:shadow-md"
      >
        <div className="flex items-center gap-6">
          <div className="p-4 bg-indigo-600 text-white rounded-[2rem] shadow-xl shadow-indigo-600/20 group-hover:scale-110 transition-transform">
            <Trophy size={32} />
          </div>
          <div className="text-left space-y-1">
            <h3 className="text-2xl font-black text-indigo-950">Vocabulary Mastery Quiz</h3>
            <p className="text-indigo-800/70 font-medium">Test your skills with definitions, irregulars, parts of speech, synonyms, and antonyms!</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-tighter shadow-md hover:bg-indigo-700 transition-colors">
          Start Quiz <ChevronRight size={20} />
        </div>
      </button>

      <button 
        onClick={onShowIrregulars}
        className="w-full flex flex-col md:flex-row items-center justify-between gap-6 bg-rose-50 border border-rose-100 p-8 rounded-[3rem] hover:bg-rose-100/50 transition-all group"
      >
        <div className="flex items-center gap-6">
          <div className="p-4 bg-rose-600 text-white rounded-[2rem] shadow-xl shadow-rose-600/20 group-hover:scale-110 transition-transform">
            <Shuffle size={32} />
          </div>
          <div className="text-left space-y-1">
            <h3 className="text-2xl font-black text-rose-900">Irregular Verbs Guide</h3>
            <p className="text-rose-800/60 font-medium">Master the verbs that don't follow the rules.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/50 px-6 py-3 rounded-2xl text-rose-600 font-black uppercase tracking-tighter shadow-sm">
          Browse All <ChevronRight size={20} />
        </div>
      </button>

      <div className="bg-amber-50 border border-amber-100 p-8 rounded-[3rem] text-center space-y-4">
        <h3 className="font-bold text-amber-900 flex items-center justify-center gap-2">
          <Star size={20} /> A-Z Coverage
        </h3>
        <p className="text-amber-800/70 text-sm leading-relaxed max-w-md mx-auto">
          Explore every letter of the alphabet. Each word includes its part of speech, IPA transcription, clear definition, and natural examples.
        </p>
      </div>
    </div>
  );
}

function DictionaryWordCard({ entry, index, speak, onSearch, letter }: { entry: DictionaryEntry, index: number, speak: (t: string) => void, onSearch: (q: string) => void, letter?: string, key?: any }) {
  const isSpecial = entry.isIrregular || !!entry.variant;
  const isVerb = entry.partOfSpeech.toLowerCase().includes('verb');
  const isIrregularVerb = entry.isIrregular && isVerb;
  const khmerTranslation = useKhmerTranslation(entry.word);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      key={`${entry.word}_${index}`} 
      className={`group border rounded-[2.5rem] p-8 md:p-10 shadow-sm hover:shadow-xl transition-all ${
        isIrregularVerb 
          ? 'bg-rose-50/30 border-rose-100 hover:border-rose-200' 
          : isSpecial 
            ? 'bg-indigo-50/20 border-indigo-100 hover:border-indigo-200' 
            : 'bg-white border-gray-100 hover:border-indigo-100'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-4 flex-1">
          <div className="flex flex-wrap items-center gap-4">
            <h3 className={`text-3xl font-black tracking-tight transition-colors flex items-baseline gap-2 ${
              isIrregularVerb ? 'text-rose-600' : 'group-hover:text-indigo-600'
            }`}>
              <span>{entry.word}</span>
              {khmerTranslation && (
                <span className="text-xl font-medium text-gray-400 dark:text-zinc-500 font-sans">
                  ({khmerTranslation})
                </span>
              )}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-mono text-gray-400 bg-white/50 px-2 py-1 rounded-lg border border-gray-100 shadow-sm">{entry.ipa}</span>
              <span className={`text-xs font-bold italic uppercase tracking-wider ${
                isIrregularVerb ? 'text-rose-500' : 'text-indigo-500'
              }`}>
                {entry.partOfSpeech}
              </span>
              {entry.isIrregular && (
                <span className="text-[10px] font-black bg-rose-600 text-white px-2 py-1 rounded-lg shadow-sm uppercase tracking-tighter">Irregular</span>
              )}
              {!entry.isIrregular && entry.variant && (
                <span className="text-[10px] font-black bg-indigo-600 text-white px-2 py-1 rounded-lg shadow-sm uppercase tracking-tighter">Special Case</span>
              )}
              {letter && (
                <span className="text-[10px] font-black bg-white border border-gray-100 text-gray-400 px-2 py-1 rounded-lg shadow-sm uppercase tracking-widest">{letter}</span>
              )}
            </div>
            <button 
              onClick={() => speak(entry.word)}
              className={`p-2 rounded-full transition-all ${
                isIrregularVerb 
                  ? 'text-rose-300 hover:text-rose-600 hover:bg-rose-100' 
                  : 'text-gray-300 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <Volume2 size={24} />
            </button>
          </div>
          
          <p className={`text-xl md:text-2xl leading-tight font-medium border-l-4 pl-6 py-1 ${
            isIrregularVerb ? 'text-rose-900 border-rose-200' : 'text-gray-700 border-indigo-100'
          }`}>
            {entry.definition}
          </p>

          {entry.origin && (
            <div className="flex items-center gap-2 text-xs text-gray-400 italic mb-4">
              <span className="font-bold uppercase tracking-widest text-[10px] not-italic text-gray-300">Origin:</span>
              {entry.origin}
            </div>
          )}

          <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100/50">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Example usage</p>
            <p className="text-lg italic text-gray-600 leading-relaxed font-serif">
              <ExampleText text={entry.example} />
            </p>
          </div>

          {/* Related Words */}
          {(entry.synonyms?.length || entry.antonyms?.length) && (
            <div className="flex flex-wrap gap-8 mt-4 pt-4 border-t border-gray-100">
              {entry.synonyms && entry.synonyms.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Synonyms</p>
                  <div className="flex flex-wrap gap-2">
                    {entry.synonyms.map(s => (
                      <button 
                        key={s} 
                        onClick={() => onSearch(s)}
                        className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl hover:bg-indigo-100 transition-colors border border-indigo-100/50 shadow-sm"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {entry.antonyms && entry.antonyms.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-rose-400">Antonyms</p>
                  <div className="flex flex-wrap gap-2">
                    {entry.antonyms.map(a => (
                      <button 
                        key={a} 
                        onClick={() => onSearch(a)}
                        className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl hover:bg-rose-100 transition-colors border border-rose-100/50 shadow-sm"
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {entry.variant && (
          <div className={`${entry.isIrregular ? 'bg-rose-50/50 border-rose-100/50' : 'bg-orange-50/50 border-orange-100/50'} border px-4 py-2 rounded-2xl self-start min-w-[120px]`}>
             <p className={`text-[10px] font-black uppercase ${entry.isIrregular ? 'text-rose-600/60' : 'text-orange-600/60'} mb-0.5`}>
               {entry.isIrregular ? 'Verb Forms' : 'Note'}
             </p>
             <p className={`text-xs font-bold ${entry.isIrregular ? 'text-rose-800' : 'text-orange-800'}`}>{entry.variant}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function DictionaryIrregularView({ data, onBack, onSearch, speak }: { data: any[], onBack: () => void, onSearch: (q: string) => void, speak: (t: string) => void }) {
  if (!data || !Array.isArray(data)) {
    return (
      <div className="max-w-4xl mx-auto space-y-12 pb-24 text-center p-12">
        <p className="text-gray-500 font-medium">Looking up irregular verb configurations...</p>
        <button onClick={onBack} className="mt-4 px-6 py-2 bg-[#1A1A1A] text-white rounded-xl font-bold">Back</button>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      <div className="space-y-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-rose-600 font-bold uppercase tracking-widest text-xs transition-colors"
        >
          <ArrowLeft size={16} /> Back to Dictionary
        </button>

        <div className="space-y-2">
          <div className="flex items-baseline gap-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-rose-600">Irregular Verbs</h2>
            <div className="bg-rose-100 text-rose-600 px-4 py-1.5 rounded-2xl text-xl font-black shadow-sm border border-rose-200">
              {data.length}
            </div>
          </div>
          <p className="text-gray-400 font-medium max-w-lg">Master the idiosyncratic patterns of English verbs that defy the standard -ed past tense rules.</p>
        </div>
      </div>

      <div className="space-y-6">
        {data.map((item, i) => (
          <DictionaryWordCard 
            key={`${item.word}_${i}`}
            entry={item.data}
            index={i}
            speak={speak}
            onSearch={onSearch}
            letter={item.letter}
          />
        ))}
      </div>
    </div>
  );
}

function DictionaryLetterView({ data, onSelectLetter, onSearch, speak }: { data: DictionaryLetterSet, onSelectLetter: (l: string) => void, onSearch: (q: string) => void, speak: (t: string) => void }) {
  const [posFilter, setPosFilter] = useState<string>('All');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  if (!data || !data.words || !Array.isArray(data.words)) {
    return (
      <div className="max-w-4xl mx-auto space-y-12 pb-24 text-center p-12">
        <div className="space-y-4">
          <p className="text-gray-500 font-medium">Looking up vocabulary records...</p>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
            {alphabet.map(letter => (
              <button
                key={letter}
                onClick={() => {
                  onSelectLetter(letter);
                  setPosFilter('All');
                }}
                className="min-w-[40px] h-10 flex items-center justify-center font-black rounded-xl text-gray-400 hover:bg-gray-100 hover:text-[#1A1A1A] transition-all"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const partsOfSpeech = ['All', 'Irregular Verbs', ...Array.from(new Set(data.words.map(w => w.partOfSpeech.toLowerCase()))).sort()];

  const filteredWords = posFilter === 'All' 
    ? data.words 
    : posFilter === 'Irregular Verbs'
      ? data.words.filter(w => w.isIrregular)
      : data.words.filter(w => w.partOfSpeech.toLowerCase() === posFilter);
  
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      <div className="sticky top-0 bg-[#FDFCFB]/80 backdrop-blur-md py-4 z-20 border-b border-gray-100 -mx-6 px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <DictionarySearchInput onSearch={onSearch} variant="small" />

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {alphabet.map(letter => (
              <button
                key={letter}
                onClick={() => {
                  onSelectLetter(letter);
                  setPosFilter('All');
                }}
                className={`min-w-[40px] h-10 flex items-center justify-center font-black rounded-xl transition-all ${data.letter === letter ? 'bg-[#1A1A1A] text-white shadow-lg scale-110' : 'text-gray-400 hover:bg-gray-100 hover:text-[#1A1A1A]'}`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-indigo-600">{data.letter}</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Essential Vocabulary • {data.words.length} Entries</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {partsOfSpeech.map(pos => {
            const isIrregularOption = pos === 'Irregular Verbs';
            const isActive = posFilter === pos;
            
            return (
              <button
                key={pos}
                onClick={() => setPosFilter(pos)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-tight transition-all border ${
                  isActive 
                    ? isIrregularOption
                      ? 'bg-rose-600 text-white border-rose-600 shadow-lg shadow-rose-500/20 scale-105'
                      : 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20 scale-105' 
                    : isIrregularOption
                      ? 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100'
                      : 'bg-white text-gray-400 border-gray-100 hover:border-indigo-100 hover:text-indigo-600'
                }`}
              >
                {pos}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        {filteredWords.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-200 rounded-[2.5rem] p-12 text-center">
            <p className="text-gray-400 font-medium">No {posFilter} entries found for letter {data.letter}</p>
          </div>
        ) : (
          filteredWords.map((entry, i) => (
            <DictionaryWordCard 
              key={`${entry.word}_${i}`}
              entry={entry}
              index={i}
              speak={speak}
              onSearch={onSearch}
            />
          ))
        )}
      </div>
    </div>
  );
}

function DrillView({ data, onBack, onComplete }: { data: DrillSet, onBack: () => void, onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [reorderedWords, setReorderedWords] = useState<string[]>([]);
  const [selectedStructure, setSelectedStructure] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [scores, setScores] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  // Drag & drop + tap swap states
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);

  // New states for interactive Drag and Drop Sentence Builder
  const [wordBank, setWordBank] = useState<{ id: string; text: string; isUsed: boolean }[]>([]);
  const [answerWords, setAnswerWords] = useState<{ id: string; text: string }[]>([]);

  const hasDrills = data && data.drills && Array.isArray(data.drills) && data.drills.length > 0;
  const currentDrill = hasDrills ? data.drills[currentIndex] : null;

  useEffect(() => {
    if (currentDrill && currentDrill.type === 'reorder') {
      const options = currentDrill.options || [];
      // Generate stable, unique items for the word bank
      const initialBank = options.map((word, idx) => ({
        id: `${word}-${idx}-${Math.random().toString(36).substr(2, 4)}`,
        text: word,
        isUsed: false
      }));
      // Shuffle the bank
      const shuffledBank = [...initialBank].sort(() => Math.random() - 0.5);
      setWordBank(shuffledBank);
      setAnswerWords([]);
      setReorderedWords([]);
    }
    setUserInput('');
    setSelectedStructure(null);
    setShowFeedback(false);
    setShowHint(false);
    setDraggedIndex(null);
    setSelectedWordIndex(null);
  }, [currentIndex, currentDrill]);

  // Click/tap interaction (Duolingo-style)
  const handleWordBankClick = (item: { id: string, text: string }) => {
    if (showFeedback) return;
    setWordBank(prev => prev.map(w => w.id === item.id ? { ...w, isUsed: true } : w));
    setAnswerWords(prev => [...prev, item]);
  };

  const handleAnswerWordClick = (item: { id: string, text: string }) => {
    if (showFeedback) return;
    setWordBank(prev => prev.map(w => w.id === item.id ? { ...w, isUsed: false } : w));
    setAnswerWords(prev => prev.filter(w => w.id !== item.id));
  };

  // Drag-and-drop: Word from Bank to Tray
  const handleBankWordDragStart = (e: React.DragEvent, item: { id: string, text: string }) => {
    if (showFeedback) return;
    e.dataTransfer.setData("text/plain", JSON.stringify({ type: "bank", item }));
  };

  // Drag-and-drop: Word inside Tray (reorder)
  const handleTrayWordDragStart = (e: React.DragEvent, index: number) => {
    if (showFeedback) return;
    e.dataTransfer.setData("text/plain", JSON.stringify({ type: "tray", index }));
    setDraggedIndex(index);
  };

  const handleTrayDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleTrayDrop = (e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault();
    if (showFeedback) return;
    try {
      const rawData = e.dataTransfer.getData("text/plain");
      if (!rawData) return;
      const parsed = JSON.parse(rawData);

      if (parsed.type === "bank") {
        const { item } = parsed;
        if (wordBank.find(w => w.id === item.id)?.isUsed) return;

        setWordBank(prev => prev.map(w => w.id === item.id ? { ...w, isUsed: true } : w));
        setAnswerWords(prev => {
          const updated = [...prev];
          if (typeof targetIndex === "number") {
            updated.splice(targetIndex, 0, item);
          } else {
            updated.push(item);
          }
          return updated;
        });
      } else if (parsed.type === "tray") {
        const fromIndex = parsed.index;
        if (typeof fromIndex === "number" && typeof targetIndex === "number" && fromIndex !== targetIndex) {
          setAnswerWords(prev => {
            const updated = [...prev];
            const [moved] = updated.splice(fromIndex, 1);
            updated.splice(targetIndex, 0, moved);
            return updated;
          });
        }
      }
    } catch (err) {
      console.error("Drop failed:", err);
    }
    setDraggedIndex(null);
  };

  const checkAnswer = () => {
    if (!currentDrill) return;
    let correct = false;
    if (currentDrill.type === 'fill_blanks') {
      const cleanInput = userInput.trim().toLowerCase().replace(/[.,!?;]$/, '');
      const reconstructed = (currentDrill.blanks || []).join(userInput.trim());
      const cleanReconstructed = reconstructed.toLowerCase().replace(/\s+/g, ' ').replace(/[.,!?;]$/, '');
      const cleanFullSolution = currentDrill.solution.toLowerCase().replace(/\s+/g, ' ').replace(/[.,!?;]$/, '');
      
      correct = cleanReconstructed === cleanFullSolution || cleanInput === cleanFullSolution;
    } else if (currentDrill.type === 'reorder') {
      const cleanAnswer = answerWords.map(w => w.text).join(' ').trim().toLowerCase().replace(/[.,!?;]$/, '');
      const cleanSolution = currentDrill.solution.trim().toLowerCase().replace(/[.,!?;]$/, '');
      correct = cleanAnswer === cleanSolution;
    } else if (currentDrill.type === 'structure') {
      correct = selectedStructure === currentDrill.solution;
    }

    setIsCorrect(correct);
    setShowFeedback(true);
    setScores(prev => [...prev, correct]);
  };

  const next = () => {
    if (!data || !data.drills) return;
    if (currentIndex < data.drills.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setFinished(true);
      onComplete();
    }
  };

  if (!hasDrills || !currentDrill) {
    return (
      <div className="p-12 text-center text-gray-500 font-medium space-y-4">
        <p>This practice set is temporarily unavailable or contains format irregularities.</p>
        <button onClick={onBack} className="px-6 py-2 bg-[#1A1A1A] text-white rounded-xl font-bold hover:scale-105 active:scale-95 transition-all">Back</button>
      </div>
    );
  }

  if (finished) {
    const finalScore = scores.filter(s => s).length;
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-8">
        <div className="relative inline-block">
          <Trophy size={80} className="text-amber-400 mx-auto" />
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-[#1A1A1A] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
          >
            {finalScore}/{data.drills.length}
          </motion.div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-black">Drills Completed!</h2>
          <div className="text-gray-500 font-medium inline-block">You've sharpened your skills on {formatTitleWithKhmer(data.topic, "text-gray-500 font-medium")}.</div>
        </div>
        <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto">
          {scores.map((s, i) => (
            <div key={i} className={`h-2 rounded-full ${s ? 'bg-emerald-500' : 'bg-orange-400'}`} />
          ))}
        </div>
        <button 
          onClick={onBack}
          className="px-12 py-4 bg-[#1A1A1A] text-white rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          Return to Lesson
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-[#1A1A1A] font-medium transition-colors">
          <ArrowLeft size={16} /> Exit Drills
        </button>
        <div className="flex gap-1.5">
          {data.drills.map((_, i) => (
            <div key={i} className={`w-8 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-[#1A1A1A] w-12' : i < currentIndex ? (scores[i] ? 'bg-emerald-500' : 'bg-orange-400') : 'bg-gray-100'}`} />
          ))}
        </div>
      </div>

      <div className="bg-white border-2 border-gray-100 rounded-[3rem] p-8 md:p-12 shadow-xl space-y-8 relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-50 text-indigo-600 p-2 rounded-xl">
            {currentDrill.type === 'fill_blanks' && <Layout size={20} />}
            {currentDrill.type === 'reorder' && <Shuffle size={20} />}
            {currentDrill.type === 'structure' && <CheckCircle2 size={20} />}
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">
            {currentDrill.type.replace('_', ' ')} Drill • {currentIndex + 1} of {data.drills.length}
          </span>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold leading-tight">{currentDrill.prompt}</h3>
          
          <div className="py-8 px-4 bg-gray-50 rounded-3xl border border-gray-100 min-h-[140px] flex items-center justify-center">
            {currentDrill.type === 'fill_blanks' && (
              <div className="text-xl md:text-2xl font-medium flex flex-wrap items-center justify-center gap-2 text-center leading-relaxed">
                {(currentDrill.blanks || []).map((part, i) => (
                  <span key={i} className="flex items-center gap-2">
                    {part}
                    {i < (currentDrill.blanks || []).length - 1 && (
                      <input 
                        type="text" 
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        disabled={showFeedback}
                        autoFocus
                        className={`min-w-[120px] bg-white border-2 border-dashed rounded-xl px-4 py-1 text-center focus:outline-none transition-all ${showFeedback ? (isCorrect ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-orange-500 bg-orange-50 text-orange-700') : 'border-gray-200 focus:border-indigo-500'}`}
                      />
                    )}
                  </span>
                ))}
              </div>
            )}

            {currentDrill.type === 'reorder' && (
              <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
                {/* Shuffled Word Bank */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Word Bank:</span>
                  <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 p-5 bg-gray-50/50 rounded-2xl border border-gray-100 min-h-[90px] w-full">
                    {wordBank.map((item) => {
                      if (item.isUsed) {
                        return (
                          <div 
                            key={item.id}
                            className="px-4 py-2.5 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 text-transparent font-bold select-none font-sans"
                          >
                            {item.text}
                          </div>
                        );
                      }

                      return (
                        <motion.button
                          layout
                          key={item.id}
                          draggable={!showFeedback}
                          onDragStart={(e) => handleBankWordDragStart(e, item)}
                          onClick={() => handleWordBankClick(item)}
                          className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-2xl font-bold text-gray-800 shadow-sm hover:border-indigo-300 hover:shadow-md active:scale-95 transition-all cursor-grab active:cursor-grabbing select-none"
                        >
                          {item.text}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Drag / Drop target - Answer Tray */}
                <div className="space-y-2 mt-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Your Answer:</span>
                  <div 
                    onDragOver={handleTrayDragOver}
                    onDrop={(e) => handleTrayDrop(e)}
                    className={`flex flex-wrap items-center justify-center gap-2 md:gap-3 p-6 bg-white border-2 border-dashed rounded-[2rem] min-h-[100px] w-full transition-all duration-300 relative ${
                      showFeedback
                        ? isCorrect
                          ? 'border-emerald-200 bg-emerald-50/30'
                          : 'border-orange-200 bg-orange-50/30'
                        : 'border-gray-200 hover:border-indigo-200'
                    }`}
                  >
                    {answerWords.length === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400 text-sm font-medium px-4 text-center">
                        Drag words here or tap them to build your sentence
                      </div>
                    )}

                    {answerWords.map((wordObj, i) => {
                      const isDragging = draggedIndex === i;
                      
                      return (
                        <motion.button
                          layout
                          key={wordObj.id}
                          draggable={!showFeedback}
                          onDragStart={(e) => handleTrayWordDragStart(e, i)}
                          onDragOver={handleTrayDragOver}
                          onDrop={(e) => {
                            e.stopPropagation();
                            handleTrayDrop(e, i);
                          }}
                          onClick={() => handleAnswerWordClick(wordObj)}
                          className={`px-4 py-2.5 bg-white border-2 rounded-2xl font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-grab active:cursor-grabbing select-none ${
                            showFeedback
                              ? isCorrect
                                ? 'border-emerald-200 text-emerald-700 bg-emerald-50'
                                : 'border-orange-200 text-orange-700 bg-orange-50'
                              : isDragging
                              ? 'opacity-40 scale-95 border-dashed border-indigo-200 bg-indigo-50/50'
                              : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
                          }`}
                        >
                          <span className="text-gray-800">{wordObj.text}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {!showFeedback && (
                  <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1.5 font-medium">
                    <span>💡</span>
                    <span>Drag & drop words into the answer box, or tap them to move them back and forth!</span>
                  </p>
                )}
              </div>
            )}

            {currentDrill.type === 'structure' && (
              <div className="grid grid-cols-1 gap-3 w-full max-w-xl">
                {(currentDrill.options || []).map((opt, i) => (
                  <button 
                    key={i}
                    disabled={showFeedback}
                    onClick={() => setSelectedStructure(opt)}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-bold transition-all ${
                      selectedStructure === opt 
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                        : 'border-gray-100 hover:bg-gray-100'
                    } ${showFeedback && opt === currentDrill.solution ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : ''}
                    ${showFeedback && selectedStructure === opt && opt !== currentDrill.solution ? 'border-orange-500 bg-orange-50 text-orange-700' : ''}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showFeedback && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`p-6 rounded-[2rem] border ${isCorrect ? 'bg-emerald-50 border-emerald-100' : 'bg-orange-50 border-orange-100'}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full ${isCorrect ? 'bg-emerald-500' : 'bg-orange-500'} text-white`}>
                  {isCorrect ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                </div>
                <div className="space-y-1">
                  <p className={`font-black text-lg ${isCorrect ? 'text-emerald-700' : 'text-orange-700'}`}>
                    {isCorrect ? 'Brilliant!' : 'Not quite right'}
                  </p>
                  {!isCorrect && (
                    <div className="space-y-2 pt-2">
                       <p className="text-orange-600 font-medium">Correct structure:</p>
                       <p className="text-orange-800 font-bold text-lg">{currentDrill.solution}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          {!showFeedback ? (
            <>
              <button 
                onClick={checkAnswer}
                disabled={(currentDrill.type === 'fill_blanks' && !userInput) || (currentDrill.type === 'structure' && !selectedStructure)}
                className="flex-1 py-4 bg-[#1A1A1A] text-white rounded-2xl font-bold text-lg hover:scale-[1.01] transition-all disabled:opacity-30 shadow-lg"
              >
                Check Answer
              </button>
              <button 
                onClick={() => setShowHint(!showHint)}
                className="px-6 py-4 bg-gray-50 text-gray-500 rounded-2xl font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
              >
                {showHint ? <MessageSquare size={18} /> : <Star size={18} />} Hint
              </button>
            </>
          ) : (
            <button 
              onClick={next}
              className="w-full py-4 bg-[#1A1A1A] text-white rounded-2xl font-bold text-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              {currentIndex < data.drills.length - 1 ? 'Next Drill' : 'Finish Session'} <ChevronRight size={20} />
            </button>
          )}
        </div>

        <AnimatePresence>
          {showHint && !showFeedback && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-50 border border-amber-100 p-4 rounded-2xl space-y-2 mt-4"
            >
              <p className="text-xs font-black uppercase text-amber-600">Hints</p>
              <ul className="list-disc list-inside text-sm text-amber-800/70 space-y-1">
                {(currentDrill.hints || []).map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

