import { PrismaClient, QuestionCategory } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Create or update Default Passing Grade Profile
  const passingGrade = await prisma.passingGradeProfile.upsert({
    where: { id: 'pg-cpns-umum' },
    update: {},
    create: {
      id: 'pg-cpns-umum',
      name: 'SKD CPNS Umum (KepmenPANRB)',
      minTWK: 65,
      minTIU: 80,
      minTKP: 166,
    },
  });
  console.log(`✅ Passing Grade Profile ready: ${passingGrade.name}`);

  // 2. Create or update Default Package
  const pkg = await prisma.package.upsert({
    where: { slug: 'simulasi-tiu-60-mastery' },
    update: {},
    create: {
      title: 'Simulasi Mandiri TIU 60 Soal (Verbal, Numerik, Figural)',
      slug: 'simulasi-tiu-60-mastery',
      description: 'Paket simulasi lengkap 60 butir soal TIU mencakup Analogi, Silogisme, Analitis, Deret, Berhitung, dan Soal Cerita beserta pembahasan mendalam.',
      price: 0,
      isFree: true,
      isActive: true,
    },
  });
  console.log(`✅ Package ready: ${pkg.title}`);

  // 3. Create or update Tryout
  const tryout = await prisma.tryout.upsert({
    where: { id: 'tryout-tiu-60' },
    update: {},
    create: {
      id: 'tryout-tiu-60',
      packageId: pkg.id,
      passingGradeProfileId: passingGrade.id,
      title: 'Simulasi Intensif TIU 60 Butir',
      durationMinutes: 60,
      totalQuestions: 60,
      isActive: true,
    },
  });
  console.log(`✅ Tryout ready: ${tryout.title}`);

  // 4. Read and insert Questions from CSV
  const csvPath = path.join(process.cwd(), 'data/bank_soal/bank_soal_tiu_60.csv');
  if (!fs.existsSync(csvPath)) {
    console.warn(`⚠️ CSV file not found at ${csvPath}`);
    return;
  }

  const fileContent = fs.readFileSync(csvPath, 'utf-8');
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  console.log(`📖 Found ${records.length} questions in CSV. Importing to database...`);

  let count = 0;
  for (const row of records) {
    const orderNumber = parseInt(row.ID, 10);
    const subTopic = row.Kategori || 'TIU';
    const questionText = row.Soal;
    const explanation = row.Pembahasan;
    const correctKey = (row.Kunci || 'A').toUpperCase().trim();

    // Upsert Question
    const question = await prisma.question.upsert({
      where: {
        tryoutId_orderNumber: {
          tryoutId: tryout.id,
          orderNumber,
        },
      },
      update: {
        category: QuestionCategory.TIU,
        subTopic,
        text: questionText,
        explanation,
      },
      create: {
        tryoutId: tryout.id,
        orderNumber,
        category: QuestionCategory.TIU,
        subTopic,
        text: questionText,
        explanation,
      },
    });

    // Create Options A, B, C, D, E
    const optionMap: Record<string, string> = {
      A: row['Opsi A'],
      B: row['Opsi B'],
      C: row['Opsi C'],
      D: row['Opsi D'],
      E: row['Opsi E'],
    };

    for (const [key, text] of Object.entries(optionMap)) {
      if (!text) continue;
      const score = key === correctKey ? 5 : 0;

      await prisma.option.upsert({
        where: {
          questionId_key: {
            questionId: question.id,
            key,
          },
        },
        update: {
          text,
          score,
        },
        create: {
          questionId: question.id,
          key,
          text,
          score,
        },
      });
    }
    count++;
  }

  console.log(`🎉 Successfully seeded ${count} questions and all options into cat_skd_db!`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
