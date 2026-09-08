// =========================================================================
// MODUL ISYARAT KATA (SIBI & BISINDO) - RSJD ATMA HUSADA MAHAKAM
// Fitur Opsional (Default: Non-aktif / Collapsed), Visual Selalu Tampil Saat Aktif
// =========================================================================

(function() {
    // 1. Dapatkan URL gambar isyarat SIBI yang sudah di-crop per huruf (A - Z)
    window.dapatkanGambarSibiHuruf = function(letter) {
        if (!letter) return '';
        const lt = String(letter).toUpperCase().trim();
        if (window.SIBI_ALPHABET_IMAGES && window.SIBI_ALPHABET_IMAGES[lt]) {
            return window.SIBI_ALPHABET_IMAGES[lt];
        }
        return `/assets/sibi/${lt}.png`;
    };

    // 3. Deskripsi ejaan jari SIBI (A-Z)
    const SIBI_DESC = {
        A: { desc: "Kepalan tangan menghadap depan, ibu jari tegak di samping", tips: "Genggam kuat, jempol di samping jari" },
        B: { desc: "Telapak terbuka lurus ke atas, empat jari rapat, jempol menekuk", tips: "Tangan tegak datar seperti papan" },
        C: { desc: "Semua jari melengkung terbuka membentuk huruf C", tips: "Seperti memegang cangkir kecil" },
        D: { desc: "Telunjuk tegak ke atas, jari lain melingkar menyentuh jempol", tips: "Telunjuk lurus menunjuk langit" },
        E: { desc: "Semua jari menekuk rapat ke telapak, kuku terlihat", tips: "Cakar ringan, jempol di bawah jari" },
        F: { desc: "Ujung telunjuk dan jempol menyatu (O), tiga jari lain tegak", tips: "Membentuk lingkaran kecil di bawah" },
        G: { desc: "Kepalan menyamping, telunjuk dan jempol lurus horizontal", tips: "Seperti gestur pistol mengarah samping" },
        H: { desc: "Telunjuk dan jari tengah lurus rapat mengarah ke samping", tips: "Dua jari lurus sejajar ke samping" },
        I: { desc: "Hanya jari kelingking tegak ke atas, jari lain menggenggam", tips: "Angkat kelingking kecil ke atas" },
        J: { desc: "Huruf I digerakkan melengkung di udara membentuk kail J", tips: "Kelingking menggambar huruf J" },
        K: { desc: "Telunjuk & tengah tegak bentuk V, jempol terselip di antaranya", tips: "Huruf V dengan ibu jari di tengah" },
        L: { desc: "Jempol dan telunjuk tegak membentuk sudut siku L", tips: "Sudut tegak lurus L yang tegas" },
        M: { desc: "Ibu jari diselipkan di bawah tiga jari (telunjuk, tengah, manis)", tips: "Tiga jari bertumpu di atas jempol" },
        N: { desc: "Ibu jari diselipkan di bawah dua jari (telunjuk & tengah)", tips: "Dua jari bertumpu di atas jempol" },
        O: { desc: "Semua ujung jari bertemu ibu jari membentuk lingkaran O", tips: "Bentuk bulat sempurna seperti telur" },
        P: { desc: "Bentuk huruf K diarahkan menunduk ke bawah", tips: "Gestur K yang mengarah ke lantai" },
        Q: { desc: "Bentuk huruf G diarahkan menunduk ke bawah", tips: "Gestur G menunjuk ke bawah" },
        R: { desc: "Jari telunjuk dan jari tengah menyilang erat", tips: "Silangkan telunjuk dan jari tengah" },
        S: { desc: "Kepalan penuh, ibu jari melintang di depan jari-jari", tips: "Genggam erat dengan jempol di depan" },
        T: { desc: "Ibu jari muncul di antara sela jari telunjuk dan tengah", tips: "Jempol menjepit di antara dua jari" },
        U: { desc: "Jari telunjuk dan tengah lurus rapat tegak ke atas", tips: "Dua jari rapat lurus ke atas" },
        V: { desc: "Jari telunjuk dan tengah terbuka membentuk huruf V", tips: "Lambang perdamaian / Victory" },
        W: { desc: "Telunjuk, tengah, dan manis tegak membentuk huruf W", tips: "Tiga jari mekar ke atas" },
        X: { desc: "Telunjuk membengkok seperti kait pancing", tips: "Telunjuk menekuk melengkung" },
        Y: { desc: "Ibu jari dan kelingking lurus ke samping, lainnya genggam", tips: "Gestur telepon santai" },
        Z: { desc: "Jari telunjuk menggambar garis Z di udara", tips: "Tuliskan huruf Z dengan telunjuk" }
    };

    // 4. Kamus Kata BISINDO (Kosakata umum + Navigasi & Medis RSJD Atma Husada)
    const BISINDO_DICT = {
        // Salam & Etika
        "halo": { desc: "Telapak terbuka lambaikan dari dekat pelipis/dahi ke depan dengan senyuman ramah", hand: "1 Tangan", loc: "Dahi / Depan Wajah", emoji: "👋", anim: "wave" },
        "hai": { desc: "Lambaian tangan santai dari samping kepala ke arah lawan bicara", hand: "1 Tangan", loc: "Samping Kepala", emoji: "👋", anim: "wave" },
        "selamat": { desc: "Kedua tangan mengacungkan jempol ke depan dengan mantap dan penuh hormat", hand: "2 Tangan", loc: "Depan Dada", emoji: "🎉", anim: "nod" },
        "selamat datang": { desc: "Kedua telapak terbuka dari depan menyambut ke arah dada, lalu mengangguk hormat", hand: "2 Tangan", loc: "Depan ke Dada", emoji: "🤝", anim: "bow" },
        "terima kasih": { desc: "Ujung jari kanan menyentuh dagu, lalu digerakkan lurus ke depan bawah dengan sopan", hand: "1 Tangan", loc: "Dagu ke Depan", emoji: "🙏", anim: "bow" },
        "terimakasih": { desc: "Ujung jari menyentuh dagu, lalu digerakkan ke depan bawah", hand: "1 Tangan", loc: "Dagu", emoji: "🙏", anim: "bow" },
        "sama-sama": { desc: "Kedua telapak tangan saling membalas mengayun pelan ke depan", hand: "2 Tangan", loc: "Depan Dada", emoji: "😊", anim: "nod" },
        "tolong": { desc: "Kedua telapak tangan dirapatkan di depan dada, digerakkan sedikit ke depan memohon", hand: "2 Tangan", loc: "Depan Dada", emoji: "🤲", anim: "please" },
        "maaf": { desc: "Tangan mengepal mengusap dada melingkar perlahan menunjukkan rasa tulus dari hati", hand: "1 Tangan", loc: "Dada", emoji: "🙇", anim: "heart" },
        "permisi": { desc: "Tangan kanan memotong lembut di atas telapak kiri yang terbuka", hand: "2 Tangan", loc: "Depan Perut", emoji: "🚶", anim: "bow" },
        "silakan": { desc: "Telapak tangan terbuka menghadap atas mengayun lembut menunjukkan jalan", hand: "1 Tangan", loc: "Depan Samping", emoji: "👉", anim: "point" },

        // Tanya & Kata Ganti
        "saya": { desc: "Jari telunjuk menunjuk tepat ke bagian tengah dada sendiri", hand: "1 Tangan", loc: "Dada Sendiri", emoji: "🫵", anim: "point-self" },
        "aku": { desc: "Telunjuk menyentuh dada sendiri dengan ramah", hand: "1 Tangan", loc: "Dada", emoji: "🙋", anim: "point-self" },
        "kamu": { desc: "Jari telunjuk menunjuk lurus ke arah lawan bicara", hand: "1 Tangan", loc: "Depan Lawan Bicara", emoji: "👉", anim: "point-you" },
        "anda": { desc: "Telapak tangan terbuka menghadap atas mengarah sopan ke lawan bicara", hand: "1 Tangan", loc: "Depan", emoji: "🫱", anim: "point-you" },
        "nama": { desc: "Dua jari (telunjuk & tengah) mengetuk dahi atau dada dua kali", hand: "1 Tangan", loc: "Dahi / Dada", emoji: "🪪", anim: "tap" },
        "siapa": { desc: "Jari telunjuk diputar melingkar kecil di depan dagu dengan mimik bertanya", hand: "1 Tangan", loc: "Depan Dagu", emoji: "🤔", anim: "spin" },
        "apa": { desc: "Kedua telapak terbuka menghadap atas diayunkan ringan ke kiri dan kanan", hand: "2 Tangan", loc: "Depan Dada", emoji: "🤷", anim: "shrug" },
        "dimana": { desc: "Kedua telapak tangan terbuka diayunkan ke samping seolah mencari keberadaan tempat", hand: "2 Tangan", loc: "Depan Samping", emoji: "🗺️", anim: "search" },
        "kapan": { desc: "Jari telunjuk mengetuk pergelangan tangan kiri seperti menunjuk jam tangan", hand: "2 Tangan", loc: "Pergelangan Tangan", emoji: "⌚", anim: "tap" },
        "bagaimana": { desc: "Kedua tangan memutar pergelangan dari tertutup membuka ke atas", hand: "2 Tangan", loc: "Depan", emoji: "❓", anim: "spin" },
        "ya": { desc: "Kepalan tangan mengangguk ke bawah satu atau dua kali", hand: "1 Tangan", loc: "Depan Wajah", emoji: "👍", anim: "nod" },
        "tidak": { desc: "Jari telunjuk digoyangkan ke kiri dan ke kanan disertai gelengan kepala", hand: "1 Tangan", loc: "Depan Wajah", emoji: "👎", anim: "shake" },

        // Navigasi, Arah, & Rumah Sakit
        "rumah sakit": { desc: "Ujung jari membentuk salib di dahi / lengan atas (isyarat medis pertolongan)", hand: "1 Tangan", loc: "Lengan / Dahi", emoji: "🏥", anim: "cross" },
        "rs": { desc: "Huruf R dan S lalu gestur silang medis rumah sakit", hand: "1 Tangan", loc: "Depan Dada", emoji: "🏥", anim: "cross" },
        "gedung": { desc: "Kedua telapak tangan tegak di samping lalu naik bertingkat ke atas", hand: "2 Tangan", loc: "Depan Dada ke Atas", emoji: "🏢", anim: "up" },
        "ruang": { desc: "Kedua tangan membentuk garis dinding kotak empat persegi di depan dada", hand: "2 Tangan", loc: "Depan Dada", emoji: "🚪", anim: "box" },
        "ruangan": { desc: "Kedua tangan membentuk batas ruangan empat persegi", hand: "2 Tangan", loc: "Depan Dada", emoji: "🚪", anim: "box" },
        "rute": { desc: "Jari telunjuk meluncur lurus ke depan meliuk menunjukkan jalur perjalanan", hand: "1 Tangan", loc: "Depan Dada ke Arah", emoji: "🛣️", anim: "path" },
        "jalur": { desc: "Kedua tangan sejajar bergerak lurus ke depan membentuk lintasan jalan", hand: "2 Tangan", loc: "Depan Dada", emoji: "🛤️", anim: "path" },
        "jalan": { desc: "Kedua telapak tangan menghadap bawah melangkah bergantian ke depan", hand: "2 Tangan", loc: "Depan Bawah", emoji: "🚶", anim: "walk" },
        "pintu": { desc: "Kedua telapak tangan bersentuhan lalu satu telapak membuka seperti daun pintu", hand: "2 Tangan", loc: "Depan Wajah", emoji: "🚪", anim: "open" },
        "masuk": { desc: "Tangan kanan meluncur masuk ke bawah lengkungan tangan kiri", hand: "2 Tangan", loc: "Depan Dada", emoji: "➡️", anim: "in" },
        "keluar": { desc: "Tangan kanan meluncur keluar dari bawah tangan kiri mengarah bebas", hand: "2 Tangan", loc: "Depan Dada ke Luar", emoji: "⬅️", anim: "out" },
        "lurus": { desc: "Telapak tangan tegak lurus bergerak mantap membelah ke depan", hand: "1 Tangan", loc: "Depan Dada ke Depan", emoji: "⬆️", anim: "forward" },
        "belok": { desc: "Tangan meluncur lurus lalu berbelok 90 derajat ke samping", hand: "1 Tangan", loc: "Depan Samping", emoji: "↪️", anim: "turn" },
        "kiri": { desc: "Jari telunjuk menunjuk tegas ke arah sisi kiri badan", hand: "1 Tangan", loc: "Arah Kiri", emoji: "⬅️", anim: "left" },
        "kanan": { desc: "Jari telunjuk menunjuk tegas ke arah sisi kanan badan", hand: "1 Tangan", loc: "Arah Kanan", emoji: "➡️", anim: "right" },
        "depan": { desc: "Telapak tangan menghadap depan diayunkan lurus ke depan", hand: "1 Tangan", loc: "Depan Dada", emoji: "👆", anim: "forward" },
        "belakang": { desc: "Ibu jari atau telunjuk mengarah ke belakang bahu", hand: "1 Tangan", loc: "Belakang Bahu", emoji: "🔙", anim: "back" },
        "lantai": { desc: "Telapak tangan datar menghadap bawah, diangkat bertingkat ke atas", hand: "1 Tangan", loc: "Depan Dada Bertingkat", emoji: "🪜", anim: "level" },
        "tangga": { desc: "Dua jari (telunjuk & tengah) melangkah bertingkat naik seperti menaiki anak tangga", hand: "1 Tangan", loc: "Depan Naik", emoji: "🪜", anim: "stairs" },
        "sampai": { desc: "Tangan kanan mendarat mantap di atas telapak tangan kiri yang terbuka", hand: "2 Tangan", loc: "Depan Dada", emoji: "🎯", anim: "land" },
        "tujuan": { desc: "Jari telunjuk menembak ke depan tepat pada satu titik sasaran", hand: "1 Tangan", loc: "Depan", emoji: "🎯", anim: "target" },
        "lokasi": { desc: "Ujung jari telunjuk menunjuk ke bawah menancap di satu tempat", hand: "1 Tangan", loc: "Depan Bawah", emoji: "📍", anim: "pin" },
        "lorong": { desc: "Kedua telapak tangan saling berhadapan membentuk lorong sempit ke depan", hand: "2 Tangan", loc: "Depan Dada", emoji: "🏛️", anim: "hall" },
        "ikuti": { desc: "Tangan kanan berjalan di belakang tangan kiri yang menuntun jalan", hand: "2 Tangan", loc: "Depan Bergerak Maju", emoji: "🧭", anim: "follow" },
        "arah": { desc: "Telapak tangan datar bergerak menunjuk ke arah tujuan yang dimaksud", hand: "1 Tangan", loc: "Depan Mengarah", emoji: "🧭", anim: "point" },

        // Medis & Kedaruratan
        "dokter": { desc: "Tiga jari (ibu jari, telunjuk, tengah) mengetuk denyut nadi pergelangan tangan kiri", hand: "2 Tangan", loc: "Pergelangan Tangan", emoji: "👨‍⚕️", anim: "pulse" },
        "perawat": { desc: "Ibu jari dan telunjuk membentuk garis melintang di dahi (seperti topi suster/perawat)", hand: "1 Tangan", loc: "Dahi / Kepala", emoji: "👩‍⚕️", anim: "cap" },
        "obat": { desc: "Ujung jari telunjuk digilingkan di atas telapak tangan kiri seperti menghaluskan pil obat", hand: "2 Tangan", loc: "Telapak Tangan", emoji: "💊", anim: "grind" },
        "apotek": { desc: "Gestur obat lalu gestur ruangan/gedung tempat mengambil obat", hand: "2 Tangan", loc: "Telapak lalu Depan", emoji: "🏥", anim: "grind" },
        "pasien": { desc: "Tangan mengusap dada dengan sabar disertai mimik tenang", hand: "1 Tangan", loc: "Dada", emoji: "🧑‍🦽", anim: "patient" },
        "sakit": { desc: "Kedua telunjuk diputar saling berhadapan di depan area yang sakit", hand: "2 Tangan", loc: "Depan Tubuh", emoji: "🤕", anim: "hurt" },
        "darurat": { desc: "Tangan membentuk huruf D digetarkan cepat ke depan dengan mimik waspada", hand: "1 Tangan", loc: "Depan Wajah Bergetar", emoji: "🚨", anim: "urgent" },
        "evakuasi": { desc: "Kedua telapak tangan mengarahkan orang-orang bergerak cepat menuju pintu keluar", hand: "2 Tangan", loc: "Depan ke Luar", emoji: "🏃‍♂️", anim: "evacuate" },
        "bahaya": { desc: "Tangan mengepal ditarik mundur cepat dengan mimik kaget dan waspada", hand: "1 Tangan", loc: "Depan Mundur Cepat", emoji: "⚠️", anim: "danger" },
        "aman": { desc: "Kedua tangan menyilang di dada lalu terbuka lebar ke samping dengan tenang", hand: "2 Tangan", loc: "Dada ke Samping", emoji: "🛡️", anim: "safe" },
        "titik kumpul": { desc: "Kedua tangan melingkar dari luar mengumpulkan ke satu titik tengah", hand: "2 Tangan", loc: "Depan Dada ke Titik", emoji: "🟢", anim: "gather" },

        // Geografi & Instansi
        "samarinda": { desc: "Huruf S di dada lalu tangan mengalir meliuk seperti Sungai Mahakam", hand: "2 Tangan", loc: "Dada ke Depan", emoji: "🌊", anim: "river" },
        "mahakam": { desc: "Kedua tangan mengalir tenang bergelombang menggambarkan Sungai Mahakam", hand: "2 Tangan", loc: "Depan Mengalir", emoji: "🌊", anim: "river" },
        "indonesia": { desc: "Huruf I di dada, lalu kedua tangan membuka lebar membentang nusantara", hand: "2 Tangan", loc: "Dada ke Samping", emoji: "🇮🇩", anim: "wide" }
    };

    // Baca preferensi tersimpan di localStorage (DEFAULT: FALSE / NON-AKTIF COLLAPSED)
    let savedAktif = false;
    try {
        savedAktif = localStorage.getItem('mode_isyarat_aktif') === 'true';
    } catch(e) {
        savedAktif = false;
    }

    // State Sistem Isyarat
    window.IsyaratState = {
        aktif: savedAktif,    // DEFAULT: false (Opsional & Collapsed)
        mode: "BISINDO",      // "BISINDO" (isyarat kata) atau "SIBI" (ejaan jari)
        kataList: [],         // Daftar kata dari kalimat yang sedang dibaca
        kataIndex: 0,         // Index kata aktif
        hurufIndex: 0,        // Index huruf aktif (untuk mode SIBI)
        sedangBicara: false,  // Status audio TTS
        speechText: "",       // Teks kalimat asli
        timerWord: null,      // Fallback timer kata
        timerLetter: null     // Fallback timer huruf
    };

    // Helper: Cari kecocokan kata / frasa BISINDO
    window.dapatkanIsyaratBisindo = function(kata, kataBerikutnya) {
        if (!kata) return null;
        let k1 = kata.toLowerCase().replace(/[^a-z0-9\-]/g, '');
        // Coba frasa 2 kata (contoh: "terima kasih", "titik kumpul", "rumah sakit")
        if (kataBerikutnya) {
            let k2 = kataBerikutnya.toLowerCase().replace(/[^a-z0-9\-]/g, '');
            let frasa = `${k1} ${k2}`;
            if (BISINDO_DICT[frasa]) return { data: BISINDO_DICT[frasa], isFrasa: true, text: frasa };
        }
        if (BISINDO_DICT[k1]) return { data: BISINDO_DICT[k1], isFrasa: false, text: k1 };
        return null;
    };

    // Memastikan kataList selalu memiliki konten teks (misal dari instruksi navigasi atau sambutan default)
    window.pastikanTeksIsyaratTersedia = function() {
        const state = window.IsyaratState;
        if (state.kataList && state.kataList.length > 0) return;

        let txt = "";
        const elNav = document.getElementById('teks-instruksi');
        if (elNav && elNav.innerText && elNav.innerText.trim()) {
            txt = elNav.innerText.trim();
        } else if (window.teksTerakhirDibaca && window.teksTerakhirDibaca.trim()) {
            txt = window.teksTerakhirDibaca.trim();
        } else if (window.lokasiTujuanTerakhir) {
            txt = `Panduan rute menuju ${window.lokasiTujuanTerakhir}. Silakan ikuti penunjuk arah di denah.`;
        } else {
            txt = "Selamat datang di Rumah Sakit Atma Husada Mahakam Samarinda. Silakan pilih lokasi tujuan Anda.";
        }

        window.siapkanTeksIsyarat(txt, false);
    };

    // Menyiapkan teks kalimat untuk diurai menjadi deretan kata
    window.siapkanTeksIsyarat = function(teks, autoRender = true) {
        if (!teks) return;
        const state = window.IsyaratState;
        state.speechText = teks;
        state.kataList = teks.trim().split(/\s+/).filter(Boolean);
        if (state.kataIndex >= state.kataList.length) state.kataIndex = 0;
        state.hurufIndex = 0;
        if (state.aktif && autoRender) {
            window.perbaruiVisualIsyarat();
        }
    };

    // Memilih kata tertentu secara langsung saat kata di klik di pita karaoke
    window.pilihKataIsyarat = function(index) {
        const state = window.IsyaratState;
        if (!state.kataList || state.kataList.length === 0) return;
        if (index < 0) index = 0;
        if (index >= state.kataList.length) index = state.kataList.length - 1;
        state.kataIndex = index;
        state.hurufIndex = 0;
        window.perbaruiVisualIsyarat();
    };

    // Memilih huruf tertentu secara langsung saat huruf di klik di mode SIBI
    window.pilihHurufIsyarat = function(letterIndex) {
        const state = window.IsyaratState;
        state.hurufIndex = letterIndex;
        window.perbaruiVisualIsyarat();
    };

    // Render Tampilan Isyarat di UI (Selalu memunculkan visual lengkap bila aktif)
    window.perbaruiVisualIsyarat = function() {
        const state = window.IsyaratState;
        if (!state.aktif) return; // Hanya render jika fitur aktif

        window.pastikanTeksIsyaratTersedia();

        const currentWord = state.kataList[state.kataIndex] || "halo";
        const nextWord = state.kataList[state.kataIndex + 1] || "";
        const letters = currentWord.replace(/[^A-Za-z]/g, '').toUpperCase().split('');
        const currentLetter = letters[state.hurufIndex] || (letters[0] || "A");

        // Cek BISINDO
        const bisindoMatch = window.dapatkanIsyaratBisindo(currentWord, nextWord);
        const useBisindo = (state.mode === "BISINDO" && bisindoMatch !== null);

        const cardData = {
            mode: state.mode,
            word: currentWord,
            letters: letters.length > 0 ? letters : ['A'],
            activeLetterIndex: state.hurufIndex,
            activeLetter: currentLetter,
            bisindo: bisindoMatch,
            useBisindo: useBisindo,
            wordList: state.kataList,
            activeWordIndex: state.kataIndex,
            sedangBicara: state.sedangBicara
        };

        // Render di Popup Navigasi
        const containerNav = document.getElementById('nav-isyarat-box');
        if (containerNav) {
            renderIsyaratCard(containerNav, cardData);
        }

        // Render di Floating Widget
        const containerFloat = document.getElementById('floating-isyarat-content');
        if (containerFloat) {
            renderIsyaratCard(containerFloat, cardData);
        }
    };

    // Helper render template kartu isyarat
    function renderIsyaratCard(targetEl, data) {
        if (!targetEl) return;

        // 1. Strip Karaoke Kata Interaktif (Bisa diklik untuk memilih kata)
        let karaokeHtml = `<div class="karaoke-strip" style="display:flex; gap:6px; overflow-x:auto; padding:6px 2px; margin-bottom:8px; scroll-behavior:smooth;">`;
        data.wordList.forEach((w, idx) => {
            const isActive = (idx === data.activeWordIndex);
            karaokeHtml += `
                <button type="button" class="karaoke-word ${isActive ? 'active' : ''}" onclick="window.pilihKataIsyarat(${idx})"
                        title="Klik untuk tampilkan isyarat kata ini"
                        style="font-size:12px; font-weight:700; padding:4px 10px; border-radius:20px; white-space:nowrap; border:none; cursor:pointer; transition:all 0.2s ease;
                               ${isActive ? 'background:#D4AF37; color:#111; transform:scale(1.08); font-weight:900; box-shadow:0 3px 10px rgba(212,175,55,0.4);' : 'background:rgba(255,255,255,0.08); color:#ccc;'}">
                    ${w}
                </button>
            `;
        });
        karaokeHtml += `</div>`;

        // 2. Bar Kontrol Navigasi Kata (Sebelumnya, Putar Suara, Selanjutnya)
        const navControlsHtml = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; gap:6px; background:rgba(0,0,0,0.25); padding:4px 8px; border-radius:8px;">
                <button type="button" onclick="window.pilihKataIsyarat(${data.activeWordIndex - 1})" 
                        ${data.activeWordIndex === 0 ? 'disabled style="opacity:0.35; cursor:not-allowed; border:none; background:transparent; color:#888; font-size:11px; padding:3px 6px;"' : 'style="cursor:pointer; border:1px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.08); color:#fff; font-size:11px; padding:3px 8px; border-radius:6px; font-weight:700;"'}>
                    ⏮️ Prev
                </button>
                <div style="font-size:11px; font-weight:700; color:#f1c40f; text-align:center;">
                    Kata ${data.activeWordIndex + 1} dari ${data.wordList.length}
                </div>
                <button type="button" onclick="window.pilihKataIsyarat(${data.activeWordIndex + 1})" 
                        ${data.activeWordIndex >= data.wordList.length - 1 ? 'disabled style="opacity:0.35; cursor:not-allowed; border:none; background:transparent; color:#888; font-size:11px; padding:3px 6px;"' : 'style="cursor:pointer; border:1px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.08); color:#fff; font-size:11px; padding:3px 8px; border-radius:6px; font-weight:700;"'}>
                    Next ⏭️
                </button>
            </div>
        `;

        // 3. Konten Visual (BISINDO atau SIBI) - Menggunakan Gambar Crop Huruf SIBI Asli & Jelas
        let visualHtml = '';
        if (data.mode === 'BISINDO' && data.useBisindo && data.bisindo) {
            const b = data.bisindo.data;
            const letter = data.activeLetter || (data.letters[0] || 'A');
            const imgUrl = window.dapatkanGambarSibiHuruf(letter);

            let letterPills = `<div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:6px;">`;
            data.letters.forEach((lt, idx) => {
                const isLtActive = (idx === data.activeLetterIndex);
                letterPills += `
                    <button type="button" onclick="window.pilihHurufIsyarat(${idx})" title="Huruf ${lt}"
                            style="font-size:11px; font-weight:800; width:24px; height:24px; display:inline-flex; align-items:center; justify-content:center; border-radius:6px; border:none; cursor:pointer; transition:transform 0.15s ease;
                                   ${isLtActive ? 'background:#e67e22; color:#fff; transform:scale(1.15); font-weight:900; box-shadow:0 2px 6px rgba(230,126,34,0.4);' : 'background:rgba(255,255,255,0.1); color:#ccc;'}">
                        ${lt}
                    </button>
                `;
            });
            letterPills += `</div>`;

            visualHtml = `
                <div style="background:#1b1b2f; border:1.5px solid #e67e22; border-radius:14px; padding:12px; position:relative; overflow:hidden; box-shadow:0 4px 14px rgba(0,0,0,0.35);">
                    <div style="display:flex; gap:12px; align-items:center;">
                        <div style="width:72px; height:72px; border-radius:14px; background:#2c2c54; border:1px solid rgba(255,255,255,0.15); display:grid; place-items:center; font-size:38px; flex-shrink:0;">
                            ${b.emoji}
                        </div>
                        <div style="flex:1; min-width:0;">
                            <div style="display:flex; align-items:center; gap:6px; margin-bottom:3px;">
                                <span style="font-size:9.5px; font-weight:800; text-transform:uppercase; background:#e67e22; color:#fff; padding:2px 7px; border-radius:10px;">BISINDO (Isyarat Kata)</span>
                                <span style="font-size:10px; font-weight:700; color:#aaa;">${b.hand} • ${b.loc}</span>
                            </div>
                            <div style="font-size:16.5px; font-weight:800; color:#fff; text-transform:capitalize; margin-bottom:4px;">
                                ${data.bisindo.text}
                            </div>
                            <div style="font-size:12px; line-height:1.4; color:#ddd;">
                                ${b.desc}
                            </div>
                        </div>
                    </div>
                    <!-- Ejaan Huruf Visual SIBI untuk Kata Ini -->
                    <div style="margin-top:10px; padding-top:9px; border-top:1px dashed rgba(255,255,255,0.18); display:flex; align-items:center; gap:12px;">
                        <div style="width:58px; height:58px; border-radius:10px; overflow:hidden; border:2px solid #e67e22; background:#ffffff; flex-shrink:0; position:relative; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,0,0,0.25);">
                            <img src="${imgUrl}" alt="Huruf ${letter}" style="width:100%; height:100%; object-fit:contain; padding:3px;" referrerPolicy="no-referrer" onerror="this.onerror=null; this.src='/assets/sibi/${letter}.png';" />
                            <div style="position:absolute; bottom:1px; left:1px; right:1px; font-size:7.5px; font-weight:900; text-align:center; background:rgba(0,0,0,0.85); color:#fff; border-radius:3px; padding:1px 0;">
                                ${letter}
                            </div>
                        </div>
                        <div style="flex:1; min-width:0;">
                            <div style="font-size:10.5px; color:#f1c40f; font-weight:700;">Ejaan Huruf Kata Ini (Klik huruf untuk melihat isyarat):</div>
                            ${letterPills}
                        </div>
                    </div>
                </div>
            `;
        } else if (data.mode === 'BISINDO') {
            // Mode BISINDO dipilih, tetapi kata spesifik ini belum ada di kamus BISINDO -> fallback visual ejaan SIBI
            const letter = data.activeLetter || (data.letters[0] || 'A');
            const imgUrl = window.dapatkanGambarSibiHuruf(letter);
            const descObj = SIBI_DESC[letter] || { desc: "Ejaan jari alfabet", tips: "Ikuti pose tangan" };

            let letterPills = `<div style="display:flex; flex-wrap:wrap; gap:5px; margin-top:7px;">`;
            data.letters.forEach((lt, idx) => {
                const isLtActive = (idx === data.activeLetterIndex);
                letterPills += `
                    <button type="button" onclick="window.pilihHurufIsyarat(${idx})" title="Huruf ${lt}"
                            style="font-size:11.5px; font-weight:800; width:26px; height:26px; display:inline-flex; align-items:center; justify-content:center; border-radius:6px; border:none; cursor:pointer; transition:transform 0.15s ease;
                                   ${isLtActive ? 'background:#d35400; color:#fff; transform:scale(1.15); font-weight:900; box-shadow:0 2px 6px rgba(211,84,0,0.4);' : 'background:rgba(255,255,255,0.1); color:#bbb;'}">
                        ${lt}
                    </button>
                `;
            });
            letterPills += `</div>`;

            visualHtml = `
                <div style="display:flex; gap:14px; align-items:center; background:#1b1b2f; border:1.5px solid #d35400; border-radius:14px; padding:12px; box-shadow:0 4px 14px rgba(0,0,0,0.35);">
                    <div style="width:84px; height:84px; border-radius:12px; overflow:hidden; border:2px solid #e67e22; background:#ffffff; position:relative; flex-shrink:0; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 10px rgba(0,0,0,0.3);">
                        <img src="${imgUrl}" alt="Huruf ${letter}" style="width:100%; height:100%; object-fit:contain; padding:4px;" referrerPolicy="no-referrer" onerror="this.onerror=null; this.src='/assets/sibi/${letter}.png';" />
                        <div style="position:absolute; bottom:2px; left:2px; right:2px; font-size:8.5px; font-weight:900; text-align:center; background:rgba(0,0,0,0.85); color:#fff; border-radius:4px; padding:1px 0;">
                            HURUF ${letter}
                        </div>
                    </div>
                    <div style="flex:1; min-width:0;">
                        <div style="display:flex; align-items:center; gap:6px; margin-bottom:2px;">
                            <span style="font-size:9px; font-weight:800; text-transform:uppercase; background:#d35400; color:#fff; padding:2px 7px; border-radius:10px;">Ejaan Kata SIBI</span>
                            <span style="font-size:11.5px; font-weight:700; color:#f1c40f;">"${data.word}"</span>
                        </div>
                        <div style="font-size:12px; line-height:1.35; color:#ddd; margin-top:2px;">
                            ${descObj.desc}
                        </div>
                        <div style="font-size:10.5px; color:#f39c12; margin-top:2px;">
                            💡 <i>${descObj.tips}</i>
                        </div>
                        ${letterPills}
                    </div>
                </div>
            `;
        } else {
            // Mode SIBI murni (Ejaan Alfabet A - Z)
            const letter = data.activeLetter || (data.letters[0] || 'A');
            const imgUrl = window.dapatkanGambarSibiHuruf(letter);
            const descObj = SIBI_DESC[letter] || { desc: "Ejaan jari SIBI", tips: "Ikuti pose tangan" };

            let letterPills = `<div style="display:flex; flex-wrap:wrap; gap:5px; margin-top:7px;">`;
            data.letters.forEach((lt, idx) => {
                const isLtActive = (idx === data.activeLetterIndex);
                letterPills += `
                    <button type="button" onclick="window.pilihHurufIsyarat(${idx})" title="Huruf ${lt}"
                            style="font-size:11.5px; font-weight:800; width:26px; height:26px; display:inline-flex; align-items:center; justify-content:center; border-radius:6px; border:none; cursor:pointer; transition:transform 0.15s ease;
                                   ${isLtActive ? 'background:#D4AF37; color:#111; transform:scale(1.18); font-weight:900; box-shadow:0 2px 8px rgba(212,175,55,0.45);' : 'background:rgba(255,255,255,0.12); color:#bbb;'}">
                        ${lt}
                    </button>
                `;
            });
            letterPills += `</div>`;

            visualHtml = `
                <div style="display:flex; gap:14px; align-items:center; background:#1b1b2f; border:1.5px solid #2980b9; border-radius:14px; padding:12px; box-shadow:0 4px 14px rgba(0,0,0,0.35);">
                    <div style="width:86px; height:86px; border-radius:12px; overflow:hidden; border:2px solid #D4AF37; background:#ffffff; position:relative; flex-shrink:0; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 10px rgba(0,0,0,0.3);">
                        <img src="${imgUrl}" alt="Huruf ${letter}" style="width:100%; height:100%; object-fit:contain; padding:4px;" referrerPolicy="no-referrer" onerror="this.onerror=null; this.src='/assets/sibi/${letter}.png';" />
                        <div style="position:absolute; bottom:2px; left:2px; right:2px; font-size:8.5px; font-weight:900; text-align:center; background:rgba(0,0,0,0.85); color:#D4AF37; border-radius:4px; padding:1px 0; letter-spacing:0.5px;">
                            HURUF ${letter}
                        </div>
                    </div>
                    <div style="flex:1; min-width:0;">
                        <div style="display:flex; align-items:center; gap:6px; margin-bottom:2px;">
                            <span style="font-size:9.5px; font-weight:800; text-transform:uppercase; background:#2980b9; color:#fff; padding:2px 7px; border-radius:10px;">SIBI (Ejaan Jari)</span>
                            <span style="font-size:12px; font-weight:700; color:#f1c40f;">Kata: "${data.word}"</span>
                        </div>
                        <div style="font-size:12.5px; line-height:1.4; color:#eee; margin-top:2px;">
                            ${descObj.desc}
                        </div>
                        <div style="font-size:11px; color:#e67e22; margin-top:2px;">
                            💡 <i>${descObj.tips}</i>
                        </div>
                        ${letterPills}
                    </div>
                </div>
            `;
        }

        // Gabungkan seluruh komponen kartu
        targetEl.innerHTML = `
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                <div style="display:flex; align-items:center; gap:6px;">
                    <span style="font-size:15px;">🤟</span>
                    <span style="font-size:12px; font-weight:800; letter-spacing:0.5px; color:#f1c40f;">ASISTEN BAHASA ISYARAT</span>
                    <span style="font-size:9.5px; background:rgba(46,204,113,0.2); color:#2ecc71; border:1px solid rgba(46,204,113,0.4); padding:1px 6px; border-radius:10px; font-weight:700;">Aktif</span>
                </div>
                <div style="display:flex; gap:4px;">
                    <button type="button" onclick="window.aturModeIsyarat('BISINDO')" 
                            style="font-size:10px; font-weight:800; padding:3px 8px; border-radius:12px; border:none; cursor:pointer; transition:background 0.2s;
                                   ${data.mode === 'BISINDO' ? 'background:#e67e22; color:#fff;' : 'background:rgba(255,255,255,0.1); color:#aaa;'}">
                        BISINDO
                    </button>
                    <button type="button" onclick="window.aturModeIsyarat('SIBI')" 
                            style="font-size:10px; font-weight:800; padding:3px 8px; border-radius:12px; border:none; cursor:pointer; transition:background 0.2s;
                                   ${data.mode === 'SIBI' ? 'background:#2980b9; color:#fff;' : 'background:rgba(255,255,255,0.1); color:#aaa;'}">
                        SIBI
                    </button>
                </div>
            </div>
            ${karaokeHtml}
            ${navControlsHtml}
            ${visualHtml}
        `;

        // Auto scroll karaoke kata aktif ke tengah jika ada
        const activeChip = targetEl.querySelector('.karaoke-word.active');
        if (activeChip && activeChip.parentElement) {
            const parent = activeChip.parentElement;
            const scrollLeft = activeChip.offsetLeft - parent.offsetWidth / 2 + activeChip.offsetWidth / 2;
            parent.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    }

    // Toggle Mode SIBI / BISINDO
    window.aturModeIsyarat = function(mode) {
        window.IsyaratState.mode = mode;
        window.perbaruiVisualIsyarat();
        if (window.tampilkanToast) {
            window.tampilkanToast(`🤟 Mode Isyarat: ${mode}`);
        }
    };

    // Update Status Tampilan UI Bahasa Isyarat (Tombol Toolbar & Panel Navigasi)
    window.perbaruiStatusUIIsyarat = function() {
        const state = window.IsyaratState;

        // 1. Label dan Container di Nav-Popup
        const navBox = document.getElementById('nav-isyarat-box');
        const labelStatus = document.getElementById('label-status-isyarat');
        const btnHeader = document.getElementById('btn-toggle-collapse-isyarat');

        if (labelStatus) {
            if (state.aktif) {
                labelStatus.innerText = 'Aktif ▲';
                labelStatus.style.background = '#16a085';
                labelStatus.style.color = '#fff';
            } else {
                labelStatus.innerText = 'Nonaktif ▼';
                labelStatus.style.background = 'rgba(255,255,255,0.1)';
                labelStatus.style.color = '#aaa';
            }
        }
        if (navBox) {
            navBox.style.display = state.aktif ? 'block' : 'none';
        }
        if (btnHeader) {
            btnHeader.style.background = state.aktif ? 'linear-gradient(135deg, #2b1f4d, #3c246e)' : 'linear-gradient(135deg, #1b1633, #251d45)';
        }

        // 2. Tombol Toolbar Cepat (#btn-toggle-isyarat)
        const btnToolbar = document.getElementById('btn-toggle-isyarat');
        if (btnToolbar) {
            if (state.aktif) {
                btnToolbar.style.background = '#4a00e0';
                btnToolbar.style.borderColor = '#2ecc71';
                btnToolbar.style.boxShadow = '0 0 10px rgba(46, 204, 113, 0.6)';
                btnToolbar.style.opacity = '1';
                btnToolbar.title = 'Bahasa Isyarat: AKTIF (Klik untuk buka/tutup panel)';
            } else {
                btnToolbar.style.background = '#2c2c3e';
                btnToolbar.style.borderColor = '#555';
                btnToolbar.style.boxShadow = 'none';
                btnToolbar.style.opacity = '0.75';
                btnToolbar.title = 'Bahasa Isyarat: NONAKTIF (Klik untuk aktifkan)';
            }
        }
    };

    // Toggle Aktivasi Fitur Bahasa Isyarat (Opsional: Aktif / Non-aktif Collapsed)
    window.toggleAktivasiIsyarat = function(forceVal) {
        const state = window.IsyaratState;
        if (typeof forceVal === 'boolean') {
            state.aktif = forceVal;
        } else {
            state.aktif = !state.aktif;
        }

        try {
            localStorage.setItem('mode_isyarat_aktif', state.aktif ? 'true' : 'false');
        } catch(e) {}

        window.perbaruiStatusUIIsyarat();

        if (state.aktif) {
            window.pastikanTeksIsyaratTersedia();
            window.perbaruiVisualIsyarat();
            if (window.tampilkanToast) window.tampilkanToast("🤟 Fitur Bahasa Isyarat Diaktifkan (Visual Selalu Tampil)");
        } else {
            window.hentikanSinkronisasiIsyarat();
            const floatEl = document.getElementById('widget-floating-isyarat');
            if (floatEl) floatEl.style.display = 'none';
            if (window.tampilkanToast) window.tampilkanToast("Fitur Bahasa Isyarat Dinonaktifkan");
        }
    };

    // Toggle Asisten Isyarat dari Toolbar (Buka Floating Widget atau Aktifkan)
    window.toggleAsistenIsyarat = function() {
        const state = window.IsyaratState;
        const floatEl = document.getElementById('widget-floating-isyarat');
        
        // Jika belum aktif, aktifkan fiturnya terlebih dahulu
        if (!state.aktif) {
            window.toggleAktivasiIsyarat(true);
            if (floatEl) floatEl.style.display = 'block';
            return;
        }

        // Jika sudah aktif, toggle buka/tutup floating widget
        if (floatEl) {
            const isHidden = (floatEl.style.display === 'none' || !floatEl.style.display);
            floatEl.style.display = isHidden ? 'block' : 'none';
            if (isHidden) {
                window.pastikanTeksIsyaratTersedia();
                window.perbaruiVisualIsyarat();
                if (window.tampilkanToast) window.tampilkanToast("🤟 Panel Asisten Bahasa Isyarat Dibuka");
            }
        }
    };

    // Sinkronisasi Pembacaan Suara TTS dengan Bahasa Isyarat
    window.mulaiSinkronisasiIsyarat = function(teks, speechRate = 1.0) {
        const state = window.IsyaratState;
        if (!state.aktif || !teks) return;

        // Hentikan timer sebelumnya jika ada
        if (state.timerWord) clearInterval(state.timerWord);
        if (state.timerLetter) clearInterval(state.timerLetter);

        // Tokenize kata
        state.speechText = teks;
        state.kataList = teks.trim().split(/\s+/).filter(Boolean);
        state.kataIndex = 0;
        state.hurufIndex = 0;
        state.sedangBicara = true;

        // Tampilkan visual kata pertama seketika
        window.perbaruiVisualIsyarat();

        if (state.kataList.length === 0) return;

        // Hitung durasi per kata adaptif
        const msPerWord = Math.max(280, Math.round(520 / (speechRate || 1.0)));

        // Timer sinkronisasi kata
        state.timerWord = setInterval(() => {
            if (state.kataIndex < state.kataList.length - 1) {
                state.kataIndex++;
                state.hurufIndex = 0;
                window.perbaruiVisualIsyarat();
            } else {
                clearInterval(state.timerWord);
                state.timerWord = null;
                state.sedangBicara = false;
                // Tetap biarkan visual tampil setelah bicara selesai!
                window.perbaruiVisualIsyarat();
            }
        }, msPerWord);

        // Timer ejaan huruf SIBI
        const msPerLetter = Math.max(160, Math.round(msPerWord / 3.5));
        state.timerLetter = setInterval(() => {
            const currentWord = state.kataList[state.kataIndex] || "";
            const letters = currentWord.replace(/[^A-Za-z]/g, '').toUpperCase().split('');
            if (letters.length > 0) {
                state.hurufIndex = (state.hurufIndex + 1) % letters.length;
                const bisindoMatch = window.dapatkanIsyaratBisindo(currentWord, state.kataList[state.kataIndex + 1]);
                if (state.mode === 'SIBI' || !bisindoMatch) {
                    window.perbaruiVisualIsyarat();
                }
            }
        }, msPerLetter);
    };

    // Hentikan sinkronisasi timer saat suara dibatalkan/berhenti
    window.hentikanSinkronisasiIsyarat = function() {
        const state = window.IsyaratState;
        if (state.timerWord) clearInterval(state.timerWord);
        if (state.timerLetter) clearInterval(state.timerLetter);
        state.timerWord = null;
        state.timerLetter = null;
        state.sedangBicara = false;
        // Tetap tampilkan visual stabil
        if (state.aktif) {
            window.perbaruiVisualIsyarat();
        }
    };

    // Inisialisasi status UI saat dokumen siap
    const pastikanFloatingTertutupDefault = () => {
        const floatEl = document.getElementById('widget-floating-isyarat');
        if (floatEl) floatEl.style.display = 'none';
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            pastikanFloatingTertutupDefault();
            window.perbaruiStatusUIIsyarat();
            if (window.IsyaratState.aktif) {
                window.pastikanTeksIsyaratTersedia();
                window.perbaruiVisualIsyarat();
            }
        });
    } else {
        setTimeout(() => {
            pastikanFloatingTertutupDefault();
            window.perbaruiStatusUIIsyarat();
            if (window.IsyaratState.aktif) {
                window.pastikanTeksIsyaratTersedia();
                window.perbaruiVisualIsyarat();
            }
        }, 100);
    }

    console.log("✅ Modul Asisten Bahasa Isyarat (SIBI & BISINDO) RSJD Atma Husada berhasil dimuat. Status:", savedAktif ? "AKTIF" : "NONAKTIF (COLLAPSED)", "| Floating: NONAKTIF");
})();
