import { createClient } from '@supabase/supabase-js'

/**
 * Tactical Note: We use the '!' to tell TypeScript that we 
 * guarantee these environment variables exist in .env.local
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// This constant is what you will import into your login/register pages
export const supabase = createClient(supabaseUrl, supabaseAnonKey)