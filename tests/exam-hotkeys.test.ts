import { describe, it, expect } from 'vitest';
import { mapKeyToOptionLetter } from '../src/lib/exam-hotkeys';
import { isTimerWarning } from '../src/components/exam/ExamHeader';

// Re-export mapKeyToOptionLetter as specified in the test contract
export { mapKeyToOptionLetter };

describe('mapKeyToOptionLetter', () => {
  it('maps numbers 1-5 and letters a-e to uppercase option letters', () => {
    expect(mapKeyToOptionLetter('1')).toBe('A');
    expect(mapKeyToOptionLetter('2')).toBe('B');
    expect(mapKeyToOptionLetter('c')).toBe('C');
    expect(mapKeyToOptionLetter('5')).toBe('E');
    expect(mapKeyToOptionLetter('9')).toBeNull();
  });

  it('handles uppercase letters A-E as well', () => {
    expect(mapKeyToOptionLetter('A')).toBe('A');
    expect(mapKeyToOptionLetter('B')).toBe('B');
    expect(mapKeyToOptionLetter('C')).toBe('C');
    expect(mapKeyToOptionLetter('D')).toBe('D');
    expect(mapKeyToOptionLetter('E')).toBe('E');
  });

  it('returns null for unrelated keys', () => {
    expect(mapKeyToOptionLetter('f')).toBeNull();
    expect(mapKeyToOptionLetter('0')).toBeNull();
    expect(mapKeyToOptionLetter('ArrowLeft')).toBeNull();
    expect(mapKeyToOptionLetter('Enter')).toBeNull();
  });
});

describe('isTimerWarning (5-minute remaining alert)', () => {
  const FIVE_MINUTES_MS = 5 * 60 * 1000; // 300,000 ms

  it('triggers warning when remaining time is exactly 5 minutes', () => {
    expect(isTimerWarning(FIVE_MINUTES_MS)).toBe(true);
  });

  it('triggers warning when remaining time is less than 5 minutes', () => {
    expect(isTimerWarning(FIVE_MINUTES_MS - 1000)).toBe(true);
    expect(isTimerWarning(60 * 1000)).toBe(true);
    expect(isTimerWarning(0)).toBe(true);
  });

  it('does not trigger warning when remaining time is above 5 minutes', () => {
    expect(isTimerWarning(FIVE_MINUTES_MS + 1000)).toBe(false);
    expect(isTimerWarning(10 * 60 * 1000)).toBe(false);
    expect(isTimerWarning(60 * 60 * 1000)).toBe(false);
  });
});
