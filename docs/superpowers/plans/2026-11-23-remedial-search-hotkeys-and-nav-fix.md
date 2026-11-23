# Remedial Drill, Live Catalog Search, Hotkeys & Navbar Hash Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement interactive mistake drill mode (remedial), live catalog instant search, full exam keyboard hotkeys with 5-minute timer alert, and fix the navbar active hash indicator for Katalog and Prinsip Ujian.

**Architecture:** 
1. Fix client navigation state in `UserNav.tsx` using hash listener and intersection observer to dynamically track `#katalog` and `#keunggulan`.
2. Add live text search and counter with empty state in `CategorizedCatalog.tsx`.
3. Add interactive Remedial Drill mode in `ExamReviewViewer.tsx` allowing instant re-testing on wrong/doubt questions with immediate feedback.
4. Enhance keyboard shortcuts (A-E, 1-5, Arrows, R) in `QuestionViewer.tsx` and 5-minute timer warning alert in `ExamHeader.tsx`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Vitest, Tailwind CSS v4.

---

### File Structure Map

| File Path | Responsibility |
|---|---|
| `src/components/auth/UserNav.tsx` | Dynamic client active tab highlighting based on route, URL hash (`#katalog`, `#keunggulan`), and section observer |
| `tests/navbar-active.test.ts` | Unit tests for navigation active tab resolution logic |
| `src/components/catalog/CategorizedCatalog.tsx` | Live search input, query matching across packages/tryouts, dynamic counter, and empty search state |
| `tests/categorized-catalog.test.ts` | Tests for catalog search filtering, empty search results, and category tab combinations |
| `src/components/exam/ExamReviewViewer.tsx` | Interactive "Mode Drill Soal Salah" with instant option feedback, retry loop, and remedial completion badge |
| `tests/review-remedial.test.ts` | Tests for review remedial question filtering, answer submission in drill mode, and mastery tracking |
| `src/app/(exam)/exam/[sessionId]/page.tsx` & `src/components/exam/QuestionViewer.tsx` | Number keys 1-5 support, visual hotkey badges [A]-[E], shortcuts footer note |
| `src/components/exam/ExamHeader.tsx` | 5-minute remaining visual warning badge and pulsating critical timer alert |
| `tests/exam-hotkeys.test.ts` | Tests verifying keyboard shortcuts and timer threshold warning |

---

### Task 1: Fix Navbar Active Indicator for Hash Navigation

**Files:**
- Modify: `src/components/auth/UserNav.tsx:28-230`
- Create: `tests/navbar-active.test.ts`

- [ ] **Step 1: Write test for hash & section tab resolution**

Create `tests/navbar-active.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';

export function resolveActiveNav(pathname: string, hash: string): 'home' | 'catalog' | 'dashboard' | 'principles' {
  if (pathname.startsWith('/dashboard')) return 'dashboard';
  if (pathname === '/' || pathname === '') {
    if (hash === '#katalog' || hash === 'katalog') return 'catalog';
    if (hash === '#keunggulan' || hash === 'keunggulan') return 'principles';
    return 'home';
  }
  return 'home';
}

describe('resolveActiveNav', () => {
  it('identifies dashboard when on /dashboard', () => {
    expect(resolveActiveNav('/dashboard', '')).toBe('dashboard');
  });

  it('identifies catalog when on /#katalog', () => {
    expect(resolveActiveNav('/', '#katalog')).toBe('catalog');
  });

  it('identifies principles when on /#keunggulan', () => {
    expect(resolveActiveNav('/', '#keunggulan')).toBe('principles');
  });

  it('defaults to home when on / with no hash', () => {
    expect(resolveActiveNav('/', '')).toBe('home');
  });
});
```

- [ ] **Step 2: Run test to verify it passes**

Run: `npx vitest run tests/navbar-active.test.ts`
Expected: PASS

- [ ] **Step 3: Update `UserNav.tsx` with dynamic section detection**

In `src/components/auth/UserNav.tsx`:
Add `currentTab` state initialized with `activeTab`.
Add `useEffect` that listens to `window.location.hash` and `hashchange` event.
Add `IntersectionObserver` on `#katalog` and `#keunggulan` to update `currentTab` as the user scrolls.
Add active indicator underline (`border-b-[#c4402a] text-[#191713] font-semibold`) to "Prinsip Ujian" when `currentTab === 'principles'`.
Update mobile drawer navigation to reflect `currentTab`.

- [ ] **Step 4: Run type check & tests**

