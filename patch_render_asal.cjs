const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const replaceFn = `
        window.kembaliPilihAsal = function() {
            document.getElementById('view-tujuan').style.display = 'none';
            document.getElementById('view-asal').style.display = 'block';
            
            const selectAsal = document.getElementById('select-asal-dropdown');
            if (selectAsal) {
                selectAsal.innerHTML = '<option value="">-- Sentuh dan Pilih Titik Awal --</option>';
                dataLokasiAsal.forEach(nama => {
                    selectAsal.innerHTML += \`<option value="\${nama}">\${nama}</option>\`;
                });
            }
        }
`;

html = html.replace(/window\.kembaliPilihAsal = function\(\) \{[\s\S]*?document\.getElementById\('view-asal'\)\.style\.display = 'block';\n        \}/, replaceFn);

fs.writeFileSync('index.html', html);
console.log("Patched kembaliPilihAsal.");
