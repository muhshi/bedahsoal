// ========================================================
// FILE 1: Code.gs (Google Apps Script)
// Pasang di Extensions > Apps Script pada Google Sheet kamu
// ========================================================

function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Simulasi CBT SKD CPNS')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
}

// Mengambil soal dari Sheet aktif (Baris 1 = Header)
function getQuestions() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  if (data.length <= 1) {
    return [];
  }

  var questions = [];
  // Baris 0 = Header
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0] && !row[2]) continue; // Lewati baris kosong
    
    questions.push({
      id: row[0] || i,
      category: row[1] || 'Umum',
      text: row[2] ? row[2].toString() : '',
      options: [
        { key: 'A', text: row[3] ? row[3].toString() : '' },
        { key: 'B', text: row[4] ? row[4].toString() : '' },
        { key: 'C', text: row[5] ? row[5].toString() : '' },
        { key: 'D', text: row[6] ? row[6].toString() : '' },
        { key: 'E', text: row[7] ? row[7].toString() : '' }
      ],
      answer: row[8] ? row[8].toString().trim().toUpperCase() : '',
      explanation: row[9] ? row[9].toString() : ''
    });
  }
  return questions;
}

// Menyimpan rekapan hasil ujian ke sheet "Hasil_Ujian"
function saveResult(resultData) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Hasil_Ujian');
    if (!sheet) {
      sheet = ss.insertSheet('Hasil_Ujian');
      sheet.appendRow(['Timestamp', 'Nama Peserta', 'Skor Akhir', 'Benar', 'Salah', 'Kosong', 'Durasi']);
      sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#f1f5f9');
    }
    
    sheet.appendRow([
      new Date(),
      resultData.name || 'Istri Tercinta',
      resultData.score,
      resultData.correct,
      resultData.wrong,
      resultData.empty,
      resultData.duration || '-'
    ]);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
