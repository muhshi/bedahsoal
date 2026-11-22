import { SeedQuestion } from './data-skd2-twk';

export const tkpQuestionsPaket2: SeedQuestion[] = [
  // ==========================================
  // PELAYANAN PUBLIK (Soal 66 - 73)
  // ==========================================
  {
    orderNumber: 66,
    category: 'TKP',
    subTopic: 'Pelayanan Publik',
    text: 'Anda bertugas di loket pelayanan kependudukan. Saat antrean warga sedang sangat padat di siang hari, seorang kakek penyandang disabilitas fisik dengan kursi roda tampak kesulitan mengambil nomor antrean dan kebingungan di pintu masuk. Sikap yang Anda ambil adalah...',
    explanation: `**Indikator: Pelayanan Publik & Kepedulian Kelompok Rentan (BerAKHLAK: Berorientasi Pelayanan)**

**Rubrik Penilaian:**
- **Skor 5 (E):** Proaktif, tanggap melayani kelompok rentan dengan mendatangi langsung, membantu mengambil nomor antrean prioritas, dan memberikan pelayanan tuntas tanpa menunda.
- **Skor 4 (C):** Meminta petugas keamanan/satpam membantu dengan cepat mendampingi kakek tersebut ke loket khusus prioritas.
- **Skor 3 (B):** Mengarahkan dari balik loket dan memberitahukan warga lain agar membantu kakek tersebut.
- **Skor 2 (A):** Menunggu hingga kakek tersebut sampai di depan loket Anda baru menanyakan keperluannya.
- **Skor 1 (D):** Membiarkan saja karena merasa tugas memandu di pintu masuk adalah urusan satpam dan bukan bagian dari uraian tugas loket Anda.`,
    options: [
      { key: 'A', text: 'Tetap di loket dan menunggu kakek tersebut berhasil mendekat ke loket Anda untuk bertanya', score: 2 },
      { key: 'B', text: 'Memberi instruksi dari kejauhan dan meminta warga di antrean membantu membimbing kursi rodanya', score: 3 },
      { key: 'C', text: 'Segera berkoordinasi dengan petugas keamanan untuk mendampingi kakek tersebut ke jalur loket prioritas', score: 4 },
      { key: 'D', text: 'Fokus melayani pemohon di depan Anda karena pengaturan antrean pintu masuk bukan tanggung jawab Anda', score: 1 },
      { key: 'E', text: 'Izin sejenak kepada pemohon di loket, segera menghampiri sang kakek, mengambilkan nomor antrean prioritas, dan memandunya ke ruang tunggu nyaman', score: 5 },
    ],
  },
  {
    orderNumber: 67,
    category: 'TKP',
    subTopic: 'Pelayanan Publik',
    text: 'Seorang warga meluapkan amarahnya di media sosial resmi dinas tempat Anda bertugas karena permohonan izin operasional usahanya belum terbit melampaui estimasi waktu SOP. Unggahan tersebut menjadi viral dan memicu komentar negatif warganet. Sebagai admin layanan dan ASN yang membidangi, respon Anda adalah...',
    explanation: `**Indikator: Pelayanan Publik Prima & Komunikasi Krisis (BerAKHLAK: Berorientasi Pelayanan, Akuntabel)**

**Rubrik Penilaian:**
- **Skor 5 (B):** Merespon cepat dengan permohonan maaf atas ketidaknyamanan, meminta nomor berkas pemohon via jalur resmi/DM untuk verifikasi data segera, mengecek kendala di internal, dan memberikan klarifikasi progres secara transparan.
- **Skor 4 (A):** Menuliskan komentar permohonan maaf dan mengarahkan warga tersebut untuk datang langsung ke kantor dinas guna menemui pimpinan bagian perizinan.
- **Skor 3 (C):** Menjelaskan di kolom komentar bahwa berkas pemohon memang sedang diproses dan keterlambatan akibat lonjakan permohonan.
- **Skor 2 (D):** Membalas komentar dengan nada defensif bahwa instansi sudah bekerja keras dan warga harus sabar mengikuti antrean sistem.
- **Skor 1 (E):** Menghapus unggahan komentar warga tersebut serta memblokir akunnya agar citra instansi tidak tercemar.`,
    options: [
      { key: 'A', text: 'Meminta maaf atas keterlambatan dan menyarankan warga tersebut datang langsung ke kantor menemui petugas berwenang', score: 4 },
      { key: 'B', text: 'Merespon santun dan cepat, menyampaikan permohonan maaf, meminta nomor registrasi permohonan untuk dilacak langsung ke tim teknis, serta memberikan kepastian tindak lanjut', score: 5 },
      { key: 'C', text: 'Mengomentari unggahan tersebut dengan menjelaskan bahwa lonjakan permohonan menyebabkan seluruh berkas tertunda', score: 3 },
      { key: 'D', text: 'Mengingatkan warga bahwa memviralkan masalah di medsos melanggar etika dan harus bersabar menunggu proses verifikasi', score: 2 },
      { key: 'E', text: 'Menghapus komentar dan memblokir akun warga tersebut agar kegaduhan di kolom komentar akun dinas mereda', score: 1 },
    ],
  },
  {
    orderNumber: 68,
    category: 'TKP',
    subTopic: 'Pelayanan Publik',
    text: 'Seorang pengusaha datang ke meja pelayanan Anda hendak mengurus perpanjangan izin trayek. Karena ingin urusannya selesai kilat dalam 30 menit, ia menyelipkan amplop tebal berisi uang tunai ke bawah map dokumen Anda sambil berbisik agar Anda mempercepat tanda tangan persetujuan. Sikap Anda adalah...',
    explanation: `**Indikator: Integritas Pelayanan Publik & Anti-Gratifikasi (BerAKHLAK: Akuntabel)**

**Rubrik Penilaian:**
- **Skor 5 (C):** Menolak secara tegas dan santun uang tersebut, mengembalikan amplop seketika, mengedukasi pemohon bahwa seluruh layanan gratis/sesuai tarif resmi PNBP, serta memproses berkas sesuai standar antrean SOP yang berlaku.
- **Skor 4 (D):** Mengembalikan amplop uang tersebut dengan nada serius dan mengingatkan pemohon tentang bahaya hukum penyuapan terhadap aparatur sipil negara.
- **Skor 3 (E):** Menolak uang tersebut namun meminta pemohon menunggu di ruang tunggu tanpa memberikan penjelasan edukatif.
- **Skor 2 (B):** Menyimpan amplop tersebut sementara dan berencana menyerahkannya ke bagian keuangan kantor sebagai uang sumbangan sukarela instansi.
- **Skor 1 (A):** Menerima amplop tersebut dengan alasan uang terima kasih sukarela dan mempercepat proses penerbitan izin pengusaha tersebut.`,
    options: [
      { key: 'A', text: 'Menerima amplop tersebut karena pemohon memberikannya secara ikhlas tanpa paksaan, lalu segera memproses berkasnya', score: 1 },
      { key: 'B', text: 'Mengambil amplop tersebut untuk nantinya disetorkan ke kas mushola kantor sebagai infak', score: 2 },
      { key: 'C', text: 'Mengembalikan amplop seketika secara santun namun tegas, menegaskan bahwa pelayanan bebas pungli dan gratifikasi, serta memproses izin sesuai regulasi SOP', score: 5 },
      { key: 'D', text: 'Menegur keras pemohon di hadapan warga lain bahwa tindakan menyuap pejabat adalah tindak pidana korupsi yang dapat dipolisikan', score: 4 },
      { key: 'E', text: 'Menolak amplop tersebut sambil menunjukkan wajah masam dan mendiamkan berkas permohonannya hingga jam pulang kantor', score: 3 },
    ],
  },
  {
    orderNumber: 69,
    category: 'TKP',
    subTopic: 'Pelayanan Publik',
    text: 'Jam pelayanan kantor Anda telah resmi ditutup pukul 16.00 WIB dan Anda sudah bersiap merapikan meja kerja untuk pulang. Tiba-tiba seorang ibu bersama anaknya yang sakit datang terengah-engah dari desa terpencil menempuh perjalanan 4 jam dengan angkutan umum, memerlukan surat rekomendasi rujukan berobat darurat ke rumah sakit pusat. Tindakan Anda adalah...',
    explanation: `**Indikator: Orientasi Pelayanan Kemanusiaan & Dedikasi (BerAKHLAK: Berorientasi Pelayanan)**

**Rubrik Penilaian:**
- **Skor 5 (A):** Menyalakan kembali komputer dan sistem, melayani pembuatan surat rekomendasi darurat tersebut dengan ramah hingga tuntas demi menyelamatkan pasien, dilandasi empati mendalam.
- **Skor 4 (B):** Menghubungi rekan piket darurat atau atasan langsung untuk meminta izin menerbitkan surat secara cepat bagi ibu tersebut.
- **Skor 3 (C):** Memberikan surat rujukan sementara secara manual dan meminta ibu tersebut kembali besok pagi untuk cap basah resmi.
- **Skor 2 (D):** Menjelaskan bahwa jam loket telah tutup dan memintanya mencari penginapan terdekat untuk mendaftar kembali esok hari.
- **Skor 1 (E):** Mengunci pintu loket dan mengabaikannya karena jam kerja sudah selesai dan lembur tidak dibayar.`,
    options: [
      { key: 'A', text: 'Membatalkan rencana pulang, menyalakan kembali perangkat kerja, dan segera memproses surat rujukan darurat hingga selesai tuntas', score: 5 },
      { key: 'B', text: 'Mengkonsultasikan situasi darurat tersebut kepada atasan untuk mendapatkan diskresi pelayanan di luar jam kerja resmi', score: 4 },
      { key: 'C', text: 'Membuatkan memo darurat tulisan tangan dan menyarankan ibu tersebut melapor ke petugas jaga malam rumah sakit', score: 3 },
      { key: 'D', text: 'Memberitahu dengan sopan bahwa loket sudah tutup dan memintanya datang paling awal pada keesokan harinya', score: 2 },
      { key: 'E', text: 'Bergegas meninggalkan kantor karena jam kerja telah usai dan kepatuhan jam pulang merupakan hak pegawai', score: 1 },
    ],
  },
  {
    orderNumber: 70,
    category: 'TKP',
    subTopic: 'Pelayanan Publik',
    text: 'Instansi Anda baru saja meluncurkan aplikasi pelayanan terpadu berbasis web. Banyak warga lanjut usia dan masyarakat awam yang mengeluh kesulitan mengunggah dokumen persyaratan secara daring dan menuntut sistem manual kertas dikembalikan seperti semula. Sikap Anda menghadapi situasi ini adalah...',
    explanation: `**Indikator: Pelayanan Publik Inovatif & Inklusif (BerAKHLAK: Adaptif, Berorientasi Pelayanan)**

**Rubrik Penilaian:**
- **Skor 5 (D):** Mengusulkan dan membuka layanan pendampingan tatap muka (*helpdesk* asistensi digital) di kantor untuk membantu warga yang kesulitan, sembari memberikan edukasi langkah demi langkah tanpa menghentikan modernisasi digital.
- **Skor 4 (B):** Menyusun buku panduan infografis dan video tutorial sederhana yang disebarkan melalui pamflet dan grup RT/RW.
- **Skor 3 (A):** Melayani secara manual sementara khusus bagi warga lansia sembari menunggu mereka terbiasa.
- **Skor 2 (C):** Mengabaikan keluhan karena digitalisasi merupakan instruksi wajib dari kementerian pusat yang tidak bisa ditawar.
- **Skor 1 (E):** Mengusulkan kepada pimpinan agar aplikasi digital dihapus saja karena terbukti merepotkan masyarakat.`,
    options: [
      { key: 'A', text: 'Membuat kebijakan lokal untuk melayani secara manual saja bagi pemohon yang tidak memiliki gawai pintar', score: 3 },
      { key: 'B', text: 'Membuat poster dan infografis panduan alur aplikasi yang mudah dipahami lalu ditempel di dinding kantor', score: 4 },
      { key: 'C', text: 'Menegaskan kepada masyarakat bahwa sistem digital bersifat wajib sehingga masyarakat yang harus beradaptasi', score: 2 },
      { key: 'D', text: 'Menyediakan pojok asistensi digital (helpdesk tatap muka) di ruang layanan untuk mendampingi warga yang kesulitan secara sabar', score: 5 },
      { key: 'E', text: 'Menyarankan pimpinan membatalkan migrasi digital demi menghindari penolakan dan unjuk rasa warga', score: 1 },
    ],
  },
  {
    orderNumber: 71,
    category: 'TKP',
    subTopic: 'Pelayanan Publik',
    text: 'Anda melihat rekan kerja satu ruangan di meja informasi bersikap ketus dan membentak seorang warga desa yang berulang kali menanyakan cara mengisi formulir permohonan akta. Warga tersebut tampak gemetar dan malu di hadapan orang banyak. Tindakan Anda adalah...',
    explanation: `**Indikator: Standar Etika Pelayanan & Mediasi Santun (BerAKHLAK: Harmonis, Berorientasi Pelayanan)**

**Rubrik Penilaian:**
- **Skor 5 (C):** Menghampiri dengan tenang, mengambil alih komunikasi secara santun dan ramah untuk membimbing warga desa tersebut mengisi formulir hingga paham, lalu setelahnya mengingatkan rekan kerja secara empat mata tentang etika pelayanan prima.
- **Skor 4 (E):** Membantu menenangkan warga tersebut dan memberikan air minum sambil mendampinginya menyelesaikan berkas pendaftaran.
- **Skor 3 (B):** Mengingatkan rekan kerja Anda di tempat agar bersabar dan menurunkan intonasi suaranya.
- **Skor 2 (D):** Melaporkan insiden tersebut secara tertulis kepada kepala seksi tanpa membantu warga yang kebingungan.
- **Skor 1 (A):** Diam saja karena tidak ingin merusak hubungan pertemanan dengan rekan kerja sesama staf.`,
    options: [
      { key: 'A', text: 'Memilih diam dan tidak ikut campur urusan rekan kerja agar tidak memicu ketegangan di antara sesama pegawai', score: 1 },
      { key: 'B', text: 'Menegur rekan kerja secara langsung di depan warga agar ia segera meminta maaf atas ketidaksopanannya', score: 3 },
      { key: 'C', text: 'Mengambil alih pelayanan dengan ramah untuk memandu warga tersebut menyelesaikan formulirnya, lalu mengingatkan rekan kerja secara privat', score: 5 },
      { key: 'D', text: 'Mencatat nama rekan kerja tersebut dan langsung melaporkan pelanggaran perilakunya ke atasan tanpa mendampingi warga', score: 2 },
      { key: 'E', text: 'Menenangkan warga desa tersebut dan mengajaknya duduk di sofa tunggu untuk dibantu oleh petugas lain', score: 4 },
    ],
  },
  {
    orderNumber: 72,
    category: 'TKP',
    subTopic: 'Pelayanan Publik',
    text: 'Di tengah jam sibuk pelayanan, sistem jaringan internet pusat mengalami kendala teknis (server *down*) di seluruh karesidenan. Ratusan pemohon mulai gelisah dan gaduh di ruang tunggu. Langkah paling solutif yang Anda lakukan adalah...',
    explanation: `**Indikator: Ketanggapan Krisis Layanan Publik (BerAKHLAK: Adaptif, Berorientasi Pelayanan)**

**Rubrik Penilaian:**
- **Skor 5 (B):** Mengumumkan situasi gangguan secara transparan dan simpatik melalui pengeras suara, mencatat nomor kontak pemohon dan berkas fisik secara teratur (tanda terima manual sementara), serta menjamin pemrosesan prioritas begitu server pulih.
- **Skor 4 (A):** Menjelaskan situasi gangguan kepada perwakilan warga dan membagikan kartu nomor antrean khusus untuk diprioritaskan esok hari.
- **Skor 3 (C):** Meminta warga menunggu dengan tenang di ruang tunggu sambil menunggu tim IT pusat menyelesaikan pemeliharaan sistem.
- **Skor 2 (D):** Meminta warga pulang ke rumah masing-masing dan mengecek status perbaikan di laman web kementerian.
- **Skor 1 (E):** Masuk ke ruang kerja belakang dan menutup loket kaca agar tidak didatangi oleh warga yang protes.`,
    options: [
      { key: 'A', text: 'Membagikan kartu antrean prioritas kompensasi agar warga dapat langsung dilayani tanpa antre saat jaringan kembali normal', score: 4 },
      { key: 'B', text: 'Menyampaikan permohonan maaf dan penjelasan transparan lewat pengeras suara, mencatat tanda terima berkas secara manual, serta mengabari warga via SMS/WA saat sistem normal', score: 5 },
      { key: 'C', text: 'Meminta pemohon tetap tertib duduk di ruang tunggu sampai tim IT berhasil menyalakan kembali server', score: 3 },
      { key: 'D', text: 'Menyarankan seluruh warga pulang ke rumah dan baru datang kembali beberapa hari mendatang saat koneksi stabil', score: 2 },
      { key: 'E', text: 'Menutup loket pelayanan dan beristirahat di kantin hingga teknisi selesai memperbaiki server', score: 1 },
    ],
  },
  {
    orderNumber: 73,
    category: 'TKP',
    subTopic: 'Pelayanan Publik',
    text: 'Instansi Anda mendapatkan alokasi dana pembenahan fasilitas pelayanan publik. Berdasarkan kotak saran dan survei kepuasan masyarakat (SKM), banyak ibu menyusui dan warga difabel mengeluhkan ketiadaan fasilitas inklusif. Rekomendasi yang Anda ajukan dalam rapat tim adalah...',
    explanation: `**Indikator: Desain Pelayanan Publik Inklusif (BerAKHLAK: Berorientasi Pelayanan)**

**Rubrik Penilaian:**
- **Skor 5 (D):** Memprioritaskan alokasi dana untuk pembuatan ruang laktasi yang higienis, toilet ramah difabel, dan jalur kursi roda berstandar regulasi demi memenuhi hak-hak kelompok rentan.
- **Skor 4 (C):** Membagi anggaran secara seimbang antara renovasi ruang laktasi dan penambahan pendingin udara di ruang tunggu utama.
- **Skor 3 (B):** Mengusulkan pembelian televisi layar lebar dan dispenser minuman gratis di ruang tunggu umum.
- **Skor 2 (A):** Mengusulkan renovasi ruang kerja pegawai terlebih dahulu agar staf merasa lebih nyaman saat melayani.
- **Skor 1 (E):** Menolak usulan renovasi fasilitas khusus karena menganggap jumlah pemohon difabel dan ibu menyusui relatif sedikit.`,
    options: [
      { key: 'A', text: 'Mengalokasikan dana untuk mempercantik dekorasi lobi dan ruang kerja kepala dinas demi prestise instansi', score: 2 },
      { key: 'B', text: 'Membeli fasilitas hiburan seperti televisi kabel dan sofa mewah untuk pemohon di ruang tunggu umum', score: 3 },
      { key: 'C', text: 'Membagi dana secara proporsional untuk perbaikan fasilitas umum dan penyediaan bilik menyusui sederhana', score: 4 },
      { key: 'D', text: 'Memprioritaskan pemenuhan fasilitas ramah kelompok rentan (ruang laktasi, ramp difabel, dan toilet disabilitas) sesuai standar pelayanan prima', score: 5 },
      { key: 'E', text: 'Menunda pemanfaatan anggaran karena fasilitas yang ada saat ini dianggap sudah cukup bagi mayoritas warga normal', score: 1 },
    ],
  },

  // ==========================================
  // JEJARING KERJA (Soal 74 - 81)
  // ==========================================
  {
    orderNumber: 74,
    category: 'TKP',
    subTopic: 'Jejaring Kerja',
    text: 'Pemerintah sedang menggalakkan program percepatan penurunan stunting lintas sektoral. Dinas Anda ditunjuk sebagai koordinator lapangan yang melibatkan Dinas Kesehatan, Dinas Sosial, dan aparat kelurahan. Namun masing-masing instansi cenderung bekerja sendiri-sendiri (ego sektoral). Strategi yang Anda inisiasi adalah...',
    explanation: `**Indikator: Kolaborasi Lintas Sektor & Jejaring Strategis (BerAKHLAK: Kolaboratif)**

**Rubrik Penilaian:**
- **Skor 5 (E):** Menginisiasi forum koordinasi rutin terintegrasi dengan menetapkan *Key Performance Indicators* (KPI) bersama, pembagian peran kerja yang jelas, serta platform basis data terpadu penerima bantuan.
- **Skor 4 (A):** Mengadakan pertemuan konsolidasi informal yang hangat untuk menyamakan persepsi dan membangun kedekatan emosional antarpimpinan instansi.
- **Skor 3 (C):** Meminta dinas-dinas terkait mengirimkan laporan bulanan rutin ke meja Anda sebagai penanggung jawab.
- **Skor 2 (B):** Mengerjakan program stunting dengan mengandalkan staf internal dinas sendiri tanpa terlalu melibatkan dinas lain yang pasif.
- **Skor 1 (D):** Melaporkan kelemahan koordinasi instansi mitra kepada bupati/walikota agar mereka ditegur langsung.`,
    options: [
      { key: 'A', text: 'Menyelenggarakan lokakarya penyelarasan persepsi dan membangun komunikasi interpersonal yang intens antarpimpinan instansi', score: 4 },
      { key: 'B', text: 'Memilih menjalankan program stunting secara mandiri menggunakan anggaran dinas sendiri agar target cepat selesai', score: 2 },
      { key: 'C', text: 'Menetapkan target kerja dinas masing-masing dan hanya meminta data akhir tiap semester', score: 3 },
      { key: 'D', text: 'Melaporkan dinas-dinas yang tidak kooperatif kepada kepala daerah agar dijatuhi sanksi evaluasi anggaran', score: 1 },
      { key: 'E', text: 'Membangun komitmen kolaborasi terstruktur melalui nota kesepakatan (MoU), dasbor data bersama, dan evaluasi berkala capaian target penurunan stunting', score: 5 },
    ],
  },
  {
    orderNumber: 75,
    category: 'TKP',
    subTopic: 'Jejaring Kerja',
    text: 'Dalam rapat tim kerja gabungan penyusunan program tahunan, terjadi perdebatan panas antara Bagian Perencanaan dan Bagian Keuangan mengenai alokasi anggaran pelatihan digital. Keduanya bersikukuh dengan argumen masing-masing sehingga rapat menemui jalan buntu (*deadlock*). Sikap Anda adalah...',
    explanation: `**Indikator: Negosiasi, Mediasi Tim, & Orientasi Solusi Menang-Menang (BerAKHLAK: Harmonis, Kolaboratif)**

**Rubrik Penilaian:**
- **Skor 5 (C):** Mengambil inisiatif menawarkan jalan tengah (*win-win solution*) dengan menyusun simulasi bertahap (*pilot project* terukur) yang mengakomodasi efisiensi anggaran sekaligus menjaga sasaran strategis pelatihan.
- **Skor 4 (B):** Menengahi perdebatan secara netral, merangkum poin-poin kesepahaman kedua belah pihak, dan mengusulkan skema prioritas bertahap.
- **Skor 3 (D):** Meminta pimpinan rapat mengambil keputusan mutlak sepihak melalui voting terbanyak.
- **Skor 2 (A):** Memilih mendukung Bagian Perencanaan karena program digitalisasi memang tren masa kini.
- **Skor 1 (E):** Memilih walk out atau diam pasif karena perdebatan tersebut bukan urusan langsung seksi kerja Anda.`,
    options: [
      { key: 'A', text: 'Mendukung penuh Bagian Perencanaan karena inovasi digital mutlak diperlukan meski anggaran melonjak', score: 2 },
      { key: 'B', text: 'Mengajak kedua pihak menurunkan tensi emosi dan merumuskan ulang daftar skala prioritas program yang paling mendesak', score: 4 },
      { key: 'C', text: 'Menjembatani perbedaan dengan mengusulkan solusi integratif berupa implementasi bertahap berbasis indikator kinerja terukur yang hemat anggaran', score: 5 },
      { key: 'D', text: 'Mengusulkan pemungutan suara (voting) cepat agar rapat segera berakhir dan keputusan segera diketok', score: 3 },
      { key: 'E', text: 'Diam saja dan membiarkan kedua kubu berdebat hingga salah satu pihak kelelahan dan mengalah', score: 1 },
    ],
  },
  {
    orderNumber: 76,
    category: 'TKP',
    subTopic: 'Jejaring Kerja',
    text: 'Instansi Anda sedang merancang kebijakan baru terkait pengelolaan sampah terpadu berbasis masyarakat. Anda ditugaskan membangun kemitraan dengan organisasi non-pemerintah (LSM lingkungan) dan komunitas bank sampah warga. Langkah awal yang Anda tempuh adalah...',
    explanation: `**Indikator: Membangun Hubungan Kemitraan Strategis (BerAKHLAK: Kolaboratif)**

**Rubrik Penilaian:**
- **Skor 5 (A):** Membuka ruang dialog partisipatif melalui Focus Group Discussion (FGD), mendengarkan aspirasi dan masukan akar rumput komunitas, serta memposisikan LSM sebagai mitra sejajar dalam perumusan kebijakan.
- **Skor 4 (D):** Mengundang perwakilan pengurus komunitas bank sampah dan LSM untuk memaparkan draf program pemerintah dan meminta umpan balik.
- **Skor 3 (B):** Menyusun draf kebijakan terlebih dahulu hingga final di internal kantor lalu membagikannya ke LSM untuk disosialisasikan.
- **Skor 2 (C):** Memberikan bantuan dana hibah kepada komunitas dengan syarat mereka harus mendukung apapun kebijakan instansi.
- **Skor 1 (E):** Mengabaikan LSM lingkungan karena pemerintah memiliki wewenang hukum mutlak dalam mengatur tata kelola persampahan.`,
    options: [
      { key: 'A', text: 'Menyelenggarakan forum dengar pendapat terbuka (FGD) bersama komunitas untuk menggali perspektif lapangan dan merumuskan solusi kolaboratif', score: 5 },
      { key: 'B', text: 'Menyelesaikan seluruh regulasi secara mandiri di kantor, baru kemudian memerintahkan LSM membantu sosialisasi', score: 3 },
      { key: 'C', text: 'Mengikat komunitas mitra dengan iming-iming dana operasional asalkan tidak mengkritik rancangan kebijakan dinas', score: 2 },
      { key: 'D', text: 'Mengirimkan surat undangan koordinasi dan meminta masukan tertulis dari praktisi lingkungan hidup terhadap poin-poin draf kebijakan', score: 4 },
      { key: 'E', text: 'Membatasi pelibatan pihak eksternal karena dikhawatirkan akan memperlambat pengesahan peraturan daerah', score: 1 },
    ],
  },
  {
    orderNumber: 77,
    category: 'TKP',
    subTopic: 'Jejaring Kerja',
    text: 'Seorang teman akrab semasa kuliah yang kini menjadi direktur perusahaan swasta bidang teknologi menghubungi Anda untuk mengajak makan malam santai. Di tengah percakapan, ia mulai menanyakan bocoran spesifikasi teknis proyek pengadaan server yang akan dilelang oleh instansi Anda bulan depan. Sikap profesional Anda dalam menjaga jejaring pertemanan adalah...',
    explanation: `**Indikator: Batasan Etika Profesional dalam Jejaring Hubungan (BerAKHLAK: Akuntabel, Loyal)**

**Rubrik Penilaian:**
- **Skor 5 (B):** Menegaskan dengan santun dan ramah batas-batas profesionalisme jabatan, menolak membocorkan informasi rahasia lelang, serta menyarankannya mengikuti prosedur lelang terbuka sesuai jadwal resmi LPSE.
- **Skor 4 (E):** Mengalihkan topik pembicaraan ke kenangan masa kuliah dan menyampaikan bahwa urusan tender hanya dibahas melalui saluran resmi kantor.
- **Skor 3 (D):** Menolak secara ketus dan langsung meninggalkan tempat makan malam karena merasa integritas Anda diuji.
- **Skor 2 (C):** Memberikan sedikit gambaran umum yang tidak terlalu penting agar teman akrab tidak merasa tersinggung.
- **Skor 1 (A):** Memberikan bocoran spesifikasi teknis tersebut karena yakin teman akrab Anda akan memenangkan tender dan dapat memberikan komisi.`,
    options: [
      { key: 'A', text: 'Memberikan informasi spesifikasi umum secara rahasia sebagai bentuk solidaritas alumni perguruan tinggi', score: 1 },
      { key: 'B', text: 'Menyampaikan dengan tegas namun santun bahwa rincian lelang bersifat rahasia dan memintanya memantau pengumuman resmi di portal LPSE', score: 5 },
      { key: 'C', text: 'Memberikan bocoran sedikit saja asalkan ia berjanji tidak memberitahukan kepada rekan kantor lainnya', score: 2 },
      { key: 'D', text: 'Memarahi teman Anda di meja makan, memutus hubungan pertemanan seketika, dan melaporkannya ke aparat penegak hukum', score: 3 },
      { key: 'E', text: 'Mengalihkan topik obrolan ke tema lain dan menegaskan bahwa Anda tidak ingin mencampuradukkan urusan privat dan kedinasan', score: 4 },
    ],
  },
  {
    orderNumber: 78,
    category: 'TKP',
    subTopic: 'Jejaring Kerja',
    text: 'Anda baru saja dipindahtugaskan ke sebuah kelompok kerja (Pokja) strategis yang anggotanya terdiri atas perwakilan dari berbagai bidang yang belum pernah Anda kenal sebelumnya. Pada pertemuan pertama, sebagian besar anggota tampak pasif, canggung, dan enggan memulai interaksi. Tindakan proaktif Anda adalah...',
    explanation: `**Indikator: Membangun Kohesi Tim & Inisiatif Interpersonal (BerAKHLAK: Kolaboratif, Harmonis)**

**Rubrik Penilaian:**
- **Skor 5 (D):** Memulai inisiatif memperkenalkan diri secara hangat dan ramah, mengajak anggota berbagi keahlian dan harapan terhadap target tim, serta mengusulkan suasana diskusi yang cair dan egaliter.
- **Skor 4 (B):** Menyapa rekan-rekan satu per satu, menanyakan bidang asal masing-masing, dan membantu ketua pokja membagikan agenda rapat.
- **Skor 3 (A):** Menunggu arahan dari ketua pokja untuk memperkenalkan diri secara bergiliran sesuai tata tertib rapat.
- **Skor 2 (C):** Fokus membaca berkas materi rapat di meja sendiri tanpa mencoba membuka percakapan dengan rekan sebelah.
- **Skor 1 (E):** Mengeluhkan sikap pasif anggota pokja tersebut kepada teman di ruangan lama Anda.`,
    options: [
      { key: 'A', text: 'Duduk tenang menunggu ketua pokja membuka sesi perkenalan resmi satu per satu', score: 3 },
      { key: 'B', text: 'Menyapa ramah rekan di samping dan berusaha mencari tahu peran keahlian masing-masing untuk kelancaran tugas', score: 4 },
      { key: 'C', text: 'Fokus menelaah dokumen tugas Pokja di gawai pribadi tanpa perlu mencairkan suasana ruangan', score: 2 },
      { key: 'D', text: 'Mengambil inisiatif mencairkan suasana dengan sapaan hangat, mengajak bertukar gagasan, dan membangun antusiasme kolaborasi tim', score: 5 },
      { key: 'E', text: 'Menilai anggota tim lain tidak profesional dan memilih menjaga jarak dalam pergaulan dinas', score: 1 },
    ],
  },
  {
    orderNumber: 79,
    category: 'TKP',
    subTopic: 'Jejaring Kerja',
    text: 'Seksi kerja sebelah di dinas Anda sedang kelabakan menyelesaikan rekonsiliasi data inventaris aset daerah menjelang audit BPK karena dua orang stafnya jatuh sakit demam berdarah. Di sisi lain, tugas rutin harian Anda saat itu sudah selesai dikerjakan. Sikap yang Anda tunjukkan adalah...',
    explanation: `**Indikator: Sinergi Tim & Solidaritas Organisasi (BerAKHLAK: Kolaboratif, Harmonis)**

**Rubrik Penilaian:**
- **Skor 5 (B):** Melapor kepada atasan langsung untuk meminta izin menawarkan bantuan tenaga dan keahlian kepada seksi sebelah demi suksesnya audit BPK instansi secara keseluruhan.
- **Skor 4 (E):** Mendatangi seksi sebelah dan menanyakan bagian tugas data mana yang bisa Anda bantu kerjakan secara sukarela.
- **Skor 3 (A):** Memberikan semangat moril kepada kepala seksi sebelah dan mendoakan kesembuhan staf yang sedang sakit.
- **Skor 2 (C):** Memanfaatkan waktu luang untuk mempelajari modul pelatihan mandiri tanpa membantu seksi sebelah.
- **Skor 1 (D):** Bersantai bermain game atau mengobrol santai di kantin karena target pribadi hari itu sudah tercapai.`,
    options: [
      { key: 'A', text: 'Mengucapkan rasa simpati kepada kepala seksi sebelah atas musibah staf yang sakit tanpa menawarkan bantuan', score: 3 },
      { key: 'B', text: 'Meminta izin atasan untuk membantu meringankan beban pekerjaan rekan di seksi sebelah agar target audit instansi tercapai tepat waktu', score: 5 },
      { key: 'C', text: 'Mengisi waktu luang dengan memperdalam literasi kompetensi pribadi tanpa mencampuri urusan seksi lain', score: 2 },
      { key: 'D', text: 'Menikmati waktu luang dengan berselancar di media sosial karena beban kerja dinas Anda sudah terpenuhi', score: 1 },
      { key: 'E', text: 'Langsung bergabung ke meja kerja seksi sebelah untuk membantu memasukkan data aset yang menumpuk', score: 4 },
    ],
  },
  {
    orderNumber: 80,
    category: 'TKP',
    subTopic: 'Jejaring Kerja',
    text: 'Pemerintah daerah berencana menata kawasan sentra kuliner malam di alun-alun kota. Rencana ini melibatkan Dinas Perhubungan (rekayasa lalu lintas), Satpol PP (penertiban), dan Dinas Perdagangan (pemberdayaan pedagang). Namun, sering muncul ketegangan di lapangan antara Satpol PP dan para pedagang kaki lima binaan Dinas Perdagangan. Rekomendasi peran koordinasi yang Anda usulkan adalah...',
    explanation: `**Indikator: Mediasi Sektoral & Manajemen Konflik Lapangan (BerAKHLAK: Harmonis, Kolaboratif)**

**Rubrik Penilaian:**
- **Skor 5 (C):** Membentuk tim terpadu komunikasi persuasif lintas instansi yang melibatkan perwakilan paguyuban pedagang untuk menyepakati zona, jam operasional, dan tata tertib bersama sebelum penertiban dilakukan.
- **Skor 4 (A):** Mengadakan pertemuan mediasi antara pimpinan Satpol PP, Dinas Perdagangan, dan tokoh pedagang guna menyamakan persepsi penataan.
- **Skor 3 (D):** Meminta Dinas Perhubungan mendesain rekayasa jalur terlebih dahulu agar pedagang otomatis menyesuaikan tempat parkir.
- **Skor 2 (B):** Menyerahkan sepenuhnya penertiban kepada Satpol PP sesuai aturan hukum ketenteraman dan ketertiban umum.
- **Skor 1 (E):** Mengusulkan agar pedagang dipindahkan ke lokasi lain yang jauh dari pusat kota tanpa dialog.`,
    options: [
      { key: 'A', text: 'Mengadakan rapat konsolidasi mingguan antara pimpinan Satpol PP dan Dinas Perdagangan untuk mencegah gesekan', score: 4 },
      { key: 'B', text: 'Membiarkan Satpol PP bertindak tegas merazia seluruh gerobak pedagang yang melanggar batas trotoar', score: 2 },
      { key: 'C', text: 'Membentuk posko kerja bersama lintas instansi dan paguyuban pedagang untuk sosialisasi persuasif serta penetapan tata kelola zonasi yang disepakati bersama', score: 5 },
      { key: 'D', text: 'Fokus pada pengaturan arus lalu lintas Dinas Perhubungan tanpa menghiraukan dinamika relokasi pedagang', score: 3 },
      { key: 'E', text: 'Menyarankan penutupan permanen seluruh kegiatan pedagang kaki lima di sekitar alun-alun kota', score: 1 },
    ],
  },
  {
    orderNumber: 81,
    category: 'TKP',
    subTopic: 'Jejaring Kerja',
    text: 'Setelah mengikuti pelatihan kepemimpinan dan manajemen kinerja di Lembaga Administrasi Negara (LAN), Anda memiliki jaringan kontak yang luas dengan sesama ASN dari berbagai kementerian di seluruh penjuru Indonesia. Cara terbaik mendayagunakan jejaring profesional ini untuk kemajuan instansi Anda adalah...',
    explanation: `**Indikator: Pemanfaatan Jejaring Pengetahuan & Kolaborasi Antar-Lembaga (BerAKHLAK: Kompeten, Kolaboratif)**

**Rubrik Penilaian:**
- **Skor 5 (D):** Memelihara jejaring melalui komunitas praktisi (*community of practice*), berbagi praktik baik (*best practices*), memfasilitasi studi tiru inovasi, dan menjajaki kerja sama program antarinstansi secara berkelanjutan.
- **Skor 4 (B):** Secara berkala bertukar informasi pembaruan regulasi dan artikel inovasi kedinasan melalui forum komunikasi alumni.
- **Skor 3 (A):** Menyimpan kontak rekan alumni untuk dihubungi sewaktu-waktu jika membutuhkan bantuan teknis mendadak.
- **Skor 2 (C):** Menggunakan grup komunikasi alumni sebatas untuk bersilaturahmi santai dan bertukar ucapan hari raya.
- **Skor 1 (E):** Tidak pernah lagi berkomunikasi dengan rekan pelatihan karena merasa tugas pelatihan sudah selesai.`,
    options: [
      { key: 'A', text: 'Menyimpan nomor kontak rekan alumni untuk dimintai bantuan jika suatu saat instansi Anda mengalami kendala anggaran', score: 3 },
      { key: 'B', text: 'Rutin membagikan artikel inovasi dan bertukar informasi tren kebijakan publik di grup komunikasi alumni', score: 4 },
      { key: 'C', text: 'Menjadikan grup alumni sebagai ajang bertukar lelucon dan cerita santai pengusir kejenuhan jam kerja', score: 2 },
      { key: 'D', text: 'Membangun forum pertukaran praktik terbaik (best practices), studi komparasi inovasi, dan sinergi kebijakan lintas instansi secara berkesinambungan', score: 5 },
      { key: 'E', text: 'Keluar dari grup alumni pelatihan karena merasa silaturahmi formal hanya membebani memori ponsel pribadi', score: 1 },
    ],
  },

  // ==========================================
  // SOSIAL BUDAYA (Soal 82 - 89)
  // ==========================================
  {
    orderNumber: 82,
    category: 'TKP',
    subTopic: 'Sosial Budaya',
    text: 'Anda mendapatkan surat keputusan rotasi tugas ke wilayah pedalaman di provinsi yang memiliki norma adat, bahasa, dan kebiasaan yang sangat berbeda dengan daerah asal Anda. Beberapa kolega menakut-nakuti Anda tentang situasi daerah tersebut. Sikap awal yang Anda lakukan ketika tiba di tempat tugas baru adalah...',
    explanation: `**Indikator: Adaptabilitas & Penghormatan Keragaman Budaya (BerAKHLAK: Adaptif, Harmonis)**

**Rubrik Penilaian:**
- **Skor 5 (A):** Berpikiran terbuka, aktif bersilaturahmi dan sowan kepada tokoh adat/masyarakat setempat, mempelajari kearifan lokal serta tata krama setempat dengan rendah hati demi membangun kepercayaan.
- **Skor 4 (D):** Mempelajari bahasa daerah dasar dan norma kebiasaan warga sekitar melalui rekan kerja lokal di kantor penempatan.
- **Skor 3 (B):** Menjalankan tugas kedinasan di kantor seperti biasa tanpa terlalu banyak berinteraksi dengan lingkungan luar kantor.
- **Skor 2 (C):** Menuntut warga sekitar memaklumi gaya hidup Anda karena Anda berstatus sebagai aparat dari pemerintah pusat.
- **Skor 1 (E):** Segera mengajukan permohonan pindah kembali ke kota asal karena merasa cemas tidak cocok dengan budaya lokal.`,
    options: [
      { key: 'A', text: 'Membuka diri dengan rendah hati, bersilaturahmi kepada tetua adat dan masyarakat sekitar, serta mempelajari norma kearifan lokal setempat', score: 5 },
      { key: 'B', text: 'Fokus pada pekerjaan di dalam kantor dan memilih membatasi pergaulan sosial di pemukiman warga adat', score: 3 },
      { key: 'C', text: 'Meminta masyarakat setempat beradaptasi dengan budaya modern yang Anda bawa dari kota besar', score: 2 },
      { key: 'D', text: 'Belajar kosakata dasar bahasa daerah dan mengamati pola interaksi warga untuk mempermudah komunikasi kedinasan', score: 4 },
      { key: 'E', text: 'Mengajukan surat permohonan pembatalan mutasi kepada pejabat pembina kepegawaian', score: 1 },
    ],
  },
  {
    orderNumber: 83,
    category: 'TKP',
    subTopic: 'Sosial Budaya',
    text: 'Di ruang istirahat kantor, seorang pegawai melontarkan lelucon bernada stereotip negatif dan merendahkan terhadap suku rekan kerja baru yang sedang tidak berada di ruangan. Sebagian rekan lainnya tertawa mendengar gurauan tersebut. Sikap yang Anda ambil adalah...',
    explanation: `**Indikator: Keberanian Menegakkan Toleransi & Harmoni Sosial (BerAKHLAK: Harmonis)**

**Rubrik Penilaian:**
- **Skor 5 (C):** Menegur dengan tenang namun tegas bahwa lelucon berbasis stereotip SARA tidak pantas di lingkungan kerja profesional, serta mengingatkan pentingnya saling menghargai martabat sesama rekan kerja.
- **Skor 4 (B):** Tidak ikut tertawa, menyampaikan keberatan secara sopan, dan mengalihkan pembicaraan ke topik pekerjaan yang positif.
- **Skor 3 (E):** Menolak ikut tertawa dan memilih langsung meninggalkan ruangan istirahat untuk kembali ke meja kerja.
- **Skor 2 (A):** Tersenyum tipis demi menjaga suasana santai meskipun dalam hati Anda merasa tidak nyaman.
- **Skor 1 (D):** Ikut menimpali lelucon tersebut dengan stereotip suku lain agar suasana obrolan semakin ramai.`,
    options: [
      { key: 'A', text: 'Tersenyum sopan agar dianggap ramah oleh rekan-rekan senior yang sedang bergurau', score: 2 },
      { key: 'B', text: 'Menunjukkan ekspresi tidak setuju dan mengalihkan pembicaraan pada topik kerja yang lebih konstruktif', score: 4 },
      { key: 'C', text: 'Menegur secara santun namun tegas bahwa lelucon bernuansa SARA tidak etis di lingkungan kantor dan merusak keharmonisan tim', score: 5 },
      { key: 'D', text: 'Ikut menambahkan cerita stereotip dari daerah lain demi mencairkan suasana keakraban', score: 1 },
      { key: 'E', text: 'Segera beranjak keluar dari ruangan tanpa memberikan respon apapun kepada rekan yang bercanda', score: 3 },
    ],
  },
  {
    orderNumber: 84,
    category: 'TKP',
    subTopic: 'Sosial Budaya',
    text: 'Menjelang peringatan hari besar keagamaan dari salah satu kelompok minoritas di kantor, panitia membutuhkan dukungan sukarelawan untuk membantu dekorasi aula dan penataan tempat duduk para tamu undangan. Sebagai rekan kerja yang berbeda keyakinan, sikap Anda adalah...',
    explanation: `**Indikator: Toleransi Beragama & Solidaritas Kebangsaan (BerAKHLAK: Harmonis)**

**Rubrik Penilaian:**
- **Skor 5 (E):** Sukarela menawarkan diri membantu persiapan teknis logistik dan dekorasi tempat sebagai wujud toleransi, persaudaraan kebangsaan, dan saling mendukung tanpa mencampuri ritual ibadahnya.
- **Skor 4 (B):** Memberikan ucapan selamat perayaan dengan tulus dan bersedia membantu jika panitia meminta bantuan secara spesifik.
- **Skor 3 (A):** Menghadiri jamuan ramah tamah makan bersama saja saat rangkaian ibadah telah selesai dilaksanakan.
- **Skor 2 (D):** Memilih tidak terlibat sama sekali dengan dalih menjaga kemurnian keyakinan agama sendiri.
- **Skor 1 (C):** Memprotes penggunaan aula kantor untuk perayaan keagamaan minoritas karena menganggap kantor instansi harus steril dari simbol agama.`,
    options: [
      { key: 'A', text: 'Hanya hadir saat sesi pemotongan tumpeng atau santap siang bersama setelah seluruh persiapan selesai', score: 3 },
      { key: 'B', text: 'Menyampaikan ucapan selamat dan siap membantu apabila panitia kekurangan tenaga operasional lapangan', score: 4 },
      { key: 'C', text: 'Mengusulkan agar perayaan dipindahkan ke tempat ibadah di luar kantor agar aula tidak kotor', score: 1 },
      { key: 'D', text: 'Menghindari aula kantor sepanjang hari agar tidak dianggap mencampuradukkan urusan peribadatan', score: 2 },
      { key: 'E', text: 'Dengan senang hati bergotong royong membantu persiapan sarana tempat dan dekorasi sebagai wujud persaudaraan dan toleransi', score: 5 },
    ],
  },
  {
    orderNumber: 85,
    category: 'TKP',
    subTopic: 'Sosial Budaya',
    text: 'Dalam sebuah rapat dinas resmi yang dihadiri staf dari berbagai suku di Indonesia, sekelompok pegawai senior menggunakan bahasa daerah mereka dalam menyampaikan sanggahan dan berdiskusi intens di meja rapat, sehingga anggota rapat lain yang tidak mengerti bahasa tersebut merasa terasing dan bingung. Sikap Anda adalah...',
    explanation: `**Indikator: Etika Komunikasi Inklusif & Bahasa Persatuan (BerAKHLAK: Harmonis, Loyal)**

**Rubrik Penilaian:**
- **Skor 5 (B):** Mengingatkan pimpinan rapat atau forum dengan santun dan elegan agar forum resmi menggunakan Bahasa Indonesia sebagai bahasa persatuan kerja agar semua peserta memiliki pemahaman yang setara dan inklusif.
- **Skor 4 (D):** Mengajukan pertanyaan klarifikasi dengan sopan meminta rangkuman isi diskusi mereka diterjemahkan ke dalam Bahasa Indonesia.
- **Skor 3 (A):** Bertanya secara berbisik kepada rekan sebelah yang mengerti bahasa daerah tersebut untuk menerjemahkan maknanya.
- **Skor 2 (C):** Memilih diam dan mengabaikan pembicaraan mereka karena merasa tidak diikutsertakan.
- **Skor 1 (E):** Membalas dengan sengaja berbicara menggunakan bahasa daerah Anda sendiri yang rumit untuk menyindir mereka.`,
    options: [
      { key: 'A', text: 'Menanyakan terjemahan pembicaraan mereka kepada rekan di samping secara berbisik-bisik', score: 3 },
      { key: 'B', text: 'Mengusulkan dengan santun kepada pimpinan forum agar diskusi rapat menggunakan Bahasa Indonesia demi transparansi dan kebersamaan', score: 5 },
      { key: 'C', text: 'Mengabaikan jalannya rapat dan sibuk membuka laptop karena merasa tidak dihargai sebagai peserta rapat', score: 2 },
      { key: 'D', text: 'Menyela pembicaraan secara sopan dan memohon agar poin sanggahan dijelaskan ulang dalam Bahasa Indonesia resmi', score: 4 },
      { key: 'E', text: 'Membalas menyindir dengan berbicara bahasa daerah sendiri agar mereka menyadari kekeliruannya', score: 1 },
    ],
  },
  {
    orderNumber: 86,
    category: 'TKP',
    subTopic: 'Sosial Budaya',
    text: 'Anda ditugaskan menjadi ketua panitia jamuan makan malam kunjungan delegasi perwakilan kementerian dari berbagai latar belakang budaya, termasuk peserta yang memiliki pantangan makanan religius tertentu (halal, vegetarian, dan bebas gluten). Langkah yang Anda ambil adalah...',
    explanation: `**Indikator: Penghormatan Terhadap Keberagaman & Pelayanan Berorientasi Pengguna (BerAKHLAK: Berorientasi Pelayanan, Harmonis)**

**Rubrik Penilaian:**
- **Skor 5 (D):** Melakukan pendataan preferensi makanan sejak pendaftaran awal, bekerja sama dengan penyedia katering tersertifikasi untuk menyediakan menu variatif berlabel jelas (halal, vegetarian, bebas alergen), dan memastikan semua delegasi terlayani dengan nyaman.
- **Skor 4 (A):** Menyediakan alternatif menu prasmanan umum yang dilengkapi keterangan bahan baku di setiap wadah makanan.
- **Skor 3 (C):** Menyediakan menu standar nasional dan menyiapkan sedikit menu khusus jika ada delegasi yang komplain di tempat.
- **Skor 2 (B):** Meminta delegasi yang memiliki pantangan khusus untuk membawa bekal makanan sendiri dari hotel.
- **Skor 1 (E):** Menyeragamkan satu jenis menu tradisional lokal khas daerah tanpa memikirkan pantangan makanan delegasi.`,
    options: [
      { key: 'A', text: 'Menyediakan beragam menu masakan nusantara dan memasang label keterangan bahan pada setiap sajian makanan', score: 4 },
      { key: 'B', text: 'Menyarankan tamu yang memiliki pantangan makanan khusus memesan makanan sendiri melalui aplikasi ojek daring', score: 2 },
      { key: 'C', text: 'Menyajikan menu umum terlebih dahulu, lalu mengganti dengan makanan lain jika ada peserta yang meminta', score: 3 },
      { key: 'D', text: 'Mengonfirmasi daftar preferensi makanan delegasi terlebih dahulu dan menyediakan menu tersertifikasi dengan label identifikasi yang jelas dan higienis', score: 5 },
      { key: 'E', text: 'Menyajikan satu menu khas daerah tuan rumah agar seluruh tamu wajib menghormati tradisi kuliner setempat', score: 1 },
    ],
  },
  {
    orderNumber: 87,
    category: 'TKP',
    subTopic: 'Sosial Budaya',
    text: 'Di desa lokasi penempatan proyek irigasi dinas Anda, terdapat kepercayaan adat bahwa hari tertentu adalah hari pantang bekerja di sawah dan saluran air. Sementara jadwal proyek dinas memiliki batas waktu ketat yang harus segera diselesaikan. Langkah bijak yang Anda tempuh adalah...',
    explanation: `**Indikator: Keselarasan Kebijakan dengan Kearifan Lokal (BerAKHLAK: Adaptif, Kolaboratif)**

**Rubrik Penilaian:**
- **Skor 5 (C):** Mengadakan dialog musyawarah dengan tetua adat dan kepala desa untuk memahami makna tradisi tersebut, menyesuaikan jadwal kerja dinas tanpa melanggar pantangan adat, serta mengoptimalkan jam kerja di hari-hari lainnya agar target proyek tetap tercapai.
- **Skor 4 (B):** Menggeser jadwal pengerjaan saluran ke jenis pekerjaan administrasi/perakitan logistik di kantor pada hari pantang tersebut.
- **Skor 3 (D):** Meminta kepala desa mengumumkan bahwa proyek pemerintah memiliki kekebalan dari aturan adat istiadat desa.
- **Skor 2 (A):** Tetap memaksakan pekerja bekerja di lapangan dengan mengerahkan aparat keamanan untuk mengawasi.
- **Skor 1 (E):** Membatalkan seluruh proyek irigasi di desa tersebut dan mengalihkan anggarannya ke desa lain yang tidak memiliki pantangan adat.`,
    options: [
      { key: 'A', text: 'Memerintahkan kontraktor tetap bekerja di hari pantang dengan mengabaikan peringatan tetua adat desa', score: 2 },
      { key: 'B', text: 'Mengalihkan aktivitas pekerja pada hari pantang adat tersebut untuk mengerjakan perakitan material di bengkel kerja luar lokasi keramat', score: 4 },
      { key: 'C', text: 'Bermusyawarah secara santun dengan tetua adat guna menyelaraskan jadwal proyek tanpa menodai kearifan lokal, sembari mengoptimalkan percepatan di hari efektif', score: 5 },
      { key: 'D', text: 'Menegaskan kepada warga desa bahwa proyek pemerintah dilindungi undang-undang sehingga hukum adat tidak berlaku', score: 3 },
      { key: 'E', text: 'Menghentikan total seluruh bantuan pembangunan irigasi dan melaporkan desa tersebut menolak pembangunan nasional', score: 1 },
    ],
  },
  {
    orderNumber: 88,
    category: 'TKP',
    subTopic: 'Sosial Budaya',
    text: 'Di lingkungan rukun tetangga (RT) tempat tinggal Anda, akan diadakan kerja bakti membersihkan saluran pemukiman dan gotong royong perbaikan pos ronda pada hari Minggu pagi. Pada saat bersamaan, Anda merasa lelah setelah sepekan lembur di kantor. Peran sosial Anda sebagai warga sekaligus aparatur negara adalah...',
    explanation: `**Indikator: Partisipasi Sosial & Keteladanan Masyarakat (BerAKHLAK: Harmonis, Loyal)**

**Rubrik Penilaian:**
- **Skor 5 (E):** Bangun pagi, hadir di lokasi kerja bakti dengan gembira, berbaur bersama tetangga tanpa membedakan status sosial jabatan, dan ikut bergotong royong membersihkan lingkungan sebagai wujud keteladanan ASN.
- **Skor 4 (A):** Hadir mengikuti sebagian kegiatan kerja bakti dan menyumbangkan konsumsi makanan/minuman bagi warga yang bekerja.
- **Skor 3 (B):** Izin tidak bisa ikut kerja bakti fisik namun menitipkan uang iuran kas RT sebagai pengganti kehadiran.
- **Skor 2 (D):** Memilih tidur istirahat di rumah seharian dan baru keluar rumah pada sore hari untuk menyapa tetangga.
- **Skor 1 (C):** Menutup rapat pintu pagar rumah dan enggan bergaul karena merasa status ASN berada di atas masyarakat biasa.`,
    options: [
      { key: 'A', text: 'Menghadiri kerja bakti selama beberapa jam semampunya sambil menyumbang air mineral dan kudapan bagi warga', score: 4 },
      { key: 'B', text: 'Meminta izin kepada ketua RT tidak dapat hadir dan menitipkan uang kompensasi gotong royong', score: 3 },
      { key: 'C', text: 'Mengunci pintu rumah dan tidak peduli dengan kerja bakti karena hari Minggu adalah hak istirahat pegawai', score: 1 },
      { key: 'D', text: 'Beristirahat di dalam rumah dan baru menemui tetangga saat malam hari untuk mengobrol santai di pos ronda', score: 2 },
      { key: 'E', text: 'Mengesampingkan rasa lelah, hadir bergotong royong bersama warga, serta menjadi teladan kebersamaan hidup bertetangga', score: 5 },
    ],
  },
  {
    orderNumber: 89,
    category: 'TKP',
    subTopic: 'Sosial Budaya',
    text: 'Terjadi kesalahpahaman antarpemuda dari dua kelompok warga yang berbeda latar belakang etnis di wilayah binaan Anda yang nyaris memicu bentrokan massal. Posisi Anda saat itu berada di dekat lokasi kejadian. Tindakan preventif yang Anda lakukan adalah...',
    explanation: `**Indikator: Perekat Bangsa & Resolusi Konflik Komunal (BerAKHLAK: Harmonis)**

**Rubrik Penilaian:**
- **Skor 5 (A):** Segera menghubungi Babinsa, Bhabinkamtibmas, dan tokoh sesepuh kedua kelompok untuk hadir meredakan tensi, sembari berusaha menenangkan massa secara persuasif dan netral tanpa memihak salah satu kubu.
- **Skor 4 (C):** Meminta kedua kelompok pemuda mundur dan mengajak perwakilan kedua kubu berbicara damai di balai kelurahan terdekat.
- **Skor 3 (B):** Mengamankan anak-anak dan warga rentan menjauh dari lokasi keributan serta melaporkan ke pihak kepolisian.
- **Skor 2 (D):** Merekam video kejadian tersebut untuk dijadikan bukti laporan kepada pimpinan instansi.
- **Skor 1 (E):** Segera melarikan diri dari lokasi karena takut ikut terkena pukulan atau lemparan batu.`,
    options: [
      { key: 'A', text: 'Segera berkoordinasi cepat dengan aparat keamanan setempat dan tokoh masyarakat kedua belah pihak untuk meredakan ketegangan secara persuasif', score: 5 },
      { key: 'B', text: 'Menjauhkan warga sekitar ke tempat aman dan menunggu polisi datang menangani kerusuhan', score: 3 },
      { key: 'C', text: 'Berinisiatif mengajak perwakilan tokoh pemuda kedua pihak duduk bersama di posko untuk menelusuri akar masalah', score: 4 },
      { key: 'D', text: 'Mendokumentasikan insiden tersebut melalui kamera ponsel guna dijadikan bahan laporan ke pimpinan dinas', score: 2 },
      { key: 'E', text: 'Bergegas pergi meninggalkan lokasi agar tidak terseret dalam perselisihan antarwarga', score: 1 },
    ],
  },

  // ==========================================
  // TEKNOLOGI INFORMASI & KOMUNIKASI (Soal 90 - 96)
  // ==========================================
  {
    orderNumber: 90,
    category: 'TKP',
    subTopic: 'Teknologi Informasi & Komunikasi',
    text: 'Pemerintah menerapkan sistem persuratan dinas elektronik (*e-Office/Srikandi*) untuk menghentikan cetak kertas memo manual. Beberapa staf senior di unit kerja Anda merasa gagap teknologi (gaptek), mengeluh sistem baru menyulitkan, dan tetap meminta staf muda mencetakkan naskah dinas dalam bentuk fisik untuk dibaca. Sikap Anda adalah...',
    explanation: `**Indikator: Fasilitator Transformasi Digital & Literasi TIK (BerAKHLAK: Adaptif, Kompeten)**

**Rubrik Penilaian:**
- **Skor 5 (B):** Bersikap sabar dan empatik dengan mendampingi staf senior melakukan praktik langsung langkah demi langkah, membuat rangkuman panduan ringkas satu lembar, serta menunjukkan kemudahan persetujuan digital di ponsel pintar.
- **Skor 4 (E):** Membantu mendemokan fitur aplikasi secara berkala pada setiap jam luang hingga mereka terbiasa mandiri.
- **Skor 3 (A):** Menuruti permintaan mencetakkan dokumen sambil sesekali menyarankan mereka mencoba tombol di layar komputer.
- **Skor 2 (C):** Menyindir staf senior di depan rekan lain bahwa zaman sudah berubah dan pegawai gaptek akan tergilas zaman.
- **Skor 1 (D):** Menolak secara ketus membantu mencetak berkas dan menyuruh mereka membaca buku manual tebal sendiri.`,
    options: [
      { key: 'A', text: 'Tetap mencetakkan berkas fisik bagi staf senior sembari berharap mereka lama-kelamaan bersedia belajar sendiri', score: 3 },
      { key: 'B', text: 'Mendampingi secara sabar dengan metode asistensi praktis, membuat panduan ringkas fitur utama, dan memperlihatkan efisiensi persetujuan digital', score: 5 },
      { key: 'C', text: 'Mengkritik keengganan staf senior dalam rapat bidang karena menghambat target paperless instansi', score: 2 },
      { key: 'D', text: 'Menolak melayani cetak fisik dan meminta mereka menyelesaikan disposisi elektronik secara mandiri', score: 1 },
      { key: 'E', text: 'Membuat simulasi latihan berkala bersama seluruh rekan ruangan untuk menguasai pengoperasian aplikasi e-Office', score: 4 },
    ],
  },
  {
    orderNumber: 91,
    category: 'TKP',
    subTopic: 'Teknologi Informasi & Komunikasi',
    text: 'Saat sedang berada di kedai kopi bandara menunggu jadwal penerbangan tugas dinas, Anda harus mengirimkan draf dokumen kebijakan yang bersifat rahasia terbatas kepada atasan. Di kedai kopi tersebut tersedia jaringan Wi-Fi publik gratis tanpa sandi (*open Wi-Fi*). Langkah tepat yang Anda ambil terkait keamanan data adalah...',
    explanation: `**Indikator: Kesadaran Keamanan Siber & Perlindungan Data Kedinasan (BerAKHLAK: Akuntabel, Kompeten)**

**Rubrik Penilaian:**
- **Skor 5 (D):** Tidak menggunakan Wi-Fi publik terbuka yang rentan penyadapan (*man-in-the-middle attack*), melainkan menggunakan *tethering* data seluler pribadi yang aman serta mengaktifkan koneksi VPN resmi instansi untuk transmisi dokumen rahasia.
- **Skor 4 (A):** Menggunakan hotspot seluler ponsel pribadi tanpa menyambungkan laptop ke Wi-Fi publik gratisan.
- **Skor 3 (B):** Mengompresi dokumen dengan kata sandi sebelum mengirimkannya melalui jaringan Wi-Fi publik kedai kopi.
- **Skor 2 (E):** Menghubungkan ke Wi-Fi publik dan segera memutuskan sambungan setelah tombol kirim email ditekan.
- **Skor 1 (C):** Menggunakan Wi-Fi publik tanpa pengaman karena menganggap dokumen dinas tidak akan menarik minat peretas bandara.`,
    options: [
      { key: 'A', text: 'Menggunakan sambungan internet hotspot seluler pribadi dari gawai Anda untuk mengirimkan dokumen', score: 4 },
      { key: 'B', text: 'Mengunci berkas dengan kata sandi zip sederhana lalu mengirimkannya melalui jaringan Wi-Fi gratis kedai kopi', score: 3 },
      { key: 'C', text: 'Langsung menyambungkan laptop ke Wi-Fi publik gratis agar kuota internet ponsel pribadi Anda hemat', score: 1 },
      { key: 'D', text: 'Menghindari jaringan Wi-Fi publik tanpa enkripsi, menggunakan tethering data pribadi yang aman, dan mengaktifkan VPN resmi instansi saat transmisi berkas', score: 5 },
      { key: 'E', text: 'Menggunakan Wi-Fi kedai kopi secepat kilat untuk mengirim email lalu langsung mematikan antena koneksi', score: 2 },
    ],
  },
  {
    orderNumber: 92,
    category: 'TKP',
    subTopic: 'Teknologi Informasi & Komunikasi',
    text: 'Di grup pesan instan WhatsApp keluarga besar Anda, salah seorang kerabat membagikan tautan artikel berita sensasional yang menyatakan bahwa program bantuan sosial terbaru kementerian tempat Anda bekerja adalah skema penipuan data pribadi. Pesan tersebut mulai dipercayai oleh anggota keluarga lainnya. Tindakan Anda adalah...',
    explanation: `**Indikator: Literasi Digital, Klarifikasi Hoaks, & Duta Komunikasi Publik (BerAKHLAK: Loyal, Akuntabel)**

**Rubrik Penilaian:**
- **Skor 5 (C):** Melakukan pengecekan fakta ke sumber resmi instansi/kominfo, memberikan klarifikasi santun dan berbasis data valid di grup keluarga, menyertakan tautan resmi pemerintah, dan mengedukasi cara saring sebelum berbagi.
- **Skor 4 (E):** Menghubungi kerabat yang membagikan pesan tersebut secara japri (pribadi) dan meminta izin meluruskan informasi yang keliru di grup.
- **Skor 3 (A):** Menuliskan sanggahan singkat di grup bahwa berita tersebut hoaks tanpa menyertakan tautan fakta pembanding.
- **Skor 2 (B):** Diam saja karena merasa urusan grup keluarga tidak ada kaitannya dengan tugas resmi di kantor.
- **Skor 1 (D):** Memarahi kerabat tersebut di grup keluarga karena mencemarkan nama baik instansi tempat Anda bekerja.`,
    options: [
      { key: 'A', text: 'Menegaskan secara singkat di grup bahwa informasi tersebut bohong dan meminta anggota keluarga tidak mempercayainya', score: 3 },
      { key: 'B', text: 'Membiarkan obrolan tersebut berlalu karena tidak ingin memicu perdebatan politik dalam keluarga', score: 2 },
      { key: 'C', text: 'Menyajikan klarifikasi secara santun dengan melampirkan siaran pers resmi portal kementerian serta mengedukasi tips verifikasi informasi digital', score: 5 },
      { key: 'D', text: 'Menegur keras kerabat yang menyebarkan berita bohong tersebut dan mengancam melaporkannya dengan UU ITE', score: 1 },
      { key: 'E', text: 'Mengirim pesan pribadi (japri) kepada kerabat tersebut untuk meluruskan kesalahpahaman informasi secara kekeluargaan', score: 4 },
    ],
  },
  {
    orderNumber: 93,
    category: 'TKP',
    subTopic: 'Teknologi Informasi & Komunikasi',
    text: 'Perkembangan kecerdasan buatan (*Artificial Intelligence / AI*) berkembang sangat pesat dalam pengolahan data dan penyusunan draf dokumen. Pimpinan unit kerja meminta masukan bagaimana tim dapat memanfaatkan AI untuk efisiensi pembuatan laporan tahunan instansi tanpa melanggar etika dan kerahasiaan data negara. Usulan Anda adalah...',
    explanation: `**Indikator: Pemanfaatan Teknologi Mutakhir Secara Etis & Bertanggung Jawab (BerAKHLAK: Adaptif, Akuntabel)**

**Rubrik Penilaian:**
- **Skor 5 (A):** Mengusulkan pemanfaatan AI untuk membantu perumusan struktur kerangka analisis, penataan bahasa, dan visualisasi grafik data yang telah dianonimkan, dengan tetap melakukan verifikasi faktual manusia (*human-in-the-loop*) serta melarang pengunggahan data rahasia individu ke model AI publik.
- **Skor 4 (D):** Menyusun pedoman panduan internal tata cara penggunaan aman alat AI bagi seluruh staf analis laporan.
- **Skor 3 (B):** Memanfaatkan AI sebatas untuk penerjemahan istilah asing dan pengecekan ejaan tata bahasa naskah dinas.
- **Skor 2 (E):** Memasukkan seluruh data mentah instansi ke dalam chatbot AI gratisan agar seluruh laporan selesai dalam sekejap.
- **Skor 1 (C):** Menolak tegas seluruh penggunaan teknologi AI karena menganggap AI berbahaya dan sepenuhnya haram digunakan di instansi pemerintah.`,
    options: [
      { key: 'A', text: 'Mengadopsi AI secara bijak untuk menyusun draf kerangka dan analisis tren dengan verifikasi manusia ketat tanpa mengunggah data rahasia ke platform terbuka', score: 5 },
      { key: 'B', text: 'Membatasi penggunaan AI hanya untuk memeriksa kesalahan ketik ejaan dan tata bahasa dokumen dinas', score: 3 },
      { key: 'C', text: 'Menolak usulan tersebut karena penggunaan AI dianggap bentuk kemalasan berpikir bagi aparatur sipil negara', score: 1 },
      { key: 'D', text: 'Mengusulkan penyusunan standar operasional prosedur (SOP) tata kelola penggunaan etis alat berbasis AI di lingkungan dinas', score: 4 },
      { key: 'E', text: 'Menyerahkan pembuatan seluruh bab laporan kepada kecerdasan buatan agar staf dapat mengerjakan tugas lain', score: 2 },
    ],
  },
  {
    orderNumber: 94,
    category: 'TKP',
    subTopic: 'Teknologi Informasi & Komunikasi',
    text: 'Saat pelaksanaan seleksi uji kompetensi berbasis CAT di sebuah kantor perwakilan daerah, genset utama tiba-tiba meledak dan pasokan listrik padam, sementara UPS cadangan hanya mampu bertahan selama 20 menit. Anda bertugas sebagai koordinator teknis TIK ujian. Tindakan taktis dan solutif Anda adalah...',
    explanation: `**Indikator: Manajemen Insiden Kritis TIK & Kontinjensi Sistem (BerAKHLAK: Adaptif, Berorientasi Pelayanan)**

**Rubrik Penilaian:**
- **Skor 5 (E):** Memastikan proses sinkronisasi dan pencadangan otomatis data jawaban peserta ke server lokal aman sebelum UPS habis, menenangkan peserta dengan mengumumkan bahwa waktu ujian dihentikan sementara (*pause timer* aman), serta berkoordinasi cepat dengan PLN dan penyedia genset cadangan terdekat.
- **Skor 4 (B):** Menginstruksikan tim teknisi segera mengalihkan jalur daya ke genset darurat cadangan gedung sebelah sembari mengunci status sesi peserta.
- **Skor 3 (A):** Mengumumkan pembatalan sesi ujian dan meminta seluruh peserta pulang untuk menunggu jadwal ulang minggu depan.
- **Skor 2 (D):** Meminta peserta segera menyelesaikan sisa soal ujian secara buru-buru sebelum layar monitor mati total dalam 20 menit.
- **Skor 1 (C):** Panik dan menyalahkan panitia perlengkapan yang tidak memeriksa kondisi genset sebelum acara dimulai.`,
    options: [
      { key: 'A', text: 'Langsung membatalkan sesi ujian hari itu dan menjadwalkan ulang seluruh peserta pada hari berikutnya', score: 3 },
      { key: 'B', text: 'Menghentikan sementara waktu sistem pengujian dan bergegas menyambungkan kabel daya cadangan dari genset darurat', score: 4 },
      { key: 'C', text: 'Menyalahkan staf pengelola gedung di hadapan peserta atas kelalaian perawatan genset utama', score: 1 },
      { key: 'D', text: 'Menyuruh peserta mengerjakan soal secepat mungkin sebelum daya baterai UPS habis dalam 20 menit', score: 2 },
      { key: 'E', text: 'Mengamankan integritas data jawaban peserta melalui pencadangan lokal, membekukan timer ujian, serta mengaktifkan skema suplai daya alternatif darurat', score: 5 },
    ],
  },
  {
    orderNumber: 95,
    category: 'TKP',
    subTopic: 'Teknologi Informasi & Komunikasi',
    text: 'Anda menerima pesan email yang mengatasnamakan "Administrator IT Pusat BKN" dengan tampilan menyerupai portal resmi, yang meminta Anda segera memperbarui data profil kepegawaian dengan mengeklik tautan terlampir dalam waktu 1x24 jam atau akun Anda akan dibekukan. Sikap Anda menghadapi email tersebut adalah...',
    explanation: `**Indikator: Kewaspadaan Kejahatan Siber (Phishing Detection) (BerAKHLAK: Akuntabel, Kompeten)**

**Rubrik Penilaian:**
- **Skor 5 (B):** Mengidentifikasi indikasi serangan rekayasa sosial (*phishing*), tidak mengeklik tautan sembarangan, memeriksa domain pengirim email dengan teliti, dan segera meneruskan insiden tersebut ke tim Computer Security Incident Response Team (CSIRT) instansi untuk diblokir.
- **Skor 4 (C):** Membuka peramban terpisah secara mandiri untuk mengecek ke portal resmi BKN tanpa mengeklik tautan di email, lalu menandai email tersebut sebagai spam.
- **Skor 3 (A):** Menghapus email tersebut dari kotak masuk pribadi tanpa melaporkan kepada tim IT instansi.
- **Skor 2 (D):** Membalas email tersebut dengan menanyakan apakah benar akun Anda akan dibekukan jika tidak mengisi tautan.
- **Skor 1 (E):** Langsung mengeklik tautan dan memasukkan nama pengguna, kata sandi, serta NIP karena takut akun kepegawaian dibekukan.`,
    options: [
      { key: 'A', text: 'Menghapus email tersebut dari kotak masuk dan melanjutkan rutinitas kerja harian Anda', score: 3 },
      { key: 'B', text: 'Waspada terhadap modus phishing, tidak mengeklik tautan mencurigakan, memeriksa alamat domain pengirim, dan melaporkannya ke tim CSIRT instansi', score: 5 },
      { key: 'C', text: 'Menandai email sebagai spam dan melakukan pengecekan ke portal resmi instansi melalui peramban terpisah', score: 4 },
      { key: 'D', text: 'Membalas pesan tersebut untuk meminta bukti surat dinas resmi atas instruksi pembaruan data', score: 2 },
      { key: 'E', text: 'Segera mengeklik tautan dan memasukkan kata sandi akun karena takut terkena sanksi pembekuan kepegawaian', score: 1 },
    ],
  },
  {
    orderNumber: 96,
    category: 'TKP',
    subTopic: 'Teknologi Informasi & Komunikasi',
    text: 'Melihat antrean fisik pemohon pelayanan di kantor Anda yang kerap mengular sejak subuh hari, Anda memiliki ide untuk membuat sistem tiket antrean daring berbasis bot pesan instan sederhana yang bisa diakses langsung dari ponsel warga. Namun ide ini membutuhkan koordinasi lintas seksi dan izin pimpinan. Langkah inisiatif Anda adalah...',
    explanation: `**Indikator: Inovasi Digital & Sikap Proaktif Berkelanjutan (BerAKHLAK: Adaptif, Berorientasi Pelayanan)**

**Rubrik Penilaian:**
- **Skor 5 (D):** Menyusun proposal ringkas yang menguraikan latar belakang masalah, prototipe cara kerja bot, estimasi efisiensi waktu pemohon, dan ketiadaan beban biaya APBD, lalu mempresentasikannya secara lugas kepada atasan langsung untuk mendapatkan dukungan resmi.
- **Skor 4 (A):** Mengajak staf TIK membuat prototipe aplikasi mini (*mockup*) terlebih dahulu untuk ditunjukkan bukti keberhasilannya kepada pimpinan.
- **Skor 3 (B):** Menyampaikan ide tersebut secara lisan saat sesi tanya jawab rapat bulanan dinas.
- **Skor 2 (E):** Meluncurkan bot tersebut secara mandiri tanpa sepengetahuan pimpinan untuk menguji respon warga.
- **Skor 1 (C):** Menyimpan ide tersebut sendiri karena merasa staf biasa tidak memiliki wewenang membuat inovasi sistem.`,
    options: [
      { key: 'A', text: 'Mengajak rekan teknisi TIK merancang prototipe sederhana sistem antrean bot sebelum menghadap atasan', score: 4 },
      { key: 'B', text: 'Mengutarakan gagasan inovasi tersebut secara singkat saat ada agenda rapat koordinasi pimpinan dinas', score: 3 },
      { key: 'C', text: 'Mengurungkan niat tersebut karena khawatir dianggap melangkahi wewenang kepala seksi pelayanan', score: 1 },
      { key: 'D', text: 'Menyusun analisis kebutuhan, proposal konsep alur kerja sistem bot, dan proyeksi efisiensi layanan, lalu mengonsultasikannya kepada atasan secara terstruktur', score: 5 },
      { key: 'E', text: 'Membuat akun bot dan membagikannya langsung ke warga tanpa memerlukan persetujuan pimpinan dinas', score: 2 },
    ],
  },

  // ==========================================
  // PROFESIONALISME (Soal 97 - 104)
  // ==========================================
  {
    orderNumber: 97,
    category: 'TKP',
    subTopic: 'Profesionalisme',
    text: 'Pukul 15.30 WIB menjelang akhir jam kerja, atasan Anda mendadak menugaskan Anda untuk menyusun materi bahan paparan Menteri untuk rapat kerja di DPR besok pagi pukul 08.00 WIB. Padahal Anda sudah memiliki janji makan malam merayakan ulang tahun anak Anda di rumah. Sikap profesional Anda dalam menyikapi situasi mendesak ini adalah...',
    explanation: `**Indikator: Manajemen Tekanan, Komitmen Tugas, & Solusi Bertanggung Jawab (BerAKHLAK: Akuntabel, Loyal)**

**Rubrik Penilaian:**
- **Skor 5 (C):** Menerima penugasan penting kenegaraan tersebut dengan penuh tanggung jawab, berkomunikasi secara hangat dan jujur kepada keluarga di rumah untuk meminta pengertian, menyusun skala prioritas bahan paparan secara fokus dan tuntas, serta menjadwalkan ulang perayaan keluarga setelah tugas dinas rampung.
- **Skor 4 (B):** Membagi pengerjaan bahan paparan bersama rekan satu tim yang bersedia membantu lembur agar materi selesai lebih cepat dan Anda bisa pulang tidak terlalu larut.
- **Skor 3 (E):** Menyelesaikan draf seadanya dalam waktu 30 menit sebelum pulang agar janji dengan keluarga tetap terpenuhi.
- **Skor 2 (A):** Menolak penugasan mendadak tersebut dengan alasan urusan keluarga tidak boleh diganggu setelah jam kerja.
- **Skor 1 (D):** Menyerahkan seluruh berkas tugas tersebut kepada rekan kerja lain tanpa meminta izin kepada atasan terlebih dahulu.`,
    options: [
      { key: 'A', text: 'Menolak tugas tersebut secara halus karena janji keluarga sudah direncanakan sejak sebulan sebelumnya', score: 2 },
      { key: 'B', text: 'Berkoordinasi dengan rekan sejawat untuk membagi bab materi paparan agar dapat diselesaikan secara kolaboratif lebih cepat', score: 4 },
      { key: 'C', text: 'Menerima penugasan dengan dedikasi tinggi, memberi pengertian secara bijak kepada keluarga di rumah, dan fokus menyelesaikan materi paparan berkualitas tinggi hingga tuntas', score: 5 },
      { key: 'D', text: 'Meninggalkan tugas tersebut di meja rekan kerja tanpa konfirmasi dan bergegas pulang merayakan ulang tahun anak', score: 1 },
      { key: 'E', text: 'Mengerjakan bahan paparan secara terburu-buru dengan menyalin salindia tahun lalu tanpa memeriksa akurasi data', score: 3 },
    ],
  },
  {
    orderNumber: 98,
    category: 'TKP',
    subTopic: 'Profesionalisme',
    text: 'Anda sedang menghadapi masalah pribadi yang cukup berat dalam urusan keluarga yang menguras emosi dan pikiran Anda. Namun di meja kantor, setumpuk berkas verifikasi anggaran yang membutuhkan ketelitian tinggi sudah menunggu tanda tangan dan telaah Anda. Cara Anda menjaga profesionalitas kerja adalah...',
    explanation: `**Indikator: Pemisahan Emosi Pribadi dengan Tanggung Jawab Profesional (BerAKHLAK: Akuntabel)**

**Rubrik Penilaian:**
- **Skor 5 (D):** Memisahkan secara tegas masalah pribadi dari tanggung jawab kedinasan, menenangkan diri sejenak dengan teknik pernapasan/konsentrasi, lalu mencurahkan fokus penuh pada ketelitian verifikasi anggaran, serta menyelesaikan masalah keluarga di luar jam kerja dinas.
- **Skor 4 (A):** Mengambil waktu jeda istirahat 15 menit untuk menenangkan pikiran sebelum mulai menelaah berkas anggaran secara bertahap.
- **Skor 3 (B):** Mengerjakan verifikasi berkas sambil sesekali melamun dan mengeluhkan masalah pribadi kepada rekan sebelah.
- **Skor 2 (E):** Meminta izin cuti mendadak dan membiarkan berkas anggaran menumpuk di meja tanpa pendelegasian.
- **Skor 1 (C):** Melampiaskan kekesalan emosi dengan membentak pemohon atau staf junior yang menyerahkan berkas ke meja Anda.`,
    options: [
      { key: 'A', text: 'Mengambil jeda istirahat sejenak untuk menenangkan emosi sebelum mulai memeriksa berkas dengan cermat', score: 4 },
      { key: 'B', text: 'Bekerja sambil sesekali menceritakan keluh kesah masalah rumah tangga kepada rekan kerja di ruangan', score: 3 },
      { key: 'C', text: 'Menjadi mudah marah dan melampiaskan kegelisahan pribadi kepada bawahan yang datang ke meja kerja', score: 1 },
      { key: 'D', text: 'Mampu mengendalikan diri secara matang dengan memisahkan beban pribadi dari tugas dinas, serta mengerahkan ketelitian penuh pada telaah anggaran', score: 5 },
      { key: 'E', text: 'Mengajukan izin pulang lebih awal dengan meninggalkan berkas yang harus ditandatangani hari itu', score: 2 },
    ],
  },
  {
    orderNumber: 99,
    category: 'TKP',
    subTopic: 'Profesionalisme',
    text: 'Setelah menyerahkan laporan hasil audit internal kepada Kepala Dinas, Anda baru menyadari terdapat kekeliruan perhitungan saldo kas senilai ratusan juta rupiah akibat kesalahan rumus formula Excel yang Anda buat. Laporan tersebut belum sempat dipublikasikan ke BPK. Sikap yang mencerminkan akuntabilitas profesional adalah...',
    explanation: `**Indikator: Kejujuran Intelektual, Akuntabilitas, & Keberanian Mengakui Kesalahan (BerAKHLAK: Akuntabel)**

**Rubrik Penilaian:**
- **Skor 5 (B):** Segera menemui Kepala Dinas secara berani dan jujur, menjelaskan letak kekeliruan formula perhitungan tersebut, menyampaikan permohonan maaf atas kelalaian, dan menyerahkan draf perbaikan laporan yang sudah dikoreksi secara akurat.
- **Skor 4 (E):** Menghubungi staf tata usaha pimpinan untuk menarik kembali berkas laporan sebelum dibaca Kepala Dinas dan menggantinya dengan berkas yang benar.
- **Skor 3 (A):** Menunggu hingga Kepala Dinas menyadari kesalahan tersebut baru kemudian Anda memberikan penjelasan klarifikasi.
- **Skor 2 (D):** Mengubah rumus di komputer dan menyalahkan staf junior yang membantu memasukkan data angka.
- **Skor 1 (C):** Memilih diam dan berharap auditor eksternal BPK tidak akan menemukan kesalahan perhitungan tersebut.`,
    options: [
      { key: 'A', text: 'Menunggu apakah atasan menyadari kesalahan tersebut atau tidak sebelum mengambil tindakan pembetulan', score: 3 },
      { key: 'B', text: 'Segera menghadap pimpinan dengan kesatria, mengakui kekhilafan data secara transparan, dan menyerahkan naskah revisi yang telah diverifikasi akurat', score: 5 },
      { key: 'C', text: 'Membiarkan kekeliruan tersebut karena beranggapan angka tersebut tidak akan diperiksa secara mendetail oleh BPK', score: 1 },
      { key: 'D', text: 'Mengubah berkas di sistem dan berdalih bahwa staf entri data yang melakukan kesalahan ketik', score: 2 },
      { key: 'E', text: 'Menarik kembali naskah laporan melalui sekretaris pimpinan secara diam-diam dan menukar lembar lampirannya', score: 4 },
    ],
  },
  {
    orderNumber: 100,
    category: 'TKP',
    subTopic: 'Profesionalisme',
    text: 'Seorang pejabat eselon di instansi Anda menitipkan sebuah perusahaan penyedia milik kerabatnya agar diloloskan dalam evaluasi kualifikasi teknis lelang pengadaan kendaraan dinas, meskipun dokumen teknis perusahaan tersebut tidak memenuhi syarat kapasitas minimum. Sikap Anda sebagai pejabat pengadaan adalah...',
    explanation: `**Indikator: Keteguhan Integritas & Kepatuhan Prinsip Pengadaan (BerAKHLAK: Akuntabel, Loyal pada Aturan)**

**Rubrik Penilaian:**
- **Skor 5 (E):** Menolak titipan tersebut secara tegas dan profesional berlandaskan Perpres Pengadaan Barang dan Jasa Pemerintah, menilai seluruh peserta lelang secara objektif berdasarkan dokumen kualifikasi riil, serta mencatat rekam jejak evaluasi secara transparan dan akuntabel.
- **Skor 4 (B):** Menyampaikan secara tertulis kepada pejabat tersebut bahwa perusahaan kerabatnya gugur pada evaluasi kualifikasi teknis sesuai kriteria sistem LPSE.
- **Skor 3 (D):** Meminta pendapat dan perlindungan hukum kepada pimpinan yang lebih tinggi mengenai adanya titipan pejabat tersebut.
- **Skor 2 (A):** Meloloskan ke tahap berikutnya dengan catatan kekurangan dokumen harus dilengkapi saat proses verifikasi akhir.
- **Skor 1 (C):** Menyetujui titipan tersebut dan meloloskannya karena takut dipersulit jenjang karier dan pemotongan tunjangan kinerja.`,
    options: [
      { key: 'A', text: 'Meloloskan perusahaan tersebut dengan meminta mereka segera melengkapi dokumen persyaratan menyusul di kemudian hari', score: 2 },
      { key: 'B', text: 'Menjelaskan secara santun kepada pejabat tersebut bahwa sistem lelang otomatis menggugurkan berkas yang tidak memenuhi standar', score: 4 },
      { key: 'C', text: 'Mengikuti instruksi pejabat eselon tersebut demi menjaga kelangsungan karier jabatan dan posisi aman Anda di instansi', score: 1 },
      { key: 'D', text: 'Mengkonsultasikan adanya titipan tersebut kepada Inspektorat Daerah untuk meminta rekomendasi sikap', score: 3 },
      { key: 'E', text: 'Menolak titipan secara profesional berpedoman pada regulasi hukum yang berlaku dan memastikan proses seleksi berjalan objektif serta adil', score: 5 },
    ],
  },
  {
    orderNumber: 101,
    category: 'TKP',
    subTopic: 'Profesionalisme',
    text: 'Dinas tempat Anda bekerja belum mengalokasikan anggaran untuk pelatihan peningkatan kompetensi keahlian sertifikasi kehumasan/analisis data yang sangat Anda butuhkan untuk menunjang mutu hasil kerja Anda. Sikap pengembangan diri mandiri yang Anda ambil adalah...',
    explanation: `**Indikator: Kemandirian Belajar & Pengembangan Kapasitas Berkelanjutan (BerAKHLAK: Kompeten)**

**Rubrik Penilaian:**
- **Skor 5 (A):** Berinisiatif mengikuti pelatihan/kursus daring bereputasi (MOOC) secara mandiri dengan biaya swadaya, membaca literatur ilmiah, serta menerapkan ilmu baru yang didapat untuk meningkatkan efektivitas kinerja harian di kantor.
- **Skor 4 (D):** Mengusulkan program berbagi pengetahuan (*knowledge sharing*) internal di kantor dan belajar secara mandiri dari modul gratis di internet.
- **Skor 3 (B):** Menunggu hingga tahun anggaran depan saat usulan DIPA pelatihan dinas disetujui pemerintah daerah.
- **Skor 2 (E):** Bekerja dengan kemampuan yang ada sekarang tanpa perlu memusingkan sertifikasi keahlian tambahan.
- **Skor 1 (C):** Mengeluh di media sosial bahwa kantor tidak memfasilitasi pengembangan kompetensi para pegawainya.`,
    options: [
      { key: 'A', text: 'Proaktif belajar secara mandiri melalui kursus daring bereputasi dengan dana swadaya guna mendongkrak kualitas kerja bagi instansi', score: 5 },
      { key: 'B', text: 'Menunggu pengajuan anggaran tahun berikutnya agar dapat mengikuti sertifikasi resmi yang dibiayai kantor', score: 3 },
      { key: 'C', text: 'Mengkritik ketiadaan anggaran pelatihan di forum rapat dan menolak mengerjakan tugas di luar kemampuan saat ini', score: 1 },
      { key: 'D', text: 'Mempelajari materi terkait secara otodidak melalui jurnal terbuka dan menginisiasi forum diskusi belajar bersama rekan kerja', score: 4 },
      { key: 'E', text: 'Merasa cukup dengan kompetensi lama karena beban gaji bulanan tetap sama meskipun memiliki keahlian baru', score: 2 },
    ],
  },
  {
    orderNumber: 102,
    category: 'TKP',
    subTopic: 'Profesionalisme',
    text: 'Anda dimutasi dari Bagian Kehumasan ke Bagian Pengelolaan Aset dan Barang Milik Daerah (BMD), sebuah bidang kerja yang sama sekali baru dan belum pernah Anda pelajari sebelumnya. Sikap Anda menghadapi rotasi jabatan ini adalah...',
    explanation: `**Indikator: Agilitas Belajar & Kemampuan Beradaptasi Cepat (BerAKHLAK: Adaptif, Kompeten)**

**Rubrik Penilaian:**
- **Skor 5 (C):** Memandang mutasi sebagai peluang memperkaya wawasan kepegawaian, segera mempelajari regulasi BMD (Permendagri/PP aset), berkonsultasi secara intensif dengan staf senior pengelola aset, dan cepat beradaptasi dengan ritme kerja baru.
- **Skor 4 (E):** Mengikuti bimbingan teknis pengelolaan BMD dan mencatat inventaris aset secara tertib bersama tim kerja baru.
- **Skor 3 (A):** Menjalankan tugas baru secara perlahan-lahan sembari meminta maaf setiap kali melakukan kesalahan administrasi.
- **Skor 2 (B):** Mengajukan keberatan kepada bagian BKD karena merasa kualifikasi pendidikan Anda tidak sesuai dengan pengelolaan aset.
- **Skor 1 (D):** Bekerja setengah hati dan pasif menunggu arahan karena merasa mutasi tersebut merupakan bentuk penurunan karier.`,
    options: [
      { key: 'A', text: 'Mengerjakan tugas sebisanya sambil terus meminta pendampingan rekan kerja karena latar belakang bidang yang berbeda', score: 3 },
      { key: 'B', text: 'Menghadap kepala BKD untuk meminta peninjauan ulang surat keputusan rotasi agar dikembalikan ke humas', score: 2 },
      { key: 'C', text: 'Menyikapi mutasi sebagai tantangan belajar, mendalami regulasi teknis aset secara intensif, dan beradaptasi gesit menguasai tugas baru', score: 5 },
      { key: 'D', text: 'Merasa kecewa dan bekerja pasif sekadar menggugurkan kewajiban absensi sidik jari di kantor baru', score: 1 },
      { key: 'E', text: 'Berkoordinasi aktif dengan pejabat lama untuk mempelajari alur penatausahaan inventaris aset negara', score: 4 },
    ],
  },
  {
    orderNumber: 103,
    category: 'TKP',
    subTopic: 'Profesionalisme',
    text: 'Dalam sesi evaluasi kinerja berkala triwulanan, atasan Anda melontarkan kritik yang sangat tajam dan bernada keras terhadap cara penyajian infografis capaian kinerja unit Anda di depan seluruh rekan sejawat. Reaksi emosional dan profesional Anda adalah...',
    explanation: `**Indikator: Kematangan Emosi & Penerimaan Umpan Balik Kritis (BerAKHLAK: Akuntabel, Kompeten)**

**Rubrik Penilaian:**
- **Skor 5 (B):** Menanggapi kritik dengan kepala dingin dan sikap terbuka, mencatat poin-poin kekurangan substansi yang disoroti atasan, meminta masukan konstruktif untuk perbaikan, dan segera merevisi infografis agar tampil lebih akurat dan informatif.
- **Skor 4 (D):** Mendengarkan kritik dengan tenang, mengklarifikasi secara santun data yang disajikan, dan berkomitmen memperbaiki tampilan paparan.
- **Skor 3 (A):** Menerima kritik sambil menunduk diam namun merasa tertekan dan malu di depan teman-teman sekantor.
- **Skor 2 (E):** Membela diri secara defensif di hadapan forum bahwa format tersebut sudah sesuai instruksi sebelumnya.
- **Skor 1 (C):** Memotong pembicaraan atasan dengan nada marah, membanting map dokumen, dan meninggalkan ruangan evaluasi.`,
    options: [
      { key: 'A', text: 'Diam menunduk dan merasa sangat malu sehingga kehilangan semangat bekerja selama berminggu-minggu', score: 3 },
      { key: 'B', text: 'Menerima kritik dengan lapang dada, menyaring masukan esensial secara objektif, dan segera melakukan penyempurnaan karya dengan kualitas lebih baik', score: 5 },
      { key: 'C', text: 'Membantah atasan saat itu juga dan menuduhnya sengaja mencari-cari kesalahan pribadi di depan umum', score: 1 },
      { key: 'D', text: 'Mendengarkan kritik secara tenang dan meminta waktu khusus setelah rapat untuk meminta arahan perbaikan mendalam dari atasan', score: 4 },
      { key: 'E', text: 'Menjelaskan panjang lebar bahwa kesalahan tersebut bukan tanggung jawab Anda melainkan kesalahan tim desainer', score: 2 },
    ],
  },
  {
    orderNumber: 104,
    category: 'TKP',
    subTopic: 'Profesionalisme',
    text: 'Ketika Kepala Seksi dan seluruh jajaran pimpinan sedang dinas luar kota selama tiga hari penuh, suasana kantor menjadi lengang dan beberapa rekan kerja mulai datang terlambat, pulang lebih cepat, serta asyik bermain gim daring di jam dinas. Sikap Anda adalah...',
    explanation: `**Indikator: Integritas Diri, Kedisiplinan Mandiri, & Nilai Etos Kerja (BerAKHLAK: Akuntabel)**

**Rubrik Penilaian:**
- **Skor 5 (D):** Tetap konsisten mematuhi jam kerja dan menyelesaikan target pekerjaan harian secara disiplin tinggi meskipun tanpa pengawasan atasan langsung, serta menjadi teladan integritas kerja bagi rekan-rekan ruangan.
- **Skor 4 (B):** Tetap bekerja sesuai tugas pokok dan mengingatkan rekan dekat secara santun agar tetap waspada menyelesaikan pekerjaan dinas.
- **Skor 3 (A):** Menyelesaikan tugas utama terlebih dahulu, setelah itu ikut bersantai mengobrol bersama rekan lain.
- **Skor 2 (E):** Ikut bersantai karena merasa jika terlalu rajin sendirian akan dicap pamer atau dijauhi teman kantor.
- **Skor 1 (C):** Mengambil kesempatan untuk bolos tidak masuk kantor karena tidak ada absensi manual dari pimpinan.`,
    options: [
      { key: 'A', text: 'Menyelesaikan pekerjaan harian secukupnya lalu ikut bergabung dalam obrolan santai rekan-rekan kantor', score: 3 },
      { key: 'B', text: 'Menjaga ritme kerja pribadi dan mengajak rekan kerja satu meja agar tetap fokus menyelesaikan berkas penting', score: 4 },
      { key: 'C', text: 'Ikut pulang awal karena tidak ada pimpinan yang akan mengontrol keberadaan staf di ruangan', score: 1 },
      { key: 'D', text: 'Tetap teguh berdisiplin hadir tepat waktu dan menuntaskan target kinerja secara profesional dengan kesadaran moral penuh', score: 5 },
      { key: 'E', text: 'Menyesuaikan diri dengan suasana santai kantor agar tidak dianggap sok rajin oleh rekan sejawat', score: 2 },
    ],
  },

  // ==========================================
  // ANTI RADIKALISME (Soal 105 - 110)
  // ==========================================
  {
    orderNumber: 105,
    category: 'TKP',
    subTopic: 'Anti Radikalisme',
    text: 'Anda memperhatikan seorang rekan kerja satu ruangan yang belakangan ini kerap mengunggah status dan video di media sosial yang mengkafirkan kelompok lain, mempropagandakan kebencian terhadap lambang negara burung Garuda, dan mengajak pengikutnya mengganti sistem pemerintahan demokrasi dengan khilafah. Sikap Anda adalah...',
    explanation: `**Indikator: Deteksi Dini & Pencegahan Penyebaran Ideologi Radikal (BerAKHLAK: Loyal)**

**Rubrik Penilaian:**
- **Skor 5 (A):** Mengingatkan rekan tersebut secara empat mata bahwa narasi ekstremisme bertentangan dengan sumpah janji ASN dan ideologi Pancasila, mengumpulkan bukti tangkapan layar unggahan, dan melaporkannya secara berjenjang kepada atasan/Inspektorat guna penanganan preventif pembinaan ideologi.
- **Skor 4 (D):** Melaporkan aktivitas digital rekan kerja tersebut kepada tim pengawas etika kepegawaian instansi beserta bukti-bukti autentik.
- **Skor 3 (E):** Berdebat sengit di kolom komentar media sosial rekan tersebut untuk menunjukkan bahwa tafsirnya salah.
- **Skor 2 (B):** Mengabaikannya dan memilih menghapus pertemanan (*unfriend*) di media sosial agar beranda Anda bersih.
- **Skor 1 (C):** Menyukai dan membagikan ulang video tersebut karena menghargai kebebasan berpendapat di era demokrasi.`,
    options: [
      { key: 'A', text: 'Mengingatkan rekan tersebut secara empat mata mengenai sumpah kesetiaan ASN pada Pancasila, dan melaporkan bukti konten ekstremisme ke pejabat pembina kepegawaian', score: 5 },
      { key: 'B', text: 'Memblokir akun media sosial rekan tersebut agar Anda tidak terganggu oleh kiriman konten radikalnya', score: 2 },
      { key: 'C', text: 'Mendukung penyebaran konten tersebut atas nama kebebasan berekspresi dan hak asasi manusia', score: 1 },
      { key: 'D', text: 'Mendokumentasikan bukti unggahan dan melaporkannya secara rahasia kepada unit kepatuhan internal/Inspektorat instansi', score: 4 },
      { key: 'E', text: 'Menuliskan komentar perdebatan ideologi secara terbuka di media sosial rekan tersebut hingga memicu polemik warganet', score: 3 },
    ],
  },
  {
    orderNumber: 106,
    category: 'TKP',
    subTopic: 'Anti Radikalisme',
    text: 'Anda diajak oleh seorang senior di kantor untuk menghadiri kajian keagamaan terbatas di sebuah rumah kontrakan tertutup di luar jam kantor. Dalam kajian pertemuan pertama, penceramah secara eksplisit mendoktrinasi peserta agar menolak taat pada hukum positif negara Republik Indonesia, mengharamkan hormat bendera, dan menganjurkan baiat setia kepada amir kelompok rahasia. Sikap tegas Anda adalah...',
    explanation: `**Indikator: Keteguhan Ideologi Kebangsaan & Sikap Anti-Infiltrasi Ekstremisme (BerAKHLAK: Loyal)**

**Rubrik Penilaian:**
- **Skor 5 (D):** Menolak secara tegas untuk membaiat atau mengikuti kajian lanjutan kelompok tersebut, keluar dari perkumpulan tersebut, dan melaporkan keberadaan kelompok radikal tertutup di lingkungan kantor tersebut kepada aparat penegak hukum/pimpinan instansi demi melindungi keutuhan negara.
- **Skor 4 (B):** Segera berpamitan meninggalkan lokasi saat materi mulai mengarah pada pembangkangan konstitusi dan tidak pernah kembali lagi.
- **Skor 3 (A):** Tetap mengikuti kajian hingga selesai sekadar untuk menghormati ajakan senior namun berjanji tidak akan mempercayai doktrinnya.
- **Skor 2 (E):** Mencari tahu lebih banyak tentang kelompok tersebut dan ikut membaiat diri agar tidak dikucilkan oleh senior di kantor.
- **Skor 1 (C):** Mengajak staf yunior lain untuk ikut bergabung ke kajian rahasia tersebut pada pertemuan berikutnya.`,
    options: [
      { key: 'A', text: 'Tetap menyimak pengajian hingga selesai demi menjaga hubungan baik dengan senior pengundang lalu tidak datang lagi', score: 3 },
      { key: 'B', text: 'Segera beranjak pamit keluar dari forum tersebut karena materinya jelas bertentangan dengan konsensus dasar berbangsa', score: 4 },
      { key: 'C', text: 'Tertarik mendalami ajaran tersebut dan mengajak rekan sekantor lainnya untuk ikut bergabung', score: 1 },
      { key: 'D', text: 'Menolak secara tegas terlibat lebih jauh, memutus kontak dengan jaringan pengajian tertutup tersebut, serta melapor ke pihak berwenang', score: 5 },
      { key: 'E', text: 'Ikut mengucapkan baiat secara formalitas saja demi keselamatan diri dari ancaman kelompok rahasia tersebut', score: 2 },
    ],
  },
  {
    orderNumber: 107,
    category: 'TKP',
    subTopic: 'Anti Radikalisme',
    text: 'Pada saat pelaksanaan upacara peringatan Hari Pahlawan di halaman kantor instansi, Anda melihat beberapa orang pegawai baru dengan sengaja bersembunyi di toilet belakang dan secara terang-terangan menolak berdiri memberi hormat saat lagu kebangsaan Indonesia Raya berkumandang dengan dalih pemahaman ideologi tertentu. Langkah yang Anda ambil adalah...',
    explanation: `**Indikator: Disiplin Kehormatan Lambang Negara & Pembinaan Komitmen Kebangsaan (BerAKHLAK: Loyal)**

**Rubrik Penilaian:**
- **Skor 5 (C):** Menegur mereka secara tegas setelah upacara selesai, menjelaskan kedudukan bendera dan lagu kebangsaan sebagai simbol kehormatan negara yang wajib dihormati seluruh ASN sesuai amanat UU No. 24 Tahun 2009, serta melaporkan indisipliner ideologis tersebut kepada Kepala Bagian Kepegawaian untuk pembinaan.
- **Skor 4 (A):** Mengajak mereka berbicara dan mengingatkan bahwa sebagai aparatur negara, penghormatan terhadap simbol negara merupakan kewajiban hukum yang mengikat.
- **Skor 3 (E):** Mengambil foto mereka yang bersembunyi di toilet untuk dijadikan barang bukti laporan pelanggaran disiplin apel.
- **Skor 2 (B):** Membiarkan tindakan mereka karena menganggap penghormatan bendera adalah urusan hati nurani masing-masing individu.
- **Skor 1 (D):** Ikut menemani mereka bersembunyi di toilet agar tidak perlu berdiri kepanasan di lapangan upacara.`,
    options: [
      { key: 'A', text: 'Menasihati mereka usai upacara bahwa menghormati bendera dan lagu kebangsaan adalah kewajiban etika bernegara bagi ASN', score: 4 },
      { key: 'B', text: 'Mendiamkan perilaku mereka karena menganggap hak berpendapat dan keyakinan tidak boleh dipaksakan oleh upacara', score: 2 },
      { key: 'C', text: 'Menegur secara tegas, mengedukasi makna konstitusional simbol negara, serta melaporkan perilaku tersebut kepada pimpinan pembina kepegawaian', score: 5 },
      { key: 'D', text: 'Bergabung bersama mereka bersembunyi di toilet untuk menghindari terik matahari di lapangan upacara', score: 1 },
      { key: 'E', text: 'Memotret mereka secara diam-diam dan langsung memviralkannya di media sosial pribadi tanpa verifikasi atasan', score: 3 },
    ],
  },
  {
    orderNumber: 108,
    category: 'TKP',
    subTopic: 'Anti Radikalisme',
    text: 'Seorang tamu kedinasan yang sedang menunggu pelayanan di ruang lobi tiba-tiba berteriak dengan lantang menyebarkan selebaran berisi propaganda anti-Pancasila dan melontarkan ujaran kebencian provokatif yang menghasut warga di ruang tunggu agar memberontak kepada pemerintah yang sah. Respon sigap Anda adalah...',
    explanation: `**Indikator: Kesiapsiagaan Krisis Kamtibmas & Netralisasi Ancaman Radikalisme (BerAKHLAK: Loyal)**

**Rubrik Penilaian:**
- **Skor 5 (B):** Segera berkoordinasi dengan petugas keamanan dalam (Satpam) dan kepolisian setempat untuk mengamankan pelaku dan selebaran provokatif tersebut secara terukur, menenangkan warga di ruang tunggu, dan memastikan pelayanan publik tetap berjalan kondusif.
- **Skor 4 (E):** Meminta satpam mengamankan pelaku ke ruang khusus dan mengumpulkan selebaran agar tidak dibaca oleh pemohon lainnya.
- **Skor 3 (A):** Berdebat dengan tamu tersebut di tengah kerumunan massa untuk mematahkan dalil-dalil propaganda anti-Pancasilanya.
- **Skor 2 (D):** Meminta warga yang ada di ruang tunggu untuk membubarkan diri keluar gedung karena situasi dianggap berbahaya.
- **Skor 1 (C):** Membiarkan aksi tamu tersebut karena takut diserang secara fisik oleh pelaku.`,
    options: [
      { key: 'A', text: 'Menghampiri tamu tersebut dan beradu argumen ideologi secara keras di hadapan warga di ruang lobi', score: 3 },
      { key: 'B', text: 'Segera menginstruksikan pengamanan terukur bersama petugas sekuriti kantor untuk mengamankan pelaku dan barang bukti, serta menenangkan masyarakat di ruang tunggu', score: 5 },
      { key: 'C', text: 'Bersembunyi di bawah meja kerja dan menunggu sampai tamu tersebut kelelahan berorasi dan pergi sendiri', score: 1 },
      { key: 'D', text: 'Mengarahkan seluruh warga di ruang tunggu lari berhamburan keluar gedung untuk menyelamatkan diri', score: 2 },
      { key: 'E', text: 'Mengambil paksa selebaran dari tangan tamu tersebut dan membawanya ke pos keamanan kantor', score: 4 },
    ],
  },
  {
    orderNumber: 109,
    category: 'TKP',
    subTopic: 'Anti Radikalisme',
    text: 'Dalam grup percakapan internal pegawai instansi, seorang staf senior mengirimkan opini tulisan panjang yang mengkritisi keabsahan dasar negara Pancasila dan berargumen bahwa bencana alam di Indonesia hanya akan berhenti apabila NKRI diubah menjadi negara berasaskan teokrasi keagamaan radikal tertentu. Tanggapan profesional Anda di grup tersebut adalah...',
    explanation: `**Indikator: Menjaga Netralitas Media Internal & Keteguhan Ideologi NKRI (BerAKHLAK: Loyal)**

**Rubrik Penilaian:**
- **Skor 5 (E):** Menanggapi secara santun dan berbobot dengan mengingatkan bahwa grup kedinasan harus difokuskan pada koordinasi tugas negara, menegaskan komitmen final Pancasila sebagai kesepakatan luhur para pendiri bangsa (*kalimatun sawa*), serta melaporkan pelanggaran netralitas ideologi ini kepada admin grup/atasan untuk ditindaklanjuti.
- **Skor 4 (B):** Mengingatkan dengan sopan agar tidak membagikan wacana pembongkaran dasar negara di grup kedinasan resmi aparatur negara.
- **Skor 3 (A):** Memilih tidak merespon tulisan tersebut dan menimbun percakapan dengan mengirimkan berkas pengumuman dinas yang panjang.
- **Skor 2 (C):** Menghujat staf senior tersebut di grup obrolan dengan kata-kata makian kasar.
- **Skor 1 (D):** Menyetujui opini staf senior tersebut dan menambahkan argumentasi pembenaran di grup percakapan.`,
    options: [
      { key: 'A', text: 'Mengirimkan stiker lucu atau dokumen jadwal piket secara beruntun agar kiriman opini radikal tersebut tergeser ke atas', score: 3 },
      { key: 'B', text: 'Mengingatkan di grup bahwa grup WhatsApp dinas terikat kode etik ASN dan dilarang untuk propaganda perubahan ideologi negara', score: 4 },
      { key: 'C', text: 'Membalas tulisan tersebut dengan kata-kata makian keras dan menuduh staf senior tersebut sebagai teroris', score: 2 },
      { key: 'D', text: 'Menyatakan setuju dengan opini tersebut karena bencana alam memang fenomena peringatan keagamaan', score: 1 },
      { key: 'E', text: 'Mengingatkan secara santun fungsi grup resmi kedinasan, menegaskan konsensus final Pancasila dan NKRI, serta melaporkan narasi tersebut ke pengawas etika ASN', score: 5 },
    ],
  },
  {
    orderNumber: 110,
    category: 'TKP',
    subTopic: 'Anti Radikalisme',
    text: 'Sebagai seorang ASN muda yang aktif di organisasi kemasyarakatan pemuda, Anda mendapati fenomena banyak remaja di lingkungan sekitar yang rentan terpapar narasi intoleransi dan ujaran kebencian di media sosial akibat minimnya pemahaman moderasi beragama dan wawasan kebangsaan. Peran inisiatif yang dapat Anda kembangkan adalah...',
    explanation: `**Indikator: Kontribusi Aktif Penguatan Moderasi & Ketahanan Ideologi Generasi Muda (BerAKHLAK: Loyal, Kolaboratif)**

**Rubrik Penilaian:**
- **Skor 5 (A):** Merancang program kreatif literasi kebangsaan dan workshop moderasi beragama ramah pemuda, menggandeng tokoh lintas agama/budaya dan kreator konten digital lokal untuk memproduksi konten-konten toleransi yang inspiratif di media sosial.
- **Skor 4 (C):** Mengadakan forum diskusi santai kepemudaan di balai warga untuk membedah bahaya hoaks dan radikalisme digital.
- **Skor 3 (D):** Membagikan buku saku pedoman 4 pilar kebangsaan kepada para remaja di pemukiman sekitar.
- **Skor 2 (B):** Melarang anak-anak muda membuka media sosial dan menyuruh mereka fokus membaca buku pelajaran sekolah saja.
- **Skor 1 (E):** Membiarkan saja fenomena tersebut karena merasa pembinaan karakter pemuda adalah urusan orang tua masing-masing dan kementerian pemuda.`,
    options: [
      { key: 'A', text: 'Menginisiasi ruang dialog kreatif, workshop literasi digital, dan kampanye konten moderasi beragama inspiratif bersama komunitas pemuda dan tokoh lintas agama', score: 5 },
      { key: 'B', text: 'Menuntut aparat kepolisian merazia gawai seluruh pemuda di lingkungan pemukiman guna mendeteksi konten radikal', score: 2 },
      { key: 'C', text: 'Menyelenggarakan sarasehan kebangsaan rutin di pos pemuda untuk mengedukasi bahaya manipulasi narasi intoleran', score: 4 },
      { key: 'D', text: 'Membagikan pamflet cetak mengenai nilai-nilai Pancasila di setiap pintu rumah warga sekitar', score: 3 },
      { key: 'E', text: 'Bersikap apatis karena menganggap pembinaan ideologi generasi muda bukan bagian dari sasaran kinerja pegawai (SKP) jabatan Anda', score: 1 },
    ],
  },
];
