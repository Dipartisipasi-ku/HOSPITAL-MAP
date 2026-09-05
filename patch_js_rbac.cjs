const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// Patch renderTombolTujuan to filter by role
html = html.replace(
    /for \(let nama in dataRute\) \{ tujuanArr.push\(\{ nama: nama, data: dataRute\[nama\] \}\); \}/,
    `for (let nama in dataRute) { 
                let routeAkses = dataRute[nama].akses ? dataRute[nama].akses.toLowerCase() : "pengunjung";
                // RBAC rule
                if (routeAkses === 'staff' && window.currentUserRole === 'pengunjung') {
                    continue; // hide staff routes from pengunjung
                }
                tujuanArr.push({ nama: nama, data: dataRute[nama] }); 
            }`
);

// Call renderTombolTujuan when auth state changes
html = html.replace(
    /if\(typeof window\.inisialisasiDaftarTujuan === 'function'\) \{/,
    `if(typeof window.renderTombolTujuan === 'function') {
                      window.renderTombolTujuan();
                  }
                  if(typeof window.inisialisasiDaftarTujuan === 'function') {`
);

fs.writeFileSync('index.html', html);
