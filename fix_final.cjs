const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// 1. Remove all db = window.db destructuring lines
html = html.replace(/db = window\.db;.*addDoc = window\.addDoc;/g, '');

// 2. We will use `window.db`, `window.doc` etc inside the first module.
// But wait, it's easier to just pass the initialized variables!
// Let's create a global object: window.fb = { db, doc, getDoc, etc }
