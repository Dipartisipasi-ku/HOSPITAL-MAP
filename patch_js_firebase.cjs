const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// Insert Auth Panel
const authPanel = `
            <div id="auth-panel" style="background:#181818; padding:12px; border-radius:8px; border:1px solid #D4AF37; margin-bottom:15px; color: #E0E0E0; font-size: 13px;">
                <div id="logged-out-view" style="display: flex; align-items: center;">
                    <button onclick="loginWithGoogle()" style="background:#D4AF37; color:#111; padding: 6px 12px; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">Masuk / Login</button>
                    <span style="margin-left: 10px; font-size: 11px;">Akses default: Pengunjung</span>
                </div>
                <div id="logged-in-view" style="display: none; justify-content: space-between; align-items: center;">
                    <div>
                        Halo, <b id="user-email-lbl"></b><br>
                        Peran: <span id="user-role-badge" style="background:#8B0000; padding:2px 6px; border-radius:4px; color:#D4AF37; font-size:10px;">Pengunjung</span>
                    </div>
                    <button onclick="logout()" style="background:#444; color:#fff; padding: 4px 8px; border:none; border-radius:4px; font-weight:bold; cursor:pointer; font-size: 11px;">Keluar</button>
                </div>
            </div>
`;

html = html.replace('<h2 class="header-title">🗺️ Navigasi Pintar</h2>', '<h2 class="header-title">🗺️ Navigasi Pintar</h2>' + authPanel);


// Insert Firebase Logic
const firebaseScript = `
    <script type="module">
      import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
      import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
      import { getFirestore, doc, getDoc, setDoc, collection, onSnapshot, query } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

              onAuthStateChanged(auth, async (user) => {
                  if (user) {
                      const userDoc = await getDoc(doc(db, "users", user.uid));
                      if (!userDoc.exists()) {
                          await setDoc(doc(db, "users", user.uid), {
                              role: 'pengunjung',
                              email: user.email
                          });
                          window.currentUserRole = 'pengunjung';
                      } else {
                          window.currentUserRole = userDoc.data().role || 'pengunjung';
                      }
                      
                      document.getElementById('logged-out-view').style.display = 'none';
                      document.getElementById('logged-in-view').style.display = 'flex';
                      document.getElementById('user-email-lbl').innerText = user.email;
                      document.getElementById('user-role-badge').innerText = window.currentUserRole.toUpperCase();
                      
                      loadCustomSigns();
                  } else {
                      window.currentUserRole = 'pengunjung';
                      document.getElementById('logged-out-view').style.display = 'flex';
                      document.getElementById('logged-in-view').style.display = 'none';
                  }
                  
                  // Re-render routes
                  if(typeof window.inisialisasiDaftarTujuan === 'function') {
                      window.inisialisasiDaftarTujuan();
                  }
                  if(document.getElementById('search-tujuan').value !== "") {
                      window.filterTujuan(true);
                  }
              });
          } catch (err) {
              console.error("Firebase init failed", err);
          }
      }

      window.loginWithGoogle = function() {
          const provider = new GoogleAuthProvider();
          signInWithPopup(auth, provider).catch(err => alert("Gagal masuk: " + err.message));
      }

      window.logout = function() {
          signOut(auth);
      }

      function loadCustomSigns() {
          const q = query(collection(db, "signs"));
          onSnapshot(q, (snapshot) => {
              window.customSigns = {};
              snapshot.forEach((docSnap) => {
                  const data = docSnap.data();
                  window.customSigns[data.locationId] = data.imageUrl;
              });
          }, (error) => {
              console.error("Gagal memuat tanda kustom: ", error);
          });
      }

      window.adminSaveSign = async function(locationId, imageUrl) {
          if (window.currentUserRole !== 'admin') {
              alert("Akses Ditolak: Hanya Administrator yang dapat mengubah foto tanda.");
              return;
          }
          if(!imageUrl) return;
          try {
              await setDoc(doc(db, "signs", locationId), {
                  locationId: locationId,
                  imageUrl: imageUrl,
                  updatedBy: auth.currentUser.uid
              });
              alert("Foto tanda berhasil diperbarui!");
          } catch (e) {
              alert("Gagal menyimpan foto: " + e.message);
          }
      }

      initFirebase();
    </script>
`;

html = html.replace(/<script src="security\.js"><\/script>/, firebaseScript + '\n    <script src="security.js"></script>');

fs.writeFileSync('index.html', html);
