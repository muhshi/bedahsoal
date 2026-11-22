import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';

describe('Question Bank Integrity & Multi-Exam Verification', () => {
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    if (prisma) {
      await prisma.$disconnect();
    }
  });

  describe('1. Target Packages & Tryouts Existence', () => {
    const allExpectedSlugs = [
      'simulasi-tiu-60-mastery',
      'skd-cpns-mastery-110',
      'olimpiade-matematika-sains',
      'tbs-beasiswa-lpdp',
      'utbk-snbt-2026-mastery',
      'lpdp-tbs-advanced-p2',
      'olimpiade-matematika-paket-2',
      'skd-cpns-akbar-paket-2',
    ];

    it('all 8 multi-exam packages exist with total 450 questions and 2250 options', async () => {
      const packageCount = await prisma.package.count();
      expect(packageCount).toBeGreaterThanOrEqual(8);

      const questionCount = await prisma.question.count();
      expect(questionCount).toBeGreaterThanOrEqual(450);

      const optionCount = await prisma.option.count();
      expect(optionCount).toBe(questionCount * 5);
    });

    it.each(allExpectedSlugs)('package "%s" must exist and be active with questions', async (slug) => {
      const pkg = await prisma.package.findUnique({
        where: { slug },
        include: {
          tryouts: {
            include: {
              _count: { select: { questions: true } },
            },
          },
        },
      });

      expect(pkg).not.toBeNull();
      expect(pkg?.isActive).toBe(true);
      expect(pkg?.tryouts.length).toBeGreaterThanOrEqual(1);
      const tryout = pkg!.tryouts[0];
      expect(tryout._count.questions).toBe(tryout.totalQuestions);
      expect(tryout.totalQuestions).toBeGreaterThan(0);
    });
  });

  describe('2. Global Question Ordering & Sequence Integrity', () => {
    it('every tryout has sequential orderNumbers from 1 to totalQuestions with zero duplicates or gaps', async () => {
      const tryouts = await prisma.tryout.findMany({
        include: {
          questions: {
            orderBy: { orderNumber: 'asc' },
            select: { id: true, orderNumber: true },
          },
        },
      });

      expect(tryouts.length).toBeGreaterThan(0);

      for (const tryout of tryouts) {
        expect(tryout.questions.length).toBe(tryout.totalQuestions);

        const orderNumbers = tryout.questions.map((q) => q.orderNumber);
        const uniqueOrders = new Set(orderNumbers);

        // Zero duplicates
        expect(uniqueOrders.size).toBe(orderNumbers.length);

        // Sequential 1 to N
        for (let i = 1; i <= tryout.totalQuestions; i++) {
          expect(orderNumbers[i - 1]).toBe(i);
        }
      }
    });
  });

  describe('3. Standard 5-Option (A-E) Completeness', () => {
    it('every single question across all tryouts has exactly 5 options A, B, C, D, E with non-empty text', async () => {
      const questions = await prisma.question.findMany({
        include: {
          options: {
            orderBy: { key: 'asc' },
          },
        },
      });

      expect(questions.length).toBeGreaterThan(0);

      const expectedKeys = ['A', 'B', 'C', 'D', 'E'];

      for (const q of questions) {
        expect(q.options.length).toBe(5);

        const optionKeys = q.options.map((o) => o.key).sort();
        expect(optionKeys).toEqual(expectedKeys);

        for (const opt of q.options) {
          expect(opt.text).toBeDefined();
          expect(opt.text.trim().length).toBeGreaterThan(0);
          expect(typeof opt.score).toBe('number');
        }
      }
    });
  });

  describe('4. Question Content & In-Depth Explanation Integrity', () => {
    it('all questions have non-empty text, valid category, and thorough explanation', async () => {
      const questions = await prisma.question.findMany({
        select: {
          id: true,
          orderNumber: true,
          text: true,
          category: true,
          explanation: true,
          tryout: { select: { title: true } },
        },
      });

      for (const q of questions) {
        expect(q.text.trim().length).toBeGreaterThan(5);
        expect(q.category.trim().length).toBeGreaterThan(1);
        expect(q.explanation).not.toBeNull();
        expect(q.explanation!.trim().length).toBeGreaterThan(10);
      }
    });
  });

  describe('5. SKD CPNS Akbar Paket 2 Specifications', () => {
    it('verifies 110 questions, TWK/TIU 0/5 scoring, TKP 1-5 scoring, and passing grade profile', async () => {
      const pkg = await prisma.package.findUnique({
        where: { slug: 'skd-cpns-akbar-paket-2' },
        include: {
          tryouts: {
            include: {
              passingGradeProfile: true,
              questions: {
                orderBy: { orderNumber: 'asc' },
                include: { options: true },
              },
            },
          },
        },
      });

      expect(pkg).not.toBeNull();
      expect(pkg?.examType).toBe('SKD_CPNS');

      const tryout = pkg?.tryouts[0];
      expect(tryout).toBeDefined();
      expect(tryout?.totalQuestions).toBe(110);
      expect(tryout?.questions.length).toBe(110);

      // Verify Passing Grade Profile
      expect(tryout?.passingGradeProfile).not.toBeNull();
      expect(tryout?.passingGradeProfile?.minTWK).toBe(65);
      expect(tryout?.passingGradeProfile?.minTIU).toBe(80);
      expect(tryout?.passingGradeProfile?.minTKP).toBe(166);

      // Check subtest splits and scoring rubrics:
      // TWK: questions 1 to 30 (score 5 for correct, 0 for wrong)
      const twkQuestions = tryout!.questions.slice(0, 30);
      for (const q of twkQuestions) {
        expect(q.category).toBe('TWK');
        const scores = q.options.map((o) => o.score);
        const correctCount = scores.filter((s) => s === 5).length;
        const zeroCount = scores.filter((s) => s === 0).length;
        expect(correctCount).toBe(1);
        expect(zeroCount).toBe(4);
      }

      // TIU: questions 31 to 65 (score 5 for correct, 0 for wrong)
      const tiuQuestions = tryout!.questions.slice(30, 65);
      for (const q of tiuQuestions) {
        expect(q.category).toBe('TIU');
        const scores = q.options.map((o) => o.score);
        const correctCount = scores.filter((s) => s === 5).length;
        const zeroCount = scores.filter((s) => s === 0).length;
        expect(correctCount).toBe(1);
        expect(zeroCount).toBe(4);
      }

      // TKP: questions 66 to 110 (all options scored on 1-5 scale)
      const tkpQuestions = tryout!.questions.slice(65, 110);
      for (const q of tkpQuestions) {
        expect(q.category).toBe('TKP');
        const scores = q.options.map((o) => o.score).sort((a, b) => a - b);
        expect(scores).toEqual([1, 2, 3, 4, 5]);
      }
    });
  });

  describe('6. UTBK-SNBT 2026/2027 Mastery Package Specifications', () => {
    it('verifies 45 questions across TPS & Literasi, 1/0 scoring, and KaTeX math formulas', async () => {
      const pkg = await prisma.package.findUnique({
        where: { slug: 'utbk-snbt-2026-mastery' },
        include: {
          tryouts: {
            include: {
              questions: {
                orderBy: { orderNumber: 'asc' },
                include: { options: true },
              },
            },
          },
        },
      });

      expect(pkg).not.toBeNull();
      expect(pkg?.examType).toBe('UTBK_SNBT');

      const tryout = pkg?.tryouts[0];
      expect(tryout).toBeDefined();
      expect(tryout?.totalQuestions).toBe(45);
      expect(tryout?.questions.length).toBe(45);

      let mathFormulaCount = 0;

      for (const q of tryout!.questions) {
        // Option score check: exactly 1 correct (score: 1), 4 wrong (score: 0)
        const scores = q.options.map((o) => o.score);
        const correct = scores.filter((s) => s === 1).length;
        const wrong = scores.filter((s) => s === 0).length;
        expect(correct).toBe(1);
        expect(wrong).toBe(4);

        if (q.text.includes('$') || q.text.includes('\\') || q.explanation?.includes('$')) {
          mathFormulaCount++;
        }
      }

      // Check math formulas are present in quantitative/literasi questions
      expect(mathFormulaCount).toBeGreaterThanOrEqual(15);
    });
  });

  describe('7. LPDP TBS Advanced Paket 2 Specifications', () => {
    it('verifies 40 questions across Verbal, Kuantitatif, and Pemecahan Masalah with 1/0 scoring', async () => {
      const pkg = await prisma.package.findUnique({
        where: { slug: 'lpdp-tbs-advanced-p2' },
        include: {
          tryouts: {
            include: {
              questions: {
                orderBy: { orderNumber: 'asc' },
                include: { options: true },
              },
            },
          },
        },
      });

      expect(pkg).not.toBeNull();
      expect(pkg?.examType).toBe('LPDP_TBS');

      const tryout = pkg?.tryouts[0];
      expect(tryout).toBeDefined();
      expect(tryout?.totalQuestions).toBe(40);
      expect(tryout?.questions.length).toBe(40);

      const categories = new Set(tryout!.questions.map((q) => q.category));
      expect(categories.size).toBeGreaterThanOrEqual(2);

      for (const q of tryout!.questions) {
        const scores = q.options.map((o) => o.score);
        const correct = scores.filter((s) => s === 1).length;
        const wrong = scores.filter((s) => s === 0).length;
        expect(correct).toBe(1);
        expect(wrong).toBe(4);
      }
    });
  });

  describe('8. Olimpiade Sains Matematika Paket 2 Specifications', () => {
    it('verifies 25 questions, negative marking configuration, and extensive KaTeX math notations', async () => {
      const pkg = await prisma.package.findUnique({
        where: { slug: 'olimpiade-matematika-paket-2' },
        include: {
          tryouts: {
            include: {
              questions: {
                orderBy: { orderNumber: 'asc' },
                include: { options: true },
              },
            },
          },
        },
      });

      expect(pkg).not.toBeNull();
      expect(pkg?.examType).toBe('MATH_OLYMPIAD');

      const tryout = pkg?.tryouts[0];
      expect(tryout).toBeDefined();
      expect(tryout?.totalQuestions).toBe(25);
      expect(tryout?.questions.length).toBe(25);

      // Verify scoringScheme negative marking
      expect(tryout?.scoringScheme).not.toBeNull();
      const scoringScheme = tryout?.scoringScheme as any;
      expect(scoringScheme.type).toBe('NEGATIVE_MARKING');
      expect(scoringScheme.correct).toBe(4);
      expect(scoringScheme.wrong).toBe(-1);
      expect(scoringScheme.empty).toBe(0);

      let mathFormulaCount = 0;

      for (const q of tryout!.questions) {
        // Options score check: 1 correct option with score 4, others 0
        const scores = q.options.map((o) => o.score);
        const correct = scores.filter((s) => s === 4).length;
        const zero = scores.filter((s) => s === 0).length;
        expect(correct).toBe(1);
        expect(zero).toBe(4);

        if (q.text.includes('$') || q.text.includes('\\') || q.explanation?.includes('$')) {
          mathFormulaCount++;
        }
      }

      // Olympiad questions must almost all have math notation
      expect(mathFormulaCount).toBeGreaterThanOrEqual(20);
    });
  });
});
