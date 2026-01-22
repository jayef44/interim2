import { createServerSupabase } from '@/utils/supabase/server';
import EditMemberClient from '@/components/EditMemberClient';
import { notFound } from 'next/navigation';

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  
  const { data, error } = await supabase
    .from('member')
    .select('*')
    .eq('member_id', id)
    .single();

  if (error || !data) {
    notFound();
  }

  // No need to map manually if the column names match, but for safety:
  const member = {
    member_id: data.member_id,
    first_name: data.first_name,
    last_name: data.last_name,
    contact_number: data.contact_number,
    join_date: data.join_date,
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Member</h1>
      <EditMemberClient member={member} />
    </div>
  );
}
