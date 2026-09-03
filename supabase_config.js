// File: supabase_config.js

// Import library Supabase khusus untuk ES Modules (+esm)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { ENV } from './env.js';

// Inisialisasi koneksi ke Supabase (Hanya dieksekusi 1 kali saat aplikasi dimuat)
const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY);

// Export instance supabase agar bisa digunakan di file HTML/JS lain
export default supabase;