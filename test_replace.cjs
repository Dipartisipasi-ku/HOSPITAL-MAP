const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');
console.log("Original length:", html.length);
