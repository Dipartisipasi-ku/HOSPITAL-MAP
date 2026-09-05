const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const newLandingContent = `
    <!-- LAYAR LANDING -->
    <div id="start-overlay">
        <div id="logo-container" style="margin-bottom: 10px;">
            <img id="landing-logo-img" src="" style="display: none; max-width: 120px; max-height: 120px; object-fit: contain; margin: 0 auto; filter: drop-shadow(0 4px 15px rgba(0,0,0,0.6));" alt="Logo">
            <h1 class="icon-landing" id="landing-logo-emoji">🏥</h1>
        </div>
        <h1 class="title-landing pulse-text">RS ATMA HUSADA MAHAKAM</h1>
        <h3 class="subtitle-landing">Sistem Navigasi & Denah Evakuasi Digital</h3>
        
        <div id="survey-stats" style="margin-bottom: 5px; font-size: 14px; color: #E0E0E0; text-shadow: 0 2px 4px rgba(0,0,0,0.8); background: rgba(0,0,0,0.5); padding: 8px 15px; border-radius: 20px; border: 1px solid #D4AF37;">
            ⭐ Kepuasan Pengunjung: <strong style="color:#FFD700;" id="landing-rating-val">-</strong>/5 (<span id="landing-rating-count">0</span> Ulasan)
        </div>
        
        <div id="front-form-container" style="display: none; background: #181818; padding: 20px; border-radius: 10px; margin-top: 15px; border: 1px solid #D4AF37; width: 85%; max-width: 320px; text-align: left;">
`;

html = html.replace(/<!-- LAYAR LANDING -->[\s\S]*?<div id="front-form-container" [^>]*>/, newLandingContent);

const footerString = `
        <p id="loading-text" class="badge-status" style="margin-top: 20px;">⏳ Menghubungkan ke Server Database...</p>
        <div style="position: absolute; bottom: 15px; font-size: 12px; color: #D4AF37; text-shadow: 0 2px 4px rgba(0,0,0,0.9); font-weight: bold; letter-spacing: 0.5px;">Didesain dan dikembangkan oleh: Riandy, S.Kep</div>
    </div>
`;
html = html.replace(/<p id="loading-text" class="badge-status">⏳ Menghubungkan ke Server Database...<\/p>\s*<\/div>/, footerString);

fs.writeFileSync('index.html', html);
