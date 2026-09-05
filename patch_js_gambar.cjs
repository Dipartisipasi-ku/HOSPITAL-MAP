const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(
    /gambarFinal = ruteDefault.gambarTanda \|\| "";\s*\}/,
    `gambarFinal = ruteDefault.gambarTanda || "";
            }

            // [RBAC] Apply custom sign if available
            if (window.customSigns && window.customSigns[tujuan]) {
                gambarFinal = window.customSigns[tujuan];
            }
            window.lokasiTujuanTerakhir = tujuan;`
);

// Add edit button and display logic
html = html.replace(
    /<img id="gambar-tanda" class="sign-image" src="" alt="Tanda Lokasi">/,
    `<img id="gambar-tanda" class="sign-image" src="" alt="Tanda Lokasi">
            <div id="admin-edit-sign-container" style="display: none; text-align: center; margin-bottom: 15px;">
                <button type="button" class="btn-primary" style="background:#D4AF37; color:#111; margin-bottom:5px;" onclick="promptEditSign()">✏️ Admin: Ubah Foto Tanda</button>
            </div>`
);

html = html.replace(
    /if \(gambarFinal\) \{/,
    `// RBAC Edit Button
            if (window.currentUserRole === 'admin') {
                document.getElementById('admin-edit-sign-container').style.display = 'block';
            } else {
                document.getElementById('admin-edit-sign-container').style.display = 'none';
            }
            if (gambarFinal) {`
);

fs.writeFileSync('index.html', html);
