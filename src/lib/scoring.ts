// ============================================================
// Official CAT BKN Scoring Engine & Tie-Breaker Logic
// ============================================================

export interface SubtestScores {
  scoreTWK: number;
  scoreTIU: number;
  scoreTKP: number;
  totalScore: number;
  isPassed: boolean;
}

export interface PassingGradeCriteria {
  minTWK: number;
  minTIU: number;
  minTKP: number;
}

export const DEFAULT_CPNS_PASSING_GRADE: PassingGradeCriteria = {
  minTWK: 65,
  minTIU: 80,
  minTKP: 166,
};

export function evaluatePassingGrade(
  scores: { scoreTWK: number; scoreTIU: number; scoreTKP: number },
  criteria: PassingGradeCriteria = DEFAULT_CPNS_PASSING_GRADE
): boolean {
  return (
    scores.scoreTWK >= criteria.minTWK &&
    scores.scoreTIU >= criteria.minTIU &&
    scores.scoreTKP >= criteria.minTKP
  );
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  isNamePublic: boolean;
  scoreTKP: number;
  scoreTIU: number;
  scoreTWK: number;
  totalScore: number;
  durationSeconds: number;
  isPassed: boolean;
}

/**
 * Official BKN Tie-Breaker Rule:
 * 1. Total Score DESC
 * 2. TKP Score DESC
 * 3. TIU Score DESC
 * 4. TWK Score DESC
 * 5. Duration (Fastest completion) ASC
 */
export function sortBKNLeaderboard(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((a, b) => {
    if (b.totalScore !== a.totalScore) {
      return b.totalScore - a.totalScore;
    }
    if (b.scoreTKP !== a.scoreTKP) {
      return b.scoreTKP - a.scoreTKP;
    }
    if (b.scoreTIU !== a.scoreTIU) {
      return b.scoreTIU - a.scoreTIU;
    }
    if (b.scoreTWK !== a.scoreTWK) {
      return b.scoreTWK - a.scoreTWK;
    }
    return a.durationSeconds - b.durationSeconds;
  });
}
