const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const renderMatrixJS = `
        window.renderMatrixAdminList = function() {
            const list = document.getElementById('list-matrix'); if(!list) return; list.innerHTML = '';
            
            // Render select options for single/multi
            const selAsalSingle = document.getElementById('matrix-asal-single');
            const divAsalMulti = document.getElementById('matrix-asal-multi');
            const selTujuanSingle = document.getElementById('matrix-tujuan-single');
            const divTujuanMulti = document.getElementById('matrix-tujuan-multi');
            
            if(selAsalSingle) selAsalSingle.innerHTML = '<option value="">-- Pilih Titik Awal --</option>';
            if(divAsalMulti) divAsalMulti.innerHTML = '';
            dataLokasiAsal.forEach(nama => {
                if(selAsalSingle) selAsalSingle.innerHTML += \`<option value="\${nama}">\${nama}</option>\`;
                if(divAsalMulti) divAsalMulti.innerHTML += \`<label style="display:block; padding:4px; font-size:12px; border-bottom:1px solid #333;"><input type="checkbox" value="\${nama}" class="chk-asal-multi"> \${nama}</label>\`;
            });
            
            let tujuanKeys = Object.keys(dataRute).sort((a,b) => a.localeCompare(b));
            if(selTujuanSingle) selTujuanSingle.innerHTML = '<option value="">-- Pilih Lokasi Tujuan --</option>';
            if(divTujuanMulti) divTujuanMulti.innerHTML = '';
            tujuanKeys.forEach(nama => {
                if(selTujuanSingle) selTujuanSingle.innerHTML += \`<option value="\${nama}">\${nama}</option>\`;
                if(divTujuanMulti) divTujuanMulti.innerHTML += \`<label style="display:block; padding:4px; font-size:12px; border-bottom:1px solid #333;"><input type="checkbox" value="\${nama}" class="chk-tujuan-multi"> \${nama}</label>\`;
            });
            
            // Render list
            dataMatrixRute.forEach(d => {
                list.innerHTML += \`<div class="data-item"><div class="data-item-name">\${d.lokasi_asal} ➔ \${d.lokasi_tujuan}</div><div class="data-item-actions"><button class="action-btn" title="Edit" onclick="editFormMatrix('\${d.id}')">✏️</button><button class="action-btn" title="Hapus" onclick="hapusMatrix('\${d.id}')">🗑️</button></div></div>\`;
            });
        }
        
        window.gantiModeMatrix = function() {
            const mode = document.getElementById('matrix-mode').value;
            const singleAsal = document.getElementById('matrix-asal-single');
            const multiAsal = document.getElementById('matrix-asal-multi');
            const toolAsal = document.getElementById('asal-multi-tools');
            
            const singleTujuan = document.getElementById('matrix-tujuan-single');
            const multiTujuan = document.getElementById('matrix-tujuan-multi');
            const toolTujuan = document.getElementById('tujuan-multi-tools');
            
            if (mode === 'single') {
                singleAsal.style.display = 'block'; multiAsal.style.display = 'none'; toolAsal.style.display = 'none';
                singleTujuan.style.display = 'block'; multiTujuan.style.display = 'none'; toolTujuan.style.display = 'none';
            } else if (mode === 'one-to-many') {
                singleAsal.style.display = 'block'; multiAsal.style.display = 'none'; toolAsal.style.display = 'none';
                singleTujuan.style.display = 'none'; multiTujuan.style.display = 'block'; toolTujuan.style.display = 'flex';
            } else if (mode === 'many-to-one') {
                singleAsal.style.display = 'none'; multiAsal.style.display = 'block'; toolAsal.style.display = 'flex';
                singleTujuan.style.display = 'block'; multiTujuan.style.display = 'none'; toolTujuan.style.display = 'none';
            }
        }
        
        window.pilihSemuaMatrixAsal = function(isCheck) {
            document.querySelectorAll('.chk-asal-multi').forEach(cb => cb.checked = isCheck);
        }
        
        window.pilihSemuaMatrixTujuan = function(isCheck) {
            document.querySelectorAll('.chk-tujuan-multi').forEach(cb => cb.checked = isCheck);
        }
`;

