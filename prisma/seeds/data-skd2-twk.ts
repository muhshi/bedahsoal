export interface SeedQuestion {
  orderNumber: number;
  category: 'TWK' | 'TIU' | 'TKP';
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

export const twkQuestionsPaket2: SeedQuestion[] = [
  // ==========================================
  // NASIONALISME (Soal 1 - 6)
  // ==========================================
  {
    orderNumber: 1,
    category: 'TWK',
    subTopic: 'Nasionalisme',
    text: 'Dalam perjuangan mempertahankan kemerdekaan Indonesia pasca-proklamasi 1945, Sutan Sjahrir memilih jalur diplomasi multilateral yang berpuncak pada Perjanjian Linggarjati dan pidatonya di Dewan Keamanan PBB di Lake Success. Esensi nilai nasionalisme yang tecermin dari strategi perjuangan Sutan Sjahrir tersebut adalah...',
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Strategi diplomasi Sutan Sjahrir mencerminkan **Nasionalisme Intelektual dan Berkeadaban Internasional**. Sjahrir menyadari bahwa mempertahankan kedaulatan tidak hanya mengandalkan kekuatan senjata (militer), melainkan juga memerlukan pengakuan *de jure* dan legitimasi masyarakat internasional sesuai Piagam PBB. 

- **Opsi B (Tepat):** Menempatkan kepentingan kedaulatan bangsa di atas sentimen emosional dengan memanfaatkan hukum serta pergaulan internasional secara cerdas dan bermartabat.
- Opsi A salah karena menganggap perjuangan fisik tidak penting.
- Opsi C salah karena pasif dan mengabaikan kedaulatan penuh.
- Opsi D & E tidak mencerminkan prinsip nasionalisme yang berdaulat dan strategis.`,
    options: [
      { key: 'A', text: 'Menggantikan perjuangan bersenjata sepenuhnya karena perang dianggap bertentangan dengan kemanusiaan', score: 0 },
      { key: 'B', text: 'Mengakui pentingnya legitimasi hukum internasional dan diplomasi cerdas untuk mengukuhkan kedaulatan NKRI di mata dunia', score: 5 },
      { key: 'C', text: 'Menerima hegemoni negara adidaya agar Indonesia mendapatkan pinjaman pemulihan ekonomi pascaperang', score: 0 },
      { key: 'D', text: 'Mengisolasi Indonesia dari konstelasi hubungan global guna menjaga kemurnian budaya bangsa', score: 0 },
      { key: 'E', text: 'Menyerahkan penyelesaian konflik dalam negeri kepada intervensi langsung pasukan perdamaian asing', score: 0 },
    ],
  },
  {
    orderNumber: 2,
    category: 'TWK',
    subTopic: 'Nasionalisme',
    text: 'Maraknya peredaran barang impor ilegal murah di pasar domestik telah memukul sektor UMKM nasional. Sebagai seorang ASN sekaligus konsumen, wujud konkret perilaku yang mencerminkan komitmen terhadap Gerakan Nasional Bangga Buatan Indonesia (GNBBI) adalah...',
    explanation: `**Kunci Jawaban: D**

**Pembahasan:**
Nilai nasionalisme ekonomi termanifestasi dalam keberpihakan nyata terhadap produk-produk lokal dan UMKM nasional. Gerakan Nasional Bangga Buatan Indonesia mengamanatkan warga negara, khususnya ASN, untuk mengutamakan barang hasil produksi dalam negeri demi ketahanan ekonomi bangsa.

- **Opsi D (Tepat):** Mengutamakan pembelian produk olahan UMKM dalam negeri dan mengedukasi lingkungan sekitar tentang keunggulan produk lokal, sehingga rantai pasok ekonomi nasional berputar kuat.
- Opsi A merupakan proteksionisme ekstrem yang tidak realistis di era perdagangan terbuka.
- Opsi B dan C bersifat pasif dan konsumtif tanpa kesadaran bela kepentingan ekonomi nasional.
- Opsi E berfokus pada gaya hidup prestise pribadi di atas kemandirian nasional.`,
    options: [
      { key: 'A', text: 'Menuntut penutupan seluruh perbatasan perdagangan internasional secara sepihak', score: 0 },
      { key: 'B', text: 'Tetap membeli produk impor ilegal selama harganya jauh lebih terjangkau untuk menghemat anggaran pribadi', score: 0 },
      { key: 'C', text: 'Menyerahkan sepenuhnya perlindungan produk lokal kepada aparat penegak hukum bea cukai tanpa mengubah pola konsumsi', score: 0 },
      { key: 'D', text: 'Secara sadar memprioritaskan pembelian produk dalam negeri serta aktif mempromosikan kualitas karya anak bangsa', score: 5 },
      { key: 'E', text: 'Membeli produk lokal hanya jika ada insentif potongan harga atau program gratis ongkos kirim dari pemerintah', score: 0 },
    ],
  },
  {
    orderNumber: 3,
    category: 'TWK',
    subTopic: 'Nasionalisme',
    text: 'Ikrar Sumpah Pemuda pada 28 Oktober 1928 berhasil melebur sekat-sekat primordial organisasi kedaerahan seperti Jong Java, Jong Sumatranen Bond, dan Jong Celebes menjadi satu kesatuan bangsa Indonesia. Pelajaran terpenting dari peristiwa sejarah ini dalam konteks penegakan integrasi nasional masa kini adalah...',
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Sumpah Pemuda 1928 menandai transformasi kesadaran dari primordialisme sempit menuju identitas kebangsaan yang inklusif (*transcending primordial boundaries*). Pelajaran terpentingnya adalah kesediaan menempatkan identitas bersama (persatuan kebangsaan) di atas fanatisme kedaerahan atau golongan, tanpa menghapuskan keanekaragaman budaya lokal yang ada.

- **Opsi C (Tepat):** Kemampuan mengesampingkan kepentingan partikularistik demi mewujudkan cita-cita bersama sebagai satu nusa, satu bangsa, dan satu bahasa.
- Opsi A keliru karena persatuan tidak berarti menyeragamkan identitas etnis secara paksa.
- Opsi B keliru karena mengabaikan pentingnya nilai kearifan lokal.
- Opsi D & E justru melemahkan ikatan kebangsaan.`,
    options: [
      { key: 'A', text: 'Menghapuskan seluruh identitas suku dan budaya kedaerahan demi terciptanya homogenitas mutlak', score: 0 },
      { key: 'B', text: 'Menggantikan hukum adat setempat dengan aturan seragam di seluruh pelosok nusantara', score: 0 },
      { key: 'C', text: 'Kemauan meletakkan loyalitas kebangsaan di atas sekat suku, ras, dan daerah tanpa melenyapkan keragaman budaya lokal', score: 5 },
      { key: 'D', text: 'Membatasi interaksi antarbudaya daerah guna menghindari benturan sosial dan gesekan horizontal', score: 0 },
      { key: 'E', text: 'Menjadikan salah satu kebudayaan etnis mayoritas sebagai standar tunggal kebudayaan nasional', score: 0 },
    ],
  },
  {
    orderNumber: 4,
    category: 'TWK',
    subTopic: 'Nasionalisme',
    text: 'Nasionalisme Indonesia berlandaskan Pancasila bukanlah nasionalisme sempit (chauvinisme), melainkan nasionalisme yang terbuka dan humanis. Manakah di antara pernyataan berikut yang paling tepat menggambarkan implementasi nasionalisme humanis Indonesia dalam percaturan global?',
    explanation: `**Kunci Jawaban: E**

**Pembahasan:**
Bung Karno menegaskan: *"Nasionalisme kita adalah nasionalisme yang hidup dalam tamansarinya internasionalisme."* Artinya, kecintaan pada tanah air Indonesia senantiasa sejalan dengan peri kemanusiaan yang adil dan beradab (Sila ke-2) dan ketertiban dunia berdasarkan kemerdekaan, perdamaian abadi, dan keadilan sosial (Pembukaan UUD 1945).

- **Opsi E (Tepat):** Indonesia aktif mengirimkan Kontingen Garuda (pasukan penjaga perdamaian PBB) dan konsisten memperjuangkan kemerdekaan bangsa Palestina tanpa mengorbankan kepentingan nasional.
- Opsi A adalah chauvinisme.
- Opsi B adalah isolasionisme.
- Opsi C mengabaikan solidaritas kemanusiaan universal.
- Opsi D adalah kosmopolitanisme tanpa akar nasional.`,
    options: [
      { key: 'A', text: 'Menganggap kebudayaan bangsa sendiri lebih luhur daripada kebudayaan seluruh peradaban bangsa lain', score: 0 },
      { key: 'B', text: 'Menolak kerja sama internasional yang melibatkan negara-negara dengan ideologi yang berbeda', score: 0 },
      { key: 'C', text: 'Fokus eksklusif pada kemakmuran domestik dan tidak peduli terhadap krisis kemanusiaan global', score: 0 },
      { key: 'D', text: 'Menerima segala bentuk pengaruh budaya asing secara tanpa filter demi kemajuan modernitas', score: 0 },
      { key: 'E', text: 'Aktif berkontribusi menjaga perdamaian dunia dan solidaritas kemanusiaan global dengan tetap berakar kokoh pada jati diri bangsa', score: 5 },
    ],
  },
  {
    orderNumber: 5,
    category: 'TWK',
    subTopic: 'Nasionalisme',
    text: 'Frans Kaisiepo, Pahlawan Nasional asal Papua, menolak diangkat sebagai anggota Delegasi Belanda dalam Konferensi Malino 1946 dan mengusulkan nama "Irian" yang bermakna "Ikut Republik Indonesia Anti Nederland". Tindakan heroik ini mencerminkan dimensi nasionalisme...',
    explanation: `**Kunci Jawaban: A**

**Pembahasan:**
Sikap Frans Kaisiepo menegaskan komitmen teguh terhadap integritas teritorial NKRI dari Sabang sampai Merauke. Beliau menolak rayuan dan tekanan Belanda yang mencoba memecah belah wilayah Indonesia melalui pembentukan negara-negara boneka.

- **Opsi A (Tepat):** Keteguhan menjaga keutuhan wilayah kesatuan Indonesia dan menolak segala bentuk kompromi yang memecah belah kedaulatan bangsa.
- Opsi B, C, D, dan E tidak menggambarkan intisari sikap patriotik Frans Kaisiepo dalam sejarah integrasi Papua.`,
    options: [
      { key: 'A', text: 'Keteguhan memelihara keutuhan wilayah kedaulatan NKRI serta menentang upaya separatisme dan politik devide et impera', score: 5 },
      { key: 'B', text: 'Keinginan memperjuangkan otonomi khusus kedaerahan agar terpisah dari pemerintah pusat', score: 0 },
      { key: 'C', text: 'Sikap oportunis mencari keuntungan diplomatik dari persaingan dua kekuatan besar dunia', score: 0 },
      { key: 'D', text: 'Upaya membangun hegemoni budaya wilayah timur dalam struktur pemerintahan Republik', score: 0 },
      { key: 'E', text: 'Penolakan terhadap modernisasi birokrasi pemerintahan bentukan pemerintah kolonial', score: 0 },
    ],
  },
  {
    orderNumber: 6,
    category: 'TWK',
    subTopic: 'Nasionalisme',
    text: 'Di tahun politik menjelang pemilihan umum, ruang digital kerap dipenuhi narasi polarisasi dan provokasi sektarian. Peran utama seorang Aparatur Sipil Negara (ASN) dalam merawat nasionalisme dan kohesi sosial di tengah masyarakat adalah...',
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Berdasarkan UU No. 20 Tahun 2023 tentang Aparatur Sipil Negara, fungsi ASN mencakup pelaksana kebijakan publik, pelayan publik, serta **perekat dan pemersatu bangsa**. ASN wajib netral, tidak memihak kepentingan politik partisan, dan menjadi jangkar persatuan masyarakat.

- **Opsi C (Tepat):** Menjaga netralitas, menjadi katalis pemersatu dengan menyebarkan fakta objektif dan narasi toleransi, serta meredam benih-benih perpecahan sosial.
- Opsi A melanggar asas netralitas ASN.
- Opsi B bersifat apatis dan mengabaikan tanggung jawab sosial.
- Opsi D & E menyalahgunakan wewenang dan merusak kepercayaan masyarakat pada birokrasi.`,
    options: [
      { key: 'A', text: 'Mendukung salah satu kontestan yang dianggap paling memiliki rekam jejak nasionalis di media sosial dinas', score: 0 },
      { key: 'B', text: 'Menghindari seluruh percakapan sosial dan mengabaikan gejolak ketegangan antarwarga di lingkungannya', score: 0 },
      { key: 'C', text: 'Menjaga netralitas politik, menjadi perekat pemersatu bangsa, dan aktif menangkal hoaks pembelah keutuhan sosial', score: 5 },
      { key: 'D', text: 'Menggunakan pengaruh jabatannya untuk mengarahkan pilihan politik seluruh bawahan di instansi', score: 0 },
      { key: 'E', text: 'Membentuk kelompok relawan pemenangan terselubung di internal instansi pemerintah', score: 0 },
    ],
  },

  // ==========================================
  // INTEGRITAS (Soal 7 - 12)
  // ==========================================
  {
    orderNumber: 7,
    category: 'TWK',
    subTopic: 'Integritas',
    text: 'Seorang pejabat pembuat komitmen (PPK) pada suatu instansi kementerian ditawari fasilitas kamar hotel bintang lima dan tiket pesawat kelas bisnis oleh pihak rekanan penyedia saat melakukan monitoring lapangan di luar kota. Sesuai 9 Nilai Integritas KPK dan asas pencegahan tindak pidana korupsi, tindakan yang wajib diambil PPK tersebut adalah...',
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Pemberian fasilitas akomodasi dan transportasi oleh pihak rekanan yang memiliki hubungan kerja atau kepentingan kedinasan termasuk kategori **Gratifikasi yang dilarang** (potensi *conflict of interest* / suap terselubung). Nilai integritas yang ditekankan adalah **Sederhana, Mandiri, dan Bertanggung Jawab**.

- **Opsi C (Tepat):** Menolak secara tegas dan santun fasilitas tersebut karena biaya perjalanan dinas telah dialokasikan oleh DIPA instansi sesuai standar biaya masukan (SBM), serta melaporkan upaya tersebut ke Unit Pengendalian Gratifikasi (UPG).
- Opsi A keliru karena menerima fasilitas rekanan tetap merupakan pelanggaran etik berat.
- Opsi B tidak dibenarkan karena uang tunai tetap gratifikasi.
- Opsi D & E melanggar ketentuan UU Tipikor.`,
    options: [
      { key: 'A', text: 'Menerima fasilitas tersebut selama monitoring lapangan tetap dilaksanakan secara objektif tanpa rekayasa', score: 0 },
      { key: 'B', text: 'Meminta fasilitas diganti dalam bentuk uang tunai untuk dimasukkan ke kas sosial kantor instansi', score: 0 },
      { key: 'C', text: 'Menolak fasilitas rekanan secara tegas, menggunakan fasilitas resmi sesuai DIPA instansi, dan melapor ke UPG', score: 5 },
      { key: 'D', text: 'Menerimanya atas nama pribadi agar instansi tidak perlu mengeluarkan anggaran tiket perjalanan dinas', score: 0 },
      { key: 'E', text: 'Mengalihkan tiket dan fasilitas mewah tersebut kepada pimpinan instansi sebagai bentuk loyalitas', score: 0 },
    ],
  },
  {
    orderNumber: 8,
    category: 'TWK',
    subTopic: 'Integritas',
    text: 'Dalam ketentuan hukum tindak pidana korupsi di Indonesia (UU No. 31/1999 jo UU No. 20/2001), terdapat pembedaan mendasar antara suap (bribery), pemerasan (extortion), dan gratifikasi (gratification). Unsur pembeda utama dari tindak pidana pemerasan yang dilakukan oleh pegawai negeri adalah...',
    explanation: `**Kunci Jawaban: A**

**Pembahasan:**
Berdasarkan Pasal 12 huruf e UU Tipikor:
- **Pemerasan (*extortion*):** Inisiatif datang dari pegawai negeri/pejabat dengan cara menyalahgunakan kekuasaan memaksa seseorang memberikan sesuatu, membayar, atau menerima pembayaran dengan potongan (adanya unsur paksaan/koersi aktif dari pejabat).
- **Suap (*bribery*):** Adanya kesepakatan transaksional (*meeting of minds* / *quid pro quo*) antara pemberi dan penerima demi memengaruhi keputusan.
- **Gratifikasi:** Pemberian dalam arti luas kepada penyelenggara negara yang berhubungan dengan jabatan tanpa ada kesepakatan di awal.

- **Opsi A (Tepat):** Adanya inisiatif dan paksaan aktif oleh pejabat dengan menyalahgunakan kekuasaan atau ancaman menghambat layanan.`,
    options: [
      { key: 'A', text: 'Adanya inisiatif aktif dan penyalahgunaan kekuasaan oleh pejabat untuk memaksa pengguna layanan memberikan imbalan', score: 5 },
      { key: 'B', text: 'Adanya kesepakatan rahasia yang saling menguntungkan secara sukarela antara kedua belah pihak sejak awal', score: 0 },
      { key: 'C', text: 'Pemberian hadiah berupa tanda terima kasih setelah layanan selesai tanpa ada unsur paksaan maupun janji', score: 0 },
      { key: 'D', text: 'Penyalahgunaan wewenang yang merugikan keuangan negara tanpa adanya aliran dana ke kantong pribadi pejabat', score: 0 },
      { key: 'E', text: 'Penerimaan honorarium narasumber yang tidak dilaporkan kepada atasan langsung dalam waktu 30 hari', score: 0 },
    ],
  },
  {
    orderNumber: 9,
    category: 'TWK',
    subTopic: 'Integritas',
    text: 'Pak Hendra adalah anggota panitia lelang pengadaan barang dan jasa pemerintah di dinasnya. Menjelang pengumuman tender, adik kandungnya mendaftarkan perusahaannya sebagai peserta lelang. Sesuai asas integritas dan tata kelola pemerintahan yang baik, langkah etis yang wajib dilakukan Pak Hendra adalah...',
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Situasi Pak Hendra merupakan benturan kepentingan nyata (*actual conflict of interest*). Standar integritas dan Perpres Pengadaan Barang/Jasa Pemerintah mewajibkan pejabat/panitia yang memiliki hubungan kekerabatan/kepentingan afiliasi untuk:
1. Menyatakan secara tertulis benturan kepentingan tersebut (*declare conflict of interest*).
2. Mengundurkan diri (*recuse oneself*) dari kepanitiaan tender tersebut.

- **Opsi B (Tepat):** Mendeklarasikan benturan kepentingan kepada pimpinan dan mengundurkan diri dari tim lelang tender bersangkutan.
- Opsi A dan C membahayakan objektivitas lelang dan berpotensi pelanggaran hukum persaingan usaha tidak sehat.
- Opsi D melanggar hak berusaha saudaranya, seharusnya Hendra yang mundur dari panitia lelang.
- Opsi E adalah penyembunyian fakta material (pelanggaran integritas).`,
    options: [
      { key: 'A', text: 'Tetap berada di kepanitiaan lelang namun berjanji dalam hati untuk menilai penawaran adiknya secara sangat ketat', score: 0 },
      { key: 'B', text: 'Mendeklarasikan benturan kepentingan secara terbuka dan mengundurkan diri dari proses penilaian tender tersebut', score: 5 },
      { key: 'C', text: 'Membocorkan dokumen harga perkiraan sendiri (HPS) kepada adiknya agar perusahaannya tidak kalah bersaing', score: 0 },
      { key: 'D', text: 'Menekan adiknya agar membatalkan perusahaannya demi menjaga citra baik keluarga di mata instansi', score: 0 },
      { key: 'E', text: 'Merahasiakan hubungan kekeluargaan tersebut selama proses verifikasi administrasi tender berlangsung', score: 0 },
    ],
  },
  {
    orderNumber: 10,
    category: 'TWK',
    subTopic: 'Integritas',
    text: 'Seorang staf administrasi menemukan indikasi pemalsuan bukti kuitansi pertanggungjawaban perjalanan dinas oleh sekelompok pegawai senior. Staf tersebut ingin melaporkan temuan tersebut namun khawatir akan ancaman karier dan intimidasi. Mekanisme pelaporan berbasis integritas yang menjamin kerahasiaan identitas dan perlindungan pelapor adalah...',
    explanation: `**Kunci Jawaban: E**

**Pembahasan:**
*Whistleblowing System* (WBS) adalah mekanisme pelaporan pelanggaran yang kredibel, independen, dan menjamin perlindungan kerahasiaan identitas pelapor (*whistleblower*) sesuai UU No. 31 Tahun 2014 tentang Perlindungan Saksi dan Korban (LPSK) serta peraturan perundangan terkait.

- **Opsi E (Tepat):** Melaporkan melalui saluran Whistleblowing System (WBS) resmi instansi atau Inspektorat/KPK dengan melampirkan bukti-bukti pendukung yang valid.
- Opsi A berisiko pencemaran nama baik (*trial by the press*).
- Opsi B & D memicu konfrontasi destruktif tanpa penyelesaian objektif.
- Opsi C merupakan sikap permisif terhadap korupsi yang melanggar nilai integritas.`,
    options: [
      { key: 'A', text: 'Mengunggah seluruh dokumen bukti temuan ke akun media sosial anonim agar menjadi viral di mata publik', score: 0 },
      { key: 'B', text: 'Menyebarkan informasi tersebut kepada seluruh rekan sejawat melalui grup obrolan informal kantor', score: 0 },
      { key: 'C', text: 'Menyimpan bukti tersebut sendiri dan menunggu hingga staf tersebut dipromosikan naik jabatan', score: 0 },
      { key: 'D', text: 'Menghadapi pegawai senior secara langsung di lorong kantor dan menuduh mereka melakukan korupsi', score: 0 },
      { key: 'E', text: 'Melaporkannya melalui saluran resmi Whistleblowing System (WBS) instansi atau aparat pengawas internal pemerintah', score: 5 },
    ],
  },
  {
    orderNumber: 11,
    category: 'TWK',
    subTopic: 'Integritas',
    text: 'Keteladanan integritas Wakil Presiden RI Pertama Mohammad Hatta dikenang abadi dalam sejarah bangsa. Salah satu kisah legendarisnya adalah ketika beliau mengembalikan sisa uang saku perjalanan dinas luar negeri ke kas negara, serta menabung seumur hidup untuk membeli sepatu Bally impiannya tanpa pernah menyalahgunakan kekuasaan. Nilai integritas KPK yang paling dominan tecermin dari figur Bung Hatta adalah...',
    explanation: `**Kunci Jawaban: D**

**Pembahasan:**
Kisah Bung Hatta mencerminkan perpaduan luhur antara nilai **Kesederhanaan, Kejujuran, dan Tanggung Jawab**. Meskipun memiliki kekuasaan tinggi sebagai wakil kepala negara, beliau pantang mencampuradukkan kas negara dengan kepentingan pribadi, hidup bersahaja, dan menolak gratifikasi.

- **Opsi D (Tepat):** Kesederhanaan dan kejujuran mutlak dalam memisahkan hak pribadi dengan aset/keuangan milik negara.
- Opsi A, B, C, dan E tidak menangkap substansi moral luhur dari keteladanan integritas Bung Hatta.`,
    options: [
      { key: 'A', text: 'Keberanian menentang seluruh kebijakan politik ekonomi yang dikeluarkan oleh kabinet parlementer', score: 0 },
      { key: 'B', text: 'Keuletan berbisnis untuk memupuk kekayaan pribadi demi menopang biaya operasional perjuangan politik', score: 0 },
      { key: 'C', text: 'Kemampuan diplomasi kompromi dalam pembagian konsesi tambang kepada pihak asing', score: 0 },
      { key: 'D', text: 'Kesederhanaan hidup serta kejujuran mutlak dalam memisahkan milik negara dengan kepentingan pribadi', score: 5 },
      { key: 'E', text: 'Kepasrahan total menerima takdir tanpa berupaya memperbaiki sistem kesejahteraan para pejabat negara', score: 0 },
    ],
  },
  {
    orderNumber: 12,
    category: 'TWK',
    subTopic: 'Integritas',
    text: 'Kewajiban penyampaian Laporan Harta Kekayaan Penyelenggara Negara (LHKPN) secara tepat waktu dan jujur merupakan instrumen transparansi birokrasi. Makna fundamental dari kepatuhan mengisi LHKPN bagi pencegahan korupsi adalah...',
    explanation: `**Kunci Jawaban: A**

**Pembahasan:**
LHKPN berfungsi sebagai instrumen akuntabilitas publik dan sistem pencegahan dini korupsi (*preventive integrity tool*). Melalui keterbukaan aset, masyarakat dan pengawas dapat memantau kewajaran profil penambahan kekayaan (*illicit enrichment*) seorang pejabat publik dibandingkan profil penghasilan sahnya.

- **Opsi A (Tepat):** Menegakkan asas transparansi dan memungkinkan pengawasan publik atas kewajaran perolehan harta kekayaan aparatur negara.
- Opsi B keliru karena LHKPN bukan formulir pembayaran pajak.
- Opsi C keliru karena tujuan LHKPN bukan ajang prestise atau pembuktian kekayaan.
- Opsi D & E salah kaprah dalam memahami regulasi transparansi.`,
    options: [
      { key: 'A', text: 'Menegakkan transparansi dan akuntabilitas publik melalui pengawasan kewajaran profil aset penyelenggara negara', score: 5 },
      { key: 'B', text: 'Menghitung tarif besaran pajak penghasilan tahunan yang harus dipotong secara otomatis dari gaji pokok', score: 0 },
      { key: 'C', text: 'Menunjukkan prestise dan kemampuan finansial seorang pejabat di hadapan publik dan rekan sejawat', score: 0 },
      { key: 'D', text: 'Memberikan jaminan kekebalan hukum kepada penyelenggara negara dari segala tuntutan perdata', score: 0 },
      { key: 'E', text: 'Mengalihkan tanggung jawab pembuktian tindak pidana sepenuhnya kepada instansi pengawas internal', score: 0 },
    ],
  },

  // ==========================================
  // BELA NEGARA (Soal 13 - 18)
  // ==========================================
  {
    orderNumber: 13,
    category: 'TWK',
    subTopic: 'Bela Negara',
    text: 'Berdasarkan Pasal 27 Ayat (3) dan Pasal 30 Ayat (1) UUD 1945 serta UU No. 23 Tahun 2019 tentang Pengelolaan Sumber Daya Nasional untuk Pertahanan Negara, bela negara bagi setiap warga negara Republik Indonesia berkedudukan sebagai...',
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Pasal 27 ayat (3) UUD 1945 menyatakan: *"Setiap warga negara berhak dan wajib ikut serta dalam upaya pembelaan negara."* Pasal 30 ayat (1) menyatakan hak dan kewajiban dalam usaha pertahanan dan keamanan negara. UU No. 23 Tahun 2019 menegaskan bela negara adalah **hak sekaligus kewajiban konstitusional** yang dijiwai kecintaan kepada NKRI.

- **Opsi C (Tepat):** Hak dan kewajiban konstitusional setiap warga negara yang dilaksanakan dengan penuh kesadaran dan tanggung jawab.
- Opsi A keliru karena bela negara bukan hak prerogatif militer saja.
- Opsi B keliru karena bukan opsional/sukarela semata.
- Opsi D & E salah dalam menempatkan kedudukan hukum warga negara.`,
    options: [
      { key: 'A', text: 'Kewajiban eksklusif anggota Tentara Nasional Indonesia dan Kepolisian Republik Indonesia semata', score: 0 },
      { key: 'B', text: 'Hak sukarela yang boleh diabaikan apabila warga negara telah menunaikan kewajiban membayar pajak', score: 0 },
      { key: 'C', text: 'Hak sekaligus kewajiban konstitusional setiap warga negara berlandaskan kecintaan pada tanah air dan bangsa', score: 5 },
      { key: 'D', text: 'Tugas khusus yang hanya dibebankan kepada warga negara saat kondisi darurat perang militer dideklarasikan', score: 0 },
      { key: 'E', text: 'Program pelatihan fisik wajib militer yang berlaku hanya bagi warga negara yang berstatus pengangguran', score: 0 },
    ],
  },
  {
    orderNumber: 14,
    category: 'TWK',
    subTopic: 'Bela Negara',
    text: 'Ketika terjadi bencana gempa bumi dahsyat di sebuah daerah terpencil, sekelompok dokter, perawat, dan relawan muda segera berangkat ke lokasi bencana dengan biaya swadaya tanpa menunggu instruksi resmi demi menyelamatkan korban tertimbun runtuhan. Sikap kelompok relawan tersebut merupakan perwujudan dari nilai dasar bela negara, yaitu...',
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
UU No. 23 Tahun 2019 menetapkan 5 Nilai Dasar Bela Negara:
1. Cinta Tanah Air
2. Kesadaran Berbangsa dan Bernegara
3. Setia pada Pancasila sebagai Ideologi Negara
4. **Rela Berkorban untuk Bangsa dan Negara**
5. Kemampuan Awal Bela Negara

Tindakan relawan yang mengorbankan waktu, tenaga, keahlian, dan materi secara sukarela demi keselamatan sesama anak bangsa saat bencana merupakan implementasi nyata nilai **Rela Berkorban untuk Bangsa dan Negara**.

- **Opsi B (Tepat):** Rela berkorban untuk bangsa dan negara.`,
    options: [
      { key: 'A', text: 'Kemampuan awal bela negara secara psikis dan fisik dalam penguasaan bela diri taktis', score: 0 },
      { key: 'B', text: 'Rela berkorban waktu, tenaga, keahlian, dan materi demi kepentingan kemanusiaan bangsa dan negara', score: 5 },
      { key: 'C', text: 'Ketaatan formal terhadap hierarki birokrasi penanggulangan kedaruratan bencana nasional', score: 0 },
      { key: 'D', text: 'Pencapaian target jam kerja pengabdian sosial untuk memenuhi portofolio akreditasi profesi', score: 0 },
      { key: 'E', text: 'Kewaspadaan dini terhadap ancaman spionase militer asing di wilayah terdampak bencana alam', score: 0 },
    ],
  },
  {
    orderNumber: 15,
    category: 'TWK',
    subTopic: 'Bela Negara',
    text: 'Sistem Pertahanan dan Keamanan Rakyat Semesta (Sishankamrata) di Indonesia membagi postur pertahanan menjadi tiga pilar: Komponen Utama, Komponen Cadangan, dan Komponen Pendukung. Manakah pernyataan yang paling tepat mengenai peran Aparatur Sipil Negara (ASN) dalam struktur pertahanan negara sesuai regulasi?',
    explanation: `**Kunci Jawaban: D**

**Pembahasan:**
Sesuai UU No. 23 Tahun 2019:
- **Komponen Utama:** TNI yang siap digunakan melaksanakan tugas-tugas pertahanan.
- **Komponen Cadangan (Komcad):** Sumber daya nasional (termasuk warga negara yang secara sukarela mendaftar dan diseleksi, seperti ASN, pekerja, mahasiswa) yang dilatih dan diorganisasikan untuk memperbesar dan memperkuat Komponen Utama.
- **Komponen Pendukung:** Sumber daya nasional yang digunakan untuk meningkatkan kekuatan dan kemampuan Komponen Utama dan Komcad.

ASN didorong untuk menjadi bagian dari Komcad melalui pelatihan dasar kemiliteran dan menjalankan fungsinya sebagai penggerak kontinuitas pemerintahan.

- **Opsi D (Tepat):** ASN dapat bergabung menjadi Komponen Cadangan melalui seleksi dan pelatihan resmi serta menjadi tulang punggung Komponen Pendukung tata kelola pemerintahan.`,
    options: [
      { key: 'A', text: 'ASN secara otomatis berstatus sebagai perwira tempur Komponen Utama tanpa melalui pelatihan militer', score: 0 },
      { key: 'B', text: 'ASN dilarang keras terlibat dalam kegiatan pertahanan karena statusnya sebagai aparatur sipil murni', score: 0 },
      { key: 'C', text: 'ASN hanya diperbolehkan menjadi tenaga logistik dapur umum saat pecah perang bersenjata terbuka', score: 0 },
      { key: 'D', text: 'ASN dapat disiapkan menjadi Komponen Cadangan dan pilar Komponen Pendukung guna memperkuat ketahanan nasional', score: 5 },
      { key: 'E', text: 'ASN memegang komando operasional seluruh batalion pertahanan teritorial di tingkat kabupaten/kota', score: 0 },
    ],
  },
  {
    orderNumber: 16,
    category: 'TWK',
    subTopic: 'Bela Negara',
    text: 'Pusat Data Nasional (PDN) dan infrastruktur digital pemerintahan di era modern menghadapi ancaman serangan siber (*ransomware*, peretasan, dan kebocoran data sensitif). Perilaku preventif seorang ASN dalam ruang lingkup tugasnya yang mencerminkan kesadaran bela negara nir-militer adalah...',
    explanation: `**Kunci Jawaban: A**

**Pembahasan:**
Ancaman perang siber (*cyber warfare*) dan sabotase data merupakan ancaman non-militer kontemporer berdimensi teknologi yang dapat melumpuhkan kedaulatan negara. Kesadaran bela negara bagi ASN diwujudkan melalui kepatuhan ketat terhadap protokol keamanan informasi (Cyber Security Awareness), menjaga kerahasiaan data negara, dan tidak menggunakan perangkat lunak ilegal.

- **Opsi A (Tepat):** Menerapkan standar operasional keamanan informasi digital, menggunakan kata sandi kuat, dan menolak membocorkan data kedinasan ke ruang publik.
- Opsi B, C, D, dan E justru membuka celah kerentanan sistem siber instansi.`,
    options: [
      { key: 'A', text: 'Disiplin mematuhi protokol keamanan siber instansi, menjaga kerahasiaan kredensial akses, dan melindungi data publik', score: 5 },
      { key: 'B', text: 'Mengunduh dan menginstal aplikasi bajakan di komputer kantor guna menekan anggaran belanja lisensi software', score: 0 },
      { key: 'C', text: 'Menyimpan berkas rahasia negara di layanan penyimpanan awan gratis publik tanpa enkripsi keamanan', score: 0 },
      { key: 'D', text: 'Menggunakan koneksi jaringan internet publik tanpa pengaman VPN saat mengakses server basis data instansi', score: 0 },
      { key: 'E', text: 'Membagikan kata sandi server dinas kepada pihak ketiga guna mempermudah pengerjaan tugas proyek pribadi', score: 0 },
    ],
  },
  {
    orderNumber: 17,
    category: 'TWK',
    subTopic: 'Bela Negara',
    text: 'Seorang guru muda yang ditempatkan di daerah pedalaman perbatasan (daerah 3T) rela mengajar anak-anak di pulau terluar dengan keterbatasan fasilitas listrik dan jaringan internet, demi memastikan generasi muda di beranda terdepan NKRI mendapatkan pendidikan layak. Bentuk bela negara yang ditunjukkan oleh guru tersebut adalah...',
    explanation: `**Kunci Jawaban: E**

**Pembahasan:**
Berdasarkan UU No. 23 Tahun 2019, keikutsertaan warga negara dalam bela negara dapat diselenggarakan melalui:
1. Pendidikan kewarganegaraan
2. Pelatihan dasar kemiliteran secara wajib
3. Pengabdian sebagai prajurit TNI
4. **Pengabdian sesuai dengan profesi**

Guru yang mendidik anak bangsa di perbatasan menjaga kedaulatan non-militer melalui pengabdian profesi pendidikan, mencerdaskan kehidupan bangsa, dan menanamkan cinta NKRI sejak dini.

- **Opsi E (Tepat):** Pengabdian sesuai profesi yang berorientasi pada pencerdasan kehidupan bangsa dan ketahanan sumber daya manusia perbatasan.`,
    options: [
      { key: 'A', text: 'Kewajiban militer darurat untuk mempertahankan pos perbatasan dari infiltrasi tentara negara tetangga', score: 0 },
      { key: 'B', text: 'Upaya komersialisasi potensi pariwisata daerah terpencil demi menambah pendapatan asli daerah', score: 0 },
      { key: 'C', text: 'Pelaksanaan hukuman disiplin kepegawaian akibat penolakan rotasi di instansi pemerintah pusat', score: 0 },
      { key: 'D', text: 'Eksperimen kurikulum pendidikan swasta yang lepas dari pengawasan kementerian pendidikan nasional', score: 0 },
      { key: 'E', text: 'Bela negara melalui pengabdian profesi secara tulus guna memperkokoh ketahanan sumber daya manusia di garda terdepan NKRI', score: 5 },
    ],
  },
  {
    orderNumber: 18,
    category: 'TWK',
    subTopic: 'Bela Negara',
    text: 'Menjelang perayaan hari kemerdekaan, beredar pesan berantai di media sosial yang memanipulasi potongan video pidato tokoh negara dengan maksud menyulut sentimen kebencian antarsuku dan merusak rasa percaya masyarakat kepada NKRI. Sikap warga negara yang mencerminkan kemampuan awal bela negara non-fisik (kognitif/mental) adalah...',
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Kemampuan awal bela negara secara psikis mencakup memiliki kecerdasan emosional, spiritual, dan intelektual (*kognitif/mental*), senantiasa bersikap kritis, serta memiliki kewaspadaan dini (*early detection & early warning*) terhadap perang asimetris dan infiltrasi disinformasi yang ingin meretakkan bangsa.

- **Opsi C (Tepat):** Mengembangkan literasi digital kritis, melakukan verifikasi fakta (klarifikasi silang ke sumber kredibel), tidak meneruskan konten provokatif, serta mengedukasi publik agar tidak terprovokasi.
- Opsi A menyebarkan fitnah.
- Opsi B pasif dan membiarkan hoaks berkembang.
- Opsi D & E destruktif dan memperkeruh polarisasi.`,
    options: [
      { key: 'A', text: 'Langsung membagikan pesan tersebut ke seluruh grup obrolan agar masyarakat segera bersiap menghadapi bahaya', score: 0 },
      { key: 'B', text: 'Menghapus pesan tersebut untuk diri sendiri dan membiarkan anggota keluarga lain mempercayainya tanpa penjelasan', score: 0 },
      { key: 'C', text: 'Bersikap kritis dengan memeriksa keabsahan sumber fakta, tidak menyebarkan konten provokatif, dan meredam disinformasi', score: 5 },
      { key: 'D', text: 'Membalas pesan tersebut dengan menyebarkan ujaran kebencian baru yang menyerang etnis pembuat video', score: 0 },
      { key: 'E', text: 'Mengorganisasikan aksi boikot jalanan secara anarkis tanpa menunggu klarifikasi dari pihak berwenang', score: 0 },
    ],
  },

  // ==========================================
  // PILAR NEGARA (Soal 19 - 24)
  // ==========================================
  {
    orderNumber: 19,
    category: 'TWK',
    subTopic: 'Pilar Negara (Pancasila)',
    text: 'Pemerintah daerah mengalokasikan anggaran khusus untuk membangun akses ramah penyandang disabilitas (guiding block, ramp kursi roda, lift bersuara) di seluruh gedung layanan publik tanpa memandang jumlah pemohon difabel. Kebijakan ini merupakan pengamalan Pancasila, khususnya Sila...',
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Penyediaan fasilitas ramah disabilitas mencerminkan penghormatan terhadap harkat dan martabat manusia, pengakuan atas persamaan hak asasi setiap warga negara tanpa perlakuan diskriminatif, yang merupakan butir pengamalan **Sila ke-2: Kemanusiaan yang Adil dan Beradab** (sekaligus beririsan dengan keadilan sosial Sila ke-5). Pengakuan hak mendasar kesetaraan martabat manusia adalah inti dari Sila ke-2.

- **Opsi B (Tepat):** Sila ke-2, karena menjunjung tinggi persamaan derajat, hak, serta perlakuan adil beradab bagi setiap manusia.
- Opsi A (Sila ke-1) berkaitan dengan kebebasan beragama dan ketakwaan.
- Opsi C (Sila ke-3) berkaitan dengan persatuan dan cinta tanah air.
- Opsi D (Sila ke-4) berkaitan dengan musyawarah dan demokrasi perwakilan.
- Opsi E (Sila ke-5) fokus pada kemakmuran ekonomi dan kesejahteraan sosial masyarakat luas.`,
    options: [
      { key: 'A', text: 'Pertama, karena menghargai seluruh ciptaan Tuhan Yang Maha Esa di alam semesta', score: 0 },
      { key: 'B', text: 'Kedua, karena mengakui persamaan derajat dan hak asasi setiap individu tanpa diskriminasi', score: 5 },
      { key: 'C', text: 'Ketiga, karena menggalang persatuan seluruh golongan masyarakat di bawah panji kedaerahan', score: 0 },
      { key: 'D', text: 'Keempat, karena kebijakan tersebut diputuskan melalui mekanisme pemungutan suara di parlemen', score: 0 },
      { key: 'E', text: 'Kelima, karena memberikan bantuan tunai langsung secara berkala kepada kaum duafa', score: 0 },
    ],
  },
  {
    orderNumber: 20,
    category: 'TWK',
    subTopic: 'Pilar Negara (Pancasila)',
    text: 'Fenomena pejabat publik yang memamerkan barang-barang mewah dan gaya hidup hedonis (*flexing*) di media sosial menuai kecaman luas dari masyarakat. Ditinjau dari butir-butir pengamalan Pancasila, perilaku pamer kemewahan tersebut bertentangan secara langsung dengan Sila...',
    explanation: `**Kunci Jawaban: E**

**Pembahasan:**
Butir pengamalan **Sila ke-5: Keadilan Sosial bagi Seluruh Rakyat Indonesia** menegaskan:
1. Tidak menggunakan hak milik untuk hal-hal yang bersifat pemborosan dan bergaya hidup mewah.
2. Tidak menggunakan hak milik untuk bertentangan dengan atau merugikan kepentingan umum.
3. Menghargai hasil karya orang lain yang bermanfaat bagi kemajuan dan kesejahteraan bersama.
4. Suka melakukan kegiatan dalam rangka mewujudkan kemajuan yang merata dan berkeadilan sosial.

Perilaku pamer kemewahan (*hedonisme/flexing*) oleh aparatur negara secara langsung mencederai rasa keadilan sosial rakyat.

- **Opsi E (Tepat):** Kelima.`,
    options: [
      { key: 'A', text: 'Pertama, karena mengabaikan kewajiban membayar zakat dan sedekah tempat peribadatan', score: 0 },
      { key: 'B', text: 'Kedua, karena meremehkan martabat rakyat miskin yang tidak mampu membeli barang impor', score: 0 },
      { key: 'C', text: 'Ketiga, karena merusak reputasi kementerian di mata pergaulan bangsa-bangsa dunia', score: 0 },
      { key: 'D', text: 'Keempat, karena melanggar hasil keputusan musyawarah mufakat rencana kerja kementerian', score: 0 },
      { key: 'E', text: 'Kelima, karena melanggar larangan hidup boros, bergaya hidup mewah, dan mencederai rasa keadilan sosial masyarakat', score: 5 },
    ],
  },
  {
    orderNumber: 21,
    category: 'TWK',
    subTopic: 'Pilar Negara (UUD 1945)',
    text: 'Berdasarkan Pasal 24C Ayat (1) UUD 1945 pasca-amandemen, Mahkamah Konstitusi (MK) memiliki empat kewenangan mengadili pada tingkat pertama dan terakhir yang putusannya bersifat final, serta satu kewajiban konstitusional. Manakah yang BUKAN merupakan kewenangan Mahkamah Konstitusi?',
    explanation: `**Kunci Jawaban: D**

**Pembahasan:**
Pasal 24C ayat (1) UUD 1945:
Kewenangan MK:
1. Menguji undang-undang terhadap UUD 1945 (*judicial review* UU).
2. Memutus sengketa kewenangan lembaga negara yang kewenangannya diberikan oleh UUD.
3. Memutus pembubaran partai politik.
4. Memutus perselisihan tentang hasil pemilihan umum (PHPU).
Kewajiban MK (ayat 2): Memberikan putusan atas pendapat DPR mengenai dugaan pelanggaran hukum oleh Presiden dan/atau Wakil Presiden (*impeachment*).

Sementara itu, **menguji peraturan perundang-undangan di bawah undang-undang terhadap undang-undang** (seperti Perpres/Permen/Perda terhadap UU) adalah kewenangan **Mahkamah Agung (MA)** sesuai Pasal 24A ayat (1) UUD 1945.

- **Opsi D (Tepat sebagai yang BUKAN kewenangan MK):** Menguji peraturan pemerintah dan peraturan daerah terhadap undang-undang.`,
    options: [
      { key: 'A', text: 'Menguji undang-undang terhadap Undang-Undang Dasar Negara Republik Indonesia Tahun 1945', score: 0 },
      { key: 'B', text: 'Memutus sengketa kewenangan lembaga negara yang kewenangannya diberikan oleh UUD 1945', score: 0 },
      { key: 'C', text: 'Memutus pembubaran partai politik yang bertentangan dengan Pancasila dan konstitusi', score: 0 },
      { key: 'D', text: 'Menguji keabsahan materiil peraturan daerah dan peraturan menteri terhadap undang-undang', score: 5 },
      { key: 'E', text: 'Memutus perselisihan mengenai penetapan rekapitulasi perolehan suara hasil pemilihan umum', score: 0 },
    ],
  },
  {
    orderNumber: 22,
    category: 'TWK',
    subTopic: 'Pilar Negara (UUD 1945)',
    text: 'Sesuai dengan ketentuan hierarki peraturan perundang-undangan di Indonesia sebagaimana diatur dalam Pasal 7 Ayat (1) UU No. 12 Tahun 2011 jo UU No. 13 Tahun 2022, urutan tata perundangan yang benar dari tingkat tertinggi ke terendah adalah...',
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Hierarki Peraturan Perundang-undangan menurut Pasal 7 ayat (1) UU 12/2011 jo UU 13/2022:
1. UUD Negara Republik Indonesia Tahun 1945
2. Ketetapan Majelis Permusyawaratan Rakyat (Tap MPR)
3. Undang-Undang / Peraturan Pemerintah Pengganti Undang-Undang (Perppu)
4. Peraturan Pemerintah (PP)
5. Peraturan Presiden (Perpres)
6. Peraturan Daerah Provinsi (Perda Provinsi)
7. Peraturan Daerah Kabupaten/Kota (Perda Kab/Kota)

- **Opsi C (Tepat):** UUD 1945 -> Tap MPR -> UU/Perppu -> Peraturan Pemerintah -> Peraturan Presiden -> Perda Provinsi -> Perda Kab/Kota.`,
    options: [
      { key: 'A', text: 'UUD 1945 -> UU/Perppu -> Tap MPR -> Peraturan Pemerintah -> Peraturan Presiden -> Perda Provinsi -> Perda Kab/Kota', score: 0 },
      { key: 'B', text: 'UUD 1945 -> Tap MPR -> Peraturan Pemerintah -> UU/Perppu -> Peraturan Presiden -> Perda Kab/Kota -> Perda Provinsi', score: 0 },
      { key: 'C', text: 'UUD 1945 -> Tap MPR -> UU/Perppu -> Peraturan Pemerintah -> Peraturan Presiden -> Perda Provinsi -> Perda Kab/Kota', score: 5 },
      { key: 'D', text: 'UUD 1945 -> UU/Perppu -> Peraturan Presiden -> Peraturan Pemerintah -> Tap MPR -> Perda Provinsi -> Perda Kab/Kota', score: 0 },
      { key: 'E', text: 'Tap MPR -> UUD 1945 -> UU/Perppu -> Peraturan Pemerintah -> Peraturan Presiden -> Perda Provinsi -> Perda Kab/Kota', score: 0 },
    ],
  },
  {
    orderNumber: 23,
    category: 'TWK',
    subTopic: 'Pilar Negara (Bhinneka Tunggal Ika)',
    text: 'Semboyan "Bhinneka Tunggal Ika" dikutip dari kakawin Sutasoma pupuh 139 bait 5 karya Mpu Tantular pada zaman Kerajaan Majapahit. Konteks historis kemunculan frasa tersebut pada masa itu ditujukan untuk mendamaikan dan mempersatukan penganut agama...',
    explanation: `**Kunci Jawaban: A**

**Pembahasan:**
Kutipan lengkap dalam Kakawin Sutasoma:
*"Rwaneka dhatu winuwus Buddha Wiswa, Bhinnekirang winwa dadi syat tontonan, Mangka ng Jinatwa kalawan Siwatatwa tunggal, Bhinneka tunggal ika, tan hana dharma mangrwa."*
Artinya: Konsep ketuhanan Buddha dan Siwa dipandang berbeda, tetapi sejatinya hakikat kebenaran Jina (Buddha) dan Siwa (Hindu Siwa) adalah tunggal. Tidak ada kebenaran yang mendua.
Frasa ini lahir untuk menyatukan penganut **Hindu (Siwa) dan Buddha** dalam harmoni kehidupan Kerajaan Majapahit abad ke-14 di bawah pemerintahan Raja Hayam Wuruk.

- **Opsi A (Tepat):** Siwa (Hindu) dan Buddha (Jina).`,
    options: [
      { key: 'A', text: 'Siwa (Hindu) dan Buddha (Jina) yang hidup berdampingan di bawah naungan Kerajaan Majapahit', score: 5 },
      { key: 'B', text: 'Islam dan Hindu saat proses awal masuknya saudagar Gujarat di pesisir utara pulau Jawa', score: 0 },
      { key: 'C', text: 'Kepercayaan animisme dinamisme lokal dengan pengaruh kebudayaan peradaban Helenistik Yunani', score: 0 },
      { key: 'D', text: 'Kristen Katolik dan Protestan pasca-kedatangan penjelajah samudra bangsa Portugis di Maluku', score: 0 },
      { key: 'E', text: 'Aliran kepercayaan Kejawen dengan tarekat sufi yang berkembang di wilayah pedalaman Mataram', score: 0 },
    ],
  },
  {
    orderNumber: 24,
    category: 'TWK',
    subTopic: 'Pilar Negara (NKRI)',
    text: 'Berdasarkan Pasal 1 Ayat (1) UUD 1945, "Negara Indonesia ialah Negara Kesatuan yang berbentuk Republik". Dalam penyelenggaraan pemerintahan daerah berdasarkan UU No. 23 Tahun 2014, urusan pemerintahan absolut yang sepenuhnya menjadi kewenangan Pemerintah Pusat dan TIDAK diserahkan kepada daerah otonom adalah...',
    explanation: `**Kunci Jawaban: E**

**Pembahasan:**
Pasal 10 UU No. 23 Tahun 2014 tentang Pemerintahan Daerah membagi urusan pemerintahan absolut ke dalam 6 bidang yang sepenuhnya dikuasai Pemerintah Pusat:
1. Politik Luar Negeri
2. Pertahanan
3. Keamanan
4. Yustisi (Hukum/Peradilan)
5. Moneter dan Fiskal Nasional
6. Agama

Urusan pendidikan, kesehatan, pekerjaan umum, sosial, dan pariwisata merupakan urusan pemerintahan konkuren yang dibagi antara pusat, provinsi, dan kabupaten/kota.

- **Opsi E (Tepat):** Politik luar negeri, pertahanan, keamanan, yustisi, moneter/fiskal nasional, dan agama.`,
    options: [
      { key: 'A', text: 'Pendidikan dasar, kebudayaan daerah, perikanan tangkap, dan pengelolaan pariwisata bahari', score: 0 },
      { key: 'B', text: 'Pelayanan kesehatan rujukan, tata ruang wilayah kabupaten, dan pemadam kebakaran kota', score: 0 },
      { key: 'C', text: 'Perpajakan kendaraan bermotor, retribusi pasar tradisional, dan penanaman modal dalam negeri', score: 0 },
      { key: 'D', text: 'Pengelolaan transportasi angkutan kota, persampahan regional, dan izin mendirikan bangunan', score: 0 },
      { key: 'E', text: 'Politik luar negeri, pertahanan, keamanan, yustisi, moneter dan fiskal nasional, serta agama', score: 5 },
    ],
  },

  // ==========================================
  // BAHASA INDONESIA (Soal 25 - 30)
  // ==========================================
  {
    orderNumber: 25,
    category: 'TWK',
    subTopic: 'Bahasa Indonesia',
    text: `Bacalah paragraf berikut dengan cermat!

(1) Akselerasi transformasi digital di sektor pelayanan publik terus digencarkan guna memangkas prosedur birokrasi yang berbelit-belit. (2) Berbagai kementerian dan lembaga kini mengintegrasikan sistem informasi administrasi ke dalam satu portal layanan nasional terpadu. (3) Melalui digitalisasi ini, waktu pengurusan perizinan investasi dan pencatatan kependudukan yang sebelumnya memakan waktu berhari-hari kini dapat dirampungkan dalam hitungan menit. (4) Selain efisiensi waktu, transparansi alur kerja sistem elektronik ini secara drastis meminimalkan celah praktik pungutan liar dan percaloan. (5) Dengan demikian, integrasi digital layanan publik membuktikan peran krusialnya dalam mewujudkan tata kelola pemerintahan yang bersih, gesit, dan akuntabel.

Gagasan utama (ide pokok) paragraf di atas terletak pada...`,
    explanation: `**Kunci Jawaban: E**

**Pembahasan:**
Paragraf tersebut merupakan paragraf **deduktif-induktif** (campuran) atau berpola induktif kuat yang ditegaskan kembali pada kalimat (5). Kalimat (1) memaparkan upaya akselerasi transformasi digital untuk memangkas birokrasi, kalimat (2)-(4) merupakan kalimat penjelas (bukti integrasi portal, efisiensi waktu, dan transparansi memberantas pungli), dan kalimat (5) menyimpulkan inti keseluruhan bahwa integrasi layanan digital berperan penting mewujudkan tata kelola pemerintahan yang bersih, gesit, dan akuntabel.

- **Opsi E (Tepat):** Peran krusial integrasi digital pelayanan publik dalam menciptakan tata kelola pemerintahan yang bersih dan akuntabel.
- Opsi A, B, C, dan D hanya mencakup rincian penjelas pada kalimat-kalimat pengembang.`,
    options: [
      { key: 'A', text: 'Waktu perizinan investasi kependudukan yang saat ini berhasil diselesaikan dalam beberapa menit', score: 0 },
      { key: 'B', text: 'Pemberantasan calo dan pungutan liar melalui pembentukan satuan tugas gabungan kementerian', score: 0 },
      { key: 'C', text: 'Rencana kementerian dalam meluncurkan anggaran besar belanja perangkat lunak server aplikasi', score: 0 },
      { key: 'D', text: 'Keluhan masyarakat mengenai rumitnya alur birokrasi naskah dinas cetak konvensional masa lampau', score: 0 },
      { key: 'E', text: 'Peran krusial integrasi digital pelayanan publik dalam mewujudkan tata kelola pemerintahan yang bersih dan akuntabel', score: 5 },
    ],
  },
  {
    orderNumber: 26,
    category: 'TWK',
    subTopic: 'Bahasa Indonesia',
    text: 'Penulisan kata serapan dan tanda baca yang sepenuhnya mematuhi Pedoman Umum Ejaan Bahasa Indonesia (PUEBI / EYD Edisi V) terdapat pada kalimat...',
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Analisis kata baku dan ejaan:
- **Kalimat B (Benar):** *"Para peserta seminar menganalisis efektivitas standardisasi sistem manajemen mutu di laboratorium."* 
  - *menganalisis* (baku, dari analisis; bukan menganalisa).
  - *efektivitas* (baku; bukan efektifitas).
  - *standardisasi* (baku; bukan standarisasi).
  - *laboratorium* (baku; bukan laborat / laboratorik).

Koreksi opsi lain:
- Opsi A salah: "merubah" (seharusnya *mengubah*), "jadwal" sudah betul tapi "kwalitas" tidak baku (seharusnya *kualitas*).
- Opsi C salah: "praktek" (seharusnya *praktik*), "berfikir" (seharusnya *berpikir*), "konkrit" (seharusnya *konkret*).
- Opsi D salah: "resiko" (seharusnya *risiko*), "prosentase" (seharusnya *persentase*).
- Opsi E salah: "hakekatnya" (seharusnya *hakikatnya*), "antri" (seharusnya *antre*), "apotik" (seharusnya *apotek*).`,
    options: [
      { key: 'A', text: 'Pimpinan instansi merubah jadwal rapat pleno agar kwalitas keputusan yang diambil lebih optimal.', score: 0 },
      { key: 'B', text: 'Para peserta seminar menganalisis efektivitas standardisasi sistem manajemen mutu di laboratorium.', score: 5 },
      { key: 'C', text: 'Dalam praktek di lapangan, setiap aparat harus berfikir jernih dalam mengambil tindakan konkrit.', score: 0 },
      { key: 'D', text: 'Manajemen risiko harus dihitung berdasarkan analisa prosentase kegagalan teknis tahun sebelumnya.', score: 0 },
      { key: 'E', text: 'Pada hakekatnya para pemohon surat izin rela antri berjam-jam di depan loket apotik rujukan.', score: 0 },
    ],
  },
  {
    orderNumber: 27,
    category: 'TWK',
    subTopic: 'Bahasa Indonesia',
    text: `Cermatilah kalimat berikut ini!

"Bagi seluruh peserta ujian seleksi Computer Assisted Test (CAT) diwajibkan membawa kartu tanda peserta dan berpakaian kemeja putih rapi."

Agar kalimat di atas menjadi kalimat efektif yang gramatikal dan berstruktur padu, perbaikan yang tepat adalah...`,
    explanation: `**Kunci Jawaban: A**

**Pembahasan:**
Kalimat pada soal tidak memiliki subjek yang jelas karena diawali oleh preposisi "Bagi", sehingga subjeknya menjadi keterangan ("Bagi seluruh peserta ujian..."). Selain itu predikatnya pasif "diwajibkan", sehingga fungsi kalimat menjadi rancu.

Perbaikan yang efektif:
Hilangkan kata "Bagi" sehingga frasa "Seluruh peserta ujian..." berfungsi sebagai Subjek (S), diikuti Predikat (P) "diwajibkan membawa..." atau "wajib membawa...".
Serta keparalelan verba: "wajib membawa kartu tanda peserta dan mengenakan kemeja putih rapi."

- **Opsi A (Tepat):** Menghapus preposisi "Bagi" dan memperbaiki frasa kata kerja agar berstruktur Subjek-Predikat-Objek yang jelas.`,
    options: [
      { key: 'A', text: 'Menghilangkan kata depan "Bagi" sehingga subjek kalimat menjadi jelas dan tidak rancu', score: 5 },
      { key: 'B', text: 'Menambahkan kata "yang mana" setelah frasa "Computer Assisted Test (CAT)"', score: 0 },
      { key: 'C', text: 'Mengganti kata "diwajibkan" dengan "maka diharapkan agar supaya bersedia"', score: 0 },
      { key: 'D', text: 'Meletakkan kata "diwajibkan" di posisi paling awal sebelum kata "Bagi"', score: 0 },
      { key: 'E', text: 'Mengubah kata kerja "membawa" menjadi kata benda "pembawaan"', score: 0 },
    ],
  },
  {
    orderNumber: 28,
    category: 'TWK',
    subTopic: 'Bahasa Indonesia',
    text: `Bacalah kutipan tajuk rencana berikut!

Peralihan dari energi fosil menuju energi baru terbarukan (EBT) bukan lagi sekadar pilihan cadangan, melainkan keharusan mendesak demi menjaga stabilitas iklim bumi. Emisi gas rumah kaca yang tak terkendali telah memicu cuaca ekstrem dan mengancam produktivitas pertanian nasional. Kendati demikian, investasi awal untuk pembangunan pembangkit listrik tenaga surya dan bayu membutuhkan pendanaan masif serta transfer teknologi canggih. Tanpa regulasi yang menjamin kepastian tarif dan kemudahan izin investasi hijau, target bauran energi nasional dikhawatirkan gagal terwujud.

Simpulan yang paling tepat dan logis dari paragraf tersebut adalah...`,
    explanation: `**Kunci Jawaban: C**

**Pembahasan:**
Simpulan paragraf harus mencakup gagasan pokok (urgensi transisi ke EBT) dan syarat penentu keberhasilannya (kebutuhan regulasi pendanaan, perizinan, dan kepastian investasi hijau).

- **Opsi C (Tepat):** Transisi ke energi baru terbarukan sangat mendesak demi stabilitas iklim, namun keberhasilannya mutlak memerlukan dukungan regulasi kepastian investasi dan pendanaan yang kuat.
- Opsi A hanya menyebutkan aspek perubahan iklim tanpa solusi regulasi.
- Opsi B keliru karena menyatakan mustahil beralih dari energi fosil.
- Opsi D & E menyederhanakan masalah dan tidak menyimpulkan teks secara komprehensif.`,
    options: [
      { key: 'A', text: 'Indonesia dipastikan gagal mencapai bauran energi hijau akibat kondisi geografis yang tidak bersahabat', score: 0 },
      { key: 'B', text: 'Energi fosil tetap harus dipertahankan sebagai satu-satunya penopang kelistrikan hingga abad mendatang', score: 0 },
      { key: 'C', text: 'Keberhasilan transisi menuju EBT yang mendesak mutlak memerlukan kepastian regulasi investasi dan dukungan pendanaan', score: 5 },
      { key: 'D', text: 'Pemerintah harus menutup seluruh pembangkit listrik tenaga batu bara secara serentak bulan depan', score: 0 },
      { key: 'E', text: 'Sektor pertanian merupakan satu-satunya industri yang terdampak langsung oleh emisi gas rumah kaca', score: 0 },
    ],
  },
  {
    orderNumber: 29,
    category: 'TWK',
    subTopic: 'Bahasa Indonesia',
    text: `Cermatilah penggunaan konjungsi antarkalimat pada teks berikut!

"Pemerintah telah memperketat pengawasan lalu lintas satwa langka yang dilindungi di bandara internasional. [...], sindikat penyelundup satwa masih kerap memanfaatkan jalur pelabuhan tikus yang minim penjagaan."

Kata penghubung (konjungsi) antarkalimat yang paling tepat untuk mengisi bagian rumpang di atas adalah...`,
    explanation: `**Kunci Jawaban: D**

**Pembahasan:**
Hubungan antara kalimat pertama (upaya pengetatan di bandara) dengan kalimat kedua (masih lolosnya penyelundupan lewat pelabuhan tikus) adalah hubungan **pertentangan / perlawanan antarkalimat**.

Konjungsi antarkalimat yang menyatakan pertentangan:
- *Meskipun demikian,*
- *Akan tetapi,*
- *Namun,*

Perhatikan bahwa *walaupun* dan *meskipun* adalah konjungsi intrakalimat subordinatif (tidak boleh diawali di awal kalimat mandiri yang berdiri sendiri tanpa klausa utama). Kata *Sehingga* dan *Bahkan* bukan hubungan perlawanan.

- **Opsi D (Tepat):** "Akan tetapi," / "Namun," yang diikuti tanda koma.`,
    options: [
      { key: 'A', text: 'Oleh karena itu,', score: 0 },
      { key: 'B', text: 'Bahkan sebaliknya,', score: 0 },
      { key: 'C', text: 'Sehingga dengan demikian,', score: 0 },
      { key: 'D', text: 'Akan tetapi,', score: 5 },
      { key: 'E', text: 'Kemudian dari pada itu,', score: 0 },
    ],
  },
  {
    orderNumber: 30,
    category: 'TWK',
    subTopic: 'Bahasa Indonesia',
    text: `Cermatilah kalimat dalam draf surat dinas resmi berikut ini!

"Kami mengucapkan beribu-ribu terima kasih yang sebesar-besarnya atas kehadiran daripada Bapak dan Ibu para hadirin sekalian di ruang aula rapat."

Kesalahan pleonasme (penggunaan kata mubazir berlebih) pada kalimat tersebut dapat diperbaiki menjadi kalimat yang santun, lugas, dan baku yaitu...`,
    explanation: `**Kunci Jawaban: B**

**Pembahasan:**
Unsur-unsur pleonasme / mubazir pada kalimat soal:
1. "beribu-ribu terima kasih yang sebesar-besarnya" -> cukup "terima kasih yang sebesar-besarnya" atau "terima kasih".
2. "daripada" -> penggunaan kata "daripada" untuk menyatakan milik/objek adalah salah; daripada hanya untuk perbandingan.
3. "Bapak dan Ibu para hadirin sekalian" -> kata *para*, *hadirin*, dan *sekalian* semuanya bermakna jamak (pleonasme bertingkat tiga).

Kalimat efektif yang tepat:
*"Kami mengucapkan terima kasih yang sebesar-besarnya atas kehadiran Bapak dan Ibu di ruang aula rapat."* atau *"Kami mengucapkan terima kasih atas kehadiran hadirin di aula rapat."*

- **Opsi B (Tepat):** "Kami mengucapkan terima kasih sebesar-besarnya atas kehadiran Bapak dan Ibu di aula rapat."`,
    options: [
      { key: 'A', text: 'Kami berterima kasih amat sangat luar biasa atas kehadiran para hadirin sekalian semua di aula rapat.', score: 0 },
      { key: 'B', text: 'Kami mengucapkan terima kasih sebesar-besarnya atas kehadiran Bapak dan Ibu di aula rapat.', score: 5 },
      { key: 'C', text: 'Beribu terima kasih kami haturkan atas daripada kehadiran seluruh rombongan bapak-bapak dan ibu-ibu sekalian.', score: 0 },
      { key: 'D', text: 'Terima kasih banyak diucapkan oleh kami bagi yang mana telah sudi menyempatkan hadir di ruang rapat.', score: 0 },
      { key: 'E', text: 'Atas kehadiran daripada para peserta rapat semua, kami menyampaikan rasa terima kasih setinggi langit.', score: 0 },
    ],
  },
];
