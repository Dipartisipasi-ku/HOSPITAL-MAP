const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(
    /window\.bukaModalLogin = function\(\) \{ document\.getElementById\('login-modal'\)\.style\.display = 'flex'; \}/,
    `window.bukaModalLogin = function() { 
        document.getElementById('login-pin').value = '';
        document.getElementById('login-modal').style.display = 'flex'; 
    }`
);

fs.writeFileSync('index.html', html);
