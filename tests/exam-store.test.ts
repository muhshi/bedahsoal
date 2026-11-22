import { describe, it, expect, beforeEach } from 'vitest';
import { useExamStore } from '../src/stores/use-exam-store';

describe('useExamStore', () => {
  beforeEach(() => {
    useExamStore.getState().initExam({
      sessionId: 'sess-1',
      tryoutId: 'try-1',
      title: 'Olimpiade Matematika & Sains',
      mode: 'SIMULASI',
      deadline: new Date(Date.now() + 60000).toISOString(),
      serverTime: new Date().toISOString(),
      questions: [
        {
          id: 'q1',
          orderNumber: 1,
          category: 'Aljabar',
          questionType: 'MULTIPLE_CHOICE',
          text: 'Berapakah nilai dari $\\lim_{x \\to 0} \\frac{\\sin x}{x}$?',
          options: [{ id: 'opt1', key: 'A', text: '1' }, { id: 'opt2', key: 'B', text: '0' }],
        },
        {
          id: 'q2',
          orderNumber: 2,
          category: 'Geometri',
          questionType: 'NUMERIC_INPUT',
          text: 'Hitung luas segitiga dengan alas 10 dan tinggi 6.',
          options: [],
        },
      ],
    });
  });

  it('selects and deselects multiple choice options', () => {
    useExamStore.getState().selectOption('q1', 'opt1');
    expect(useExamStore.getState().answers['q1']?.selectedOptionId).toBe('opt1');

    // Deselect
    useExamStore.getState().selectOption('q1', 'opt1');
    expect(useExamStore.getState().answers['q1']?.selectedOptionId).toBeNull();
  });

  it('records numeric answers for olympiad questions', () => {
    useExamStore.getState().setNumericAnswer('q2', '30');
    expect(useExamStore.getState().answers['q2']?.numericAnswer).toBe('30');
  });

  it('extracts unique subtest categories from question list', () => {
    const subtests = useExamStore.getState().getSubtests();
    expect(subtests).toEqual(['Aljabar', 'Geometri']);
  });
});
