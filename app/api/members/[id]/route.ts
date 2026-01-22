import { NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createServerSupabase()
  const body = await request.json()

  const { error, data } = await supabase
    .from('member')
    .update(body)
    .eq('member_id', params.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createServerSupabase()

  const { error } = await supabase
    .from('member')
    .delete()
    .eq('member_id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
