import { describe, it, expect } from 'vitest';
import {
  calculateRemainingMs,
  formatRemainingTime,
  isTimerWarning,
} from '../src/components/exam/ExamHeader';

describe('ExamHeader logic', () => {
  it('formats remaining milliseconds into HH:MM:SS format', () => {
    expect(formatRemainingTime(0)).toBe('00:00:00');
    expect(formatRemainingTime(-1000)).toBe('00:00:00');

    // 45 seconds
    expect(formatRemainingTime(45 * 1000)).toBe('00:00:45');

    // 4 minutes 30 seconds
    expect(formatRemainingTime((4 * 60 + 30) * 1000)).toBe('00:04:30');

    // 1 hour 30 minutes 15 seconds
    expect(formatRemainingTime((90 * 60 + 15) * 1000)).toBe('01:30:15');
  });

  it('calculates remaining time synchronized with serverTimeOffsetMs', () => {
    const now = Date.now();
    // Deadline is 10 minutes from now (local time)
    const deadline = new Date(now + 600000).toISOString();

    // Case 1: no server offset
    const remNoOffset = calculateRemainingMs(deadline, 0);
    // Should be around 600,000 ms (allowing small jitter of +/- 500ms)
    expect(remNoOffset).toBeGreaterThanOrEqual(599000);
    expect(remNoOffset).toBeLessThanOrEqual(600500);

    // Case 2: server is 2 minutes (120,000 ms) ahead of client
    // Server time = now + 120,000
    // Remaining = deadline (now + 600,000) - (now + 120,000) = 480,000 ms
    const remServerAhead = calculateRemainingMs(deadline, 120000);
    expect(remServerAhead).toBeGreaterThanOrEqual(479000);
    expect(remServerAhead).toBeLessThanOrEqual(480500);

    // Case 3: past deadline returns 0
    const pastDeadline = new Date(now - 10000).toISOString();
    expect(calculateRemainingMs(pastDeadline, 0)).toBe(0);
    expect(calculateRemainingMs(null, 0)).toBe(0);
  });

  it('triggers warning status when remaining time is less than 5 minutes', () => {
    const sixMinutesMs = 6 * 60 * 1000;
    const fourMinutesFiftyNineMs = (4 * 60 + 59) * 1000;
    const tenSecondsMs = 10 * 1000;
    const zeroMs = 0;

    expect(isTimerWarning(sixMinutesMs)).toBe(false);
    expect(isTimerWarning(fourMinutesFiftyNineMs)).toBe(true);
    expect(isTimerWarning(tenSecondsMs)).toBe(true);
    // When time has reached 0, it is ended
    expect(isTimerWarning(zeroMs)).toBe(true);
  });
});
