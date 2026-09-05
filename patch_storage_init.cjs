const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const oldInit = 'db = getFirestore(app, config.firestoreDatabaseId);';
const newInit = 'db = getFirestore(app, config.firestoreDatabaseId);\n              storage = getStorage(app);';

html = html.replace(oldInit, newInit);
fs.writeFileSync('index.html', html);
console.log("Patched storage initialization.");