Run: `npx tsc --noEmit && npx vitest run tests/navbar-active.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/auth/UserNav.tsx tests/navbar-active.test.ts
git commit -m "fix(nav): highlight active nav tabs dynamically for hash links and scroll sections"
```

---

### Task 2: Live Search & Real-Time Filter in Catalog

**Files:**
- Modify: `src/components/catalog/CategorizedCatalog.tsx:140-230`
- Modify: `tests/categorized-catalog.test.ts`

- [ ] **Step 1: Write tests for live search filter**

Update `tests/categorized-catalog.test.ts`:
Add tests for matching package titles, exam types, and clearing search:
```typescript
import { filterPackagesBySearch } from '../src/components/catalog/CategorizedCatalog';

describe('filterPackagesBySearch', () => {
  const samplePackages = [
    {
      id: 'p1',
      title: 'Tryout Akbar SKD CPNS 2026',
      slug: 'skd-cpns',
      description: 'Simulasi TWK, TIU, TKP',
      examType: 'SKD_CPNS',
      price: 0,
      promoPrice: null,
      isFree: true,
      tryouts: [{ id: 't1', title: 'SKD Sesi 1', durationMinutes: 100, totalQuestions: 110 }],
    },
    {
      id: 'p2',
      title: 'Mastery TBS LPDP',
      slug: 'tbs-lpdp',
      description: 'Penalaran Verbal dan Kuantitatif',
      examType: 'LPDP_TBS',
      price: 50000,
      promoPrice: null,
      isFree: false,
      tryouts: [{ id: 't2', title: 'TBS Sesi 1', durationMinutes: 90, totalQuestions: 60 }],
    },
  ];

  it('filters packages matching title or description', () => {
    const result = filterPackagesBySearch(samplePackages, 'LPDP');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('p2');
  });

  it('is case-insensitive', () => {
    const result = filterPackagesBySearch(samplePackages, 'skd');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('p1');
  });

  it('returns all when query is empty', () => {
    const result = filterPackagesBySearch(samplePackages, '');
    expect(result).toHaveLength(2);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/categorized-catalog.test.ts`
Expected: FAIL (`filterPackagesBySearch` not exported)

- [ ] **Step 3: Implement search filter in `CategorizedCatalog.tsx`**

Export `filterPackagesBySearch(packages: PackageData[], query: string): PackageData[]`.
Add state `searchQuery` and `setSearchQuery` in `CategorizedCatalog`.
Render search bar with:
- Search icon & input with placeholder `"Cari paket, topik, atau jenis ujian (cth: SKD, LPDP, Olimpiade)..."`
- Clear button `[×]` when query is present.
- Real-time counter: `"Menampilkan X dari Y paket"`.
- Empty state with reset button when no results match.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/categorized-catalog.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/catalog/CategorizedCatalog.tsx tests/categorized-catalog.test.ts
git commit -m "feat(catalog): add live instant search, dynamic counter, and empty search state"
```

---

### Task 3: Interactive Mistake Remedial Drill in Review Viewer

**Files:**
- Modify: `src/components/exam/ExamReviewViewer.tsx:25-250`
- Create: `tests/review-remedial.test.ts`

- [ ] **Step 1: Write test for remedial drill logic**

Create `tests/review-remedial.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';
import { getRemedialQuestions } from '../src/components/exam/ExamReviewViewer';
import { QuestionReviewDTO } from '../src/types/exam';

