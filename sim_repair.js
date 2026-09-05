import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import fs from 'fs';

const fbConfig = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(fbConfig);
const db = getFirestore(app, fbConfig.firestoreDatabaseId);

async function repair() {
    try {
        const snap = await getDocs(collection(db, 'route_matrix'));
        let data = [];
        snap.forEach(d => data.push({id: d.id, ...d.data()}));
        
        let count = 0;
        for (let d of data) {
            let asal = null;
            let tujuan = null;
            
            let inst = d.instruksi.toLowerCase();
            
            // Map based on instructions
            if (inst.includes("dekat area kantin") && inst.includes("m c u")) {
                asal = "1. Kantin"; tujuan = "1. M C U / (Medical Check Up)";
            } else if (inst.includes("dekat area kantin") && inst.includes("ruang tunggu pendaftaran")) {
                asal = "1. Kantin"; tujuan = "2. PENDAFTARAN";
            } else if (inst.includes("melalui pintu depan atau pintu masuk ruang i g d") && inst.includes("instalasi laboratorium")) {
                asal = "2. IGD"; tujuan = "1. INSTALASI LABORATORIUM";
            } else if (inst.includes("melalui pintu depan atau pintu masuk ruang i g d") && inst.includes("depo farmasi")) {
                asal = "2. IGD"; tujuan = "2. DEPO FARMASI";
            } else if (inst.includes("pintu masuk gerbang utama") && inst.includes("i g d, berada disebelah kiri")) {
                asal = "3. Pintu Gerbang Utama"; tujuan = "2. I G D / (Instalasi Gawat Darurat)";
            }
            
            if (asal && tujuan) {
                await updateDoc(doc(db, 'route_matrix', d.id), {
                    lokasi_asal: asal,
                    lokasi_tujuan: tujuan
                });
                count++;
                console.log(`Repaired ${d.id}: ${asal} -> ${tujuan}`);
            }
        }
        
        console.log("Total repaired:", count);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
repair();
