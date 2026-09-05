const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const globals = ['db', 'getDoc', 'doc', 'setDoc', 'collection', 'getDocs', 'updateDoc', 'deleteDoc', 'addDoc'];

for (const g of globals) {
    // We only want to replace standalone words in the first script block.
    // It's safer to just do a smart regex or just assign them to window in the first script block.
}
