import { PrismaClient } from '@prisma/client';

let prisma = new PrismaClient();

export async function seedMultiExamPackages(prismaClient?: PrismaClient) {
  if (prismaClient) {
    prisma = prismaClient;
  }
  console.log('🚀 Memulai Seeding Paket Multi-Exam BedahSoal...');

  // ========================================================
  // 1. Passing Grade Profiles
  // ========================================================
  const pgCpns = await prisma.passingGradeProfile.upsert({
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

  const pgOlimpiade = await prisma.passingGradeProfile.upsert({
    where: { id: 'pg-olimpiade-math' },
    update: {},
    create: {
      id: 'pg-olimpiade-math',
      name: 'Passing Grade Olimpiade Sains & Matematika',
      minTWK: 0,
      minTIU: 0,
      minTKP: 0,
      rules: { minScore: 40, medalCutoffs: { emas: 70, perak: 55, perunggu: 40 } },
    },
  });

  const pgLpdp = await prisma.passingGradeProfile.upsert({
    where: { id: 'pg-lpdp-tbs' },
    update: {},
    create: {
      id: 'pg-lpdp-tbs',
      name: 'Ambang Batas Tes Bakat Skolastik LPDP',
      minTWK: 0,
      minTIU: 0,
      minTKP: 0,
      rules: { minScore: 150 },
    },
  });

  console.log('✅ Passing Grade Profiles siap.');

  // ========================================================
  // 2. Paket 1: SKD CPNS 2026 Lengkap (110 Soal Standar BKN)
  // ========================================================
  const pkgSkd = await prisma.package.upsert({
    where: { slug: 'skd-cpns-mastery-110' },
    update: { isActive: true },
    create: {
      title: 'Mastery Simulasi SKD CPNS 110 Butir (TWK, TIU, TKP)',
      slug: 'skd-cpns-mastery-110',
      description: 'Simulasi terlengkap 110 butir soal standar resmi KepmenPANRB: TWK (30 soal), TIU (35 soal), dan TKP (45 soal skala 1-5) lengkap dengan perhitungan Passing Grade simultan & tie-breaker resmi BKN.',
      examType: 'SKD_CPNS',
      price: 19000,
      promoPrice: 0,
      isFree: true, // Digratiskan agar user bisa langsung coba
      isActive: true,
    },
  });

  const tryoutSkd = await prisma.tryout.upsert({
    where: { id: 'tryout-skd-110' },
    update: { isActive: true },
    create: {
      id: 'tryout-skd-110',
      packageId: pkgSkd.id,
      passingGradeProfileId: pgCpns.id,
      title: 'Simulasi Lengkap SKD CPNS 110 Butir',
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

  // Seed 110 Questions for SKD (30 TWK, 35 TIU, 45 TKP)
  console.log('📝 Menyiapkan 110 butir soal SKD CPNS...');
  const skdQuestions: Array<{
    orderNumber: number;
    category: 'TWK' | 'TIU' | 'TKP';
    subTopic: string;
    text: string;
    explanation: string;
    options: Array<{ key: string; text: string; score: number }>;
  }> = [];

  // TWK 1 - 30
  const twkTopics = ['Nasionalisme', 'Bela Negara', 'Integritas', 'Pilar Negara (Pancasila)', 'Pilar Negara (UUD 1945)', 'Bahasa Indonesia'];
  for (let i = 1; i <= 30; i++) {
    const subTopic = twkTopics[(i - 1) % twkTopics.length];
    skdQuestions.push({
      orderNumber: i,
      category: 'TWK',
      subTopic,
      text: `[Soal TWK No. ${i} - ${subTopic}] Sikap dan perilaku warga negara yang dijiwai oleh kecintaannya kepada Negara Kesatuan Republik Indonesia berdasarkan Pancasila dan UUD 1945 dalam menjamin kelangsungan hidup bangsa dan negara merupakan perwujudan dari prinsip apa?`,
      explanation: `**Pembahasan TWK No. ${i}:** Berdasarkan UU No. 23 Tahun 2019 tentang Pengelolaan Sumber Daya Nasional untuk Pertahanan Negara, upaya warga negara yang berlandaskan kecintaan pada NKRI adalah hakikat dari **Bela Negara** (Opsi B). Nilai-nilai dasar bela negara mencakup cinta tanah air, sadar berbangsa dan bernegara, setia pada Pancasila, rela berkorban, dan memiliki kemampuan awal bela negara.`,
      options: [
        { key: 'A', text: 'Chauvinisme yang mengunggulkan bangsa sendiri secara sempit', score: 0 },
        { key: 'B', text: 'Bela Negara sesuai amanat Pasal 27 Ayat (3) UUD 1945', score: 5 },
        { key: 'C', text: 'Etos kerja individual demi stabilitas ekonomi pribadi', score: 0 },
        { key: 'D', text: 'Ketaatan pasif warga negara terhadap kebijakan pemerintah', score: 0 },
        { key: 'E', text: 'Partisipasi politik elektoral formal saat pemilu saja', score: 0 },
      ],
    });
  }

  // TIU 31 - 65
  const tiuTopics = ['Analogi Kata', 'Silogisme Logika', 'Analitis', 'Deret Angka', 'Berhitung Cepat', 'Perbandingan Kuantitatif', 'Soal Cerita'];
  for (let i = 31; i <= 65; i++) {
    const subTopic = tiuTopics[(i - 31) % tiuTopics.length];
    const n = i - 30;
    skdQuestions.push({
      orderNumber: i,
      category: 'TIU',
      subTopic,
      text: `[Soal TIU No. ${n} - ${subTopic}] Diberikan barisan angka: $3, 7, 15, 31, 63, x$. Berapakah nilai dari $x$ serta nilai $x + 10$?`,
      explanation: `**Pembahasan TIU No. ${n}:** Pola pembentukan barisan:
- $3 \\times 2 + 1 = 7$
- $7 \\times 2 + 1 = 15$
- $15 \\times 2 + 1 = 31$
- $31 \\times 2 + 1 = 63$
- $x = 63 \\times 2 + 1 = 127$.
Sehingga $x + 10 = 127 + 10 = 137$. Kunci jawaban yang tepat adalah **C (127 dan 137)**.`,
      options: [
        { key: 'A', text: '$x = 120$ dan $x + 10 = 130$', score: 0 },
        { key: 'B', text: '$x = 125$ dan $x + 10 = 135$', score: 0 },
        { key: 'C', text: '$x = 127$ dan $x + 10 = 137$', score: 5 },
        { key: 'D', text: '$x = 128$ dan $x + 10 = 138$', score: 0 },
        { key: 'E', text: '$x = 130$ dan $x + 10 = 140$', score: 0 },
      ],
    });
  }

  // TKP 66 - 110 (Nilai 1 - 5)
  const tkpTopics = ['Pelayanan Publik', 'Jejaring Kerja', 'Sosial Budaya', 'Teknologi Informasi & Komunikasi', 'Profesionalisme', 'Anti Radikalisme'];
  for (let i = 66; i <= 110; i++) {
    const subTopic = tkpTopics[(i - 66) % tkpTopics.length];
    const n = i - 65;
    skdQuestions.push({
      orderNumber: i,
      category: 'TKP',
      subTopic,
      text: `[Soal TKP No. ${n} - ${subTopic}] Anda sedang menyelesaikan laporan akhir tahun yang mendesak dengan tenggat waktu hari ini. Tiba-tiba seorang warga lansia datang dengan kebingungan memerlukan pelayanan darurat di loket instansi Anda sementara petugas loket sedang berhalangan. Sikap Anda adalah...`,
      explanation: `**Pembahasan TKP No. ${n}:**
- **Opsi E (Skor 5):** Menunjukkan empati tinggi, profesionalisme, orientasi pelayanan publik prima tanpa mengabaikan tanggung jawab utama.
- **Opsi D (Skor 4):** Menolong namun mengalihkan tugas secara bijak.
- **Opsi C (Skor 3):** Meminta rekan lain mengambil alih pelayanan lansia.
- **Opsi B (Skor 2):** Menyuruh lansia menunggu sampai petugas loket kembali.
- **Opsi A (Skor 1):** Mengabaikan karena fokus pada laporan pribadi.`,
      options: [
        { key: 'A', text: 'Mengabaikannya karena laporan dinas Anda memiliki tenggat waktu ketat hari ini', score: 1 },
        { key: 'B', text: 'Memintanya menunggu di ruang tunggu sampai petugas loket yang bertugas hadir kembali', score: 2 },
        { key: 'C', text: 'Mencari rekan kerja yang sedang tidak sibuk untuk melayani warga tersebut', score: 3 },
        { key: 'D', text: 'Menyapa dengan ramah, mendengarkan keperluannya sebentar, lalu mengantarkannya ke petugas pengganti', score: 4 },
        { key: 'E', text: 'Menyambutnya dengan hangat, segera melayani kebutuhan mendesaknya secara tuntas, lalu melanjutkan laporan lembur jika perlu', score: 5 },
      ],
    });
  }

  // Batch insert SKD Questions
  for (const q of skdQuestions) {
    const question = await prisma.question.upsert({
      where: {
        tryoutId_orderNumber: {
          tryoutId: tryoutSkd.id,
          orderNumber: q.orderNumber,
        },
      },
      update: {
        category: q.category,
        subTopic: q.subTopic,
        text: q.text,
        explanation: q.explanation,
      },
      create: {
        tryoutId: tryoutSkd.id,
        orderNumber: q.orderNumber,
        category: q.category,
        subTopic: q.subTopic,
        questionType: 'MULTIPLE_CHOICE',
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
  }
  console.log('✅ 110 Soal SKD CPNS Lengkap berhasil di-seed.');

  // ========================================================
  // 3. Paket 2: Olimpiade Sains & Matematika (OSN)
  // ========================================================
  const pkgMath = await prisma.package.upsert({
    where: { slug: 'olimpiade-matematika-sains' },
    update: { isActive: true },
    create: {
      title: 'Simulasi Olimpiade Sains & Matematika (Aljabar, Geometri, Teori Bilangan)',
      slug: 'olimpiade-matematika-sains',
      description: 'Simulasi tingkat kompetisi nasional (OSN/KSN) dengan formula matematika kompleks (KaTeX), negative marking (+4 Benar, -1 Salah), dan pembahasan teorema mendalam.',
      examType: 'MATH_OLYMPIAD',
      price: 25000,
      promoPrice: 0,
      isFree: true,
      isActive: true,
    },
  });

  const tryoutMath = await prisma.tryout.upsert({
    where: { id: 'tryout-olimpiade-math' },
    update: { isActive: true },
    create: {
      id: 'tryout-olimpiade-math',
      packageId: pkgMath.id,
      passingGradeProfileId: pgOlimpiade.id,
      title: 'Simulasi Seleksi Olimpiade Sains Matematika 20 Soal',
      examType: 'MATH_OLYMPIAD',
      durationMinutes: 90,
      totalQuestions: 20,
      scoringScheme: { correct: 4, wrong: -1, empty: 0 },
      isActive: true,
    },
  });

  const mathQuestions = [
    {
      orderNumber: 1,
      category: 'Aljabar',
      subTopic: 'Persamaan Polinomial',
      text: 'Misalkan $a, b, c$ adalah akar-akar dari persamaan polinomial $x^3 - 6x^2 + 11x - 6 = 0$. Berapakah nilai dari $\\frac{1}{a} + \\frac{1}{b} + \\frac{1}{c}$?',
      explanation: `**Pembahasan:**
Berdasarkan Teorema Vieta untuk polinomial $P(x) = x^3 - 6x^2 + 11x - 6 = 0$:
- Jumlah akar: $a + b + c = 6$
- Jumlah hasil kali berpasangan: $ab + bc + ca = 11$
- Hasil kali seluruh akar: $abc = 6$

Maka:
$$\\frac{1}{a} + \\frac{1}{b} + \\frac{1}{c} = \\frac{ab + bc + ca}{abc} = \\frac{11}{6}$$

Jadi jawabannya adalah **B (11/6)**.`,
      options: [
        { key: 'A', text: '$\\frac{6}{11}$', score: -1 },
        { key: 'B', text: '$\\frac{11}{6}$', score: 4 },
        { key: 'C', text: '$\\frac{7}{6}$', score: -1 },
        { key: 'D', text: '$2$', score: -1 },
        { key: 'E', text: '$\\frac{13}{6}$', score: -1 },
      ],
    },
    {
      orderNumber: 2,
      category: 'Teori Bilangan',
      subTopic: 'Aritmetika Modular',
      text: 'Tentukan dua digit terakhir dari bilangan $7^{2026}$.',
      explanation: `**Pembahasan:**
Mencari dua digit terakhir ekuivalen dengan mencari $7^{2026} \\pmod{100}$.
Perhatikan pola pangkat dari $7$:
- $7^1 \\equiv 07 \\pmod{100}$
- $7^2 \\equiv 49 \\pmod{100}$
- $7^3 \\equiv 43 \\pmod{100}$
- $7^4 = 2401 \\equiv 01 \\pmod{100}$

Periode pengulangan adalah 4.
Karena $2026 = 4 \\times 506 + 2$, maka sisa pembagian pangkat adalah $2$.
$$7^{2026} \\equiv (7^4)^{506} \\times 7^2 \\equiv 1^{506} \\times 49 \\equiv 49 \\pmod{100}$$
Dua digit terakhir adalah **49** (Opsi D).`,
      options: [
        { key: 'A', text: '$01$', score: -1 },
        { key: 'B', text: '$07$', score: -1 },
        { key: 'C', text: '$43$', score: -1 },
        { key: 'D', text: '$49$', score: 4 },
        { key: 'E', text: '$99$', score: -1 },
      ],
    },
    {
      orderNumber: 3,
      category: 'Geometri',
      subTopic: 'Segitiga & Lingkaran Luar',
      text: 'Pada sebuah segitiga siku-siku $ABC$ dengan siku-siku di $B$, panjang $AB = 6$ dan $BC = 8$. Berapakah jari-jari lingkaran dalam ($r$) dari segitiga $ABC$ tersebut?',
      explanation: `**Pembahasan:**
Panjang sisi miring $AC = \\sqrt{6^2 + 8^2} = 10$.
Keliling segitiga: $K = 6 + 8 + 10 = 24$, sehingga semi-perimeter $s = \\frac{24}{2} = 12$.
Luas segitiga: $L = \\frac{1}{2} \\times 6 \\times 8 = 24$.
Jari-jari lingkaran dalam segitiga diberikan oleh rumus:
$$r = \\frac{L}{s} = \\frac{24}{12} = 2$$
Kunci jawaban adalah **A (2 satuan)**.`,
      options: [
        { key: 'A', text: '$2$', score: 4 },
        { key: 'B', text: '$2.5$', score: -1 },
        { key: 'C', text: '$3$', score: -1 },
        { key: 'D', text: '$4$', score: -1 },
        { key: 'E', text: '$5$', score: -1 },
      ],
    },
  ];

  // Fill remaining math questions up to 20
  for (let i = 4; i <= 20; i++) {
    mathQuestions.push({
      orderNumber: i,
      category: i % 2 === 0 ? 'Kombinatorika' : 'Aljabar',
      subTopic: i % 2 === 0 ? 'Prinsip Sangkar Burung' : 'Fungsi Kuadrat',
      text: `[Olimpiade No. ${i}] Diberikan persamaan kuadrat $x^2 - (k+1)x + 2k = 0$. Agar kedua akar bernilai riil dan berbeda, tentukan syarat parameter $k$.`,
      explanation: `**Pembahasan No. ${i}:**
Syarat akar riil berbeda adalah diskriminan $D > 0$:
$$D = [-(k+1)]^2 - 4(1)(2k) > 0$$
$$k^2 + 2k + 1 - 8k > 0 \\implies k^2 - 6k + 1 > 0$$
Akar pembuat nol: $k = \\frac{6 \\pm \\sqrt{36 - 4}}{2} = 3 \\pm 2\\sqrt{2}$.
Maka $k < 3 - 2\\sqrt{2}$ atau $k > 3 + 2\\sqrt{2}$ (Opsi C).`,
      options: [
        { key: 'A', text: '$k > 3 + \\sqrt{2}$', score: -1 },
        { key: 'B', text: '$k < 3 - \\sqrt{2}$', score: -1 },
        { key: 'C', text: '$k < 3 - 2\\sqrt{2}$ atau $k > 3 + 2\\sqrt{2}$', score: 4 },
        { key: 'D', text: '$k \\ge 4$', score: -1 },
        { key: 'E', text: '$k \\le 0$', score: -1 },
      ],
    });
  }

  for (const q of mathQuestions) {
    const question = await prisma.question.upsert({
      where: {
        tryoutId_orderNumber: {
          tryoutId: tryoutMath.id,
          orderNumber: q.orderNumber,
        },
      },
      update: {
        category: q.category,
        subTopic: q.subTopic,
        text: q.text,
        explanation: q.explanation,
      },
      create: {
        tryoutId: tryoutMath.id,
        orderNumber: q.orderNumber,
        category: q.category,
        subTopic: q.subTopic,
        questionType: 'MULTIPLE_CHOICE',
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
  }
  console.log('✅ 20 Soal Olimpiade Matematika berhasil di-seed.');

  // ========================================================
  // 4. Paket 3: Tes Bakat Skolastik (TBS) LPDP & UTBK
  // ========================================================
  const pkgLpdp = await prisma.package.upsert({
    where: { slug: 'tbs-beasiswa-lpdp' },
    update: { isActive: true },
    create: {
      title: 'Simulasi Tes Bakat Skolastik (TBS) Beasiswa LPDP & UTBK SNBT',
      slug: 'tbs-beasiswa-lpdp',
      description: 'Latihan intensif TBS mencakup Penalaran Verbal, Penalaran Kuantitatif, dan Pemecahan Masalah Logis dengan bobot seleksi beasiswa pascasarjana bergengsi.',
      examType: 'LPDP_TBS',
      price: 29000,
      promoPrice: 0,
      isFree: true,
      isActive: true,
    },
  });

  const tryoutLpdp = await prisma.tryout.upsert({
    where: { id: 'tryout-tbs-lpdp' },
    update: { isActive: true },
    create: {
      id: 'tryout-tbs-lpdp',
      packageId: pkgLpdp.id,
      passingGradeProfileId: pgLpdp.id,
      title: 'Simulasi TBS LPDP 40 Butir',
      examType: 'LPDP_TBS',
      durationMinutes: 60,
      totalQuestions: 40,
      isActive: true,
    },
  });

  // Seed 40 questions for TBS LPDP
  for (let i = 1; i <= 40; i++) {
    const isKuantitatif = i % 2 === 0;
    const cat = isKuantitatif ? 'Penalaran Kuantitatif' : 'Penalaran Verbal';
    const sub = isKuantitatif ? 'Statistika & Probabilitas' : 'Analogi Konseptual';

    const question = await prisma.question.upsert({
      where: {
        tryoutId_orderNumber: {
          tryoutId: tryoutLpdp.id,
          orderNumber: i,
        },
      },
      update: {
        category: cat,
        subTopic: sub,
      },
      create: {
        tryoutId: tryoutLpdp.id,
        orderNumber: i,
        category: cat,
        subTopic: sub,
        questionType: 'MULTIPLE_CHOICE',
        text: isKuantitatif
          ? `[TBS No. ${i} - Kuantitatif] Rata-rata nilai ujian matematika dari 10 siswa adalah 75. Jika nilai seorang siswa baru ditambahkan, rata-ratanya naik menjadi 77. Berapakah nilai siswa baru tersebut?`
          : `[TBS No. ${i} - Verbal] HIPOTESIS : EKSPERIMEN = ASUMSI : ... ?`,
        explanation: isKuantitatif
          ? `**Pembahasan Kuantitatif No. ${i}:**
Total nilai 10 siswa = $10 \\times 75 = 750$.
Setelah bertambah 1 siswa (total 11 siswa), rata-rata menjadi 77:
Total nilai 11 siswa = $11 \\times 77 = 847$.
Nilai siswa baru = $847 - 750 = 97$ (Opsi D).`
          : `**Pembahasan Verbal No. ${i}:**
Hubungan analogi: Suatu **Hipotesis** dibuktikan kebenarannya melalui **Eksperimen**, sebagaimana suatu **Asumsi** diuji kebenarannya melalui **Verifikasi** (Opsi B).`,
      },
    });

    const options = isKuantitatif
      ? [
          { key: 'A', text: '85', score: 0 },
          { key: 'B', text: '89', score: 0 },
          { key: 'C', text: '92', score: 0 },
          { key: 'D', text: '97', score: 5 },
          { key: 'E', text: '100', score: 0 },
        ]
      : [
          { key: 'A', text: 'Opini', score: 0 },
          { key: 'B', text: 'Verifikasi', score: 5 },
          { key: 'C', text: 'Keputusan', score: 0 },
          { key: 'D', text: 'Keraguan', score: 0 },
          { key: 'E', text: 'Kesimpulan', score: 0 },
        ];

    for (const opt of options) {
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
  }
  console.log('✅ 40 Soal TBS LPDP & UTBK berhasil di-seed.');

  console.log('🎉 SELURUH SEEDING PAKET SELESAI DENGAN SUKSES!');
}

if (require.main === module) {
  seedMultiExamPackages()
    .catch((e) => {
      console.error('❌ Seeding error:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
