import { PrismaClient } from '@prisma/client';

interface QuestionSeedData {
  orderNumber: number;
  category: string;
  subTopic: string;
  questionType?: string;
  text: string;
  explanation: string;
  options: Array<{
    key: 'A' | 'B' | 'C' | 'D' | 'E';
    text: string;
    score: number;
  }>;
}

export const utbkQuestions: QuestionSeedData[] = [
  // =========================================================================
  // SECTION 1: PENALARAN UMUM (1 - 10)
  // =========================================================================
  {
    orderNumber: 1,
    category: 'Penalaran Umum',
    subTopic: 'Penalaran Induktif & Interpretasi Data',
    questionType: 'MULTIPLE_CHOICE',
    text: `Berdasarkan data Badan Pusat Statistik (BPS) selama periode 2021–2025, angka pengangguran terdidik lulusan perguruan tinggi di Provinsi X berturut-turut adalah 8,4%, 7,8%, 7,1%, 6,5%, dan 5,8%. Pada saat yang sama, alokasi anggaran pelatihan vokasi berbasis teknologi digital di provinsi tersebut meningkat sebesar 15% setiap tahunnya. Kepala Dinas Tenaga Kerja menyatakan bahwa penurunan pengangguran terdidik di Provinsi X semata-mata disebabkan oleh bertambahnya anggaran pelatihan vokasi digital.

Manakah pernyataan berikut yang **paling tepat melemahkan** pernyataan Kepala Dinas Tenaga Kerja di atas?`,
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Pernyataan Kepala Dinas Tenaga Kerja mengandung klaim kausalitas tunggal (*eksklusif*), yakni bahwa penurunan pengangguran terdidik *semata-mata* diakibatkan oleh penambahan anggaran pelatihan vokasi digital.
Untuk melemahkan klaim tersebut, kita perlu menunjukkan bukti adanya faktor eksternal lain (*alternative explanation*) yang berkontribusi nyata terhadap penurunan pengangguran terdidik.

- **Opsi C** menunjukkan bahwa provinsi tetangga yang **tidak** menambah anggaran pelatihan digital tetap mengalami tren penurunan pengangguran serupa karena dibukanya kawasan industri multinasional baru. Hal ini membuktikan bahwa faktor terbukanya lapangan kerja industri baru lebih berperan dan membantah klaim eksklusivitas Kepala Dinas.
- Opsi A dan B adalah premis pendukung atau latar belakang umum.
- Opsi D memperkuat efektivitas program, bukan melemahkan.
- Opsi E justru membuat penurunan pengangguran semakin impresif namun tidak secara langsung menyanggah kausalitas.`,
    options: [
      { key: 'A', text: 'Sebagian besar lulusan perguruan tinggi di Provinsi X mengambil jurusan teknologi informasi dan komunikasi.', score: 0 },
      { key: 'B', text: 'Anggaran pelatihan vokasi digital di Provinsi X dialokasikan secara transparan dan akuntabel kepada perguruan tinggi mitra.', score: 0 },
      { key: 'C', text: 'Provinsi tetangga yang tidak menambah anggaran pelatihan digital juga mengalami penurunan pengangguran terdidik serupa karena dibukanya kawasan industri baru.', score: 1 },
      { key: 'D', text: 'Banyak lulusan yang mengikuti pelatihan vokasi digital berhasil memperoleh pekerjaan dalam waktu kurang dari 6 bulan.', score: 0 },
      { key: 'E', text: 'Jumlah universitas di Provinsi X bertambah dua kampus dalam lima tahun terakhir.', score: 0 },
    ],
  },
  {
    orderNumber: 2,
    category: 'Penalaran Umum',
    subTopic: 'Silogisme & Logika Kondisional',
    questionType: 'MULTIPLE_CHOICE',
    text: `Diberikan premis-premis sebagai berikut:
1. Jika inflasi naik tajam atau suku bunga acuan bank sentral dinaikkan, maka daya beli masyarakat akan tertekan.
2. Jika daya beli masyarakat tertekan, maka pertumbuhan omzet industri ritel melambat.
3. Saat ini pertumbuhan omzet industri ritel tidak melambat.

Kesimpulan yang **pasti benar** secara logis adalah ...`,
    explanation: `**Kunci Jawaban: A**

**Pembahasan:**
Misalkan:
- $I$: Inflasi naik tajam
- $B$: Suku bunga acuan bank sentral dinaikkan
- $D$: Daya beli masyarakat tertekan
- $R$: Pertumbuhan omzet industri ritel melambat

Premis-premis formal:
1. $(I \\lor B) \\rightarrow D$
2. $D \\rightarrow R$
3. $\\sim R$ (Omzet tidak melambat)

Langkah penarikan kesimpulan:
- Dari Premis 2 ($D \\rightarrow R$) dan Premis 3 ($\\sim R$), dengan aturan *Modus Tollens*, diperoleh: $\\sim D$ (Daya beli masyarakat tidak tertekan).
- Dari Premis 1 ($(I \\lor B) \\rightarrow D$) dan $\\sim D$, dengan aturan *Modus Tollens*, diperoleh: $\\sim (I \\lor B)$.
- Berdasarkan Hukum De Morgan: $\\sim (I \\lor B) \\equiv \\sim I \\land \\sim B$.

Artinya: **Inflasi tidak naik tajam dan suku bunga acuan bank sentral tidak dinaikkan**.`,
    options: [
      { key: 'A', text: 'Inflasi tidak naik tajam dan suku bunga acuan bank sentral tidak dinaikkan.', score: 1 },
      { key: 'B', text: 'Inflasi tidak naik tajam atau suku bunga acuan bank sentral dinaikkan.', score: 0 },
      { key: 'C', text: 'Suku bunga acuan bank sentral dinaikkan, tetapi inflasi tetap terkendali.', score: 0 },
      { key: 'D', text: 'Inflasi naik tajam, tetapi daya beli masyarakat tidak tertekan.', score: 0 },
      { key: 'E', text: 'Daya beli masyarakat tertekan meskipun omzet ritel meningkat.', score: 0 },
    ],
  },
  {
    orderNumber: 3,
    category: 'Penalaran Umum',
    subTopic: 'Penalaran Analitis & Urutan Posisi',
    questionType: 'MULTIPLE_CHOICE',
    text: `Enam orang siswa: Arya, Bima, Citra, Dinda, Eko, dan Fani duduk berderet menghadap panggung pada kursi nomor 1 sampai 6 (dari kiri ke kanan).
Ketentuannya adalah:
- Arya duduk di kursi nomor 1.
- Bima duduk di antara Arya dan Citra.
- Citra tidak boleh duduk bersebelahan dengan Eko.
- Eko duduk tepat di sebelah kiri Fani.

Berdasarkan kondisi di atas, siapakah yang duduk di kursi nomor 5?`,
    explanation: `**Kunci Jawaban: D**

**Pembahasan:**
Mari analisis posisi kursi 1 sampai 6:
1. Arya ($A$) duduk di kursi 1 $\\rightarrow [A, \\_, \\_, \\_, \\_, \\_]$.
2. Bima ($B$) duduk di antara Arya dan Citra ($C$). Karena $A$ berada di kursi 1, maka $B$ harus di kursi 2 dan $C$ di kursi 3 $\\rightarrow [A, B, C, \\_, \\_, \\_]$.
3. Tersisa kursi 4, 5, dan 6 yang harus diisi oleh Dinda ($D$), Eko ($E$), dan Fani ($F$).
4. Diketahui Eko duduk tepat di sebelah kiri Fani, berarti blok $(E, F)$ menempati dua kursi berdekatan.
5. Syarat tambahan: Citra (kursi 3) tidak boleh bersebelahan dengan Eko, sehingga kursi 4 **tidak boleh** diisi Eko.
6. Dengan demikian, kursi 4 harus diisi oleh Dinda ($D$), dan blok $(E, F)$ menempati kursi 5 dan 6.

Susunan lengkap kursi 1 sampai 6:
- Kursi 1: Arya
- Kursi 2: Bima
- Kursi 3: Citra
- Kursi 4: Dinda
- Kursi 5: **Eko**
- Kursi 6: Fani

Maka orang yang duduk di kursi nomor 5 adalah **Eko**.`,
    options: [
      { key: 'A', text: 'Bima', score: 0 },
      { key: 'B', text: 'Citra', score: 0 },
      { key: 'C', text: 'Dinda', score: 0 },
      { key: 'D', text: 'Eko', score: 1 },
      { key: 'E', text: 'Fani', score: 0 },
    ],
  },
  {
    orderNumber: 4,
    category: 'Penalaran Umum',
    subTopic: 'Penalaran Sebab-Akibat',
    questionType: 'MULTIPLE_CHOICE',
    text: `Perhatikan dua pernyataan berikut:
(1) Pemerintah daerah mengalokasikan program subsidi pupuk organik dan pelatihan teknologi irigasi presisi secara terpadu kepada kelompok tani desa Z.
(2) Hasil panen raya padi di desa Z mengalami kenaikan produktivitas sebesar 28% dibandingkan musim tanam sebelumnya.

Manakah hubungan kausal yang **paling tepat** antara kedua pernyataan tersebut?`,
    explanation: `**Kunci Jawaban: A**

**Pembahasan:**
- Pernyataan (1) memaparkan intervensi berupa subsidi pupuk organik dan pelatihan teknologi irigasi presisi yang merupakan faktor input pertanian penting untuk meningkatkan kesuburan tanah dan efisiensi air.
- Pernyataan (2) memaparkan peningkatan produktivitas hasil panen sebesar 28%.
Secara logis dan ilmiah, ketersediaan pupuk dan manajemen air yang presisi (1) menjadi faktor penyebab langsung (*cause*) dari melonjaknya hasil panen komoditas padi (2).
Oleh karena itu, pernyataan (1) adalah penyebab dan pernyataan (2) adalah akibat.`,
    options: [
      { key: 'A', text: 'Pernyataan (1) adalah penyebab dan pernyataan (2) adalah akibat.', score: 1 },
      { key: 'B', text: 'Pernyataan (2) adalah penyebab dan pernyataan (1) adalah akibat.', score: 0 },
      { key: 'C', text: 'Pernyataan (1) dan (2) adalah akibat dari suatu penyebab independen yang sama.', score: 0 },
      { key: 'D', text: 'Pernyataan (1) dan (2) adalah akibat dari dua penyebab berbeda yang tidak saling berkaitan.', score: 0 },
      { key: 'E', text: 'Pernyataan (1) dan (2) keduanya merupakan penyebab independen tanpa keterkaitan logis.', score: 0 },
    ],
  },
  {
    orderNumber: 5,
    category: 'Penalaran Umum',
    subTopic: 'Syarat Cukup & Syarat Perlu',
    questionType: 'MULTIPLE_CHOICE',
    text: `"Seseorang berhak menerima sertifikat keahlian analis data profesional hanya jika ia lulus ujian sertifikasi kompetensi nasional dan menyelesaikan portofolio proyek industri terverifikasi."

Berdasarkan pernyataan di atas, manakah kondisi yang **pasti benar**?`,
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Frasa "$P$ hanya jika $Q$ dan $R$" dalam logika formal memiliki arti $P \\rightarrow (Q \\land R)$.
Ini berarti bahwa $Q$ (lulus ujian sertifikasi) dan $R$ (portofolio terverifikasi) adalah **syarat perlu** (*necessary conditions*) agar seseorang berhak memperoleh sertifikat ($P$).
- Artinya: tanpa kelulusan ujian kompetensi nasional, seseorang **tidak mungkin** menerima sertifikat keahlian analis data.
- Oleh karena itu, kelulusan ujian sertifikasi kompetensi nasional merupakan syarat perlu.
- Opsi A dan D salah karena menganggap salah satu elemen sebagai syarat cukup.
- Opsi C bertentangan dengan kata "hanya jika".
- Opsi E salah karena jika seseorang tidak menerima sertifikat, bisa jadi ia lulus ujian namun belum menuntaskan portofolionya.`,
    options: [
      { key: 'A', text: 'Menyelesaikan portofolio proyek industri terverifikasi merupakan syarat cukup untuk menerima sertifikat.', score: 0 },
      { key: 'B', text: 'Lulus ujian sertifikasi kompetensi nasional merupakan syarat perlu untuk menerima sertifikat analis data.', score: 1 },
      { key: 'C', text: 'Seseorang yang tidak memiliki portofolio proyek tetap dapat menerima sertifikat jika skor ujiannya sempurna.', score: 0 },
      { key: 'D', text: 'Jika seseorang lulus ujian kompetensi, ia otomatis langsung berhak menerima sertifikat analis data.', score: 0 },
      { key: 'E', text: 'Jika seseorang tidak menerima sertifikat, maka dipastikan ia gagal dalam ujian sertifikasi kompetensi.', score: 0 },
    ],
  },
  {
    orderNumber: 6,
    category: 'Penalaran Umum',
    subTopic: 'Negasi & Logika Matematika',
    questionType: 'MULTIPLE_CHOICE',
    text: `Ingkaran (negasi) dari pernyataan:
"Semua kandidat magang yang berkinerja unggul mendapatkan tawaran kerja tetap atau memperoleh surat rekomendasi direksi" adalah ...`,
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Misalkan $K(x)$ = kandidat berkinerja unggul, $T(x)$ = mendapat tawaran kerja tetap, $R(x)$ = memperoleh surat rekomendasi direksi.
Pernyataan: $\\forall x [K(x) \\rightarrow (T(x) \\lor R(x))]$.
Bentuk ingkarannya adalah:
$$\\sim (\\forall x [K(x) \\rightarrow (T(x) \\lor R(x))]) \\equiv \\exists x [K(x) \\land \\sim (T(x) \\lor R(x))]$$
Dengan Hukum De Morgan:
$$\\sim (T(x) \\lor R(x)) \\equiv \\sim T(x) \\land \\sim R(x)$$
Sehingga ingkarannya berbunyi:
"**Ada (beberapa) kandidat magang yang berkinerja unggul TIDAK mendapatkan tawaran kerja tetap DAN TIDAK memperoleh surat rekomendasi direksi**".`,
    options: [
      { key: 'A', text: 'Semua kandidat magang yang berkinerja unggul tidak mendapatkan tawaran kerja tetap atau surat rekomendasi direksi.', score: 0 },
      { key: 'B', text: 'Ada kandidat magang yang berkinerja unggul tidak mendapatkan tawaran kerja tetap dan tidak memperoleh surat rekomendasi direksi.', score: 1 },
      { key: 'C', text: 'Beberapa kandidat magang yang tidak berkinerja unggul mendapatkan tawaran kerja tetap.', score: 0 },
      { key: 'D', text: 'Tidak ada kandidat magang yang berkinerja unggul yang mendapatkan tawaran kerja tetap.', score: 0 },
      { key: 'E', text: 'Semua kandidat magang yang berkinerja unggul tidak mendapatkan tawaran kerja tetap tetapi memperoleh surat rekomendasi.', score: 0 },
    ],
  },
  {
    orderNumber: 7,
    category: 'Penalaran Umum',
    subTopic: 'Penalaran Induktif & Pola Berpikir',
    questionType: 'MULTIPLE_CHOICE',
    text: `Penelitian di lima kota metropolitan (Jakarta, Surabaya, Bandung, Medan, dan Makassar) menunjukkan bahwa penambahan jalur sepeda terproteksi yang terintegrasi dengan halte transportasi umum meningkatkan jumlah komuter bersepeda sebesar 40% dan menurunkan konsentrasi polutan udara mikro sebesar 18%. Berdasarkan temuan ini, asosiasi perencana kota merekomendasikan seluruh pemerintah daerah di Indonesia untuk segera membangun jaringan jalur sepeda terproteksi serupa.

Asumsi mendasar yang melandasi rekomendasi asosiasi perencana kota di atas adalah ...`,
    explanation: `**Kunci Jawaban: E**

**Pembahasan:**
Sebuah rekomendasi yang digeneralisasikan dari sampel (lima kota metropolitan) ke seluruh populasi (seluruh pemerintah daerah di Indonesia) mengasumsikan bahwa kondisi demografis, kesiapan mobilitas, dan integrasi fasilitas di kota-kota lain memiliki kemiripan karakteristik dasar sehingga intervensi yang sama akan membuahkan efektivitas yang sebanding.
Opsi E menyatakan asumsi keterwakilan karakteristik dan potensi penerimaan mobilitas publik tersebut. Tanpa asumsi ini, rekomendasi serentak ke seluruh daerah di Indonesia menjadi tidak beralasan.`,
    options: [
      { key: 'A', text: 'Jalur sepeda terproteksi membutuhkan biaya konstruksi yang lebih rendah dibandingkan pelebaran jalan raya.', score: 0 },
      { key: 'B', text: 'Pengendara kendaraan bermotor pribadi di kota-kota kecil bersedia beralih menggunakan sepeda harian.', score: 0 },
      { key: 'C', text: 'Penurunan polusi udara mikro hanya dapat dicapai melalui penyediaan jalur sepeda terproteksi.', score: 0 },
      { key: 'D', text: 'Transportasi umum massal di seluruh kabupaten/kota di Indonesia sudah memadai.', score: 0 },
      { key: 'E', text: 'Karakteristik mobilitas dan potensi penerimaan masyarakat di kota-kota lain sebanding dengan kota metropolitan yang diteliti.', score: 1 },
    ],
  },
  {
    orderNumber: 8,
    category: 'Penalaran Umum',
    subTopic: 'Rasio & Laju Perubahan Logis',
    questionType: 'MULTIPLE_CHOICE',
    text: `Sebuah tangki air memiliki dua pipa pengisi (Pipa P dan Pipa Q) serta satu pipa pembuangan (Pipa R).
- Jika hanya Pipa P yang dibuka, tangki penuh dalam 6 jam.
- Jika hanya Pipa Q yang dibuka, tangki penuh dalam 4 jam.
- Jika hanya Pipa R yang dibuka saat tangki penuh, tangki menjadi kosong dalam 3 jam.

Jika tangki awalnya kosong, kemudian ketiga pipa dibuka secara bersamaan selama 6 jam, berapakah bagian volume tangki yang terisi air?`,
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Tentukan debit/laju per jam masing-masing pipa terhadap volume tangki ($V$):
- Laju Pipa P: $v_P = +\\frac{1}{6}$ volume/jam
- Laju Pipa Q: $v_Q = +\\frac{1}{4}$ volume/jam
- Laju Pipa R: $v_R = -\\frac{1}{3}$ volume/jam (mengosongkan)

Laju akumulasi bersih ketika ketiga pipa dibuka bersamaan:
$$v_{\\text{net}} = \\frac{1}{6} + \\frac{1}{4} - \\frac{1}{3}$$
Samakan penyebut ke KPK 12:
$$v_{\\text{net}} = \\frac{2 + 3 - 4}{12} = \\frac{1}{12} \\text{ bagian volume per jam}$$

Dalam durasi waktu 6 jam:
$$V_{\\text{terisi}} = 6 \\times \\frac{1}{12} = \\frac{1}{2} \\text{ bagian volume tangki}$$
Jadi tangki tepat terisi **setengah (1/2) bagian** dari volume totalnya.`,
    options: [
      { key: 'A', text: 'Tangki telah meluap karena penuh dalam 4 jam.', score: 0 },
      { key: 'B', text: 'Tangki terisi tepat setengah (1/2) bagian volume totalnya.', score: 1 },
      { key: 'C', text: 'Tangki tetap kosong karena laju pembuangan lebih dominan.', score: 0 },
      { key: 'D', text: 'Tangki terisi dua pertiga (2/3) bagian volume totalnya.', score: 0 },
      { key: 'E', text: 'Tangki terisi tiga perempat (3/4) bagian volume totalnya.', score: 0 },
    ],
  },
  {
    orderNumber: 9,
    category: 'Penalaran Umum',
    subTopic: 'Penalaran Kombinatorik & Penjadwalan',
    questionType: 'MULTIPLE_CHOICE',
    text: `Lima pembicara: Zaki, Yusuf, Xander, Wendy, dan Vina akan memberikan paparan materi dalam seminar yang dibagi ke dalam 5 sesi berurutan (Sesi 1 s.d. 5).
Ketentuan pembagian jadwal:
- Zaki berbicara tepat pada sesi sebelum Wendy.
- Yusuf berbicara pada sesi bernomor ganjil, tetapi bukan sesi pertama dan bukan sesi terakhir.
- Vina berbicara pada sesi yang lebih awal daripada Xander.

Siapakah pembicara yang mengisi sesi ke-3?`,
    explanation: `**Kunci Jawaban: D**

**Pembahasan:**
Mari analisis sesi seminar: Sesi 1, Sesi 2, Sesi 3, Sesi 4, Sesi 5.
1. Syarat Yusuf: Yusuf berbicara pada sesi ganjil, yaitu 1, 3, atau 5.
   Tetapi disyaratkan bukan sesi pertama (bukan 1) dan bukan sesi terakhir (bukan 5).
   Maka Yusuf **pasti** berbicara pada **Sesi 3**!
2. Sesi tersisa yang belum terisi adalah: Sesi 1, 2, 4, 5.
3. Syarat Zaki dan Wendy: Zaki berbicara tepat sebelum Wendy, sehingga blok $(Z, W)$ harus berada pada dua sesi berurutan. Pasangan sesi berurutan yang tersedia adalah $(1, 2)$ atau $(4, 5)$.
4. Syarat Vina dan Xander: Vina berbicara sebelum Xander ($V < X$). Pasangan yang tersisa akan diisi oleh $V$ dan $X$.
Dengan demikian, tanpa bergantung pada posisi spesifik $Z, W$ dan $V, X$, pembicara yang mutlak mengisi sesi ke-3 adalah **Yusuf**.

Pada pilihan jawaban:
A: Zaki, B: Xander, C: Wendy, D: Yusuf, E: Vina.
Maka jawaban yang benar adalah **D (Yusuf)**.`,
    options: [
      { key: 'A', text: 'Zaki', score: 0 },
      { key: 'B', text: 'Xander', score: 0 },
      { key: 'C', text: 'Wendy', score: 0 },
      { key: 'D', text: 'Yusuf', score: 1 },
      { key: 'E', text: 'Vina', score: 0 },
    ],
  },
  {
    orderNumber: 10,
    category: 'Penalaran Umum',
    subTopic: 'Evaluasi Logika & Penguatan Argumen',
    questionType: 'MULTIPLE_CHOICE',
    text: `Banyak perusahaan rintisan (*startup*) teknologi di Kota Y beralih menerapkan kebijakan kerja jarak jauh (*remote work*) permanen. Manajemen mengklaim bahwa kebijakan ini meningkatkan efisiensi operasional perusahaan secara menyeluruh dan tidak menurunkan produktivitas maupun kreativitas tim pengembang produk perangkat lunak.

Manakah temuan survei berikut yang jika benar akan **paling memperkuat** klaim manajemen perusahaan rintisan di atas?`,
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Klaim manajemen memuat dua poin penting:
1. Peningkatan efisiensi operasional menyeluruh.
2. Produktivitas dan kreativitas tim pengembang tidak turun (bahkan terjaga/meningkat).

- **Opsi C** menyajikan data konkret terhadap kedua aspek tersebut: pengeluaran operasional utilitas dan sewa kantor turun 45% (bukti efisiensi biaya), sementara *release* fitur perangkat lunak tercapai 15% lebih cepat dengan rasio *bug* menurun (bukti produktivitas dan kualitas meningkat).
- Opsi A, B, D, dan E membahas preferensi subjektif atau perbandingan sektor lain yang tidak langsung membuktikan klaim efisiensi dan produktivitas internal.`,
    options: [
      { key: 'A', text: 'Karyawan memiliki fleksibilitas lebih tinggi dalam mengatur jam istirahat bersama keluarga di rumah.', score: 0 },
      { key: 'B', text: 'Perusahaan konvensional non-teknologi di Kota Y mulai mewajibkan karyawan masuk kantor 5 hari penuh setiap minggu.', score: 0 },
      { key: 'C', text: 'Biaya operasional sewa gedung dan utilitas turun 45%, sementara target pengiriman fitur perangkat lunak selesai 15% lebih cepat dengan penurunan indeks galat (bug).', score: 1 },
      { key: 'D', text: 'Biaya pengadaan perangkat laptop dan internet ditanggung penuh oleh masing-masing karyawan secara mandiri.', score: 0 },
      { key: 'E', text: 'Sebagian besar manajer produk menyatakan lebih menyukai rapat koordinasi harian secara daring melalui panggilan video.', score: 0 },
    ],
  },

  // =========================================================================
  // SECTION 2: PENGETAHUAN KUANTITATIF (11 - 25)
  // =========================================================================
  {
    orderNumber: 11,
    category: 'Pengetahuan Kuantitatif',
    subTopic: 'Aljabar & Persamaan Kuadrat',
    questionType: 'MULTIPLE_CHOICE',
    text: `Diketahui persamaan kuadrat $2x^2 - 6x + 1 = 0$ memiliki akar-akar real $x_1$ dan $x_2$. Nilai dari:
$$\\frac{x_1}{x_2} + \\frac{x_2}{x_1} + 4(x_1 + x_2)$$
adalah ...`,
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Dari persamaan kuadrat $2x^2 - 6x + 1 = 0$, dengan $a = 2, b = -6, c = 1$:
Berdasarkan Teorema Vieta:
- $x_1 + x_2 = -\\frac{b}{a} = -\\frac{-6}{2} = 3$
- $x_1 x_2 = \\frac{c}{a} = \\frac{1}{2}$

Hitung bentuk pecahan simetris:
$$\\frac{x_1}{x_2} + \\frac{x_2}{x_1} = \\frac{x_1^2 + x_2^2}{x_1 x_2} = \\frac{(x_1 + x_2)^2 - 2x_1 x_2}{x_1 x_2}$$
Substitusikan nilai yang didapat:
$$\\frac{3^2 - 2\\left(\\frac{1}{2}\\right)}{\\frac{1}{2}} = \\frac{9 - 1}{\\frac{1}{2}} = \\frac{8}{\\frac{1}{2}} = 16$$

Hitung suku linier:
$$4(x_1 + x_2) = 4(3) = 12$$

Jumlahkan seluruh nilai:
$$\\text{Nilai} = 16 + 12 = 28$$`,
    options: [
      { key: 'A', text: '18', score: 0 },
      { key: 'B', text: '24', score: 0 },
      { key: 'C', text: '28', score: 1 },
      { key: 'D', text: '32', score: 0 },
      { key: 'E', text: '36', score: 0 },
    ],
  },
  {
    orderNumber: 12,
    category: 'Pengetahuan Kuantitatif',
    subTopic: 'Sistem Persamaan Linear Tiga Variabel',
    questionType: 'MULTIPLE_CHOICE',
    text: `Diketahui sistem persamaan linear tiga variabel:
$$\\begin{cases} x + 2y + z = 11 \\\\ 2x - y + 3z = 16 \\\\ 3x + y - 2z = 3 \\end{cases}$$
Nilai dari $x^2 + y^2 + z^2$ adalah ...`,
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Diberikan:
1) $x + 2y + z = 11$
2) $2x - y + 3z = 16$
3) $3x + y - 2z = 3$

