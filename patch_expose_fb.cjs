const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const fbReplacement = `
    </script>
    <script type="module">
      import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
      import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
      import { getFirestore, doc, getDoc, setDoc, collection, onSnapshot, query, getDocs, updateDoc, deleteDoc, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
      
      let app, auth, db;
      
      window.currentUserRole = "pengunjung"; 
      window.customSigns = {};

      async function initFirebase() {
          try {
              const res = await fetch('./firebase-applet-config.json');
              if(!res.ok) throw new Error("Config not found");
              const config = await res.json();
              app = initializeApp(config);
              auth = getAuth(app);
              db = getFirestore(app, config.firestoreDatabaseId);
              
              // Expose for CRUD
              window.db = db;
              window.auth = auth;
              window.doc = doc;
              window.getDoc = getDoc;
              window.setDoc = setDoc;
              window.collection = collection;
              window.onSnapshot = onSnapshot;
              window.query = query;
              window.getDocs = getDocs;
              window.updateDoc = updateDoc;
              window.deleteDoc = deleteDoc;
              window.addDoc = addDoc;
`;

html = html.replace(/<\/script>\s*<script type="module">\s*import \{ initializeApp \} from "https:\/\/www\.gstatic\.com\/firebasejs\/11\.0\.1\/firebase-app\.js";[\s\S]*?async function initFirebase\(\) \{[\s\S]*?db = getFirestore\(app, config\.firestoreDatabaseId\);/, fbReplacement);

fs.writeFileSync('index.html', html);
