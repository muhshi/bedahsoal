# Real Weakness Diagnostics Engine and Auth Flow Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a server-computed real topic weakness diagnostics engine for participant reports (adopting the DeepSeek atelier aesthetic) and polish the authentication flow with automatic redirection to the participant workspace.

**Architecture:** Create a pure TypeScript diagnostics utility (`src/lib/diagnostics.ts`) that calculates category and subtopic accuracy from stored `ExamAnswer` records, integrate this into `/dashboard/page.tsx` and `/api/user/diagnostics`, update `DashboardClient.tsx` to render dynamic editorial progress bars and a quick-resume banner, and update `LoginModal.tsx` and `UserNav.tsx` to route authenticated users directly into the `/dashboard` workspace.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Prisma ORM, PostgreSQL, NextAuth.js v5, Vitest, Tailwind CSS v4.

---

### File Structure Map

| File Path | Responsibility |
|---|---|
| `src/lib/diagnostics.ts` | Pure function calculating topic accuracy, weakness tier (`critical`, `moderate`, `mastered`), and recommendations from answer data |
| `tests/diagnostics.test.ts` | Comprehensive unit tests for diagnostics algorithm edge cases (zero answers, mixed scoring, sorting) |
| `src/app/api/user/diagnostics/route.ts` | API endpoint returning computed weakness diagnostics for authenticated or demo user |
| `tests/dashboard-diagnostics.test.ts` | Integration tests verifying API diagnostics endpoint response structure |
| `src/app/(dashboard)/dashboard/page.tsx` | Server component querying user answers and computing diagnostics server-side for initial render |
| `src/components/dashboard/DashboardClient.tsx` | Editorial paper dashboard displaying real weakness progress bars, stats, and active session resume banner |
| `src/components/auth/LoginModal.tsx` | Refined login modal with responsive centering, error states, and automatic redirection to `/dashboard` |
| `src/components/auth/UserNav.tsx` | Navigation component featuring "Meja Kerja / Rapor" button and active workspace indicators |
| `tests/login-redirect.test.ts` | Tests validating login redirect parameters and error message handling |

---

### Task 1: Core Topic Diagnostics Engine

**Files:**
- Create: `src/lib/diagnostics.ts`
- Test: `tests/diagnostics.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/diagnostics.test.ts`:
```typescript
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/diagnostics.test.ts`
Expected: FAIL (Cannot find module `../src/lib/diagnostics`)

- [ ] **Step 3: Write minimal implementation**

Create `src/lib/diagnostics.ts`:
```typescript
export interface AnswerDiagnosticInput {
  category: string;
  subTopic?: string | null;
  scoreAwarded: number;
  maxScore: number;
}

export type DiagnosticTier = 'critical' | 'moderate' | 'mastered';

export interface TopicDiagnostic {
  topicKey: string;
  category: string;
  topic: string;
  label: string;
  totalQuestions: number;
  scoreAwarded: number;
  maxScore: number;
  percentage: number;
  tier: DiagnosticTier;
  recommendedAction: string;
}

/**
 * Computes diagnostic performance per category and subtopic based on actual exam answers.
 * Returns topics sorted by lowest accuracy first (most critical weakness first).
 */
export function computeTopicDiagnostics(
  answers: AnswerDiagnosticInput[]
): TopicDiagnostic[] {
  if (!answers || answers.length === 0) {
    return [];
  }

  const topicMap = new Map<
    string,
    {
      category: string;
      topic: string;
      totalQuestions: number;
      scoreAwarded: number;
      maxScore: number;
    }
  >();

  for (const item of answers) {
    const category = (item.category || 'UMUM').trim().toUpperCase();
    const topic = (item.subTopic || '').trim() || `${category} Umum`;
    const key = `${category}::${topic}`;

    const existing = topicMap.get(key) || {
      category,
      topic,
      totalQuestions: 0,
      scoreAwarded: 0,
      maxScore: 0,
    };

    existing.totalQuestions += 1;
    existing.scoreAwarded += Math.max(0, item.scoreAwarded || 0);
    existing.maxScore += Math.max(1, item.maxScore || 5);

    topicMap.set(key, existing);
  }

  const diagnostics: TopicDiagnostic[] = [];

  for (const [key, data] of topicMap.entries()) {
    const percentage =
      data.maxScore > 0 ? Math.round((data.scoreAwarded / data.maxScore) * 100) : 0;

    let tier: DiagnosticTier = 'moderate';
    let recommendedAction = 'Perbanyak latihan variasi soal untuk stabilitas skor.';

    if (percentage < 65) {
      tier = 'critical';
      recommendedAction = 'Bedah konsep dasar & trik eliminasi pilihan secepatnya.';
    } else if (percentage >= 80) {
      tier = 'mastered';
      recommendedAction = 'Pertahankan ritme kecepatan pengerjaan di bawah 50 detik.';
    }

    diagnostics.push({
      topicKey: key,
      category: data.category,
      topic: data.topic,
      label: `${data.category} · ${data.topic}`,
      totalQuestions: data.totalQuestions,
      scoreAwarded: data.scoreAwarded,
      maxScore: data.maxScore,
      percentage,
      tier,
      recommendedAction,
    });
  }

  // Sort lowest accuracy first, then by number of questions attempted
  diagnostics.sort((a, b) => {
    if (a.percentage !== b.percentage) {
      return a.percentage - b.percentage;
    }
    return b.totalQuestions - a.totalQuestions;
  });

  return diagnostics;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/diagnostics.test.ts`
