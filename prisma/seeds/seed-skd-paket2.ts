import { PrismaClient } from '@prisma/client';
import { twkQuestionsPaket2 } from './data-skd2-twk';
import { tiuQuestionsPaket2 } from './data-skd2-tiu';
import { tkpQuestionsPaket2 } from './data-skd2-tkp';

export async function seedSkdPaket2(prisma: PrismaClient) {
  console.log('🚀 Memulai Seeding Paket Tryout Akbar SKD CPNS 2026 Paket 2...');

  // ========================================================
  // 1. Validasi Integritas Data Bank Soal
  // ========================================================
  const allQuestions = [...twkQuestionsPaket2, ...tiuQuestionsPaket2, ...tkpQuestionsPaket2];

  if (allQuestions.length !== 110) {
    throw new Error(`Jumlah butir soal tidak valid! Diharapkan 110, ditemukan: ${allQuestions.length}`);
  }

  // Verifikasi urutan nomor 1 - 110 tanpa celah & tanpa duplikat
  const orderSet = new Set<number>();
  for (let i = 1; i <= 110; i++) {
    const q = allQuestions.find((item) => item.orderNumber === i);
    if (!q) {
      throw new Error(`Soal nomor urut ${i} tidak ditemukan!`);
    }
    if (orderSet.has(q.orderNumber)) {
      throw new Error(`Duplikasi nomor urut soal: ${q.orderNumber}`);
    }
    orderSet.add(q.orderNumber);

    // Verifikasi kelengkapan opsi jawaban A-E
    const keys = q.options.map((o) => o.key).sort().join('');
    if (keys !== 'ABCDE') {
      throw new Error(`Soal nomor ${q.orderNumber} tidak memiliki opsi lengkap A, B, C, D, E. Opsi ada: ${keys}`);
    }

    // Verifikasi skema skor BKN
    if (q.category === 'TWK') {
      if (q.orderNumber < 1 || q.orderNumber > 30) {
        throw new Error(`Soal TWK nomor ${q.orderNumber} di luar rentang standar 1-30!`);
      }
      const scores = q.options.map((o) => o.score).sort((a, b) => a - b);
      if (JSON.stringify(scores) !== JSON.stringify([0, 0, 0, 0, 5])) {
        throw new Error(`Skor TWK nomor ${q.orderNumber} tidak valid! Harus ada satu opsi bernilai 5 dan empat opsi bernilai 0. Ditemukan: ${JSON.stringify(scores)}`);
      }
    } else if (q.category === 'TIU') {
      if (q.orderNumber < 31 || q.orderNumber > 65) {
        throw new Error(`Soal TIU nomor ${q.orderNumber} di luar rentang standar 31-65!`);
      }
      const scores = q.options.map((o) => o.score).sort((a, b) => a - b);
      if (JSON.stringify(scores) !== JSON.stringify([0, 0, 0, 0, 5])) {
        throw new Error(`Skor TIU nomor ${q.orderNumber} tidak valid! Harus ada satu opsi bernilai 5 dan empat opsi bernilai 0. Ditemukan: ${JSON.stringify(scores)}`);
      }
    } else if (q.category === 'TKP') {
      if (q.orderNumber < 66 || q.orderNumber > 110) {
        throw new Error(`Soal TKP nomor ${q.orderNumber} di luar rentang standar 66-110!`);
      }
      const scores = q.options.map((o) => o.score).sort((a, b) => a - b);
      if (JSON.stringify(scores) !== JSON.stringify([1, 2, 3, 4, 5])) {
        throw new Error(`Skor TKP nomor ${q.orderNumber} tidak valid! Harus berupa skala 1-5 untuk seluruh opsi A-E. Ditemukan: ${JSON.stringify(scores)}`);
      }
    }
  }

  console.log(`✅ Validasi integritas 110 soal berhasil: 30 TWK, 35 TIU, 45 TKP skala 1-5.`);

  // ========================================================
  // 2. Passing Grade Profile (pg-cpns-umum)
  // ========================================================
  const pgCpns = await prisma.passingGradeProfile.upsert({
    where: { id: 'pg-cpns-umum' },
    update: {
      minTWK: 65,
      minTIU: 80,
      minTKP: 166,
    },
    create: {
      id: 'pg-cpns-umum',
      name: 'SKD CPNS Umum (KepmenPANRB)',
      minTWK: 65,
      minTIU: 80,
      minTKP: 166,
    },
  });
  console.log(`✅ Passing Grade Profile '${pgCpns.name}' siap (TWK: ${pgCpns.minTWK}, TIU: ${pgCpns.minTIU}, TKP: ${pgCpns.minTKP}).`);

  // ========================================================
  // 3. Package: Paket Tryout Akbar SKD CPNS 2026 Paket 2
  // ========================================================
  const packageSlug = 'skd-cpns-akbar-paket-2';
  const pkg = await prisma.package.upsert({
    where: { slug: packageSlug },
    update: {
      title: 'Paket Tryout Akbar SKD CPNS 2026 (TWK, TIU, TKP) Paket 2',
      examType: 'SKD_CPNS',
      price: 29000,
      promoPrice: 19000,
      isFree: false,
      isActive: true,
      description: 'Paket Tryout Akbar SKD CPNS 2026 Paket 2 dengan 110 butir soal komprehensif berstandar BKN dan KepmenPANRB terbaru. Mencakup 30 soal TWK (Nasionalisme, Bela Negara, Integritas, Pilar Negara, Bahasa Indonesia), 35 soal TIU (Analogi, Silogisme, Analitis, Deret, Berhitung, Kuantitatif, Soal Cerita), dan 45 soal TKP skala 1-5 (Pelayanan Publik, Jejaring Kerja, Sosial Budaya, TIK, Profesionalisme, Anti Radikalisme) dilengkapi pembahasan mendalam dan scoring passing grade simultan.',
    },
    create: {
      title: 'Paket Tryout Akbar SKD CPNS 2026 (TWK, TIU, TKP) Paket 2',
      slug: packageSlug,
      examType: 'SKD_CPNS',
      price: 29000,
      promoPrice: 19000,
      isFree: false,
      isActive: true,
      description: 'Paket Tryout Akbar SKD CPNS 2026 Paket 2 dengan 110 butir soal komprehensif berstandar BKN dan KepmenPANRB terbaru. Mencakup 30 soal TWK (Nasionalisme, Bela Negara, Integritas, Pilar Negara, Bahasa Indonesia), 35 soal TIU (Analogi, Silogisme, Analitis, Deret, Berhitung, Kuantitatif, Soal Cerita), dan 45 soal TKP skala 1-5 (Pelayanan Publik, Jejaring Kerja, Sosial Budaya, TIK, Profesionalisme, Anti Radikalisme) dilengkapi pembahasan mendalam dan scoring passing grade simultan.',
    },
  });
  console.log(`✅ Package '${pkg.title}' siap (ID: ${pkg.id}).`);

  // ========================================================
  // 4. Tryout: Tryout Akbar SKD CPNS 2026 - Paket 2
  // ========================================================
  const tryoutId = 'tryout-skd-akbar-paket-2';
  const tryout = await prisma.tryout.upsert({
    where: { id: tryoutId },
    update: {
      packageId: pkg.id,
      passingGradeProfileId: pgCpns.id,
      title: 'Tryout Akbar SKD CPNS 2026 - Paket 2',
      examType: 'SKD_CPNS',
      durationMinutes: 100,
      totalQuestions: 110,
      subtestConfig: {
        TWK: { total: 30, maxScore: 150, passingGrade: 65 },
        TIU: { total: 35, maxScore: 175, passingGrade: 80 },
        TKP: { total: 45, maxScore: 225, passingGrade: 166 },
      },
      isActive: true,
    },
    create: {
      id: tryoutId,
      packageId: pkg.id,
      passingGradeProfileId: pgCpns.id,
      title: 'Tryout Akbar SKD CPNS 2026 - Paket 2',
      examType: 'SKD_CPNS',
      durationMinutes: 100,
      totalQuestions: 110,
      subtestConfig: {
        TWK: { total: 30, maxScore: 150, passingGrade: 65 },
        TIU: { total: 35, maxScore: 175, passingGrade: 80 },
        TKP: { total: 45, maxScore: 225, passingGrade: 166 },
      },
      isActive: true,
    },
  });
  console.log(`✅ Tryout '${tryout.title}' siap (ID: ${tryout.id}).`);

  // ========================================================
  // 5. Batch Insert Questions & Options
  // ========================================================
  console.log('📝 Menyimpan 110 butir soal dan 550 opsi jawaban ke basis data...');
  let savedCount = 0;

  for (const q of allQuestions) {
    const question = await prisma.question.upsert({
      where: {
        tryoutId_orderNumber: {
          tryoutId: tryout.id,
          orderNumber: q.orderNumber,
        },
      },
      update: {
        category: q.category,
        subTopic: q.subTopic,
        questionType: q.questionType || 'MULTIPLE_CHOICE',
        text: q.text,
        explanation: q.explanation,
      },
      create: {
        tryoutId: tryout.id,
        orderNumber: q.orderNumber,
        category: q.category,
        subTopic: q.subTopic,
        questionType: q.questionType || 'MULTIPLE_CHOICE',
        text: q.text,
        explanation: q.explanation,
      },
    });

    for (const opt of q.options) {
      await prisma.option.upsert({
        where: {
          questionId_key: {
            questionId: question.id,
            key: opt.key,
          },
        },
        update: {
          text: opt.text,
          score: opt.score,
        },
        create: {
          questionId: question.id,
          key: opt.key,
          text: opt.text,
          score: opt.score,
        },
      });
    }

    savedCount++;
    if (savedCount % 25 === 0 || savedCount === 110) {
      console.log(`   Progress: ${savedCount} / 110 soal tersimpan...`);
    }
  }

  console.log(`🎉 Berhasil melakukan seeding 110 butir soal SKD CPNS Paket 2!`);
  return { package: pkg, tryout, totalQuestions: savedCount };
}

// Standalone execution support
if (require.main === module || (typeof process !== 'undefined' && process.argv[1]?.includes('seed-skd-paket2'))) {
  const prisma = new PrismaClient();
  seedSkdPaket2(prisma)
    .then(async () => {
      await prisma.$disconnect();
      console.log('✅ Selesai.');
      process.exit(0);
    })
    .catch(async (e) => {
      console.error('❌ Terjadi kesalahan pada seed-skd-paket2:', e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
