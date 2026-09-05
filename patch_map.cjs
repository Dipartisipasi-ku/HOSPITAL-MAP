const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const jsInject = `
        window.uploadPeta = async function() {
            const fileInput = document.getElementById('map-file');
            if(!fileInput.files || fileInput.files.length === 0) return alert("Pilih file peta terlebih dahulu!");
            
            const file = fileInput.files[0];
            const btn = document.querySelector('#upload-map-container .btn-save-admin');
            const oriText = btn.innerText;
            btn.innerText = "⏳ Memproses Peta...";
            btn.disabled = true;
            
            try {
                // Konversi file gambar ke Base64 agar bisa disimpan langsung di Firestore
                // (Mengatasi kendala aturan CORS / Rules Storage yang terkunci)
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = async function () {
                    const base64String = reader.result;
                    
                    try {
                        await setDoc(doc(db, 'settings', 'general'), { map_url: base64String }, { merge: true });
                        alert("Peta berhasil diunggah!");
                        await window.fetchAllDataFirebase();
                    } catch(e) {
                        alert("Gagal mengunggah peta: " + e.message);
                    }
                    
                    btn.innerText = oriText;
                    btn.disabled = false;
                    fileInput.value = '';
                };
                reader.onerror = function (error) {
                    alert("Gagal membaca file: " + error.message);
                    btn.innerText = oriText;
                    btn.disabled = false;
                };
            } catch(e) {
                alert("Kesalahan proses: " + e.message);
                btn.innerText = oriText;
                btn.disabled = false;
            }
        }
`;

html = html.replace(/window\.uploadPeta = async function\(\) \{[\s\S]*?fileInput\.value = '';\n        \}/, jsInject);

fs.writeFileSync('index.html', html);
console.log("Patched Map Upload to Base64.");