Eliminasi $y$:
Jumlahkan persamaan (2) dan (3):
$$(2x - y + 3z) + (3x + y - 2z) = 16 + 3 \\implies 5x + z = 19 \\implies z = 19 - 5x \\quad \\text{--- (4)}$$

Kalikan persamaan (2) dengan 2 lalu jumlahkan dengan persamaan (1):
$$2(2x - y + 3z) + (x + 2y + z) = 2(16) + 11$$
$$(4x - 2y + 6z) + (x + 2y + z) = 32 + 11 \\implies 5x + 7z = 43 \\quad \\text{--- (5)}$$

Substitusi persamaan (4) ke persamaan (5):
$$5x + 7(19 - 5x) = 43$$
$$5x + 133 - 35x = 43 \\implies -30x = 43 - 133 = -90 \\implies x = 3$$

Cari nilai $z$:
$$z = 19 - 5(3) = 19 - 15 = 4$$

Cari nilai $y$ dari persamaan (1):
$$3 + 2y + 4 = 11 \\implies 2y + 7 = 11 \\implies 2y = 4 \\implies y = 2$$

Solusi SPLTV adalah $(x, y, z) = (3, 2, 4)$.
Maka nilai:
$$x^2 + y^2 + z^2 = 3^2 + 2^2 + 4^2 = 9 + 4 + 16 = 29$$`,
    options: [
      { key: 'A', text: '25', score: 0 },
      { key: 'B', text: '29', score: 1 },
      { key: 'C', text: '33', score: 0 },
      { key: 'D', text: '36', score: 0 },
      { key: 'E', text: '41', score: 0 },
    ],
  },
  {
    orderNumber: 13,
    category: 'Pengetahuan Kuantitatif',
    subTopic: 'Fungsi Komposisi & Invers',
    questionType: 'MULTIPLE_CHOICE',
    text: `Diketahui fungsi $f(x) = \\frac{3x + 4}{2x - 5}$ untuk $x \\neq \\frac{5}{2}$ dan $g(x) = 2x - 1$.
