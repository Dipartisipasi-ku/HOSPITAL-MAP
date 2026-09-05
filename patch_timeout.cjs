const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const replacement = `
        window.fetchAllDataSupabase = async function() {
            try {
                document.getElementById('sync-indicator').style.display = 'block';
                
                // Tambahkan timeout hint
                let timeoutHint = setTimeout(() => {
                    const textEl = document.getElementById('loading-text');
                    if (textEl && textEl.style.display !== 'none') {
                        textEl.innerText = "⏳ Sedang membangunkan database... (Harap tunggu, bisa memakan waktu hingga 30 detik)";
                    }
                }, 4000);

                const { data: set } = await supabase.from('app_settings').select('*').eq('id', 1).single();
`;

html = html.replace(/window\.fetchAllDataSupabase = async function\(\) \{\s*try \{\s*document\.getElementById\('sync-indicator'\)\.style\.display = 'block';/, replacement);

fs.writeFileSync('index.html', html);
