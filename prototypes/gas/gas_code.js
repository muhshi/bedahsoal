// ==========================================
// Google Apps Script (GAS) - CBT SKD CPNS
// Pasang script ini di Extensions -> Apps Script
// ==========================================

function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Simulasi Latihan Soal SKD')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// Mengambil bank soal dari Sheet aktif
function getQuestionsFromSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  // Header baris 1: ID, Kategori, Soal, Opsi A, Opsi B, Opsi C, Opsi D, Opsi E, Kunci, Pembahasan
  var questions = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0]) continue;
    
    questions.push({
      id: row[0],
      category: row[1] || 'Umum',
      text: row[2],
      options: [
        { key: 'A', text: row[3] },
        { key: 'B', text: row[4] },
        { key: 'C', text: row[5] },
        { key: 'D', text: row[6] },
        { key: 'E', text: row[7] }
      ],
      answer: (row[8] || '').toString().trim().toUpperCase(),
      explanation: row[9] || ''
    });
  }
  return questions;
}

// Simpan hasil ujian ke sheet "Hasil_Ujian" (opsional)
function recordResult(participantName, score, correct, wrong, empty) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Hasil_Ujian');
  if (!sheet) {
    sheet = ss.insertSheet('Hasil_Ujian');
    sheet.appendRow(['Timestamp', 'Nama', 'Skor', 'Benar', 'Salah', 'Kosong']);
  }
  sheet.appendRow([new Date(), participantName, score, correct, wrong, empty]);
  return { status: 'success' };
}
