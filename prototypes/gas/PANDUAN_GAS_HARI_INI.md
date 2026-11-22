# Panduan Cepat Setup Latihan SKD di Google Apps Script (GAS) Hari Ini

Berikut 3 langkah mudah (kurang dari 2 menit) untuk menyambungkan Google Sheet kamu ke Web App Latihan Ujian:

### Langkah 1: Isi Data Soal di Google Sheet
Buka link spreadsheet kamu:
`https://docs.google.com/spreadsheets/d/1MKMF_EjAqLSUU8gvHHPb6v4YqDNvBBxjFPPUaZdwO9M/edit?gid=0#gid=0`

Pastikan baris pertama (Header) berisi kolom berikut:
1. Kolom A: `ID`
2. Kolom B: `Kategori`
3. Kolom C: `Soal`
4. Kolom D: `Opsi A`
5. Kolom E: `Opsi B`
6. Kolom F: `Opsi C`
7. Kolom G: `Opsi D`
8. Kolom H: `Opsi E`
9. Kolom I: `Kunci` (A/B/C/D/E)
10. Kolom J: `Pembahasan`

*(Kamu bisa langsung copy-paste isi file `bank_soal_tiu.csv` yang sudah dibuat ke dalam sheet tersebut)*.

---

### Langkah 2: Buat Script di Apps Script
1. Di Google Sheet tersebut, klik menu **Extensions** > **Apps Script** (Ekstensi > Apps Script).
2. Di file `Code.gs`, hapus kode bawaan lalu **paste seluruh isi file `Code.gs`** yang ada di folder ini.
3. Klik tombol **`+`** di samping Files > Pilih **HTML** > Beri nama `Index` (akan otomatis jadi `Index.html`).
4. Hapus isinya, lalu **paste seluruh isi file `gas_Index.html`** yang ada di folder ini.
5. Klik ikon **Save** (Ctrl+S / Cmd+S).

---

### Langkah 3: Deploy Jadi Web App
1. Di pojok kanan atas Apps Script, klik tombol biru **Deploy** > **New deployment** (Terapkan > Penerapan baru).
2. Klik ikon gerigi (Select type) > Pilih **Web app**.
3. Isi konfigurasi:
   * **Description**: `Simulasi SKD v1`
   * **Execute as**: `Me (email kamu)`
   * **Who has access**: `Anyone` (Penting: pilih *Anyone* agar istri bisa buka langsung tanpa login Google yang rumit).
4. Klik **Deploy**.
5. Berikan izin otorisasi (*Review Permissions* > Pilih Akun Google > *Advanced* > *Go to (unsafe)* > *Allow*).
6. **Copy URL Web App** yang muncul. Link ini bisa langsung dikirim via WhatsApp ke istri dan dibuka di HP/Laptop!

Setiap kali istri selesai kuis dan klik kumpulkan, skornya otomatis tercatat di tab sheet baru bernama **`Hasil_Ujian`**!
