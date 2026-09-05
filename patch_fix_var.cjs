const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(/const \{ data: set \} = await supabase\.from\('app_settings'\)\.select\('\*'\)\.eq\('id', 1\)\.single\(\);\s*const \{ data: set \} = await supabase\.from\('app_settings'\)\.select\('\*'\)\.eq\('id', 1\)\.single\(\);/, "const { data: set } = await supabase.from('app_settings').select('*').eq('id', 1).single();");

fs.writeFileSync('index.html', html);
