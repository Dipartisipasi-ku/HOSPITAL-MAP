const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// Change .app-container to column universally
html = html.replace(
    /\.app-container \{ display: flex; width: 100%; height: 100%; position: relative; \}/,
    '.app-container { display: flex; flex-direction: column; width: 100%; height: 100%; position: relative; }'
);

// Change .sidebar to be a top bar
html = html.replace(
    /\.sidebar \{\s*background: #E0E0E0; padding: 25px; flex: 1; max-width: 400px;\s*display: flex; flex-direction: column; z-index: 100;\s*box-shadow: 4px 0 20px rgba\(0,0,0,0\.5\); border-right: 4px solid #8B0000;\s*\}/,
    `.sidebar { 
            background: #E0E0E0; padding: 15px 25px; width: 100%; max-width: 100%; flex: none;
            display: flex; flex-direction: column; z-index: 100;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5); border-bottom: 4px solid #8B0000;
        }`
);

fs.writeFileSync('index.html', html);
