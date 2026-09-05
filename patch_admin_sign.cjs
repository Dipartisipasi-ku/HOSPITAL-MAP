const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/if \(window\.currentUserRole !== 'admin'\)/, "if (window.currentUserRole !== 'admin' && window.currentUserRole !== 'superadmin' && window.currentUserRole !== 'administrator')");

html = html.replace(/updatedBy: auth\.currentUser\.uid/, "updatedBy: window.currentUserName || 'Admin'");

fs.writeFileSync('index.html', html);
