import { describe, it, expect } from 'vitest';
import {
  getQuestionStatus,
  calculatePaletteStats,
  filterQuestionsBySubtest,
} from '../src/components/exam/QuestionPalette';
import { ClientQuestionDTO } from '../src/types/exam';

describe('QuestionPalette logic', () => {
  const mockQuestions: ClientQuestionDTO[] = [
    {
      id: 'q1',
      orderNumber: 1,
      category: 'TWK',
      questionType: 'MULTIPLE_CHOICE',
      text: 'Soal 1',
      options: [],
    },
    {
      id: 'q2',
      orderNumber: 2,
      category: 'TIU',
      questionType: 'MULTIPLE_CHOICE',
      text: 'Soal 2',
      options: [],
    },
    {
      id: 'q3',
      orderNumber: 3,
      category: 'TIU',
      questionType: 'NUMERIC_INPUT',
      text: 'Soal 3',
      options: [],
    },
    {
      id: 'q4',
      orderNumber: 4,
      category: 'TKP',
      questionType: 'MULTIPLE_CHOICE',
      text: 'Soal 4',
      options: [],
    },
  ];

  it('determines unanswered status correctly', () => {
    expect(getQuestionStatus(undefined)).toBe('unanswered');
    expect(getQuestionStatus({ selectedOptionId: null, numericAnswer: null, isDoubt: false })).toBe(
      'unanswered'
    );
    expect(getQuestionStatus({ selectedOptionId: null, numericAnswer: '   ', isDoubt: false })).toBe(
      'unanswered'
    );
  });

  it('determines answered status for multiple choice and numeric answers', () => {
    expect(getQuestionStatus({ selectedOptionId: 'opt-a', isDoubt: false })).toBe('answered');
    expect(getQuestionStatus({ numericAnswer: '42', isDoubt: false })).toBe('answered');
  });

  it('prioritizes doubt status when question is marked doubt', () => {
    expect(getQuestionStatus({ selectedOptionId: 'opt-a', isDoubt: true })).toBe('doubt');
    expect(getQuestionStatus({ numericAnswer: '42', isDoubt: true })).toBe('doubt');
    expect(getQuestionStatus({ isDoubt: true })).toBe('doubt');
  });

  it('calculates palette statistics accurately', () => {
    const answers = {
      q1: { selectedOptionId: 'opt-1', isDoubt: false }, // answered
      q2: { selectedOptionId: 'opt-2', isDoubt: true },  // doubt
      q3: { numericAnswer: '25', isDoubt: false },       // answered
      // q4 unanswered
    };

    const stats = calculatePaletteStats(mockQuestions, answers);
    expect(stats.total).toBe(4);
    expect(stats.answered).toBe(2);
    expect(stats.doubt).toBe(1);
    expect(stats.remaining).toBe(1);
  });

  it('filters questions by subtest tab dynamically', () => {
    const all = filterQuestionsBySubtest(mockQuestions, 'Semua');
    expect(all).toHaveLength(4);

    const tiu = filterQuestionsBySubtest(mockQuestions, 'TIU');
    expect(tiu).toHaveLength(2);
    expect(tiu.map((q) => q.id)).toEqual(['q2', 'q3']);

    const tkp = filterQuestionsBySubtest(mockQuestions, 'TKP');
    expect(tkp).toHaveLength(1);
    expect(tkp[0].id).toBe('q4');
  });
});
