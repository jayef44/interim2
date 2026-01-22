import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const supabase = await createServerSupabase()
  const body = await request.json()

  const { data, error } = await supabase
    .from('member')
    .insert([body])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
