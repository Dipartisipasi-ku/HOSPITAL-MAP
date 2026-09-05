const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/<div id="auth-panel".*?>/g, '<div id="auth-panel" style="display: none !important;">');

fs.writeFileSync('index.html', html);
