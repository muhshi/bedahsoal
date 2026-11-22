# Multi-Exam Question Bank & Diverse Packages Expansion Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand BedahSoal question bank to over 450+ rich, authentic questions across all major examination formats (SKD CPNS, LPDP TBS, Olimpiade Matematika, UTBK SNBT) with polymorphic scoring, LaTeX math rendering, and subtest configs.

**Architecture:** Independent seed modules in `prisma/seeds/` populate packages, tryouts, and questions with their specific scoring schemes and passing grade profiles. A master seeder orchestrates execution. The swarm coordinator assigns independent packages to parallel authoring workers, with a verifier validating schema consistency, option formatting, and test suites.

**Tech Stack:** TypeScript, Prisma ORM, PostgreSQL, KaTeX, Vitest.

---

### Task 1: UTBK-SNBT 2026/2027 Mastery Package
**Files:**
- Create: `prisma/seeds/seed-utbk-snbt.ts`
- Target: 45 questions across TPS (Penalaran Umum, Kuantitatif, Pemahaman Bacaan) and Literasi Matematika.
- Format: Pilihan Ganda A-E, standard scoring (+1 / 0) and explanation with KaTeX.

### Task 2: LPDP TBS (Tes Bakat Skolastik) Advanced Package
**Files:**
- Create: `prisma/seeds/seed-lpdp-advanced.ts`
- Target: 40 questions across Penalaran Verbal, Penalaran Kuantitatif, Penalaran Pemecahan Masalah.
- Format: Pilihan Ganda A-E, scoring (+1 / 0) with comprehensive analytical explanations.

### Task 3: Olimpiade Sains Matematika Paket 2 (OSN-K/P)
**Files:**
- Create: `prisma/seeds/seed-olimpiade-p2.ts`
- Target: 25 questions across Aljabar, Geometri, Teori Bilangan, Kombinatorika.
- Format: Rich LaTeX math formulas, negative marking scheme (+4 / -1 / 0).

### Task 4: SKD CPNS Paket 2 (110 Butir Lengkap TWK, TIU, TKP)
**Files:**
- Create: `prisma/seeds/seed-skd-paket2.ts`
- Target: 110 questions: TWK (30), TIU (35), TKP (45 dengan bobot 1-5).
- Format: Passing Grade profile BKN (TWK 65, TIU 80, TKP 166).

### Task 5: Master Seed Aggregation & Verification
**Files:**
- Modify: `prisma/seed.ts`
- Test: `tests/question-bank-integrity.test.ts`
- Deploy: Remote database sync & build verification.
