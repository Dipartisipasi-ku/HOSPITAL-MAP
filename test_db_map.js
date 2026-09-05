import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';

const fbConfig = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(fbConfig);
const db = getFirestore(app, fbConfig.firestoreDatabaseId);

async function test() {
    try {
        const dummyBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
        await setDoc(doc(db, 'settings', 'general'), { map_url: dummyBase64 }, { merge: true });
        console.log("Dummy map saved successfully");
        process.exit(0);
    } catch(e) {
        console.error("Save failed:", e);
        process.exit(1);
    }
}
test();
