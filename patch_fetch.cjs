const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const fetchAllReplacement = `
        window.fetchAllDataFirebase = async function() {
            try {
                document.getElementById('sync-indicator').style.display = 'block';
                
                let timeoutHint = setTimeout(() => {
                    const textEl = document.getElementById('loading-text');
                    if (textEl && textEl.style.display !== 'none') {
                        textEl.innerText = "⏳ Sedang memuat database... (Memastikan koneksi)";
                    }
                }, 4000);

                // Settings
                const setDocSnap = await getDoc(doc(db, 'settings', 'general'));
                if (setDocSnap.exists()) { 
                    const set = setDocSnap.data();
                    if(set.pin) systemPIN = set.pin; 
                    if(set.tts_volume) settingTTS.volume = parseFloat(set.tts_volume); 
                    if(set.tts_rate) settingTTS.rate = parseFloat(set.tts_rate); 
                }

                const mapEl = document.getElementById('main-map-image');
                const warnEl = document.getElementById('no-map-warning');
                if (setDocSnap.exists() && setDocSnap.data().map_url) {
                    mapEl.src = setDocSnap.data().map_url; 
                    mapEl.style.display = 'block'; warnEl.style.display = 'none';
                    document.getElementById('upload-map-container').style.display = 'none';
                    document.getElementById('btn-hapus-peta').style.display = 'block';
                    document.getElementById('map-status').innerText = "Peta cloud aktif digunakan.";
                } else {
                    mapEl.style.display = 'none'; warnEl.style.display = 'block';
                    document.getElementById('upload-map-container').style.display = 'block';
                    document.getElementById('btn-hapus-peta').style.display = 'none';
                    document.getElementById('map-status').innerText = "Peta belum diunggah.";
                }

                // Ambil Asal
                const asalSnap = await getDocs(collection(db, 'locations_origin'));
                dataLokasiAsal = [];
                asalSnap.forEach(doc => dataLokasiAsal.push(doc.id));
                dataLokasiAsal.sort((a, b) => extractNumber(a) - extractNumber(b));

                // Ambil Tujuan
                const tujuanSnap = await getDocs(collection(db, 'locations_target'));
                dataRute = {};
                tujuanSnap.forEach(docSnap => {
                    const t = docSnap.data();
                    dataRute[docSnap.id] = { akses: t.akses, instruksi: t.instruksi, gambarTanda: t.gambar_tanda, nomor: t.nomor };
                });

                // Ambil Hotspots
                const hotspotsSnap = await getDocs(collection(db, 'map_hotspots'));
                dataHotspots = [];
                hotspotsSnap.forEach(docSnap => {
                    dataHotspots.push({ id: docSnap.id, ...docSnap.data() });
                });
                dataHotspots.sort((a,b) => {
                    let numA = parseInt(a.nomor) || extractNumber(a.nama_bangunan);
                    let numB = parseInt(b.nomor) || extractNumber(b.nama_bangunan);
                    if (numA === numB) return a.nama_bangunan.localeCompare(b.nama_bangunan);
                    return numA - numB;
                });

                // Ambil Matriks
                const matrixSnap = await getDocs(collection(db, 'route_matrix'));
                dataMatrixRute = [];
                matrixSnap.forEach(docSnap => {
                    dataMatrixRute.push({ id: docSnap.id, ...docSnap.data() });
                });

                // Ambil Survey
                const surveySnap = await getDocs(collection(db, 'satisfaction_surveys'));
                let totalRating = 0; let totalUlasan = 0;
                surveySnap.forEach(docSnap => {
                    const s = docSnap.data();
                    if(s.rating) { totalRating += s.rating; totalUlasan++; }
                });
                if (totalUlasan > 0) {
                    document.getElementById('landing-rating-val').innerText = (totalRating / totalUlasan).toFixed(1);
                    document.getElementById('landing-rating-count').innerText = totalUlasan;
                }

                clearTimeout(timeoutHint);
                document.getElementById('loading-text').style.display = 'none';
                document.getElementById('front-form-container').style.display = 'block';
                document.getElementById('start-overlay').style.pointerEvents = "auto";
                
                renderHotspotsToMap(); renderAllAdminLists();
                document.getElementById('sync-indicator').style.display = 'none';
            } catch (error) {
                console.error(error);
                document.getElementById('loading-text').innerText = "Gagal memuat database! Cek koneksi Anda.";
                document.getElementById('sync-indicator').style.display = 'none';
            }
        }
        window.fetchAllDataSupabase = window.fetchAllDataFirebase; // Alias for backward compatibility
`;

html = html.replace(/window\.fetchAllDataSupabase = async function\(\) \{[\s\S]*?window\.onload = fetchAllDataSupabase;/, fetchAllReplacement + "\n        window.onload = fetchAllDataFirebase;");

fs.writeFileSync('index.html', html);
