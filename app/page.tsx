import { createServerSupabase } from '@/utils/supabase/server'
import MemberTable from '@/components/MemberTable'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const supabase = await createServerSupabase()

  const { data, error } = await supabase
    .from('member')
    .select('*')
    .order('join_date', { ascending: false })

  if (error) {
    return <div className="p-10 text-red-500">Failed to load members</div>
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between mb-10">
          <h1 className="text-4xl font-black">
            Gym<span className="text-blue-500">Roster</span>
          </h1>
          <Link
            href="/create"
            className="bg-blue-600 px-6 py-3 rounded-xl font-bold"
          >
            + Add Member
          </Link>
        </div>

        <MemberTable initialMembers={data || []} />
      </div>
    </main>
  )
}
