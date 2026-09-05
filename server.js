import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Dynamic env.js endpoint if environment variables are provided
app.get('/env.js', (req, res) => {
  const supabaseUrl = process.env.SUPABASE_URL || "https://rbliuccimrcopxjgidfk.supabase.co";
  const supabaseKey = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJibGl1Y2NpbXJjb3B4amdpZGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzODcwMDYsImV4cCI6MjEwMzk2MzAwNn0.lckukXr0rQsIKKhZ6cRLu2NG-9JHsMFs7xVraeJPFmI";
  res.type('application/javascript');
  res.send(`export const ENV = {
    SUPABASE_URL: ${JSON.stringify(supabaseUrl)},
    SUPABASE_ANON_KEY: ${JSON.stringify(supabaseKey)}
};`);
});

// Serve static assets
app.use(express.static(__dirname));

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
