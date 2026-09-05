const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const jsInject = `
        window.bicara = function(text, callback) {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                // Perbaiki ejaan singkatan RS
                let safeText = text.toLowerCase();
                safeText = safeText.replace(/i g d/g, "i ge de")
                                   .replace(/m c u/g, "em ce u")
                                   .replace(/igd/g, "i ge de")
                                   .replace(/mcu/g, "em ce u");
                const msg = new SpeechSynthesisUtterance(safeText);
                msg.lang = 'id-ID';
                msg.volume = settingTTS.volume;
                msg.rate = settingTTS.rate;
                if(callback) msg.onend = callback;
                window.speechSynthesis.speak(msg);
            }
        }
`;

html = html.replace(/window\.bicara = function\(text\) \{[\s\S]*?window\.speechSynthesis\.speak\(msg\);\n            \}\n        \}/, jsInject);

const btnInject = `
            <button type="button" class="btn-primary" style="background:#111; color:#D4AF37; border-color:#D4AF37; margin-top:5px; padding:10px; font-size:14px;" onclick="ulangSuaraRute()">🔊 Ulangi Suara Panduan</button>
            <button type="button" class="btn-primary" style="background:#181818; color:#bbb; border-color:#333; margin-top:5px; padding:10px; font-size:14px;" onclick="panduanBalikKeAsal()">🔙 Baca Panduan Kembali ke Titik Awal</button>
`;

html = html.replace('<button type="button" class="btn-primary" style="background:#111; color:#D4AF37; border-color:#D4AF37; margin-top:5px; padding:10px; font-size:14px;" onclick="ulangSuaraRute()">🔊 Ulangi Suara Panduan</button>', btnInject);

const balikInject = `
        window.panduanBalikKeAsal = function() {
            // Mencari rute balik dari lokasiTujuan (A) ke lokasiAsal (B)
            let matchMatrix = dataMatrixRute.find(m => m.lokasi_asal === lokasiTujuan && m.lokasi_tujuan === lokasiAsal);
            
            let instruksiBalik = "";
            if (matchMatrix && matchMatrix.instruksi) {
                instruksiBalik = matchMatrix.instruksi;
            } else {
                instruksiBalik = \`Panduan otomatis belum tersedia untuk rute kembali dari \${lokasiTujuan} menuju \${lokasiAsal}. Silakan ikuti jalur evakuasi atau ikuti petunjuk panah yang ada.\`;
            }
            
            window.bicara("Panduan kembali ke titik awal. " + instruksiBalik);
            document.getElementById('teks-instruksi').innerHTML = "<b>[Panduan Kembali]</b><br>" + instruksiBalik;
            lastNavSpeechText = "Panduan kembali ke titik awal. " + instruksiBalik;
        }
`;

html = html.replace('window.ulangSuaraRute = function() { window.bicara(lastNavSpeechText); }', 'window.ulangSuaraRute = function() { window.bicara(lastNavSpeechText); }\n' + balikInject);

fs.writeFileSync('index.html', html);
console.log("Patched TTS and Balik Ke Asal.");
