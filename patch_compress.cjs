const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const jsInject = `
        window.uploadPeta = async function() {
            const fileInput = document.getElementById('map-file');
            if(!fileInput.files || fileInput.files.length === 0) return alert("Pilih file peta terlebih dahulu!");
            
            const file = fileInput.files[0];
            const btn = document.querySelector('#upload-map-container .btn-save-admin');
            const oriText = btn.innerText;
            btn.innerText = "⏳ Memproses & Mengkompresi Peta...";
            btn.disabled = true;
            
            try {
                // Kompresi gambar via Canvas agar ukuran base64 aman untuk Firestore (<1MB)
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = new Image();
                    img.onload = async function() {
                        const canvas = document.createElement('canvas');
                        let width = img.width;
                        let height = img.height;
                        
                        // Maksimal dimensi peta 2048px (sangat cukup untuk kualitas layar)
                        const MAX_SIZE = 2048;
                        if (width > height && width > MAX_SIZE) {
                            height *= MAX_SIZE / width;
                            width = MAX_SIZE;
                        } else if (height > MAX_SIZE) {
                            width *= MAX_SIZE / height;
                            height = MAX_SIZE;
                        }
                        
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);
                        
                        // Gunakan WebP atau JPEG dengan kualitas 0.7 untuk kompresi maksimal
                        const base64String = canvas.toDataURL('image/webp', 0.7);
                        
                        try {
                            await setDoc(doc(db, 'settings', 'general'), { map_url: base64String }, { merge: true });
                            alert("Peta berhasil dikompresi dan diunggah!");
                            await window.fetchAllDataFirebase();
                        } catch(err) {
                            alert("Penyimpanan gagal: " + err.message + "\\n\\nSolusi: Gunakan file gambar yang ukurannya lebih kecil (dibawah 500KB).");
                        }
                        
                        btn.innerText = oriText;
                        btn.disabled = false;
                        fileInput.value = '';
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            } catch(e) {
                alert("Kesalahan proses: " + e.message);
                btn.innerText = oriText;
                btn.disabled = false;
            }
        }
`;

html = html.replace(/window\.uploadPeta = async function\(\) \{[\s\S]*?fileInput\.value = '';\n            \}\n        \}/, jsInject);

fs.writeFileSync('index.html', html);
console.log("Patched Map Upload for Compression.");
