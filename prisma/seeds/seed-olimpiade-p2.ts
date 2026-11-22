import { PrismaClient } from '@prisma/client';

interface MathQuestionSeed {
  orderNumber: number;
  category: 'Aljabar' | 'Geometri' | 'Teori Bilangan' | 'Kombinatorika';
  subTopic: string;
  text: string;
  explanation: string;
  options: Array<{
    key: 'A' | 'B' | 'C' | 'D' | 'E';
    text: string;
    score: number;
  }>;
}

export const olimpiadeP2Questions: MathQuestionSeed[] = [
  // ==========================================
  // ALJABAR (7 SOAL: 1 - 7)
  // ==========================================
  {
    orderNumber: 1,
    category: 'Aljabar',
    subTopic: 'Polinomial & Teorema Vieta',
    text: 'Misalkan $P(x) = x^4 - 4x^3 + ax^2 + bx + c$ adalah polinomial berderajat 4 dengan koefisien bilangan bulat. Jika keempat akar dari $P(x)$ adalah bilangan riil yang membentuk suatu barisan aritmetika dan memenuhi $r_1^2 + r_2^2 + r_3^2 + r_4^2 = 24$, tentukan nilai dari ekspresi $a - b + c$.',
    explanation: `**Pembahasan:**
Berdasarkan Teorema Vieta, jumlah keempat akar adalah:
$$r_1 + r_2 + r_3 + r_4 = -\\frac{-4}{1} = 4$$
Karena keempat akar membentuk barisan aritmetika dengan beda $d$, maka rata-rata dari keempat akar adalah $\\mu = \\frac{4}{4} = 1$.
Kita dapat memisalkan keempat akar secara simetris terhadap $\\mu = 1$:
$$r_1 = 1 - 3d, \\quad r_2 = 1 - d, \\quad r_3 = 1 + d, \\quad r_4 = 1 + 3d$$

Hitung jumlah kuadrat dari keempat akar:
$$\\sum_{i=1}^4 r_i^2 = (1-3d)^2 + (1-d)^2 + (1+d)^2 + (1+3d)^2 = 4 + 20d^2$$
Diketahui $\\sum r_i^2 = 24$, sehingga:
$$4 + 20d^2 = 24 \\implies 20d^2 = 20 \\implies d^2 = 1$$
Tanpa mengurangi keumuman, ambil $d = 1$. Maka keempat akar polinomial tersebut adalah:
$$r_1 = -2, \\quad r_2 = 0, \\quad r_3 = 2, \\quad r_4 = 4$$

Bentuk faktorisasi polinomial $P(x)$:
$$P(x) = (x - (-2))(x - 0)(x - 2)(x - 4) = x(x - 4)(x^2 - 4) = (x^2 - 4x)(x^2 - 4)$$
$$P(x) = x^4 - 4x^3 - 4x^2 + 16x + 0$$
Dari bentuk ini, kita peroleh koefisien-koefisiennya:
$$a = -4, \\quad b = 16, \\quad c = 0$$

Maka nilai dari $a - b + c$ adalah:
$$a - b + c = -4 - 16 + 0 = -20$$

Kunci jawaban: **B (-20)**.`,
    options: [
      { key: 'A', text: '$-24$', score: 0 },
      { key: 'B', text: '$-20$', score: 4 },
      { key: 'C', text: '$12$', score: 0 },
      { key: 'D', text: '$16$', score: 0 },
      { key: 'E', text: '$20$', score: 0 },
    ],
  },
  {
    orderNumber: 2,
    category: 'Aljabar',
    subTopic: 'Sistem Persamaan Simetris & Jumlah Newton',
    text: 'Misalkan $x, y, z$ adalah bilangan riil yang memenuhi sistem persamaan simetris berikut:\n$$\\begin{aligned} x + y + z &= 6 \\\\ x^2 + y^2 + z^2 &= 14 \\\\ x^3 + y^3 + z^3 &= 36 \\end{aligned}$$\nTentukan nilai dari $x^4 + y^4 + z^4$.',
    explanation: `**Pembahasan:**
Misalkan $p_k = x^k + y^k + z^k$ untuk $k \\ge 1$, dan misalkan polinomial elementer simetrisnya adalah:
- $e_1 = x + y + z = 6$
- $e_2 = xy + yz + zx$
- $e_3 = xyz$

Gunakan identitas kuadrat untuk mencari $e_2$:
$$e_1^2 = p_2 + 2e_2 \\implies 6^2 = 14 + 2e_2 \\implies 36 = 14 + 2e_2 \\implies e_2 = 11$$

Gunakan Jumlah Newton (Newton's Sums) untuk $k = 3$:
$$p_3 - e_1 p_2 + e_2 p_1 - 3e_3 = 0$$
Substitusikan nilai-nilai yang diketahui:
$$36 - (6)(14) + (11)(6) - 3e_3 = 0$$
$$36 - 84 + 66 - 3e_3 = 0 \\implies 18 - 3e_3 = 0 \\implies e_3 = 6$$

Sekarang terapkan Jumlah Newton untuk $k = 4$:
$$p_4 - e_1 p_3 + e_2 p_2 - e_3 p_1 = 0$$
Substitusikan seluruh nilai yang telah diperoleh:
$$p_4 - (6)(36) + (11)(14) - (6)(6) = 0$$
$$p_4 - 216 + 154 - 36 = 0 \\implies p_4 - 98 = 0 \\implies p_4 = 98$$

*(Catatan: Nilai $x, y, z$ sebenarnya adalah permutasi dari $\{1, 2, 3\}$, karena $1^4 + 2^4 + 3^4 = 1 + 16 + 81 = 98$).*

Kunci jawaban: **D (98)**.`,
    options: [
      { key: 'A', text: '$84$', score: 0 },
      { key: 'B', text: '$92$', score: 0 },
      { key: 'C', text: '$96$', score: 0 },
      { key: 'D', text: '$98$', score: 4 },
      { key: 'E', text: '$108$', score: 0 },
    ],
  },
  {
    orderNumber: 3,
    category: 'Aljabar',
    subTopic: 'Persamaan Fungsional',
    text: 'Tentukan banyaknya fungsi $f: \\mathbb{R} \\to \\mathbb{R}$ yang memenuhi persamaan fungsional berikut untuk setiap bilangan riil $x$ dan $y$:\n$$f(x f(y) + x) = x y + f(x)$$',
    explanation: `**Pembahasan:**
Misalkan $P(x, y)$ menyatakan pernyataan $f(x f(y) + x) = xy + f(x)$.

**Langkah 1: Buktikan $f$ adalah fungsi bijektif.**
Terapkan $P(1, y)$:
$$f(f(y) + 1) = y + f(1)$$
Jika $f(y_1) = f(y_2)$, maka $y_1 + f(1) = y_2 + f(1) \\implies y_1 = y_2$. Jadi $f$ bersifat injektif.
Selain itu, ketika $y$ menjelajahi seluruh $\\mathbb{R}$, nilai $y + f(1)$ juga menjelajahi seluruh $\\mathbb{R}$, sehingga $f$ bersifat surjektif.
Dengan demikian, $f$ adalah fungsi bijektif.

**Langkah 2: Tentukan pembuat nol.**
Karena $f$ bijektif, terdapat bilangan riil unik $c$ sedemikian hingga $f(c) = 0$.
Terapkan $P(x, c)$:
$$f(x f(c) + x) = x c + f(x) \\implies f(x) = xc + f(x) \\implies xc = 0$$
Karena ini harus berlaku untuk semua $x \\in \\mathbb{R}$, maka haruslah $c = 0$. Jadi:
$$f(0) = 0$$

**Langkah 3: Tentukan bentuk fungsi.**
Karena $f$ surjektif, terdapat bilangan $y_0$ sedemikian hingga $f(y_0) = -1$.
Terapkan $P(x, y_0)$:
$$f(x(-1) + x) = f(0) = 0 = x y_0 + f(x) \\implies f(x) = -y_0 x$$
Misalkan konstanta $k = -y_0$, maka $f(x) = kx$.

Substitusikan kandidat fungsi $f(x) = kx$ ke dalam persamaan fungsional semula:
$$f(x(ky) + x) = k(kxy + x) = k^2 xy + kx$$
Ruas kanan persamaan:
$$xy + f(x) = xy + kx$$
Agar kedua ruas identik untuk setiap $x, y \\in \\mathbb{R}$, koefisien $xy$ harus sama:
$$k^2 = 1 \\implies k = 1 \\quad \\text{atau} \\quad k = -1$$

Uji kedua solusi:
1. Untuk $f(x) = x$: $f(xy + x) = xy + x = xy + f(x)$ (Memenuhi).
2. Untuk $f(x) = -x$: Ruas kiri $f(x(-y) + x) = -(x - xy) = xy - x$. Ruas kanan $xy + f(x) = xy - x$ (Memenuhi).

Jadi, terdapat tepat 2 fungsi yang memenuhi persamaan tersebut.

Kunci jawaban: **A (2)**.`,
    options: [
      { key: 'A', text: '$2$', score: 4 },
      { key: 'B', text: '$1$', score: 0 },
      { key: 'C', text: '$0$', score: 0 },
      { key: 'D', text: '$4$', score: 0 },
      { key: 'E', text: 'Tak terhingga', score: 0 },
    ],
  },
  {
    orderNumber: 4,
    category: 'Aljabar',
    subTopic: 'Ketaksamaan Aljabar & Titu Lemma',
    text: 'Diberikan bilangan-bilangan riil positif $a, b, c$ yang memenuhi $a + b + c = 3$. Tentukan nilai minimum dari ekspresi:\n$$S = \\frac{a^2}{b+1} + \\frac{b^2}{c+1} + \\frac{c^2}{a+1}$$',
    explanation: `**Pembahasan:**
Berdasarkan Ketaksamaan Cauchy-Schwarz dalam bentuk Engel (sering disebut Lemma Titu), untuk setiap bilangan riil $x_1, x_2, x_3$ dan bilangan riil positif $y_1, y_2, y_3$, berlaku:
$$\\frac{x_1^2}{y_1} + \\frac{x_2^2}{y_2} + \\frac{x_3^2}{y_3} \\ge \\frac{(x_1 + x_2 + x_3)^2}{y_1 + y_2 + y_3}$$

Terapkan lemma ini pada ekspresi $S$:
$$S = \\frac{a^2}{b+1} + \\frac{b^2}{c+1} + \\frac{c^2}{a+1} \\ge \\frac{(a + b + c)^2}{(b + 1) + (c + 1) + (a + 1)}$$

Penyederhanaan penyebut:
$$(b + 1) + (c + 1) + (a + 1) = a + b + c + 3$$

Karena $a + b + c = 3$, maka:
$$S \\ge \\frac{3^2}{3 + 3} = \\frac{9}{6} = \\frac{3}{2}$$

Kesamaan tercapai jika dan hanya jika:
$$\\frac{a}{b+1} = \\frac{b}{c+1} = \\frac{c}{a+1}$$
Karena $a + b + c = 3$, kondisi ini terpenuhi saat $a = b = c = 1$.
Pengecekan:
$$S = \\frac{1^2}{1+1} + \\frac{1^2}{1+1} + \\frac{1^2}{1+1} = \\frac{1}{2} + \\frac{1}{2} + \\frac{1}{2} = \\frac{3}{2}$$

Jadi, nilai minimum dari $S$ adalah $\\frac{3}{2}$.

Kunci jawaban: **E (3/2)**.`,
    options: [
      { key: 'A', text: '$1$', score: 0 },
      { key: 'B', text: '$\\frac{5}{4}$', score: 0 },
      { key: 'C', text: '$2$', score: 0 },
      { key: 'D', text: '$\\frac{9}{4}$', score: 0 },
      { key: 'E', text: '$\\frac{3}{2}$', score: 4 },
    ],
  },
  {
    orderNumber: 5,
    category: 'Aljabar',
    subTopic: 'Relasi Rekursif Linier',
    text: 'Diberikan barisan bilangan $\{a_n\}$ dengan suku awal $a_1 = 1$, $a_2 = 3$, dan untuk setiap bilangan bulat $n \\ge 1$ memenuhi hubungan rekursif:\n$$a_{n+2} = 3a_{n+1} - 2a_n$$\nTentukan nilai dari jumlah 10 suku pertama, yaitu $\\sum_{n=1}^{10} a_n$.',
    explanation: `**Pembahasan:**
Persamaan karakteristik dari relasi rekursif $a_{n+2} - 3a_{n+1} + 2a_n = 0$ adalah:
$$r^2 - 3r + 2 = 0 \\implies (r - 1)(r - 2) = 0$$
Akar-akar karakteristiknya adalah $r_1 = 1$ dan $r_2 = 2$.

Bentuk umum suku ke-$n$:
$$a_n = A(1)^n + B(2)^n = A + B \\cdot 2^n$$
Gunakan nilai awal:
- Untuk $n = 1$: $A + 2B = 1$
- Untuk $n = 2$: $A + 4B = 3$

Kurangkan persamaan kedua dengan persamaan pertama:
$$2B = 2 \\implies B = 1$$
Substitusikan ke persamaan pertama:
$$A + 2(1) = 1 \\implies A = -1$$
Sehingga rumus suku ke-$n$ adalah:
$$a_n = 2^n - 1$$

Sekarang hitung jumlah 10 suku pertama:
$$\\sum_{n=1}^{10} a_n = \\sum_{n=1}^{10} (2^n - 1) = \\sum_{n=1}^{10} 2^n - \\sum_{n=1}^{10} 1$$
Gunakan rumus jumlah deret geometri berhingga:
$$\\sum_{n=1}^{10} 2^n = \\frac{2(2^{10} - 1)}{2 - 1} = 2(1024 - 1) = 2(1023) = 2046$$
Maka:
$$\\sum_{n=1}^{10} a_n = 2046 - 10 = 2036$$

Kunci jawaban: **B (2036)**.`,
    options: [
      { key: 'A', text: '$1023$', score: 0 },
      { key: 'B', text: '$2036$', score: 4 },
      { key: 'C', text: '$2026$', score: 0 },
      { key: 'D', text: '$2046$', score: 0 },
      { key: 'E', text: '$4082$', score: 0 },
    ],
  },
  {
    orderNumber: 6,
    category: 'Aljabar',
    subTopic: 'Sistem Persamaan Logaritma',
    text: 'Diberikan pasangan bilangan riil positif $(x, y)$ yang memenuhi sistem persamaan logaritma:\n$$\\begin{aligned} \\log_2 x + \\log_4 y &= 5 \\\\ \\log_4 x + \\log_2 y &= 7 \\end{aligned}$$\nTentukan nilai dari hasil kali $xy$.',
    explanation: `**Pembahasan:**
Gunakan sifat logaritma basis perubahan: $\\log_4 u = \\frac{\\log_2 u}{\\log_2 4} = \\frac{1}{2} \\log_2 u$.
Misalkan $u = \\log_2 x$ dan $v = \\log_2 y$.

Sistem persamaan dapat ditulis ulang dalam variabel $u$ dan $v$:
$$\\begin{aligned} u + \\frac{1}{2} v &= 5 \\implies 2u + v = 10 \\quad \\text{--- (1)} \\\\ \\frac{1}{2} u + v &= 7 \\implies u + 2v = 14 \\quad \\text{--- (2)} \\end{aligned}$$

Jumlahkan persamaan (1) dan persamaan (2):
$$(2u + v) + (u + 2v) = 10 + 14$$
$$3u + 3v = 24 \\implies u + v = 8$$

Perhatikan bahwa:
$$u + v = \\log_2 x + \\log_2 y = \\log_2(xy)$$
Sehingga:
$$\\log_2(xy) = 8 \\implies xy = 2^8 = 256$$

*(Bisa diverifikasi bahwa $u = 2$ dan $v = 6$, sehingga $x = 2^2 = 4$ dan $y = 2^6 = 64$, sehingga $xy = 4 \\times 64 = 256$).*

Kunci jawaban: **D (256)**.`,
    options: [
      { key: 'A', text: '$64$', score: 0 },
      { key: 'B', text: '$128$', score: 0 },
      { key: 'C', text: '$512$', score: 0 },
      { key: 'D', text: '$256$', score: 4 },
      { key: 'E', text: '$1024$', score: 0 },
    ],
  },
  {
    orderNumber: 7,
    category: 'Aljabar',
    subTopic: 'Polinomial & Nilai Khusus',
    text: 'Misalkan $P(x)$ adalah polinomial berderajat 4 dengan koefisien bilangan bulat. Jika diketahui $P(1) = 2$, $P(2) = 5$, $P(3) = 10$, $P(4) = 17$, dan $P(5) = 46$, tentukan nilai dari $P(6)$.',
    explanation: `**Pembahasan:**
Perhatikan pola nilai untuk $x = 1, 2, 3, 4$:
- $P(1) = 1^2 + 1 = 2$
- $P(2) = 2^2 + 1 = 5$
- $P(3) = 3^2 + 1 = 10$
- $P(4) = 4^2 + 1 = 17$

Artinya, polinomial bantu $Q(x) = P(x) - (x^2 + 1)$ bernilai 0 pada $x \\in \\{1, 2, 3, 4\\}$.
Karena $P(x)$ berderajat 4, maka $Q(x)$ juga berderajat 4 dengan akar-akar $1, 2, 3, 4$.
Oleh karena itu, $Q(x)$ dapat dinyatakan sebagai:
$$Q(x) = k(x - 1)(x - 2)(x - 3)(x - 4)$$
untuk suatu konstanta riil $k$.

Gunakan informasi $P(5) = 46$:
$$Q(5) = P(5) - (5^2 + 1) = 46 - 26 = 20$$
Di sisi lain:
$$Q(5) = k(5 - 1)(5 - 2)(5 - 3)(5 - 4) = k(4 \\times 3 \\times 2 \\times 1) = 24k$$
Maka:
$$24k = 20 \\implies k = \\frac{20}{24} = \\frac{5}{6}$$

Sekarang kita dapat menghitung $P(6)$:
$$Q(6) = k(6 - 1)(6 - 2)(6 - 3)(6 - 4) = \\frac{5}{6}(5 \\times 4 \\times 3 \\times 2 \\times 1) = \\frac{5}{6}(120) = 100$$
Sehingga nilai $P(6)$ adalah:
$$P(6) = Q(6) + (6^2 + 1) = 100 + 37 = 137$$

Kunci jawaban: **C (137)**.`,
    options: [
      { key: 'A', text: '$121$', score: 0 },
      { key: 'B', text: '$127$', score: 0 },
      { key: 'C', text: '$137$', score: 4 },
      { key: 'D', text: '$149$', score: 0 },
      { key: 'E', text: '$162$', score: 0 },
    ],
  },

  // ==========================================
  // GEOMETRI (6 SOAL: 8 - 13)
  // ==========================================
  {
    orderNumber: 8,
    category: 'Geometri',
    subTopic: 'Teorema Ceva & Rasio Luas Segitiga',
    text: 'Pada segitiga $ABC$, titik $D, E, F$ berturut-turut terletak pada sisi $BC, CA, AB$ sedemikian sehingga garis-garis cevian $AD, BE, CF$ berpotongan di satu titik $P$ di dalam segitiga. Jika diketahui perbandingan $\\frac{AP}{PD} = 4$ dan $\\frac{BP}{PE} = 3$, tentukan nilai dari perbandingan $\\frac{CP}{PF}$.',
    explanation: `**Pembahasan:**
Gunakan metode perbandingan luas segitiga (atau sistem massa barisentrik).
Ingat bahwa rasio panjang segmen pada cevian terhadap proyeksinya ke sisi segitiga berkaitan langsung dengan luas sub-segitiga:
$$\\frac{PD}{AD} = \\frac{[PBC]}{[ABC]}$$
Karena $\\frac{AP}{PD} = 4$, maka $\\frac{AD}{PD} = \\frac{AP + PD}{PD} = 4 + 1 = 5$, sehingga:
$$\\frac{[PBC]}{[ABC]} = \\frac{PD}{AD} = \\frac{1}{5}$$

Dengan cara serupa, karena $\\frac{BP}{PE} = 3$, maka $\\frac{BE}{PE} = 3 + 1 = 4$, sehingga:
$$\\frac{[PCA]}{[ABC]} = \\frac{PE}{BE} = \\frac{1}{4}$$

Karena total luas $[ABC] = [PBC] + [PCA] + [PAB]$, kita dapat menghitung rasio untuk $[PAB]$:
$$\\frac{[PAB]}{[ABC]} = 1 - \\frac{[PBC]}{[ABC]} - \\frac{[PCA]}{[ABC]} = 1 - \\frac{1}{5} - \\frac{1}{4} = 1 - \\frac{9}{20} = \\frac{11}{20}$$

Hubungan rasio panjang untuk cevian $CF$:
$$\\frac{PF}{CF} = \\frac{[PAB]}{[ABC]} = \\frac{11}{20}$$
Karena $CF = CP + PF$, maka:
$$\\frac{CP}{PF} = \\frac{CF - PF}{PF} = \\frac{CF}{PF} - 1 = \\frac{20}{11} - 1 = \\frac{9}{11}$$

Kunci jawaban: **A (9/11)**.`,
    options: [
      { key: 'A', text: '$\\frac{9}{11}$', score: 4 },
      { key: 'B', text: '$\\frac{7}{11}$', score: 0 },
      { key: 'C', text: '$\\frac{8}{11}$', score: 0 },
      { key: 'D', text: '$\\frac{10}{11}$', score: 0 },
      { key: 'E', text: '$1$', score: 0 },
    ],
  },
  {
    orderNumber: 9,
    category: 'Geometri',
    subTopic: 'Segi Empat Tali Busur & Teorema Ptolemy',
    text: 'Diberikan suatu segi empat tali busur (cyclic quadrilateral) $ABCD$ yang titik-titik sudutnya terletak pada lingkaran. Panjang sisi-sisinya diketahui berturut-turut adalah $AB = 2$, $BC = 3$, $CD = 4$, dan $DA = 5$. Tentukan nilai dari perbandingan panjang diagonal $\\frac{AC}{BD}$.',
    explanation: `**Pembahasan:**
Misalkan panjang sisi-sisi segi empat tali busur berturut-turut adalah $a = AB = 2$, $b = BC = 3$, $c = CD = 4$, dan $d = DA = 5$.
Berdasarkan sifat segi empat tali busur dan Teorema Ptolemy, rumus perbandingan panjang diagonal adalah:
$$\\frac{AC}{BD} = \\frac{ab + cd}{ad + bc}$$

**Pembuktian rumus:**
Tinjau luas segitiga yang dibentuk oleh diagonal:
Luas segi empat dapat dihitung sebagai $[ABC] + [ADC]$ dan juga $[ABD] + [BCD]$:
$$[ABC] = \\frac{1}{2} ab \\sin B, \\quad [ADC] = \\frac{1}{2} cd \\sin D$$
Karena sudut yang berhadapan pada segi empat tali busur berjumlah $180^\\circ$ ($B + D = 180^\\circ$), maka $\\sin B = \\sin D$.
Oleh karena itu:
$$\\frac{[ABC]}{[ADC]} = \\frac{ab}{cd}$$
Dengan memanfaatkan aturan sinus atau rumus panjang diagonal:
$$AC^2 = \\frac{(ac + bd)(ab + cd)}{ad + bc} \\quad \\text{dan} \\quad BD^2 = \\frac{(ac + bd)(ad + bc)}{ab + cd}$$
Membagi kedua persamaan kuadrat diagonal:
$$\\frac{AC^2}{BD^2} = \\frac{(ab + cd)^2}{(ad + bc)^2} \\implies \\frac{AC}{BD} = \\frac{ab + cd}{ad + bc}$$

Substitusikan nilai panjang sisi:
$$ab + cd = (2)(3) + (4)(5) = 6 + 20 = 26$$
$$ad + bc = (2)(5) + (3)(4) = 10 + 12 = 22$$

Maka nilai perbandingan diagonalnya adalah:
$$\\frac{AC}{BD} = \\frac{26}{22} = \\frac{13}{11}$$

Kunci jawaban: **E (13/11)**.`,
    options: [
      { key: 'A', text: '$\\frac{11}{13}$', score: 0 },
      { key: 'B', text: '$\\frac{12}{13}$', score: 0 },
      { key: 'C', text: '$\\frac{14}{11}$', score: 0 },
      { key: 'D', text: '$\\frac{15}{11}$', score: 0 },
      { key: 'E', text: '$\\frac{13}{11}$', score: 4 },
    ],
  },
  {
    orderNumber: 10,
    category: 'Geometri',
    subTopic: 'Teorema Garis Bagi Sudut & Teorema Stewart',
    text: 'Pada segitiga $ABC$, diketahui panjang sisi-sisinya adalah $AB = 4$, $AC = 6$, dan $BC = 5$. Titik $D$ terletak pada sisi $BC$ sedemikian sehingga garis $AD$ merupakan garis bagi dalam sudut $\\angle BAC$. Tentukan panjang segmen garis bagi $AD$.',
    explanation: `**Pembahasan:**
Berdasarkan Teorema Garis Bagi Sudut (Angle Bisector Theorem):
$$\\frac{BD}{DC} = \\frac{AB}{AC} = \\frac{4}{6} = \\frac{2}{3}$$
Karena $BC = BD + DC = 5$, maka kita peroleh:
$$BD = \\frac{2}{2 + 3} \\times 5 = 2 \\quad \\text{dan} \\quad DC = \\frac{3}{2 + 3} \\times 5 = 3$$

Panjang garis bagi dalam $AD$ dapat dihitung menggunakan rumus standar panjang garis bagi:
$$AD^2 = AB \\times AC - BD \\times DC$$
Substitusikan nilai yang diketahui:
$$AD^2 = (4)(6) - (2)(3) = 24 - 6 = 18$$
Maka:
$$AD = \\sqrt{18} = 3\\sqrt{2}$$

*(Sebagai verifikasi menggunakan Teorema Stewart pada sisi $BC$:
$$AB^2 \\cdot DC + AC^2 \\cdot BD = BC(AD^2 + BD \\cdot DC)$$
$$4^2(3) + 6^2(2) = 5(AD^2 + 2 \\cdot 3) \\implies 48 + 72 = 5(AD^2 + 6) \\implies 120 = 5(AD^2 + 6)$$
$$AD^2 + 6 = 24 \\implies AD^2 = 18 \\implies AD = 3\\sqrt{2}$$).*

Kunci jawaban: **D (3\\sqrt{2})**.`,
    options: [
      { key: 'A', text: '$2\\sqrt{3}$', score: 0 },
      { key: 'B', text: '$4$', score: 0 },
      { key: 'C', text: '$2\\sqrt{5}$', score: 0 },
      { key: 'D', text: '$3\\sqrt{2}$', score: 4 },
      { key: 'E', text: '$3\\sqrt{3}$', score: 0 },
    ],
  },
  {
    orderNumber: 11,
    category: 'Geometri',
    subTopic: 'Teorema Titik Kuasa (Power of a Point)',
    text: 'Dari sebuah titik $P$ di luar lingkaran $\\Gamma$, ditarik garis singgung $PT$ yang menyinggung lingkaran di titik $T$, dengan panjang $PT = 12$. Garis sekans melalui $P$ memotong lingkaran di titik $A$ dan $B$ dengan urutan titik $P - A - B$. Jika panjang tali busur $AB = 7$, berapakah panjang segmen garis $PA$?',
    explanation: `**Pembahasan:**
Berdasarkan Teorema Kuasa Titik (Power of a Point Theorem):
Kuasa titik $P$ terhadap lingkaran $\\Gamma$ melalui garis singgung dan garis potong memenuhi persamaan:
$$PT^2 = PA \\times PB$$

Misalkan panjang segmen $PA = x$.
Karena urutan titik adalah $P - A - B$ dan $AB = 7$, maka panjang $PB$ adalah:
$$PB = PA + AB = x + 7$$

Substitusikan ke dalam persamaan teorema kuasa titik:
$$12^2 = x(x + 7)$$
$$144 = x^2 + 7x \\implies x^2 + 7x - 144 = 0$$

Faktorkan persamaan kuadrat tersebut:
$$(x + 16)(x - 9) = 0$$
Karena panjang segmen garis harus positif ($x > 0$), maka solusi yang memenuhi adalah:
$$x = 9$$
Jadi, panjang segmen garis $PA$ adalah 9.

Kunci jawaban: **B (9)**.`,
    options: [
      { key: 'A', text: '$7$', score: 0 },
      { key: 'B', text: '$9$', score: 4 },
      { key: 'C', text: '$8$', score: 0 },
      { key: 'D', text: '$10$', score: 0 },
      { key: 'E', text: '$16$', score: 0 },
    ],
  },
  {
    orderNumber: 12,
    category: 'Geometri',
    subTopic: 'Jari-jari Lingkaran Luar & Rumus Heron',
    text: 'Diberikan segitiga $ABC$ dengan panjang sisi-sisinya adalah $a = 13$, $b = 14$, dan $c = 15$. Tentukan panjang jari-jari lingkaran luar ($R$) dari segitiga tersebut.',
    explanation: `**Pembahasan:**
Semi-perimeter (setengah keliling) dari segitiga $ABC$ adalah:
$$s = \\frac{a + b + c}{2} = \\frac{13 + 14 + 15}{2} = \\frac{42}{2} = 21$$

Gunakan Rumus Heron untuk menghitung luas segitiga $[ABC]$:
$$L = \\sqrt{s(s - a)(s - b)(s - c)}$$
$$L = \\sqrt{21(21 - 13)(21 - 14)(21 - 15)} = \\sqrt{21 \\times 8 \\times 7 \\times 6}$$
Faktorisasi bilangan di dalam akar:
$$L = \\sqrt{(7 \\times 3) \\times (2^3) \\times 7 \\times (2 \\times 3)} = \\sqrt{7^2 \\times 3^2 \\times 2^4} = 7 \\times 3 \\times 4 = 84$$

Rumus jari-jari lingkaran luar segitiga ($R$) adalah:
$$R = \\frac{abc}{4L}$$
Substitusikan nilai $a, b, c$ dan $L = 84$:
$$R = \\frac{13 \\times 14 \\times 15}{4 \\times 84}$$
Perhatikan bahwa $14 \\times 6 = 84$, sehingga:
$$R = \\frac{13 \\times 15}{4 \\times 6} = \\frac{13 \\times 5}{4 \\times 2} = \\frac{65}{8} = 8.125$$

Kunci jawaban: **A (65/8)**.`,
    options: [
      { key: 'A', text: '$\\frac{65}{8}$', score: 4 },
      { key: 'B', text: '$\\frac{63}{8}$', score: 0 },
      { key: 'C', text: '$\\frac{33}{4}$', score: 0 },
      { key: 'D', text: '$\\frac{67}{8}$', score: 0 },
      { key: 'E', text: '$9$', score: 0 },
    ],
  },
  {
    orderNumber: 13,
    category: 'Geometri',
    subTopic: 'Lingkaran Berpotongan & Trapesium Sama Kaki',
    text: 'Dua lingkaran $\\Gamma_1$ dan $\\Gamma_2$ saling berpotongan di dua titik berbeda $P$ dan $Q$. Sebuah garis lurus melalui $P$ memotong $\\Gamma_1$ di $A$ dan memotong $\\Gamma_2$ di $B$ (dengan urutan $A-P-B$). Garis kedua melalui $Q$ yang ditarik sejajar dengan garis $AB$ memotong $\\Gamma_1$ di $C$ dan memotong $\\Gamma_2$ di $D$ (dengan urutan $C-Q-D$). Jika diketahui panjang $AB = 10$, tentukan panjang segmen garis $CD$.',
    explanation: `**Pembahasan:**
Perhatikan posisi titik-titik pada masing-masing lingkaran:
1. Pada lingkaran $\\Gamma_1$, titik-titik $A, P, Q, C$ terletak pada keliling lingkaran.
   Karena garis $AP$ sejajar dengan garis $CQ$ ($AB \\parallel CD$), maka segi empat $APQC$ adalah trapesium yang termaktub di dalam lingkaran $\\Gamma_1$.
   Trapesium yang termaktub dalam sebuah lingkaran (cyclic trapezoid) selalu merupakan **trapesium sama kaki**.
   Oleh karena itu, panjang sisi-sisi sejajarnya diapit oleh tali busur yang sama:
   $$AP = CQ$$

2. Pada lingkaran $\\Gamma_2$, titik-titik $P, B, D, Q$ terletak pada keliling lingkaran.
   Dengan argumen serupa, karena segmen $PB$ sejajar dengan segmen $QD$ ($AB \\parallel CD$), maka segi empat $PBDQ$ adalah trapesium yang termaktub di dalam $\\Gamma_2$, sehingga juga merupakan **trapesium sama kaki**.
   Akibatnya:
   $$PB = QD$$

Sekarang jumlahkan panjang segmen pada garis kedua:
$$CD = CQ + QD$$
Substitusikan kesamaan yang telah diperoleh:
$$CD = AP + PB = AB$$
Diketahui panjang $AB = 10$, maka:
$$CD = 10$$

Kunci jawaban: **C (10)**.`,
    options: [
      { key: 'A', text: '$5$', score: 0 },
      { key: 'B', text: '$5\\sqrt{2}$', score: 0 },
      { key: 'C', text: '$10$', score: 4 },
      { key: 'D', text: '$12$', score: 0 },
      { key: 'E', text: '$20$', score: 0 },
    ],
  },

  // ==========================================
  // TEORI BILANGAN (6 SOAL: 14 - 19)
  // ==========================================
  {
    orderNumber: 14,
    category: 'Teori Bilangan',
    subTopic: 'Persamaan Diophantine Non-Linear',
    text: 'Tentukan banyaknya pasangan bilangan bulat positif $(x, y)$ yang memenuhi persamaan pecahan Diophantine berikut:\n$$\\frac{1}{x} + \\frac{1}{y} = \\frac{1}{2026}$$',
    explanation: `**Pembahasan:**
Kalikan kedua ruas persamaan dengan $2026xy$:
$$2026y + 2026x = xy \\implies xy - 2026x - 2026y = 0$$

Gunakan teknik faktorisasi Simon (Simon's Favorite Factoring Trick) dengan menambahkan $2026^2$ pada kedua ruas:
$$(x - 2026)(y - 2026) = 2026^2$$

Lakukan faktorisasi prima dari bilangan $2026$:
$$2026 = 2 \\times 1013$$
Perhatikan bahwa $1013$ adalah bilangan prima (karena $\\sqrt{1013} \\approx 31.8$ dan $1013$ tidak habis dibagi bilangan prima $\\le 31$: $2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31$).

Sehingga faktorisasi prima dari $2026^2$ adalah:
$$2026^2 = 2^2 \\times 1013^2$$

Banyaknya faktor positif (pembagi positif) dari $2026^2$ dihitung menggunakan rumus $\\tau(n)$:
$$d(2026^2) = (2 + 1)(2 + 1) = 3 \\times 3 = 9$$

Karena $x, y$ adalah bilangan bulat positif dan $\\frac{1}{x} < \\frac{1}{2026}$, maka haruslah $x > 2026$ dan $y > 2026$.
Dengan demikian, $(x - 2026)$ dan $(y - 2026)$ harus berupa pasangan pembagi positif dari $2026^2$.
Setiap pembagi positif $d$ dari $2026^2$ memberikan tepat satu solusi unik:
$$x = 2026 + d, \\quad y = 2026 + \\frac{2026^2}{d}$$
Karena terdapat 9 faktor pembagi positif, maka ada tepat 9 pasangan bilangan bulat positif $(x, y)$.

Kunci jawaban: **D (9)**.`,
    options: [
      { key: 'A', text: '$3$', score: 0 },
      { key: 'B', text: '$5$', score: 0 },
      { key: 'C', text: '$7$', score: 0 },
      { key: 'D', text: '$9$', score: 4 },
      { key: 'E', text: '$18$', score: 0 },
    ],
  },
  {
    orderNumber: 15,
    category: 'Teori Bilangan',
    subTopic: 'Teorema Euler & Aritmetika Modular',
    text: 'Tentukan sisa pembagian dari bilangan eksponensial $3^{2026}$ jika dibagi oleh $100$ (ekuivalen dengan menentukan dua digit terakhir dari $3^{2026}$).',
    explanation: `**Pembahasan:**
Kita ingin mencari nilai $3^{2026} \\pmod{100}$.
Karena $\\gcd(3, 100) = 1$, kita dapat memanfaatkan Teorema Euler atau menentukan orde multiplikatif dari 3 modulo 100.

Fungsi Totient Euler dari $100 = 2^2 \\times 5^2$:
$$\\phi(100) = 100 \\left(1 - \\frac{1}{2}\\right)\\left(1 - \\frac{1}{5}\\right) = 100 \\times \\frac{1}{2} \\times \\frac{4}{5} = 40$$
Berdasarkan Teorema Euler:
$$3^{40} \\equiv 1 \\pmod{100}$$

Kita uji apakah orde dari 3 lebih kecil dari 40:
- $3^4 = 81 \\equiv -19 \\pmod{100}$
- $3^5 = 243 \\equiv 43 \\pmod{100}$
- $3^{10} \\equiv 43^2 = 1849 \\equiv 49 \\pmod{100}$
- $3^{20} \\equiv 49^2 = (50 - 1)^2 = 2500 - 100 + 1 = 2401 \\equiv 1 \\pmod{100}$

Jadi, orde dari 3 modulo 100 adalah 20.
Bagi pangkat 2026 dengan periode 20:
$$2026 = 20 \\times 101 + 6 \\implies 2026 \\equiv 6 \\pmod{20}$$

Oleh karena itu:
$$3^{2026} \\equiv (3^{20})^{101} \\times 3^6 \\equiv 1^{101} \\times 3^6 \\equiv 3^6 \\pmod{100}$$
Hitung nilai $3^6$:
$$3^6 = 729 \\equiv 29 \\pmod{100}$$

Jadi, sisa pembagian $3^{2026}$ oleh 100 adalah 29.

Kunci jawaban: **B (29)**.`,
    options: [
      { key: 'A', text: '$9$', score: 0 },
      { key: 'B', text: '$29$', score: 4 },
      { key: 'C', text: '$21$', score: 0 },
      { key: 'D', text: '$49$', score: 0 },
      { key: 'E', text: '$89$', score: 0 },
    ],
  },
  {
    orderNumber: 16,
    category: 'Teori Bilangan',
    subTopic: 'Formula Legendre & Valuasi p-adik',
    text: 'Tentukan banyaknya angka nol berurutan di akhir penulisan desimal dari bilangan faktorial $2026!$.',
    explanation: `**Pembahasan:**
Banyaknya angka nol di akhir bilangan $N = 2026!$ sama dengan eksponen pangkat tertinggi dari 10 yang membagi $N$, yaitu $\\min(v_2(2026!), v_5(2026!))$.
Karena faktor prima 2 selalu lebih banyak daripada faktor prima 5, maka banyaknya angka nol ditentukan oleh valuasi 5-adik $v_5(2026!)$.

Gunakan Formula Legendre:
$$v_5(n!) = \\sum_{k=1}^{\\infty} \\left\\lfloor \\frac{n}{5^k} \\right\\rfloor$$

Hitung untuk $n = 2026$:
- $\\lfloor \\frac{2026}{5} \\rfloor = 405$
- $\\lfloor \\frac{2026}{25} \\rfloor = \\lfloor \\frac{405}{5} \\rfloor = 81$
- $\\lfloor \\frac{2026}{125} \\rfloor = \\lfloor \\frac{81}{5} \\rfloor = 16$
- $\\lfloor \\frac{2026}{625} \\rfloor = \\lfloor \\frac{16}{5} \\rfloor = 3$
- $\\lfloor \\frac{2026}{3125} \\rfloor = 0$

Jumlahkan seluruh hasil bagi tersebut:
$$v_5(2026!) = 405 + 81 + 16 + 3 = 505$$

Dengan demikian, terdapat tepat 505 angka nol di akhir penulisan bilangan $2026!$.

Kunci jawaban: **E (505)**.`,
    options: [
      { key: 'A', text: '$500$', score: 0 },
      { key: 'B', text: '$503$', score: 0 },
      { key: 'C', text: '$508$', score: 0 },
      { key: 'D', text: '$512$', score: 0 },
      { key: 'E', text: '$505$', score: 4 },
    ],
  },
  {
    orderNumber: 17,
    category: 'Teori Bilangan',
    subTopic: 'Teorema Sisa Cina (Chinese Remainder Theorem)',
    text: 'Tentukan bilangan bulat positif terkecil $N$ yang memenuhi sistem kongruensi linear berikut:\n$$\\begin{aligned} N &\\equiv 2 \\pmod 3 \\\\ N &\\equiv 3 \\pmod 5 \\\\ N &\\equiv 5 \\pmod 7 \\end{aligned}$$',
    explanation: `**Pembahasan:**
Perhatikan sistem kongruensi:
1. $N \\equiv 2 \\pmod 3 \\implies N \\equiv -1 \\pmod 3$
2. $N \\equiv 3 \\pmod 5 \\implies N \\equiv -2 \\pmod 5$
3. $N \\equiv 5 \\pmod 7 \\implies N \\equiv -2 \\pmod 7$

Dari kongruensi (2) dan (3):
Karena $N \\equiv -2 \\pmod 5$ dan $N \\equiv -2 \\pmod 7$, dan karena $\\gcd(5, 7) = 1$, maka berdasarkan sifat kongruensi modulo:
$$N \\equiv -2 \\pmod{\\operatorname{kpk}(5, 7)} \\implies N \\equiv -2 \\pmod{35}$$
Ekuivalen dengan:
$$N \\equiv 33 \\pmod{35}$$
Artinya, $N$ dapat dinyatakan dalam bentuk:
$$N = 35k + 33 \\quad \\text{untuk suatu bilangan bulat } k$$

Sekarang uji ke dalam kongruensi (1):
$$35k + 33 \\equiv 2 \\pmod 3$$
Sederhanakan modulo 3:
$$(35 \\pmod 3)k + (33 \\pmod 3) \\equiv 2 \\pmod 3$$
$$2k + 0 \\equiv 2 \\pmod 3 \\implies 2k \\equiv 2 \\pmod 3$$
Karena $\\gcd(2, 3) = 1$, kita dapat membagi kedua ruas dengan 2:
$$k \\equiv 1 \\pmod 3$$

Untuk memperoleh bilangan bulat positif terkecil $N$, kita pilih nilai terkecil $k \\ge 0$, yaitu $k = 1$:
$$N = 35(1) + 33 = 68$$

**Verifikasi:**
- $68 = 3 \\times 22 + 2 \\implies 68 \\equiv 2 \\pmod 3$ (Benar)
- $68 = 5 \\times 13 + 3 \\implies 68 \\equiv 3 \\pmod 5$ (Benar)
- $68 = 7 \\times 9 + 5 \\implies 68 \\equiv 5 \\pmod 7$ (Benar)

Kunci jawaban: **B (68)**.`,
    options: [
      { key: 'A', text: '$53$', score: 0 },
      { key: 'B', text: '$68$', score: 4 },
      { key: 'C', text: '$103$', score: 0 },
      { key: 'D', text: '$173$', score: 0 },
      { key: 'E', text: '$210$', score: 0 },
    ],
  },
  {
    orderNumber: 18,
    category: 'Teori Bilangan',
    subTopic: 'Teorema Wilson',
    text: 'Tentukan sisa pembagian dari bilangan faktorial $97!$ ketika dibagi oleh bilangan prima $101$.',
    explanation: `**Pembahasan:**
Berdasarkan Teorema Wilson, untuk setiap bilangan prima $p$, berlaku:
$$(p - 1)! \\equiv -1 \\pmod p$$

Di sini $p = 101$ adalah bilangan prima, sehingga:
$$100! \\equiv -1 \\pmod{101}$$

Uraikan $100!$ hingga suku $97!$:
$$100 \\times 99 \\times 98 \\times 97! \\equiv -1 \\pmod{101}$$

Ganti masing-masing faktor dengan representasi negatifnya modulo 101:
- $100 \\equiv -1 \\pmod{101}$
- $99 \\equiv -2 \\pmod{101}$
- $98 \\equiv -3 \\pmod{101}$

Substitusikan ke dalam kongruensi:
$$(-1)(-2)(-3) \\times 97! \\equiv -1 \\pmod{101}$$
$$-6 \\times 97! \\equiv -1 \\pmod{101}$$
Kalikan kedua ruas dengan $-1$:
$$6 \\times 97! \\equiv 1 \\pmod{101}$$

Cari invers multiplikatif dari 6 modulo 101:
$$6x \\equiv 1 \\pmod{101} \\iff 6x \\equiv 102 \\pmod{101}$$
Karena $102 = 6 \\times 17$, dan $\\gcd(6, 101) = 1$, kita peroleh:
$$x \\equiv 17 \\pmod{101}$$

Dengan demikian:
$$97! \\equiv 17 \\pmod{101}$$
Jadi sisa pembagiannya adalah 17.

Kunci jawaban: **A (17)**.`,
    options: [
      { key: 'A', text: '$17$', score: 4 },
      { key: 'B', text: '$34$', score: 0 },
      { key: 'C', text: '$51$', score: 0 },
      { key: 'D', text: '$84$', score: 0 },
      { key: 'E', text: '$100$', score: 0 },
    ],
  },
  {
    orderNumber: 19,
    category: 'Teori Bilangan',
    subTopic: 'Sifat FPB Eksponensial',
    text: 'Tentukan faktor persekutuan terbesar (FPB) dari dua bilangan besar berikut:\n$$\\gcd(2^{2026} - 1, \\, 2^{2018} - 1)$$',
    explanation: `**Pembahasan:**
Gunakan sifat terkenal dari FPB bilangan berbentuk $a^m - 1$ dan $a^n - 1$:
$$\\gcd(a^m - 1, a^n - 1) = a^{\\gcd(m, n)} - 1$$
untuk sebarang bilangan bulat $a \\ge 2$ dan $m, n \\ge 1$.

**Bukti singkat:**
Dengan menerapkan Algoritma Euclidean berulang pada eksponen:
$$(a^m - 1) - a^{m-n}(a^n - 1) = a^{m-n} - 1$$
Karena $\\gcd(a^m - 1, a) = 1$, proses ini ekuivalen persis dengan langkah Algoritma Euclidean pada pangkat $(m, n)$.

Di sini $a = 2$, $m = 2026$, dan $n = 2018$.
Hitung $\\gcd(2026, 2018)$ menggunakan Algoritma Euclidean:
$$\\gcd(2026, 2018) = \\gcd(2018, 2026 - 2018) = \\gcd(2018, 8)$$
Bagi 2018 dengan 8:
$$2018 = 8 \\times 252 + 2$$
Maka:
$$\\gcd(2018, 8) = \\gcd(8, 2) = 2$$

Oleh karena itu:
$$\\gcd(2^{2026} - 1, 2^{2018} - 1) = 2^{\\gcd(2026, 2018)} - 1 = 2^2 - 1 = 4 - 1 = 3$$

Kunci jawaban: **C (3)**.`,
    options: [
      { key: 'A', text: '$1$', score: 0 },
      { key: 'B', text: '$2$', score: 0 },
      { key: 'C', text: '$3$', score: 4 },
      { key: 'D', text: '$7$', score: 0 },
      { key: 'E', text: '$15$', score: 0 },
    ],
  },

  // ==========================================
  // KOMBINATORIKA (6 SOAL: 20 - 25)
  // ==========================================
  {
    orderNumber: 20,
    category: 'Kombinatorika',
    subTopic: 'Prinsip Sangkar Burung (Pigeonhole Principle)',
    text: 'Diberikan himpunan bilangan bulat $S = \\{1, 2, 3, \\dots, 50\\}$. Berapakah jumlah elemen minimum yang harus dipilih dari $S$ untuk menjamin bahwa di antara elemen-elemen yang terpilih, pasti terdapat setidaknya dua bilangan yang jumlahnya sama dengan 51?',
    explanation: `**Pembahasan:**
Kelompokkan elemen-elemen dari $S$ menjadi pasangan-pasangan bilangan yang jumlahnya sama dengan 51:
$$(1, 50), (2, 49), (3, 48), \\dots, (25, 26)$$
Terdapat tepat 25 pasang disjoint (saling lepas) yang masing-masing berjumlah 51.

Berdasarkan Prinsip Sangkar Burung (Pigeonhole Principle):
Setiap pasangan bertindak sebagai satu "sangkar" (terdapat 25 sangkar).
Jika kita memilih 25 bilangan, dalam kasus terburuk (worst case) kita dapat memilih tepat satu elemen dari setiap pasangan (misalnya memilih subset $\\{1, 2, 3, \\dots, 25\\}$), di mana tidak ada dua bilangan yang jumlahnya 51.

Namun, jika kita memilih $25 + 1 = 26$ bilangan, maka menurut Pigeonhole Principle, setidaknya ada satu sangkar di mana kedua anggotanya terpilih sekaligus.
Kedua bilangan dari pasangan tersebut pasti memiliki jumlah:
$$x + y = 51$$

Dengan demikian, jumlah elemen minimum yang harus diambil adalah 26.

Kunci jawaban: **B (26)**.`,
    options: [
      { key: 'A', text: '$25$', score: 0 },
      { key: 'B', text: '$26$', score: 4 },
      { key: 'C', text: '$27$', score: 0 },
      { key: 'D', text: '$50$', score: 0 },
      { key: 'E', text: '$51$', score: 0 },
    ],
  },
  {
    orderNumber: 21,
    category: 'Kombinatorika',
    subTopic: 'Bintang dan Batang (Stars and Bars)',
    text: 'Tentukan banyaknya solusi berupa bilangan bulat $(x_1, x_2, x_3, x_4)$ yang memenuhi persamaan:\n$$x_1 + x_2 + x_3 + x_4 = 15$$\ndengan syarat pembatas $x_1 \\ge 1$, $x_2 \\ge 2$, $x_3 \\ge 3$, dan $x_4 \\ge 0$.',
    explanation: `**Pembahasan:**
Lakukan substitusi variabel untuk mengubah batas nilai masing-masing variabel menjadi bilangan bulat non-negatif:
- Misalkan $y_1 = x_1 - 1 \\implies x_1 = y_1 + 1$ dengan $y_1 \\ge 0$
- Misalkan $y_2 = x_2 - 2 \\implies x_2 = y_2 + 2$ dengan $y_2 \\ge 0$
- Misalkan $y_3 = x_3 - 3 \\implies x_3 = y_3 + 3$ dengan $y_3 \\ge 0$
- Misalkan $y_4 = x_4 \\implies x_4 = y_4$ dengan $y_4 \\ge 0$

Substitusikan ke dalam persamaan semula:
$$(y_1 + 1) + (y_2 + 2) + (y_3 + 3) + y_4 = 15$$
$$y_1 + y_2 + y_3 + y_4 + 6 = 15$$
$$y_1 + y_2 + y_3 + y_4 = 9$$
dengan $y_1, y_2, y_3, y_4 \\in \\mathbb{Z}_{\\ge 0}$.

Berdasarkan Teorema Bintang dan Batang (Stars and Bars), banyaknya solusi bilangan bulat non-negatif dari persamaan $y_1 + y_2 + \\dots + y_k = n$ adalah:
$$\\binom{n + k - 1}{k - 1}$$
Di sini $n = 9$ dan $k = 4$, sehingga banyaknya solusi adalah:
$$\\binom{9 + 4 - 1}{4 - 1} = \\binom{12}{3}$$
Hitung nilai kombinasi tersebut:
$$\\binom{12}{3} = \\frac{12 \\times 11 \\times 10}{3 \\times 2 \\times 1} = 2 \\times 11 \\times 10 = 220$$

Kunci jawaban: **D (220)**.`,
    options: [
      { key: 'A', text: '$165$', score: 0 },
      { key: 'B', text: '$210$', score: 0 },
      { key: 'C', text: '$286$', score: 0 },
      { key: 'D', text: '$220$', score: 4 },
      { key: 'E', text: '$455$', score: 0 },
    ],
  },
  {
    orderNumber: 22,
    category: 'Kombinatorika',
    subTopic: 'Derangement & Prinsip Inklusi-Eksklusi',
    text: 'Sebanyak 5 orang siswa mengumpulkan topi mereka ke dalam sebuah kotak tertutup. Kemudian secara acak masing-masing siswa mengambil satu topi dari kotak tersebut. Berapakah peluang bahwa tidak ada satu pun siswa yang mendapatkan topinya sendiri kembali?',
    explanation: `**Pembahasan:**
Kasus di mana tidak ada siswa yang menerima topinya sendiri merupakan masalah **Derangement** (permutasi bebas titik tetap) dari $n = 5$ elemen, dinotasikan $D_5$ atau $!5$.

Rumus jumlah derangement untuk $n$ elemen berdasarkan Prinsip Inklusi-Eksklusi adalah:
$$D_n = n! \\sum_{k=0}^n \\frac{(-1)^k}{k!}$$
Untuk $n = 5$:
$$D_5 = 5! \\left( \\frac{1}{0!} - \\frac{1}{1!} + \\frac{1}{2!} - \\frac{1}{3!} + \\frac{1}{4!} - \\frac{1}{5!} \\right)$$
$$D_5 = 120 \\left( 1 - 1 + \\frac{1}{2} - \\frac{1}{6} + \\frac{1}{24} - \\frac{1}{120} \\right)$$
Samakan penyebut ke 120:
$$D_5 = 120 \\times \\left( \\frac{60 - 20 + 5 - 1}{120} \\right) = 44$$

Total seluruh kemungkinan permutasi pembagian topi adalah:
$$n! = 5! = 120$$

Peluang yang dicari adalah rasio derangement terhadap total kemungkinan:
$$P = \\frac{D_5}{5!} = \\frac{44}{120} = \\frac{11}{30}$$

Kunci jawaban: **C (11/30)**.`,
    options: [
      { key: 'A', text: '$\\frac{1}{3}$', score: 0 },
      { key: 'B', text: '$\\frac{3}{8}$', score: 0 },
      { key: 'C', text: '$\\frac{11}{30}$', score: 4 },
      { key: 'D', text: '$\\frac{2}{5}$', score: 0 },
      { key: 'E', text: '$\\frac{23}{60}$', score: 0 },
    ],
  },
  {
    orderNumber: 23,
    category: 'Kombinatorika',
    subTopic: 'Teori Graf & Lemma Jabat Tangan',
    text: 'Dalam suatu turnamen catur yang diikuti oleh 12 orang peserta, setiap pasang peserta bertanding paling banyak satu kali. Pada suatu waktu, diketahui 4 orang telah bertanding sebanyak 5 kali, 5 orang telah bertanding sebanyak 6 kali, dan 3 orang sisanya telah bertanding masing-masing tepat $k$ kali. Jika total pertandingan catur yang telah dimainkan adalah 37 partai, tentukan nilai dari $k$.',
    explanation: `**Pembahasan:**
Turnamen catur ini dapat dimodelkan sebagai graf sederhana $G = (V, E)$, di mana:
- Simpul (verteks) merepresentasikan 12 peserta ($|V| = 12$).
- Sisi (edge) merepresentasikan pertandingan yang telah dimainkan ($|E| = 37$).
- Derajat simpul $\\deg(v)$ merepresentasikan banyaknya pertandingan yang telah dimainkan oleh peserta $v$.

Berdasarkan Lemma Jabat Tangan Euler (Handshaking Lemma):
$$\\sum_{v \\in V} \\deg(v) = 2 |E|$$
Substitusikan $|E| = 37$:
$$\\sum_{v \\in V} \\deg(v) = 2 \\times 37 = 74$$

Berdasarkan informasi soal, jumlah total derajat simpul adalah:
$$\\sum_{v \\in V} \\deg(v) = 4(5) + 5(6) + 3(k)$$
$$74 = 20 + 30 + 3k$$
$$74 = 50 + 3k$$
$$3k = 24 \\implies k = 8$$

*(Perhatikan bahwa pada graf dengan 12 simpul, derajat maksimum setiap simpul adalah $12 - 1 = 11$, sehingga $k = 8$ merupakan nilai yang valid dan memenuhi teorema kekompakan graf).*

Kunci jawaban: **E (8)**.`,
    options: [
      { key: 'A', text: '$6$', score: 0 },
      { key: 'B', text: '$7$', score: 0 },
      { key: 'C', text: '$9$', score: 0 },
      { key: 'D', text: '$10$', score: 0 },
      { key: 'E', text: '$8$', score: 4 },
    ],
  },
  {
    orderNumber: 24,
    category: 'Kombinatorika',
    subTopic: 'Grid Paths & Prinsip Komplemen',
    text: 'Sebuah robot bergerak pada kisi-kisi titik koordinat dari titik asal $(0, 0)$ menuju titik target $(5, 5)$. Pada setiap langkah, robot hanya diperbolehkan bergerak 1 satuan ke kanan (+x) atau 1 satuan ke atas (+y). Berapakah banyaknya lintasan terpendek berbeda yang TIDAK melewati titik $(2, 2)$?',
    explanation: `**Pembahasan:**
Gunakan prinsip komplemen:
Banyaknya lintasan yang tidak melewati $(2, 2)$ sama dengan total lintasan dikurangi banyaknya lintasan yang melewati $(2, 2)$.

**Langkah 1: Hitung total lintasan dari $(0, 0)$ ke $(5, 5)$.**
Robot harus menempuh total $5 + 5 = 10$ langkah (5 langkah Kanan dan 5 langkah Atas):
$$N_{\\text{total}} = \\binom{5 + 5}{5} = \\binom{10}{5} = \\frac{10 \\times 9 \\times 8 \\times 7 \\times 6}{5 \\times 4 \\times 3 \\times 2 \\times 1} = 252$$

**Langkah 2: Hitung lintasan yang melewati $(2, 2)$.**
Perjalanan yang melalui $(2, 2)$ terbagi menjadi dua sub-perjalanan independen:
1. Dari $(0, 0)$ ke $(2, 2)$:
   Robot menempuh $2 + 2 = 4$ langkah (2 Kanan, 2 Atas):
   $$N_1 = \\binom{2 + 2}{2} = \\binom{4}{2} = \\frac{4 \\times 3}{2} = 6$$
2. Dari $(2, 2)$ ke $(5, 5)$:
   Jarak yang ditempuh adalah $(5 - 2)$ Kanan dan $(5 - 2)$ Atas, yaitu 3 Kanan dan 3 Atas (total 6 langkah):
   $$N_2 = \\binom{3 + 3}{3} = \\binom{6}{3} = \\frac{6 \\times 5 \\times 4}{3 \\times 2 \\times 1} = 20$$

Berdasarkan aturan perkalian:
$$N_{\\text{lewat}} = N_1 \\times N_2 = 6 \\times 20 = 120$$

**Langkah 3: Hitung lintasan yang tidak melalui $(2, 2)$.**
$$N = N_{\\text{total}} - N_{\\text{lewat}} = 252 - 120 = 132$$

Kunci jawaban: **A (132)**.`,
    options: [
      { key: 'A', text: '$132$', score: 4 },
      { key: 'B', text: '$120$', score: 0 },
      { key: 'C', text: '$126$', score: 0 },
      { key: 'D', text: '$144$', score: 0 },
      { key: 'E', text: '$156$', score: 0 },
    ],
  },
  {
    orderNumber: 25,
    category: 'Kombinatorika',
    subTopic: 'Bilangan Catalan & Pengelompokan Valid',
    text: 'Tentukan banyaknya cara meletakkan tanda kurung yang sah (validly parenthesized expression) pada perkalian berantai 6 buah variabel $x_1 \\times x_2 \\times x_3 \\times x_4 \\times x_5 \\times x_6$ tanpa mengubah urutan perkalian variabel-variabel tersebut.',
    explanation: `**Pembahasan:**
Banyaknya cara memberi tanda kurung pada perkalian asosiatif dari $n$ buah faktor tanpa mengubah urutannya diberikan oleh **Bilangan Catalan** ke-$(n-1)$, yaitu $C_{n-1}$.

Di sini terdapat $n = 6$ faktor variabel, sehingga banyaknya cara pengurungan yang sah adalah:
$$C_{6-1} = C_5$$

Rumus eksplisit Bilangan Catalan $C_k$ adalah:
$$C_k = \\frac{1}{k + 1} \\binom{2k}{k}$$

Hitung untuk $k = 5$:
$$C_5 = \\frac{1}{5 + 1} \\binom{2(5)}{5} = \\frac{1}{6} \\binom{10}{5}$$
Diketahui $\\binom{10}{5} = 252$, maka:
$$C_5 = \\frac{1}{6} \\times 252 = 42$$

*(Sebagai ilustrasi untuk nilai $n$ kecil:
- $n = 2$: $C_1 = 1$ cara: $(x_1 x_2)$
- $n = 3$: $C_2 = 2$ cara: $((x_1 x_2) x_3)$ dan $(x_1 (x_2 x_3))$
- $n = 4$: $C_3 = 5$ cara
- $n = 5$: $C_4 = 14$ cara
- $n = 6$: $C_5 = 42$ cara).*

Kunci jawaban: **C (42)**.`,
    options: [
      { key: 'A', text: '$14$', score: 0 },
      { key: 'B', text: '$28$', score: 0 },
      { key: 'C', text: '$42$', score: 4 },
      { key: 'D', text: '$56$', score: 0 },
      { key: 'E', text: '$132$', score: 0 },
    ],
  },
];

