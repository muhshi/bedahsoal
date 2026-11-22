import { describe, it, expect } from 'vitest';
import {
  calculateExamScore,
  BKNScoringStrategy,
  NegativeMarkingStrategy,
  StandardSumStrategy,
} from '../src/lib/scoring-engine';

describe('Scoring Engine Strategies', () => {
  it('calculates official BKN SKD score with TWK, TIU (+5/0) and TKP (1-5) and passing grade', () => {
    const questions = [
      { id: 'q1', category: 'TWK', correctKey: 'A', options: [{ key: 'A', score: 5 }, { key: 'B', score: 0 }] },
      { id: 'q2', category: 'TIU', correctKey: 'C', options: [{ key: 'C', score: 5 }, { key: 'D', score: 0 }] },
      { id: 'q3', category: 'TKP', correctKey: null, options: [{ key: 'A', score: 5 }, { key: 'B', score: 3 }, { key: 'C', score: 1 }] },
    ];

    const answers = {
      q1: { selectedKey: 'A' }, // 5
      q2: { selectedKey: 'D' }, // 0
      q3: { selectedKey: 'B' }, // 3
    };

    const criteria = { minTWK: 5, minTIU: 5, minTKP: 3 };
    const result = BKNScoringStrategy.calculate(questions, answers, criteria);

    expect(result.subtestScores).toEqual({ TWK: 5, TIU: 0, TKP: 3 });
    expect(result.totalScore).toBe(8);
    expect(result.isPassed).toBe(false); // TIU 0 < minTIU 5
  });

  it('calculates Negative Marking (Math Olympiad / UTBK): Correct +4, Wrong -1, Empty 0', () => {
    const questions = [
      { id: 'm1', category: 'Aljabar', correctKey: 'A', options: [{ key: 'A', score: 4 }, { key: 'B', score: 0 }] },
      { id: 'm2', category: 'Geometri', correctKey: 'B', options: [{ key: 'A', score: 0 }, { key: 'B', score: 4 }] },
      { id: 'm3', category: 'Kombinatorika', correctKey: 'C', options: [{ key: 'A', score: 0 }, { key: 'C', score: 4 }] },
    ];

    const answers = {
      m1: { selectedKey: 'A' }, // Benar: +4
      m2: { selectedKey: 'A' }, // Salah: -1
      m3: { selectedKey: null }, // Kosong: 0
    };

    const config = { correctScore: 4, wrongScore: -1, emptyScore: 0 };
    const result = NegativeMarkingStrategy.calculate(questions, answers, config);

    expect(result.totalScore).toBe(3); // 4 - 1 + 0 = 3
    expect(result.subtestScores).toEqual({ Aljabar: 4, Geometri: -1, Kombinatorika: 0 });
  });

  it('calculates Negative Marking even when config keys are { correct, wrong, empty } without NaN', () => {
    const questions = [
      { id: 'm1', category: 'Aljabar', correctKey: 'A', options: [{ key: 'A', score: 4 }, { key: 'B', score: 0 }] },
      { id: 'm2', category: 'Geometri', correctKey: 'B', options: [{ key: 'A', score: 0 }, { key: 'B', score: 4 }] },
    ];
    const answers = {
      m1: { selectedKey: 'A' },
      m2: { selectedKey: 'X' },
    };
    const rawConfig = { correct: 4, wrong: -1, empty: 0 };
    const result = NegativeMarkingStrategy.calculate(questions, answers, rawConfig as any);
    expect(result.totalScore).toBe(3);
    expect(isNaN(result.totalScore)).toBe(false);
  });

  it('calculates Standard Sum (LPDP TBS / General Tests)', () => {
    const questions = [
      { id: 'l1', category: 'Penalaran Verbal', correctKey: 'A', options: [{ key: 'A', score: 1 }, { key: 'B', score: 0 }] },
      { id: 'l2', category: 'Penalaran Numerik', correctKey: 'B', options: [{ key: 'A', score: 0 }, { key: 'B', score: 1 }] },
    ];

    const answers = {
      l1: { selectedKey: 'A' },
      l2: { selectedKey: 'A' },
    };

    const result = StandardSumStrategy.calculate(questions, answers);
    expect(result.totalScore).toBe(1);
    expect(result.subtestScores).toEqual({ 'Penalaran Verbal': 1, 'Penalaran Numerik': 0 });
  });

  it('calculates score via facade calculateExamScore', () => {
    const questions = [
      { id: 'q1', category: 'TWK', correctKey: 'A', options: [{ key: 'A', score: 5 }, { key: 'B', score: 0 }] },
    ];
    const answers = {
      q1: { selectedKey: 'A' },
    };
    const result = calculateExamScore('SKD_CPNS', questions, answers);
    expect(result.totalScore).toBe(5);
  });
});
