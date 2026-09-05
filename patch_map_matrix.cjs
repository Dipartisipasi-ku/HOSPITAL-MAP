const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// 1. Add Firebase Storage imports
const importFirestore = 'import { getFirestore, doc, getDoc, setDoc, collection, onSnapshot, query, getDocs, updateDoc, deleteDoc, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";';
const importStorage = 'import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";';

html = html.replace(importFirestore, importFirestore + '\n' + importStorage);

// 2. Initialize storage
const initDb = 'let app, auth, db, timeoutHint; let systemPIN = \'123456789012\';';
const initDbNew = 'let app, auth, db, storage, timeoutHint; let systemPIN = \'123456789012\';';
html = html.replace(initDb, initDbNew);

const appDbInit = 'db = getFirestore(app);';
const appDbInitNew = 'db = getFirestore(app);\n        storage = getStorage(app);';
html = html.replace(appDbInit, appDbInitNew);

// 3. Fix Matrix not rendering
const renderAllAdmin = 'listHotspot.innerHTML += `<div class="data-item"><div class="data-item-name">${hs.nomor ? `[${hs.nomor}] ` : \'\'}${hs.nama_bangunan}</div><div class="data-item-actions"><button class="action-btn" title="Edit" onclick="editFormHotspot(\'${hs.id}\')">✏️</button><button class="action-btn" title="Hapus" onclick="hapusHotspot(\'${hs.id}\')">🗑️</button></div></div>`;\n            });';
html = html.replace(renderAllAdmin, renderAllAdmin + '\n            if(typeof window.renderMatrixAdminList === "function") window.renderMatrixAdminList();');

// 4. Implement uploadPeta and hapusPeta
const fakeSimpan = 'window.simpanPetaUtama = async function() { alert("Fitur Peta Dinonaktifkan sementara."); }';
const realMapFuncs = `
        window.uploadPeta = async function() {
            const fileInput = document.getElementById('map-file');
            if(!fileInput.files || fileInput.files.length === 0) {
                alert("Pilih file gambar peta terlebih dahulu!");
                return;
            }
            const file = fileInput.files[0];
            const btn = document.querySelector('#upload-map-container .btn-save-admin');
            const oriText = btn.innerText;
            btn.innerText = "⏳ Mengunggah...";
            btn.disabled = true;

            try {
                const storageRef = ref(storage, 'maps/' + file.name);
                await uploadBytes(storageRef, file);
                const url = await getDownloadURL(storageRef);
                
                await setDoc(doc(db, 'settings', 'general'), { map_url: url }, { merge: true });
                alert("Peta berhasil diunggah!");
                await window.fetchAllDataFirebase();
            } catch(e) {
                alert("Gagal mengunggah peta: " + e.message);
            }
            
            btn.innerText = oriText;
            btn.disabled = false;
            fileInput.value = '';
        }
        
        window.hapusPeta = async function() {
            if(!confirm("Yakin ingin menghapus gambar peta saat ini?")) return;
            const btn = document.getElementById('btn-hapus-peta');
            const oriText = btn.innerText;
            btn.innerText = "⏳ Menghapus...";
            btn.disabled = true;
            
            try {
                await updateDoc(doc(db, 'settings', 'general'), { map_url: null });
                alert("Peta berhasil dihapus!");
                await window.fetchAllDataFirebase();
            } catch(e) {
                alert("Gagal menghapus peta: " + e.message);
            }
            
            btn.innerText = oriText;
            btn.disabled = false;
        }
`;
html = html.replace(fakeSimpan, realMapFuncs);

fs.writeFileSync('index.html', html);
console.log("Patched Map Storage & Matrix Renderer.");
