# Leaderboard Nasional & Tie-Breaker BKN Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the official national leaderboard for BedahSoal tryouts with hierarchical BKN tie-breaker sorting (Total Score > TKP > TIU > TWK > Completion Time), UU PDP privacy pseudonymization, and an interactive leaderboard component.

**Architecture:** A server-side leaderboard query service (`src/lib/leaderboard.ts`) parses JSON subtest scores and computes rankings with BKN tie-breaker rules. Next.js route handlers (`/api/tryouts/[tryoutId]/leaderboard` and `/api/user/privacy`) provide leaderboard data and privacy toggles. The client-side UI (`LeaderboardView.tsx`) renders responsive rankings with badges, percentile indicators, and current user rank highlighting.

**Tech Stack:** Next.js 16 App Router, TypeScript 5, Prisma ORM (PostgreSQL), Lucide React, Vitest.

---

### File Structure Map
- Create: `src/lib/leaderboard.ts` - Tie-breaker sorting engine, duration calculation, and pseudonymizer.
- Create: `src/app/api/tryouts/[tryoutId]/leaderboard/route.ts` - GET endpoint returning ranked participants and user position.
- Create: `src/app/api/user/privacy/route.ts` - PATCH endpoint allowing users to toggle `isNamePublic`.
- Create: `src/components/leaderboard/LeaderboardView.tsx` - Interactive leaderboard table with top 3 podium, pagination, and user rank banner.
- Test: `tests/leaderboard.test.ts` - Unit tests for tie-breaker logic, privacy anonymization, and route handlers.

---

### Task 1: Tie-Breaker Engine & Anonymization Utilities (`src/lib/leaderboard.ts`)

**Files:**
- Create: `src/lib/leaderboard.ts`
- Test: `tests/leaderboard.test.ts`

- [ ] **Step 1: Write failing unit tests for BKN tie-breaker and pseudonymization**

```typescript
// tests/leaderboard.test.ts
import { describe, it, expect } from 'vitest';
import { sortLeaderboardEntries, pseudonymizeName } from '../src/lib/leaderboard';

describe('Leaderboard Engine & Privacy', () => {
  describe('pseudonymizeName', () => {
    it('anonymizes names with initial format when not public', () => {
      expect(pseudonymizeName('Muhammad Abdul Muhshi', false)).toBe('M. A. Muhshi');
      expect(pseudonymizeName('Budi Santoso', false)).toBe('B. Santoso');
      expect(pseudonymizeName('Rian', false)).toBe('R***');
    });

    it('returns full name unchanged when public', () => {
      expect(pseudonymizeName('Muhammad Abdul Muhshi', true)).toBe('Muhammad Abdul Muhshi');
    });

    it('handles empty or missing names gracefully', () => {
      expect(pseudonymizeName(null, false)).toBe('Peserta Anonim');
      expect(pseudonymizeName('', false)).toBe('Peserta Anonim');
    });
  });

  describe('sortLeaderboardEntries (Official BKN Tie-Breaker)', () => {
    it('sorts strictly by Total Score DESC first', () => {
      const entries = [
        { id: '1', totalScore: 400, subtestScores: { TKP: 180, TIU: 130, TWK: 90 }, durationSeconds: 5000 },
        { id: '2', totalScore: 450, subtestScores: { TKP: 170, TIU: 150, TWK: 130 }, durationSeconds: 5400 },
      ];
      const sorted = sortLeaderboardEntries(entries, 'SKD_CPNS');
      expect(sorted[0].id).toBe('2');
      expect(sorted[1].id).toBe('1');
    });

    it('resolves tie scores using TKP > TIU > TWK > Duration hierarchy', () => {
      const entries = [
        // Total 420, TKP 170, TIU 150, TWK 100, Duration 4000
        { id: 'p1', totalScore: 420, subtestScores: { TKP: 170, TIU: 150, TWK: 100 }, durationSeconds: 4000 },
        // Total 420, TKP 180 (higher TKP wins), TIU 140, TWK 100, Duration 4500
        { id: 'p2', totalScore: 420, subtestScores: { TKP: 180, TIU: 140, TWK: 100 }, durationSeconds: 4500 },
        // Total 420, TKP 170, TIU 160 (higher TIU wins over p1), TWK 90, Duration 4200
        { id: 'p3', totalScore: 420, subtestScores: { TKP: 170, TIU: 160, TWK: 90 }, durationSeconds: 4200 },
        // Total 420, TKP 170, TIU 150, TWK 100, Duration 3500 (faster completion wins over p1)
        { id: 'p4', totalScore: 420, subtestScores: { TKP: 170, TIU: 150, TWK: 100 }, durationSeconds: 3500 },
      ];

      const sorted = sortLeaderboardEntries(entries, 'SKD_CPNS');
      expect(sorted.map(s => s.id)).toEqual(['p2', 'p3', 'p4', 'p1']);
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/leaderboard.test.ts`
Expected: FAIL ("Cannot find module '../src/lib/leaderboard'")

- [ ] **Step 3: Implement `src/lib/leaderboard.ts`**

