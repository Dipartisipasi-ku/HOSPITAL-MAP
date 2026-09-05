const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const js = `
        window.promptEditSign = function() {
            const locId = window.lokasiTujuanTerakhir;
            if(!locId) return;
            const url = prompt("Masukkan URL gambar baru untuk tanda ruangan ini (" + locId + "):", window.customSigns[locId] || "");
            if (url !== null && typeof window.adminSaveSign === 'function') {
                window.adminSaveSign(locId, url);
                // Update directly in UI
                document.getElementById('gambar-tanda').src = url;
                document.getElementById('gambar-tanda').style.display = 'block';
            }
        };
        
        // RBAC Rute
`;

html = html.replace(/<script>/, '<script>\n' + js);

fs.writeFileSync('index.html', html);