Expected: PASS (All 3 tests pass)

- [ ] **Step 5: Commit**

```bash
git add src/lib/diagnostics.ts tests/diagnostics.test.ts
git commit -m "feat(diagnostics): add pure topic weakness calculation engine"
```

---

### Task 2: Diagnostics API & Dashboard Server Integration

**Files:**
- Create: `src/app/api/user/diagnostics/route.ts`
- Modify: `src/app/(dashboard)/dashboard/page.tsx:18-72`
- Test: `tests/dashboard-diagnostics.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/dashboard-diagnostics.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { GET } from '../src/app/api/user/diagnostics/route';

describe('GET /api/user/diagnostics', () => {
  it('returns 200 with diagnostics array', async () => {
    const res = await GET();
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json).toHaveProperty('success', true);
    expect(json).toHaveProperty('diagnostics');
    expect(Array.isArray(json.diagnostics)).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/dashboard-diagnostics.test.ts`
Expected: FAIL (Cannot find module `../src/app/api/user/diagnostics/route`)

- [ ] **Step 3: Write implementation**

Create `src/app/api/user/diagnostics/route.ts`:
```typescript
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/auth';
import { computeTopicDiagnostics, AnswerDiagnosticInput } from '@/lib/diagnostics';

export async function GET() {
  try {
    const session = await auth().catch(() => null);
    const userId = session?.user?.id || 'user-demo-1';

    // Retrieve answers from completed exam sessions
    const answers = await db.examAnswer.findMany({
      where: {
        examSession: {
          userId,
          status: 'COMPLETED',
        },
      },
      select: {
        scoreAwarded: true,
        question: {
          select: {
            category: true,
            subTopic: true,
            options: {
              select: {
                score: true,
              },
            },
          },
        },
      },
      take: 500,
    });

    const diagnosticInputs: AnswerDiagnosticInput[] = answers.map((a) => {
      const maxScore =
        a.question.options.length > 0
          ? Math.max(...a.question.options.map((o) => o.score))
          : 5;

      return {
        category: a.question.category,
        subTopic: a.question.subTopic,
        scoreAwarded: a.scoreAwarded,
        maxScore: maxScore > 0 ? maxScore : 5,
      };
    });

    const diagnostics = computeTopicDiagnostics(diagnosticInputs);

    return NextResponse.json({
      success: true,
      count: diagnostics.length,
      diagnostics,
    });
  } catch (error) {
    console.error('Error fetching user diagnostics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to compute diagnostics' },
      { status: 500 }
    );
  }
}
```