```typescript
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
  submittedAt: string;
}

export function pseudonymizeName(name: string | null | undefined, isNamePublic: boolean): string {
  if (!name || !name.trim()) return 'Peserta Anonim';
  if (isNamePublic) return name.trim();

  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    const single = parts[0];
    return single.length <= 2 ? `${single}*` : `${single.slice(0, 2)}***`;
  }

  // Format: "B. Santoso" or "M. A. Muhshi"
  const initials = parts.slice(0, -1).map(p => `${p.charAt(0).toUpperCase()}.`);
  const lastName = parts[parts.length - 1];
  return `${initials.join(' ')} ${lastName}`;
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s < 10 ? '0' : ''}${s}s`;
}

export function sortLeaderboardEntries<T extends {
  id: string;
  totalScore: number;
  subtestScores: any;
  durationSeconds?: number;
  startedAt?: Date | string;
  submittedAt?: Date | string | null;
}>(entries: T[], examType: string = 'SKD_CPNS'): T[] {
  return [...entries].sort((a, b) => {
    // 1. Total score descending
    if (b.totalScore !== a.totalScore) {
      return b.totalScore - a.totalScore;
    }

    const aSub = (a.subtestScores as Record<string, number>) || {};
    const bSub = (b.subtestScores as Record<string, number>) || {};

    if (examType === 'SKD_CPNS') {
      // 2. TKP descending
      const aTKP = aSub['TKP'] || 0;
      const bTKP = bSub['TKP'] || 0;
      if (bTKP !== aTKP) return bTKP - aTKP;

      // 3. TIU descending
      const aTIU = aSub['TIU'] || 0;
      const bTIU = bSub['TIU'] || 0;
      if (bTIU !== aTIU) return bTIU - aTIU;

      // 4. TWK descending
      const aTWK = aSub['TWK'] || 0;
      const bTWK = bSub['TWK'] || 0;
      if (bTWK !== aTWK) return bTWK - aTWK;
    }

    // 5. Completion speed (Duration in seconds ascending: faster is better)
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
```

- [ ] **Step 4: Run tests and ensure they pass**

Run: `npx vitest run tests/leaderboard.test.ts`
Expected: PASS

- [ ] **Step 5: Commit Task 1**

```bash
git add src/lib/leaderboard.ts tests/leaderboard.test.ts
git commit -m "feat(leaderboard): implement official BKN tie-breaker engine and pseudonymization"
```

---

### Task 2: Leaderboard API Endpoint (`/api/tryouts/[tryoutId]/leaderboard`)

**Files:**
- Create: `src/app/api/tryouts/[tryoutId]/leaderboard/route.ts`
- Modify: `tests/leaderboard.test.ts`

- [ ] **Step 1: Write integration tests for GET /api/tryouts/[tryoutId]/leaderboard**
- [ ] **Step 2: Implement route handler with Prisma querying and ranking compilation**
- [ ] **Step 3: Run tests and verify passing**
- [ ] **Step 4: Commit Task 2**

```bash
git add src/app/api/tryouts/[tryoutId]/leaderboard/route.ts tests/leaderboard.test.ts
git commit -m "feat(api): implement /api/tryouts/[tryoutId]/leaderboard endpoint"
```

---

### Task 3: User Privacy Setting Endpoint (`/api/user/privacy`)

**Files:**
- Create: `src/app/api/user/privacy/route.ts`
- Modify: `tests/leaderboard.test.ts`

- [ ] **Step 1: Implement PATCH /api/user/privacy to toggle `isNamePublic`**
- [ ] **Step 2: Add test coverage**
- [ ] **Step 3: Commit Task 3**

```bash
git add src/app/api/user/privacy/route.ts tests/leaderboard.test.ts
git commit -m "feat(api): implement user privacy toggle endpoint for leaderboard names"
```

---

### Task 4: Interactive Leaderboard Component (`LeaderboardView.tsx`)

**Files:**
- Create: `src/components/leaderboard/LeaderboardView.tsx`
- Modify: `src/components/exam/ExamReviewViewer.tsx` (Add "Lihat Papan Peringkat" button)

- [ ] **Step 1: Create `src/components/leaderboard/LeaderboardView.tsx` with top 3 podium cards, full table, and filter tabs**
- [ ] **Step 2: Integrate into review screen and user dashboard**
- [ ] **Step 3: Run `npm run build`**
- [ ] **Step 4: Commit Task 4**

```bash
git add src/components/leaderboard/LeaderboardView.tsx src/components/exam/ExamReviewViewer.tsx
git commit -m "feat(ui): implement interactive LeaderboardView component with podium and ranking table"
```

---

### Task 5: Production Deployment & Live Verification

- [ ] **Step 1: Run complete test suite (`npx vitest run`) and production build**
- [ ] **Step 2: Commit and push changes to `main`**
- [ ] **Step 3: Deploy to production server via Tailscale (`bpsdemak@100.106.152.115`)**
- [ ] **Step 4: Verify live leaderboard endpoint on `https://bedahsoal.muhshi.my.id`**
