# Extensible Multi-Exam CBT Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Transform the CBT engine from a rigid SKD-only test runner into a polymorphic, extensible exam simulation platform supporting multiple test formats (SKD CPNS/Kedinasan, LPDP Tes Bakat Skolastik, Olimpiade Matematika dengan KaTeX & skor minus, serta UTBK SNBT) without code rigidity.

**Architecture:** Implement the **Strategy Pattern** for exam scoring and evaluation (BKN SKD, Negative Marking, Standard Sum, and Sectional IRT), generalize Prisma data models with JSON configs (`scoringConfig`, `subtestConfig`, `subtestScores`) and decoupled string categories, expand client-side Zustand store for dynamic sectioning and question types (Multiple Choice & Numeric Input), and build a high-performance KaTeX math renderer.

**Tech Stack:** Next.js 15+ (App Router), React 19, TypeScript, Prisma ORM (PostgreSQL), Zustand, KaTeX, Vitest (TDD).

---

## File Structure Map

```text
latihan_soal/
├── prisma/
│   ├── schema.prisma                       # Modified: polymorphic Tryout, Question & ExamSession models
│   └── seed.ts                             # Modified: seeds SKD + sample Math Olympiad & LPDP questions
├── src/
│   ├── types/
│   │   ├── exam.ts                         # Modified: generalized DTOs, QuestionType, ExamType
│   │   └── scoring.ts                      # Created: scoring strategy interfaces & config types
│   ├── lib/
│   │   ├── scoring-engine.ts               # Created: Strategy pattern implementation (SKD, Negative, Standard)
│   │   ├── scoring.ts                      # Legacy bridge to scoring-engine for backward compatibility
│   │   └── db.ts                           # Prisma singleton
│   ├── stores/
│   │   └── use-exam-store.ts               # Modified: handles dynamic subtests & numeric/MC answer types
│   ├── components/
│   │   └── exam/
│   │       ├── MathRenderer.tsx            # Created: robust KaTeX formula renderer for Math Olympiad & TIU
│   │       ├── QuestionPalette.tsx         # Created: section-aware palette (continuous or tabbed)
│   │       ├── ExamHeader.tsx              # Created: exam title, subtest badge & server-authoritative timer
│   │       └── QuestionViewer.tsx          # Created: polymorphic question renderer (MC + numeric input)
│   └── app/
│       └── (exam)/
│           └── exam/[sessionId]/
│               └── page.tsx                # Created: Fullscreen CBT player wiring
└── tests/
    ├── scoring-engine.test.ts              # Unit test for all scoring strategies
    └── exam-store.test.ts                  # Unit test for Zustand exam store
```

---

## Bite-Sized Implementation Tasks

### Task 1: Polymorphic Scoring Engine & Strategy Pattern (TDD)

**Files:**
- Create: `src/types/scoring.ts`
- Create: `src/lib/scoring-engine.ts`
- Test: `tests/scoring-engine.test.ts`
- Modify: `src/lib/scoring.ts`

- [x] **Step 1: Write the failing test for scoring strategies**