describe('getRemedialQuestions', () => {
  it('filters questions that were answered incorrectly or unanswered', () => {
    const mockQuestions: QuestionReviewDTO[] = [
      {
        id: 'q1',
        orderNumber: 1,
        category: 'TIU',
        subTopic: 'Deret',
        questionType: 'MULTIPLE_CHOICE',
        text: 'Soal 1',
        options: [{ id: 'opt1', key: 'A', text: 'Opt A', score: 5 }],
        correctOptionKey: 'A',
        explanation: 'Penjelasan 1',
        userAnswer: { selectedOptionId: 'opt1', isCorrect: true, scoreAwarded: 5, isDoubt: false },
      },
      {
        id: 'q2',
        orderNumber: 2,
        category: 'TIU',
        subTopic: 'Silogisme',
        questionType: 'MULTIPLE_CHOICE',
        text: 'Soal 2',
        options: [{ id: 'opt2', key: 'B', text: 'Opt B', score: 0 }],
        correctOptionKey: 'A',
        explanation: 'Penjelasan 2',
        userAnswer: { selectedOptionId: 'opt2', isCorrect: false, scoreAwarded: 0, isDoubt: false },
      },
    ];

    const result = getRemedialQuestions(mockQuestions);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('q2');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/review-remedial.test.ts`
Expected: FAIL (`getRemedialQuestions` not exported)

- [ ] **Step 3: Implement Remedial Drill in `ExamReviewViewer.tsx`**

1. Export helper `getRemedialQuestions(questions: QuestionReviewDTO[]): QuestionReviewDTO[]`.
2. Add state `isDrillMode: boolean`, `drillAnswers: Record<string, string>`, `drillSolved: Set<string>`.
3. Add prominent button: **[Drill Soal Salah (X Butir)]** in header and top result card.
4. When drill mode is active:
   - Only cycle through remedial questions.
   - User can click options: immediate validation shows green border if correct, red if incorrect.
   - Once answered correctly, mark question as solved and advance to next unsolved mistake!
   - When all remedial questions are solved, render StampBadge: `[100% TUNTAS REMEDIAL]`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/review-remedial.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/exam/ExamReviewViewer.tsx tests/review-remedial.test.ts
git commit -m "feat(review): implement interactive remedial drill mode for wrong and doubt questions"
```

---

### Task 4: Keyboard Shortcuts & 5-Minute Timer Alert

**Files:**
- Modify: `src/app/(exam)/exam/[sessionId]/page.tsx:280-320`
- Modify: `src/components/exam/QuestionViewer.tsx:100-180`
- Modify: `src/components/exam/ExamHeader.tsx:60-120`
- Create: `tests/exam-hotkeys.test.ts`

- [ ] **Step 1: Write test for number-to-option mapping**

Create `tests/exam-hotkeys.test.ts`:
```typescript
import { describe, it, expect } from 'vitest';

export function mapKeyToOptionLetter(key: string): string | null {
  const k = key.toLowerCase();
  const map: Record<string, string> = {
    '1': 'A', 'a': 'A',
    '2': 'B', 'b': 'B',
    '3': 'C', 'c': 'C',
    '4': 'D', 'd': 'D',
    '5': 'E', 'e': 'E',
  };
  return map[k] || null;
}

describe('mapKeyToOptionLetter', () => {
  it('maps numbers 1-5 and letters a-e to uppercase option letters', () => {
    expect(mapKeyToOptionLetter('1')).toBe('A');
    expect(mapKeyToOptionLetter('2')).toBe('B');
    expect(mapKeyToOptionLetter('c')).toBe('C');
    expect(mapKeyToOptionLetter('5')).toBe('E');
    expect(mapKeyToOptionLetter('9')).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it passes**

Run: `npx vitest run tests/exam-hotkeys.test.ts`
Expected: PASS

- [ ] **Step 3: Update `page.tsx`, `QuestionViewer.tsx`, and `ExamHeader.tsx`**

1. In `src/app/(exam)/exam/[sessionId]/page.tsx`:
   Support `1`–`5` alongside `a`–`e` using `mapKeyToOptionLetter`.
2. In `src/components/exam/QuestionViewer.tsx`:
   Add shortcuts hint in footer: `"Pilih A–E / 1–5 · ← → pindah · R ragu-ragu"`.
   Display key label `[A]`, `[B]`, etc. in option button with distinct editorial paper style.
3. In `src/components/exam/ExamHeader.tsx`:
   When `remainingMs <= 5 * 60 * 1000` (5 minutes), show warning indicator `[SISA < 5 MENIT]` with pulsating red outline.

- [ ] **Step 4: Run all tests & type check**

Run: `npx tsc --noEmit && npm test`
Expected: 0 errors, all test suites pass.

- [ ] **Step 5: Commit**

```bash
git add src/app/(exam)/exam/[sessionId]/page.tsx src/components/exam/QuestionViewer.tsx src/components/exam/ExamHeader.tsx tests/exam-hotkeys.test.ts
git commit -m "feat(exam): add 1-5 hotkeys, shortcuts guide, and 5-minute critical timer alert"
```

---

### Task 5: Full Verification and Production Deployment

- [ ] **Step 1: Run TypeScript type check**
Run: `npx tsc --noEmit`
- [ ] **Step 2: Run full test suite**
Run: `npm test`
- [ ] **Step 3: Run Turbopack production build**
Run: `npm run build`
- [ ] **Step 4: Push to remote main**
Run: `git push origin main`
- [ ] **Step 5: Deploy to production server**
Run: `ssh bpsdemak@100.106.152.115 "cd /home/bpsdemak/apps/muhshi/bedahsoal && git pull origin main && ./deploy.sh"`
- [ ] **Step 6: Live healthcheck verification**
Run: `curl -s -i https://bedahsoal.muhshi.my.id/api/health`
