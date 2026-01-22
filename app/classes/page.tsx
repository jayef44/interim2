import { createServerSupabase } from '@/utils/supabase/server';
import Link from 'next/link'; // Import Link

export const dynamic = 'force-dynamic';

export default async function ClassesPage() {
  const supabase = await createServerSupabase();

  const { data: classes, error } = await supabase
    .from('class')
    .select(`
      class_id,
      class_name,
      schedule,
      capacity,
      trainer (first_name, last_name)
    `)
    .order('schedule', { ascending: true });

  if (error) return <div className="p-10 text-red-500 bg-slate-950">Error syncing schedules.</div>;

  return (
    <div className="min-h-screen bg-slate-950 p-8 bg-mesh">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
            Class <span className="text-blue-500">Schedule</span>
          </h1>
          {/* DITO ANG PAGBABAGO: Pinalitan ang Filter button ng Add Class Link */}
          <Link 
            href="/classes/create" 
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20"
          >
            + Add Class
          </Link>
        </div>
        
        <div className="glass-card overflow-hidden shadow-2xl bg-slate-900/50 border border-slate-800 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-800/30 text-xs font-bold uppercase text-slate-400">
              <tr>
                <th className="px-6 py-5 border-b border-slate-800">Session</th>
                <th className="px-6 py-5 border-b border-slate-800">Coach</th>
                <th className="px-6 py-5 border-b border-slate-800">Schedule</th>
                <th className="px-6 py-5 border-b border-slate-800 text-center">Capacity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {classes?.map((c: any) => (
                <tr key={c.class_id} className="hover:bg-blue-500/5 transition-colors group">
                  <td className="px-6 py-4 text-white font-bold">{c.class_name}</td>
                  <td className="px-6 py-4 text-slate-300">
                    Coach {c.trainer?.first_name} {c.trainer?.last_name}
                  </td>
                  <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                    {new Date(c.schedule).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-blue-400 font-black">{c.capacity} SLOTS</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {classes?.length === 0 && (
            <div className="py-20 text-center text-slate-500 font-medium">No classes scheduled.</div>
          )}
        </div>
      </div>
    </div>
  );
}