Jika $(f \\circ g)^{-1}(a) = 3$, maka nilai dari $a$ adalah ...`,
    explanation: `**Kunci Jawaban: D**

**Pembahasan:**
Berdasarkan sifat dasar fungsi invers:
$$(f \\circ g)^{-1}(a) = 3 \\iff (f \\circ g)(3) = a$$
Artinya, kita cukup menghitung nilai dari $f(g(3))$:

Langkah 1: Hitung $g(3)$:
$$g(3) = 2(3) - 1 = 6 - 1 = 5$$

Langkah 2: Hitung $f(5)$:
$$f(5) = \\frac{3(5) + 4}{2(5) - 5} = \\frac{15 + 4}{10 - 5} = \\frac{19}{5}$$

Jadi nilai $a = \\frac{19}{5} = 3,8$.`,
    options: [
      { key: 'A', text: '$\\frac{14}{5}$', score: 0 },
      { key: 'B', text: '$\\frac{17}{3}$', score: 0 },
      { key: 'C', text: '$4$', score: 0 },
      { key: 'D', text: '$\\frac{19}{5}$', score: 1 },
      { key: 'E', text: '$\\frac{23}{5}$', score: 0 },
    ],
  },
  {
    orderNumber: 14,
    category: 'Pengetahuan Kuantitatif',
    subTopic: 'Barisan & Deret Geometri Tak Hingga',
    questionType: 'MULTIPLE_CHOICE',
    text: `Suatu deret geometri tak hingga konvergen mempunyai suku pertama $a$ dan rasio $r$ dengan $|r| < 1$. Jika jumlah seluruh suku deret tersebut adalah $12$ dan jumlah suku-suku bernomor genapnya adalah $4$, maka nilai suku pertama $a$ dan rasio $r$ berturut-turut adalah ...`,
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
1. Rumus jumlah deret geometri tak hingga:
   $$S_\\infty = \\frac{a}{1 - r} = 12 \\implies a = 12(1 - r)$$
2. Suku-suku bernomor genap adalah: $U_2, U_4, U_6, \\dots = ar, ar^3, ar^5, \\dots$
   Ini merupakan deret geometri baru dengan suku pertama $a' = ar$ dan rasio $r' = r^2$.
   $$S_{\\text{genap}} = \\frac{ar}{1 - r^2} = 4$$
   Faktorkan penyebutnya:
   $$\\frac{a}{1 - r} \\cdot \\frac{r}{1 + r} = 4$$
3. Substitusikan $\\frac{a}{1 - r} = 12$:
   $$12 \\cdot \\frac{r}{1 + r} = 4 \\implies \\frac{r}{1 + r} = \\frac{4}{12} = \\frac{1}{3}$$
   $$3r = 1 + r \\implies 2r = 1 \\implies r = \\frac{1}{2}$$
4. Cari nilai $a$:
   $$a = 12\\left(1 - \\frac{1}{2}\\right) = 12\\left(\\frac{1}{2}\\right) = 6$$

Jadi, $a = 6$ dan $r = \\frac{1}{2}$.`,
    options: [
      { key: 'A', text: '$a = 8$ dan $r = \\frac{1}{3}$', score: 0 },
      { key: 'B', text: '$a = 6$ dan $r = \\frac{1}{2}$', score: 1 },
      { key: 'C', text: '$a = 9$ dan $r = \\frac{1}{4}$', score: 0 },
      { key: 'D', text: '$a = 8$ dan $r = \\frac{1}{2}$', score: 0 },
      { key: 'E', text: '$a = 6$ dan $r = \\frac{1}{3}$', score: 0 },
    ],
  },
  {
    orderNumber: 15,
    category: 'Pengetahuan Kuantitatif',
    subTopic: 'Eksponen & Logaritma',
    questionType: 'MULTIPLE_CHOICE',
    text: `Jika $^2\\log 3 = p$ dan $^3\\log 5 = q$, maka nilai dari $^{15}\\log 20$ jika dinyatakan dalam $p$ dan $q$ adalah ...`,
    explanation: `**Kunci Jawaban: E**

**Pembahasan:**
Ubah basis logaritma ke basis 2:
$$^{15}\\log 20 = \\frac{^2\\log 20}{^2\\log 15}$$

Gunakan sifat perkalian logaritma untuk menentukan $^2\\log 5$:
$$^2\\log 5 = ^2\\log 3 \\cdot ^3\\log 5 = p \\cdot q = pq$$

Faktorkan numerus masing-masing:
- $^2\\log 20 = ^2\\log (2^2 \\times 5) = ^2\\log (2^2) + ^2\\log 5 = 2 + pq$
- $^2\\log 15 = ^2\\log (3 \\times 5) = ^2\\log 3 + ^2\\log 5 = p + pq = p(1 + q)$

Maka:
$$^{15}\\log 20 = \\frac{2 + pq}{p + pq}$$
Pada opsi E tertulis dalam bentuk $\\frac{2 + pq}{p + pq}$.`,
    options: [
      { key: 'A', text: '$\\frac{2p + q}{p + pq}$', score: 0 },
      { key: 'B', text: '$\\frac{2 + p}{pq + 1}$', score: 0 },
      { key: 'C', text: '$\\frac{p + 2q}{1 + pq}$', score: 0 },
      { key: 'D', text: '$\\frac{2 + q}{p(1 + q)}$', score: 0 },
      { key: 'E', text: '$\\frac{2 + pq}{p + pq}$', score: 1 },
    ],
  },
  {
    orderNumber: 16,
    category: 'Pengetahuan Kuantitatif',
    subTopic: 'Geometri Analitik & Garis Singgung',
    questionType: 'MULTIPLE_CHOICE',
    text: `Persamaan garis lurus yang tegak lurus dengan garis singgung kurva parabola $y = x^2 - 4x + 5$ di titik $P(3, 2)$ adalah ...`,
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
1. Tentukan turunan pertama kurva untuk gradien garis singgung ($m_1$):
   $$y' = 2x - 4$$
   Di titik absis $x = 3$:
   $$m_1 = 2(3) - 4 = 6 - 4 = 2$$
2. Garis yang tegak lurus memiliki gradien $m_2$:
   $$m_1 \\cdot m_2 = -1 \\implies 2 \\cdot m_2 = -1 \\implies m_2 = -\\frac{1}{2}$$
3. Persamaan garis lurus melalui $P(3, 2)$ dengan gradien $m_2 = -\\frac{1}{2}$:
   $$y - y_1 = m_2(x - x_1)$$
   $$y - 2 = -\\frac{1}{2}(x - 3)$$
   Kalikan kedua ruas dengan 2:
   $$2(y - 2) = -(x - 3)$$
   $$2y - 4 = -x + 3 \\implies x + 2y - 7 = 0$$`,
    options: [
      { key: 'A', text: '$2x + y - 8 = 0$', score: 0 },
      { key: 'B', text: '$x - 2y + 1 = 0$', score: 0 },
      { key: 'C', text: '$x + 2y - 7 = 0$', score: 1 },
      { key: 'D', text: '$2x - y - 4 = 0$', score: 0 },
      { key: 'E', text: '$x + 2y + 7 = 0$', score: 0 },
    ],
  },
  {
    orderNumber: 17,
    category: 'Pengetahuan Kuantitatif',
    subTopic: 'Trigonometri & Aturan Cosinus',
    questionType: 'MULTIPLE_CHOICE',
    text: `Pada segitiga $ABC$, diketahui panjang sisi $AB = 6\\text{ cm}$, panjang sisi $BC = 8\\text{ cm}$, dan sudut $\\angle B = 60^\\circ$. Panjang sisi $AC$ adalah ...`,
    explanation: `**Kunci Jawaban: D**

**Pembahasan:**
Gunakan Aturan Cosinus pada $\\triangle ABC$:
$$AC^2 = AB^2 + BC^2 - 2 \\cdot AB \\cdot BC \\cdot \\cos B$$
Substitusi nilai yang diketahui:
$$AC^2 = 6^2 + 8^2 - 2(6)(8) \\cos 60^\\circ$$
$$AC^2 = 36 + 64 - 96 \\cdot \\frac{1}{2}$$
$$AC^2 = 100 - 48 = 52$$
$$AC = \\sqrt{52} = \\sqrt{4 \\times 13} = 2\\sqrt{13}\\text{ cm}$$`,
    options: [
      { key: 'A', text: '$2\\sqrt{15}\\text{ cm}$', score: 0 },
      { key: 'B', text: '$4\\sqrt{3}\\text{ cm}$', score: 0 },
      { key: 'C', text: '$3\\sqrt{7}\\text{ cm}$', score: 0 },
      { key: 'D', text: '$2\\sqrt{13}\\text{ cm}$', score: 1 },
      { key: 'E', text: '$2\\sqrt{19}\\text{ cm}$', score: 0 },
    ],
  },
  {
    orderNumber: 18,
    category: 'Pengetahuan Kuantitatif',
    subTopic: 'Statistika Deskriptif & Nilai Rata-rata',
    questionType: 'MULTIPLE_CHOICE',
    text: `Nilai rata-rata tes matematika dari 30 siswa kelas XII A adalah 72. Ketika nilai dari 10 siswa baru digabungkan, nilai rata-rata keseluruhan naik menjadi 75. Jika dari 10 siswa baru tersebut, dua orang memperoleh nilai yang sama yaitu $x$, dan delapan orang lainnya masing-masing memperoleh rata-rata 82, maka nilai $x$ adalah ...`,
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Total nilai awal 30 siswa:
$$\\sum x_{\\text{awal}} = 30 \\times 72 = 2160$$

Setelah ditambah 10 siswa baru, total siswa menjadi $30 + 10 = 40$ siswa, dengan rata-rata 75:
$$\\sum x_{\\text{akhir}} = 40 \\times 75 = 3000$$

Jumlah nilai dari 10 siswa baru:
$$\\sum x_{\\text{baru}} = 3000 - 2160 = 840$$

Rincian 10 siswa baru:
- 8 siswa memiliki rata-rata 82, total nilainya: $8 \\times 82 = 656$
- 2 siswa masing-masing bernilai $x$, total nilainya: $2x$

Persamaan:
$$656 + 2x = 840$$
$$2x = 840 - 656 = 184 \\implies x = \\frac{184}{2} = 92$$
Jadi, nilai masing-masing dari dua siswa tersebut adalah $92$.`,
    options: [
      { key: 'A', text: '86', score: 0 },
      { key: 'B', text: '89', score: 0 },
      { key: 'C', text: '92', score: 1 },
      { key: 'D', text: '95', score: 0 },
      { key: 'E', text: '98', score: 0 },
    ],
  },
  {
    orderNumber: 19,
    category: 'Pengetahuan Kuantitatif',
    subTopic: 'Peluang & Kombinatorika',
    questionType: 'MULTIPLE_CHOICE',
    text: `Dalam sebuah kotak terdapat 5 bola merah, 4 bola biru, dan 3 bola hijau. Diambil 3 bola sekaligus secara acak dari dalam kotak. Peluang terambilnya sekurang-kurangnya 2 bola merah adalah ...`,
    explanation: `**Kunci Jawaban: E**

**Pembahasan:**
Jumlah bola total dalam kotak: $5 + 4 + 3 = 12$ bola.
Banyaknya titik sampel pengambilan 3 bola dari 12 bola:
$$n(S) = \\binom{12}{3} = \\frac{12 \\times 11 \\times 10}{3 \\times 2 \\times 1} = 220$$

Kejadian $E$: "Terambil sekurang-kurangnya 2 bola merah".
Ada 2 kasus:
1. **Kasus 1**: Tepat 2 bola merah dan 1 bola warna lain (biru atau hijau, total 7 bola non-merah):
   $$n(E_1) = \\binom{5}{2} \\times \\binom{7}{1} = 10 \\times 7 = 70$$
2. **Kasus 2**: Tepat 3 bola merah:
   $$n(E_2) = \\binom{5}{3} = 10$$

Total kejadian yang diharapkan:
$$n(E) = 70 + 10 = 80$$

Peluang kejadian:
$$P(E) = \\frac{n(E)}{n(S)} = \\frac{80}{220} = \\frac{8}{22} = \\frac{4}{11}$$`,
    options: [
      { key: 'A', text: '$\\frac{17}{44}$', score: 0 },
      { key: 'B', text: '$\\frac{5}{11}$', score: 0 },
      { key: 'C', text: '$\\frac{7}{22}$', score: 0 },
      { key: 'D', text: '$\\frac{6}{11}$', score: 0 },
      { key: 'E', text: '$\\frac{4}{11}$', score: 1 },
    ],
  },
  {
    orderNumber: 20,
    category: 'Pengetahuan Kuantitatif',
    subTopic: 'Pertidaksamaan Rasional',
    questionType: 'MULTIPLE_CHOICE',
    text: `Himpunan penyelesaian dari pertidaksamaan rasional:
$$\\frac{x^2 - 2x - 8}{x - 1} \\le 0$$
adalah ...`,
    explanation: `**Kunci Jawaban: A**

**Pembahasan:**
Faktorkan pembilang:
$$x^2 - 2x - 8 = (x - 4)(x + 2)$$
Bentuk pertidaksamaan:
$$\\frac{(x - 4)(x + 2)}{x - 1} \\le 0$$

Titik-titik kritis (pembuat nol):
- Pembilang: $x = -2$ dan $x = 4$
- Penyebut: $x = 1$ (dengan syarat $x \\neq 1$)

Uji tanda pada interval garis bilangan:
1. $x < -2$: ambil $x = -3 \\implies \\frac{(-)(-)}{(-)} = - \\le 0$ (Memenuhi)
2. $-2 < x < 1$: ambil $x = 0 \\implies \\frac{(-)(+)}{(-)} = + > 0$ (Tidak memenuhi)
3. $1 < x < 4$: ambil $x = 2 \\implies \\frac{(-)(+)}{(+)} = - \\le 0$ (Memenuhi)
4. $x > 4$: ambil $x = 5 \\implies \\frac{(+)(+)}{(+)} = + > 0$ (Tidak memenuhi)

Karena terdapat tanda $\\le 0$, titik pembuat nol pembilang ($x = -2$ dan $x = 4$) termasuk dalam penyelesaian, sementara penyebut ($x = 1$) terbuka:
$$x \\le -2 \\quad \\text{atau} \\quad 1 < x \\le 4$$`,
    options: [
      { key: 'A', text: '$x \\le -2$ atau $1 < x \\le 4$', score: 1 },
      { key: 'B', text: '$-2 \\le x < 1$ atau $x \\ge 4$', score: 0 },
      { key: 'C', text: '$x < 1$ atau $2 \\le x \\le 4$', score: 0 },
      { key: 'D', text: '$-2 \\le x \\le 4$ dengan $x \\neq 1$', score: 0 },
      { key: 'E', text: '$x \\le -2$ atau $x > 4$', score: 0 },
    ],
  },
  {
    orderNumber: 21,
    category: 'Pengetahuan Kuantitatif',
    subTopic: 'Matriks & Determinan',
    questionType: 'MULTIPLE_CHOICE',
    text: `Diketahui matriks $A = \\begin{pmatrix} 2 & 1 \\\\ 3 & 4 \\end{pmatrix}$ dan $B = \\begin{pmatrix} 1 & -2 \\\\ 0 & 3 \\end{pmatrix}$. Jika matriks persegi $X$ berordo $2 \\times 2$ memenuhi persamaan matriks $A \\cdot X = B^T$, maka nilai determinan dari matriks $X$ ($\\det(X)$) adalah ...`,
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Gunakan sifat determinan matriks:
1. $\\det(P \\cdot Q) = \\det(P) \\cdot \\det(Q)$
2. $\\det(P^T) = \\det(P)$

Hitung determinan matriks $A$:
$$\\det(A) = (2)(4) - (1)(3) = 8 - 3 = 5$$

Hitung determinan matriks $B$:
$$\\det(B) = (1)(3) - (-2)(0) = 3 - 0 = 3$$
Maka $\\det(B^T) = \\det(B) = 3$.

Dari persamaan $A \\cdot X = B^T$:
$$\\det(A \\cdot X) = \\det(B^T)$$
$$\\det(A) \\cdot \\det(X) = 3$$
$$5 \\cdot \\det(X) = 3 \\implies \\det(X) = \\frac{3}{5}$$`,
    options: [
      { key: 'A', text: '$\\frac{5}{3}$', score: 0 },
      { key: 'B', text: '$\\frac{3}{5}$', score: 1 },
      { key: 'C', text: '$-\\frac{3}{5}$', score: 0 },
      { key: 'D', text: '$3$', score: 0 },
      { key: 'E', text: '$15$', score: 0 },
    ],
  },
  {
    orderNumber: 22,
    category: 'Pengetahuan Kuantitatif',
    subTopic: 'Polinomial & Teorema Sisa',
    questionType: 'MULTIPLE_CHOICE',
    text: `Suatu suku banyak $P(x)$ jika dibagi oleh $(x - 2)$ bersisa $11$, dan jika dibagi oleh $(x + 1)$ bersisa $-1$. Jika $P(x)$ dibagi oleh $(x^2 - x - 2)$, maka sisa pembagiannya adalah ...`,
    explanation: `**Kunci Jawaban: D**

**Pembahasan:**
Berdasarkan Teorema Sisa:
- Dibagi $(x - 2)$ sisa $11 \\implies P(2) = 11$
- Dibagi $(x + 1)$ sisa $-1 \\implies P(-1) = -1$

Pembagi: $x^2 - x - 2 = (x - 2)(x + 1)$ berderajat 2.
Maka sisa pembagian $S(x)$ berderajat paling tinggi 1:
$$S(x) = ax + b$$

Substitusikan nilai fungsi:
1. $S(2) = 2a + b = 11$
2. $S(-1) = -a + b = -1$

Eliminasi $b$ dengan mengurangkan kedua persamaan:
$$(2a + b) - (-a + b) = 11 - (-1)$$
$$3a = 12 \\implies a = 4$$

Substitusi $a = 4$ ke persamaan 2:
$$-4 + b = -1 \\implies b = 3$$

Jadi, sisa pembagiannya adalah:
$$S(x) = 4x + 3$$`,
    options: [
      { key: 'A', text: '$3x + 5$', score: 0 },
      { key: 'B', text: '$2x + 7$', score: 0 },
      { key: 'C', text: '$4x - 5$', score: 0 },
      { key: 'D', text: '$4x + 3$', score: 1 },
      { key: 'E', text: '$5x + 1$', score: 0 },
    ],
  },
  {
    orderNumber: 23,
    category: 'Pengetahuan Kuantitatif',
    subTopic: 'Kecukupan Data (Data Sufficiency)',
    questionType: 'MULTIPLE_CHOICE',
    text: `Berapakah nilai dari bilangan bulat $x$?

Putuskan apakah pernyataan (1) dan (2) berikut cukup untuk menjawab pertanyaan tersebut:
(1) $x^2 - 5x + 6 = 0$
(2) $|x - 1| = 2$`,
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
- **Uji Pernyataan (1):**
  $$x^2 - 5x + 6 = 0 \\implies (x - 2)(x - 3) = 0 \\implies x = 2 \\text{ atau } x = 3$$
  Karena terdapat dua kemungkinan nilai $x$, pernyataan (1) SAJA tidak cukup.

- **Uji Pernyataan (2):**
  $$|x - 1| = 2 \\implies x - 1 = 2 \\text{ atau } x - 1 = -2 \\implies x = 3 \\text{ atau } x = -1$$
  Karena terdapat dua kemungkinan nilai $x$, pernyataan (2) SAJA tidak cukup.

- **Uji Bersama-sama (1) dan (2):**
  Dari (1): $x \\in \\{2, 3\\}$.
  Dari (2): $x \\in \\{-1, 3\\}$.
  Irisan dari kedua pernyataan adalah $x = 3$ (tunggal dan pasti).

Jadi, DUA pernyataan BERSAMA-SAMA cukup untuk menjawab pertanyaan, tetapi SATU pernyataan SAJA tidak cukup.`,
    options: [
      { key: 'A', text: 'Pernyataan (1) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (2) SAJA tidak cukup.', score: 0 },
      { key: 'B', text: 'Pernyataan (2) SAJA cukup untuk menjawab pertanyaan, tetapi pernyataan (1) SAJA tidak cukup.', score: 0 },
      { key: 'C', text: 'DUA pernyataan BERSAMA-SAMA cukup untuk menjawab pertanyaan, tetapi SATU pernyataan SAJA tidak cukup.', score: 1 },
      { key: 'D', text: 'Pernyataan (1) SAJA cukup untuk menjawab pertanyaan dan pernyataan (2) SAJA cukup.', score: 0 },
      { key: 'E', text: 'Pernyataan (1) dan pernyataan (2) tidak cukup untuk menjawab pertanyaan.', score: 0 },
    ],
  },
  {
    orderNumber: 24,
    category: 'Pengetahuan Kuantitatif',
    subTopic: 'Perbandingan Kuantitas P dan Q',
    questionType: 'MULTIPLE_CHOICE',
    text: `Diberikan informasi bahwa $x$ dan $y$ adalah bilangan bulat positif yang memenuhi:
$$x + y = 14 \\quad \\text{dan} \\quad xy = 45$$
Perhatikan kuantitas $P$ dan $Q$ berikut:
- $P = x^2 + y^2$
- $Q = 106$

Manakah hubungan yang benar antara kuantitas $P$ dan $Q$?`,
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Hitung nilai $P = x^2 + y^2$:
Gunakan identitas aljabar kuadrat:
$$x^2 + y^2 = (x + y)^2 - 2xy$$
Substitusikan nilai yang diketahui:
$$P = (14)^2 - 2(45) = 196 - 90 = 106$$

Diketahui nilai $Q = 106$.
Maka hubungan antara kuantitas $P$ dan $Q$ adalah:
$$P = Q$$

Pada pilihan:
A: $P > Q$
B: $P = Q$
C: $P < Q$
D: Hubungan tidak dapat ditentukan
E: $P + Q < 200$
Maka jawaban yang tepat adalah B.`,
    options: [
      { key: 'A', text: '$P > Q$', score: 0 },
      { key: 'B', text: '$P = Q$', score: 1 },
      { key: 'C', text: '$P < Q$', score: 0 },
      { key: 'D', text: 'Informasi yang diberikan tidak cukup untuk memutuskan hubungan kuantitas $P$ dan $Q$.', score: 0 },
      { key: 'E', text: '$P + Q < 200$', score: 0 },
    ],
  },
  {
    orderNumber: 25,
    category: 'Pengetahuan Kuantitatif',
    subTopic: 'Operasi Biner Aritmetika Khusus',
    questionType: 'MULTIPLE_CHOICE',
    text: `Didefinisikan operasi biner $\\odot$ untuk setiap bilangan bulat $a$ dan $b$ sebagai:
$$a \\odot b = \\frac{a^2 - b^2}{a - b + 2}$$
Nilai dari $5 \\odot (3 \\odot 1)$ adalah ...`,
    explanation: `**Kunci Jawaban: E**

**Pembahasan:**
Operasikan ekspresi dalam tanda kurung terlebih dahulu: $(3 \\odot 1)$:
Dengan $a = 3$ dan $b = 1$:
$$3 \\odot 1 = \\frac{3^2 - 1^2}{3 - 1 + 2} = \\frac{9 - 1}{4} = \\frac{8}{4} = 2$$

Kemudian operasikan $5 \\odot 2$:
Dengan $a = 5$ dan $b = 2$:
$$5 \\odot 2 = \\frac{5^2 - 2^2}{5 - 2 + 2} = \\frac{25 - 4}{5} = \\frac{21}{5}$$
Jadi nilai dari $5 \\odot (3 \\odot 1) = \\frac{21}{5} = 4,2$.`,
    options: [
      { key: 'A', text: '$3$', score: 0 },
      { key: 'B', text: '$\\frac{9}{4}$', score: 0 },
      { key: 'C', text: '$4$', score: 0 },
      { key: 'D', text: '$\\frac{21}{8}$', score: 0 },
      { key: 'E', text: '$\\frac{21}{5}$', score: 1 },
    ],
  },

  // =========================================================================
  // SECTION 3: PEMAHAMAN BACAAN & MENULIS (26 - 35)
  // =========================================================================
  {
    orderNumber: 26,
    category: 'Pemahaman Bacaan & Menulis',
    subTopic: 'Gagasan Utama Paragraf',
    questionType: 'MULTIPLE_CHOICE',
    text: `Bacalah teks berikut untuk menjawab soal nomor 26 s.d. 28!

(1) Perkembangan kecerdasan buatan (*artificial intelligence*) generatif dalam dua tahun terakhir telah merombak lanskap industri kreatif secara masif. (2) Kecepatan algoritma dalam menghasilkan sintesis teks, kode pemrograman, dan citra fotorealistis telah memangkas siklus produksi secara signifikan. (3) Namun, adopsi teknologi yang terlampau akseleratif ini memunculkan kecemasan etis terkait hak kekayaan intelektual dan orisinalitas karya manusia. (4) Banyak praktisi khawatir bahwa tanpa regulasi yang komprehensif, karya cipta mereka akan dieksploitasi sebagai data latih tanpa atribusi maupun kompensasi finansial yang adil. (5) Oleh karena itu, diperlukan sinergi antara regulator, pengembang teknologi, dan komunitas kreatif guna merumuskan kerangka tata kelola yang menjaga inovasi tanpa mendegradasi harkat pencipta manusia.

Gagasan utama dari teks bacaan di atas adalah ...`,
    explanation: `**Kunci Jawaban: A**

**Pembahasan:**
Paragraf tersebut membahas revolusi kecerdasan buatan di industri kreatif, dampaknya terhadap hak kekayaan intelektual praktisi, dan bermuara pada simpulan utama di kalimat (5): pentingnya regulasi dan tata kelola sinergis untuk melindungi hak pencipta manusia tanpa mematikan inovasi.
Dengan demikian, gagasan utama teks adalah **urgensi tata kelola etis dan regulasi kecerdasan buatan generatif dalam melindungi hak cipta industri kreatif** (Opsi A).`,
    options: [
      { key: 'A', text: 'Urgensi tata kelola etis dan regulasi kecerdasan buatan generatif dalam melindungi hak cipta industri kreatif.', score: 1 },
      { key: 'B', text: 'Keunggulan komputasi algoritma kecerdasan buatan dalam mempercepat siklus kreasi dan inovasi digital.', score: 0 },
      { key: 'C', text: 'Penolakan serentak para seniman visual terhadap pemanfaatan kecerdasan buatan generatif.', score: 0 },
      { key: 'D', text: 'Ketidakmampuan regulator hukum dalam mengimbangi kecepatan perkembangan teknologi kecerdasan buatan.', score: 0 },
      { key: 'E', text: 'Perbandingan produktivitas antara kreator konvensional dan pengembang kecerdasan buatan.', score: 0 },
    ],
  },
  {
    orderNumber: 27,
    category: 'Pemahaman Bacaan & Menulis',
    subTopic: 'Simpulan Logis Bacaan',
    questionType: 'MULTIPLE_CHOICE',
    text: `Berdasarkan teks bacaan pada soal nomor 26, manakah simpulan yang **paling tepat dan logis**?`,
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Teks mengemukakan bahwa inovasi AI memangkas siklus produksi, namun membawa ancaman eksploitasi karya cipta tanpa atribusi yang adil. Kalimat penutup menyerukan sinergi multipihak untuk merumuskan kerangka tata kelola.
Maka simpulan yang seimbang dan representatif adalah: **Perlindungan hak cipta kreator manusia memerlukan regulasi tata kelola kolaboratif agar adopsi AI generatif tetap beretika dan adil** (Opsi B).`,
    options: [
      { key: 'A', text: 'Pemanfaatan kecerdasan buatan generatif harus dihentikan demi menjaga mata pencaharian praktisi kreatif.', score: 0 },
      { key: 'B', text: 'Perlindungan hak cipta kreator manusia memerlukan regulasi tata kelola kolaboratif agar adopsi AI generatif tetap beretika dan adil.', score: 1 },
      { key: 'C', text: 'Seluruh karya cipta yang dihasilkan oleh algoritma kecerdasan buatan melanggar undang-undang hak cipta.', score: 0 },
      { key: 'D', text: 'Komunitas kreatif tidak lagi membutuhkan kompensasi finansial jika karyanya telah terpublikasi secara daring.', score: 0 },
      { key: 'E', text: 'Kecerdasan buatan generatif hanya berdampak positif pada pengembang kode pemrograman.', score: 0 },
    ],
  },
  {
    orderNumber: 28,
    category: 'Pemahaman Bacaan & Menulis',
    subTopic: 'Makna Kata & Diksi Kontekstual',
    questionType: 'MULTIPLE_CHOICE',
    text: `Kata **akseleratif** pada kalimat (3) teks di atas memiliki makna yang paling sepadan dengan ...`,
    explanation: `**Kunci Jawaban: D**

**Pembahasan:**
Kata *akseleratif* diturunkan dari *akselerasi* yang dalam Kamus Besar Bahasa Indonesia (KBBI) bermakna proses mempercepat atau peningkatan kecepatan.
Dalam konteks kalimat (3), "adopsi teknologi yang terlampau akseleratif" bermakna proses adopsi atau penerimaan teknologi yang berlangsung dengan sangat cepat atau mengalami percepatan pesat.
Maka makna yang paling sepadan adalah **bersifat mempercepat atau bergerak sangat cepat** (Opsi D).`,
    options: [
      { key: 'A', text: 'Mengandung risiko kegagalan sistem', score: 0 },
      { key: 'B', text: 'Bersifat terencana dan bertahap', score: 0 },
      { key: 'C', text: 'Memerlukan biaya investasi yang besar', score: 0 },
      { key: 'D', text: 'Bersifat mempercepat atau bergerak sangat cepat', score: 1 },
      { key: 'E', text: 'Berjalan secara otomatis tanpa kendali', score: 0 },
    ],
  },
  {
    orderNumber: 29,
    category: 'Pemahaman Bacaan & Menulis',
    subTopic: 'Kalimat Efektif & Keutuhan Subjek',
    questionType: 'MULTIPLE_CHOICE',
    text: `Perhatikan kalimat berikut:
"Berdasarkan hasil pemantauan stasiun geofisika menunjukkan bahwa peningkatan aktivitas seismik lokal tidak berpotensi menimbulkan gelombang tsunami."

Kalimat di atas **tidak efektif** karena kehilangan unsur subjek gramatikal. Perbaikan yang paling tepat agar kalimat tersebut menjadi kalimat baku dan efektif adalah ...`,
    explanation: `**Kunci Jawaban: E**

**Pembahasan:**
Kalimat tersebut tidak memiliki Subjek karena bagian awalnya diawali oleh preposisi "Berdasarkan..." yang menjadikannya frasa keterangan (K), kemudian langsung diikuti verba predikat transitif "menunjukkan" (P).
Struktur: K - P - O (tidak memiliki Subjek).
Untuk memperbaikinya:
- Hilangkan kata depan **Berdasarkan** pada awal kalimat.
- Dengan demikian, frasa "Hasil pemantauan stasiun geofisika" menjadi **Subjek (S)**, diikuti predikat **menunjukkan (P)**, dan anak kalimat objek **bahwa... (O)**.
Struktur kalimat menjadi S - P - O yang gramatikal dan efektif. (Opsi E).`,
    options: [
      { key: 'A', text: 'Menambahkan tanda koma setelah kata *geofisika*.', score: 0 },
      { key: 'B', text: 'Mengganti kata *menunjukkan* menjadi kata *ditunjukkan*.', score: 0 },
      { key: 'C', text: 'Mengganti kata *bahwa* dengan konjungsi *sehingga*.', score: 0 },
      { key: 'D', text: 'Menghilangkan frasa *tidak berpotensi*.', score: 0 },
      { key: 'E', text: 'Menghilangkan kata *Berdasarkan* pada awal kalimat.', score: 1 },
    ],
  },
  {
    orderNumber: 30,
    category: 'Pemahaman Bacaan & Menulis',
    subTopic: 'Ejaan Bahasa Indonesia (EYD V)',
    questionType: 'MULTIPLE_CHOICE',
    text: `Kalimat berikut yang menggunakan tanda baca sesuai dengan Pedoman Umum Ejaan Bahasa Indonesia (EYD Edisi V) adalah ...`,
    explanation: `**Kunci Jawaban: A**

**Pembahasan:**
Analisis kaidah tanda baca EYD V:
- **Opsi A** benar: Penulisan gelar kehormatan dan akademis (*Prof. Dr. Hendra Wijaya, M.Sc.*) menggunakan tanda titik dan koma yang tepat. Tanda titik koma (;) digunakan sebelum konjungsi antarkalimat penegas (*sementara itu*) untuk memisahkan dua klausa independen yang setara.
- Opsi B salah karena memadukan dua konjungsi pertentangan sekaligus (*Meskipun ... namun ...*), yang membuat kalimat kehilangan induk kalimat.
- Opsi C salah karena tanda titik dua (:) tidak boleh diletakkan langsung setelah kata *seperti*.
- Opsi D salah karena *diantaranya* seharusnya ditulis terpisah (*di antaranya*).
- Opsi E salah karena meletakkan tanda koma di antara predikat (*membawa*) dan objek langsung.`,
    options: [
      { key: 'A', text: 'Prof. Dr. Hendra Wijaya, M.Sc. meresmikan laboratorium bioteknologi; sementara itu, para peneliti mulai menyiapkan instrumen uji.', score: 1 },
      { key: 'B', text: 'Meskipun harga bahan bakar minyak nonsubsidi naik, namun volume konsumsi masyarakat di perkotaan tidak menurun.', score: 0 },
      { key: 'C', text: 'Ibu membeli peralatan dapur, seperti: wajan teflon, panci presto, dan spatula silikon.', score: 0 },
      { key: 'D', text: 'Konferensi itu dihadiri menteri-menteri negara anggota ASEAN, diantaranya: Indonesia, Malaysia, dan Singapura.', score: 0 },
      { key: 'E', text: 'Semua peserta ujian wajib membawa, kartu tanda peserta ujian dan kartu identitas kependudukan.', score: 0 },
    ],
  },
  {
    orderNumber: 31,
    category: 'Pemahaman Bacaan & Menulis',
    subTopic: 'Konjungsi Antarkalimat & Kohesi Teks',
    questionType: 'MULTIPLE_CHOICE',
    text: `Perhatikan dua kalimat berikut:
(1) Penerapan sistem tilang elektronik berbasis kamera cerdas telah terbukti menurunkan angka pelanggaran lalu lintas di jalan protokol hingga 35%.
(2) Masyarakat masih mengeluhkan lambatnya proses klarifikasi surat konfirmasi pelanggaran yang dikirimkan ke alamat domisili.

Konjungsi antarkalimat yang paling tepat untuk menghubungkan konteks kedua kalimat tersebut adalah ...`,
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Kalimat (1) menyampaikan capaian positif (keberhasilan menurunkan pelanggaran 35%).
Kalimat (2) menyampaikan permasalahan operasional yang kontras dari sudut pandang masyarakat (keluhan lambatnya klarifikasi).
Hubungan antarkedua kalimat adalah hubungan pertentangan/kontras (*adversatif*).
Konjungsi antarkalimat pertentangan yang baku menurut kaidah tata bahasa Indonesia adalah **Namun demikian,** atau **Akan tetapi,**.
Pilihan C (*Namun demikian,*) adalah pilihan yang paling tepat.`,
    options: [
      { key: 'A', text: 'Oleh karena itu,', score: 0 },
      { key: 'B', text: 'Akibatnya,', score: 0 },
      { key: 'C', text: 'Namun demikian,', score: 1 },
      { key: 'D', text: 'Selain itu,', score: 0 },
      { key: 'E', text: 'Dengan demikian,', score: 0 },
    ],
  },
  {
    orderNumber: 32,
    category: 'Pemahaman Bacaan & Menulis',
    subTopic: 'Kalimat Efektif & Kehematan Kata',
    questionType: 'MULTIPLE_CHOICE',
    text: `Perhatikan kalimat berikut:
"Para hadirin sekalian dimohon agar supaya dapat segera menempati tempat duduk yang telah disediakan oleh panitia."

Perbaikan yang paling tepat agar kalimat tersebut menjadi kalimat efektif dan hemat kata adalah ...`,
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Kalimat asli memuat redundansi jamak (*pleonasme*):
1. *Para hadirin sekalian*: kata *hadirin* sudah bermakna jamak (semua yang hadir). Menggabungkan kata *para* dan *sekalian* sekaligus adalah pemborosan kata.
2. *agar supaya dapat*: kata *agar* dan *supaya* bermakna sama, tidak boleh dipakai berurutan.
Perbaikan pada **Opsi B**: "Hadirin dimohon segera menempati tempat duduk yang telah disediakan panitia" mengeliminasi semua kemubaziran kata secara lugas, santun, dan gramatikal.`,
    options: [
      { key: 'A', text: 'Para hadirin dimohon supaya agar dapat segera menempati kursi yang disediakan panitia.', score: 0 },
      { key: 'B', text: 'Hadirin dimohon segera menempati tempat duduk yang telah disediakan panitia.', score: 1 },
      { key: 'C', text: 'Semua hadirin sekalian dipersilakan untuk menempati kursi yang telah panitia sediakan.', score: 0 },
      { key: 'D', text: 'Kepada hadirin sekalian diharapkan agar dapat menempati tempat duduk yang disediakan.', score: 0 },
      { key: 'E', text: 'Para hadirin semua dimohon agar dapat segera duduk di kursi masing-masing.', score: 0 },
    ],
  },
  {
    orderNumber: 33,
    category: 'Pemahaman Bacaan & Menulis',
    subTopic: 'Ejaan Huruf Kapital & Bentuk Terikat',
    questionType: 'MULTIPLE_CHOICE',
    text: `Penulisan huruf kapital dan kata bentukan yang **benar** menurut kaidah EYD Edisi V terdapat pada kalimat ...`,
    explanation: `**Kunci Jawaban: D**

**Pembahasan:**
Kaidah EYD V yang diuji:
1. Bentuk terikat *antar-* ditulis serangkai dengan kata yang mengikutinya: *antarkementerian* (bukan *antar kementerian* atau *antar-kementerian*).
2. Nama unsur geografi yang diikuti nama spesifik diri ditulis dengan huruf kapital: *Pulau Halmahera* (keduanya huruf kapital).
3. Nama zat atau komoditas umum seperti *nikel* ditulis dengan huruf kecil.
4. Kata serapan baku adalah *koordinasi* (bukan *kordinasi*).
Maka kalimat yang memenuhi seluruh kaidah tersebut dengan sempurna adalah pilihan **D**.`,
    options: [
      { key: 'A', text: 'Pada era globalisasi, koordinasi antar kementerian sangat krusial dalam mempercepat hilirisasi Nikel di pulau Halmahera.', score: 0 },
      { key: 'B', text: 'Pada era globalisasi, kordinasi antarkementerian sangat krusial dalam mempercepat hilirisasi nikel di Pulau halmahera.', score: 0 },
      { key: 'C', text: 'Pada Era Globalisasi, koordinasi antarkementerian sangat krusial dalam mempercepat hilirisasi nikel di pulau halmahera.', score: 0 },
      { key: 'D', text: 'Pada era globalisasi, koordinasi antarkementerian sangat krusial dalam mempercepat hilirisasi nikel di Pulau Halmahera.', score: 1 },
      { key: 'E', text: 'Pada era globalisasi, koordinasi antar kementerian sangat krusial dalam mempercepat hilirisasi Nikel di Pulau Halmahera.', score: 0 },
    ],
  },
  {
    orderNumber: 34,
    category: 'Pemahaman Bacaan & Menulis',
    subTopic: 'Sintaksis & Pola Kalimat Dasar',
    questionType: 'MULTIPLE_CHOICE',
    text: `Perhatikan kalimat berikut:
"Pemerintah meluncurkan program beasiswa riset terintegrasi bagi para ilmuwan muda."

Pola struktur kalimat di atas (S-P-O-K) memiliki susunan fungsi gramatikal yang sepadan dengan kalimat ...`,
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Bedah struktur kalimat acuan:
- Subjek (S): *Pemerintah*
- Predikat (P): *meluncurkan* (verba transitif aktif)
- Objek (O): *program beasiswa riset terintegrasi* (frasa nomina)
- Keterangan (K): *bagi para ilmuwan muda* (frasa preposisional peruntukan)
Pola: **S - P - O - K**.

Analisis kalimat pada **Opsi C**:
- Subjek (S): *Direktur*
- Predikat (P): *menandatangani* (verba transitif aktif)
- Objek (O): *dokumen kerja sama strategis* (frasa nomina)
- Keterangan (K): *di hadapan para notaris* (frasa preposisional tempat)
Pola sama persis: **S - P - O - K**.

Opsi lain:
- A: Para atlet (S) bertanding (P) dengan semangat (K) di arena (K) $\\rightarrow$ S-P-K-K (intransitif).
- B: Rumah megah itu (S) dibeli (P) oleh pengusaha (Pel/K) $\\rightarrow$ pasif.
- D: Mahasiswa (S) berdiskusi (P) tentang pemanasan global (Pel) kemarin (K).
- E: Guru (S) memberikan (P) siswa teladan (O) piagam (Pel) $\\rightarrow$ S-P-O-Pel.`,
    options: [
      { key: 'A', text: 'Para atlet nasional bertanding dengan penuh semangat di arena olimpiade.', score: 0 },
      { key: 'B', text: 'Rumah megah di tepi danau itu dibeli oleh seorang pengusaha properti terkemuka.', score: 0 },
      { key: 'C', text: 'Direktur menandatangani dokumen kerja sama strategis di hadapan para notaris.', score: 1 },
      { key: 'D', text: 'Mahasiswa berdiskusi tentang dampak pemanasan global kemarin sore di aula kampus.', score: 0 },
      { key: 'E', text: 'Guru memberikan siswa teladan piagam penghargaan bergengsi pada upacara bendera.', score: 0 },
    ],
  },
  {
    orderNumber: 35,
    category: 'Pemahaman Bacaan & Menulis',
    subTopic: 'Koherensi Paragraf & Kalimat Sumbang',
    questionType: 'MULTIPLE_CHOICE',
    text: `Perhatikan paragraf berikut:
(1) Terumbu karang memiliki peran ekologis krusial sebagai tempat pemijahan dan perlindungan bagi lebih dari 25% biota laut dunia.
(2) Struktur kalsium karbonat yang dibangun oleh koloni polip karang juga berfungsi sebagai benteng alami pemecah gelombang badai di kawasan pesisir.
(3) Banyak wisatawan asing menyukai suvenir perhiasan yang terbuat dari olahan cangkang kerang dan batuan karang langka.
(4) Namun, pemanasan suhu permukaan laut global telah memicu fenomena pemutihan karang (*coral bleaching*) secara massal di berbagai belahan samudra.
(5) Apabila pemanasan ini terus berlanjut tanpa mitigasi iklim, degradasi ekosistem terumbu karang akan mengancam ketahanan pangan jutaan masyarakat pesisir.

Kalimat yang **sumbang (tidak padu)** dan merusak koherensi paragraf di atas adalah kalimat nomor ...`,
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Paragraf tersebut membahas fungsi ekologis esensial dari terumbu karang (kalimat 1 dan 2) serta ancaman kehancuran terumbu karang akibat pemanasan suhu permukaan laut global yang mengancam ketahanan pangan (kalimat 4 dan 5).
Kalimat (3) yang membicarakan kesukaan wisatawan terhadap suvenir dari cangkang dan batuan karang menyimpang dari fokus topik konservasi ekologis dan tidak koheren dengan alur pikir paragraf.
Maka kalimat sumbang adalah kalimat nomor (3).`,
    options: [
      { key: 'A', text: '(1)', score: 0 },
      { key: 'B', text: '(2)', score: 0 },
      { key: 'C', text: '(3)', score: 1 },
      { key: 'D', text: '(4)', score: 0 },
      { key: 'E', text: '(5)', score: 0 },
    ],
  },

  // =========================================================================
  // SECTION 4: LITERASI MATEMATIKA (36 - 45)
  // =========================================================================
  {
    orderNumber: 36,
    category: 'Literasi Matematika',
    subTopic: 'Literasi Finansial & Bunga Majemuk',
    questionType: 'MULTIPLE_CHOICE',
    text: `Seorang wirausahawan muda menyimpan dana cadangan modal usaha sebesar $\\text{Rp}50.000.000,00$ di lembaga keuangan syariah dengan skema bagi hasil yang setara dengan suku bunga majemuk $6\\%$ per tahun, dengan periode pemajemukan setiap semester (setengah tahun sekali).
Rumus saldo simpanan setelah $t$ tahun dengan pemajemukan $n$ kali per tahun adalah:
$$M_t = M_0 \\left(1 + \\frac{i}{n}\\right)^{nt}$$
Berapakah total saldo dana modal kerja tersebut setelah disimpan selama 2 tahun? (Gunakan aproksimasi nilai $(1,03)^4 \\approx 1,1255$)`,
    explanation: `**Kunci Jawaban: E**

**Pembahasan:**
Identifikasi variabel:
- Saldo awal: $M_0 = \\text{Rp}50.000.000,00$
- Suku bunga per tahun: $i = 6\\% = 0,06$
- Pemajemukan per semester: $n = 2$ kali setahun
- Jangka waktu: $t = 2$ tahun
- Banyak periode pemajemukan: $nt = 2 \\times 2 = 4$ periode

Suku bunga per semester:
$$\\frac{i}{n} = \\frac{0,06}{2} = 0,03$$

Saldo setelah 2 tahun:
$$M_2 = 50.000.000 \\times (1 + 0,03)^4 = 50.000.000 \\times (1,03)^4$$
Substitusi nilai taksiran $(1,03)^4 \\approx 1,1255$:
$$M_2 = 50.000.000 \\times 1,1255 = \\text{Rp}56.275.000,00$$

Jadi total saldo tabungan modal kerja adalah **Rp56.275.000,00**.`,
    options: [
      { key: 'A', text: 'Rp53.000.000,00', score: 0 },
      { key: 'B', text: 'Rp55.000.000,00', score: 0 },
      { key: 'C', text: 'Rp57.450.000,00', score: 0 },
      { key: 'D', text: 'Rp58.125.000,00', score: 0 },
      { key: 'E', text: 'Rp56.275.000,00', score: 1 },
    ],
  },
  {
    orderNumber: 37,
    category: 'Literasi Matematika',
    subTopic: 'Konsumsi Energi & Pemodelan Tarif',
    questionType: 'MULTIPLE_CHOICE',
    text: `Sebuah ruang kerja bersama (*coworking space*) menggunakan beberapa peralatan elektronik setiap hari dengan rincian:
- 4 unit pendingin ruangan (AC) masing-masing berdaya $750\\text{ Watt}$ menyala 10 jam per hari.
- 15 unit komputer kerja masing-masing berdaya $150\\text{ Watt}$ menyala 8 jam per hari.
- 10 unit lampu penerangan LED masing-masing berdaya $20\\text{ Watt}$ menyala 12 jam per hari.

Jika tarif listrik PLN golongan komersial non-subsidi adalah $\\text{Rp}1.500,00$ per $\\text{kWh}$ ($1\\text{ kWh} = 1.000\\text{ Watt-jam}$), berapakah total biaya pemakaian listrik selama 30 hari?`,
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Hitung konsumsi energi harian masing-masing peralatan:
1. AC:
   $$E_{\\text{AC}} = 4 \\times 750\\text{ W} \\times 10\\text{ jam} = 30.000\\text{ Wh} = 30\\text{ kWh}$$
2. Komputer:
   $$E_{\\text{komp}} = 15 \\times 150\\text{ W} \\times 8\\text{ jam} = 18.000\\text{ Wh} = 18\\text{ kWh}$$
3. Lampu LED:
   $$E_{\\text{lampu}} = 10 \\times 20\\text{ W} \\times 12\\text{ jam} = 2.400\\text{ Wh} = 2,4\\text{ kWh}$$

Total energi per hari:
$$E_{\\text{total/hari}} = 30 + 18 + 2,4 = 50,4\\text{ kWh}$$

Total energi selama 30 hari:
$$E_{30} = 50,4 \\times 30 = 1.512\\text{ kWh}$$

Total biaya listrik selama 30 hari:
$$\\text{Biaya} = 1.512\\text{ kWh} \\times \\text{Rp}1.500,00/\\text{kWh} = \\text{Rp}2.268.000,00$$`,
    options: [
      { key: 'A', text: 'Rp1.980.000,00', score: 0 },
      { key: 'B', text: 'Rp2.268.000,00', score: 1 },
      { key: 'C', text: 'Rp2.450.000,00', score: 0 },
      { key: 'D', text: 'Rp2.700.000,00', score: 0 },
      { key: 'E', text: 'Rp3.120.000,00', score: 0 },
    ],
  },
  {
    orderNumber: 38,
    category: 'Literasi Matematika',
    subTopic: 'Pertumbuhan Eksponensial Mikroorganisme',
    questionType: 'MULTIPLE_CHOICE',
    text: `Dalam sebuah eksperimen laboratorium biologi, populasi bakteri *Salmonella* dalam media nutrisi berlipat ganda (*doubling*) setiap 40 menit sekali.
Jika pada pukul 08.00 terdapat 200 sel bakteri pada cawan petri, berapakah jumlah estimasi populasi bakteri tersebut pada pukul 12.00 di hari yang sama, dengan asumsi nutrisi dan ruang tidak terbatas?`,
    explanation: `**Kunci Jawaban: D**

**Pembahasan:**
1. Hitung durasi waktu pengamatan:
   Dari pukul 08.00 sampai 12.00 adalah 4 jam:
   $$\\Delta t = 4 \\times 60 = 240\\text{ menit}$$
2. Karena bakteri membelah setiap 40 menit, banyak siklus pembelahan adalah:
   $$n = \\frac{240}{40} = 6\\text{ kali}$$
3. Rumus pertumbuhan eksponensial pembelahan:
   $$N(t) = N_0 \\cdot 2^n$$
   $$N(240) = 200 \\cdot 2^6 = 200 \\cdot 64 = 12.800\\text{ sel bakteri}$$

Jadi jumlah populasi bakteri pada pukul 12.00 adalah **12.800 sel**.`,
    options: [
      { key: 'A', text: '6.400 sel', score: 0 },
      { key: 'B', text: '9.600 sel', score: 0 },
      { key: 'C', text: '16.000 sel', score: 0 },
      { key: 'D', text: '12.800 sel', score: 1 },
      { key: 'E', text: '25.600 sel', score: 0 },
    ],
  },
  {
    orderNumber: 39,
    category: 'Literasi Matematika',
    subTopic: 'Optimalisasi Transportasi & Bahan Bakar',
    questionType: 'MULTIPLE_CHOICE',
    text: `Sebuah armada truk ekspres menempuh rute pengiriman logistik antarkota sejauh $360\\text{ km}$.
- Pada rute jalan tol datar sejauh $240\\text{ km}$, truk melaju dengan kecepatan rata-rata $80\\text{ km/jam}$ dengan efisiensi bahan bakar $8\\text{ km/liter}$.
- Pada sisa rute perbukitan sejauh $120\\text{ km}$, truk melaju dengan kecepatan rata-rata $40\\text{ km/jam}$ dengan efisiensi bahan bakar $5\\text{ km/liter}$.

Jika harga solar industri adalah $\\text{Rp}14.000,00$ per liter, berapakah total biaya bahan bakar dan total waktu tempuh perjalanan truk tersebut?`,
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
1. **Waktu tempuh:**
   - Bagian 1: $t_1 = \\frac{240\\text{ km}}{80\\text{ km/jam}} = 3\\text{ jam}$
   - Bagian 2: $t_2 = \\frac{120\\text{ km}}{40\\text{ km/jam}} = 3\\text{ jam}$
   - Total waktu tempuh $= 3 + 3 = 6\\text{ jam}$.

2. **Konsumsi solar:**
   - Bagian 1: $V_1 = \\frac{240\\text{ km}}{8\\text{ km/liter}} = 30\\text{ liter}$
   - Bagian 2: $V_2 = \\frac{120\\text{ km}}{5\\text{ km/liter}} = 24\\text{ liter}$
   - Total volume solar $= 30 + 24 = 54\\text{ liter}$.

3. **Total biaya bahan bakar:**
   $$\\text{Biaya} = 54\\text{ liter} \\times \\text{Rp}14.000,00/\\text{liter} = \\text{Rp}756.000,00$$

Jadi total biaya bahan bakar adalah **Rp756.000,00** dan total waktu tempuh adalah **6 jam**.`,
    options: [
      { key: 'A', text: 'Rp720.000,00 dan 5,5 jam', score: 0 },
      { key: 'B', text: 'Rp690.000,00 dan 5 jam', score: 0 },
      { key: 'C', text: 'Rp756.000,00 dan 6 jam', score: 1 },
      { key: 'D', text: 'Rp810.000,00 dan 6,5 jam', score: 0 },
      { key: 'E', text: 'Rp840.000,00 dan 6 jam', score: 0 },
    ],
  },
  {
    orderNumber: 40,
    category: 'Literasi Matematika',
    subTopic: 'Geometri Ruang & Luas Permukaan Tandon',
    questionType: 'MULTIPLE_CHOICE',
    text: `Sebuah tandon penampungan air bersih berbentuk tabung (silinder) tegak tanpa tutup memiliki jari-jari alas $r = 1\\text{ meter}$ dan tinggi $t = 3,5\\text{ meter}$.
Seluruh permukaan bagian dalam tandon (alas dan dinding selimut bagian dalam) akan dilapisi cairan pelapis anti-bocor (*waterproofing*).
Berapakah luas permukaan bagian dalam tandon yang harus dilapisi cat? (Gunakan $\\pi \\approx \\frac{22}{7}$)`,
    explanation: `**Kunci Jawaban: A**

**Pembahasan:**
Karena tandon berbentuk tabung **tanpa tutup**, maka luas permukaan bagian dalam terdiri dari 1 luas alas lingkaran ditambah luas selimut tabung:
$$L = L_{\\text{alas}} + L_{\\text{selimut}} = \\pi r^2 + 2\\pi r t = \\pi r (r + 2t)$$

Substitusikan nilai $r = 1\\text{ m}$, $t = 3,5\\text{ m}$, dan $\\pi = \\frac{22}{7}$:
$$L = \\frac{22}{7} \\times 1 \\times (1 + 2(3,5))$$
$$L = \\frac{22}{7} \\times (1 + 7) = \\frac{22}{7} \\times 8 = \\frac{176}{7} \\approx 25,14\\text{ m}^2$$
Jadi luas permukaan bagian dalam tandon yang dilapisi adalah $\\approx 25,14\\text{ m}^2$.`,
    options: [
      { key: 'A', text: '$25,14\\text{ m}^2$', score: 1 },
      { key: 'B', text: '$22,00\\text{ m}^2$', score: 0 },
      { key: 'C', text: '$28,28\\text{ m}^2$', score: 0 },
      { key: 'D', text: '$31,42\\text{ m}^2$', score: 0 },
      { key: 'E', text: '$18,85\\text{ m}^2$', score: 0 },
    ],
  },
  {
    orderNumber: 41,
    category: 'Literasi Matematika',
    subTopic: 'Aritmetika Sosial & Skema Diskon',
    questionType: 'MULTIPLE_CHOICE',
    text: `Sebuah toko elektronik memberikan penawaran diskon bertingkat untuk sebuah tablet pintar seharga $\\text{Rp}4.000.000,00$: diskon pertama sebesar $20\\%$, dan bagi pembayaran tunai diberikan diskon tambahan sebesar $10\\%$ dari harga setelah diskon pertama.
Sementara itu, sebuah gerai lain menjual tablet pintar yang sama dengan harga awal $\\text{Rp}4.000.000,00$ berdiskon tunggal langsung sebesar $28\\%$.

Berapakah selisih harga akhir yang harus dibayarkan pembeli antara kedua skema penawaran promosi tersebut?`,
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Mari hitung harga akhir pada masing-masing gerai:

1. **Skema Toko Elektronik (Diskon Bertingkat $20\\% + 10\\%$):**
   - Harga setelah diskon $20\\%$:
     $$\\text{Rp}4.000.000 \\times (1 - 0,20) = \\text{Rp}4.000.000 \\times 0,80 = \\text{Rp}3.200.000,00$$
   - Harga setelah diskon tambahan $10\\%$ dari harga baru:
     $$\\text{Rp}3.200.000 \\times (1 - 0,10) = \\text{Rp}3.200.000 \\times 0,90 = \\text{Rp}2.880.000,00$$
   (Faktor pengali total: $0,80 \\times 0,90 = 0,72$, yang setara dengan potongan $28\\%$).

2. **Skema Gerai Kedua (Diskon Tunggal Langsung $28\\%$):**
   - Harga akhir:
     $$\\text{Rp}4.000.000 \\times (1 - 0,28) = \\text{Rp}4.000.000 \\times 0,72 = \\text{Rp}2.880.000,00$$

Selisih harga:
$$\\text{Selisih} = \\text{Rp}2.880.000 - \\text{Rp}2.880.000 = \\text{Rp}0,00$$
Kedua skema promosi menghasilkan nominal harga akhir yang persis sama.`,
    options: [
      { key: 'A', text: 'Rp40.000,00 lebih murah skema diskon tunggal', score: 0 },
      { key: 'B', text: 'Rp0,00 (kedua skema menghasilkan harga akhir yang persis sama)', score: 1 },
      { key: 'C', text: 'Rp80.000,00 lebih murah skema diskon bertingkat', score: 0 },
      { key: 'D', text: 'Rp50.000,00 lebih murah skema diskon bertingkat', score: 0 },
      { key: 'E', text: 'Rp30.000,00 lebih murah skema diskon tunggal', score: 0 },
    ],
  },
  {
    orderNumber: 42,
    category: 'Literasi Matematika',
    subTopic: 'Metode Sampling Tangkap Ulang (Lincoln-Petersen)',
    questionType: 'MULTIPLE_CHOICE',
    text: `Sekelompok peneliti konservasi alam memperkirakan populasi ikan endemik di sebuah danau menggunakan metode *capture-mark-recapture*:
1. Pada tahap pertama, peneliti menangkap 240 ekor ikan, memberi tanda (*tag*) khusus tahan air pada siripnya, lalu melepaskannya kembali ke danau.
2. Dua minggu kemudian, peneliti menjaring 300 ekor ikan dari danau yang sama. Dari 300 ekor tersebut, ditemukan 36 ekor ikan yang memiliki tanda khusus.

Dengan asumsi populasi ikan tertutup (tidak ada angka kelahiran, kematian, atau migrasi yang signifikan), estimasi total populasi ikan di danau tersebut adalah ...`,
    explanation: `**Kunci Jawaban: D**

**Pembahasan:**
Metode estimasi Lincoln-Petersen menggunakan rasio kesebandingan proporsi:
$$\\frac{M}{N} = \\frac{R}{C}$$
Keterangan:
- $N$ = estimasi jumlah total populasi ikan di danau
- $M$ = jumlah ikan yang ditandai pada penangkapan pertama ($M = 240$)
- $C$ = jumlah total ikan yang terjaring pada penangkapan kedua ($C = 300$)
- $R$ = jumlah ikan bertanda yang tertangkap kembali ($R = 36$)

Maka:
$$\\frac{240}{N} = \\frac{36}{300}$$
$$N = \\frac{240 \\times 300}{36} = \\frac{72.000}{36} = 2.000\\text{ ekor}$$

Jadi perkiraan total populasi ikan endemik di danau tersebut adalah **2.000 ekor**.`,
    options: [
      { key: 'A', text: '1.600 ekor', score: 0 },
      { key: 'B', text: '1.800 ekor', score: 0 },
      { key: 'C', text: '2.400 ekor', score: 0 },
      { key: 'D', text: '2.000 ekor', score: 1 },
      { key: 'E', text: '2.200 ekor', score: 0 },
    ],
  },
  {
    orderNumber: 43,
    category: 'Literasi Matematika',
    subTopic: 'Fisika Matematis & Pemuaian Termal',
    questionType: 'MULTIPLE_CHOICE',
    text: `Sebuah rel kereta api baja dipasang saat malam hari ketika suhu lingkungan $20^\\circ\\text{C}$ dengan panjang masing-masing segmen rel tepat $25\\text{ meter}$.
Koefisien muai panjang baja rel adalah $\\alpha = 1,2 \\times 10^{-5}\\text{ /}^\\circ\\text{C}$.
Pada siang hari terik, suhu permukaan batang rel dapat meningkat drastis hingga mencapai $50^\\circ\\text{C}$.
Rumus pertambahan panjang akibat pemuaian termal adalah:
$$\\Delta L = L_0 \\cdot \\alpha \\cdot \\Delta T$$
Berapakah lebar celah minimum yang harus disisakan di antara dua segmen rel bertetangga agar rel tidak saling mendesak dan membengkok?`,
    explanation: `**Kunci Jawaban: E**

**Pembahasan:**
Identifikasi parameter:
- Panjang awal: $L_0 = 25\\text{ m} = 25.000\\text{ mm}$
- Suhu awal: $T_1 = 20^\\circ\\text{C}$
- Suhu puncak: $T_2 = 50^\\circ\\text{C} \\implies \\Delta T = 50 - 20 = 30^\\circ\\text{C}$
- Koefisien muai panjang: $\\alpha = 1,2 \\times 10^{-5}\\text{ /}^\\circ\\text{C}$

Pertambahan panjang rel ($\Delta L$):
$$\\Delta L = L_0 \\cdot \\alpha \\cdot \\Delta T$$
$$\\Delta L = 25.000\\text{ mm} \\times (1,2 \\times 10^{-5}) \\times 30$$
$$\\Delta L = 25.000 \\times 3,6 \\times 10^{-4} = 25 \\times 0,36 = 9\\text{ mm}$$

Jadi celah minimum pemuaian yang harus disediakan adalah **9 mm**.`,
    options: [
      { key: 'A', text: '$6\\text{ mm}$', score: 0 },
      { key: 'B', text: '$7,5\\text{ mm}$', score: 0 },
      { key: 'C', text: '$12\\text{ mm}$', score: 0 },
      { key: 'D', text: '$15\\text{ mm}$', score: 0 },
      { key: 'E', text: '$9\\text{ mm}$', score: 1 },
    ],
  },
  {
    orderNumber: 44,
    category: 'Literasi Matematika',
    subTopic: 'Dinamika Fluida & Debit Air Pertanian',
    questionType: 'MULTIPLE_CHOICE',
    text: `Saluran irigasi primer persawahan memiliki penampang trapesium dengan lebar dasar $b = 2\\text{ m}$, lebar permukaan atas $B = 4\\text{ m}$, dan kedalaman air $h = 1,5\\text{ m}$. Air mengalir dengan kecepatan rata-rata $v = 0,8\\text{ m/detik}$.
Debit aliran air dirumuskan sebagai:
$$Q = A \\cdot v$$
dengan $A$ adalah luas penampang basah saluran.
Berapa liter air yang dialirkan oleh saluran irigasi tersebut ke area persawahan setiap menitnya? ($1\\text{ m}^3 = 1.000\\text{ liter}$)`,
    explanation: `**Kunci Jawaban: A**

**Pembahasan:**
1. Hitung luas penampang trapesium ($A$):
   $$A = \\frac{b + B}{2} \\times h = \\frac{2 + 4}{2} \\times 1,5 = 3 \\times 1,5 = 4,5\\text{ m}^2$$
2. Hitung debit air per detik ($Q$):
   $$Q = A \\cdot v = 4,5\\text{ m}^2 \\times 0,8\\text{ m/detik} = 3,6\\text{ m}^3/\\text{detik}$$
3. Hitung volume air yang dialirkan per menit ($60\\text{ detik}$):
   $$V_{\\text{menit}} = 3,6\\text{ m}^3/\\text{detik} \\times 60\\text{ detik} = 216\\text{ m}^3$$
4. Konversi meter kubik ke liter:
   $$216\\text{ m}^3 \\times 1.000\\text{ liter/m}^3 = 216.000\\text{ liter/menit}$$

Jadi debit aliran air ke persawahan adalah **216.000 liter per menit**.`,
    options: [
      { key: 'A', text: '216.000 liter/menit', score: 1 },
      { key: 'B', text: '180.000 liter/menit', score: 0 },
      { key: 'C', text: '240.000 liter/menit', score: 0 },
      { key: 'D', text: '288.000 liter/menit', score: 0 },
      { key: 'E', text: '144.000 liter/menit', score: 0 },
    ],
  },
  {
    orderNumber: 45,
    category: 'Literasi Matematika',
    subTopic: 'Analisis Titik Impas (Break-Even Point)',
    questionType: 'MULTIPLE_CHOICE',
    text: `Sebuah kedai kopi artisan memiliki beban biaya tetap (*fixed cost*) bulanan sebesar $\\text{Rp}18.000.000,00$ untuk sewa tempat dan gaji karyawan.
Biaya variabel (*variable cost*) untuk bahan baku per cangkir kopi adalah $\\text{Rp}8.000,00$, dan harga jual rata-rata per cangkir kopi adalah $\\text{Rp}20.000,00$.

Berapa cangkir kopi minimal yang harus terjual dalam sebulan agar kedai kopi mencapai titik impas (*break-even point*), serta berapa cangkir yang harus terjual jika kedai menargetkan laba bersih bulanan sebesar $\\text{Rp}12.000.000,00$?`,
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
1. Hitung margin kontribusi (*contribution margin*) per cangkir:
   $$CM = \\text{Harga Jual} - \\text{Biaya Variabel} = 20.000 - 8.000 = \\text{Rp}12.000,00/\\text{cangkir}$$
2. Hitung kuantitas titik impas (BEP):
   $$Q_{\\text{BEP}} = \\frac{\\text{Biaya Tetap}}{CM} = \\frac{18.000.000}{12.000} = 1.500\\text{ cangkir}$$
3. Hitung kuantitas untuk mencapai target laba $\\text{Rp}12.000.000,00$:
   $$Q_{\\text{target}} = \\frac{\\text{Biaya Tetap} + \\text{Target Laba}}{CM} = \\frac{18.000.000 + 12.000.000}{12.000} = \\frac{30.000.000}{12.000} = 2.500\\text{ cangkir}$$

Jadi, kedai harus menjual minimal **1.500 cangkir** untuk mencapai BEP dan **2.500 cangkir** untuk meraih laba bersih Rp12.000.000,00.`,
    options: [
      { key: 'A', text: '1.200 cangkir untuk titik impas dan 2.000 cangkir untuk target laba', score: 0 },
      { key: 'B', text: '1.500 cangkir untuk titik impas dan 2.500 cangkir untuk target laba', score: 1 },
      { key: 'C', text: '1.500 cangkir untuk titik impas dan 2.200 cangkir untuk target laba', score: 0 },
      { key: 'D', text: '1.800 cangkir untuk titik impas dan 3.000 cangkir untuk target laba', score: 0 },
      { key: 'E', text: '1.000 cangkir untuk titik impas dan 2.500 cangkir untuk target laba', score: 0 },
    ],
  },
];

