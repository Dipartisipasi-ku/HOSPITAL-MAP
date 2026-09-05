import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import fs from 'fs';

const fbConfig = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(fbConfig);
const db = getFirestore(app, fbConfig.firestoreDatabaseId);

async function check() {
    try {
        const origins = await getDocs(collection(db, 'locations_origin'));
        let originData = [];
        origins.forEach(doc => originData.push(decodeURIComponent(doc.id)));
        
        const targets = await getDocs(collection(db, 'locations_target'));
        let targetData = [];
        targets.forEach(doc => targetData.push(decodeURIComponent(doc.id)));
        
        console.log("Origins:", originData);
        console.log("Targets:", targetData);
        
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
check();
