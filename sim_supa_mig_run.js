import { createClient } from '@supabase/supabase-js';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';

const ENV = {
    SUPABASE_URL: "https://rbliuccimrcopxjgidfk.supabase.co",
    SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJibGl1Y2NpbXJjb3B4amdpZGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzODcwMDYsImV4cCI6MjEwMzk2MzAwNn0.lckukXr0rQsIKKhZ6cRLu2NG-9JHsMFs7xVraeJPFmI"
};
const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY);

async function migrate() {
    try {
        const tables = [
            'app_settings', 'floor_plans', 'keterangan_risiko', 
            'lokasi_asal', 'lokasi_tujuan', 'map_hotspots', 'map_image', 
            'map_locations', 'nomor_bangunan', 'rute_matrix', 'survey_kepuasan'
        ];
        
        let hasData = false;
        for (let table of tables) {
            let { data, error } = await supabase.from(table).select('*');
            if (error) {
                console.error(`Error reading ${table}:`, error.message);
                continue;
            }
            if(data.length > 0) {
                hasData = true;
                console.log(`Table ${table} has ${data.length} rows.`);
            }
        }
        if(!hasData) console.log("No data found in any table");
        process.exit(0);
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}
migrate();
