const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(
    /window\.tutupCPanel = function\(\) \{ document\.getElementById\('panel-cpanel'\)\.classList\.remove\('open'\); \}/,
    `window.tutupCPanel = function() { 
        document.getElementById('panel-cpanel').classList.remove('open'); 
        window.currentUserRole = document.getElementById('front-akses') ? document.getElementById('front-akses').value : 'pengunjung';
    }`
);

fs.writeFileSync('index.html', html);
