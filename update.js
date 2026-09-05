const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf-8');
content = content.replace(
    /function renderTombolTujuan\(\) \{[\s\S]*?\}\s*window\.filterTujuan = function\(\) \{/,
    `function renderTombolTujuan() {
            const listContainer = document.getElementById('list-tujuan-container'); 
            if(!listContainer) return;
            listContainer.innerHTML = '';
            
            let tujuanArr = [];
            for (let nama in dataRute) { tujuanArr.push({ nama: nama, data: dataRute[nama] }); }
            
            tujuanArr.sort((a, b) => {
                let numA = parseInt(a.data.nomor) || extractNumber(a.nama);
                let numB = parseInt(b.data.nomor) || extractNumber(b.nama);
                if (numA === numB) return a.nama.localeCompare(b.nama);
                return numA - numB;
            });

            tujuanArr.forEach(item => {
                const btn = document.createElement('button');
                btn.className = 'btn-pilihan tujuan-item';
                btn.onclick = () => window.pilihTujuan(item.nama);
                
                const nomor = item.data.nomor ? \`<span class="span-nomor">[\${item.data.nomor}]</span>\` : '';
                const roleClass = (item.data.akses.toLowerCase() === 'pengunjung') ? 'badge-pengunjung' : 'badge-non';
                
                btn.innerHTML = \`
                    <div>
                        \${nomor} <span class="nama-tujuan">\${item.nama}</span>
                    </div>
                    <div class="badge-akses \${roleClass}">\${item.data.akses}</div>
                \`;
                listContainer.appendChild(btn);
            });
        }

        window.filterTujuan = function() {`
);

fs.writeFileSync('index.html', content);
