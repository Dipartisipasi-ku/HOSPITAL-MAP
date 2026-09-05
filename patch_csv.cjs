const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const htmlInject = `
            <!-- Daftar Matriks Tersimpan -->
            <div style="display:flex; gap: 6px; margin-bottom: 10px;">
                <button class="btn-save-admin" style="flex:1; background: #2c3e50; border-color: #34495e; font-size:11px;" onclick="exportMatrixCSV()">📥 Ekspor CSV</button>
                <input type="file" id="csv-file-matrix" accept=".csv" style="display:none;" onchange="importMatrixCSV(event)">
                <button class="btn-save-admin" style="flex:1; background: #8B0000; border-color: #5c0000; font-size:11px;" onclick="document.getElementById('csv-file-matrix').click()">📤 Impor CSV</button>
            </div>
            <div class="data-list" id="list-matrix" style="max-height: 180px;"></div>
`;

html = html.replace('<div class="data-list" id="list-matrix" style="max-height: 180px;"></div>', htmlInject);

const jsInject = `
        window.exportMatrixCSV = function() {
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "id,lokasi_asal,lokasi_tujuan,instruksi,gambar_tanda\\n";
            dataMatrixRute.forEach(function(rowArray) {
                let id = rowArray.id || "";
                let asal = (rowArray.lokasi_asal || "").replace(/"/g, '""');
                let tujuan = (rowArray.lokasi_tujuan || "").replace(/"/g, '""');
                let instruksi = (rowArray.instruksi || "").replace(/"/g, '""');
                let tanda = (rowArray.gambar_tanda || "").replace(/"/g, '""');
                csvContent += \`"\${id}","\${asal}","\${tujuan}","\${instruksi}","\${tanda}"\\n\`;
            });
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "data_matrix_rute.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        window.importMatrixCSV = async function(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = async function(e) {
                const text = e.target.result;
                const rows = text.split("\\n");
                
                if (rows.length < 2) return alert("File CSV kosong atau tidak valid.");
                
                if(!confirm(\`Ditemukan \${rows.length - 1} baris data. Proses impor akan menambahkan / memperbarui data. Lanjutkan?\`)) {
                    document.getElementById('csv-file-matrix').value = "";
                    return;
                }
                
                document.getElementById('sync-indicator').style.display = 'block';
                
                let successCount = 0;
                for (let i = 1; i < rows.length; i++) {
                    const row = rows[i].trim();
                    if (!row) continue;
                    
                    let cols = [];
                    let inQuote = false;
                    let currentVal = '';
                    for (let j = 0; j < row.length; j++) {
                        let char = row[j];
                        if (char === '"' && row[j+1] === '"') {
                            currentVal += '"'; j++;
                        } else if (char === '"') {
                            inQuote = !inQuote;
                        } else if (char === ',' && !inQuote) {
                            cols.push(currentVal); currentVal = '';
                        } else {
                            currentVal += char;
                        }
                    }
                    cols.push(currentVal);
                    
                    if(cols.length >= 4) {
                        const id = cols[0];
                        const asal = cols[1];
                        const tujuan = cols[2];
                        const instruksi = cols[3];
                        const tanda = cols[4] || "";
                        
                        if(asal && tujuan) {
                            const payload = { lokasi_asal: asal, lokasi_tujuan: tujuan, instruksi: instruksi, gambar_tanda: tanda };
                            try {
                                if(id) {
                                    await setDoc(doc(db, 'route_matrix', id), payload, {merge: true});
                                } else {
                                    await addDoc(collection(db, 'route_matrix'), payload);
                                }
                                successCount++;
                            } catch(err) {
                                console.error(err);
                            }
                        }
                    }
                }
                document.getElementById('sync-indicator').style.display = 'none';
                document.getElementById('csv-file-matrix').value = "";
                alert(\`Impor selesai! Berhasil memproses \${successCount} data matriks.\`);
                if(typeof window.fetchAllDataFirebase === 'function') await window.fetchAllDataFirebase();
            };
            reader.readAsText(file);
        }
`;

html = html.replace('window.hapusMatrix = async function(id) { if(confirm("Hapus relasi rute?")) { await deleteDoc(doc(db, \'route_matrix\', id.toString())); await fetchAllDataSupabase(); } }', 'window.hapusMatrix = async function(id) { if(confirm("Hapus relasi rute?")) { await deleteDoc(doc(db, \'route_matrix\', id.toString())); await fetchAllDataSupabase(); } }\n' + jsInject);

fs.writeFileSync('index.html', html);
console.log("Patched CSV Export/Import.");
