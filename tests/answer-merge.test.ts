import { describe, expect, it } from 'vitest';
import {
  mergeAnswersByTimestamp,
  parseAnsweredAt,
} from '../src/lib/answer-merge';

type Answer = {
  value: string;
  answeredAt?: string | null;
};

describe('answer-merge helpers', () => {
  it('treats missing and invalid timestamps as oldest', () => {
    expect(parseAnsweredAt(undefined)).toBe(Number.NEGATIVE_INFINITY);
    expect(parseAnsweredAt(null)).toBe(Number.NEGATIVE_INFINITY);
    expect(parseAnsweredAt('not-a-date')).toBe(Number.NEGATIVE_INFINITY);
    expect(parseAnsweredAt('2026-11-23T10:00:00.000Z')).toBe(
      Date.parse('2026-11-23T10:00:00.000Z')
    );
  });

  it('keeps the server answer when the local cache is stale', () => {
    const server: Record<string, Answer> = {
      q1: { value: 'server-newer', answeredAt: '2026-11-23T10:05:00.000Z' },
    };
    const cache: Record<string, Answer> = {
      q1: { value: 'cache-stale', answeredAt: '2026-11-23T10:00:00.000Z' },
    };

    expect(mergeAnswersByTimestamp(server, cache)).toEqual({
      q1: { value: 'server-newer', answeredAt: '2026-11-23T10:05:00.000Z' },
    });
  });

  it('lets a newer local answer replace an older server answer', () => {
    const server: Record<string, Answer> = {
      q1: { value: 'server-old', answeredAt: '2026-11-23T10:00:00.000Z' },
    };
    const cache: Record<string, Answer> = {
      q1: { value: 'cache-newer', answeredAt: '2026-11-23T10:05:00.000Z' },
    };

    expect(mergeAnswersByTimestamp(server, cache).q1.value).toBe('cache-newer');
  });

  it('preserves the server answer on equal timestamps and keeps unanswered questions', () => {
    const server: Record<string, Answer> = {
      q1: { value: 'server', answeredAt: '2026-11-23T10:00:00.000Z' },
      q2: { value: 'server-only', answeredAt: '2026-11-23T10:00:00.000Z' },
    };
    const cache: Record<string, Answer> = {
      q1: { value: 'cache-tie', answeredAt: '2026-11-23T10:00:00.000Z' },
      q3: { value: 'cache-only' },
    };

    const merged = mergeAnswersByTimestamp(server, cache);

    expect(merged.q1.value).toBe('server');
    expect(merged.q2.value).toBe('server-only');
    expect(merged.q3.value).toBe('cache-only');
  });
});
