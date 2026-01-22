'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Siguraduhing na-save mo ang 'export' sa client.ts para mawala ang error sa image_55a010.png
import { createClient } from '@/utils/supabase/client'; 

export default function CreateClassPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [trainers, setTrainers] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    class_name: '',
    trainer_id: '',
    schedule: '',
    capacity: 20,
  });

  // Kunin ang mga trainers para sa dropdown
  useEffect(() => {
    const fetchTrainers = async () => {
      const { data } = await supabase.from('trainer').select('trainer_id, first_name, last_name');
      if (data) setTrainers(data);
    };
    fetchTrainers();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Aligned sa SQL: class_name, schedule, trainer_id, capacity
    const { error } = await supabase
      .from('class')
      .insert([{
        class_name: formData.class_name,
        trainer_id: parseInt(formData.trainer_id),
        // Convert to TIMESTAMPTZ para sa database
        schedule: new Date(formData.schedule).toISOString(), 
        capacity: formData.capacity,
      }]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      router.push('/classes');
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-8 flex items-center justify-center bg-mesh">
      <div className="glass-card p-10 w-full max-w-lg">
        <h2 className="gym-title mb-8 text-white">
          Create <span className="text-blue-500">Class</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-2 block">Class Name</label>
            <input
              required
              className="gym-input w-full"
              placeholder="e.g. Power Lifting 101"
              value={formData.class_name}
              onChange={(e) => setFormData({...formData, class_name: e.target.value})}
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-2 block">Assign Coach</label>
            <select
              required
              className="gym-input w-full appearance-none"
              value={formData.trainer_id}
              onChange={(e) => setFormData({...formData, trainer_id: e.target.value})}
            >
              <option value="" className="bg-slate-900 text-slate-500">Choose a Trainer</option>
              {trainers.map((t) => (
                <option key={t.trainer_id} value={t.trainer_id} className="bg-slate-900 text-white">
                  {t.first_name} {t.last_name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-2 block">Schedule</label>
              <input
                required
                type="datetime-local"
                className="gym-input w-full"
                onChange={(e) => setFormData({...formData, schedule: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-2 block">Capacity</label>
              <input
                required
                type="number"
                className="gym-input w-full"
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="gym-btn-primary w-full mt-4"
          >
            {loading ? 'Processing...' : 'Schedule Class'}
          </button>
        </form>
      </div>
    </main>
  );
}