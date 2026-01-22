// utils/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => { // Kailangan may 'export' dito para mabasa ng page.tsx
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}