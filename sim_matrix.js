import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

const fbConfig = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(fbConfig);
const db = getFirestore(app, fbConfig.firestoreDatabaseId);

async function sim() {
    try {
        const snap = await getDocs(collection(db, 'route_matrix'));
        let data = [];
        snap.forEach(doc => data.push({id: doc.id, ...doc.data()}));
        console.log("Matrix Data:", JSON.stringify(data, null, 2));
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
sim();
