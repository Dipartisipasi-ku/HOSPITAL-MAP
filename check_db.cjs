import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

const fbConfig = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(fbConfig);
const db = getFirestore(app, fbConfig.firestoreDatabaseId);

async function check() {
    for(const col of ['locations_origin', 'locations_target', 'map_hotspots', 'route_matrix', 'satisfaction_surveys', 'settings']) {
        const snap = await getDocs(collection(db, col));
        console.log(`Firebase ${col}: ${snap.size} documents`);
        snap.forEach(d => console.log(" -", d.id, "=>", d.data()));
    }
    process.exit(0);
}
check();