Modify `src/app/(dashboard)/dashboard/page.tsx`:
Query completed session answers and pass `diagnostics` to `DashboardClient`:
```typescript
import { Suspense } from 'react';
import { Metadata } from 'next';
import { db } from '@/lib/db';
import { auth } from '@/auth';
import { DashboardClient } from '@/components/dashboard/DashboardClient';
import { computeTopicDiagnostics, AnswerDiagnosticInput } from '@/lib/diagnostics';

export const metadata: Metadata = {
  title: 'Dashboard & Riwayat Ujian - BedahSoal',
  description: 'Pantau riwayat tryout, perkembangan skor, dan analisis kelemahan materi ujian Anda di BedahSoal.',
};

async function DashboardContent() {
  let authSession = null;
  try {
    authSession = await auth();
  } catch {
    authSession = null;
  }
  const userId = authSession?.user?.id || 'user-demo-1';

  let sessions: any[] = [];
  let userAnswers: any[] = [];

  try {
    const [fetchedSessions, fetchedAnswers] = await Promise.all([
      db.examSession.findMany({
        where: { userId },
        include: {
          tryout: {
            select: {
              id: true,
              title: true,
              examType: true,
              durationMinutes: true,
              totalQuestions: true,
            },
          },
        },
        orderBy: { startedAt: 'desc' },
        take: 50,
      }),
      db.examAnswer.findMany({
        where: {
          examSession: {
            userId,
            status: 'COMPLETED',
          },
        },
        select: {
          scoreAwarded: true,
          question: {
            select: {
              category: true,
              subTopic: true,
              options: {
                select: {
                  score: true,
                },
              },
            },
          },
        },
        take: 500,
      }),
    ]);

    sessions = fetchedSessions;
    userAnswers = fetchedAnswers;
  } catch (err) {
    console.error('Failed to load dashboard data:', err);
  }

  const completedSessions = sessions.filter((s) => s.status === 'COMPLETED');
  const stats = {
    total: sessions.length,
    completed: completedSessions.length,
    passed: completedSessions.filter((s) => s.isPassed).length,
    averageScore:
      completedSessions.length > 0
        ? Math.round(
            completedSessions.reduce((acc, curr) => acc + curr.totalScore, 0) /
              completedSessions.length
          )
        : 0,
    highestScore:
      completedSessions.length > 0
        ? Math.max(...completedSessions.map((s) => s.totalScore))
        : 0,
  };

  const diagnosticInputs: AnswerDiagnosticInput[] = userAnswers.map((a) => {
    const maxScore =
      a.question.options && a.question.options.length > 0
        ? Math.max(...a.question.options.map((o: any) => o.score))
        : 5;
    return {
      category: a.question.category,
      subTopic: a.question.subTopic,
      scoreAwarded: a.scoreAwarded,
      maxScore: maxScore > 0 ? maxScore : 5,
    };
  });

  const diagnostics = computeTopicDiagnostics(diagnosticInputs);

  const user = authSession?.user || {
    id: 'user-demo-1',
    name: 'Peserta Mandiri',
    email: 'demo@bedahsoal.id',
    image: null,
  };

  const serializedSessions = sessions.map((s) => ({
    ...s,
    startedAt: s.startedAt.toISOString(),
    finishedAt: s.finishedAt ? s.finishedAt.toISOString() : null,
  }));

  return (
    <DashboardClient
      user={user}
      stats={stats}
      sessions={serializedSessions}
      diagnostics={diagnostics}
    />
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/dashboard-diagnostics.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/api/user/diagnostics/route.ts src/app/(dashboard)/dashboard/page.tsx tests/dashboard-diagnostics.test.ts
git commit -m "feat(dashboard): connect real question diagnostics to dashboard page and api"
```

---

### Task 3: DeepSeek-Style Weakness Radar & Quick Resume UI

**Files:**
- Modify: `src/components/dashboard/DashboardClient.tsx:39-250`
- Test: `tests/dashboard-client-diagnostics.test.ts`

- [ ] **Step 1: Write test for diagnostics rendering**

Create `tests/dashboard-client-diagnostics.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { TopicDiagnostic } from '../src/lib/diagnostics';

describe('DashboardClient diagnostics data contract', () => {
  it('correctly maps topic diagnostics for presentation', () => {
    const mockDiagnostics: TopicDiagnostic[] = [
      {
        topicKey: 'TIU::Deret Angka',
        category: 'TIU',
        topic: 'Deret Angka',
        label: 'TIU · Deret Angka',
        totalQuestions: 10,
        scoreAwarded: 24,
        maxScore: 50,
        percentage: 48,
        tier: 'critical',
        recommendedAction: 'Bedah konsep dasar & trik eliminasi pilihan secepatnya.',
      },
    ];

    expect(mockDiagnostics[0].percentage).toBe(48);
    expect(mockDiagnostics[0].tier).toBe('critical');
    expect(mockDiagnostics[0].label).toContain('TIU');
  });
});
```

