/**
 * Helpers for reconciling answers saved locally with answers already persisted
 * on the server. Every answer carries an `answeredAt` timestamp so a stale
 * offline cache can never overwrite a newer server answer (and vice versa).
 */

export type TimestampedAnswer = {
  answeredAt?: string | null;
};

/** Returns -Infinity for missing/invalid timestamps so comparisons stay safe. */
export function parseAnsweredAt(value?: string | null): number {
  if (!value) return Number.NEGATIVE_INFINITY;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) ? timestamp : Number.NEGATIVE_INFINITY;
}

/**
 * Merge two answer maps question-by-question. The newer `answeredAt` wins;
 * when timestamps are equal the existing (server) answer is preserved.
 */
export function mergeAnswersByTimestamp<T extends TimestampedAnswer>(
  base: Record<string, T>,
  incoming: Record<string, T>
): Record<string, T> {
  const merged: Record<string, T> = { ...base };

  for (const [questionId, answer] of Object.entries(incoming)) {
    if (!answer || typeof answer !== 'object') continue;

    const existing = merged[questionId];
    if (
      !existing ||
      parseAnsweredAt(answer.answeredAt) > parseAnsweredAt(existing.answeredAt)
    ) {
      merged[questionId] = answer;
    }
  }

  return merged;
}
