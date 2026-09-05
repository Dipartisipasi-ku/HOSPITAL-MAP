import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const ENV = {
    SUPABASE_URL: "https://rbliuccimrcopxjgidfk.supabase.co",
    SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJibGl1Y2NpbXJjb3B4amdpZGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzODcwMDYsImV4cCI6MjEwMzk2MzAwNn0.lckukXr0rQsIKKhZ6cRLu2NG-9JHsMFs7xVraeJPFmI"
};

const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY);

async function test() {
    console.log("Connecting to Supabase...");
    let { data, error } = await supabase.from('survey_kepuasan').select('*').limit(1);
    if (error) console.error("Error fetching survey:", error);
    else console.log("Survey data:", data);
    
    let { data: d2, error: e2 } = await supabase.from('lokasi_asal').select('*').limit(1);
    if (e2) console.error("Error fetching lokasi_asal:", e2);
    else console.log("Lokasi asal data:", d2);
}
test();
