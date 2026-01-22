import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/utils/supabase/server';

type Context = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Context) {
  const { id } = await params; // Crucial fix for build error
  const supabase = await createServerSupabase();
  const body = await request.json();

  const { data, error } = await supabase
    .from('member')
    .update(body)
    .eq('member_id', id)
    .select().single();

  return error ? NextResponse.json({ error: error.message }, { status: 500 }) : NextResponse.json(data);
}

export async function DELETE(request: NextRequest, { params }: Context) {
  const { id } = await params;
  const supabase = await createServerSupabase();

  const { error } = await supabase.from('member').delete().eq('member_id', id);

  return error ? NextResponse.json({ error: error.message }, { status: 500 }) : NextResponse.json({ success: true });
}