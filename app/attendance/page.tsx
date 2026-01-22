import { createServerSupabase } from '@/lib/supabase/server'

interface Log {
  attendance_id: number
  member: { first_name: string; last_name: string } | null
  class: { class_name: string } | null
}

export default async function AttendancePage() {
  const supabase = createServerSupabase()

  const { data } = await supabase
    .from('attendance')
    .select(`
      attendance_id,
      member ( first_name, last_name ),
      class ( class_name )
    `)

  const logs = (data || []) as Log[]

  return (
    <div className="p-10 bg-slate-950 min-h-screen">
      <h1 className="text-white text-3xl font-black mb-8">Attendance Logs</h1>

      <div className="space-y-4">
        {logs.map(log => (
          <div
            key={log.attendance_id}
            className="bg-slate-900 p-4 rounded-xl border border-slate-800"
          >
            <p className="text-white font-bold">
              {log.member?.first_name} {log.member?.last_name}
            </p>
            <p className="text-slate-400 text-sm">
              {log.class?.class_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
