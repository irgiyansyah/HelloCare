// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// --- PENTING: Ganti tulisan di bawah ini dengan data dari Dashboard Supabase kamu ---
// Caranya: Buka supabase.com -> Masuk Project -> Settings (Roda Gigi) -> API
const supabaseUrl = 'https://uhljddiczfafsrtvxish.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVobGpkZGljemZhZnNydHZ4aXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NTE4MTMsImV4cCI6MjA3OTIyNzgxM30.6jLanZH-ihvtfqJF8x_TU1TUHpfl8NCypZub9PONEMA'

export const supabase = createClient(supabaseUrl, supabaseKey)