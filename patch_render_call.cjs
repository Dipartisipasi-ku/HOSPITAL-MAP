const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/renderMatrixAdminList\(\);/g, "if(window.renderMatrixAdminList) window.renderMatrixAdminList();");

fs.writeFileSync('index.html', html);
console.log("Patched renderMatrixAdminList call.");
