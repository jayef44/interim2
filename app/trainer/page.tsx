import { createServerSupabase } from '@/utils/supabase/server';
import MemberTable from '@/components/MemberTable';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const supabase = await createServerSupabase(); // Await the updated client

  const { data: memberData, error } = await supabase
    .from('member') 
    .select('*')
    .order('join_date', { ascending: false });

  if (error) return <div className="p-10 text-red-500">Sync Error.</div>;

  // Cleanup: Mapping database response to MemberTable keys
  const serializedMembers = (memberData || []).map((m: any) => ({
    member_id: m.member_id,
    first_name: m.first_name,
    last_name: m.last_name,
    contact_number: m.contact_number,
    join_date: m.join_date,
  }));

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black italic uppercase">Gym<span className="text-blue-500">Roster</span></h1>
          <Link href="/create" className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition-all">
            + Add Member
          </Link>
        </div>
        <MemberTable initialMembers={serializedMembers} />
      </div>
    </main>
  );
}