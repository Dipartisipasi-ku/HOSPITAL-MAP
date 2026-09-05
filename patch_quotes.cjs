const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/editFormMatrix\(\$\{d\.id\}\)/g, "editFormMatrix('${d.id}')");
html = html.replace(/hapusMatrix\(\$\{d\.id\}\)/g, "hapusMatrix('${d.id}')");

fs.writeFileSync('index.html', html);
console.log("Patched quotes.");
