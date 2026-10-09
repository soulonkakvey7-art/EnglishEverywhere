import { QuizQuestion, CEFRLevel } from '../types';

/**
 * Strips option prefixes like "A)", "A.", "1.", "(A)", "A - ", etc.
 */
export function cleanOptionText(text: string): string {
  if (!text) return '';
  return text
    .replace(/^(\(?[A-Da-d]\)?[\).\:\-\s]+|[1-4][\).\:\-\s]+)/, '')
    .trim();
}

/**
 * Returns letter representation for an option index (0 -> 'A', 1 -> 'B', etc.)
 */
export function getOptionLetter(index: number): string {
  const letters = ['A', 'B', 'C', 'D'];
  return letters[index] || String.fromCharCode(65 + index);
}

/**
 * Generates an array of target indices (0 for A, 1 for B, 2 for C, 3 for D)
 * such that:
 * 1. For every consecutive pair i and i-1, targetIndices[i] !== targetIndices[i-1] (letter ALWAYS changes!)
 * 2. Letters are evenly balanced across the test (roughly 25% A, 25% B, 25% C, 25% D).
 */
export function generateBalancedAnswerIndices(count: number): number[] {
  if (count <= 0) return [];
  const result: number[] = [];
  let prev = -1;

  while (result.length < count) {
    // Permutation block of [0, 1, 2, 3] representing letters A, B, C, D
    const block = [0, 1, 2, 3];
    // Fisher-Yates shuffle
    for (let i = block.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [block[i], block[j]] = [block[j], block[i]];
    }

    // Ensure first element of this block does not match the previous block's ending element
    if (prev !== -1 && block[0] === prev) {
      // Swap block[0] with any of [1, 2, 3] to guarantee block[0] !== prev
      const swapIdx = Math.floor(Math.random() * 3) + 1;
      [block[0], block[swapIdx]] = [block[swapIdx], block[0]];
    }

    for (const idx of block) {
      if (result.length < count) {
        result.push(idx);
        prev = idx;
      }
    }
  }

  return result;
}

/**
 * Balances and randomizes quiz options so that:
 * - Hardcoded letter prefixes (e.g. "A) ") are removed from options and correctAnswer.
 * - Options are shuffled such that the correct answer is placed at a designated rotating target position.
 * - The letter of the correct answer ALWAYS changes between consecutive questions (never repeats consecutively).
 * - Letters A, B, C, D are evenly distributed across the entire test (~25% each, not always A, B, C, or D).
 */
export function balanceQuizOptions(questions: QuizQuestion[]): QuizQuestion[] {
  if (!Array.isArray(questions) || questions.length === 0) return [];

  const targetIndices = generateBalancedAnswerIndices(questions.length);

  return questions.map((q, qIdx) => {
    const rawCorrect = cleanOptionText(q.correctAnswer);
    const cleanedOptions = (q.options || []).map(cleanOptionText).filter(Boolean);

    // Find if the correct answer exists among the cleaned options
    let correctIdx = cleanedOptions.findIndex(
      opt => opt.toLowerCase() === rawCorrect.toLowerCase()
    );

    let actualCorrectText = rawCorrect;
    if (correctIdx !== -1) {
      actualCorrectText = cleanedOptions[correctIdx];
    } else if (cleanedOptions.length > 0) {
      // If correct answer text wasn't in options, use the first option as fallback or keep raw
      actualCorrectText = rawCorrect || cleanedOptions[0];
    }

    // Extract distractors (options other than the correct answer)
    let distractors = cleanedOptions.filter(
      (opt, idx) => idx !== correctIdx && opt.toLowerCase() !== actualCorrectText.toLowerCase()
    );

    // Deduplicate distractors
    distractors = Array.from(new Set(distractors));

    // Provide contextual fallback distractors if fewer than 3 distractors exist
    const fallbackDistractors = [
      'None of the choices provided',
      'Both alternatives are grammatically acceptable',
      'Neither choice is grammatically accurate',
      'Context-dependent grammatical variant'
    ];
    let fbIdx = 0;
    while (distractors.length < 3) {
      const candidate = fallbackDistractors[fbIdx % fallbackDistractors.length];
      if (!distractors.includes(candidate) && candidate.toLowerCase() !== actualCorrectText.toLowerCase()) {
        distractors.push(candidate);
      }
      fbIdx++;
    }

    // Pick 3 distractors and shuffle them
    distractors = distractors.slice(0, 3);
    for (let i = distractors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [distractors[i], distractors[j]] = [distractors[j], distractors[i]];
    }

    // Target position for the correct answer (0: A, 1: B, 2: C, 3: D)
    const targetPos = targetIndices[qIdx] % 4;

    // Assemble the 4 options
    const finalOptions: string[] = [];
    let distractorPointer = 0;
    for (let pos = 0; pos < 4; pos++) {
      if (pos === targetPos) {
        finalOptions.push(actualCorrectText);
      } else {
        finalOptions.push(distractors[distractorPointer] || `Alternative option ${pos + 1}`);
        distractorPointer++;
      }
    }

    return {
      ...q,
      question: q.question,
      options: finalOptions,
      correctAnswer: actualCorrectText,
      explanation: q.explanation,
      level: q.level,
      difficulty: q.difficulty
    };
  });
}
