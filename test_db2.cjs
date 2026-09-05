const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

try {
    const scripts = html.match(/<script.*?>([\s\S]*?)<\/script>/gi);
    console.log("Found " + (scripts ? scripts.length : 0) + " scripts.");
} catch(e) {}