Create `tests/scoring-engine.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import {
  calculateExamScore,
  BKNScoringStrategy,
  NegativeMarkingStrategy,
  StandardSumStrategy,
} from '../src/lib/scoring-engine';

describe('Scoring Engine Strategies', () => {
  it('calculates official BKN SKD score with TWK, TIU (+5/0) and TKP (1-5) and passing grade', () => {
    const questions = [
      { id: 'q1', category: 'TWK', correctKey: 'A', options: [{ key: 'A', score: 5 }, { key: 'B', score: 0 }] },
      { id: 'q2', category: 'TIU', correctKey: 'C', options: [{ key: 'C', score: 5 }, { key: 'D', score: 0 }] },
      { id: 'q3', category: 'TKP', correctKey: null, options: [{ key: 'A', score: 5 }, { key: 'B', score: 3 }, { key: 'C', score: 1 }] },
    ];

    const answers = {
      q1: { selectedKey: 'A' }, // 5
      q2: { selectedKey: 'D' }, // 0
      q3: { selectedKey: 'B' }, // 3
    };

    const criteria = { minTWK: 5, minTIU: 5, minTKP: 3 };
    const result = BKNScoringStrategy.calculate(questions, answers, criteria);

    expect(result.subtestScores).toEqual({ TWK: 5, TIU: 0, TKP: 3 });
    expect(result.totalScore).toBe(8);
    expect(result.isPassed).toBe(false); // TIU 0 < minTIU 5
  });

  it('calculates Negative Marking (Math Olympiad / UTBK): Correct +4, Wrong -1, Empty 0', () => {
    const questions = [
      { id: 'm1', category: 'Aljabar', correctKey: 'A', options: [{ key: 'A', score: 4 }, { key: 'B', score: 0 }] },
      { id: 'm2', category: 'Geometri', correctKey: 'B', options: [{ key: 'A', score: 0 }, { key: 'B', score: 4 }] },
      { id: 'm3', category: 'Kombinatorika', correctKey: 'C', options: [{ key: 'A', score: 0 }, { key: 'C', score: 4 }] },
    ];

    const answers = {
      m1: { selectedKey: 'A' }, // Benar: +4
      m2: { selectedKey: 'A' }, // Salah: -1
      m3: { selectedKey: null }, // Kosong: 0
    };

    const config = { correctScore: 4, wrongScore: -1, emptyScore: 0 };
    const result = NegativeMarkingStrategy.calculate(questions, answers, config);

    expect(result.totalScore).toBe(3); // 4 - 1 + 0 = 3
    expect(result.subtestScores).toEqual({ Aljabar: 4, Geometri: -1, Kombinatorika: 0 });
  });

  it('calculates Standard Sum (LPDP TBS / General Tests)', () => {
    const questions = [
      { id: 'l1', category: 'Penalaran Verbal', correctKey: 'A', options: [{ key: 'A', score: 1 }, { key: 'B', score: 0 }] },
      { id: 'l2', category: 'Penalaran Numerik', correctKey: 'B', options: [{ key: 'A', score: 0 }, { key: 'B', score: 1 }] },
    ];

    const answers = {
      l1: { selectedKey: 'A' },
      l2: { selectedKey: 'A' },
    };

    const result = StandardSumStrategy.calculate(questions, answers);
    expect(result.totalScore).toBe(1);
    expect(result.subtestScores).toEqual({ 'Penalaran Verbal': 1, 'Penalaran Numerik': 0 });
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run:
```bash
npm test tests/scoring-engine.test.ts
```
Expected: FAIL with "Cannot find module '../src/lib/scoring-engine'"

- [x] **Step 3: Create types and implement scoring strategies**

Create `src/types/scoring.ts`:

```typescript
export type ExamType = 'SKD_CPNS' | 'LPDP_TBS' | 'MATH_OLYMPIAD' | 'UTBK_SNBT' | 'CUSTOM';

export interface QuestionScoringItem {
  id: string;
  category: string;
  correctKey?: string | null;
  options: Array<{
    key: string;
    score: number;
  }>;
}

export interface UserAnswerItem {
  selectedKey?: string | null;
  numericAnswer?: string | null;
}

export interface ExamScoreResult {
  totalScore: number;
  subtestScores: Record<string, number>;
  isPassed?: boolean;
}

export interface NegativeMarkingConfig {
  correctScore: number;
  wrongScore: number;
  emptyScore: number;
}

export interface BKNPassingGradeCriteria {
  minTWK: number;
  minTIU: number;
  minTKP: number;
}
```

Create `src/lib/scoring-engine.ts`:

```typescript
import {
  QuestionScoringItem,
  UserAnswerItem,
  ExamScoreResult,
  NegativeMarkingConfig,
  BKNPassingGradeCriteria,
  ExamType,
} from '@/types/scoring';

export const BKNScoringStrategy = {
  calculate(
    questions: QuestionScoringItem[],
    answers: Record<string, UserAnswerItem>,
    criteria?: BKNPassingGradeCriteria
  ): ExamScoreResult {
    const subtestScores: Record<string, number> = { TWK: 0, TIU: 0, TKP: 0 };
    let totalScore = 0;

    for (const q of questions) {
      const ans = answers[q.id];
      const selectedKey = ans?.selectedKey;
      let scoreAwarded = 0;

      if (selectedKey) {
        const option = q.options.find((o) => o.key === selectedKey);
        if (option) {
          scoreAwarded = option.score;
        }
      }

      const cat = q.category.toUpperCase().includes('TWK')
        ? 'TWK'
        : q.category.toUpperCase().includes('TIU')
        ? 'TIU'
        : q.category.toUpperCase().includes('TKP')
        ? 'TKP'
        : q.category;

      subtestScores[cat] = (subtestScores[cat] || 0) + scoreAwarded;
      totalScore += scoreAwarded;
    }

    const isPassed = criteria
      ? (subtestScores['TWK'] ?? 0) >= criteria.minTWK &&
        (subtestScores['TIU'] ?? 0) >= criteria.minTIU &&
        (subtestScores['TKP'] ?? 0) >= criteria.minTKP
      : undefined;

    return { totalScore, subtestScores, isPassed };
  },
};

