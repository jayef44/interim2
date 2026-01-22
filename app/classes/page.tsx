import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function ClassesPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Joining class with trainer to get coach names
  const { data: classes } = await supabase
    .from('class')
    .select(`
      *,
      trainer (first_name, last_name)
    `);

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-white uppercase mb-10 italic">Class <span className="text-red-500">Schedule</span></h1>
        
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-xs font-bold uppercase text-slate-400">
              <tr>
                <th className="px-6 py-4">Session</th>
                <th className="px-6 py-4">Coach</th>
                <th className="px-6 py-4">Schedule</th>
                <th className="px-6 py-4 text-center">Capacity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {classes?.map((c) => (
                <tr key={c.class_id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4 text-white font-bold">{c.class_name}</td>
                  <td className="px-6 py-4 text-slate-300">Coach {c.trainer?.first_name}</td>
                  <td className="px-6 py-4 text-slate-400 font-mono text-sm">
                    {new Date(c.schedule).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-xs font-black">
                      {c.capacity} MAX
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}