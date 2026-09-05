const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// Update custom-options-container to be in-flow
html = html.replace(
    /position: absolute; left: 0; right: 0; top: 100%;/,
    'position: relative; width: 100%;'
);

// Remove max-height from mobile sidebar to allow it to push the map down properly
html = html.replace(
    /max-height: 45vh;/,
    'max-height: 60vh; overflow-y: auto;'
);

fs.writeFileSync('index.html', html);