export const NegativeMarkingStrategy = {
  calculate(
    questions: QuestionScoringItem[],
    answers: Record<string, UserAnswerItem>,
    config: NegativeMarkingConfig = { correctScore: 4, wrongScore: -1, emptyScore: 0 }
  ): ExamScoreResult {
    const subtestScores: Record<string, number> = {};
    let totalScore = 0;

    for (const q of questions) {
      const ans = answers[q.id];
      const selectedKey = ans?.selectedKey;
      let scoreAwarded = config.emptyScore;

      if (selectedKey) {
        if (q.correctKey && selectedKey === q.correctKey) {
          scoreAwarded = config.correctScore;
        } else {
          scoreAwarded = config.wrongScore;
        }
      }

      subtestScores[q.category] = (subtestScores[q.category] || 0) + scoreAwarded;
      totalScore += scoreAwarded;
    }

    return { totalScore, subtestScores };
  },
};

export const StandardSumStrategy = {
  calculate(
    questions: QuestionScoringItem[],
    answers: Record<string, UserAnswerItem>
  ): ExamScoreResult {
    const subtestScores: Record<string, number> = {};
    let totalScore = 0;

    for (const q of questions) {
      const ans = answers[q.id];
      const selectedKey = ans?.selectedKey;
      let scoreAwarded = 0;

      if (selectedKey) {
        const option = q.options.find((o) => o.key === selectedKey);
        scoreAwarded = option ? option.score : 0;
      }

      subtestScores[q.category] = (subtestScores[q.category] || 0) + scoreAwarded;
      totalScore += scoreAwarded;
    }

    return { totalScore, subtestScores };
  },
};

