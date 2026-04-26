import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    // sessionStorage, datos de sesión se borran automáticamente cuando usuario cierra pestaña o navegador
    storage: window.sessionStorage, 
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});