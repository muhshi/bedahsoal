import { describe, it, expect, beforeEach } from 'vitest';
import {
  isOptionSelected,
  isValidNumericValue,
} from '../src/components/exam/QuestionViewer';
import { useExamStore } from '../src/stores/use-exam-store';
import { ClientQuestionDTO } from '../src/types/exam';

describe('QuestionViewer logic & store integration', () => {
  const mockQuestions: ClientQuestionDTO[] = [
    {
      id: 'q1',
      orderNumber: 1,
      category: 'TIU',
      subTopic: 'Silogisme',
      questionType: 'MULTIPLE_CHOICE',
      text: 'Semua mamalia bernapas dengan paru-paru.',
      options: [
        { id: 'opt1', key: 'A', text: 'Paus adalah mamalia' },
        { id: 'opt2', key: 'B', text: 'Ikan bertelur' },
      ],
    },
    {
      id: 'q2',
      orderNumber: 2,
      category: 'Aljabar',
      subTopic: 'Persamaan Kuadrat',
      questionType: 'NUMERIC_INPUT',
      text: 'Tentukan nilai $x$ jika $x^2 - 16 = 0$ dan $x > 0$.',
      options: [],
    },
  ];

  beforeEach(() => {
    useExamStore.getState().initExam({
      sessionId: 'session-123',
      title: 'Simulasi TIU & Matematika',
      mode: 'SIMULASI',
      deadline: new Date(Date.now() + 3600000).toISOString(),
      serverTime: new Date().toISOString(),
      questions: mockQuestions,
    });
  });

  it('correctly validates option selection state', () => {
    expect(isOptionSelected('opt1', 'opt1')).toBe(true);
    expect(isOptionSelected('opt1', 'opt2')).toBe(false);
    expect(isOptionSelected(null, 'opt1')).toBe(false);
    expect(isOptionSelected(undefined, 'opt1')).toBe(false);
  });

  it('correctly validates numeric input strings', () => {
    expect(isValidNumericValue('42')).toBe(true);
    expect(isValidNumericValue('-15')).toBe(true);
    expect(isValidNumericValue('3.1415')).toBe(true);
    expect(isValidNumericValue('-0.75')).toBe(true);
    expect(isValidNumericValue('0')).toBe(true);

    expect(isValidNumericValue('')).toBe(false);
    expect(isValidNumericValue('   ')).toBe(false);
    expect(isValidNumericValue('abc')).toBe(false);
    expect(isValidNumericValue('12a')).toBe(false);
    expect(isValidNumericValue(null)).toBe(false);
    expect(isValidNumericValue(undefined)).toBe(false);
  });

  it('navigates instantly across questions using store', () => {
    expect(useExamStore.getState().currentIndex).toBe(0);

    useExamStore.getState().goToNextQuestion();
    expect(useExamStore.getState().currentIndex).toBe(1);

    // Cannot go beyond last question
    useExamStore.getState().goToNextQuestion();
    expect(useExamStore.getState().currentIndex).toBe(1);

    useExamStore.getState().goToPrevQuestion();
    expect(useExamStore.getState().currentIndex).toBe(0);

    // Cannot go before first question
    useExamStore.getState().goToPrevQuestion();
    expect(useExamStore.getState().currentIndex).toBe(0);
  });

  it('handles multiple choice answer and toggle doubt', () => {
    const q1 = mockQuestions[0];
    useExamStore.getState().selectOption(q1.id, 'opt1');
    expect(useExamStore.getState().answers[q1.id]?.selectedOptionId).toBe('opt1');

    useExamStore.getState().toggleDoubt(q1.id);
    expect(useExamStore.getState().answers[q1.id]?.isDoubt).toBe(true);

    useExamStore.getState().toggleDoubt(q1.id);
    expect(useExamStore.getState().answers[q1.id]?.isDoubt).toBe(false);
  });

  it('handles numeric input answer for olympiad question', () => {
    const q2 = mockQuestions[1];
    useExamStore.getState().setNumericAnswer(q2.id, '4');
    expect(useExamStore.getState().answers[q2.id]?.numericAnswer).toBe('4');

    useExamStore.getState().setNumericAnswer(q2.id, null);
    expect(useExamStore.getState().answers[q2.id]?.numericAnswer).toBeNull();
  });
});
