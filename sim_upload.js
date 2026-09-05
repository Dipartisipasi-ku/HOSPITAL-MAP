import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadString } from 'firebase/storage';
import fs from 'fs';

const fbConfig = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(fbConfig);
const storage = getStorage(app);

async function sim() {
    try {
        const storageRef = ref(storage, 'maps/test.txt');
        await uploadString(storageRef, 'hello world');
        console.log("Upload success!");
        process.exit(0);
    } catch (e) {
        console.error("Upload failed:", e.message);
        process.exit(1);
    }
}
sim();