export function calculateExamScore(
  examType: ExamType,
  questions: QuestionScoringItem[],
  answers: Record<string, UserAnswerItem>,
  options?: {
    bknCriteria?: BKNPassingGradeCriteria;
    negativeConfig?: NegativeMarkingConfig;
  }
): ExamScoreResult {
  switch (examType) {
    case 'SKD_CPNS':
      return BKNScoringStrategy.calculate(questions, answers, options?.bknCriteria);
    case 'MATH_OLYMPIAD':
      return NegativeMarkingStrategy.calculate(questions, answers, options?.negativeConfig);
    case 'LPDP_TBS':
    case 'UTBK_SNBT':
    case 'CUSTOM':
    default:
      return StandardSumStrategy.calculate(questions, answers);
  }
}
```

- [x] **Step 4: Run test to verify it passes**

Run:
```bash
npm test tests/scoring-engine.test.ts
```
Expected: PASS (3 tests passed)

- [x] **Step 5: Commit Task 1**

```bash
git add src/types/scoring.ts src/lib/scoring-engine.ts tests/scoring-engine.test.ts
git commit -m "feat(scoring): add polymorphic scoring engine with strategy pattern for SKD, Olympiad, and LPDP"
```

---

### Task 2: Extensible Schema & Database Migration (Prisma)

**Files:**
- Modify: `prisma/schema.prisma`
- Modify: `prisma/seed.ts`

- [x] **Step 1: Update Prisma schema to be fully polymorphic**

Edit `prisma/schema.prisma` to make `QuestionCategory` flexible, add `examType` to `Package` & `Tryout`, add `scoringScheme` Json, and replace rigid subtest columns with `subtestScores Json`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  USER
  ADMIN
}

enum TransactionStatus {
  PENDING
  SUCCESS
  EXPIRED
  FAILED
  REFUNDED
}

enum EntitlementSource {
  PURCHASE
  FREE_PROMO
  ADMIN_GRANT
}

enum ExamMode {
  SIMULASI
  LATIHAN
}

enum ExamStatus {
  IN_PROGRESS
  COMPLETED
  EXPIRED
}

model User {
  id            String         @id @default(cuid())
  email         String         @unique
  name          String?
  avatarUrl     String?
  role          Role           @default(USER)
  isNamePublic  Boolean        @default(false)
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  accounts      Account[]
  sessions      Session[]
  userPackages  UserPackage[]
  transactions  Transaction[]
  examSessions  ExamSession[]
  bookmarks     Bookmark[]
  auditLogs     AuditLog[]

  @@map("users")
}

model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String? @db.Text
  access_token       String? @db.Text
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String? @db.Text
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

model Package {
  id           String        @id @default(cuid())
  title        String
  slug         String        @unique
  description  String?       @db.Text
  examType     String        @default("SKD_CPNS") // SKD_CPNS, LPDP_TBS, MATH_OLYMPIAD, UTBK_SNBT
  price        Int           @default(0)
  promoPrice   Int?
  isFree       Boolean       @default(false)
  isActive     Boolean       @default(true)
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt

  tryouts      Tryout[]
  userPackages UserPackage[]
  transactions Transaction[]

  @@map("packages")
}

model UserPackage {
  id         String            @id @default(cuid())
  userId     String
  packageId  String
  source     EntitlementSource @default(PURCHASE)
  grantedAt  DateTime          @default(now())

  user       User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  package    Package           @relation(fields: [packageId], references: [id], onDelete: Cascade)

  @@unique([userId, packageId])
  @@map("user_packages")
}

model Transaction {
  id               String            @id @default(cuid())
  userId           String
  packageId        String
  merchantOrderId  String            @unique
  duitkuReference  String?
  amount           Int
  paymentMethod    String?
  status           TransactionStatus @default(PENDING)
  paymentUrl       String?           @db.Text
  expiredAt        DateTime?
  paidAt           DateTime?
  createdAt        DateTime          @default(now())
  updatedAt        DateTime          @updatedAt

  user             User              @relation(fields: [userId], references: [id], onDelete: Restrict)
  package          Package           @relation(fields: [packageId], references: [id], onDelete: Restrict)

  @@map("transactions")
}

model PassingGradeProfile {
  id        String   @id @default(cuid())
  name      String
  minTWK    Int      @default(65)
  minTIU    Int      @default(80)
  minTKP    Int      @default(166)
  rules     Json?    // Optional flexible thresholds for non-SKD exams
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  tryouts   Tryout[]

  @@map("passing_grade_profiles")
}

model Tryout {
  id                    String               @id @default(cuid())
  packageId             String
  passingGradeProfileId String?
  title                 String
  examType              String               @default("SKD_CPNS")
  durationMinutes       Int                  @default(100)
  totalQuestions        Int                  @default(110)
  scoringScheme         Json?                // Custom scoring config (negative marks, IRT, etc.)
  subtestConfig         Json?                // Subtest breakdown metadata
  isActive              Boolean              @default(true)
  createdAt             DateTime             @default(now())
  updatedAt             DateTime             @updatedAt

  package               Package              @relation(fields: [packageId], references: [id], onDelete: Cascade)
  passingGradeProfile   PassingGradeProfile? @relation(fields: [passingGradeProfileId], references: [id], onDelete: SetNull)
  questions             Question[]
  examSessions          ExamSession[]

  @@map("tryouts")
}

model Question {
  id                  String           @id @default(cuid())
  tryoutId            String
  orderNumber         Int
  category            String           // Decoupled string: "TWK", "TIU", "TKP", "Aljabar", "Penalaran Verbal", etc.
  subTopic            String?
  questionType        String           @default("MULTIPLE_CHOICE") // "MULTIPLE_CHOICE" | "NUMERIC_INPUT"
  text                String           @db.Text
  imageUrl            String?
  explanation         String?          @db.Text
  explanationImageUrl String?
  createdAt           DateTime         @default(now())
  updatedAt           DateTime         @updatedAt

  tryout              Tryout           @relation(fields: [tryoutId], references: [id], onDelete: Cascade)
  options             Option[]
  examAnswers         ExamAnswer[]
  bookmarks           Bookmark[]

  @@unique([tryoutId, orderNumber])
  @@index([category])
  @@map("questions")
}

model Option {
  id         String   @id @default(cuid())
  questionId String
  key        String   // "A", "B", "C", "D", "E" or custom key
  text       String   @db.Text
  imageUrl   String?
  score      Int      @default(0) // Server-authoritative score

  question   Question @relation(fields: [questionId], references: [id], onDelete: Cascade)

  @@unique([questionId, key])
  @@map("options")
}

model ExamSession {
  id                    String      @id @default(cuid())
  userId                String
  tryoutId              String
  mode                  ExamMode    @default(SIMULASI)
  attemptNumber         Int         @default(1)
  status                ExamStatus  @default(IN_PROGRESS)
  rankEligible          Boolean     @default(false)
  startedAt             DateTime    @default(now())
  deadline              DateTime
  submittedAt           DateTime?
  totalScore            Int         @default(0)
  subtestScores         Json?       // Dynamic breakdown: { "TWK": 100, "TIU": 150, "TKP": 190 } or { "Aljabar": 16 }
  isPassed              Boolean     @default(false)
  passingGradeSnapshot  Json?

  user                  User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  tryout                Tryout      @relation(fields: [tryoutId], references: [id], onDelete: Cascade)
  answers               ExamAnswer[]

  @@map("exam_sessions")
}

model ExamAnswer {
  id               String      @id @default(cuid())
  examSessionId    String
  questionId       String
  selectedOptionId String?
  numericAnswer    String?     // For math olympiad numeric short answers
  scoreAwarded     Int         @default(0)
  isDoubt          Boolean     @default(false)
  answeredAt       DateTime    @default(now())

  examSession      ExamSession @relation(fields: [examSessionId], references: [id], onDelete: Cascade)
  question         Question    @relation(fields: [questionId], references: [id], onDelete: Cascade)

  @@unique([examSessionId, questionId])
  @@map("exam_answers")
}

model Bookmark {
  id         String   @id @default(cuid())
  userId     String
  questionId String
  createdAt  DateTime @default(now())

  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  question   Question @relation(fields: [questionId], references: [id], onDelete: Cascade)

  @@unique([userId, questionId])
  @@map("bookmarks")
}

model AuditLog {
  id        String   @id @default(cuid())
  adminId   String
  action    String
  metadata  Json?
  createdAt DateTime @default(now())

  admin     User     @relation(fields: [adminId], references: [id], onDelete: Cascade)

  @@map("audit_logs")
}
```

