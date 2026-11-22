# Editorial Paper Redesign Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate BedahSoal from generic SaaS styling to the authentic "Kertas Ujian / Editorial Exam Atelier" visual identity prototyped in `prototypes/redesign/index.html`, including paper & ink color tokens, Fraunces serif + JetBrains Mono typography, editorial grid backgrounds, brutalist paper cards, exam stamp badges, and the "Empat Meja Ujian" structure.

**Architecture:** Tailwind CSS v4 `@theme` configuration in `src/app/globals.css` with CSS custom properties (`--paper`, `--ink`, `--line`, `--red-stamp`). Next.js `next/font/google` integrates `Fraunces`, `Manrope`, and `JetBrains Mono` into `src/app/layout.tsx`. Components (`Navbar`, `Hero`, `CategorizedCatalog`, `ExamCard`, `ModalCard`, and `ExamWorkbench`) are incrementally refactored to use the editorial atelier design language.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4, Lucide React, Google Fonts (`Fraunces`, `Manrope`, `JetBrains Mono`).

---

### File Structure Map
- Modify: `src/app/globals.css` - Custom design tokens, graph paper background, ink borders, brutalist hard shadows, stamp utilities.
- Modify: `src/app/layout.tsx` - Load Google Fonts (`Fraunces`, `Manrope`, `JetBrains Mono`) with CSS variable bindings.
- Create: `src/components/ui/StampBadge.tsx` - Retro ink stamp component (LULUS, TIDAK MEMENUHI AMBANG BATAS, RESMI BKN).
- Modify: `src/components/auth/UserNav.tsx` - Editorial paper styled navigation bar and user profile dropdown.
- Modify: `src/app/page.tsx` - Editorial hero section (*"Ujian bukan soal tebak-tebakan. Bedah soalnya."*) with live exam card preview and 4-pillar value propositions.
- Modify: `src/components/catalog/CategorizedCatalog.tsx` - Refactor to "Empat Meja Ujian" track selector, index-card exam cards, and mono badges.
- Modify: `src/components/auth/LoginModal.tsx` & `src/components/payment/CheckoutModal.tsx` - Editorial paper modal cards with hard shadows and ink borders.
- Test: `tests/design-tokens.test.ts` - Style integrity and component rendering tests.

---

### Task 1: Design Tokens & Typography Setup

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Test: `tests/design-tokens.test.ts`

- [x] **Step 1: Write verification test for design tokens and font variables**

```typescript
// tests/design-tokens.test.ts
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Editorial Paper Design Tokens', () => {
  it('defines required paper & ink color variables in globals.css', () => {
    const css = fs.readFileSync(path.resolve(__dirname, '../src/app/globals.css'), 'utf-8');
    expect(css).toContain('--paper:');
    expect(css).toContain('--ink:');
    expect(css).toContain('--red-stamp:');
    expect(css).toContain('--font-display:');
    expect(css).toContain('--font-mono:');
  });

  it('configures Fraunces and JetBrains Mono in layout.tsx', () => {
    const layout = fs.readFileSync(path.resolve(__dirname, '../src/app/layout.tsx'), 'utf-8');
    expect(layout).toContain('Fraunces');
    expect(layout).toContain('JetBrains_Mono');
    expect(layout).toContain('Manrope');
  });
});
```

- [x] **Step 2: Update `src/app/globals.css` with Paper & Ink tokens**

```css
@import "tailwindcss";

@layer base {
  :root {
    --paper: #f3efe3;
    --paper-2: #eae3d2;
    --paper-3: #ded4bf;
    --white: #fbf8f0;
    --ink: #191713;
    --ink-2: #4b463d;
    --ink-3: #7a7365;
    --line: #d2c8b2;
    --line-strong: #b9ac91;
    --red-stamp: #c4402a;
    --red-dark: #9c2f1e;
    --green-stamp: #2f5a44;
    --amber-flag: #b67a18;
    --blue-ink: #23415c;
  }

  body {
    background-color: var(--paper);
    color: var(--ink);
    background-image:
      linear-gradient(rgba(25, 23, 19, 0.026) 1px, transparent 1px),
      linear-gradient(90deg, rgba(25, 23, 19, 0.026) 1px, transparent 1px);
    background-size: 56px 56px;
  }
}

/* Hard brutalist box shadows for paper cards */
.shadow-paper {
  box-shadow: 6px 6px 0 var(--line-strong);
}

.shadow-paper-lg {
  box-shadow: 10px 10px 0 var(--paper-3);
}

.shadow-paper-hover:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 var(--ink);
}
```

- [x] **Step 3: Update `src/app/layout.tsx` to bind Google Fonts**

```typescript
import { Fraunces, Manrope, JetBrains_Mono } from 'next/font/google';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});
```

- [x] **Step 4: Run tests and verify tokens**

Run: `npx vitest run tests/design-tokens.test.ts`
Expected: PASS

- [x] **Step 5: Commit Task 1**

