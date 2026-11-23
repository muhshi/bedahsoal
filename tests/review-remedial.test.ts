import { describe, it, expect } from 'vitest';
import {
  getRemedialQuestions,
  isDrillAnswerCorrect,
} from '../src/components/exam/ExamReviewViewer';
import { QuestionReviewDTO } from '../src/types/exam';

describe('getRemedialQuestions', () => {
  it('filters questions that were answered incorrectly or unanswered', () => {
    const mockQuestions: QuestionReviewDTO[] = [
      {
        id: 'q1',
        orderNumber: 1,
        category: 'TIU',
        subTopic: 'Deret',
        questionType: 'MULTIPLE_CHOICE',
        text: 'Soal 1',
        options: [{ id: 'opt1', key: 'A', text: 'Opt A', score: 5, isCorrect: true }],
        correctOptionKey: 'A',
        explanation: 'Penjelasan 1',
        userAnswer: { selectedOptionId: 'opt1', isCorrect: true, scoreAwarded: 5, isDoubt: false },
      },
      {
        id: 'q2',
        orderNumber: 2,
        category: 'TIU',
        subTopic: 'Silogisme',
        questionType: 'MULTIPLE_CHOICE',
        text: 'Soal 2',
        options: [{ id: 'opt2', key: 'B', text: 'Opt B', score: 0, isCorrect: false }],
        correctOptionKey: 'A',
        explanation: 'Penjelasan 2',
        userAnswer: { selectedOptionId: 'opt2', isCorrect: false, scoreAwarded: 0, isDoubt: false },
      },
    ];

    const result = getRemedialQuestions(mockQuestions);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('q2');
  });

  it('includes unanswered questions in remedial drill', () => {
    const mockQuestions: QuestionReviewDTO[] = [
      {
        id: 'q1',
        orderNumber: 1,
        category: 'TIU',
        questionType: 'MULTIPLE_CHOICE',
        text: 'Soal 1',
        options: [{ id: 'opt1', key: 'A', text: 'Opt A', score: 5, isCorrect: true }],
        explanation: 'Penjelasan 1',
        userAnswer: undefined,
      },
      {
        id: 'q2',
        orderNumber: 2,
        category: 'TIU',
        questionType: 'MULTIPLE_CHOICE',
        text: 'Soal 2',
        options: [{ id: 'opt2', key: 'B', text: 'Opt B', score: 5, isCorrect: true }],
        explanation: 'Penjelasan 2',
        userAnswer: { selectedOptionId: null, numericAnswer: null, isCorrect: false, scoreAwarded: 0 },
      },
    ];

    const result = getRemedialQuestions(mockQuestions);
    expect(result).toHaveLength(2);
  });

  it('includes doubt questions in remedial drill even if marked correct', () => {
    const mockQuestions: QuestionReviewDTO[] = [
      {
        id: 'q1',
        orderNumber: 1,
        category: 'TWK',
        questionType: 'MULTIPLE_CHOICE',
        text: 'Soal TWK',
        options: [{ id: 'opt1', key: 'A', text: 'Opt A', score: 5, isCorrect: true }],
        userAnswer: { selectedOptionId: 'opt1', isCorrect: true, scoreAwarded: 5, isDoubt: true },
      },
    ];

    const result = getRemedialQuestions(mockQuestions);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('q1');
  });

  it('returns empty array when all questions are correct without doubt', () => {
    const mockQuestions: QuestionReviewDTO[] = [
      {
        id: 'q1',
        orderNumber: 1,
        category: 'TWK',
        questionType: 'MULTIPLE_CHOICE',
        text: 'Soal TWK',
        options: [{ id: 'opt1', key: 'A', text: 'Opt A', score: 5, isCorrect: true }],
        userAnswer: { selectedOptionId: 'opt1', isCorrect: true, scoreAwarded: 5, isDoubt: false },
      },
    ];

    const result = getRemedialQuestions(mockQuestions);
    expect(result).toHaveLength(0);
  });
});

describe('isDrillAnswerCorrect', () => {
  const question: QuestionReviewDTO = {
    id: 'q1',
    orderNumber: 1,
    category: 'TIU',
    questionType: 'MULTIPLE_CHOICE',
    text: 'Hitung $2 + 2$',
    options: [
      { id: 'opt1', key: 'A', text: '3', score: 0, isCorrect: false },
      { id: 'opt2', key: 'B', text: '4', score: 5, isCorrect: true },
    ],
  };

  it('validates correct option correctly', () => {
    expect(isDrillAnswerCorrect(question, 'opt2')).toBe(true);
    expect(isDrillAnswerCorrect(question, 'opt1')).toBe(false);
    expect(isDrillAnswerCorrect(question, 'non-existent')).toBe(false);
  });
});