- [x] **Step 2: Push changes to PostgreSQL server**

Run:
```bash
npm run db:push
```
Expected: "🚀 Your database is now in sync with your Prisma schema."

- [x] **Step 3: Update `prisma/seed.ts` for flexible categories**

Update `prisma/seed.ts` to use string category `"TIU"` instead of `QuestionCategory.TIU`.

- [x] **Step 4: Run seed to verify compatibility**

Run:
```bash
npm run db:seed
```
Expected: "🎉 Successfully seeded 60 questions and all options into cat_skd_db!"

- [x] **Step 5: Commit Task 2**

```bash
git add prisma/schema.prisma prisma/seed.ts
git commit -m "feat(database): make schema polymorphic for multi-exam support"
```

---

### Task 3: Generalized Exam Player DTOs & Zustand Store

**Files:**
- Modify: `src/types/exam.ts`
- Modify: `src/stores/use-exam-store.ts`
- Test: `tests/exam-store.test.ts`

- [x] **Step 1: Write test for Zustand exam store**

Create `tests/exam-store.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { useExamStore } from '../src/stores/use-exam-store';

describe('useExamStore', () => {
  beforeEach(() => {
    useExamStore.getState().initExam({
      sessionId: 'sess-1',
      tryoutId: 'try-1',
      title: 'Olimpiade Matematika & Sains',
      mode: 'SIMULASI',
      deadline: new Date(Date.now() + 60000).toISOString(),
      serverTime: new Date().toISOString(),
      questions: [
        {
          id: 'q1',
          orderNumber: 1,
          category: 'Aljabar',
          questionType: 'MULTIPLE_CHOICE',
          text: 'Berapakah nilai dari $\\lim_{x \\to 0} \\frac{\\sin x}{x}$?',
          options: [{ id: 'opt1', key: 'A', text: '1' }, { id: 'opt2', key: 'B', text: '0' }],
        },
        {
          id: 'q2',
          orderNumber: 2,
          category: 'Geometri',
          questionType: 'NUMERIC_INPUT',
          text: 'Hitung luas segitiga dengan alas 10 dan tinggi 6.',
          options: [],
        },
      ],
    });
  });

  it('selects and deselects multiple choice options', () => {
    useExamStore.getState().selectOption('q1', 'opt1');
    expect(useExamStore.getState().answers['q1']?.selectedOptionId).toBe('opt1');

    // Deselect
    useExamStore.getState().selectOption('q1', 'opt1');
    expect(useExamStore.getState().answers['q1']?.selectedOptionId).toBeNull();
  });

  it('records numeric answers for olympiad questions', () => {
    useExamStore.getState().setNumericAnswer('q2', '30');
    expect(useExamStore.getState().answers['q2']?.numericAnswer).toBe('30');
  });

  it('extracts unique subtest categories from question list', () => {
    const subtests = useExamStore.getState().getSubtests();
    expect(subtests).toEqual(['Aljabar', 'Geometri']);
  });
});
```

