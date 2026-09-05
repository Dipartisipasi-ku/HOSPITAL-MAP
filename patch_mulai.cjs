const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const codeToInsert = `
        window.mulaiAplikasi = function() {
            const nama = document.getElementById('front-nama').value.trim();
            if(!nama) {
                alert("Mohon masukkan nama Anda terlebih dahulu.");
                return;
            }
            window.namaPengunjung = nama;
            document.getElementById('start-overlay').style.display = 'none';
            if(window.bicara) {
                window.bicara("Selamat datang di RS Atma Husada Mahakam, " + nama + ". Silakan pilih lokasi tujuan Anda.");
            }
        };
`;

// Insert it right after `window.telahSampai = function()`
html = html.replace(/window\.telahSampai = function\(\) \{/g, codeToInsert + '\n        window.telahSampai = function() {');

fs.writeFileSync('index.html', html);
console.log("Patched mulaiAplikasi");
