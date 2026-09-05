import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

const fbConfig = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(fbConfig);
const db = getFirestore(app, fbConfig.firestoreDatabaseId);

async function sim() {
    try {
        const asalSnap = await getDocs(collection(db, 'locations_origin'));
        let asals = [];
        asalSnap.forEach(doc => asals.push(decodeURIComponent(doc.id)));
        console.log("Asal:", asals);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
sim();