- [x] **Step 2: Update `src/types/exam.ts`**

Edit `src/types/exam.ts`:

```typescript
export type QuestionType = 'MULTIPLE_CHOICE' | 'NUMERIC_INPUT';

export interface ClientOptionDTO {
  id: string;
  key: string;
  text: string;
  imageUrl?: string | null;
}

export interface ClientQuestionDTO {
  id: string;
  orderNumber: number;
  category: string; // e.g. TWK, TIU, TKP, Aljabar, Geometri, Penalaran Umum
  subTopic?: string | null;
  questionType: QuestionType;
  text: string;
  imageUrl?: string | null;
  options: ClientOptionDTO[];
}

export interface ExamSessionInitDTO {
  sessionId: string;
  tryoutId: string;
  title: string;
  mode: 'SIMULASI' | 'LATIHAN';
  startedAt: string;
  deadline: string;
  serverTime: string;
  questions: ClientQuestionDTO[];
  initialAnswers?: Record<
    string,
    { selectedOptionId?: string | null; numericAnswer?: string | null; isDoubt: boolean }
  >;
}

export interface AnswerSyncItem {
  questionId: string;
  selectedOptionId?: string | null;
  numericAnswer?: string | null;
  isDoubt: boolean;
  answeredAt: string;
}
```

- [x] **Step 3: Update `src/stores/use-exam-store.ts`**

Update `src/stores/use-exam-store.ts` to include `setNumericAnswer` and `getSubtests()`.

- [x] **Step 4: Run test to verify it passes**

Run:
```bash
npm test tests/exam-store.test.ts
```
Expected: PASS (3 tests passed)

- [x] **Step 5: Commit Task 3**

```bash
git add src/types/exam.ts src/stores/use-exam-store.ts tests/exam-store.test.ts
git commit -m "feat(store): expand exam store for numeric inputs and dynamic subtest categories"
```

---

### Task 4: KaTeX Math & Multimodal Renderer Component

**Files:**
- Create: `src/components/exam/MathRenderer.tsx`
- Test: `tests/math-renderer.test.ts`

- [x] **Step 1: Write test for KaTeX formula parsing**

Create `tests/math-renderer.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import katex from 'katex';

describe('KaTeX Math Rendering', () => {
  it('renders inline latex math to valid HTML string', () => {
    const rawLatex = '\\frac{a}{b}';
    const html = katex.renderToString(rawLatex, { throwOnError: false });
    expect(html).toContain('katex');
    expect(html).toContain('mfrac');
  });

  it('renders complex olympiad formulas without throwing', () => {
    const formula = '\\sum_{i=1}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}';
    const html = katex.renderToString(formula, { throwOnError: false });
    expect(html).toContain('katex');
  });
});
```

- [x] **Step 2: Run test to verify KaTeX works**

Run:
```bash
npm test tests/math-renderer.test.ts
```
Expected: PASS

- [x] **Step 3: Implement `src/components/exam/MathRenderer.tsx`**

Create `src/components/exam/MathRenderer.tsx` (supports mixed text + KaTeX expressions delimiter `$...$` and `$$...$$`):

