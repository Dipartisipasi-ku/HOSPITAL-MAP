import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import fs from 'fs';

const fbConfig = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(fbConfig);
const db = getFirestore(app, fbConfig.firestoreDatabaseId);

async function check() {
    try {
        const snap = await getDoc(doc(db, 'settings', 'general'));
        if (snap.exists()) {
            const data = snap.data();
            console.log("Keys in settings/general:", Object.keys(data));
            if (data.map_url) {
                console.log("Map URL length:", data.map_url.length);
                console.log("Map URL start:", data.map_url.substring(0, 50));
            } else {
                console.log("No map_url");
            }
        } else {
            console.log("Doc does not exist");
        }
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
check();
