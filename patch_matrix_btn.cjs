const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/onclick="simpanMatrixSupabase\(\)"/g, 'onclick="simpanDataMatrix()"');
fs.writeFileSync('index.html', html);
console.log("Patched simpan matrix btn.");
