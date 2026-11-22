import { SeedQuestion } from './data-skd2-twk';

export const tiuQuestionsPaket2: SeedQuestion[] = [
  // ==========================================
  // ANALOGI KATA (Soal 31 - 35)
  // ==========================================
  {
    orderNumber: 31,
    category: 'TIU',
    subTopic: 'Analogi Kata',
    text: 'GRASI : HUKUMAN PIDANA = REHABILITASI : ...',
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Hubungan analogi: *Tindakan hukum berupa pengampunan/pemulihan terhadap objek hukum tertentu.*
- **Grasi** adalah tindakan pengampunan atau pengurangan **hukuman pidana** yang diberikan oleh Presiden.
- **Rehabilitasi** adalah tindakan pemulihan hak seseorang dalam hal kemampuan, kedudukan, harkat serta martabatnya atau pemulihan **nama baik** yang diberikan oleh Presiden.

Dengan demikian, analogi yang sepadan adalah **REHABILITASI : NAMA BAIK**.`,
    options: [
      { key: 'A', text: 'Tuntutan ganti rugi perdata', score: 0 },
      { key: 'B', text: 'Status kewarganegaraan asing', score: 0 },
      { key: 'C', text: 'Nama baik dan kehormatan', score: 5 },
      { key: 'D', text: 'Penyitaan barang bukti sitaan', score: 0 },
      { key: 'E', text: 'Penangguhan penahanan rutan', score: 0 },
    ],
  },
  {
    orderNumber: 32,
    category: 'TIU',
    subTopic: 'Analogi Kata',
    text: 'KERINGAT : OLAHRAGA = ABU : ...',
    explanation: `**Kunci Jawaban: D**

**Pembahasan:**
Hubungan analogi: *Hasil sisa/efek fisik materi yang timbul akibat suatu proses aktivitas.*
- **Keringat** dihasilkan dari proses ber-**olahraga**.
- **Abu** dihasilkan dari proses **pembakaran**.

Oleh karena itu, pasangan kata yang paling analogis adalah **ABU : PEMBAKARAN**.`,
    options: [
      { key: 'A', text: 'Puntung rokok', score: 0 },
      { key: 'B', text: 'Hutan lindung', score: 0 },
      { key: 'C', text: 'Arang kayu', score: 0 },
      { key: 'D', text: 'Pembakaran', score: 5 },
      { key: 'E', text: 'Asap tebal', score: 0 },
    ],
  },
  {
    orderNumber: 33,
    category: 'TIU',
    subTopic: 'Analogi Kata',
    text: 'GANDUM : ROTI = BENANG : ...',
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Hubungan analogi: *Bahan baku utama alami dan produk jadi hasil olahannya.*
- **Gandum** diolah menjadi **roti**.
- **Benang** ditenun/diolah menjadi **kain**.

Maka pasangan kata yang tepat adalah **BENANG : KAIN**.`,
    options: [
      { key: 'A', text: 'Jarum jahit', score: 0 },
      { key: 'B', text: 'Kain', score: 5 },
      { key: 'C', text: 'Kapas putih', score: 0 },
      { key: 'D', text: 'Mesin bordir', score: 0 },
      { key: 'E', text: 'Pola baju', score: 0 },
    ],
  },
  {
    orderNumber: 34,
    category: 'TIU',
    subTopic: 'Analogi Kata',
    text: 'KULMINASI : PUNCAK = DEGRADASI : ...',
    explanation: `**Kunci Jawaban: E**

**Pembahasan:**
Hubungan analogi: *Pasangan sinonim kata (padanan makna istilah).*
- **Kulminasi** bersinonim dengan **Puncak** (tingkat tertinggi).
- **Degradasi** bersinonim dengan **Kemerosotan** atau penurunan mutu/pangkat.

Opsi yang tepat adalah **KEMEROSOTAN**.`,
    options: [
      { key: 'A', text: 'Pertumbuhan', score: 0 },
      { key: 'B', text: 'Penggabungan', score: 0 },
      { key: 'C', text: 'Pemulihan', score: 0 },
      { key: 'D', text: 'Pelepasan', score: 0 },
      { key: 'E', text: 'Kemerosotan', score: 5 },
    ],
  },
  {
    orderNumber: 35,
    category: 'TIU',
    subTopic: 'Analogi Kata',
    text: 'BAROMETER : TEKANAN UDARA = HIGROMETER : ...',
    explanation: `**Kunci Jawaban: A**

**Pembahasan:**
Hubungan analogi: *Nama alat ukur dan besaran fisika yang diukurnya.*
- **Barometer** adalah alat untuk mengukur **tekanan udara**.
- **Higrometer** adalah alat untuk mengukur **kelembapan udara**.

Pasangan yang tepat adalah **KELEMBAPAN**.`,
    options: [
      { key: 'A', text: 'Kelembapan udara', score: 5 },
      { key: 'B', text: 'Suhu lingkungan', score: 0 },
      { key: 'C', text: 'Kecepatan angin', score: 0 },
      { key: 'D', text: 'Curah hujan harian', score: 0 },
      { key: 'E', text: 'Intensitas cahaya matahari', score: 0 },
    ],
  },

  // ==========================================
  // SILOGISME / PENARIKAN KESIMPULAN (Soal 36 - 40)
  // ==========================================
  {
    orderNumber: 36,
    category: 'TIU',
    subTopic: 'Silogisme Logika',
    text: `Semua analis data menguasai bahasa pemrograman Python.
Beberapa auditor internal instansi X adalah analis data.

Kesimpulan yang sah dan logis adalah...`,
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Premis 1: Semua analis data (A) menguasai Python (B). ($A \\subset B$)
Premis 2: Beberapa auditor internal (C) adalah analis data (A). ($C \\cap A \\neq \\emptyset$)

Penarikan kesimpulan silogisme kategori (Barbara/Darii):
Jika sebagian C adalah A, dan seluruh A adalah B, maka pasti sebagian C adalah B.
Artinya: **Beberapa auditor internal instansi X menguasai bahasa pemrograman Python.**`,
    options: [
      { key: 'A', text: 'Semua auditor internal instansi X menguasai bahasa pemrograman Python', score: 0 },
      { key: 'B', text: 'Semua yang menguasai bahasa pemrograman Python adalah auditor internal instansi X', score: 0 },
      { key: 'C', text: 'Beberapa auditor internal instansi X menguasai bahasa pemrograman Python', score: 5 },
      { key: 'D', text: 'Tidak ada auditor internal instansi X yang menguasai bahasa pemrograman Python', score: 0 },
      { key: 'E', text: 'Sebagian analis data bukan merupakan auditor internal instansi X', score: 0 },
    ],
  },
  {
    orderNumber: 37,
    category: 'TIU',
    subTopic: 'Silogisme Logika',
    text: `Jika suatu wilayah berstatus siaga satu bencana banjir, posko tanggap darurat wajib beroperasi penuh selama 24 jam.
Hari ini posko tanggap darurat di Wilayah Makmur tidak beroperasi penuh selama 24 jam.

Kesimpulan yang benar adalah...`,
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Pernyataan logika berformat implikasi: $p \\implies q$
Premis 1: Wilayah berstatus siaga satu banjir ($p$) $\\implies$ posko wajib beroperasi 24 jam ($q$).
Premis 2: Posko di Wilayah Makmur tidak beroperasi 24 jam ($\\sim q$).

Berdasarkan aturan penarikan kesimpulan **Modus Tollens**:
$$\\frac{p \\implies q, \\quad \\sim q}{\\therefore \\sim p}$$
Kesimpulan: **Wilayah Makmur tidak berstatus siaga satu bencana banjir.**`,
    options: [
      { key: 'A', text: 'Wilayah Makmur mengalami musibah banjir bandang', score: 0 },
      { key: 'B', text: 'Wilayah Makmur tidak berstatus siaga satu bencana banjir', score: 5 },
      { key: 'C', text: 'Petugas posko tanggap darurat di Wilayah Makmur melanggar aturan dinas', score: 0 },
      { key: 'D', text: 'Posko tanggap darurat Wilayah Makmur kekurangan pasokan logistik bantuan', score: 0 },
      { key: 'E', text: 'Wilayah Makmur sedang bersiap menaikkan status menjadi darurat militer', score: 0 },
    ],
  },
  {
    orderNumber: 38,
    category: 'TIU',
    subTopic: 'Silogisme Logika',
    text: `Semua barang yang diimpor secara resmi melalui pelabuhan memiliki dokumen kepabeanan yang sah.
Sebagian barang elektronik di gudang distributor Z tidak memiliki dokumen kepabeanan yang sah.

Kesimpulan yang paling tepat adalah...`,
    explanation: `**Kunci Jawaban: D**

**Pembahasan:**
Premis 1: Semua barang impor resmi (P) memiliki dokumen kepabeanan yang sah (Q). ($P \\implies Q$)
Premis 2: Sebagian barang elektronik di gudang Z (R) tidak memiliki dokumen sah ($\\sim Q$).

Karena seluruh barang impor resmi harus memiliki dokumen sah, maka barang yang TIDAK memiliki dokumen sah pastilah BUKAN barang impor resmi.
Karena sebagian R tidak memiliki Q, maka **sebagian barang elektronik di gudang distributor Z bukan merupakan barang yang diimpor secara resmi.**`,
    options: [
      { key: 'A', text: 'Semua barang elektronik di gudang distributor Z diimpor secara resmi', score: 0 },
      { key: 'B', text: 'Tidak ada barang elektronik di gudang distributor Z yang memiliki dokumen sah', score: 0 },
      { key: 'C', text: 'Semua barang yang tidak memiliki dokumen kepabeanan bukan barang elektronik', score: 0 },
      { key: 'D', text: 'Sebagian barang elektronik di gudang distributor Z bukan barang yang diimpor secara resmi', score: 5 },
      { key: 'E', text: 'Gudang distributor Z ditutup sementara oleh petugas bea dan cukai', score: 0 },
    ],
  },
  {
    orderNumber: 39,
    category: 'TIU',
    subTopic: 'Silogisme Logika',
    text: `Setiap aparatur sipil negara yang berprestasi teladan menerima piagam penghargaan kehormatan atau promosi kenaikan pangkat istimewa.
Pegawai Danang adalah aparatur sipil negara yang berprestasi teladan dan ia tidak menerima promosi kenaikan pangkat istimewa.

Kesimpulan yang sah adalah...`,
    explanation: `**Kunci Jawaban: A**

**Pembahasan:**
Premis 1: ASN berprestasi teladan $\\implies$ menerima penghargaan ($p$) ATAU menerima promosi ($q$). ($p \\lor q$)
Premis 2: Pegawai Danang berprestasi teladan, tetapi TIDAK menerima promosi ($\\sim q$).

Berdasarkan aturan **Silogisme Disjungtif**:
$$\\frac{p \\lor q, \\quad \\sim q}{\\therefore p}$$
Kesimpulan: **Pegawai Danang menerima piagam penghargaan kehormatan.**`,
    options: [
      { key: 'A', text: 'Pegawai Danang menerima piagam penghargaan kehormatan', score: 5 },
      { key: 'B', text: 'Pegawai Danang dijatuhi sanksi disiplin oleh atasan instansi', score: 0 },
      { key: 'C', text: 'Pegawai Danang bukan aparatur sipil negara yang berprestasi teladan', score: 0 },
      { key: 'D', text: 'Pegawai Danang menolak seluruh bentuk penghargaan dari pemerintah', score: 0 },
      { key: 'E', text: 'Pegawai Danang dipindahtugaskan ke kantor perwakilan di daerah lain', score: 0 },
    ],
  },
  {
    orderNumber: 40,
    category: 'TIU',
    subTopic: 'Silogisme Logika',
    text: `Semua dokumen rahasia negara wajib disimpan dalam brankas berpengaman sandi ganda.
Sebagian dokumen laporan keuangan instansi X disimpan dalam brankas berpengaman sandi ganda.
Semua dokumen rahasia negara bertanda stempel merah.

Manakah kesimpulan yang PASTI BENAR?`,
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
- Premis: Dokumen Rahasia Negara $\\implies$ Disimpan di brankas sandi ganda.
- Dokumen Rahasia Negara $\\implies$ Berstempel merah.
- Sebagian dokumen keuangan instansi X disimpan di brankas sandi ganda.
Perhatikan bahwa dokumen yang disimpan di brankas sandi ganda belum tentu semuanya rahasia negara. Namun, bila suatu dokumen TIDAK bertanda stempel merah, maka dokumen itu PASTI BUKAN dokumen rahasia negara (kontraposisi).
Atau: Dokumen yang tidak disimpan di brankas sandi ganda sudah pasti bukan dokumen rahasia negara.

- **Opsi C (Pasti Benar):** Dokumen yang tidak disimpan dalam brankas berpengaman sandi ganda bukan merupakan dokumen rahasia negara. (Kontraposisi langsung dari Premis 1: $P \\implies Q \\equiv \\sim Q \\implies \\sim P$).`,
    options: [
      { key: 'A', text: 'Semua dokumen laporan keuangan instansi X adalah dokumen rahasia negara bertanda stempel merah', score: 0 },
      { key: 'B', text: 'Semua dokumen yang bertanda stempel merah adalah dokumen laporan keuangan instansi X', score: 0 },
      { key: 'C', text: 'Dokumen yang tidak disimpan dalam brankas berpengaman sandi ganda bukan merupakan dokumen rahasia negara', score: 5 },
      { key: 'D', text: 'Sebagian dokumen yang tidak berstempel merah wajib disimpan dalam brankas berkunci ganda', score: 0 },
      { key: 'E', text: 'Brankas berpengaman sandi ganda hanya boleh diisi oleh dokumen laporan keuangan instansi X', score: 0 },
    ],
  },

  // ==========================================
  // LOGIKA ANALITIS (Soal 41 - 45)
  // ==========================================
  {
    orderNumber: 41,
    category: 'TIU',
    subTopic: 'Analitis',
    text: `Lima orang calon widyaiswara mengikuti uji kompetensi wawancara: Farah, Galih, Hani, Indra, dan Kiki.
Hasil tes menunjukkan ketentuan sebagai berikut:
- Nilai Farah lebih tinggi daripada nilai Galih.
- Nilai Hani lebih tinggi daripada nilai Indra, tetapi lebih rendah daripada nilai Galih.
- Nilai Kiki lebih tinggi daripada nilai Farah.
- Tidak ada dua peserta yang memperoleh nilai yang sama.

Siapakah peserta yang menempati peringkat KETIGA tertinggi?`,
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Mari kita susun hubungan pertidaksamaan nilainya:
1. Farah > Galih
2. Galih > Hani > Indra
3. Kiki > Farah

Jika kita gabungkan seluruh rantai nilai:
Kiki > Farah > Galih > Hani > Indra

Urutan peringkat dari yang tertinggi ke terendah:
1. Peringkat 1: Kiki
2. Peringkat 2: Farah
3. Peringkat 3: Galih
4. Peringkat 4: Hani
5. Peringkat 5: Indra

Peserta yang menempati peringkat ketiga tertinggi adalah **Galih**.`,
    options: [
      { key: 'A', text: 'Farah', score: 0 },
      { key: 'B', text: 'Galih', score: 5 },
      { key: 'C', text: 'Hani', score: 0 },
      { key: 'D', text: 'Indra', score: 0 },
      { key: 'E', text: 'Kiki', score: 0 },
    ],
  },
  {
    orderNumber: 42,
    category: 'TIU',
    subTopic: 'Analitis',
    text: `Enam delegasi kementerian (P, Q, R, S, T, dan U) duduk mengelilingi meja bundar untuk rapat koordinasi terbatas:
- P duduk berhadapan langsung dengan S.
- Q duduk tepat di sebelah kanan P.
- T duduk tepat di antara S dan U.
- R duduk tepat di antara P dan S di sisi yang berlawanan dengan T.

Siapakah delegasi yang duduk berhadapan langsung dengan Q?`,
    explanation: `**Kunci Jawaban: E**

**Pembahasan:**
Enam posisi duduk di meja bundar (anggap posisi jam: 12, 2, 4, 6, 8, 10):
1. P berhadapan langsung dengan S.
   Misal P di posisi jam 12, maka S di posisi jam 6.
2. Q duduk tepat di sebelah kanan P (searah jarum jam dari jam 12, yaitu jam 2). Jadi Q di jam 2.
3. Posisi berhadapan dengan Q (jam 2) adalah posisi jam 8.
4. T duduk di antara S (jam 6) dan U.
   Jika R duduk di antara P (12) dan S (6) di satu sisi (jam 4), maka sisi lainnya (jam 8 dan 10) ditempati T dan U.
   Karena T duduk tepat di antara S (jam 6) dan U, maka T harus di jam 8, atau T di jam 8 dan U di jam 10... Mari kita cek:
   Jika jam 6 adalah S, maka tetangga S adalah jam 4 dan jam 8.
   R duduk di antara P dan S, jadi R di jam 4 (antara jam 12 P dan jam 6 S).
   Maka di sisi jam 6-8-10: S di jam 6, T di antara S dan U berarti T di posisi jam 8, dan U di posisi jam 10.
   Atau jika arah sebaliknya:
   Pasangan berhadapan:
   - P (12) berhadapan dengan S (6).
   - Posisi jam 2 berhadapan dengan jam 8.
   - Posisi jam 4 berhadapan dengan jam 10.
   Jika Q di sebelah kanan P (jam 2), dan R di jam 4 (antara P di 12 dan S di 6).
   Maka T dan U berada di jam 8 dan 10. Karena T di antara S (6) dan U (10), maka T di jam 8.
   Siapakah yang berhadapan langsung dengan Q (jam 2)? Posisi jam 8, yaitu **T**.
   Tunggu, mari kita periksa jika orientasi kanan menghadap ke meja (pusat lingkaran):
   Seseorang yang duduk di jam 12 menghadap ke dalam meja:
   Tangan kanannya mengarah ke arah jam 10 (lawan arah jarum jam). Tangan kirinya ke jam 2.
   Mari perjelas:
   Jika Q di sebelah kanan P:
   - Jika menghadap pusat meja, kanan P adalah posisi jam 10.
   - Posisi yang berhadapan dengan jam 10 adalah jam 4.
   - S di jam 6. T di antara S dan U.
   Mari teliti posisi berhadapan dari 6 orang:
   Orang: P, Q, R, S, T, U.
   Pasangan berhadapan: P berhadapan dengan S. Dua pasang lainnya adalah (Q dengan ?) dan (? dengan ?).
   Karena T di antara S dan U, maka T bersebelahan dengan S dan U.
   R di antara P dan S, maka R bersebelahan dengan P dan S.
   Artinya di meja melingkar, tetangga S adalah R dan T.
   Maka urutan melingkar bertetangga: P - R - S - T - U - Q - P.
   Mari cek:
   1. P berhadapan dengan S?
      Panjang lingkaran 6: P(0), R(1), S(2)... tunggu!
      Jika P-R-S berturutan, jarak P ke S hanya 2 langkah (bukan berhadapan).
      Agar P dan S berhadapan (berjarak 3 langkah):
      P di indeks 0, S di indeks 3.
      R di antara P dan S di satu sisi: jadi R di indeks 1 (atau indeks 2?). Jika R di indeks 1 atau 2, ada satu orang lagi di sisi itu (yaitu Q).
      Mari cek: R duduk di antara P dan S: bisa berarti di busur antara P dan S.
      Di busur satu lagi ada T dan U (T di antara S dan U).
      Jadi busur satu: S - T - U - P (T di antara S dan U). Maka urutan: S (indeks 3), T (indeks 4), U (indeks 5), P (indeks 0).
      Di busur lainnya: P (indeks 0), Q (indeks 1), R (indeks 2), S (indeks 3).
      Mari cek pasangan berhadapan (indeks $i$ berhadapan dengan $i+3$):
      - Indeks 0 (P) berhadapan dengan indeks 3 (S). Cocok!
      - Indeks 1 (Q) berhadapan dengan indeks 4 (T).
      - Indeks 2 (R) berhadapan dengan indeks 5 (U).
   Siapakah yang berhadapan langsung dengan Q? Yaitu **T**!`,
    options: [
      { key: 'A', text: 'P', score: 0 },
      { key: 'B', text: 'R', score: 0 },
      { key: 'C', text: 'S', score: 0 },
      { key: 'D', text: 'T', score: 5 },
      { key: 'E', text: 'U', score: 0 },
    ],
  },
  {
    orderNumber: 43,
    category: 'TIU',
    subTopic: 'Analitis',
    text: `Lima unit kerja (Biro Kepegawaian, Biro Keuangan, Biro Hukum, Biro Umum, dan Pusat Data) dijadwalkan melakukan evaluasi kinerja mingguan dari hari Senin hingga Jumat (satu unit per hari):
- Biro Keuangan dievaluasi tepat sebelum Biro Umum.
- Biro Hukum dievaluasi pada hari Rabu.
- Pusat Data dievaluasi pada hari yang lebih awal daripada Biro Kepegawaian.
- Biro Kepegawaian BUKAN unit yang dievaluasi pada hari Jumat.

Unit kerja manakah yang dievaluasi pada hari SENIN?`,
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Hari kerja: Senin (1), Selasa (2), Rabu (3), Kamis (4), Jumat (5).
Informasi yang diberikan:
1. Rabu (3) = Biro Hukum.
2. Biro Keuangan dievaluasi tepat sebelum Biro Umum. Artinya [Keuangan, Umum] harus berada pada dua hari berurutan.
   Pilihan hari berurutan yang tersisa:
   - Senin dan Selasa (1 dan 2), ATAU
   - Kamis dan Jumat (4 dan 5).
3. Informasi tambahan:
   - Pusat Data lebih awal dari Biro Kepegawaian.
   - Biro Kepegawaian BUKAN hari Jumat.

Mari kita uji kedua kemungkinan:
Kasus 1: Keuangan dan Umum di Kamis (4) dan Jumat (5).
Maka hari 1 (Senin) dan hari 2 (Selasa) harus diisi Pusat Data dan Biro Kepegawaian.
Karena Pusat Data lebih awal dari Kepegawaian, maka:
- Senin (1): Pusat Data
- Selasa (2): Biro Kepegawaian
- Rabu (3): Biro Hukum
- Kamis (4): Biro Keuangan
- Jumat (5): Biro Umum
Cek syarat: Kepegawaian bukan hari Jumat? Betul (Kepegawaian di Selasa). Semua syarat terpenuhi!

Kasus 2: Keuangan dan Umum di Senin (1) dan Selasa (2).
Maka hari 4 (Kamis) dan hari 5 (Jumat) harus diisi Pusat Data dan Biro Kepegawaian.
Karena Pusat Data lebih awal, Pusat Data di Kamis (4) dan Kepegawaian di Jumat (5).
Namun syarat menyatakan: Biro Kepegawaian BUKAN hari Jumat! Jadi Kasus 2 gugur!

Dengan demikian, susunan pasti adalah:
- Senin: Pusat Data
- Selasa: Biro Kepegawaian
- Rabu: Biro Hukum
- Kamis: Biro Keuangan
- Jumat: Biro Umum

Unit kerja yang dievaluasi pada hari Senin adalah **Pusat Data**.`,
    options: [
      { key: 'A', text: 'Biro Keuangan', score: 0 },
      { key: 'B', text: 'Biro Umum', score: 0 },
      { key: 'C', text: 'Pusat Data', score: 5 },
      { key: 'D', text: 'Biro Kepegawaian', score: 0 },
      { key: 'E', text: 'Biro Hukum', score: 0 },
    ],
  },
  {
    orderNumber: 44,
    category: 'TIU',
    subTopic: 'Analitis',
    text: `Dari 6 orang staf (K, L, M, N, O, dan P), pimpinan akan membentuk tim investigasi beranggotakan 3 orang dengan syarat sebagai berikut:
- Jika K dipilih, maka L tidak boleh dipilih.
- M dan N harus dipilih bersama-sama atau keduanya tidak dipilih sama sekali.
- P tidak dapat dipilih jika O dipilih.

Jika staf K dan M terpilih menjadi anggota tim, siapakah anggota KETIGA yang wajib melengkapi tim tersebut?`,
    explanation: `**Kunci Jawaban: A**

**Pembahasan:**
Syarat pembentukan tim (3 orang):
- K terpilih $\\implies$ L tidak boleh dipilih.
- M dan N harus sepaket: jika M dipilih, maka N WAJIB dipilih. Jika M tidak dipilih, N tidak dipilih.
- P dan O tidak boleh bersamaan (jika O dipilih, P tidak boleh).

Diketahui staf K dan M sudah terpilih:
1. Karena M terpilih, maka berdasarkan aturan kedua, **N wajib dipilih**.
2. Anggota tim yang sudah terpilih menjadi: K, M, dan N (tepat 3 orang).
3. Cek batasan:
   - Karena K dipilih, L tidak dipilih (terpenuhi, L tidak ada).
   - P dan O tidak ada yang dipilih (terpenuhi).
   - Total anggota tepat 3 orang: {K, M, N}.

Maka anggota ketiga yang wajib mendampingi K dan M adalah **N**.`,
    options: [
      { key: 'A', text: 'N', score: 5 },
      { key: 'B', text: 'L', score: 0 },
      { key: 'C', text: 'O', score: 0 },
      { key: 'D', text: 'P', score: 0 },
      { key: 'E', text: 'Tidak ada kombinasi yang memenuhi syarat', score: 0 },
    ],
  },
  {
    orderNumber: 45,
    category: 'TIU',
    subTopic: 'Analitis',
    text: `Lima kendaraan dinas operasional (Avanza, Innova, Fortuner, Pajero, dan Hilux) diparkir sejajar di slot bernomor 1 sampai 5 dari kiri ke kanan:
- Hilux diparkir tepat di sebelah kanan Avanza.
- Pajero diparkir di salah satu ujung paling pinggir (slot 1 atau 5).
- Innova diparkir di antara Hilux dan Fortuner.
- Avanza diparkir di slot nomor 2.

Kendaraan apakah yang diparkir di slot TENGAH (slot nomor 3)?`,
    explanation: `**Kunci Jawaban: D**

**Pembahasan:**
Slot parkir: [1, 2, 3, 4, 5]
1. Avanza diparkir di slot 2: [_, Avanza, _, _, _]
2. Hilux tepat di sebelah kanan Avanza: karena Avanza di slot 2, maka Hilux harus berada di slot 3!
   Posisi menjadi: [_, Avanza, Hilux, _, _]
3. Innova diparkir di antara Hilux dan Fortuner:
   Karena Hilux di slot 3, maka Innova di slot 4 dan Fortuner di slot 5?
   Tapi Pajero harus berada di salah satu ujung (slot 1 atau 5).
   Jika Fortuner di slot 5, Pajero di slot 1:
   - Slot 1: Pajero
   - Slot 2: Avanza
   - Slot 3: Hilux
   - Slot 4: Innova (di antara Hilux di slot 3 dan Fortuner di slot 5? Tunggu, jika Innova di 4, apakah Fortuner di 5? Tapi slot 5 ada Pajero atau Fortuner?)
   Mari periksa:
   Jika Pajero di slot 5:
   Maka Innova harus di antara Hilux dan Fortuner di sebelah kiri? Tapi sebelah kiri Hilux adalah Avanza (slot 2) dan Pajero (slot 1). Jadi Innova tidak bisa di sebelah kiri Hilux.
   Maka Pajero WAJIB di slot 1!
   Jika Pajero di slot 1:
   - Slot 1: Pajero
   - Slot 2: Avanza
   - Slot 3: Hilux
   - Slot 4: Innova
   - Slot 5: Fortuner
   Cek: Innova di slot 4 tepat di antara Hilux (slot 3) dan Fortuner (slot 5). Sempurna!

Kendaraan yang diparkir di slot nomor 3 (posisi tengah) adalah **Hilux**.`,
    options: [
      { key: 'A', text: 'Avanza', score: 0 },
      { key: 'B', text: 'Innova', score: 0 },
      { key: 'C', text: 'Fortuner', score: 0 },
      { key: 'D', text: 'Hilux', score: 5 },
      { key: 'E', text: 'Pajero', score: 0 },
    ],
  },

  // ==========================================
  // BERHITUNG CEPAT & ALJABAR (Soal 46 - 50)
  // ==========================================
  {
    orderNumber: 46,
    category: 'TIU',
    subTopic: 'Berhitung Cepat',
    text: 'Hitunglah nilai dari operasi aljabar berikut secara cepat tanpa kalkulator: $745^2 - 255^2 = ...$',
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Gunakan sifat faktorisasi selisih dua kuadrat:
$$a^2 - b^2 = (a + b)(a - b)$$

Substitusikan $a = 745$ dan $b = 255$:
$$745^2 - 255^2 = (745 + 255)(745 - 255)$$
$$= (1.000) \\times (490) = 490.000$$

Jawaban yang tepat adalah **490.000**.`,
    options: [
      { key: 'A', text: '$480.000$', score: 0 },
      { key: 'B', text: '$490.000$', score: 5 },
      { key: 'C', text: '$500.000$', score: 0 },
      { key: 'D', text: '$510.000$', score: 0 },
      { key: 'E', text: '$525.000$', score: 0 },
    ],
  },
  {
    orderNumber: 47,
    category: 'TIU',
    subTopic: 'Berhitung Cepat',
    text: 'Berapakah nilai dari $\\frac{5}{12} \\times 0{,}72 + \\frac{3}{4} \\div 2\\frac{1}{2}$?',
    explanation: `**Kunci Jawaban: A**

**Pembahasan:**
Langkah 1: Selesaikan perkalian pertama:
$$\\frac{5}{12} \\times 0{,}72 = \\frac{5}{12} \\times \\frac{72}{100} = 5 \\times \\frac{6}{100} = \\frac{30}{100} = 0{,}30$$

Langkah 2: Selesaikan pembagian kedua:
$$2\\frac{1}{2} = \\frac{5}{2}$$
$$\\frac{3}{4} \\div \\frac{5}{2} = \\frac{3}{4} \\times \\frac{2}{5} = \\frac{6}{20} = \\frac{3}{10} = 0{,}30$$

Langkah 3: Jumlahkan hasilnya:
$$0{,}30 + 0{,}30 = 0{,}60 = \\frac{3}{5}$$

Kunci jawaban yang tepat adalah **0,60 (atau 3/5)**.`,
    options: [
      { key: 'A', text: '$0{,}60$', score: 5 },
      { key: 'B', text: '$0{,}65$', score: 0 },
      { key: 'C', text: '$0{,}75$', score: 0 },
      { key: 'D', text: '$0{,}80$', score: 0 },
      { key: 'E', text: '$0{,}90$', score: 0 },
    ],
  },
  {
    orderNumber: 48,
    category: 'TIU',
    subTopic: 'Berhitung Cepat',
    text: 'Nilai dari $\\sqrt{0{,}0144} + \\sqrt[3]{0{,}064} - \\sqrt{0{,}0025}$ adalah...',
    explanation: `**Kunci Jawaban: D**

**Pembahasan:**
Hitung masing-masing bentuk akar:
1. $\\sqrt{0{,}0144} = \\sqrt{\\frac{144}{10.000}} = \\frac{12}{100} = 0{,}12$
2. $\\sqrt[3]{0{,}064} = \\sqrt[3]{\\frac{64}{1.000}} = \\frac{4}{10} = 0{,}40$
3. $\\sqrt{0{,}0025} = \\sqrt{\\frac{25}{10.000}} = \\frac{5}{100} = 0{,}05$

Operasikan:
$$0{,}12 + 0{,}40 - 0{,}05 = 0{,}52 - 0{,}05 = 0{,}47$$

Hasil yang benar adalah **0,47**.`,
    options: [
      { key: 'A', text: '$0{,}37$', score: 0 },
      { key: 'B', text: '$0{,}41$', score: 0 },
      { key: 'C', text: '$0{,}45$', score: 0 },
      { key: 'D', text: '$0{,}47$', score: 5 },
      { key: 'E', text: '$0{,}51$', score: 0 },
    ],
  },
  {
    orderNumber: 49,
    category: 'TIU',
    subTopic: 'Berhitung Cepat',
    text: 'Bentuk sederhana dari pecahan aljabar $\\frac{x^2 - 16}{x^2 + 5x + 4} \\times \\frac{x^2 - 1}{x - 4}$ untuk $x \\neq -4, -1, 4$ adalah...',
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Faktorkan setiap suku pembilang dan penyebut:
- $x^2 - 16 = (x - 4)(x + 4)$
- $x^2 + 5x + 4 = (x + 1)(x + 4)$
- $x^2 - 1 = (x - 1)(x + 1)$

Substitusi ke perkalian pecahan:
$$\\frac{(x - 4)(x + 4)}{(x + 1)(x + 4)} \\times \\frac{(x - 1)(x + 1)}{(x - 4)}$$

Lakukan pembatalan (faktor yang sama):
- $(x - 4)$ membatalkan $(x - 4)$
- $(x + 4)$ membatalkan $(x + 4)$
- $(x + 1)$ membatalkan $(x + 1)$

Sisa yang diperoleh adalah:
$$= x - 1$$`,
    options: [
      { key: 'A', text: '$x + 1$', score: 0 },
      { key: 'B', text: '$x + 4$', score: 0 },
      { key: 'C', text: '$x - 1$', score: 5 },
      { key: 'D', text: '$\\frac{x - 1}{x + 4}$', score: 0 },
      { key: 'E', text: '$x^2 - 4$', score: 0 },
    ],
  },
  {
    orderNumber: 50,
    category: 'TIU',
    subTopic: 'Berhitung Cepat',
    text: 'Hitunglah nilai dari $33\\frac{1}{3}\\%$ dari $540$ ditambah $62{,}5\\%$ dari $320$.',
    explanation: `**Kunci Jawaban: E**

**Pembahasan:**
Gunakan pecahan istimewa untuk persentase:
- $33\\frac{1}{3}\\% = \\frac{1}{3}$
- $62{,}5\\% = \\frac{5}{8}$ (karena $12{,}5\\% = \\frac{1}{8}$, maka $5 \\times 12{,}5\\% = \\frac{5}{8}$)

Hitung masing-masing suku:
1. $\\frac{1}{3} \\times 540 = 180$
2. $\\frac{5}{8} \\times 320 = 5 \\times 40 = 200$

Jumlahkan:
$$180 + 200 = 380$$

Jawaban yang tepat adalah **380**.`,
    options: [
      { key: 'A', text: '$340$', score: 0 },
      { key: 'B', text: '$350$', score: 0 },
      { key: 'C', text: '$360$', score: 0 },
      { key: 'D', text: '$370$', score: 0 },
      { key: 'E', text: '$380$', score: 5 },
    ],
  },

  // ==========================================
  // DERET ANGKA (Soal 51 - 55)
  // ==========================================
  {
    orderNumber: 51,
    category: 'TIU',
    subTopic: 'Deret Angka',
    text: 'Tentukan dua angka lanjutan dari barisan bilangan berikut: $3, 10, 6, 20, 12, 40, 24, ..., ...$',
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Barisan ini terdiri atas 2 pola larik berselang-seling:
- Larik 1 (suku ganjil ke-1, 3, 5, 7, 9):
  $3 \\xrightarrow{\\times 2} 6 \\xrightarrow{\\times 2} 12 \\xrightarrow{\\times 2} 24 \\xrightarrow{\\times 2} 48$
- Larik 2 (suku genap ke-2, 4, 6, 8):
  $10 \\xrightarrow{\\times 2} 20 \\xrightarrow{\\times 2} 40 \\xrightarrow{\\times 2} 80$

Maka:
Suku ke-8 adalah suku dari Larik 2: $40 \\times 2 = 80$.
Suku ke-9 adalah suku dari Larik 1: $24 \\times 2 = 48$.

Dua angka berikutnya adalah **80 dan 48**.`,
    options: [
      { key: 'A', text: '$48 \\text{ dan } 80$', score: 0 },
      { key: 'B', text: '$80 \\text{ dan } 48$', score: 5 },
      { key: 'C', text: '$60 \\text{ dan } 48$', score: 0 },
      { key: 'D', text: '$80 \\text{ dan } 96$', score: 0 },
      { key: 'E', text: '$72 \\text{ dan } 48$', score: 0 },
    ],
  },
  {
    orderNumber: 52,
    category: 'TIU',
    subTopic: 'Deret Angka',
    text: 'Angka berapakah yang tepat untuk melengkapi barisan berikut: $2, 6, 15, 31, 56, ...$',
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Perhatikan selisih antarsuku (tingkat pertama):
- $6 - 2 = 4 = 2^2$
- $15 - 6 = 9 = 3^2$
- $31 - 15 = 16 = 4^2$
- $56 - 31 = 25 = 5^2$

Pola pertambahannya adalah barisan bilangan kuadrat sempurna: $2^2, 3^2, 4^2, 5^2, 6^2, ...$
Maka penambahan berikutnya adalah:
$$6^2 = 36$$
Suku selanjutnya adalah:
$$56 + 36 = 92$$`,
    options: [
      { key: 'A', text: '$86$', score: 0 },
      { key: 'B', text: '$89$', score: 0 },
      { key: 'C', text: '$92$', score: 5 },
      { key: 'D', text: '$96$', score: 0 },
      { key: 'E', text: '$101$', score: 0 },
    ],
  },
  {
    orderNumber: 53,
    category: 'TIU',
    subTopic: 'Deret Angka',
    text: 'Nilai kelanjutan dari deret angka $4, 7, 13, 25, 49, ...$ adalah...',
    explanation: `**Kunci Jawaban: A**

**Pembahasan:**
Metode 1 (Operasi kombinasi):
- $4 \\times 2 - 1 = 7$
- $7 \\times 2 - 1 = 13$
- $13 \\times 2 - 1 = 25$
- $25 \\times 2 - 1 = 49$
- $49 \\times 2 - 1 = 97$

Metode 2 (Pola selisih):
- Selisih: $+3, +6, +12, +24, ...$ (selalu dikali 2).
- Selisih berikutnya: $24 \\times 2 = +48$.
- Suku berikutnya: $49 + 48 = 97$.

Kunci jawaban yang tepat adalah **97**.`,
    options: [
      { key: 'A', text: '$97$', score: 5 },
      { key: 'B', text: '$98$', score: 0 },
      { key: 'C', text: '$99$', score: 0 },
      { key: 'D', text: '$102$', score: 0 },
      { key: 'E', text: '$105$', score: 0 },
    ],
  },
  {
    orderNumber: 54,
    category: 'TIU',
    subTopic: 'Deret Angka',
    text: 'Tentukan suku berikutnya dari barisan Fibonacci modifikasi berikut: $1, 3, 4, 7, 11, 18, 29, ...$',
    explanation: `**Kunci Jawaban: D**

**Pembahasan:**
Pola barisan adalah penjumlahan dua suku sebelumnya (dikenal sebagai Barisan Lucas):
- $1 + 3 = 4$
- $3 + 4 = 7$
- $4 + 7 = 11$
- $7 + 11 = 18$
- $11 + 18 = 29$
- Suku berikutnya: $18 + 29 = 47$.

Jawaban yang benar adalah **47**.`,
    options: [
      { key: 'A', text: '$41$', score: 0 },
      { key: 'B', text: '$43$', score: 0 },
      { key: 'C', text: '$45$', score: 0 },
      { key: 'D', text: '$47$', score: 5 },
      { key: 'E', text: '$51$', score: 0 },
    ],
  },
  {
    orderNumber: 55,
    category: 'TIU',
    subTopic: 'Deret Angka',
    text: 'Angka lanjutan dari pola bilangan $4, 7, 12, 19, 28, 39, ...$ adalah...',
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Analisis selisih antarsuku berurutan:
- $7 - 4 = +3$
- $12 - 7 = +5$
- $19 - 12 = +7$
- $28 - 19 = +9$
- $39 - 28 = +11$

Pola penambahan adalah barisan bilangan ganjil berturut-turut ($+3, +5, +7, +9, +11, +13$).
Maka suku berikutnya adalah:
$$39 + 13 = 52$$`,
    options: [
      { key: 'A', text: '$48$', score: 0 },
      { key: 'B', text: '$50$', score: 0 },
      { key: 'C', text: '$52$', score: 5 },
      { key: 'D', text: '$54$', score: 0 },
      { key: 'E', text: '$56$', score: 0 },
    ],
  },

  // ==========================================
  // PERBANDINGAN KUANTITATIF (Soal 56 - 60)
  // ==========================================
  {
    orderNumber: 56,
    category: 'TIU',
    subTopic: 'Perbandingan Kuantitatif',
    text: 'Diberikan nilai $x = \\frac{1}{24} - \\frac{1}{27}$ dan nilai $y = \\frac{1}{25} - \\frac{1}{28}$. Manakah hubungan yang paling tepat antara kuantitas $x$ dan $y$?',
    explanation: `**Kunci Jawaban: A**

**Pembahasan:**
Samakan penyebut masing-masing bentuk:
$$x = \\frac{27 - 24}{24 \\times 27} = \\frac{3}{24 \\times 27}$$
$$y = \\frac{28 - 25}{25 \\times 28} = \\frac{3}{25 \\times 28}$$

Kedua pecahan memiliki pembilang yang sama yaitu 3.
Bandingkan penyebutnya:
- Penyebut $x = 24 \\times 27 = 648$
- Penyebut $y = 25 \\times 28 = 700$

Karena $648 < 700$, maka pecahan dengan penyebut lebih kecil memiliki nilai yang lebih besar:
$$\\frac{3}{648} > \\frac{3}{700} \\implies x > y$$

Maka kesimpulannya adalah $x > y$.`,
    options: [
      { key: 'A', text: '$x > y$', score: 5 },
      { key: 'B', text: '$x < y$', score: 0 },
      { key: 'C', text: '$x = y$', score: 0 },
      { key: 'D', text: '$2x = 3y$', score: 0 },
      { key: 'E', text: 'Hubungan $x$ dan $y$ tidak dapat ditentukan', score: 0 },
    ],
  },
  {
    orderNumber: 57,
    category: 'TIU',
    subTopic: 'Perbandingan Kuantitatif',
    text: `Suatu proyek renovasi aula gedung jika dikerjakan oleh 12 orang pekerja dapat diselesaikan dalam 15 hari.
Misalkan $x$ adalah waktu (dalam hari) yang dibutuhkan untuk menyelesaikan renovasi tersebut jika dikerjakan oleh 18 orang pekerja dengan kecepatan yang sama.
Ditetapkan $y = 10$ hari.

Hubungan yang benar antara kuantitas $x$ dan $y$ adalah...`,
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Masalah perbandingan berbalik nilai:
$$\\text{Beban Kerja} = 12 \\text{ pekerja} \\times 15 \\text{ hari} = 180 \\text{ orang-hari}$$

Waktu yang dibutuhkan oleh 18 orang pekerja ($x$):
$$x = \\frac{180}{18} = 10 \\text{ hari}$$

Karena $x = 10$ dan $y = 10$, maka:
$$x = y$$`,
    options: [
      { key: 'A', text: '$x > y$', score: 0 },
      { key: 'B', text: '$x < y$', score: 0 },
      { key: 'C', text: '$x = y$', score: 5 },
      { key: 'D', text: '$x + y = 25$', score: 0 },
      { key: 'E', text: 'Hubungan $x$ dan $y$ tidak dapat ditentukan', score: 0 },
    ],
  },
  {
    orderNumber: 58,
    category: 'TIU',
    subTopic: 'Perbandingan Kuantitatif',
    text: `Diketahui sistem persamaan linear dua variabel:
$$3a + 2b = 26$$
$$a - b = 2$$

Jika $x = a^2 - b^2$ dan $y = 2ab - 20$, tentukan hubungan antara kuantitas $x$ dan $y$.`,
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Dari persamaan kedua: $a = b + 2$.
Substitusikan ke persamaan pertama:
$$3(b + 2) + 2b = 26$$
$$3b + 6 + 2b = 26 \\implies 5b = 20 \\implies b = 4$$
Maka $a = 4 + 2 = 6$.

Hitung nilai kuantitas $x$ dan $y$:
- $x = a^2 - b^2 = 6^2 - 4^2 = 36 - 16 = 20$
- $y = 2ab - 20 = 2(6)(4) - 20 = 48 - 20 = 28$

Karena $20 < 28$, maka:
$$x < y$$`,
    options: [
      { key: 'A', text: '$x > y$', score: 0 },
      { key: 'B', text: '$x < y$', score: 5 },
      { key: 'C', text: '$x = y$', score: 0 },
      { key: 'D', text: '$2x = y$', score: 0 },
      { key: 'E', text: 'Hubungan $x$ dan $y$ tidak dapat ditentukan', score: 0 },
    ],
  },
  {
    orderNumber: 59,
    category: 'TIU',
    subTopic: 'Perbandingan Kuantitatif',
    text: `Sebuah wadah tabung terbuka tanpa tutup memiliki diameter alas $14\\text{ cm}$ (jari-jari $r = 7\\text{ cm}$) dan tinggi $t = 10\\text{ cm}$. Kuantitas $x$ adalah luas permukaan wadah tabung tanpa tutup tersebut (gunakan $\\pi = \\frac{22}{7}$).
Sebuah balok kayu berukuran panjang $15\\text{ cm}$, lebar $10\\text{ cm}$, dan tinggi $11\\text{ cm}$ memiliki luas permukaan total sebesar $y$.

Hubungan kuantitas $x$ dan $y$ yang benar adalah...`,
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
1. Hitung luas permukaan tabung tanpa tutup ($x$):
$$x = \\text{Luas Alas} + \\text{Luas Selimut}$$
$$x = \\pi r^2 + 2\\pi r t$$
$$x = \\left(\\frac{22}{7} \\times 7^2\\right) + \\left(2 \\times \\frac{22}{7} \\times 7 \\times 10\\right)$$
$$x = 154 + 440 = 594\\text{ cm}^2$$

2. Hitung luas permukaan balok total ($y$):
$$y = 2(pl + pt + lt)$$
$$y = 2(15 \\times 10 + 15 \\times 11 + 10 \\times 11)$$
$$y = 2(150 + 165 + 110) = 2(425) = 850\\text{ cm}^2$$

Bandingkan nilai $x$ dan $y$:
$$594 < 850 \\implies x < y$$`,
    options: [
      { key: 'A', text: '$x > y$', score: 0 },
      { key: 'B', text: '$x < y$', score: 5 },
      { key: 'C', text: '$x = y$', score: 0 },
      { key: 'D', text: '$x = 2y$', score: 0 },
      { key: 'E', text: 'Informasi tidak cukup untuk membandingkan', score: 0 },
    ],
  },
  {
    orderNumber: 60,
    category: 'TIU',
    subTopic: 'Perbandingan Kuantitatif',
    text: `Diketahui lima bilangan ganjil berurutan memiliki rata-rata sebesar $x$.
Jika median dari kelima bilangan ganjil berurutan tersebut adalah $y$, manakah hubungan kuantitatif yang paling tepat antara $x$ dan $y$?`,
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Misalkan kelima bilangan ganjil berurutan tersebut adalah:
$$a - 4, \\; a - 2, \\; a, \\; a + 2, \\; a + 4$$

1. Hitung rata-rata ($x$):
$$x = \\frac{(a - 4) + (a - 2) + a + (a + 2) + (a + 4)}{5} = \\frac{5a}{5} = a$$

2. Tentukan median ($y$):
Karena data telah terurut dan berjumlah ganjil (5 data), median adalah data ke-3 (nilai tengah):
$$y = a$$

Karena $x = a$ dan $y = a$, maka diperoleh:
$$x = y$$`,
    options: [
      { key: 'A', text: '$x > y$', score: 0 },
      { key: 'B', text: '$x < y$', score: 0 },
      { key: 'C', text: '$x = y$', score: 5 },
      { key: 'D', text: '$x = y + 2$', score: 0 },
      { key: 'E', text: 'Hubungan $x$ dan $y$ bergantung pada nilai awal bilangan', score: 0 },
    ],
  },

  // ==========================================
  // SOAL CERITA ARITMETIKA SOSIAL (Soal 61 - 65)
  // ==========================================
  {
    orderNumber: 61,
    category: 'TIU',
    subTopic: 'Soal Cerita',
    text: 'Seorang kurir logistik dinas mengendarai sepeda motor dari kantor pusat menuju kantor cabang pada pukul 07.00 WIB dengan kecepatan rata-rata $45\\text{ km/jam}$. Pada pukul 07.40 WIB, sebuah mobil ekspres menyusul dari kantor pusat melewati rute yang persis sama dengan kecepatan rata-rata $65\\text{ km/jam}$. Pada pukul berapakah mobil ekspres tersebut berhasil menyusul sepeda motor kurir?',
    explanation: `**Kunci Jawaban: D**

**Pembahasan:**
1. Selisih waktu berangkat:
$$\\Delta t = 07.40 - 07.00 = 40\\text{ menit} = \\frac{40}{60}\\text{ jam} = \\frac{2}{3}\\text{ jam}$$

2. Jarak yang sudah ditempuh kurir motor sebelum mobil berangkat:
$$S_0 = v_{\\text{motor}} \\times \\Delta t = 45 \\times \\frac{2}{3} = 30\\text{ km}$$

3. Selisih kecepatan relatif menyusul:
$$v_{\\text{relatif}} = v_{\\text{mobil}} - v_{\\text{motor}} = 65 - 45 = 20\\text{ km/jam}$$

4. Waktu yang dibutuhkan mobil untuk menyusul:
$$t_{\\text{susul}} = \\frac{S_0}{v_{\\text{relatif}}} = \\frac{30}{20} = 1{,}5\\text{ jam} = 1\\text{ jam } 30\\text{ menit}$$

5. Waktu saat tersusul:
$$07.40 + 01.30 = 09.10\\text{ WIB}$$

Kunci jawaban yang tepat adalah **09.10 WIB**.`,
    options: [
      { key: 'A', text: '08.40 WIB', score: 0 },
      { key: 'B', text: '08.50 WIB', score: 0 },
      { key: 'C', text: '09.00 WIB', score: 0 },
      { key: 'D', text: '09.10 WIB', score: 5 },
      { key: 'E', text: '09.25 WIB', score: 0 },
    ],
  },
  {
    orderNumber: 62,
    category: 'TIU',
    subTopic: 'Soal Cerita',
    text: 'Pipa A dapat mengisi penuh sebuah tandon air pemadam kebakaran dalam waktu 4 jam. Pipa B dapat mengisi tandon yang sama dalam waktu 6 jam. Sementara itu, pipa pembuangan C dapat menguras tandon dari keadaan penuh hingga kosong dalam waktu 12 jam. Jika ketiga pipa dibuka secara bersamaan, dalam berapa jam tandon air tersebut akan terisi penuh dari keadaan kosong?',
    explanation: `**Kunci Jawaban: A**

**Pembahasan:**
Tentukan debit kerja masing-masing pipa per jam:
- Debit pipa A pengisi: $+\\frac{1}{4}$ tandon/jam
- Debit pipa B pengisi: $+\\frac{1}{6}$ tandon/jam
- Debit pipa C pembuang: $-\\frac{1}{12}$ tandon/jam

Debit gabungan ketiga pipa saat dibuka bersama:
$$V_{\\text{total}} = \\frac{1}{4} + \\frac{1}{6} - \\frac{1}{12}$$
Samakan penyebut ke 12:
$$V_{\\text{total}} = \\frac{3 + 2 - 1}{12} = \\frac{4}{12} = \\frac{1}{3}\\text{ tandon/jam}$$

Waktu yang diperlukan untuk terisi penuh:
$$t = \\frac{1}{1/3} = 3\\text{ jam}$$

Tandon akan penuh dalam waktu **3 jam**.`,
    options: [
      { key: 'A', text: '3 jam', score: 5 },
      { key: 'B', text: '3,5 jam', score: 0 },
      { key: 'C', text: '4 jam', score: 0 },
      { key: 'D', text: '4,5 jam', score: 0 },
      { key: 'E', text: '5 jam', score: 0 },
    ],
  },
  {
    orderNumber: 63,
    category: 'TIU',
    subTopic: 'Soal Cerita',
    text: 'Sebuah koperasi pegawai membeli 2 peti buah mangga seharga total Rp600.000. Berat bruto masing-masing peti adalah 50 kg dengan tara 2%. Seluruh buah mangga tersebut kemudian dijual eceran dengan harga Rp8.000 per kg. Berapakah persentase keuntungan yang diperoleh koperasi dari harga pembelian?',
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
1. Hitung total bruto:
$$2 \\text{ peti} \\times 50\\text{ kg} = 100\\text{ kg}$$

2. Hitung total tara:
$$\\text{Tara} = 2\\% \\times 100\\text{ kg} = 2\\text{ kg}$$

3. Hitung berat neto (berat buah bersih):
$$\\text{Neto} = \\text{Bruto} - \\text{Tara} = 100\\text{ kg} - 2\\text{ kg} = 98\\text{ kg}$$

4. Hitung total penerimaan hasil penjualan:
$$\\text{Penerimaan} = 98\\text{ kg} \\times \\text{Rp}8.000/\\text{kg} = \\text{Rp}784.000$$

5. Hitung keuntungan dan persentasenya:
$$\\text{Untung} = \\text{Rp}784.000 - \\text{Rp}600.000 = \\text{Rp}184.000$$
$$\\%\\text{Untung} = \\frac{184.000}{600.000} \\times 100\\% = \\frac{184}{6}\\% \\approx 30{,}67\\%$$

Persentase keuntungan adalah **30,67%**.`,
    options: [
      { key: 'A', text: '$28{,}50\\%$', score: 0 },
      { key: 'B', text: '$30{,}67\\%$', score: 5 },
      { key: 'C', text: '$32{,}00\\%$', score: 0 },
      { key: 'D', text: '$34{,}25\\%$', score: 0 },
      { key: 'E', text: '$35{,}80\\%$', score: 0 },
    ],
  },
  {
    orderNumber: 64,
    category: 'TIU',
    subTopic: 'Soal Cerita',
    text: 'Nilai rata-rata tes kemampuan dasar dari 36 orang peserta awal di sebuah ruang ujian adalah 78. Jika ada 4 orang peserta susulan dengan nilai rata-rata 88 dimasukkan ke dalam kelompok tersebut, berapakah nilai rata-rata keseluruhan peserta di ruang ujian sekarang?',
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Gunakan rumus rata-rata gabungan:
$$\\bar{x}_{\\text{gab}} = \\frac{n_1 \\bar{x}_1 + n_2 \\bar{x}_2}{n_1 + n_2}$$

Substitusi nilai:
- $n_1 = 36$, $\\bar{x}_1 = 78$
- $n_2 = 4$, $\\bar{x}_2 = 88$

Hitung jumlah nilai masing-masing:
$$n_1 \\bar{x}_1 = 36 \\times 78 = 2.808$$
$$n_2 \\bar{x}_2 = 4 \\times 88 = 352$$

Jumlah total nilai dan peserta:
$$\\text{Total Nilai} = 2.808 + 352 = 3.160$$
$$\\text{Total Peserta} = 36 + 4 = 40$$

Rata-rata gabungan:
$$\\bar{x}_{\\text{gab}} = \\frac{3.160}{40} = 79{,}0$$

Nilai rata-rata yang baru adalah **79,0**.`,
    options: [
      { key: 'A', text: '$78{,}5$', score: 0 },
      { key: 'B', text: '$78{,}8$', score: 0 },
      { key: 'C', text: '$79{,}0$', score: 5 },
      { key: 'D', text: '$79{,}4$', score: 0 },
      { key: 'E', text: '$80{,}0$', score: 0 },
    ],
  },
  {
    orderNumber: 65,
    category: 'TIU',
    subTopic: 'Soal Cerita',
    text: 'Sebuah proyek pembangunan jembatan darurat ditargetkan selesai dalam waktu 60 hari dengan mempekerjakan 24 orang pekerja. Setelah pekerjaan berjalan selama 20 hari, proyek terpaksa dihentikan selama 8 hari akibat bencana banjir lahar dingin. Berapakah jumlah pekerja tambahan yang harus ditambahkan agar jembatan tetap selesai sesuai jadwal awal?',
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Gunakan metode perbandingan beban kerja (hari $\\times$ pekerja):
1. Sisa waktu normal setelah hari ke-20:
$$t_{\\text{sisa normal}} = 60 - 20 = 40\\text{ hari}$$

2. Sisa beban pekerjaan yang belum selesai:
$$\\text{Beban Sisa} = 40\\text{ hari} \\times 24\\text{ pekerja} = 960\\text{ orang-hari}$$

3. Waktu tersisa yang tersedia setelah libur terhenti 8 hari:
$$t_{\\text{tersedia}} = 40 - 8 = 32\\text{ hari}$$

4. Jumlah pekerja total yang dibutuhkan untuk menuntaskan beban sisa dalam 32 hari:
$$\\text{Pekerja Dibutuhkan} = \\frac{960\\text{ orang-hari}}{32\\text{ hari}} = 30\\text{ orang pekerja}$$

5. Pekerja tambahan yang harus direkrut:
$$\\text{Tambahan} = 30 - 24 = 6\\text{ orang pekerja}$$

Maka diperlukan tambahan sebanyak **6 orang pekerja**.`,
    options: [
      { key: 'A', text: '4 orang', score: 0 },
      { key: 'B', text: '6 orang', score: 5 },
      { key: 'C', text: '8 orang', score: 0 },
      { key: 'D', text: '10 orang', score: 0 },
      { key: 'E', text: '12 orang', score: 0 },
    ],
  },
];
