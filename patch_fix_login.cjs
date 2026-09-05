const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const loginFunc = `
        window.prosesLogin = function() { 
            if (document.getElementById('login-pin').value === systemPIN) { 
                window.tutupModal('login-modal'); 
                document.getElementById('panel-cpanel').classList.add('open'); 
                
                const rolePanel = document.getElementById('login-role').value;
                window.currentUserRole = rolePanel;
                
                if(rolePanel === 'administrator') {
                    // Sembunyikan tab selain Data Tujuan (Tanda Lokasi)
                    if(document.getElementById('section-logo')) document.getElementById('section-logo').style.display = 'none';
                    if(document.getElementById('section-peta')) document.getElementById('section-peta').style.display = 'none';
                    if(document.getElementById('section-hotspot')) document.getElementById('section-hotspot').style.display = 'none';
                    if(document.getElementById('section-matrix')) document.getElementById('section-matrix').style.display = 'none';
                    if(document.getElementById('section-asal')) document.getElementById('section-asal').style.display = 'none';
                    if(document.getElementById('section-tts')) document.getElementById('section-tts').style.display = 'none';
                    if(document.getElementById('section-pin')) document.getElementById('section-pin').parentElement.style.display = 'none';
                    
                    // Sembunyikan tombol hapus
                    setTimeout(() => {
                        const deleteBtns = document.querySelectorAll('.action-btn[title="Hapus"]');
                        deleteBtns.forEach(btn => btn.style.display = 'none');
                    }, 500);
                } else {
                    // Tampilkan semua
                    if(document.getElementById('section-logo')) document.getElementById('section-logo').style.display = 'flex';
                    if(document.getElementById('section-peta')) document.getElementById('section-peta').style.display = 'flex';
                    if(document.getElementById('section-hotspot')) document.getElementById('section-hotspot').style.display = 'flex';
                    if(document.getElementById('section-matrix')) document.getElementById('section-matrix').style.display = 'flex';
                    if(document.getElementById('section-asal')) document.getElementById('section-asal').style.display = 'flex';
                    if(document.getElementById('section-tts')) document.getElementById('section-tts').style.display = 'flex';
                    if(document.getElementById('section-pin')) document.getElementById('section-pin').parentElement.style.display = 'flex';
                }

                document.getElementById('tts-volume').value = settingTTS.volume; 
                document.getElementById('val-vol').innerText = settingTTS.volume; 
                document.getElementById('tts-rate').value = settingTTS.rate; 
                document.getElementById('val-rate').innerText = settingTTS.rate; 
                renderAllAdminLists(); 
                
            } else { 
                alert("PIN Akses Salah!"); 
            } 
        }
        window.bukaModalQA = function() {
`;

html = html.replace(/window\.bukaModalQA = function\(\) \{/, loginFunc);

fs.writeFileSync('index.html', html);
