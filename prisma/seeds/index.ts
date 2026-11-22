import { PrismaClient } from '@prisma/client';
import { seedUtbkSnbt } from './seed-utbk-snbt';
import { seedLpdpAdvanced } from './seed-lpdp-advanced';
import { seedOlimpiadeP2 } from './seed-olimpiade-p2';
import { seedSkdPaket2 } from './seed-skd-paket2';
import { seedMultiExamPackages } from '../seed-packages';

export { seedUtbkSnbt } from './seed-utbk-snbt';
export { seedLpdpAdvanced } from './seed-lpdp-advanced';
export { seedOlimpiadeP2 } from './seed-olimpiade-p2';
export { seedSkdPaket2 } from './seed-skd-paket2';

export async function seedAllMultiExams(prisma: PrismaClient) {
  console.log('\n======================================================');
  console.log('📦 MASTER MULTI-EXAM SEEDER STARTING');
  console.log('======================================================\n');

  // 1. Initial Multi-Exam Packages (SKD CPNS 110 P1, Olimpiade Sains P1, LPDP TBS P1)
  console.log('▶ [1/5] Running seedMultiExamPackages...');
  await seedMultiExamPackages(prisma);

  // 2. UTBK-SNBT 2026/2027 Mastery (45 questions)
  console.log('\n▶ [2/5] Running seedUtbkSnbt...');
  await seedUtbkSnbt(prisma);

  // 3. LPDP TBS Advanced Paket 2 (40 questions)
  console.log('\n▶ [3/5] Running seedLpdpAdvanced...');
  await seedLpdpAdvanced(prisma);

  // 4. Olimpiade Sains Matematika Paket 2 (25 questions)
  console.log('\n▶ [4/5] Running seedOlimpiadeP2...');
  await seedOlimpiadeP2(prisma);

  // 5. SKD CPNS Akbar Paket 2 (110 questions)
  console.log('\n▶ [5/5] Running seedSkdPaket2...');
  await seedSkdPaket2(prisma);

  console.log('\n======================================================');
  console.log('🎉 ALL MULTI-EXAM SEEDS SUCCESSFULLY EXECUTED!');
  console.log('======================================================\n');
}