export async function seedOlimpiadeP2(prisma: PrismaClient) {
  console.log('📐 Memulai seeding Paket Olimpiade Matematika Paket 2...');

  // 1. Ensure Passing Grade Profile exists
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

  // 2. Package
  const pkg = await prisma.package.upsert({
    where: { slug: 'olimpiade-matematika-paket-2' },
    update: {
      title: 'Simulasi Seleksi Olimpiade Sains Matematika Paket 2 (OSN-K/P Tingkat Lanjut)',
      examType: 'MATH_OLYMPIAD',
      price: 50000,
      promoPrice: 39000,
      isFree: false,
      isActive: true,
      description:
        'Simulasi seleksi olimpiade sains bidang matematika tingkat kabupaten/kota & provinsi (OSN-K/OSN-P) tingkat lanjut. Terdiri dari 25 butir soal pemecahan masalah berkualitas tinggi meliputi Aljabar (7), Geometri (6), Teori Bilangan (6), dan Kombinatorika (6) dengan negative marking (+4 Benar, -1 Salah) dan pembahasan pembuktian analitis lengkap.',
    },
    create: {
      title: 'Simulasi Seleksi Olimpiade Sains Matematika Paket 2 (OSN-K/P Tingkat Lanjut)',
      slug: 'olimpiade-matematika-paket-2',
      examType: 'MATH_OLYMPIAD',
      price: 50000,
      promoPrice: 39000,
      isFree: false,
      isActive: true,
      description:
        'Simulasi seleksi olimpiade sains bidang matematika tingkat kabupaten/kota & provinsi (OSN-K/OSN-P) tingkat lanjut. Terdiri dari 25 butir soal pemecahan masalah berkualitas tinggi meliputi Aljabar (7), Geometri (6), Teori Bilangan (6), dan Kombinatorika (6) dengan negative marking (+4 Benar, -1 Salah) dan pembahasan pembuktian analitis lengkap.',
    },
  });

  // 3. Tryout
  const tryout = await prisma.tryout.upsert({
    where: { id: 'tryout-olimpiade-math-p2' },
    update: {
      packageId: pkg.id,
      passingGradeProfileId: pgOlimpiade.id,
      title: 'Simulasi OSN Matematika Paket 2 (25 Soal Tingkat Lanjut)',
      examType: 'MATH_OLYMPIAD',
      durationMinutes: 120,
      totalQuestions: 25,
      scoringScheme: {
        type: 'NEGATIVE_MARKING',
        correct: 4,
        wrong: -1,
        empty: 0,
        subtests: ['Aljabar', 'Geometri', 'Teori Bilangan', 'Kombinatorika'],
      },
      subtestConfig: {
        Aljabar: { total: 7, maxScore: 28 },
        Geometri: { total: 6, maxScore: 24 },
        'Teori Bilangan': { total: 6, maxScore: 24 },
        Kombinatorika: { total: 6, maxScore: 24 },
      },
      isActive: true,
    },
    create: {
      id: 'tryout-olimpiade-math-p2',
      packageId: pkg.id,
      passingGradeProfileId: pgOlimpiade.id,
      title: 'Simulasi OSN Matematika Paket 2 (25 Soal Tingkat Lanjut)',
      examType: 'MATH_OLYMPIAD',
      durationMinutes: 120,
      totalQuestions: 25,
      scoringScheme: {
        type: 'NEGATIVE_MARKING',
        correct: 4,
        wrong: -1,
        empty: 0,
        subtests: ['Aljabar', 'Geometri', 'Teori Bilangan', 'Kombinatorika'],
      },
      subtestConfig: {
        Aljabar: { total: 7, maxScore: 28 },
        Geometri: { total: 6, maxScore: 24 },
        'Teori Bilangan': { total: 6, maxScore: 24 },
        Kombinatorika: { total: 6, maxScore: 24 },
      },
      isActive: true,
    },
  });

  // 4. Seed Questions and Options
  console.log(`📝 Seeding ${olimpiadeP2Questions.length} butir soal Olimpiade Matematika P2...`);

  for (const q of olimpiadeP2Questions) {
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
        questionType: 'MULTIPLE_CHOICE',
        text: q.text,
        explanation: q.explanation,
      },
      create: {
        tryoutId: tryout.id,
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

  console.log(`✅ Sukses seeding 25 butir soal Olimpiade Matematika P2 (${tryout.id}).`);
}

// Standalone execution support
if (require.main === module) {
  const prisma = new PrismaClient();
  seedOlimpiadeP2(prisma)
    .then(async () => {
      await prisma.$disconnect();
      console.log('🎉 Seeding Olimpiade P2 selesai sempurna.');
    })
    .catch(async (e) => {
      console.error('❌ Error seeding Olimpiade P2:', e);
      await prisma.$disconnect();
      process.exit(1);
    });
}
