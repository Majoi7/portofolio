import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validation at startup
let cleanUrl = supabaseUrl
let cleanKey = supabaseAnonKey

if (supabaseUrl && supabaseAnonKey) {
  // Remove any surrounding quotes and trailing slashes
  cleanUrl = supabaseUrl.replace(/^["']|["']$/g, '').replace(/\/$/, '')
  cleanKey = supabaseAnonKey.replace(/^["']|["']$/g, '')

  if (cleanUrl !== supabaseUrl || cleanKey !== supabaseAnonKey) {
    console.info('[Supabase] Cleaned URL and key values')
  }
} else {
  console.warn('[Supabase] Missing environment variables: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
}

// Fallback - create a dummy client to prevent runtime errors
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(cleanUrl, cleanKey)
  : createClient('https://dummy.supabase.co', 'dummy-key') as any