import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validation at startup
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[Supabase] Missing environment variables: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
} else {
  // Remove any surrounding quotes and trailing slashes
  const cleanUrl = supabaseUrl.replace(/^["']|["']$/g, '').replace(/\/$/, '')
  const cleanKey = supabaseAnonKey.replace(/^["']|["']$/g, '')

  if (cleanUrl !== supabaseUrl || cleanKey !== supabaseAnonKey) {
    console.info('[Supabase] Cleaned URL and key values')
  }

  export const supabase = createClient(cleanUrl, cleanKey)
}

// Fallback - create a dummy client to prevent runtime errors
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[Supabase] Creating dummy client - real functionality will be disabled')
  export const supabase = createClient('https://dummy.supabase.co', 'dummy-key') as any
}