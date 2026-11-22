export interface LeaderboardRawEntry {
  id: string;
  userId: string;
  userName: string | null;
  userImage: string | null;
  isNamePublic: boolean;
  totalScore: number;
  subtestScores: Record<string, number> | null;
  isPassed: boolean;
  startedAt: Date | string;
  submittedAt: Date | string | null;
  durationSeconds?: number;
}

export interface LeaderboardRankedEntry {
  rank: number;
  sessionId: string;
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  isNamePublic: boolean;
  totalScore: number;
  subtestScores: Record<string, number>;
  isPassed: boolean;
  durationFormatted: string;
  durationSeconds: number;
  submittedAt: string;
}

/**
 * Anonymize user names based on UU PDP privacy rules.
 * If public, returns the full name.
 * If private, returns "M. A. Muhshi" or "B. Santoso" or initials.
 */
export function pseudonymizeName(name: string | null | undefined, isNamePublic: boolean): string {
  if (!name || !name.trim()) return 'Peserta Anonim';
  if (isNamePublic) return name.trim();

  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    const single = parts[0];
    return single.length <= 2 ? `${single}*` : `${single.slice(0, 1)}***`;
  }

  // Multi-word name: "Muhammad Abdul Muhshi" -> "M. A. Muhshi"
  const initials = parts.slice(0, -1).map((p) => `${p.charAt(0).toUpperCase()}.`);
  const lastName = parts[parts.length - 1];
  return `${initials.join(' ')} ${lastName}`;
}

export function formatDuration(seconds: number): string {
  if (!seconds || seconds < 0) return '0m 00s';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}m ${s < 10 ? '0' : ''}${s}s`;
}

/**
 * Official BKN Tie-Breaker Sorting Engine:
 * 1. Total Score DESC
 * 2. For SKD: TKP DESC
 * 3. For SKD: TIU DESC
 * 4. For SKD: TWK DESC
 * 5. Completion Duration ASC (faster is ranked higher)
 */
export function sortLeaderboardEntries<T extends {
  id: string;
  totalScore: number;
  subtestScores: any;
  durationSeconds?: number;
  startedAt?: Date | string;
  submittedAt?: Date | string | null;
}>(entries: T[], examType: string = 'SKD_CPNS'): T[] {
  return [...entries].sort((a, b) => {
    // 1. Total Score descending
    if (b.totalScore !== a.totalScore) {
      return b.totalScore - a.totalScore;
    }

    const aSub = (a.subtestScores as Record<string, number>) || {};
    const bSub = (b.subtestScores as Record<string, number>) || {};

    if (examType === 'SKD_CPNS') {
      // 2. TKP descending
      const aTKP = Number(aSub['TKP'] ?? 0);
      const bTKP = Number(bSub['TKP'] ?? 0);
      if (bTKP !== aTKP) return bTKP - aTKP;

      // 3. TIU descending
      const aTIU = Number(aSub['TIU'] ?? 0);
      const bTIU = Number(bSub['TIU'] ?? 0);
      if (bTIU !== aTIU) return bTIU - aTIU;

      // 4. TWK descending
      const aTWK = Number(aSub['TWK'] ?? 0);
      const bTWK = Number(bSub['TWK'] ?? 0);
      if (bTWK !== aTWK) return bTWK - aTWK;
    }

    // 5. Faster completion duration wins
    const aDur = a.durationSeconds ?? (
      a.submittedAt && a.startedAt
        ? Math.max(0, Math.floor((new Date(a.submittedAt).getTime() - new Date(a.startedAt).getTime()) / 1000))
        : 999999
    );
    const bDur = b.durationSeconds ?? (
      b.submittedAt && b.startedAt
        ? Math.max(0, Math.floor((new Date(b.submittedAt).getTime() - new Date(b.startedAt).getTime()) / 1000))
        : 999999
    );

    return aDur - bDur;
  });
}
