import { createServerSupabase } from '@/utils/supabase/server'; // Import aligned sa function name mo
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function TrainerPage() {
  const supabase = await createServerSupabase(); // Aligned sa code mo

  const { data: trainerData, error } = await supabase
    .from('trainer')
    .select('*')
    .order('last_name', { ascending: true });

  if (error) return <div className="p-10 text-red-500 bg-slate-950">Database Sync Error.</div>;

  // Cleanup: Mapping base sa SQL columns mo: trainer_id, first_name, last_name, specialization
  const serializedTrainers = (trainerData || []).map((t: any) => ({
    trainer_id: t.trainer_id,
    first_name: t.first_name,
    last_name: t.last_name,
    specialization: t.specialization,
  }));

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white bg-mesh">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black italic uppercase">Gym<span className="text-blue-500">Trainers</span></h1>
          <Link href="/trainer/create" className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20">
            + Add Trainer
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serializedTrainers.map((trainer) => (
            <div key={trainer.trainer_id} className="glass-card p-6 border border-slate-800 bg-slate-900/50 rounded-2xl glow-on-hover">
              <h3 className="text-xl font-bold">{trainer.first_name} {trainer.last_name}</h3>
              <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mt-1">
                {trainer.specialization}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}