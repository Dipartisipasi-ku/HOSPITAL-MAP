const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/import supabase from '\.\/supabase_config\.js';/, '');
fs.writeFileSync('index.html', html);
