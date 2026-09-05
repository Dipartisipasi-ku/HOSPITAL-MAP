const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const crudUpdates = `
        window.simpanPeta = async function() {
            const url = document.getElementById('admin-map-url').value;
            if(url) {
                await setDoc(doc(db, 'settings', 'general'), { map_url: url }, { merge: true });
                document.getElementById('admin-map-url').value = '';
                await window.fetchAllDataFirebase();
                alert("Peta berhasil disimpan!");
            }
        }
        window.hapusPeta = async function() {
            if(confirm("Hapus peta utama?")) {
                await setDoc(doc(db, 'settings', 'general'), { map_url: null }, { merge: true });
                await window.fetchAllDataFirebase();
            }
        }
        window.simpanAsal = async function() {
            const n = document.getElementById('admin-asal-nama').value;
            if (n) {
                await setDoc(doc(db, 'locations_origin', n), { nama_lokasi: n });
                document.getElementById('admin-asal-nama').value = '';
                await window.fetchAllDataFirebase();
            }
        }
        window.hapusAsal = async function(n) { if(confirm(\`Hapus \${n}?\`)) { await deleteDoc(doc(db, 'locations_origin', n)); await window.fetchAllDataFirebase(); } }
        window.simpanTujuan = async function() {
            const n = document.getElementById('admin-tujuan-nama').value;
            const a = document.getElementById('admin-tujuan-akses').value;
            const i = document.getElementById('admin-tujuan-instruksi').value;
            const g = document.getElementById('admin-tujuan-gambar').value;
            const no = document.getElementById('admin-tujuan-nomor').value;
            if (n) {
                const payload = { akses: a, instruksi: i, gambar_tanda: g, nomor: no };
                await setDoc(doc(db, 'locations_target', n), payload);
                document.getElementById('admin-tujuan-nama').value = ''; document.getElementById('admin-tujuan-instruksi').value = ''; document.getElementById('admin-tujuan-gambar').value = ''; document.getElementById('admin-tujuan-nomor').value = '';
                await window.fetchAllDataFirebase();
            }
        }
        window.hapusTujuan = async function(n) { if(confirm('Hapus rute?')) { await deleteDoc(doc(db, 'locations_target', n)); await window.fetchAllDataFirebase(); } }
        window.simpanHotspot = async function() {
            const num = document.getElementById('admin-hotspot-nomor').value;
            const nama = document.getElementById('admin-hotspot-nama').value;
            const t = document.getElementById('admin-hotspot-target').value;
            const x = parseFloat(document.getElementById('admin-hotspot-x').value);
            const y = parseFloat(document.getElementById('admin-hotspot-y').value);
            if (nama && !isNaN(x) && !isNaN(y)) {
                const payload = { nomor: num, nama_bangunan: nama, target_lokasi: t, x_pos: x, y_pos: y };
                if (editHotspotId) await updateDoc(doc(db, 'map_hotspots', editHotspotId.toString()), payload);
                else await addDoc(collection(db, 'map_hotspots'), payload);
                editHotspotId = null; document.getElementById('admin-hotspot-nama').value = ''; document.getElementById('admin-hotspot-target').value = ''; document.getElementById('admin-hotspot-nomor').value = '';
                await window.fetchAllDataFirebase();
            }
        }
        window.hapusHotspot = async function(id) { if(confirm("Hapus hotspot?")) { await deleteDoc(doc(db, 'map_hotspots', id.toString())); await window.fetchAllDataFirebase(); } }
        window.simpanMatrix = async function() {
            const asal = document.getElementById('admin-matrix-asal').value;
            const tujuan = document.getElementById('admin-matrix-tujuan').value;
            const path = document.getElementById('admin-matrix-path').value;
            if (asal && tujuan && path) {
                const payload = { asal: asal, tujuan: tujuan, path_d: path };
                if(editMatrixId) await updateDoc(doc(db, 'route_matrix', editMatrixId.toString()), payload);
                else await addDoc(collection(db, 'route_matrix'), payload);
                editMatrixId = null; document.getElementById('admin-matrix-path').value = '';
                await window.fetchAllDataFirebase();
            }
        }
        window.hapusMatrix = async function(id) { if(confirm("Hapus relasi rute?")) { await deleteDoc(doc(db, 'route_matrix', id.toString())); await window.fetchAllDataFirebase(); } }
        window.simpanTTS = async function() {
            const v = document.getElementById('tts-volume').value;
            const r = document.getElementById('tts-rate').value;
            await setDoc(doc(db, 'settings', 'general'), { tts_volume: v, tts_rate: r }, { merge: true });
            await window.fetchAllDataFirebase(); alert("Setting Suara Disimpan!");
        }
        window.simpanPIN = async function() {
            const p = document.getElementById('admin-pin-baru').value;
            if(p.length >= 4) {
                await setDoc(doc(db, 'settings', 'general'), { pin: p }, { merge: true });
                document.getElementById('admin-pin-baru').value = '';
                await window.fetchAllDataFirebase(); alert("PIN Berhasil Diubah!");
            }
        }
`;

html = html.replace(/window\.simpanPeta = async function\(\) \{[\s\S]*?window\.simpanPIN = async function\(\) \{[\s\S]*?alert\("PIN Berhasil Diubah!"\);\s*\}\s*\}/, crudUpdates);

// Patch survey kepuasan 
const surveyCode = `
        window.kirimSurvey = async function() {
            const ratingEl = document.querySelector('input[name="rating"]:checked');
            const informatif = document.getElementById('chk-informatif').checked;
            const kemudahan = document.getElementById('chk-kemudahan').checked;
            const pelayanan = document.getElementById('chk-pelayanan').checked;
            const ulasan = document.getElementById('ulasan-teks').value;
            
            const payload = {
                rating: ratingEl ? parseInt(ratingEl.value) : null,
                informatif: informatif,
                kemudahan: kemudahan,
                pelayanan: pelayanan,
                ulasan_teks: ulasan,
                created_at: new Date().toISOString()
            };
            
            await addDoc(collection(db, 'satisfaction_surveys'), payload);
            
            window.tutupModal('survey-popup');
            window.bicara("Terima kasih atas ulasan yang Anda berikan."); 
`;
html = html.replace(/window\.kirimSurvey = async function\(\) \{[\s\S]*?window\.bicara\("Terima kasih atas ulasan yang Anda berikan\."\);/, surveyCode);

fs.writeFileSync('index.html', html);