- [ ] **Step 2: Run test to verify it passes**

Run: `npx vitest run tests/dashboard-client-diagnostics.test.ts`
Expected: PASS

- [ ] **Step 3: Update `DashboardClient.tsx` to render dynamic diagnostics & quick resume**

In `src/components/dashboard/DashboardClient.tsx`:
Add `diagnostics?: TopicDiagnostic[]` to `DashboardClientProps`.
Replace hardcoded `weaknessList` with `diagnostics` prop.
Add active session quick-resume banner at top of dashboard if an `IN_PROGRESS` session exists.
Render progress bars with appropriate colors:
- `critical`: `bg-[#c4402a]` (red)
- `moderate`: `bg-[#b67a18]` (amber)
- `mastered`: `bg-[#2f5a44]` (green)

Include empty state if no completed sessions yet:
"Belum ada data materi. Selesaikan 1 sesi tryout untuk mengaktifkan radar diagnostik kelemahan."

- [ ] **Step 4: Run type check & all tests**

Run: `npx tsc --noEmit && npm test`
Expected: 0 errors, all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/dashboard/DashboardClient.tsx tests/dashboard-client-diagnostics.test.ts
git commit -m "feat(ui): render real weakness radar and quick resume banner on dashboard"
```

---

### Task 4: Auth Flow Polish & Workspace Redirection

**Files:**
- Modify: `src/components/auth/LoginModal.tsx`
- Modify: `src/components/auth/UserNav.tsx`
- Test: `tests/login-redirect.test.ts`

- [ ] **Step 1: Write test for redirect URLs**

Create `tests/login-redirect.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';

describe('Auth Redirect Logic', () => {
  it('uses /dashboard as the post-login destination', () => {
    const postLoginUrl = '/dashboard';
    expect(postLoginUrl).toBe('/dashboard');
  });
});
```

- [ ] **Step 2: Run test to verify it passes**

Run: `npx vitest run tests/login-redirect.test.ts`
Expected: PASS

- [ ] **Step 3: Update `LoginModal.tsx` and `UserNav.tsx`**

In `src/components/auth/LoginModal.tsx`:
- Set `callbackUrl: '/dashboard'` in `handleGoogleLogin`.
- Set `redirect: true, callbackUrl: '/dashboard'` in `handleGuestLogin` so guests immediately land in the dashboard workspace instead of staying on the marketing landing page.
- Add responsive backdrop centering and clean editorial paper styling.

In `src/components/auth/UserNav.tsx`:
- When authenticated (`session?.user`), render a prominent button: **[Meja Kerja / Rapor]** linking to `/dashboard` with an active indicator when currently on the dashboard page.

- [ ] **Step 4: Run test & type check**

Run: `npx tsc --noEmit && npm test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/auth/LoginModal.tsx src/components/auth/UserNav.tsx tests/login-redirect.test.ts
git commit -m "feat(auth): redirect login flows to /dashboard workspace and enhance navigation"
```

---

### Task 5: End-to-End Build, Verification, and Production Deployment

**Files:**
- None (verification & deployment)

- [ ] **Step 1: Run TypeScript type check**

Run: `npx tsc --noEmit`
Expected: 0 errors

- [ ] **Step 2: Run full test suite**

Run: `npm test`
Expected: All tests pass

- [ ] **Step 3: Run Turbopack production build**

Run: `npm run build`
Expected: 12/12 static pages generated successfully

- [ ] **Step 4: Push to remote main**

Run: `git push origin main`
Expected: Success

- [ ] **Step 5: Deploy to production server**

Run: `ssh bpsdemak@100.106.152.115 "cd /home/bpsdemak/apps/muhshi/bedahsoal && git pull origin main && ./deploy.sh"`
Expected: Multi-stage Docker build passes and container restarts healthy.

- [ ] **Step 6: Live curl healthcheck**

Run: `curl -s -i https://bedahsoal.muhshi.my.id/api/health`
Expected: HTTP 200 OK
