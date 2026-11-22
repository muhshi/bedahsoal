import { describe, it, expect } from 'vitest';
import { ExamReviewDTO, QuestionReviewDTO } from '@/types/exam';

describe('Review DTO Types', () => {
  it('should allow constructing a valid ExamReviewDTO with explanations and user answers', () => {
    const mockQuestionReview: QuestionReviewDTO = {
      id: 'q-1',
      orderNumber: 1,
      category: 'TIU',
      subTopic: 'Silogisme',
      questionType: 'MULTIPLE_CHOICE',
      text: 'Semua A adalah B. Sebagian B adalah C.',
      options: [
        { id: 'opt-a', key: 'A', text: 'Semua A adalah C', score: 0, isCorrect: false },
        { id: 'opt-b', key: 'B', text: 'Sebagian A adalah C', score: 5, isCorrect: true },
      ],
      explanation: 'Karena A adalah bagian dari B, dan sebagian B adalah C, maka...',
      userAnswer: {
        selectedOptionId: 'opt-b',
        scoreAwarded: 5,
        isCorrect: true,
      },
    };

    const mockReview: ExamReviewDTO = {
      sessionId: 'sess-123',
      tryoutId: 'tryout-1',
      title: 'Simulasi TIU Review',
      mode: 'SIMULASI',
      totalScore: 5,
      totalQuestions: 1,
      totalCorrect: 1,
      totalWrong: 0,
      totalUnanswered: 0,
      startedAt: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
      questions: [mockQuestionReview],
    };

    expect(mockReview.sessionId).toBe('sess-123');
    expect(mockReview.questions[0].explanation).toBeDefined();
    expect(mockReview.questions[0].userAnswer?.isCorrect).toBe(true);
  });
});
