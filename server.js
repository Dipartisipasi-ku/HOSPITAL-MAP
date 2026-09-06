import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Force zero caching across all devices so updates appear instantly without clearing cache
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

// Dynamic env.js endpoint
app.get('/env.js', (req, res) => {
  const supabaseUrl = process.env.SUPABASE_URL || "https://rbliuccimrcopxjgidfk.supabase.co";
  const supabaseKey = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJibGl1Y2NpbXJjb3B4amdpZGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzODcwMDYsImV4cCI6MjEwMzk2MzAwNn0.lckukXr0rQsIKKhZ6cRLu2NG-9JHsMFs7xVraeJPFmI";
  res.type('application/javascript');
  res.send(`export const ENV = {
    SUPABASE_URL: ${JSON.stringify(supabaseUrl)},
    SUPABASE_ANON_KEY: ${JSON.stringify(supabaseKey)}
};`);
});

// Serve static assets with strict no-cache headers
app.use(express.static(__dirname, {
  etag: false,
  lastModified: false,
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}));

// Fallback to index.html with no-cache
app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT} with anti-cache active`);
});
