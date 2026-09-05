const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const newSection = `
        <!-- Section Logo Aplikasi -->
        <div class="admin-section" id="section-logo" style="border-color: #D4AF37;">
            <h3 style="color: #D4AF37;">🖼️ Logo Aplikasi (URL)</h3>
            <div class="flex-row">
                <input type="text" id="admin-logo-url" placeholder="URL Gambar / https://...">
                <button class="btn-save-admin" style="flex: 0 0 auto; background: #D4AF37; color: #111;" onclick="simpanLogoFirebase()">💾 Simpan Logo</button>
            </div>
            <p style="font-size: 11px; color: #aaa; margin-top: 5px;">Kosongkan jika ingin kembali menggunakan Emoji 🏥 default.</p>
        </div>

        <!-- Section Peta Utama -->
`;

html = html.replace(/<!-- Section Peta Utama -->/, newSection);

// Ensure login hide logic hides/shows section-logo
html = html.replace(/if\(document\.getElementById\('section-peta'\)\) document\.getElementById\('section-peta'\)\.style\.display = 'none';/, "if(document.getElementById('section-logo')) document.getElementById('section-logo').style.display = 'none';\n                    if(document.getElementById('section-peta')) document.getElementById('section-peta').style.display = 'none';");
html = html.replace(/if\(document\.getElementById\('section-peta'\)\) document\.getElementById\('section-peta'\)\.style\.display = 'flex';/, "if(document.getElementById('section-logo')) document.getElementById('section-logo').style.display = 'flex';\n                    if(document.getElementById('section-peta')) document.getElementById('section-peta').style.display = 'flex';");

fs.writeFileSync('index.html', html);
