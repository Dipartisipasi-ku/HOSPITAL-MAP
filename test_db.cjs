const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// just to make sure there are no blatant syntax errors
try {
    // we can parse the script tags using a basic regex and see if node can parse them
    const scripts = html.match(/<script.*?>([\s\S]*?)<\/script>/gi);
    console.log("Found " + (scripts ? scripts.length : 0) + " scripts.");
} catch(e) {}
