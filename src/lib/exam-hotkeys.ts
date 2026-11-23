/**
 * Exam keyboard shortcut helpers
 * Supports A-E and 1-5 keys for rapid answer selection.
 */

export function mapKeyToOptionLetter(key: string): string | null {
  const k = key.toLowerCase();
  const map: Record<string, string> = {
    '1': 'A',
    'a': 'A',
    '2': 'B',
    'b': 'B',
    '3': 'C',
    'c': 'C',
    '4': 'D',
    'd': 'D',
    '5': 'E',
    'e': 'E',
  };
  return map[k] || null;
}
