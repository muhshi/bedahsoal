import { describe, it, expect } from 'vitest';
import { computeTopicDiagnostics, AnswerDiagnosticInput } from '../src/lib/diagnostics';

describe('computeTopicDiagnostics', () => {
  it('returns empty array when given no answers', () => {
    const result = computeTopicDiagnostics([]);
    expect(result).toEqual([]);
  });

  it('aggregates scores by topic and assigns correct tiers', () => {
    const mockAnswers: AnswerDiagnosticInput[] = [
      // Topic: Deret Angka (2 questions: 0/5 and 5/5 -> 50% -> critical)
      {
        category: 'TIU',
        subTopic: 'Deret Angka',
        scoreAwarded: 0,
        maxScore: 5,
      },
      {
        category: 'TIU',
        subTopic: 'Deret Angka',
        scoreAwarded: 5,
        maxScore: 5,
      },
      // Topic: Integritas (1 question: 5/5 -> 100% -> mastered)
      {
        category: 'TWK',
        subTopic: 'Integritas',
        scoreAwarded: 5,
        maxScore: 5,
      },
      // Topic: Pelayanan Publik (2 questions: 3/5 and 4/5 -> 7/10 = 70% -> moderate)
      {
        category: 'TKP',
        subTopic: 'Pelayanan Publik',
        scoreAwarded: 3,
        maxScore: 5,
      },
      {
        category: 'TKP',
        subTopic: 'Pelayanan Publik',
        scoreAwarded: 4,
        maxScore: 5,
      },
    ];

    const result = computeTopicDiagnostics(mockAnswers);

    expect(result).toHaveLength(3);
    // Should sort lowest accuracy first
    expect(result[0].topic).toBe('Deret Angka');
    expect(result[0].category).toBe('TIU');
    expect(result[0].percentage).toBe(50);
    expect(result[0].tier).toBe('critical');

    expect(result[1].topic).toBe('Pelayanan Publik');
    expect(result[1].category).toBe('TKP');
    expect(result[1].percentage).toBe(70);
    expect(result[1].tier).toBe('moderate');

    expect(result[2].topic).toBe('Integritas');
    expect(result[2].category).toBe('TWK');
    expect(result[2].percentage).toBe(100);
    expect(result[2].tier).toBe('mastered');
  });

  it('falls back to category name when subTopic is empty or null', () => {
    const mockAnswers: AnswerDiagnosticInput[] = [
      {
        category: 'TWK',
        subTopic: null,
        scoreAwarded: 2,
        maxScore: 5,
      },
    ];

    const result = computeTopicDiagnostics(mockAnswers);
    expect(result[0].topic).toBe('TWK Umum');
    expect(result[0].category).toBe('TWK');
    expect(result[0].percentage).toBe(40);
    expect(result[0].tier).toBe('critical');
  });
});
