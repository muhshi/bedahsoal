import { PrismaClient } from '@prisma/client';

export interface SeedQuestionData {
  orderNumber: number;
  category: string;
  subTopic: string;
  text: string;
  explanation: string;
  options: Array<{
    key: string;
    text: string;
    score: number;
  }>;
}

export const LPDP_ADVANCED_QUESTIONS: SeedQuestionData[] = [
  // ========================================================
  // PENALARAN VERBAL (1 - 15)
  // Subtopik 1: Analogi Konseptual (1 - 5)
  // ========================================================
  {
    orderNumber: 1,
    category: 'Penalaran Verbal',
    subTopic: 'Analogi Konseptual',
    text: 'ABROGASI : UNDANG-UNDANG = RESISI : ...',
    explanation:
      '**Pembahasan:**\n' +
      'Hubungan analogi fungsi pembatalan yuridis formal:\n' +
      '- **Abrogasi** (*abrogation*) adalah pembatalan atau pencabutan resmi suatu **Undang-Undang** atau peraturan hukum publik.\n' +
      '- Sementara **Resisi** (*rescission*) adalah pembatalan sepihak yang sah secara hukum atas suatu **Kontrak** atau perjanjian perdata.\n' +
      'Oleh karena itu, padanan yang tepat adalah Kontrak (Opsi B).',
    options: [
      { key: 'A', text: 'Konstitusi', score: 0 },
      { key: 'B', text: 'Kontrak', score: 1 },
      { key: 'C', text: 'Vonis', score: 0 },
      { key: 'D', text: 'Banding', score: 0 },
      { key: 'E', text: 'Ratifikasi', score: 0 },
    ],
  },
  {
    orderNumber: 2,
    category: 'Penalaran Verbal',
    subTopic: 'Analogi Konseptual',
    text: 'EPISTEMOLOGI : HAKIKAT PENGETAHUAN = AKSIOLOGI : ...',
    explanation:
      '**Pembahasan:**\n' +
      'Hubungan cabang ilmu filsafat dengan fokus kajian utamanya:\n' +
      '- **Epistemologi** merupakan cabang filsafat yang secara khusus menelaah **Hakikat Pengetahuan**, sumber, dan validitas kebenaran.\n' +
      '- **Aksiologi** merupakan cabang filsafat yang menelaah hakikat **Nilai dan Moralitas** (etika dan estetika).\n' +
      'Catatan: Hakikat keberadaan/realitas dipelajari dalam Ontologi, sedangkan kaidah penalaran dipelajari dalam Logika. Jadi jawaban yang tepat adalah C.',
    options: [
      { key: 'A', text: 'Hakikat Keberadaan', score: 0 },
      { key: 'B', text: 'Kaidah Penalaran', score: 0 },
      { key: 'C', text: 'Nilai dan Moralitas', score: 1 },
      { key: 'D', text: 'Struktur Realitas', score: 0 },
      { key: 'E', text: 'Batasan Empirisme', score: 0 },
    ],
  },
  {
    orderNumber: 3,
    category: 'Penalaran Verbal',
    subTopic: 'Analogi Konseptual',
    text: 'DEFISIENSI : SUPLEMEN = IMUNODEFISIENSI : ...',
    explanation:
      '**Pembahasan:**\n' +
      'Hubungan kondisi medis kekurangan fungsional biologis dengan tindakan intervensi terapeutiknya:\n' +
      '- **Defisiensi** nutrisi atau mikronutrien ditangani secara langsung dengan pemberian **Suplemen**.\n' +
      '- **Imunodefisiensi** (kondisi melemahnya respons sistem kekebalan tubuh) ditangani secara klinis menggunakan terapi stimulasi kekebalan yaitu **Imunoterapi**.\n' +
      'Jawaban yang tepat adalah B.',
    options: [
      { key: 'A', text: 'Vaksinasi', score: 0 },
      { key: 'B', text: 'Imunoterapi', score: 1 },
      { key: 'C', text: 'Patogen', score: 0 },
      { key: 'D', text: 'Autoimun', score: 0 },
      { key: 'E', text: 'Karantina', score: 0 },
    ],
  },
  {
    orderNumber: 4,
    category: 'Penalaran Verbal',
    subTopic: 'Analogi Konseptual',
    text: 'KONDENSASI : UAP = PRESIPITASI : ...',
    explanation:
      '**Pembahasan:**\n' +
      'Hubungan proses tahapan siklus hidrologi dengan fenomena fisik yang dihasilkannya:\n' +
      '- Proses **Kondensasi** menyebabkan uap air di atmosfer mengembun dan mengelompok membentuk awan/titik-titik air.\n' +
      '- Proses **Presipitasi** menyebabkan massa air di awan jatuh ke permukaan bumi dalam bentuk **Hujan** (atau salju).\n' +
      'Jawaban yang benar adalah D.',
    options: [
      { key: 'A', text: 'Panas', score: 0 },
      { key: 'B', text: 'Es', score: 0 },
      { key: 'C', text: 'Embun', score: 0 },
      { key: 'D', text: 'Hujan', score: 1 },
      { key: 'E', text: 'Tekanan', score: 0 },
    ],
  },
  {
    orderNumber: 5,
    category: 'Penalaran Verbal',
    subTopic: 'Analogi Konseptual',
    text: 'INSULAR : PAROKIAL = KOSMOPOLITAN : ...',
    explanation:
      '**Pembahasan:**\n' +
      'Hubungan kesetaraan makna konseptual (sinonim perspektif cara pandang):\n' +
      '- **Insular** (berpandangan sempit, picik, atau terisolasi seperti pulau) bersinonim dengan **Parokial** (berwawasan lokal kedaerahan yang sempit).\n' +
      '- **Kosmopolitan** (berpandangan luas melintasi batas-batas teritorial dunia) memiliki kesepadanan makna sinonim dengan **Universalis** (memandang peradaban secara menyeluruh dan universal bagi seluruh umat manusia).\n' +
      'Jawaban yang tepat adalah B.',
    options: [
      { key: 'A', text: 'Eklektik', score: 0 },
      { key: 'B', text: 'Universalis', score: 1 },
      { key: 'C', text: 'Pluralis', score: 0 },
      { key: 'D', text: 'Heterogen', score: 0 },
      { key: 'E', text: 'Metropolit', score: 0 },
    ],
  },

  // Subtopik 2: Silogisme Kompleks (6 - 10)
  {
    orderNumber: 6,
    category: 'Penalaran Verbal',
    subTopic: 'Silogisme Kompleks',
    text:
      'Perhatikan premis-premis berikut:\n' +
      '1. Semua peneliti yang mempublikasikan artikel ilmiah di jurnal bereputasi Scopus Q1 menerima hibah riset lanjutan.\n' +
      '2. Beberapa dosen Fakultas Teknik adalah peneliti yang mempublikasikan artikel ilmiah di jurnal bereputasi Scopus Q1.\n' +
      '3. Tidak ada penerima hibah riset lanjutan yang terbebas dari kewajiban menyusun laporan akuntabilitas keuangan negara.\n\n' +
      'Kesimpulan yang paling tepat dan valid secara logis adalah...',
    explanation:
      '**Pembahasan:**\n' +
      'Mari representasikan dalam himpunan logika:\n' +
      '- Premis 1: $Q1 \\subseteq H$ (Semua pemublikasi Q1 adalah penerima hibah lanjutan).\n' +
      '- Premis 2: $D \\cap Q1 \\neq \\emptyset$ (Sebagian dosen teknik adalah pemublikasi Q1).\n' +
      '- Premis 3: $H \\subseteq L$ (Semua penerima hibah lanjutan terikat kewajiban laporan akuntabilitas, atau tidak ada yang terbebas).\n\n' +
      'Dengan menggabungkan ketiganya:\n' +
      'Karena sebagian dosen teknik berada di himpunan $Q1$, dan seluruh $Q1$ berada di $H$, serta seluruh $H$ berada di $L$, maka sebagian dosen teknik tersebut pasti menerima hibah riset lanjutan dan tidak terbebas dari kewajiban menyusun laporan akuntabilitas keuangan negara ($D \\cap H \\cap L \\neq \\emptyset$).\n' +
      'Kesimpulan ini secara tepat dinyatakan pada Opsi B.',
    options: [
      { key: 'A', text: 'Semua dosen Fakultas Teknik menerima hibah riset lanjutan dan wajib menyusun laporan akuntabilitas keuangan negara.', score: 0 },
      { key: 'B', text: 'Beberapa dosen Fakultas Teknik menerima hibah riset lanjutan dan tidak terbebas dari kewajiban menyusun laporan akuntabilitas keuangan negara.', score: 1 },
      { key: 'C', text: 'Sebagian peneliti yang mempublikasikan artikel di Scopus Q1 bukan merupakan dosen Fakultas Teknik.', score: 0 },
      { key: 'D', text: 'Tidak ada dosen Fakultas Teknik yang terbebas dari kewajiban laporan akuntabilitas keuangan negara.', score: 0 },
      { key: 'E', text: 'Semua pihak yang menyusun laporan akuntabilitas keuangan negara merupakan peneliti Scopus Q1.', score: 0 },
    ],
  },
  {
    orderNumber: 7,
    category: 'Penalaran Verbal',
    subTopic: 'Silogisme Kompleks',
    text:
      'Premis:\n' +
      '1. Jika suatu perekonomian mengalami defisit neraca transaksi berjalan dan suku bunga acuan domestik dipangkas, maka nilai tukar mata uang domestik akan terdepresiasi.\n' +
      '2. Jika nilai tukar mata uang domestik terdepresiasi, maka harga barang impor melonjak sehingga inflasi inti meningkat tajam.\n' +
      '3. Berdasarkan data Badan Pusat Statistik, saat ini inflasi inti tidak meningkat tajam atau harga barang impor tidak melonjak.\n' +
      '4. Diketahui secara pasti bahwa perekonomian tersebut sedang mengalami defisit neraca transaksi berjalan.\n\n' +
      'Simpulan yang niscaya benar adalah...',
    explanation:
      '**Pembahasan:**\n' +
      'Misalkan simbol logika proposisional:\n' +
      '- $D$: Defisit transaksi berjalan terjadi.\n' +
      '- $B$: Suku bunga acuan dipangkas.\n' +
      '- $T$: Nilai tukar domestik terdepresiasi.\n' +
      '- $I$: Harga barang impor melonjak dan inflasi inti meningkat ($I_1 \\land I_2$).\n\n' +
      'Analisis langkah demi langkah:\n' +
      '1. Dari Premis 1 dan Premis 2 melalui silogisme hipotetis: $(D \\land B) \\to I$.\n' +
      '2. Premis 3 menyatakan negasi dari $I$ melalui hukum De Morgan: $\\neg I$.\n' +
      '3. Berdasarkan kaidah inferensi **Modus Tollens**: Dari $(D \\land B) \\to I$ dan $\\neg I$, kita simpulkan $\\neg(D \\land B) \\equiv (\\neg D \\lor \\neg B)$.\n' +
      '4. Premis 4 menegaskan bahwa $D$ benar (terjadi defisit neraca transaksi berjalan).\n' +
      '5. Menggunakan **Silogisme Disjungtif**: Karena $(\\neg D \\lor \\neg B)$ benar dan $\\neg D$ bernilai salah ($D$ benar), maka niscaya $\\neg B$ harus bernilai benar.\n' +
      'Artinya: Suku bunga acuan domestik tidak dipangkas (Opsi A).',
    options: [
      { key: 'A', text: 'Suku bunga acuan domestik tidak dipangkas.', score: 1 },
      { key: 'B', text: 'Suku bunga acuan domestik dipangkas secara agresif.', score: 0 },
      { key: 'C', text: 'Nilai tukar mata uang domestik tetap terdepresiasi.', score: 0 },
      { key: 'D', text: 'Perekonomian tersebut tidak mengalami defisit transaksi berjalan.', score: 0 },
      { key: 'E', text: 'Inflasi umum meningkat meskipun inflasi inti tidak meningkat tajam.', score: 0 },
    ],
  },
  {
    orderNumber: 8,
    category: 'Penalaran Verbal',
    subTopic: 'Silogisme Kompleks',
    text:
      'Perhatikan pernyataan berikut:\n' +
      '1. Hanya jika seorang kandidat menguasai analisis ekonometrika spasial dan memiliki portofolio publikasi riset, kandidat tersebut dipanggil untuk mengikuti tahap wawancara beasiswa doktoral.\n' +
      '2. Semua kandidat yang dipanggil untuk mengikuti tahap wawancara beasiswa doktoral wajib mempresentasikan proposal disertasi di hadapan komite peninjau independen.\n' +
      '3. Budi tidak mempresentasikan proposal disertasi di hadapan komite peninjau independen.\n\n' +
      'Berdasarkan pernyataan di atas, kesimpulan logis yang tidak terbantahkan mengenai Budi adalah...',
    explanation:
      '**Pembahasan:**\n' +
      'Mari telaah struktur premis bersyarat:\n' +
      '- Frasa *"Hanya jika $P$, maka $Q$"* ekuivalen secara formal dengan $Q \\to P$.\n' +
      '  Artinya: Kandidat dipanggil wawancara ($W$) $\\to$ Menguasai ekonometrika spasial dan memiliki portofolio ($E \\land R$).\n' +
      '- Premis 2: Kandidat dipanggil wawancara ($W$) $\\to$ Wajib presentasi proposal ($P$).\n' +
      '- Premis 3: Budi tidak mempresentasikan proposal disertasi ($\\neg P$).\n\n' +
      'Menggunakan kaidah **Modus Tollens** pada Premis 2:\n' +
      'Karena $W \\to P$ dan diketahui $\\neg P$, maka disimpulkan secara niscaya $\\neg W$, yaitu: **Budi tidak dipanggil untuk mengikuti tahap wawancara beasiswa doktoral** (Opsi B).\n\n' +
      '*Catatan evaluasi distraktor:* Kita tidak dapat menyimpulkan apakah Budi menguasai ekonometrika atau tidak (Opsi A dan D), karena dari $\\neg W$ tidak dapat ditarik kesimpulan mengenai $P$ (kekeliruan *denying the antecedent*).',
    options: [
      { key: 'A', text: 'Budi tidak menguasai analisis ekonometrika spasial atau tidak memiliki portofolio publikasi riset.', score: 0 },
      { key: 'B', text: 'Budi tidak dipanggil untuk mengikuti tahap wawancara beasiswa doktoral.', score: 1 },
      { key: 'C', text: 'Budi menguasai analisis ekonometrika namun proposal disertasinya ditolak oleh komite peninjau.', score: 0 },
      { key: 'D', text: 'Budi memiliki portofolio riset tetapi tidak menguasai ekonometrika spasial.', score: 0 },
      { key: 'E', text: 'Komite peninjau membatalkan seluruh agenda seleksi beasiswa doktoral.', score: 0 },
    ],
  },
  {
    orderNumber: 9,
    category: 'Penalaran Verbal',
    subTopic: 'Silogisme Kompleks',
    text:
      'Perhatikan premis-premis logis berikut:\n' +
      '1. Tidak ada akademisi yang menolak asas transparansi dan keterbukaan ilmiah.\n' +
      '2. Sebagian penentang akses publikasi terbuka (*open access*) adalah individu yang menolak asas transparansi dan keterbukaan ilmiah.\n' +
      '3. Semua akademisi mewajibkan evaluasi peninjauan sejawat (*peer review*) berkala.\n\n' +
      'Berdasarkan premis di atas, manakah pernyataan berikut yang PASTI SALAH?',
    explanation:
      '**Pembahasan:**\n' +
      'Analisis Premis 1 secara mutlak:\n' +
      'Premis 1 menyatakan bentuk proposisi universal negatif ($E$): $\\forall x (Akademisi(x) \\to \\neg MenolakKeterbukaan(x))$.\n' +
      'Ini bermakna secara absolut bahwa tidak ada satu pun akademisi yang menolak asas keterbukaan ilmiah.\n\n' +
      'Evaluasi Opsi C:\n' +
      '"Terdapat akademisi yang menolak asas transparansi dan keterbukaan ilmiah namun mewajibkan evaluasi peninjauan sejawat."\n' +
      'Klausa *"terdapat akademisi yang menolak asas transparansi dan keterbukaan ilmiah"* merupakan kontradiksi langsung (negasi total) dari Premis 1.\n' +
      'Oleh karena itu, pernyataan pada Opsi C PASTI SALAH secara logis.',
    options: [
      { key: 'A', text: 'Sebagian individu yang mewajibkan evaluasi peninjauan sejawat tidak menolak asas keterbukaan ilmiah.', score: 0 },
      { key: 'B', text: 'Ada penentang akses publikasi terbuka yang bukan merupakan akademisi.', score: 0 },
      { key: 'C', text: 'Terdapat akademisi yang menolak asas transparansi dan keterbukaan ilmiah namun mewajibkan evaluasi peninjauan sejawat.', score: 1 },
      { key: 'D', text: 'Sebagian akademisi bukan merupakan penentang akses publikasi terbuka.', score: 0 },
      { key: 'E', text: 'Semua pendukung keterbukaan ilmiah belum tentu merupakan akademisi.', score: 0 },
    ],
  },
  {
    orderNumber: 10,
    category: 'Penalaran Verbal',
    subTopic: 'Silogisme Kompleks',
    text:
      'Diketahui:\n' +
      '1. Jika sistem tata kelola digital pemerintahan terintegrasi secara menyeluruh ($P$), maka kebocoran data birokrasi dapat ditekan secara signifikan ($Q$) dan kecepatan pelayanan perizinan investasi meningkat tajam ($R$).\n' +
      '2. Jika kecepatan pelayanan perizinan investasi meningkat tajam ($R$), maka peringkat kemudahan berusaha (*Ease of Doing Business*) negara tersebut akan melonjak menembus 30 besar dunia ($S$).\n' +
      '3. Evaluasi akhir tahun menunjukkan bahwa peringkat kemudahan berusaha negara tersebut belum mampu menembus 30 besar dunia ($\\neg S$).\n\n' +
      'Berdasarkan fakta dan prinsip logika formal, simpulan yang tepat adalah...',
    explanation:
      '**Pembahasan:**\n' +
      'Struktur inferensi deduktif:\n' +
      '1. $P \\to (Q \\land R)$\n' +
      '2. Karena $(Q \\land R) \\to R$, maka dengan hukum transitif diperoleh $P \\to R$.\n' +
      '3. Dari Premis 2: $R \\to S$. Maka $P \\to S$.\n' +
      '4. Fakta empiris Premis 3: $\\neg S$ (peringkat belum menembus 30 besar).\n' +
      '5. Menggunakan kaidah **Modus Tollens**: Dari $P \\to S$ dan $\\neg S$, ditarik kesimpulan niscaya $\\neg P$, yaitu: Sistem tata kelola digital pemerintahan belum terintegrasi secara menyeluruh (Opsi B).',
    options: [
      { key: 'A', text: 'Kebocoran data birokrasi dipastikan tidak dapat ditekan sama sekali.', score: 0 },
      { key: 'B', text: 'Sistem tata kelola digital pemerintahan belum terintegrasi secara menyeluruh.', score: 1 },
      { key: 'C', text: 'Kecepatan pelayanan perizinan investasi tetap melonjak meskipun kemudahan berusaha stagnan.', score: 0 },
      { key: 'D', text: 'Pemerintah berhasil mencegah seluruh potensi insiden kebocoran data birokrasi.', score: 0 },
      { key: 'E', text: 'Sistem tata kelola telah terintegrasi penuh namun regulasi investasi daerah saling tumpang-tindih.', score: 0 },
    ],
  },

  // Subtopik 3: Pemahaman Teks Kritis (11 - 15)
  {
    orderNumber: 11,
    category: 'Penalaran Verbal',
    subTopic: 'Pemahaman Teks Kritis',
    text:
      'Bacaan berikut untuk soal nomor 11 dan 12:\n\n' +
      'Transisi energi global menuju *Net Zero Emission* (NZE) tahun 2060 menghadapi paradoks rantai pasok material kritis. Peralihan dari pembangkit listrik tenaga batu bara ke panel surya fotovoltaik (PV) dan turbin angin menuntut pasokan mineral seperti nikel, kobalt, tembaga, dan litium hingga empat kali lipat lebih banyak per megawatt listrik yang dihasilkan dibandingkan pembangkitan energi fosil konvensional. Di satu sisi, akselerasi program hilirisasi industri nikel berbasis pirometalurgi seperti *Rotary Kiln Electric Furnace* (RKEF) di negara berkembang mampu mendongkrak nilai tambah ekspor secara masif dan menyerap modal asing. Namun, di sisi lain, teknologi RKEF tersebut masih mengonsumsi energi dari PLTU *captive* berbasis batu bara beremisi tinggi dalam jumlah gigawatt. Akibatnya, dekarbonisasi di hilir rantai energi hijau justru memicu peningkatan jejak emisi karbon dan deforestasi di hulu wilayah pengolahan.\n\n' +
      'Berdasarkan bacaan di atas, manakah pernyataan berikut yang paling tepat mencerminkan **asumsi tersembunyi (*unstated assumption*)** dari argumentasi penulis?',
    explanation:
      '**Pembahasan:**\n' +
      'Asumsi tersembunyi (*unstated assumption*) adalah landasan premis yang tidak diucapkan secara eksplisit namun mutlak diperlukan agar kesimpulan penulis sah.\n' +
      'Penulis menyoroti kontradiksi antara dekarbonisasi di hilir (mobil listrik/panel surya) dengan intensitas emisi di hulu (PLTU captive pada smelter nikel RKEF). Agar argumen ini bermakna sebagai "paradoks" yang perlu dikritisi, penulis mengasumsikan bahwa keberhasilan transisi energi hijau sejati tidak hanya diukur dari produk akhir yang ramah lingkungan, tetapi juga dari keberlanjutan proses di sepanjang rantai pasoknya (Opsi B). Jika emisi hulu diabaikan, maka tidak ada paradoks yang terjadi.',
    options: [
      { key: 'A', text: 'Pembangkit listrik tenaga surya dan turbin angin tidak dapat menggantikan peran batu bara dalam sistem ketenagalistrikan nasional.', score: 0 },
      { key: 'B', text: 'Keberhasilan transisi energi hijau sejati tidak hanya diukur dari produk akhir yang ramah lingkungan, tetapi juga dari keberlanjutan proses di sepanjang rantai pasoknya.', score: 1 },
      { key: 'C', text: 'Program hilirisasi mineral kritis harus dihentikan sepenuhnya demi mempertahankan kelestarian hutan hujan tropis.', score: 0 },
      { key: 'D', text: 'Teknologi pirometalurgi RKEF lebih ramah lingkungan daripada hidrometalurgi HPAL.', score: 0 },
      { key: 'E', text: 'Negara berkembang tidak memiliki kapabilitas finansial untuk mengadopsi teknologi pembangkit energi terbarukan.', score: 0 },
    ],
  },
  {
    orderNumber: 12,
    category: 'Penalaran Verbal',
    subTopic: 'Pemahaman Teks Kritis',
    text:
      'Berdasarkan teks bacaan soal nomor 11 di atas, manakah fakta atau argumen berikut yang **paling berpotensi MEMAHAMKAN (*weaken*)** kekhawatiran penulis terkait peningkatan emisi pada hulu pengolahan mineral kritis?',
    explanation:
      '**Pembahasan:**\n' +
      'Kekhawatiran utama penulis adalah: pengolahan nikel di smelter RKEF menggunakan PLTU *captive* berbahan bakar batu bara yang menghasilkan jejak emisi karbon sangat tinggi di hulu.\n' +
      'Argumen yang paling kuat melemahkan (*weaken*) kekhawatiran ini adalah bukti bahwa industri pengolahan mulai beralih menggunakan teknologi peleburan hidrometalurgi (HPAL) yang ditenagai oleh pembangkit listrik tenaga air (PLTA) dan *solar rooftop* (Opsi C). Jika sumber energi pengolahan beralih ke energi bersih rendah karbon, maka klaim bahwa hulu pengolahan meningkatkan jejak emisi batu bara menjadi gugur/terbantahkan.',
    options: [
      { key: 'A', text: 'Kapasitas produksi feronikel dan nickel pig iron ditingkatkan sebesar 40% guna memenuhi permintaan pasar baja global.', score: 0 },
      { key: 'B', text: 'Cadangan batu bara termal domestik diproyeksikan masih mencukupi kebutuhan PLTU captive hingga empat dekade mendatang.', score: 0 },
      { key: 'C', text: 'Pengembang smelter mulai beralih mengadopsi teknologi peleburan hidrometalurgi (HPAL) yang ditenagai oleh pembangkit listrik tenaga air (PLTA) dan solar rooftop.', score: 1 },
      { key: 'D', text: 'Produsen baterai kendaraan listrik mulai beralih ke teknologi Lithium Iron Phosphate (LFP) yang tidak membutuhkan nikel dan kobalt.', score: 0 },
      { key: 'E', text: 'Penerimaan negara bukan pajak dari komoditas mineral melonjak lebih dari 200% dalam dua tahun terakhir.', score: 0 },
    ],
  },
  {
    orderNumber: 13,
    category: 'Penalaran Verbal',
    subTopic: 'Pemahaman Teks Kritis',
    text:
      'Bacalah kutipan berikut:\n\n' +
      'Penerapan model kecerdasan buatan generatif (*Generative AI*) berbasis model bahasa besar (*Large Language Models*) dalam penulisan manuskrip ilmiah telah memicu perdebatan epistemik mengenai integritas akademik. Sejumlah institusi pendidikan tinggi melarang penggunaan perangkat berbasis LLM secara penuh dengan dalih pencegahan fabrikasi data (*hallucination*) dan pelanggaran orisinalitas kepenulisan. Kendati demikian, kelompok pragmatis berpendapat bahwa pelarangan total adalah langkah anakronistis yang mengabaikan potensi amplifikasi produktivitas riset. Menurut mereka, LLM dapat difungsikan secara etis sebagai instrumen asistensi sintesis literatur awal, perbaikan sintaksis bahasa asing, serta optimasi kode komputasi, asalkan prinsip transparansi atribusi dan tanggung jawab intelektual akhir tetap diemban oleh peneliti manusia secara otonom.\n\n' +
      'Tujuan utama penulis dalam paragraf tersebut adalah...',
    explanation:
      '**Pembahasan:**\n' +
      'Penulis menyajikan diskursus dari dua kutub sudut pandang yang berbeda: kekhawatiran sebagian institusi pendidikan tinggi akan risiko integritas/pelarangan, serta kontra-pandangan dari kelompok pragmatis mengenai efisiensi dan syarat penggunaan etis.\n' +
      'Dengan demikian, tujuan utama teks adalah memaparkan dialektika antara kekhawatiran integritas akademik dan peluang pemanfaatan etis AI sebagai alat bantu riset (Opsi C).',
    options: [
      { key: 'A', text: 'Mengadvokasi pelarangan permanen seluruh aplikasi AI generatif di seluruh universitas di dunia.', score: 0 },
      { key: 'B', text: 'Membuktikan bahwa halusinasi data pada model bahasa besar tidak membahayakan validitas sains.', score: 0 },
      { key: 'C', text: 'Memaparkan dialektika antara kekhawatiran integritas akademik dan peluang pemanfaatan etis AI sebagai alat bantu riset.', score: 1 },
      { key: 'D', text: 'Menolak argumentasi kaum akademisi konservatif yang menentang penggunaan perangkat lunak penerjemah otomatis.', score: 0 },
      { key: 'E', text: 'Menetapkan pedoman baku sanksi pemecatan bagi akademisi yang memanfaatkan kecerdasan buatan.', score: 0 },
    ],
  },
  {
    orderNumber: 14,
    category: 'Penalaran Verbal',
    subTopic: 'Pemahaman Teks Kritis',
    text:
      'Bacalah teks berikut:\n\n' +
      'Suatu studi komparatif ekonomi perilaku (*behavioral economics*) menemukan bahwa program bantuan sosial nontunai bersyarat (*Conditional Cash Transfers*) terbukti lebih efektif menekan prevalensi stunting anak balita dibandingkan bantuan langsung tunai (BLT) tanpa syarat pada rumah tangga berpenghasilan rendah. Para peneliti menjelaskan bahwa kewajiban verifikasi kehadiran posyandu dan pemantauan gizi bertindak sebagai *nudge* (dorongan perilaku terstruktur) yang mereduksi bias diskonto hiperbolik (*hyperbolic discounting*) kepala keluarga—yakni kecenderungan psikologis mengorbankan investasi gizi jangka panjang anak demi konsumsi barang jangka pendek non-esensial.\n\n' +
      'Berdasarkan kutipan teks di atas, fenomena *hyperbolic discounting* termanifestasi dalam tindakan nyata berupa...',
    explanation:
      '**Pembahasan:**\n' +
      'Teks mendefinisikan *hyperbolic discounting* secara eksplisit: *"yakni kecenderungan psikologis mengorbankan investasi gizi jangka panjang anak demi konsumsi barang jangka pendek non-esensial".*\n' +
      'Perilaku yang paling mencerminkan fenomena tersebut adalah: Mengalokasikan dana bantuan tunai untuk membeli rokok atau pulsa daripada membeli bahan pangan bergizi kaya protein bagi anak balita (Opsi B).',
    options: [
      { key: 'A', text: 'Menyisihkan sebagian besar pendapatan bulanan untuk instrumen tabungan pendidikan anak.', score: 0 },
      { key: 'B', text: 'Mengalokasikan dana bantuan tunai untuk membeli rokok atau pulsa daripada membeli bahan pangan bergizi kaya protein bagi anak balita.', score: 1 },
      { key: 'C', text: 'Mengutamakan kunjungan posyandu dan konsultasi dokter anak secara terjadwal.', score: 0 },
      { key: 'D', text: 'Mengalihkan modal konsumsi harian menjadi modal kerja usaha mikro yang berkelanjutan.', score: 0 },
      { key: 'E', text: 'Menolak menerima bantuan sosial dari pemerintah karena kekhawatiran sanksi administrasi.', score: 0 },
    ],
  },
  {
    orderNumber: 15,
    category: 'Penalaran Verbal',
    subTopic: 'Pemahaman Teks Kritis',
    text:
      'Bacalah teks berikut:\n\n' +
      'Meskipun penetrasi teknologi telemedisin meningkat drastis pascapandemi, disparitas akses layanan kesehatan di daerah Tertinggal, Terdepan, dan Terluar (3T) belum teratasi secara substansial. Masalah mendasarnya bukan semata-mata ketiadaan aplikasi gawai pintar, melainkan kesenjangan infrastruktur digital berupa latensi jaringan nirkabel serta ketiadaan pasokan listrik stabil untuk fasilitas kesehatan primer. Selain itu, keengganan tenaga dokter spesialis untuk ditempatkan secara permanen serta terbatasnya integrasi rekam medis elektronik antarfasyankes memperparah inefisiensi rujukan klinis.\n\n' +
      'Simpulan yang **paling koheren dan komprehensif** dengan gagasan teks adalah...',
    explanation:
      '**Pembahasan:**\n' +
      'Inti gagasan teks: adopsi aplikasi telemedisin tidak serta merta menyelesaikan disparitas layanan kesehatan karena kendala fundamental berada pada infrastruktur fisik dasar (listrik, latensi jaringan), ketersediaan dokter spesialis, dan integrasi rekam medis.\n' +
      'Simpulan yang paling koheren: Solusi digitalisasi kesehatan akan mengalami inefisiensi sistemik tanpa dibarengi pemerataan infrastruktur fisik dasar dan distribusi tenaga medis di daerah 3T (Opsi B).',
    options: [
      { key: 'A', text: 'Tingginya penetrasi gawai pintar di kawasan perkotaan menjadi pemicu utama kegagalan program telemedisin nasional.', score: 0 },
      { key: 'B', text: 'Solusi digitalisasi kesehatan akan mengalami inefisiensi sistemik tanpa dibarengi pemerataan infrastruktur fisik dasar dan distribusi tenaga medis di daerah 3T.', score: 1 },
      { key: 'C', text: 'Pengembangan aplikasi telemedisin baru dengan fitur mutakhir merupakan satu-satunya solusi mendesak di daerah terpencil.', score: 0 },
      { key: 'D', text: 'Dokter spesialis menolak melayani pasien melalui konsultasi daring di seluruh wilayah Indonesia.', score: 0 },
      { key: 'E', text: 'Pembangunan kabel serat optik otomatis menuntaskan seluruh rantai rujukan klinis fasyankes primer.', score: 0 },
    ],
  },

  // ========================================================
  // PENALARAN KUANTITATIF / NUMERIK (16 - 30)
  // Subtopik 4: Aritmetika Sosial & Keuangan (16 - 20)
  // ========================================================
  {
    orderNumber: 16,
    category: 'Penalaran Kuantitatif',
    subTopic: 'Aritmetika Sosial & Keuangan',
    text:
      'Seorang manajer investasi mengelola portofolio senilai $\\text{Rp}1.200.000.000,00$ yang dialokasikan ke dalam dua instrumen keuangan: Surat Berharga Negara (SBN) dengan imbal hasil tetap $6{,}5\\%$ per tahun dan Reksadana Saham dengan ekspektasi imbal hasil $11{,}5\\%$ per tahun. Jika total imbal hasil tahunan yang ditargetkan dari kombinasi kedua instrumen tersebut adalah tepat $\\text{Rp}108.000.000,00$, berapakah porsi dana yang harus dialokasikan pada Reksadana Saham?',
    explanation:
      '**Pembahasan:**\n' +
      'Misalkan alokasi dana pada Reksadana Saham adalah $x$ rupiah, maka alokasi pada SBN adalah $(1.200.000.000 - x)$ rupiah.\n\n' +
      'Persamaan total imbal hasil tahunan:\n' +
      '$$0{,}065(1.200.000.000 - x) + 0{,}115x = 108.000.000$$\n' +
      '$$78.000.000 - 0{,}065x + 0{,}115x = 108.000.000$$\n' +
      '$$0{,}050x = 108.000.000 - 78.000.000$$\n' +
      '$$0{,}05x = 30.000.000$$\n' +
      '$$x = \\frac{30.000.000}{0{,}05} = 600.000.000$$\n\n' +
      'Jadi, porsi dana yang harus dialokasikan pada Reksadana Saham adalah $\\text{Rp}600.000.000,00$ (Opsi B).',
    options: [
      { key: 'A', text: 'Rp450.000.000,00', score: 0 },
      { key: 'B', text: 'Rp600.000.000,00', score: 1 },
      { key: 'C', text: 'Rp720.000.000,00', score: 0 },
      { key: 'D', text: 'Rp500.000.000,00', score: 0 },
      { key: 'E', text: 'Rp480.000.000,00', score: 0 },
    ],
  },
  {
    orderNumber: 17,
    category: 'Penalaran Kuantitatif',
    subTopic: 'Aritmetika Sosial & Keuangan',
    text:
      'Sebuah mesin industri dibeli suatu perusahaan manufaktur dengan harga awal $M_0 = \\text{Rp}500.000.000,00$. Nilai buku mesin mengalami penyusutan (*depreciation*) dengan laju depresiasi eksponensial konstan sebesar $r = 20\\%$ per tahun mengikuti model nilai buku $M(t) = M_0 (1 - r)^t$. Berapakah nilai buku mesin tersebut setelah beroperasi selama $t = 3$ tahun?',
    explanation:
      '**Pembahasan:**\n' +
      'Model penyusutan nilai buku eksponensial:\n' +
      '$$M(t) = M_0 (1 - r)^t$$\n' +
      'Diketahui:\n' +
      '- $M_0 = 500.000.000$\n' +
      '- $r = 0{,}20 \\implies (1 - r) = 0{,}80$\n' +
      '- $t = 3$ tahun\n\n' +
      'Perhitungan:\n' +
      '$$M(3) = 500.000.000 \\times (0{,}80)^3$$\n' +
      'Karena $(0{,}8)^3 = 0{,}512$, maka:\n' +
      '$$M(3) = 500.000.000 \\times 0{,}512 = \\text{Rp}256.000.000,00$$\n\n' +
      'Jadi, nilai buku mesin pada akhir tahun ke-3 adalah $\\text{Rp}256.000.000,00$ (Opsi C).',
    options: [
      { key: 'A', text: 'Rp200.000.000,00', score: 0 },
      { key: 'B', text: 'Rp244.000.000,00', score: 0 },
      { key: 'C', text: 'Rp256.000.000,00', score: 1 },
      { key: 'D', text: 'Rp320.000.000,00', score: 0 },
      { key: 'E', text: 'Rp288.000.000,00', score: 0 },
    ],
  },
  {
    orderNumber: 18,
    category: 'Penalaran Kuantitatif',
    subTopic: 'Aritmetika Sosial & Keuangan',
    text:
      'Proyek digitalisasi arsip nasional jika dikerjakan oleh 12 orang analis senior dapat diselesaikan dalam waktu 20 hari kerja. Sementara itu, jika dikerjakan oleh 16 orang asisten muda, proyek tersebut membutuhkan waktu 30 hari kerja. Jika proyek tersebut dikerjakan bersama-sama oleh 8 orang analis senior dan 16 orang asisten muda secara serentak, berapa harikah proyek tersebut akan selesai tuntas?',
    explanation:
      '**Pembahasan:**\n' +
      'Misalkan laju produktivitas kerja per orang per hari untuk Analis Senior adalah $S$ dan untuk Asisten Muda adalah $M$.\n\n' +
      '1. Total beban kerja proyek:\n' +
      '$$W = 12 \\times 20 \\times S = 240S \\implies S = \\frac{1}{240} \\text{ bagian proyek/hari per orang}$$\n' +
      '$$W = 16 \\times 30 \\times M = 480M \\implies M = \\frac{1}{480} \\text{ bagian proyek/hari per orang}$$\n\n' +
      '2. Laju kerja gabungan dari 8 analis senior dan 16 asisten muda:\n' +
      '$$V_{\\text{gabungan}} = 8S + 16M = 8\\left(\\frac{1}{240}\\right) + 16\\left(\\frac{1}{480}\\right)$$\n' +
      '$$V_{\\text{gabungan}} = \\frac{8}{240} + \\frac{16}{480} = \\frac{1}{30} + \\frac{1}{30} = \\frac{2}{30} = \\frac{1}{15} \\text{ bagian proyek/hari}$$\n\n' +
      '3. Waktu penyelesaian $T$:\n' +
      '$$T = \\frac{1}{V_{\\text{gabungan}}} = \\frac{1}{\\frac{1}{15}} = 15 \\text{ hari kerja}$$\n\n' +
      'Jadi, proyek akan tuntas dalam 15 hari (Opsi C).',
    options: [
      { key: 'A', text: '12 hari', score: 0 },
      { key: 'B', text: '14 hari', score: 0 },
      { key: 'C', text: '15 hari', score: 1 },
      { key: 'D', text: '18 hari', score: 0 },
      { key: 'E', text: '20 hari', score: 0 },
    ],
  },
  {
    orderNumber: 19,
    category: 'Penalaran Kuantitatif',
    subTopic: 'Aritmetika Sosial & Keuangan',
    text:
      'Seorang eksportir mebel menjual kontainer furnitur dengan margin keuntungan kotor awal sebesar $25\\%$ dari harga pokok penjualan (HPP). Karena lonjakan tarif pengapalan laut global (*freight cost*), HPP produk tersebut meningkat sebesar $20\\%$. Jika eksportir ingin mempertahankan nilai nominal keuntungan (dalam rupiah) yang sama persis seperti sebelum lonjakan biaya pengapalan, berapakah persentase margin keuntungan baru terhadap HPP yang baru?',
    explanation:
      '**Pembahasan:**\n' +
      'Misalkan:\n' +
      '- HPP awal $= H_0 = 100$.\n' +
      '- Keuntungan nominal awal $= 25\\% \\times 100 = 25$.\n' +
      '- Karena HPP naik $20\\%$, maka HPP baru $= H_1 = 100 \\times (1 + 0{,}20) = 120$.\n\n' +
      'Eksportir menginginkan keuntungan nominal yang sama persis, yaitu $U = 25$.\n' +
      'Maka rasio margin keuntungan terhadap HPP baru adalah:\n' +
      '$$\\text{Margin Baru} = \\frac{U}{H_1} \\times 100\\% = \\frac{25}{120} \\times 100\\% = \\frac{5}{24} \\times 100\\% \\approx 20{,}833\\%$$\n\n' +
      'Jadi, persentase margin keuntungan baru terhadap HPP yang baru adalah $20{,}83\\%$ (Opsi C).',
    options: [
      { key: 'A', text: '18,50%', score: 0 },
      { key: 'B', text: '20,00%', score: 0 },
      { key: 'C', text: '20,83%', score: 1 },
      { key: 'D', text: '22,50%', score: 0 },
      { key: 'E', text: '16,67%', score: 0 },
    ],
  },
  {
    orderNumber: 20,
    category: 'Penalaran Kuantitatif',
    subTopic: 'Aritmetika Sosial & Keuangan',
    text:
      'Suatu lembaga yayasan beasiswa menempatkan dana abadi (*endowment fund*) sebesar $\\text{Rp}2.000.000.000,00$ pada instrumen deposito perbankan dengan bagi hasil tahunan efektif $7{,}2\\%$ yang dikapitalisasi setiap semester ($6$ bulan sekali). Berapakah total akumulasi nilai dana abadi tersebut pada akhir tahun ke-2?\n(Gunakan estimasi $(1{,}036)^4 \\approx 1{,}1518$)',
    explanation:
      '**Pembahasan:**\n' +
      'Formula bunga majemuk kapitalisasi berkala:\n' +
      '$$A = P \\left(1 + \\frac{r}{m}\\right)^{m \\cdot t}$$\n' +
      'Dengan parameter:\n' +
      '- Pokok awal $P = \\text{Rp}2.000.000.000,00$\n' +
      '- Suku bagi hasil per semester $= \\frac{7{,}2\\%}{2} = 3{,}6\\% = 0{,}036$\n' +
      '- Frekuensi penggabungan $m = 2$ kali per tahun\n' +
      '- Waktu $t = 2$ tahun $\\implies n = m \\cdot t = 2 \\times 2 = 4$ periode\n\n' +
      'Perhitungan:\n' +
      '$$A = 2.000.000.000 \\times (1 + 0{,}036)^4 = 2.000.000.000 \\times (1{,}036)^4$$\n' +
      '$$A = 2.000.000.000 \\times 1{,}1518 = \\text{Rp}2.303.600.000,00$$\n\n' +
      'Jadi, total akumulasi nilai dana abadi pada akhir tahun ke-2 adalah $\\text{Rp}2.303.600.000,00$ (Opsi A).',
    options: [
      { key: 'A', text: 'Rp2.303.600.000,00', score: 1 },
      { key: 'B', text: 'Rp2.288.000.000,00', score: 0 },
      { key: 'C', text: 'Rp2.320.400.000,00', score: 0 },
      { key: 'D', text: 'Rp2.345.000.000,00', score: 0 },
      { key: 'E', text: 'Rp2.296.500.000,00', score: 0 },
    ],
  },

  // Subtopik 5: Aljabar Terapan (21 - 25)
  {
    orderNumber: 21,
    category: 'Penalaran Kuantitatif',
    subTopic: 'Aljabar Terapan',
    text:
      'Fungsi biaya total (dalam jutaan rupiah) suatu perusahaan rintisan teknologi dinyatakan dengan persamaan kuadrat $C(q) = 2q^2 - 40q + 350$, di mana $q$ merepresentasikan kuantitas layanan (dalam ratusan pengguna aktif bulanan). Berapakah biaya minimum perusahaan tersebut dan pada kapasitas kuantitas $q$ berapakah biaya minimum itu tercapai?',
    explanation:
      '**Pembahasan:**\n' +
      'Fungsi kuadrat $C(q) = aq^2 + bq + c$ dengan koefisien $a = 2$, $b = -40$, dan konstanta $c = 350$.\n' +
      'Karena $a = 2 > 0$, parabola membuka ke atas dan mencapai nilai minimum di sumbu simetri:\n' +
      '$$q^* = -\\frac{b}{2a} = -\\frac{-40}{2(2)} = \\frac{40}{4} = 10$$\n\n' +
      'Biaya minimum dievaluasi pada $q^* = 10$:\n' +
      '$$C(10) = 2(10)^2 - 40(10) + 350 = 2(100) - 400 + 350$$\n' +
      '$$C(10) = 200 - 400 + 350 = 150 \\text{ juta rupiah}$$\n\n' +
      'Jadi, biaya minimum adalah $\\text{Rp}150.000.000,00$ pada kuantitas $q = 10$ (Opsi A).',
    options: [
      { key: 'A', text: 'Biaya minimum Rp150.000.000,00 pada q = 10', score: 1 },
      { key: 'B', text: 'Biaya minimum Rp120.000.000,00 pada q = 8', score: 0 },
      { key: 'C', text: 'Biaya minimum Rp150.000.000,00 pada q = 20', score: 0 },
      { key: 'D', text: 'Biaya minimum Rp200.000.000,00 pada q = 10', score: 0 },
      { key: 'E', text: 'Biaya minimum Rp180.000.000,00 pada q = 12', score: 0 },
    ],
  },
  {
    orderNumber: 22,
    category: 'Penalaran Kuantitatif',
    subTopic: 'Aljabar Terapan',
    text:
      'Dua variabel riil positif $x$ dan $y$ memenuhi sistem persamaan logaritmik dan linear berikut:\n' +
      '$$\\begin{cases} \\log_2(x) + \\log_2(y) = 5 \\\\ 2x - 3y = 4 \\end{cases}$$\n' +
      'Berapakah nilai dari ekspresi $x^2 + y^2$?',
    explanation:
      '**Pembahasan:**\n' +
      '1. Dari persamaan logaritma:\n' +
      '$$\\log_2(x) + \\log_2(y) = 5 \\implies \\log_2(xy) = 5 \\implies xy = 2^5 = 32$$\n\n' +
      '2. Dari persamaan linear:\n' +
      '$$2x - 3y = 4 \\implies x = \\frac{3y + 4}{2}$$\n\n' +
      '3. Substitusikan $x$ ke dalam $xy = 32$:\n' +
      '$$\\left(\\frac{3y + 4}{2}\\right) y = 32 \\implies 3y^2 + 4y = 64 \\implies 3y^2 + 4y - 64 = 0$$\n\n' +
      '4. Faktorkan persamaan kuadrat:\n' +
      '$$(3y + 16)(y - 4) = 0$$\n' +
      'Karena disyaratkan $y > 0$, maka akar yang memenuhi adalah $y = 4$.\n\n' +
      '5. Cari nilai $x$:\n' +
      '$$x = \\frac{3(4) + 4}{2} = \\frac{12 + 4}{2} = \\frac{16}{2} = 8$$\n\n' +
      '6. Evaluasi ekspresi $x^2 + y^2$:\n' +
      '$$x^2 + y^2 = 8^2 + 4^2 = 64 + 16 = 80$$\n\n' +
      'Jadi, nilai $x^2 + y^2 = 80$ (Opsi B).',
    options: [
      { key: 'A', text: '74', score: 0 },
      { key: 'B', text: '80', score: 1 },
      { key: 'C', text: '100', score: 0 },
      { key: 'D', text: '128', score: 0 },
      { key: 'E', text: '68', score: 0 },
    ],
  },
  {
    orderNumber: 23,
    category: 'Penalaran Kuantitatif',
    subTopic: 'Aljabar Terapan',
    text:
      'Diketahui suatu deret geometri tak hingga konvergen mempunyai suku pertama $a$ dan rasio $r$ dengan $|r| < 1$. Jika jumlah seluruh suku deret tersebut adalah $S = 18$ dan jumlah suku-suku yang berindeks genap ($u_2 + u_4 + u_6 + \\dots$) adalah $S_{\\text{genap}} = 6$, berapakah nilai rasio $r$ dan suku pertama $a$?',
    explanation:
      '**Pembahasan:**\n' +
      '1. Deret geometri tak hingga penuh:\n' +
      '$$S = \\frac{a}{1 - r} = 18$$\n\n' +
      '2. Deret suku-suku berindeks genap:\n' +
      '$$S_{\\text{genap}} = u_2 + u_4 + u_6 + \\dots = ar + ar^3 + ar^5 + \\dots$$\n' +
      'Ini adalah deret geometri dengan suku awal $a\' = ar$ dan rasio baru $r\' = r^2$:\n' +
      '$$S_{\\text{genap}} = \\frac{ar}{1 - r^2} = \\frac{a \\cdot r}{(1 - r)(1 + r)} = \\left(\\frac{a}{1 - r}\\right) \\frac{r}{1 + r}$$\n\n' +
      '3. Substitusikan $S = 18$ dan $S_{\\text{genap}} = 6$:\n' +
      '$$18 \\cdot \\frac{r}{1 + r} = 6 \\implies \\frac{r}{1 + r} = \\frac{6}{18} = \\frac{1}{3}$$\n' +
      '$$3r = 1 + r \\implies 2r = 1 \\implies r = \\frac{1}{2}$$\n\n' +
      '4. Cari suku pertama $a$:\n' +
      '$$\\frac{a}{1 - \\frac{1}{2}} = 18 \\implies \\frac{a}{\\frac{1}{2}} = 18 \\implies a = 18 \\times \\frac{1}{2} = 9$$\n\n' +
      'Jadi, diperoleh rasio $r = \\frac{1}{2}$ dan suku pertama $a = 9$ (Opsi B).',
    options: [
      { key: 'A', text: 'r = 1/3 dan a = 12', score: 0 },
      { key: 'B', text: 'r = 1/2 dan a = 9', score: 1 },
      { key: 'C', text: 'r = 1/3 dan a = 15', score: 0 },
      { key: 'D', text: 'r = 2/3 dan a = 6', score: 0 },
      { key: 'E', text: 'r = 1/4 dan a = 13,5', score: 0 },
    ],
  },
  {
    orderNumber: 24,
    category: 'Penalaran Kuantitatif',
    subTopic: 'Aljabar Terapan',
    text:
      'Sebuah tangki air memiliki dua pipa pengisi (pipa A dan pipa B) serta satu pipa pembuangan (pipa C). Pipa A dapat mengisi tangki kosong hingga penuh dalam waktu 4 jam, pipa B dalam waktu 6 jam, sedangkan pipa C dapat mengosongkan tangki yang penuh dalam waktu 8 jam. Jika awalnya tangki dalam keadaan kosong, kemudian ketiga pipa dibuka secara bersamaan, berapakah waktu yang diperlukan hingga tangki tersebut terisi tepat $\\frac{7}{8}$ bagian?',
    explanation:
      '**Pembahasan:**\n' +
      'Laju debit netto per jam dari masing-masing pipa:\n' +
      '- Pipa A (mengisi): $v_A = \\frac{1}{4}$ tangki/jam\n' +
      '- Pipa B (mengisi): $v_B = \\frac{1}{6}$ tangki/jam\n' +
      '- Pipa C (mengosongkan): $v_C = -\\frac{1}{8}$ tangki/jam\n\n' +
      'Laju pengisian total saat ketiga pipa dibuka bersamaan:\n' +
      '$$v_{\\text{net}} = \\frac{1}{4} + \\frac{1}{6} - \\frac{1}{8}$$\n' +
      'Menyamakan penyebut ke KPK yaitu 24:\n' +
      '$$v_{\\text{net}} = \\frac{6}{24} + \\frac{4}{24} - \\frac{3}{24} = \\frac{7}{24} \\text{ tangki/jam}$$\n\n' +
      'Volume air yang ingin diisi adalah $V = \\frac{7}{8}$ tangki.\n' +
      'Waktu yang dibutuhkan $t$:\n' +
      '$$t = \\frac{V}{v_{\\text{net}}} = \\frac{\\frac{7}{8}}{\\frac{7}{24}} = \\frac{7}{8} \\times \\frac{24}{7} = \\frac{24}{8} = 3{,}0 \\text{ jam}$$\n\n' +
      'Jadi, dibutuhkan waktu tepat 3,0 jam (Opsi B).',
    options: [
      { key: 'A', text: '2,4 jam', score: 0 },
      { key: 'B', text: '3,0 jam', score: 1 },
      { key: 'C', text: '3,2 jam', score: 0 },
      { key: 'D', text: '3,5 jam', score: 0 },
      { key: 'E', text: '2,8 jam', score: 0 },
    ],
  },
  {
    orderNumber: 25,
    category: 'Penalaran Kuantitatif',
    subTopic: 'Aljabar Terapan',
    text:
      'Jika $x$ dan $y$ adalah pasangan bilangan bulat positif ($x, y \\in \\mathbb{Z}^+$) yang memenuhi sistem pertidaksamaan linear:\n' +
      '$$\\begin{cases} 3x + 4y \\le 24 \\\\ x - y \\ge 1 \\\\ x \\ge 2 \\end{cases}$$\n' +
      'Berapakah nilai maksimum dari fungsi objektif $Z = 5x + 3y$?',
    explanation:
      '**Pembahasan:**\n' +
      'Kita mencari pasangan bilangan bulat positif $(x, y) \\in \\{1, 2, 3, \\dots\\}$ yang memenuhi:\n' +
      '1. $x \\ge 2$\n' +
      '2. $y \\le x - 1$\n' +
      '3. $4y \\le 24 - 3x \\implies y \\le \\frac{24 - 3x}{4}$\n\n' +
      'Uji seluruh kemungkinan nilai integer $x \\ge 2$:\n' +
      '- Untuk $x = 2$: $y \\le 1 \\implies y = 1$. Cek $3(2)+4(1)=10 \\le 24$. Nilai $Z = 5(2)+3(1) = 13$.\n' +
      '- Untuk $x = 3$: $y \\le 2$. Nilai $y \\le \\frac{15}{4} = 3{,}75$.\n' +
      '  * $y = 1 \\implies Z = 5(3)+3(1) = 18$\n' +
      '  * $y = 2 \\implies 3(3)+4(2)=17 \\le 24 \\implies Z = 5(3)+3(2) = 21$\n' +
      '- Untuk $x = 4$: $y \\le 3$. Nilai $y \\le \\frac{12}{4} = 3$.\n' +
      '  * $y = 1 \\implies Z = 5(4)+3(1) = 23$\n' +
      '  * $y = 2 \\implies Z = 5(4)+3(2) = 26$\n' +
      '  * $y = 3 \\implies 3(4)+4(3)=24 \\le 24 \\implies Z = 5(4)+3(3) = 29$\n' +
      '- Untuk $x = 5$: $y \\le 4$. Nilai $y \\le \\frac{24-15}{4} = 2{,}25 \\implies y \\in \\{1, 2\\}$.\n' +
      '  * $y = 1 \\implies Z = 5(5)+3(1) = 28$\n' +
      '  * $y = 2 \\implies 3(5)+4(2)=23 \\le 24 \\implies Z = 5(5)+3(2) = 31$\n' +
      '- Untuk $x = 6$: $y \\le 5$. Nilai $y \\le \\frac{24-18}{4} = 1{,}5 \\implies y = 1$.\n' +
      '  * $y = 1 \\implies x - y = 6 - 1 = 5 \\ge 1$, $3(6)+4(1)=22 \\le 24$.\n' +
      '  * Nilai $Z = 5(6) + 3(1) = 30 + 3 = 33$.\n' +
      '- Untuk $x \\ge 7$: $3(7) + 4y = 21 + 4y \\le 24 \\implies 4y \\le 3 \\implies y < 1$, tidak ada solusi bilangan bulat positif.\n\n' +
      'Membandingkan seluruh nilai $Z \\in \\{13, 18, 21, 23, 26, 29, 28, 31, 33\\}$, diperoleh nilai maksimum adalah 33 pada titik $(6, 1)$ (Opsi E).',
    options: [
      { key: 'A', text: '29', score: 0 },
      { key: 'B', text: '31', score: 0 },
      { key: 'C', text: '34', score: 0 },
      { key: 'D', text: '26', score: 0 },
      { key: 'E', text: '33', score: 1 },
    ],
  },

  // Subtopik 6: Interpretasi Data Tabel & Grafik (26 - 30)
  {
    orderNumber: 26,
    category: 'Penalaran Kuantitatif',
    subTopic: 'Interpretasi Data Tabel & Grafik',
    text:
      'Perhatikan tabel kinerja nilai ekspor 4 komoditas strategis nasional (dalam juta USD) periode 2023 - 2024 berikut:\n\n' +
      '| Komoditas Strategis | Nilai Ekspor 2023 | Nilai Ekspor 2024 |\n' +
      '| :--- | :---: | :---: |\n' +
      '| Nikel & Turunannya | $4.000$ | $5.200$ |\n' +
      '| Minyak Kelapa Sawit (CPO) | $6.000$ | $6.900$ |\n' +
      '| Batubara | $8.000$ | $7.200$ |\n' +
      '| Tekstil & Produk Tekstil | $2.500$ | $3.100$ |\n\n' +
      'Komoditas manakah yang mencatatkan **persentase pertumbuhan nilai ekspor tertinggi** dari tahun 2023 ke tahun 2024?',
    explanation:
      '**Pembahasan:**\n' +
      'Hitung persentase laju pertumbuhan masing-masing komoditas:\n' +
      '$$\\text{Pertumbuhan} = \\frac{\\text{Nilai 2024} - \\text{Nilai 2023}}{\\text{Nilai 2023}} \\times 100\\%$$\n\n' +
      '1. Nikel & Turunannya:\n' +
      '$$\\frac{5.200 - 4.000}{4.000} \\times 100\\% = \\frac{1.200}{4.000} \\times 100\\% = 30{,}0\\%$$\n' +
      '2. Minyak Kelapa Sawit (CPO):\n' +
      '$$\\frac{6.900 - 6.000}{6.000} \\times 100\\% = \\frac{900}{6.000} \\times 100\\% = 15{,}0\\%$$\n' +
      '3. Batubara:\n' +
      '$$\\frac{7.200 - 8.000}{8.000} \\times 100\\% = -\\frac{800}{8.000} \\times 100\\% = -10{,}0\\% \\text{ (kontraksi)}$$\n' +
      '4. Tekstil & Produk Tekstil:\n' +
      '$$\\frac{3.100 - 2.500}{2.500} \\times 100\\% = \\frac{600}{2.500} \\times 100\\% = 24{,}0\\%$$\n\n' +
      'Pertumbuhan persentase tertinggi diraih oleh komoditas Nikel & Turunannya sebesar $30{,}0\\%$ (Opsi A).',
    options: [
      { key: 'A', text: 'Nikel & Turunannya', score: 1 },
      { key: 'B', text: 'Minyak Kelapa Sawit (CPO)', score: 0 },
      { key: 'C', text: 'Batubara', score: 0 },
      { key: 'D', text: 'Tekstil & Produk Tekstil', score: 0 },
      { key: 'E', text: 'Nikel dan Tekstil memiliki persentase yang sama', score: 0 },
    ],
  },
  {
    orderNumber: 27,
    category: 'Penalaran Kuantitatif',
    subTopic: 'Interpretasi Data Tabel & Grafik',
    text:
      'Berdasarkan data tabel kinerja ekspor pada soal nomor 26 di atas, berapakah persentase kontribusi ekspor Minyak Kelapa Sawit (CPO) terhadap total nilai ekspor keempat komoditas tersebut secara agregat pada tahun 2023?',
    explanation:
      '**Pembahasan:**\n' +
      '1. Total nilai ekspor keempat komoditas pada tahun 2023:\n' +
      '$$\\text{Total 2023} = 4.000 + 6.000 + 8.000 + 2.500 = 20.500 \\text{ juta USD}$$\n\n' +
      '2. Nilai ekspor komoditas CPO tahun 2023:\n' +
      '$$\\text{Ekspor CPO} = 6.000 \\text{ juta USD}$$\n\n' +
      '3. Persentase kontribusi pangsa ekspor CPO:\n' +
      '$$\\text{Kontribusi} = \\frac{6.000}{20.500} \\times 100\\% = \\frac{60}{205} \\times 100\\% = \\frac{12}{41} \\times 100\\% \\approx 29{,}268\\% \\approx 29{,}27\\%$$\n\n' +
      'Jadi, kontribusi ekspor CPO adalah $29{,}27\\%$ (Opsi B).',
    options: [
      { key: 'A', text: '24,50%', score: 0 },
      { key: 'B', text: '29,27%', score: 1 },
      { key: 'C', text: '31,45%', score: 0 },
      { key: 'D', text: '33,33%', score: 0 },
      { key: 'E', text: '28,00%', score: 0 },
    ],
  },
  {
    orderNumber: 28,
    category: 'Penalaran Kuantitatif',
    subTopic: 'Interpretasi Data Tabel & Grafik',
    text:
      'Tabel berikut menunjukkan distribusi frekuensi perolehan skor ujian seleksi tertulis 100 kandidat beasiswa pascasarjana:\n\n' +
      '| Rentang Skor | Frekuensi ($f_i$) |\n' +
      '| :---: | :---: |\n' +
      '| $51 - 60$ | $10$ |\n' +
      '| $61 - 70$ | $20$ |\n' +
      '| $71 - 80$ | $35$ |\n' +
      '| $81 - 90$ | $25$ |\n' +
      '| $91 - 100$ | $10$ |\n\n' +
      'Berapakah nilai median ($Me$) dari distribusi data kelompok tersebut?',
    explanation:
      '**Pembahasan:**\n' +
      '1. Ukuran sampel $N = 100$. Posisi median terletak pada urutan data ke-$\\frac{N}{2} = 50$.\n\n' +
      '2. Menentukan frekuensi kumulatif ($F_k$):\n' +
      '- Kelas $51 - 60$: $F_k = 10$\n' +
      '- Kelas $61 - 70$: $F_k = 10 + 20 = 30$\n' +
      '- Kelas $71 - 80$: $F_k = 30 + 35 = 65$ (karena data ke-50 berada di sini, kelas median adalah $71 - 80$).\n\n' +
      '3. Parameter kelas median:\n' +
      '- Tepi bawah kelas median: $L = 71 - 0{,}5 = 70{,}5$\n' +
      '- Panjang interval kelas: $p = 60 - 51 + 1 = 10$\n' +
      '- Frekuensi kumulatif sebelum kelas median: $F_k = 30$\n' +
      '- Frekuensi kelas median: $f_m = 35$\n\n' +
      '4. Rumus Median data kelompok:\n' +
      '$$Me = L + p \\left(\\frac{\\frac{N}{2} - F_k}{f_m}\\right)$$\n' +
      '$$Me = 70{,}5 + 10 \\left(\\frac{50 - 30}{35}\\right) = 70{,}5 + 10 \\left(\\frac{20}{35}\\right)$$\n' +
      '$$Me = 70{,}5 + \\frac{200}{35} = 70{,}5 + 5{,}714 = 76{,}214 \\approx 76{,}21$$\n\n' +
      'Jadi, nilai median distribusi skor tersebut adalah 76,21 (Opsi C).',
    options: [
      { key: 'A', text: '74,50', score: 0 },
      { key: 'B', text: '75,71', score: 0 },
      { key: 'C', text: '76,21', score: 1 },
      { key: 'D', text: '75,21', score: 0 },
      { key: 'E', text: '77,00', score: 0 },
    ],
  },
  {
    orderNumber: 29,
    category: 'Penalaran Kuantitatif',
    subTopic: 'Interpretasi Data Tabel & Grafik',
    text:
      'Tabel berikut memuat target dan realisasi penerimaan pajak (dalam triliun rupiah) di lima Kantor Wilayah (Kanwil) pada suatu tahun fiskal:\n\n' +
      '| Kantor Wilayah | Target Anggaran ($T_i$) | Realisasi Penerimaan ($R_i$) |\n' +
      '| :--- | :---: | :---: |\n' +
      '| Kanwil Wilayah I | $120$ | $126$ |\n' +
      '| Kanwil Wilayah II | $90$ | $81$ |\n' +
      '| Kanwil Wilayah III | $150$ | $165$ |\n' +
      '| Kanwil Wilayah IV | $200$ | $180$ |\n' +
      '| Kanwil Wilayah V | $80$ | $88$ |\n\n' +
      'Rata-rata tertimbang (*weighted average*) dari persentase capaian realisasi penerimaan terhadap target untuk kelima Kanwil tersebut secara gabungan adalah...',
    explanation:
      '**Pembahasan:**\n' +
      'Rata-rata persentase capaian tertimbang gabungan dihitung berdasarkan rasio total penerimaan agregat terhadap total target agregat:\n' +
      '$$\\text{Capaian Gabungan} = \\frac{\\sum R_i}{\\sum T_i} \\times 100\\%$$\n\n' +
      '1. Total target penerimaan $\\sum T_i$:\n' +
      '$$\\sum T_i = 120 + 90 + 150 + 200 + 80 = 640 \\text{ triliun rupiah}$$\n\n' +
      '2. Total realisasi penerimaan $\\sum R_i$:\n' +
      '$$\\sum R_i = 126 + 81 + 165 + 180 + 88 = 640 \\text{ triliun rupiah}$$\n\n' +
      '3. Persentase capaian gabungan:\n' +
      '$$\\text{Capaian Gabungan} = \\frac{640}{640} \\times 100\\% = 100{,}0\\%$$\n\n' +
      'Jadi, capaian agregat secara gabungan tepat $100{,}0\\%$ (Opsi C).',
    options: [
      { key: 'A', text: '102,5%', score: 0 },
      { key: 'B', text: '101,0%', score: 0 },
      { key: 'C', text: '100,0%', score: 1 },
      { key: 'D', text: '98,5%', score: 0 },
      { key: 'E', text: '103,2%', score: 0 },
    ],
  },
  {
    orderNumber: 30,
    category: 'Penalaran Kuantitatif',
    subTopic: 'Interpretasi Data Tabel & Grafik',
    text:
      'Alokasi anggaran riset dan inovasi nasional sebesar $\\text{Rp}10$ Triliun didistribusikan ke dalam 4 bidang fokus:\n' +
      '- Transisi Energi Bersih: $35\\%$\n' +
      '- Ketahanan Pangan & Agromaritim: $25\\%$\n' +
      '- Kesehatan & Bioteknologi: $22\\%$\n' +
      '- Digitalisasi & AI: sisanya.\n\n' +
      'Jika dari total anggaran bidang Digitalisasi & AI tersebut, sebesar $40\\%$ dialokasikan khusus untuk pengadaan infrastruktur *Supercomputing/GPU Cluster*, berapakah nilai nominal rupiah dana infrastruktur komputasi tersebut?',
    explanation:
      '**Pembahasan:**\n' +
      '1. Persentase porsi anggaran bidang Digitalisasi & AI:\n' +
      '$$\\text{Porsi} = 100\\% - (35\\% + 25\\% + 22\\%) = 100\\% - 82\\% = 18\\%$$\n\n' +
      '2. Total nilai anggaran bidang Digitalisasi & AI:\n' +
      '$$18\\% \\times \\text{Rp}10.000.000.000.000,00 = \\text{Rp}1.800.000.000.000,00$$\n\n' +
      '3. Alokasi pengadaan infrastruktur Supercomputing ($40\\%$):\n' +
      '$$\\text{Dana Infrastruktur} = 40\\% \\times \\text{Rp}1.800.000.000.000,00 = 0{,}40 \\times 1.800.000.000.000 = \\text{Rp}720.000.000.000,00$$\n\n' +
      'Jadi, alokasi infrastruktur tersebut bernilai $\\text{Rp}720.000.000.000,00$ (Opsi A).',
    options: [
      { key: 'A', text: 'Rp720.000.000.000,00', score: 1 },
      { key: 'B', text: 'Rp680.000.000.000,00', score: 0 },
      { key: 'C', text: 'Rp800.000.000.000,00', score: 0 },
      { key: 'D', text: 'Rp750.000.000.000,00', score: 0 },
      { key: 'E', text: 'Rp900.000.000.000,00', score: 0 },
    ],
  },

  // ========================================================
  // PENALARAN PEMECAHAN MASALAH / LOGIS (31 - 40)
  // Subtopik 7: Pengambilan Keputusan & Penalaran Analitis (31 - 35)
  // ========================================================
  {
    orderNumber: 31,
    category: 'Pemecahan Masalah',
    subTopic: 'Pengambilan Keputusan & Analitis',
    text:
      'Enam orang panelis ahli—Ahmad, Bella, Citra, Dodi, Eka, dan Farhan—akan mempresentasikan hasil riset pada simposium nasional secara berurutan dalam 6 sesi (sesi 1 sampai sesi 6). Penjadwalan sesi harus mematuhi ketentuan berikut:\n' +
      '1. Citra harus tampil tepat pada sesi sebelum Dodi (blok [C, D] berurutan).\n' +
      '2. Farhan tidak boleh tampil pada sesi ke-1 maupun sesi ke-6.\n' +
      '3. Ahmad harus tampil pada sesi yang lebih awal daripada Citra.\n' +
      '4. Bella tampil pada sesi ke-3.\n' +
      '5. Eka tampil pada sesi yang lebih lambat daripada Dodi.\n\n' +
      'Jika Farhan dijadwalkan tampil pada sesi ke-2, panelis manakah yang PASTI tampil pada sesi ke-6?',
    explanation:
      '**Pembahasan:**\n' +
      'Tersedia 6 slot sesi: [1, 2, 3, 4, 5, 6].\n\n' +
      '1. Dari data awal:\n' +
      '- Sesi 2: Farhan (F)\n' +
      '- Sesi 3: Bella (B)\n' +
      'Maka slot yang masih kosong adalah sesi 1, 4, 5, dan 6.\n\n' +
      '2. Panelis tersisa yang belum dijadwalkan: {Ahmad, Citra, Dodi, Eka}.\n' +
      'Ketentuan 1 mewajibkan Citra dan Dodi tampil berurutan berdampingan [C, D].\n' +
      'Pasangan slot kosong yang berurutan hanyalah pasangan (4, 5) atau (5, 6).\n\n' +
      '3. Uji kemungkinan:\n' +
      '- Jika [C, D] menempati slot (5, 6), maka Dodi berada pada sesi ke-6. Hal ini menyebabkan Ketentuan 5 ("Eka tampil pada sesi yang lebih lambat daripada Dodi") mustahil dipenuhi karena tidak ada lagi sesi setelah sesi ke-6. Maka penempatan ini gugur.\n' +
      '- Maka [C, D] wajib menempati slot (4, 5), yaitu Citra pada sesi 4 dan Dodi pada sesi 5.\n\n' +
      '4. Menentukan sisa slot (sesi 1 dan sesi 6):\n' +
      '- Ketentuan 3: Ahmad harus tampil lebih awal daripada Citra ($A < C$). Karena Citra di sesi 4, maka Ahmad harus menempati sesi 1.\n' +
      '- Ketentuan 5: Eka harus lebih lambat daripada Dodi ($E > D$). Karena Dodi di sesi 5, maka Eka wajib menempati sesi 6.\n\n' +
      'Urutan lengkap yang valid dan unik:\n' +
      'Sesi 1: Ahmad, Sesi 2: Farhan, Sesi 3: Bella, Sesi 4: Citra, Sesi 5: Dodi, Sesi 6: Eka.\n' +
      'Jadi panelis yang pasti tampil pada sesi ke-6 adalah Eka (Opsi C).',
    options: [
      { key: 'A', text: 'Citra', score: 0 },
      { key: 'B', text: 'Dodi', score: 0 },
      { key: 'C', text: 'Eka', score: 1 },
      { key: 'D', text: 'Farhan', score: 0 },
      { key: 'E', text: 'Ahmad', score: 0 },
    ],
  },
  {
    orderNumber: 32,
    category: 'Pemecahan Masalah',
    subTopic: 'Pengambilan Keputusan & Analitis',
    text:
      'Sebuah komite penyeleksi beasiswa riset harus memilih tepat 3 orang dari 5 calon peneliti: P, Q, R, S, dan T. Proses seleksi diatur oleh aturan berikut:\n' +
      '1. Jika P dipilih, maka Q tidak boleh dipilih.\n' +
      '2. R dan S harus dipilih bersama-sama atau keduanya tidak dipilih sama sekali.\n' +
      '3. T dapat dipilih jika dan hanya jika S tidak dipilih ($T \\iff \\neg S$).\n\n' +
      'Jika komite telah memutuskan bahwa P terpilih sebagai salah satu penerima beasiswa, siapakah dua kandidat lainnya yang mendampingi P?',
    explanation:
      '**Pembahasan:**\n' +
      'Komite harus memilih tepat 3 orang penerima beasiswa.\n' +
      'Diketahui: P sudah pasti terpilih. Maka tersisa kuota 2 orang dari himpunan kandidat {Q, R, S, T}.\n\n' +
      '1. Dari Aturan 1: Karena P dipilih, maka Q gugur (tidak boleh dipilih).\n' +
      'Kandidat yang masih dapat dipertimbangkan tinggal {R, S, T}.\n\n' +
      '2. Dari Aturan 2: R dan S harus dipilih bersama-sama atau tidak sama sekali.\n' +
      '- Kasus 1: R dan S keduanya dipilih.\n' +
      '  * Dua slot tersisa langsung terisi oleh R dan S (total anggota terpilih: P, R, S).\n' +
      '  * Cek Aturan 3: Karena S dipilih, maka $T$ tidak dipilih ($T \\iff \\neg S$). Ini sangat konsisten dengan kuota 3 orang.\n' +
      '- Kasus 2: R dan S keduanya tidak dipilih.\n' +
      '  * Maka satu-satunya kandidat yang tersisa hanyalah T.\n' +
      '  * Total kandidat yang terpilih hanya 2 orang (P dan T), sehingga kuota 3 orang gagal terpenuhi.\n\n' +
      'Dengan demikian, dua kandidat lain yang mendampingi P adalah R dan S (Opsi B).',
    options: [
      { key: 'A', text: 'Q dan R', score: 0 },
      { key: 'B', text: 'R dan S', score: 1 },
      { key: 'C', text: 'S dan T', score: 0 },
      { key: 'D', text: 'Q dan T', score: 0 },
      { key: 'E', text: 'R dan T', score: 0 },
    ],
  },
  {
    orderNumber: 33,
    category: 'Pemecahan Masalah',
    subTopic: 'Pengambilan Keputusan & Analitis',
    text:
      'Suatu proyek implementasi sistem perbankan terintegrasi terdiri atas lima aktivitas kerja: A, B, C, D, dan E. Keterkaitan dependensi antar aktivitas adalah sebagai berikut:\n' +
      '- Aktivitas A dan B dapat dimulai secara bersamaan pada awal proyek.\n' +
      '- Aktivitas C hanya dapat dimulai setelah aktivitas A selesai tuntas.\n' +
      '- Aktivitas D hanya dapat dimulai setelah aktivitas A dan B keduanya selesai tuntas.\n' +
      '- Aktivitas E hanya dapat dimulai setelah aktivitas C dan D keduanya selesai tuntas.\n\n' +
      'Durasi pengerjaan masing-masing adalah: A = 4 minggu, B = 6 minggu, C = 5 minggu, D = 3 minggu, dan E = 4 minggu. Berapakah total waktu minimum penyelesaian (*Critical Path*) dari keseluruhan proyek tersebut?',
    explanation:
      '**Pembahasan:**\n' +
      'Metode Jalur Kritis (*Critical Path Method* / CPM):\n' +
      'Hitung Waktu Mulai Tercepat (*Early Start*, ES) dan Waktu Selesai Tercepat (*Early Finish*, EF):\n\n' +
      '1. Aktivitas A (durasi 4):\n' +
      '   $$\\text{ES}_A = 0, \\quad \\text{EF}_A = 0 + 4 = 4$$\n' +
      '2. Aktivitas B (durasi 6):\n' +
      '   $$\\text{ES}_B = 0, \\quad \\text{EF}_B = 0 + 6 = 6$$\n' +
      '3. Aktivitas C (bergantung pada A, durasi 5):\n' +
      '   $$\\text{ES}_C = \\text{EF}_A = 4, \\quad \\text{EF}_C = 4 + 5 = 9$$\n' +
      '4. Aktivitas D (bergantung pada A dan B, durasi 3):\n' +
      '   $$\\text{ES}_D = \\max(\\text{EF}_A, \\text{EF}_B) = \\max(4, 6) = 6$$\n' +
      '   $$\\text{EF}_D = 6 + 3 = 9$$\n' +
      '5. Aktivitas E (bergantung pada C dan D, durasi 4):\n' +
      '   $$\\text{ES}_E = \\max(\\text{EF}_C, \\text{EF}_D) = \\max(9, 9) = 9$$\n' +
      '   $$\\text{EF}_E = 9 + 4 = 13 \\text{ minggu}$$\n\n' +
      'Jadi, durasi minimum penyelesaian proyek adalah 13 minggu (Opsi B).',
    options: [
      { key: 'A', text: '12 minggu', score: 0 },
      { key: 'B', text: '13 minggu', score: 1 },
      { key: 'C', text: '14 minggu', score: 0 },
      { key: 'D', text: '15 minggu', score: 0 },
      { key: 'E', text: '16 minggu', score: 0 },
    ],
  },
  {
    orderNumber: 34,
    category: 'Pemecahan Masalah',
    subTopic: 'Pengambilan Keputusan & Analitis',
    text:
      'Sebuah kementerian memiliki pagu anggaran sisa sebesar $\\text{Rp}100$ Miliar yang harus dialokasikan secara penuh ke dalam 3 program strategis: Penurunan Kemiskinan Ekstrem ($X$), Revitalisasi Vokasi ($Y$), dan Digitalisasi Layanan Publik ($Z$). Kebijakan penetapan alokasi mensyaratkan:\n' +
      '- Program $X$ harus menerima minimal $\\text{Rp}30$ Miliar dan tidak lebih dari $\\text{Rp}50$ Miliar ($30 \\le X \\le 50$).\n' +
      '- Alokasi program $Y$ harus sekurang-kurangnya $50\\%$ dari alokasi program $X$ ($Y \\ge 0{,}5X$).\n' +
      '- Alokasi program $Z$ tidak boleh melebihi alokasi program $Y$ ($0 \\le Z \\le Y$).\n\n' +
      'Jika seluruh dana $\\text{Rp}100$ Miliar harus dialokasikan ($X + Y + Z = 100$), berapakah alokasi MAKSIMUM yang dapat diterima oleh program Revitalisasi Vokasi ($Y$)?',
    explanation:
      '**Pembahasan:**\n' +
      'Optimasi alokasi anggaran:\n' +
      'Fungsi tujuan: Maksimalkan $Y = 100 - X - Z$.\n\n' +
      'Agar nilai $Y$ bernilai maksimum:\n' +
      '1. Nilai $X$ harus dibuat seminimum mungkin. Karena batas bawah $X$ adalah $\\text{Rp}30$ Miliar, maka kita pilih $X = 30$.\n' +
      '2. Nilai $Z$ harus dibuat seminimum mungkin. Batas bawah kelayakan anggaran adalah $Z = 0$.\n\n' +
      'Hitung nilai $Y$:\n' +
      '$$Y = 100 - 30 - 0 = 70 \\text{ Miliar}$$\n\n' +
      'Verifikasi kepatuhan seluruh batasan sistem:\n' +
      '- Batasan $X$: $30 \\le X = 30 \\le 50$ (Terpenuhi)\n' +
      '- Batasan $Y$: $Y = 70 \\ge 0{,}5(30) = 15$ (Terpenuhi)\n' +
      '- Batasan $Z$: $Z = 0 \\le Y = 70$ (Terpenuhi)\n' +
      '- Total dana: $30 + 70 + 0 = 100$ (Terpenuhi)\n\n' +
      'Jadi, alokasi maksimum program Revitalisasi Vokasi adalah $\\text{Rp}70$ Miliar (Opsi D).',
    options: [
      { key: 'A', text: 'Rp45 Miliar', score: 0 },
      { key: 'B', text: 'Rp50 Miliar', score: 0 },
      { key: 'C', text: 'Rp60 Miliar', score: 0 },
      { key: 'D', text: 'Rp70 Miliar', score: 1 },
      { key: 'E', text: 'Rp35 Miliar', score: 0 },
    ],
  },
  {
    orderNumber: 35,
    category: 'Pemecahan Masalah',
    subTopic: 'Pengambilan Keputusan & Analitis',
    text:
      'Lima orang peneliti (K, L, M, N, O) duduk mengelilingi meja bundar untuk rapat koordinasi riset dengan ketentuan posisi:\n' +
      '- K tidak boleh duduk tepat bersebelahan dengan L.\n' +
      '- M duduk tepat di antara L dan O.\n\n' +
      'Jika posisi duduk melingkar berurutan searah jarum jam adalah K, O, M, L, N, siapakah yang duduk tepat di sebelah kiri N (jika orientasi dilihat dari sudut pandang masing-masing orang yang menghadap ke pusat meja)?',
    explanation:
      '**Pembahasan:**\n' +
      'Mari tinjau konfigurasi 5 kursi melingkar berurutan searah jarum jam:\n' +
      '- Kursi 1: K\n' +
      '- Kursi 2: O\n' +
      '- Kursi 3: M\n' +
      '- Kursi 4: L\n' +
      '- Kursi 5: N\n\n' +
      'Cek validitas ketentuan:\n' +
      '1. K (kursi 1) bertetangga dengan N (kursi 5) dan O (kursi 2), sehingga K tidak bersebelahan dengan L (kursi 4). Terpenuhi.\n' +
      '2. M (kursi 3) tepat berada di antara O (kursi 2) dan L (kursi 4). Terpenuhi.\n\n' +
      'Menentukan orientasi sisi kiri N:\n' +
      'N duduk di kursi 5 dan menghadap ke pusat meja:\n' +
      '- Tangan kanannya mengarah ke kursi 1 (K) [berlawanan arah jarum jam].\n' +
      '- Tangan kirinya mengarah ke kursi 4 (L) [searah jarum jam].\n\n' +
      'Oleh karena itu, orang yang duduk tepat di sebelah kiri N adalah L (Opsi B).',
    options: [
      { key: 'A', text: 'K', score: 0 },
      { key: 'B', text: 'L', score: 1 },
      { key: 'C', text: 'M', score: 0 },
      { key: 'D', text: 'O', score: 0 },
      { key: 'E', text: 'Posisi tidak dapat dipastikan', score: 0 },
    ],
  },

  // Subtopik 8: Penalaran Spasial & Hubungan Struktural (36 - 40)
  {
    orderNumber: 36,
    category: 'Pemecahan Masalah',
    subTopic: 'Penalaran Spasial & Hubungan Struktural',
    text:
      'Sebuah dadu standar enam sisi memiliki pasangan sisi berlawanan dengan jumlah titik selalu sama dengan 7 (1 berlawanan dengan 6, 2 berlawanan dengan 5, dan 3 berlawanan dengan 4). Dadu tersebut diletakkan di atas meja datar dengan sisi bermata 1 menghadap ke atas dan sisi bermata 2 menghadap ke arah pengamat (arah selatan). Dadu tersebut kemudian digulingkan satu langkah ke arah timur (ke kanan pengamat), lalu digulingkan satu langkah ke arah utara (menjauhi pengamat). Sisi bermata berapakah yang kini menghadap ke atas meja?',
    explanation:
      '**Pembahasan:**\n' +
      'Kondisi orientasi awal dadu:\n' +
      '- Sisi Atas = 1 (Bawah = 6)\n' +
      '- Sisi Depan/Selatan = 2 (Belakang/Utara = 5)\n' +
      '- Pada dadu standar tangan kanan: bila 1 di atas dan 2 di depan, maka sisi Kanan (Timur) = 3 dan sisi Kiri (Barat) = 4.\n\n' +
      'Langkah 1: Digulingkan satu langkah ke arah Timur (ke kanan):\n' +
      '- Sisi Kiri (Barat = 4) naik ke Atas $\\implies$ Sisi Atas menjadi 4.\n' +
      '- Sisi Atas (1) berguling ke Kanan (Timur = 1).\n' +
      '- Sisi Bawah (6) berguling ke Kiri (Barat = 6).\n' +
      '- Sisi Kanan (3) berguling ke Bawah (Bawah = 3).\n' +
      '- Sisi Depan (Selatan = 2) dan Belakang (Utara = 5) posisinya tetap tidak berubah.\n\n' +
      'Langkah 2: Digulingkan satu langkah ke arah Utara (menjauhi pengamat):\n' +
      '- Sisi Depan (Selatan = 2) berguling naik ke Atas $\\implies$ Sisi Atas menjadi 2!\n' +
      '- Sisi Atas (4) berguling ke Belakang (Utara = 4).\n' +
      '- Sisi Timur dan Barat posisinya tetap.\n\n' +
      'Jadi, sisi yang kini menghadap ke atas adalah sisi bermata 2 (Opsi A).',
    options: [
      { key: 'A', text: '2', score: 1 },
      { key: 'B', text: '3', score: 0 },
      { key: 'C', text: '4', score: 0 },
      { key: 'D', text: '5', score: 0 },
      { key: 'E', text: '6', score: 0 },
    ],
  },
  {
    orderNumber: 37,
    category: 'Pemecahan Masalah',
    subTopic: 'Penalaran Spasial & Hubungan Struktural',
    text:
      'Sebuah jaring-jaring kubus dibentuk dalam konfigurasi salib ortogonal:\n' +
      '- Kolom vertikal memuat 4 persegi berurutan dari atas ke bawah berlabel: [P], [Q], [R], [S].\n' +
      '- Di sebelah kiri persegi [Q] menempel persegi sirip sayap [T].\n' +
      '- Di sebelah kanan persegi [Q] menempel persegi sirip sayap [U].\n\n' +
      'Jika jaring-jaring tersebut dilipat membentuk sebuah kubus utuh 3D tertutup, persegi manakah yang posisinya saling berhadapan langsung (berseberangan paralel) dengan persegi [P]?',
    explanation:
      '**Pembahasan:**\n' +
      'Berdasarkan teorema geometri lipatan jaring-jaring kubus:\n' +
      'Dua persegi yang terletak pada satu garis lurus kolom/baris dan terpisah oleh tepat satu persegi lain akan selalu menjadi sisi yang saling berhadapan sejajar ketika dilipat menjadi kubus 3D.\n\n' +
      'Pada kolom vertikal: [P] - [Q] - [R] - [S]:\n' +
      '- Persegi [P] terpisah oleh [Q] dari persegi [R]. Oleh karena itu, persegi [P] berhadapan langsung dengan persegi [R].\n' +
      '- Persegi [Q] terpisah oleh [R] dari persegi [S], sehingga [Q] berhadapan langsung dengan [S].\n' +
      '- Sirip sayap samping kiri [T] dan kanan [U] akan terlipat ke atas sehingga saling berhadapan satu sama lain ([T] berhadapan dengan [U]).\n\n' +
      'Jadi, persegi yang posisinya saling berhadapan dengan [P] adalah [R] (Opsi B).',
    options: [
      { key: 'A', text: 'Q', score: 0 },
      { key: 'B', text: 'R', score: 1 },
      { key: 'C', text: 'S', score: 0 },
      { key: 'D', text: 'T', score: 0 },
      { key: 'E', text: 'U', score: 0 },
    ],
  },
  {
    orderNumber: 38,
    category: 'Pemecahan Masalah',
    subTopic: 'Penalaran Spasial & Hubungan Struktural',
    text:
      'Sebuah lembaran kertas bujursangkar putih dilipat secara simetris:\n' +
      '1. Pertama, kertas dilipat dua dari sisi kiri ke sisi kanan.\n' +
      '2. Kedua, kertas hasil lipatan dilipat dua lagi dari bawah ke atas sehingga terbentuk bujursangkar kecil berukuran $\\frac{1}{4}$ dari luas awal di kuadran kanan atas.\n' +
      '3. Pada sudut lipatan pusat (sudut kiri-bawah dari lipatan kecil tersebut, yang merupakan titik pusat lembaran kertas asal), dipotong sebuah lubang berbentuk segitiga siku-siku sama kaki dengan sisi siku-sikunya berimpit pada kedua tepi lipatan.\n\n' +
      'Jika kertas tersebut kemudian dibuka kembali seluruh lipatannya hingga membentang utuh seperti semula, bentuk lubang apakah yang terbentuk di tengah lembaran kertas?',
    explanation:
      '**Pembahasan:**\n' +
      'Analisis simetri lipatan dan pembukaan (*unfolding*):\n' +
      '1. Titik sudut yang dipotong adalah titik temu 4 lapisan kertas yang bertepatan dengan titik pusat koordinat $(0,0)$ lembaran asal.\n' +
      '2. Potongan awal adalah sebuah segitiga siku-siku sama kaki di kuadran I dengan kedua sisi siku-sikunya menempel pada sumbu-$X$ dan sumbu-$Y$.\n' +
      '3. Saat lipatan dibuka secara vertikal (kebalikan langkah kedua), segitiga tersebut tercermin ke kuadran IV melintasi sumbu-$X$, membentuk bangun segitiga sama kaki.\n' +
      '4. Saat lipatan dibuka secara horizontal (kebalikan langkah pertama), kedua segitiga tersebut tercermin ke kuadran II dan III melintasi sumbu-$Y$.\n' +
      '5. Penggabungan simetris keempat segitiga siku-siku sama kaki di sekeliling titik pusat $(0,0)$ menghasilkan satu bangun datar belah ketupat / bujursangkar utuh berorientasi diagonal di tengah kertas.\n\n' +
      'Jadi, lubang yang terbentuk di tengah lembaran kertas adalah satu persegi belah ketupat (bujursangkar) utuh (Opsi C).',
    options: [
      { key: 'A', text: 'Satu segitiga siku-siku besar', score: 0 },
      { key: 'B', text: 'Dua segitiga sama kaki terpisah', score: 0 },
      { key: 'C', text: 'Satu persegi belah ketupat (bujursangkar) utuh', score: 1 },
      { key: 'D', text: 'Pola bintang delapan sudut', score: 0 },
      { key: 'E', text: 'Satu trapesium sama kaki', score: 0 },
    ],
  },
  {
    orderNumber: 39,
    category: 'Pemecahan Masalah',
    subTopic: 'Penalaran Spasial & Hubungan Struktural',
    text:
      'Perhatikan analogi aturan transformasi pola spasial 2D berikut:\n' +
      'Suatu poligon segilima beraturan dirotasi sebesar $90^\\circ$ searah jarum jam, lalu seluruh garis batas tepinya diubah dari garis lurus tegas menjadi garis putus-putus (*dashed line*), dan sebuah bulatan hitam pekat di bagian dalamnya dipindahkan ke sudut paling atas.\n\n' +
      'Jika aturan transformasi yang sama persis diterapkan pada sebuah poligon segitiga sama sisi yang awalnya memiliki sudut puncak menghadap ke atas dengan bulatan hitam pekat di sudut kiri bawah, bagaimanakah konfigurasi akhir bentuk tersebut?',
    explanation:
      '**Pembahasan:**\n' +
      'Terapkan 3 tahap transformasi secara sekuensial:\n' +
      '1. Rotasi poligon $90^\\circ$ searah jarum jam:\n' +
      '   Segitiga sama sisi yang awalnya memiliki sudut puncak menghadap ke atas bila diputar $90^\\circ$ searah jarum jam akan memiliki sudut puncak yang menghadap ke arah kanan. Sisi alasnya yang semula mendatar kini menjadi tegak di sebelah kiri.\n' +
      '2. Modifikasi garis tepi:\n' +
      '   Seluruh garis tepi luar diubah menjadi garis putus-putus (*dashed line*).\n' +
      '3. Pemindahan posisi elemen internal:\n' +
      '   Aturan secara eksplisit menyatakan *"bulatan hitam pekat di bagian dalamnya dipindahkan ke sudut paling atas"*. Pada segitiga bergaris putus-putus yang menghadap ke kanan, sudut yang berada pada posisi paling atas adalah sudut kiri-atas.\n\n' +
      'Konfigurasi yang dihasilkan adalah: Segitiga bergaris putus-putus menghadap ke kanan, dengan bulatan hitam berada di sudut paling atas (Opsi D).',
    options: [
      { key: 'A', text: 'Segitiga bergaris putus-putus menghadap ke kanan, lingkaran hitam berada di sudut puncak kanan.', score: 0 },
      { key: 'B', text: 'Segitiga bergaris lurus menghadap ke bawah, lingkaran hitam berada di tengah alas.', score: 0 },
      { key: 'C', text: 'Segitiga bergaris putus-putus menghadap ke kiri, lingkaran hitam berada di sudut atas.', score: 0 },
      { key: 'D', text: 'Segitiga bergaris putus-putus menghadap ke kanan, lingkaran hitam berada di sudut puncak paling atas.', score: 1 },
      { key: 'E', text: 'Segitiga bergaris lurus menghadap ke kanan, lingkaran hitam berada di luar segitiga.', score: 0 },
    ],
  },
  {
    orderNumber: 40,
    category: 'Pemecahan Masalah',
    subTopic: 'Penalaran Spasial & Hubungan Struktural',
    text:
      'Sebuah balok kayu pejal berbentuk kubus berukuran $4 \\text{ cm} \\times 4 \\text{ cm} \\times 4 \\text{ cm}$ dicat seluruh permukaan luarnya dengan cat warna merah. Balok tersebut kemudian dipotong-potong menjadi $64$ buah kubus kecil identik berukuran masing-masing $1 \\text{ cm} \\times 1 \\text{ cm} \\times 1 \\text{ cm}$. Berapakah banyaknya kubus kecil yang memiliki **tepat DUA sisi** yang terkena cat warna merah?',
    explanation:
      '**Pembahasan:**\n' +
      'Pada sebuah kubus berukuran $n \\times n \\times n$ (dalam kasus ini $n = 4$) yang seluruh permukaannya dicat lalu dipotong menjadi kubus-kubus satuan $1 \\times 1 \\times 1$:\n\n' +
      '1. Kubus dengan tepat 3 sisi tercat: Terletak pada titik-titik sudut kubus (*corners*).\n' +
      '   $$N_3 = 8$$\n' +
      '2. Kubus dengan tepat 2 sisi tercat: Terletak pada rusuk kubus (*edges*), tidak termasuk titik sudut.\n' +
      '   Kubus memiliki 12 rusuk, dan pada tiap rusuk terdapat $(n - 2)$ kubus:\n' +
      '   $$N_2 = 12 \\times (n - 2) = 12 \\times (4 - 2) = 12 \\times 2 = 24 \\text{ kubus}$$\n' +
      '3. Kubus dengan tepat 1 sisi tercat: Terletak pada bidang muka (*faces*), tidak termasuk tepi:\n' +
      '   $$N_1 = 6 \\times (n - 2)^2 = 6 \\times 2^2 = 24 \\text{ kubus}$$\n' +
      '4. Kubus tanpa cat (0 sisi tercat): Terletak di bagian inti terdalam:\n' +
      '   $$N_0 = (n - 2)^3 = 2^3 = 8 \\text{ kubus}$$\n\n' +
      'Verifikasi total kubus: $8 + 24 + 24 + 8 = 64$ kubus.\n' +
      'Maka banyaknya kubus kecil dengan tepat dua sisi yang terkena cat warna merah adalah 24 buah (Opsi C).',
    options: [
      { key: 'A', text: '8 kubus', score: 0 },
      { key: 'B', text: '16 kubus', score: 0 },
      { key: 'C', text: '24 kubus', score: 1 },
      { key: 'D', text: '32 kubus', score: 0 },
      { key: 'E', text: '12 kubus', score: 0 },
    ],
  },
];