const simpanMatrixJS = `
        window.resetFormMatrix = function() {
            editMatrixId = null;
            document.getElementById('label-mode-matrix').innerText = "Mode: [ Tambah Baru ]";
            document.getElementById('btn-save-matrix').innerText = "💾 Simpan ke Matriks";
            document.getElementById('matrix-mode').value = "single";
            document.getElementById('matrix-mode').disabled = false;
            window.gantiModeMatrix();
            document.getElementById('matrix-asal-single').value = "";
            document.getElementById('matrix-tujuan-single').value = "";
            window.pilihSemuaMatrixAsal(false);
            window.pilihSemuaMatrixTujuan(false);
            document.getElementById('matrix-instruksi').value = "";
            document.getElementById('matrix-tanda').value = "";
        }
        
        window.editFormMatrix = function(id) {
            editMatrixId = id;
            const d = dataMatrixRute.find(m => m.id == id);
            if(!d) return;
            document.getElementById('label-mode-matrix').innerText = "Mode: [ EDIT DATA ]";
            document.getElementById('btn-save-matrix').innerText = "💾 Update Data";
            document.getElementById('matrix-mode').value = "single";
            document.getElementById('matrix-mode').disabled = true; // Kunci mode saat edit
            window.gantiModeMatrix();
            document.getElementById('matrix-asal-single').value = d.lokasi_asal;
            document.getElementById('matrix-tujuan-single').value = d.lokasi_tujuan;
            document.getElementById('matrix-instruksi').value = d.instruksi;
            document.getElementById('matrix-tanda').value = d.gambar_tanda || "";
        }
        
        window.simpanDataMatrix = async function() {
            const mode = document.getElementById('matrix-mode').value;
            const i = document.getElementById('matrix-instruksi').value.trim();
            const g = document.getElementById('matrix-tanda').value.trim();
            
            if (!i) return alert("Instruksi arah rute tidak boleh kosong!");
            
            let payloads = [];
            
            if (mode === 'single') {
                const a = document.getElementById('matrix-asal-single').value;
                const t = document.getElementById('matrix-tujuan-single').value;
                if(!a || !t) return alert("Pilih Titik Awal dan Lokasi Tujuan!");
                payloads.push({ lokasi_asal: a, lokasi_tujuan: t, instruksi: i, gambar_tanda: g });
            } else if (mode === 'one-to-many') {
                const a = document.getElementById('matrix-asal-single').value;
                if(!a) return alert("Pilih 1 Titik Awal!");
                const chk = document.querySelectorAll('.chk-tujuan-multi:checked');
                if(chk.length === 0) return alert("Pilih minimal 1 Lokasi Tujuan!");
                chk.forEach(cb => payloads.push({ lokasi_asal: a, lokasi_tujuan: cb.value, instruksi: i, gambar_tanda: g }));
            } else if (mode === 'many-to-one') {
                const t = document.getElementById('matrix-tujuan-single').value;
                if(!t) return alert("Pilih 1 Lokasi Tujuan!");
                const chk = document.querySelectorAll('.chk-asal-multi:checked');
                if(chk.length === 0) return alert("Pilih minimal 1 Titik Awal!");
                chk.forEach(cb => payloads.push({ lokasi_asal: cb.value, lokasi_tujuan: t, instruksi: i, gambar_tanda: g }));
            }
            
            try {
                const btn = document.getElementById('btn-save-matrix');
                btn.innerText = "⏳ Menyimpan..."; btn.disabled = true;
                
                if (editMatrixId && payloads.length === 1) {
                    await updateDoc(doc(db, 'route_matrix', editMatrixId.toString()), payloads[0]);
                } else {
                    for (const p of payloads) {
                        // Cek apakah relasi sudah ada
                        const existing = dataMatrixRute.find(m => m.lokasi_asal === p.lokasi_asal && m.lokasi_tujuan === p.lokasi_tujuan);
                        if (existing) {
                            await updateDoc(doc(db, 'route_matrix', existing.id), p);
                        } else {
                            await addDoc(collection(db, 'route_matrix'), p);
                        }
                    }
                }
                
                alert(\`Berhasil menyimpan \${payloads.length} rute ke dalam matriks!\`);
                window.resetFormMatrix();
                await fetchAllDataSupabase();
                
                btn.innerText = "💾 Simpan ke Matriks"; btn.disabled = false;
            } catch (err) {
                alert("Gagal menyimpan: " + err.message);
                document.getElementById('btn-save-matrix').disabled = false;
            }
        }
`;

// Replace window.renderMatrixAdminList (which we didn't fully define before, just a stub)
html = html.replace(/window\.renderMatrixAdminList = function\(\) \{[\s\S]*?\}\n        \}/, renderMatrixJS);

// Replace resetFormMatrix, editFormMatrix, simpanDataMatrix
html = html.replace(/window\.resetFormMatrix = function\(\) \{[\s\S]*?window\.resetFormMatrix\(\); await fetchAllDataSupabase\(\);\n        \}/, simpanMatrixJS);

fs.writeFileSync('index.html', html);
console.log("Patched Matrix UI Logic.");
