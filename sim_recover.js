import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import fs from 'fs';

const fbConfig = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(fbConfig);
const db = getFirestore(app, fbConfig.firestoreDatabaseId);

async function recover() {
    try {
        const snap = await getDocs(collection(db, 'route_matrix'));
        let data = [];
        snap.forEach(doc => data.push({id: doc.id, ...doc.data()}));
        
        console.log("Total Route Matrix Records:", data.length);
        console.log("Sample Data:", JSON.stringify(data.slice(0, 5), null, 2));
        
        // Count how many are null
        let nullCount = data.filter(d => !d.lokasi_asal || !d.lokasi_tujuan).length;
        console.log("Records with null origin/target:", nullCount);
        
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
recover();
