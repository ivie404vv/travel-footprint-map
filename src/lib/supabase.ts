import { createClient } from '@supabase/supabase-js';

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// In production, use the same origin so API calls go through the Netlify proxy.
// In development, use the direct Supabase URL from .env.
const supabaseUrl = import.meta.env.DEV
  ? import.meta.env.VITE_SUPABASE_URL
  : window.location.origin;

export const supabase = createClient(
  supabaseUrl || 'https://placeholder-project.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
