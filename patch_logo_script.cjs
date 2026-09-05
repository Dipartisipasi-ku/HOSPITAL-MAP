const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const additionalFirebaseCode = `
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
      
      async function loadLogoFirebase() {
          try {
              const d = await getDoc(doc(db, "settings", "general"));
              if(d.exists() && d.data().logo_url) {
                  const url = d.data().logo_url;
                  document.getElementById('landing-logo-img').src = url;
                  document.getElementById('landing-logo-img').style.display = 'block';
                  document.getElementById('landing-logo-emoji').style.display = 'none';
                  if(document.getElementById('admin-logo-url')) document.getElementById('admin-logo-url').value = url;
              } else {
                  document.getElementById('landing-logo-img').style.display = 'none';
                  document.getElementById('landing-logo-emoji').style.display = 'block';
              }
          } catch(e) { console.warn("Load logo err", e); }
      }
      
      window.simpanLogoFirebase = async function() {
          const url = document.getElementById('admin-logo-url').value.trim();
          try {
              if (url) {
                  await setDoc(doc(db, "settings", "general"), { logo_url: url }, { merge: true });
                  document.getElementById('landing-logo-img').src = url;
                  document.getElementById('landing-logo-img').style.display = 'block';
                  document.getElementById('landing-logo-emoji').style.display = 'none';
                  alert("Logo berhasil diperbarui!");
              } else {
                  await setDoc(doc(db, "settings", "general"), { logo_url: "" }, { merge: true });
                  document.getElementById('landing-logo-img').style.display = 'none';
                  document.getElementById('landing-logo-emoji').style.display = 'block';
                  alert("Logo dikembalikan ke Emoji default.");
              }
          } catch (e) { alert("Gagal menyimpan logo: " + e.message); }
      }
`;

html = html.replace(/function loadCustomSigns\(\) \{[\s\S]*?console\.error\("Gagal memuat tanda kustom: ", error\);\s*\}\);\s*\}/, additionalFirebaseCode);

// add call to loadLogoFirebase inside initFirebase
html = html.replace(/db = getFirestore\(app, config\.firestoreDatabaseId\);/, "db = getFirestore(app, config.firestoreDatabaseId);\n              loadLogoFirebase();");

fs.writeFileSync('index.html', html);
