const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(
    /window\.pilihTujuan = function\(tujuan\) \{/,
    `window.toggleDropdownTujuan = function() {
            document.getElementById('list-tujuan-container').classList.toggle('show');
        }

        window.bukaDropdownTujuan = function() {
            document.getElementById('list-tujuan-container').classList.add('show');
        }

        window.tutupDropdownTujuan = function() {
            document.getElementById('list-tujuan-container').classList.remove('show');
        }

        window.pilihTujuan = function(tujuan) {
            window.tutupDropdownTujuan();
            document.getElementById('custom-tujuan-btn').innerHTML = tujuan + " <span style='float:right; font-size:10px; margin-top:2px;'>▼</span>";
`
);

fs.writeFileSync('index.html', html);
