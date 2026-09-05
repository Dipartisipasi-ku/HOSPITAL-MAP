const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const oldKembali = `
            const selectAsal = document.getElementById('select-asal-dropdown');
            if (selectAsal) {
                selectAsal.innerHTML = '<option value="">-- Sentuh dan Pilih Titik Awal --</option>';
                dataLokasiAsal.forEach(nama => {
                    selectAsal.innerHTML += \`<option value="\${nama}">\${nama}</option>\`;
                });
            }
`;

const newKembali = `
            const selectAsal = document.getElementById('select-asal-dropdown');
            if (selectAsal) {
                selectAsal.innerHTML = '';
                let opt = document.createElement('option');
                opt.value = "";
                opt.innerText = "-- Sentuh dan Pilih Titik Awal --";
                selectAsal.appendChild(opt);
                
                // Hapus duplikat dari dataLokasiAsal
                let uniqueAsal = [...new Set(dataLokasiAsal)];
                uniqueAsal.forEach(nama => {
                    let o = document.createElement('option');
                    o.value = nama;
                    o.innerText = nama;
                    selectAsal.appendChild(o);
                });
            }
`;

html = html.replace(oldKembali, newKembali);
fs.writeFileSync('index.html', html);
console.log("Patched select box.");
