import { createClient } from '@supabase/supabase-js';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import fs from 'fs';

const SUPABASE_URL = "https://rbliuccimrcopxjgidfk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJibGl1Y2NpbXJjb3B4amdpZGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzODcwMDYsImV4cCI6MjEwMzk2MzAwNn0.lckukXr0rQsIKKhZ6cRLu2NG-9JHsMFs7xVraeJPFmI";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const fbConfig = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
const app = initializeApp(fbConfig);
const db = getFirestore(app, fbConfig.firestoreDatabaseId);

async function runMigration() {
    console.log("=== MEMULAI MIGRASI DATA DARI SUPABASE KE FIRESTORE (OPSI 2) ===");

    // 1. Settings & Map Image
    try {
        console.log("1. Memproses Pengaturan & Gambar Peta...");
        let mapUrl = "https://rbliuccimrcopxjgidfk.supabase.co/storage/v1/object/public/maps/map_1788453714149.png";
        const { data: mapData } = await supabase.from('map_image').select('*').limit(1);
        if (mapData && mapData.length > 0 && mapData[0].image_url) {
            mapUrl = mapData[0].image_url;
        }

        let pin = "123456789963";
        let ttsVolume = 1;
        let ttsRate = 1.1;
        const { data: setData } = await supabase.from('app_settings').select('*').limit(1);
        if (setData && setData.length > 0) {
            pin = setData[0].pin || pin;
            ttsVolume = setData[0].tts_volume ?? ttsVolume;
            ttsRate = setData[0].tts_rate ?? ttsRate;
        }

        await setDoc(doc(db, 'settings', 'general'), {
            map_url: mapUrl,
            pin: pin,
            tts_volume: ttsVolume,
            tts_rate: ttsRate
        }, { merge: true });
        console.log("✓ Berhasil menyimpan settings/general (Map URL & Pengaturan Suara/PIN).");
    } catch (e) {
        console.error("Gagal migrasi settings:", e.message);
    }

    // 2. Lokasi Asal (locations_origin)
    try {
        console.log("2. Memproses Lokasi Asal...");
        const { data: asalList, error: errAsal } = await supabase.from('lokasi_asal').select('*');
        if (errAsal) throw errAsal;
        let countAsal = 0;
        for (const item of asalList) {
            const docId = encodeURIComponent(item.nama_lokasi);
            await setDoc(doc(db, 'locations_origin', docId), {
                id: item.id,
                nama: item.nama_lokasi,
                nama_lokasi: item.nama_lokasi
            }, { merge: true });
            countAsal++;
        }
        console.log(`✓ Berhasil memigrasi ${countAsal} Lokasi Asal ke Firestore.`);
    } catch (e) {
        console.error("Gagal migrasi lokasi_asal:", e.message);
    }

    // 3. Lokasi Tujuan (locations_target)
    try {
        console.log("3. Memproses Lokasi Tujuan...");
        const { data: tujuanList, error: errTujuan } = await supabase.from('lokasi_tujuan').select('*');
        if (errTujuan) throw errTujuan;
        let countTujuan = 0;
        for (const item of tujuanList) {
            const docId = encodeURIComponent(item.nama_lokasi);
            await setDoc(doc(db, 'locations_target', docId), {
                id: item.id,
                nama: item.nama_lokasi,
                nama_lokasi: item.nama_lokasi,
                nomor: item.nomor,
                nomor_gedung: item.nomor_gedung,
                info_lantai: item.info_lantai,
                akses: item.akses,
                instruksi: item.instruksi,
                gambar_tanda: item.gambar_tanda,
                warna_dot: item.warna_dot,
                nama_warna: item.nama_warna,
                jalur_svg: item.jalur_svg
            }, { merge: true });
            countTujuan++;
        }
        console.log(`✓ Berhasil memigrasi ${countTujuan} Lokasi Tujuan ke Firestore.`);
    } catch (e) {
        console.error("Gagal migrasi lokasi_tujuan:", e.message);
    }

    // 4. Map Hotspots (map_hotspots)
    try {
        console.log("4. Memproses Map Hotspots...");
        const { data: hsList, error: errHs } = await supabase.from('map_hotspots').select('*');
        if (errHs) throw errHs;
        let countHs = 0;
        for (const item of hsList) {
            const docId = item.id.toString();
            await setDoc(doc(db, 'map_hotspots', docId), {
                id: item.id.toString(),
                nama_bangunan: item.nama_bangunan,
                target_lokasi: item.target_lokasi,
                pos_top: item.pos_top,
                pos_left: item.pos_left,
                x_pos: item.pos_left,
                y_pos: item.pos_top,
                width: item.width,
                height: item.height,
                nomor: item.nomor,
                nomor_gedung: item.nomor_gedung
            }, { merge: true });
            countHs++;
        }
        console.log(`✓ Berhasil memigrasi ${countHs} Map Hotspots ke Firestore dengan koordinat presisi.`);
    } catch (e) {
        console.error("Gagal migrasi map_hotspots:", e.message);
    }

    // 5. Rute Matrix (route_matrix)
    try {
        console.log("5. Memproses Rute Matriks...");
        const { data: rmList, error: errRm } = await supabase.from('rute_matrix').select('*');
        if (errRm) throw errRm;
        let countRm = 0;
        for (const item of rmList) {
            const docId = item.id.toString();
            await setDoc(doc(db, 'route_matrix', docId), {
                id: item.id.toString(),
                lokasi_asal: item.nama_asal,
                nama_asal: item.nama_asal,
                lokasi_tujuan: item.nama_tujuan,
                nama_tujuan: item.nama_tujuan,
                instruksi: item.instruksi,
                gambar_tanda: item.gambar_tanda || null
            }, { merge: true });
            countRm++;
        }
        console.log(`✓ Berhasil memigrasi ${countRm} Rute Matriks ke Firestore.`);
    } catch (e) {
        console.error("Gagal migrasi rute_matrix:", e.message);
    }

    // 6. Nomor Bangunan (nomor_bangunan)
    try {
        console.log("6. Memproses Nomor Bangunan...");
        const { data: nbList, error: errNb } = await supabase.from('nomor_bangunan').select('*');
        if (errNb) throw errNb;
        let countNb = 0;
        for (const item of nbList) {
            const docId = item.id.toString();
            await setDoc(doc(db, 'nomor_bangunan', docId), {
                id: item.id.toString(),
                nomor: item.nomor,
                nama_bangunan: item.nama_bangunan
            }, { merge: true });
            countNb++;
        }
        console.log(`✓ Berhasil memigrasi ${countNb} Nomor Bangunan ke Firestore.`);
    } catch (e) {
        console.error("Gagal migrasi nomor_bangunan:", e.message);
    }

    // 7. Keterangan Risiko (keterangan_risiko)
    try {
        console.log("7. Memproses Keterangan Risiko...");
        const { data: krList, error: errKr } = await supabase.from('keterangan_risiko').select('*');
        if (errKr) throw errKr;
        let countKr = 0;
        for (const item of krList) {
            const docId = item.id.toString();
            await setDoc(doc(db, 'keterangan_risiko', docId), {
                id: item.id.toString(),
                warna: item.warna,
                kode_hex: item.kode_hex,
                keterangan: item.keterangan
            }, { merge: true });
            countKr++;
        }
        console.log(`✓ Berhasil memigrasi ${countKr} Keterangan Risiko ke Firestore.`);
    } catch (e) {
        console.error("Gagal migrasi keterangan_risiko:", e.message);
    }

    console.log("=== MIGRASI SELESAI SEMPURNA ===");
    process.exit(0);
}

runMigration();