```bash
git add src/app/globals.css src/app/layout.tsx tests/design-tokens.test.ts
git commit -m "style(theme): configure paper & ink tokens, graph grid, and Fraunces/JetBrains Mono fonts"
```

---

### Task 2: Stamp Badge Component (`StampBadge.tsx`)

**Files:**
- Create: `src/components/ui/StampBadge.tsx`
- Test: `tests/stamp-badge.test.ts`

- [x] **Step 1: Write test for StampBadge**
- [x] **Step 2: Implement StampBadge with rotated ink borders and monospace typography**

```typescript
// src/components/ui/StampBadge.tsx
export interface StampBadgeProps {
  label: string;
  variant?: 'red' | 'green' | 'amber' | 'neutral';
  rotate?: number;
  className?: string;
}

export function StampBadge({ label, variant = 'red', rotate = -2, className = '' }: StampBadgeProps) {
  const colorStyles = {
    red: 'border-[#c4402a] text-[#c4402a] bg-[#c4402a]/5',
    green: 'border-[#2f5a44] text-[#2f5a44] bg-[#2f5a44]/5',
    amber: 'border-[#b67a18] text-[#b67a18] bg-[#b67a18]/5',
    neutral: 'border-[#4b463d] text-[#4b463d] bg-black/5',
  };

  return (
    <span
      style={{ transform: `rotate(${rotate}deg)` }}
      className={`inline-block px-2.5 py-0.5 border-2 font-mono text-[11px] font-bold uppercase tracking-wider select-none ${colorStyles[variant]} ${className}`}
    >
      {label}
    </span>
  );
}
```

- [x] **Step 3: Commit Task 2**

```bash
git add src/components/ui/StampBadge.tsx tests/stamp-badge.test.ts
git commit -m "feat(ui): implement retro exam StampBadge component"
```

---

### Task 3: Editorial Paper Hero Section & Value Propositions

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/auth/UserNav.tsx`

- [x] **Step 1: Refactor `src/components/auth/UserNav.tsx` with paper aesthetic**
  - Brand logo with `[B]` serif mark and "Ruang Bedah Ujian" kicker.
  - Border-bottom 1px solid `var(--line)` and clean paper background.
- [x] **Step 2: Refactor Hero section in `src/app/page.tsx`**
  - Main headline: *"Ujian bukan soal tebak-tebakan. Bedah soalnya."* in `font-serif` (Fraunces).
  - Subtitle: *"Simulasi ujian dengan timer server, penilaian resmi, dan pembahasan yang menunjukkan di mana logikamu patah — bukan sekadar angka di akhir layar."*
  - Interactive live simulation teaser card with animated timer (`01:39:42`) and real sample question preview.
  - 4 Pillars:
    1. *Soal yang tidak bocor* (Zero answer leakage).
    2. *Waktu yang tidak bisa ditawar* (Server authoritative timer).
    3. *Nilai yang bisa dipertanggungjawabkan* (Passing grade profile resmi BKN).
    4. *Pembahasan yang membedah* (Step-by-step logic breakdown).
- [x] **Step 3: Run `npm run build` to verify clean build**
- [x] **Step 4: Commit Task 3**

```bash
git add src/app/page.tsx src/components/auth/UserNav.tsx
git commit -m "feat(ui): adopt editorial paper hero and value pillars on landing page"
```

---

### Task 4: "Empat Meja Ujian" Catalog Refactor (`CategorizedCatalog.tsx`)

**Files:**
- Modify: `src/components/catalog/CategorizedCatalog.tsx`
- Modify: `tests/categorized-catalog.test.ts`

- [x] **Step 1: Refactor Category Tabs to "Empat Meja Ujian" index tabs**
  - 00: SEMUA PAKET
  - 01: SKD CPNS (110 Butir, Passing Grade BKN)
  - 02: TBS LPDP (Skolastik Magister & Doktor)
  - 03: UTBK-SNBT (TPS & Literasi)
  - 04: OLIMPIADE SAINS (Matematika & Isian)
- [x] **Step 2: Redesign Exam Cards into "Lembar Soal" index cards**
  - Paper white background (`bg-[#fbf8f0]`), 1px ink border (`border-[#191713]`), and hard paper shadow.
  - Category tag in monospaced kicker.
  - Duration and question count in monospaced badge.
  - Price tag in stamp style (e.g. `GRATIS` green stamp or `Rp 25.000` ink badge).
- [x] **Step 3: Run tests and `npm run build`**
- [x] **Step 4: Commit Task 4**

```bash
git add src/components/catalog/CategorizedCatalog.tsx tests/categorized-catalog.test.ts
git commit -m "feat(catalog): transform tryout cards into editorial exam paper index cards"
```

---

### Task 5: Production Deployment & Visual Regression Verification

- [x] **Step 1: Run full test suite (`npx vitest run`) and build (`npm run build`)**
- [x] **Step 2: Push changes to GitHub `main`**
- [x] **Step 3: Deploy to production server via Tailscale (`bpsdemak@100.106.152.115`)**
- [x] **Step 4: Verify live UI on `https://bedahsoal.muhshi.my.id`**