export async function seedUtbkSnbt(prisma: PrismaClient) {
  console.log('🚀 Memulai Seeding Paket UTBK-SNBT 2026/2027...');

  // 1. Passing Grade Profile untuk UTBK
  const pgUtbk = await prisma.passingGradeProfile.upsert({
    where: { id: 'pg-utbk-snbt' },
    update: {},
    create: {
      id: 'pg-utbk-snbt',
      name: 'Ambang Batas & Target UTBK-SNBT 2026',
      minTWK: 0,
      minTIU: 0,
      minTKP: 0,
      rules: {
        minScore: 28,
        totalQuestions: 45,
        targetPassingPercentile: 75,
      },
    },
  });
  console.log(`✅ Passing Grade Profile siap: ${pgUtbk.name}`);

  // 2. Package: Mastery UTBK-SNBT 2026/2027: TPS & Literasi Penalaran
  const pkgUtbk = await prisma.package.upsert({
    where: { slug: 'utbk-snbt-2026-mastery' },
    update: {
      title: 'Mastery UTBK-SNBT 2026/2027: TPS & Literasi Penalaran',
      examType: 'UTBK_SNBT',
      price: 35000,
      promoPrice: 25000,
      isFree: false,
      isActive: true,
      description:
        'Paket komprehensif simulasi UTBK-SNBT 2026/2027 terlengkap mencakup Tes Potensi Skolastik (TPS): Penalaran Umum (10 soal), Pengetahuan Kuantitatif (15 soal dengan formula KaTeX), Pemahaman Bacaan & Menulis (10 soal), dan Literasi Matematika (10 soal) disertai kunci jawaban dan pembahasan analitis mendalam.',
    },
    create: {
      title: 'Mastery UTBK-SNBT 2026/2027: TPS & Literasi Penalaran',
      slug: 'utbk-snbt-2026-mastery',
      examType: 'UTBK_SNBT',
      price: 35000,
      promoPrice: 25000,
      isFree: false,
      isActive: true,
      description:
        'Paket komprehensif simulasi UTBK-SNBT 2026/2027 terlengkap mencakup Tes Potensi Skolastik (TPS): Penalaran Umum (10 soal), Pengetahuan Kuantitatif (15 soal dengan formula KaTeX), Pemahaman Bacaan & Menulis (10 soal), dan Literasi Matematika (10 soal) disertai kunci jawaban dan pembahasan analitis mendalam.',
    },
  });
  console.log(`✅ Package siap: ${pkgUtbk.title} (${pkgUtbk.slug})`);

  // 3. Tryout: Simulasi Akbar UTBK-SNBT 2026/2027
  const tryoutUtbk = await prisma.tryout.upsert({
    where: { id: 'tryout-utbk-snbt-2026' },
    update: {
      packageId: pkgUtbk.id,
      passingGradeProfileId: pgUtbk.id,
      title: 'Tryout Akbar UTBK-SNBT 2026/2027 (TPS & Literasi)',
      examType: 'UTBK_SNBT',
      durationMinutes: 75,
      totalQuestions: 45,
      subtestConfig: {
        'Penalaran Umum': { total: 10, maxScore: 10 },
        'Pengetahuan Kuantitatif': { total: 15, maxScore: 15 },
        'Pemahaman Bacaan & Menulis': { total: 10, maxScore: 10 },
        'Literasi Matematika': { total: 10, maxScore: 10 },
      },
      scoringScheme: {
        type: 'STANDARD',
        correct: 1,
        wrong: 0,
        empty: 0,
      },
      isActive: true,
    },
    create: {
      id: 'tryout-utbk-snbt-2026',
      packageId: pkgUtbk.id,
      passingGradeProfileId: pgUtbk.id,
      title: 'Tryout Akbar UTBK-SNBT 2026/2027 (TPS & Literasi)',
      examType: 'UTBK_SNBT',
      durationMinutes: 75,
      totalQuestions: 45,
      subtestConfig: {
        'Penalaran Umum': { total: 10, maxScore: 10 },
        'Pengetahuan Kuantitatif': { total: 15, maxScore: 15 },
        'Pemahaman Bacaan & Menulis': { total: 10, maxScore: 10 },
        'Literasi Matematika': { total: 10, maxScore: 10 },
      },
      scoringScheme: {
        type: 'STANDARD',
        correct: 1,
        wrong: 0,
        empty: 0,
      },
      isActive: true,
    },
  });
  console.log(`✅ Tryout siap: ${tryoutUtbk.title}`);

  // 4. Seed Questions and Options
  console.log(`📝 Memasukkan ${utbkQuestions.length} butir soal UTBK-SNBT...`);

  for (const q of utbkQuestions) {
    const question = await prisma.question.upsert({
      where: {
        tryoutId_orderNumber: {
          tryoutId: tryoutUtbk.id,
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
        tryoutId: tryoutUtbk.id,
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
  }

  // 5. Verification
  const questionCount = await prisma.question.count({
    where: { tryoutId: tryoutUtbk.id },
  });
  const optionCount = await prisma.option.count({
    where: { question: { tryoutId: tryoutUtbk.id } },
  });

  console.log(`🎉 Seeding UTBK-SNBT Selesai!`);
  console.log(`📊 Statistik: ${questionCount} Soal, ${optionCount} Opsi Jawaban (5 opsi per soal).`);

  if (questionCount !== 45 || optionCount !== 225) {
    throw new Error(`Integritas data tidak valid: diharapkan 45 soal dan 225 opsi, ditemukan ${questionCount} soal dan ${optionCount} opsi.`);
  }

  return { package: pkgUtbk, tryout: tryoutUtbk, questionCount, optionCount };
}

// Standalone execution support
if (process.argv[1]?.includes('seed-utbk-snbt')) {
  const prisma = new PrismaClient();
  seedUtbkSnbt(prisma)
    .catch((e) => {
      console.error('❌ Gagal menjalankan seed UTBK-SNBT:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
