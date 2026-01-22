import { createServerSupabase } from '@/utils/supabase/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AttendancePage() {
  const supabase = await createServerSupabase();

  // Kukunin ang logs kasama ang pangalan ng member at pangalan ng class
  const { data: logs, error } = await supabase
    .from('attendance')
    .select(`
      attendance_id,
      member ( first_name, last_name ),
      class ( class_name )
    `)
    .order('attendance_id', { ascending: false });

  if (error) return <div className="p-10 text-red-500">Error loading logs.</div>;

  return (
    <div className="p-10 bg-slate-950 min-h-screen text-white bg-mesh">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black uppercase italic">Attendance <span className="text-blue-500">Logs</span></h1>
          {/* DITO MO I-AD-ADD ANG ATTENDANCE */}
          <Link href="/attendance/log" className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20">
            + Add Attendance
          </Link>
        </div>

        <div className="grid gap-4">
          {logs?.map((log: any) => (
            <div key={log.attendance_id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">{log.member?.first_name} {log.member?.last_name}</p>
                <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider">{log.class?.class_name}</p>
              </div>
              <div className="text-slate-500 text-xs font-mono">
                ID: #{log.attendance_id}
              </div>
            </div>
          ))}
          {logs?.length === 0 && <p className="text-center text-slate-500">No attendance records found.</p>}
        </div>
      </div>
    </div>
  );
}