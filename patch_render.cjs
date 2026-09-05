const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/renderHotspotsToMap\(\); renderAllAdminLists\(\);/g, 
"renderHotspotsToMap(); renderAllAdminLists(); if(typeof window.inisialisasiDaftarTujuan === 'function') window.inisialisasiDaftarTujuan(); if(typeof window.renderTombolTujuan === 'function') window.renderTombolTujuan(); if(typeof window.kembaliPilihAsal === 'function') window.kembaliPilihAsal();");

fs.writeFileSync('index.html', html);
console.log("Patched render functions.");