/**
 * Seed function for LPDP TBS Advanced Package 2
 */
export async function seedLpdpAdvanced(prisma: PrismaClient) {
  console.log('🚀 Memulai Seeding Paket TBS Beasiswa LPDP Paket 2 (Advanced)...');

  // 1. Passing Grade Profile
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
  console.log('✅ Passing Grade Profile LPDP siap:', pgLpdp.id);

  // 2. Package
  const pkgLpdpP2 = await prisma.package.upsert({
    where: { slug: 'lpdp-tbs-advanced-p2' },
    update: {
      title: 'Mastery Tes Bakat Skolastik (TBS) Beasiswa LPDP Paket 2',
      examType: 'LPDP_TBS',
      price: 40000,
      promoPrice: 29000,
      isFree: false,
      isActive: true,
      description:
        'Paket simulasi komprehensif Tes Bakat Skolastik (TBS) LPDP Paket 2 tingkat lanjut (Advanced). Dirancang khusus untuk persiapan seleksi beasiswa pascasarjana Magister & Doktoral LPDP / Bappenas: Penalaran Verbal (Analogi, Pemahaman Bacaan Ilmiah/Kritis, Silogisme Kompleks), Penalaran Kuantitatif (Aritmetika Sosial, Aljabar Terapan, Analisis Data Tabel & Grafik dengan KaTeX), dan Pemecahan Masalah Logis (Analitis Spasial & Pengambilan Keputusan).',
    },
    create: {
      title: 'Mastery Tes Bakat Skolastik (TBS) Beasiswa LPDP Paket 2',
      slug: 'lpdp-tbs-advanced-p2',
      description:
        'Paket simulasi komprehensif Tes Bakat Skolastik (TBS) LPDP Paket 2 tingkat lanjut (Advanced). Dirancang khusus untuk persiapan seleksi beasiswa pascasarjana Magister & Doktoral LPDP / Bappenas: Penalaran Verbal (Analogi, Pemahaman Bacaan Ilmiah/Kritis, Silogisme Kompleks), Penalaran Kuantitatif (Aritmetika Sosial, Aljabar Terapan, Analisis Data Tabel & Grafik dengan KaTeX), dan Pemecahan Masalah Logis (Analitis Spasial & Pengambilan Keputusan).',
      examType: 'LPDP_TBS',
      price: 40000,
      promoPrice: 29000,
      isFree: false,
      isActive: true,
    },
  });
  console.log('✅ Package siap:', pkgLpdpP2.title, `(${pkgLpdpP2.slug})`);

  // 3. Tryout
  const tryoutLpdpP2 = await prisma.tryout.upsert({
    where: { id: 'tryout-lpdp-tbs-advanced-p2' },
    update: {
      packageId: pkgLpdpP2.id,
      passingGradeProfileId: pgLpdp.id,
      title: 'Simulasi TBS LPDP Paket 2 (Tingkat Lanjut)',
      examType: 'LPDP_TBS',
      durationMinutes: 90,
      totalQuestions: 40,
      subtestConfig: {
        'Penalaran Verbal': { total: 15, passingScore: 10 },
        'Penalaran Kuantitatif': { total: 15, passingScore: 10 },
        'Pemecahan Masalah': { total: 10, passingScore: 7 },
      },
      isActive: true,
    },
    create: {
      id: 'tryout-lpdp-tbs-advanced-p2',
      packageId: pkgLpdpP2.id,
      passingGradeProfileId: pgLpdp.id,
      title: 'Simulasi TBS LPDP Paket 2 (Tingkat Lanjut)',
      examType: 'LPDP_TBS',
      durationMinutes: 90,
      totalQuestions: 40,
      subtestConfig: {
        'Penalaran Verbal': { total: 15, passingScore: 10 },
        'Penalaran Kuantitatif': { total: 15, passingScore: 10 },
        'Pemecahan Masalah': { total: 10, passingScore: 7 },
      },
      isActive: true,
    },
  });
  console.log('✅ Tryout siap:', tryoutLpdpP2.title, `(${tryoutLpdpP2.id})`);

  // 4. Questions & Options Upsert
  console.log(`📝 Seeding ${LPDP_ADVANCED_QUESTIONS.length} butir soal autentik TBS LPDP Paket 2...`);

  for (const item of LPDP_ADVANCED_QUESTIONS) {
    const question = await prisma.question.upsert({
      where: {
        tryoutId_orderNumber: {
          tryoutId: tryoutLpdpP2.id,
          orderNumber: item.orderNumber,
        },
      },
      update: {
        category: item.category,
        subTopic: item.subTopic,
        questionType: 'MULTIPLE_CHOICE',
        text: item.text,
        explanation: item.explanation,
      },
      create: {
        tryoutId: tryoutLpdpP2.id,
        orderNumber: item.orderNumber,
        category: item.category,
        subTopic: item.subTopic,
        questionType: 'MULTIPLE_CHOICE',
        text: item.text,
        explanation: item.explanation,
      },
    });

    for (const opt of item.options) {
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

  console.log(`🎉 Berhasil men-seed ${LPDP_ADVANCED_QUESTIONS.length} butir soal TBS LPDP Paket 2.`);
  return { package: pkgLpdpP2, tryout: tryoutLpdpP2, questionsCount: LPDP_ADVANCED_QUESTIONS.length };
}

// Standalone execution support
if (process.argv[1]?.includes('seed-lpdp-advanced')) {
  const prisma = new PrismaClient();
  seedLpdpAdvanced(prisma)
    .then(() => {
      console.log('✅ Seeding TBS LPDP Advanced selesai.');
    })
    .catch((e) => {
      console.error('❌ Seeding TBS LPDP Advanced gagal:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
