const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const surveyCode = `
                // Ambil Data Survey Kepuasan
                try {
                    const { data: surveys } = await supabase.from('survey_kepuasan').select('rating');
                    if (surveys) {
                        let totalRating = 0; let totalUlasan = 0;
                        surveys.forEach(s => { if(s.rating) { totalRating += s.rating; totalUlasan++; } });
                        if (totalUlasan > 0) {
                            document.getElementById('landing-rating-val').innerText = (totalRating / totalUlasan).toFixed(1);
                            document.getElementById('landing-rating-count').innerText = totalUlasan;
                        }
                    }
                } catch(e) { console.warn("Gagal memuat survey:", e); }
                
                // Update Landing Status
`;

html = html.replace(/\/\/\s*Update Landing Status/, surveyCode);

fs.writeFileSync('index.html', html);