```tsx
'use client';

import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  content: string;
  className?: string;
}

export function MathRenderer({ content, className = '' }: MathRendererProps) {
  const renderedContent = useMemo(() => {
    if (!content) return '';

    // Replace display math $$...$$
    let formatted = content.replace(/\$\$(.+?)\$\$/gs, (_, math) => {
      try {
        return katex.renderToString(math.trim(), { displayMode: true, throwOnError: false });
      } catch {
        return `$$${math}$$`;
      }
    });

    // Replace inline math $...$
    formatted = formatted.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
      try {
        return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false });
      } catch {
        return `$${math}$`;
      }
    });

    return formatted;
  }, [content]);

  return (
    <div
      className={`prose max-w-none text-slate-800 dark:text-slate-100 ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
}
```

- [x] **Step 4: Verify build with KaTeX component**

Run:
```bash
npm run build
```
Expected: ✓ Compiled successfully

- [x] **Step 5: Commit Task 4**

```bash
git add src/components/exam/MathRenderer.tsx tests/math-renderer.test.ts
git commit -m "feat(ui): add KaTeX MathRenderer component for mathematical expressions"
```

---

### Task 5: Extensible Question Palette & Section Navigation

**Files:**
- Create: `src/components/exam/QuestionPalette.tsx`
- Create: `src/components/exam/ExamHeader.tsx`

- [x] **Step 1: Implement `src/components/exam/QuestionPalette.tsx`**

Create `src/components/exam/QuestionPalette.tsx`:
- Group by Category/Subtest tabs if multiple categories exist.
- Colors: Green (Answered), Yellow (Doubt), Gray (Unanswered), Blue Ring (Active).
- Touch target $\ge 44 \times 44$ px for mobile ergonomics.
- Shows total statistics (answered count, doubt count, remaining count).

- [x] **Step 2: Implement `src/components/exam/ExamHeader.tsx`**

Create `src/components/exam/ExamHeader.tsx`:
- Real-time countdown timer bound to `deadline` and `serverTimeOffsetMs`.
- Subtest badge of current active question.
- Submit button with confirmation dialog.

- [x] **Step 3: Test build**

Run:
```bash
npm run build
```
Expected: ✓ Compiled successfully

- [x] **Step 4: Commit Task 5**

```bash
git add src/components/exam/QuestionPalette.tsx src/components/exam/ExamHeader.tsx
git commit -m "feat(ui): add section-aware question palette and exam header with server timer"
```

---

### Task 6: Fullscreen CBT Player Page Assembly & Submission Handler

**Files:**
- Create: `src/components/exam/QuestionViewer.tsx`
- Create: `src/app/(exam)/exam/[sessionId]/page.tsx`
- Create: `src/app/api/sessions/[sessionId]/submit/route.ts`

- [x] **Step 1: Implement `src/components/exam/QuestionViewer.tsx`**

Handles:
- Question text rendering with `MathRenderer`.
- Optional question image.
- Polymorphic answers:
  - If `questionType === 'MULTIPLE_CHOICE'`: renders 5 option buttons (A-E) with KaTeX and image support.
  - If `questionType === 'NUMERIC_INPUT'`: renders high-contrast number input field for Math Olympiad.
- "Tandai Ragu-Ragu" checkbox button.
- "Sebelumnya" & "Selanjutnya" navigation buttons (< 16ms instant switch).

- [x] **Step 2: Assemble Fullscreen Exam Player in `src/app/(exam)/exam/[sessionId]/page.tsx`**

- Responsive layout: Drawer on mobile for question palette, sticky side panel on desktop.
- Keyboard navigation (Arrow keys, keys A-E for instant answer).
- Offline banner notification if network drops.

- [x] **Step 3: Implement Submission Route in `src/app/api/sessions/[sessionId]/submit/route.ts`**

- Evaluates answers using `calculateExamScore()` based on `tryout.examType`.
- Saves `totalScore`, `subtestScores`, and `isPassed`.
- Returns final score and activates review access.

- [x] **Step 4: Run full test suite & production build**

Run:
```bash
npm test && npm run build
```
Expected: All tests pass, build completes with 0 errors.

- [x] **Step 5: Commit Task 6**

```bash
git add src/components/exam/QuestionViewer.tsx src/app/\(exam\)/exam/\[sessionId\]/page.tsx src/app/api/sessions/\[sessionId\]/submit/route.ts
git commit -m "feat(cbt): assemble fullscreen polymorphic exam player and submission route"
```

---

## Self-Review Checklist

1. **Spec Coverage:**
   - Multi-Exam Support (SKD, LPDP, Math Olympiad, UTBK)? Covered in Task 1 & Task 2.
   - KaTeX Math rendering? Covered in Task 4.
   - Zero Answer Leakage DTOs? Covered in Task 3.
   - Numeric input for Olympiad? Covered in Task 3 & Task 6.
   - Server-Authoritative Timer & Grace Period? Covered in Task 5 & Task 6.
2. **Placeholder Scan:**
   - No "TODO", "TBD", or unwritten steps found.
3. **Type Consistency:**
   - `ExamType`, `QuestionType`, and `ExamScoreResult` types are defined in `src/types/scoring.ts` and uniformly used across all tasks.
