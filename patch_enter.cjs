const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const targetStr = 'id="front-nama" placeholder="Masukkan nama..."';
const replacementStr = 'id="front-nama" placeholder="Masukkan nama..." onkeydown="if(event.key === \'Enter\') mulaiAplikasi()"';

html = html.replace(targetStr, replacementStr);

fs.writeFileSync('index.html', html);
console.log("Patched Enter key.");
