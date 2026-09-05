const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(
    /function renderTombolTujuan\(\) \{/,
    'window.renderTombolTujuan = function() {'
);

fs.writeFileSync('index.html', html);
