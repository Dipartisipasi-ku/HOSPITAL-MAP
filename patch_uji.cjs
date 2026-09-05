const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const jsInject = `
        window.ujiMatrixRute = function() {
            const i = document.getElementById('matrix-instruksi').value.trim();
            if(!i) return alert("Instruksi arah rute masih kosong.");
            window.bicara("Tes panduan arah: " + i);
        }
`;

html = html.replace('window.simpanDataMatrix = async function() {', jsInject + '\n        window.simpanDataMatrix = async function() {');

fs.writeFileSync('index.html', html);
console.log("Patched ujiMatrixRute.");
