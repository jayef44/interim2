'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// Gagamit ng client-side utility para sa 'use client' page
import { createClient } from '@/utils/supabase/client'; 

export default function CreateTrainer() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Aligned sa SQL columns: first_name, last_name, specialization
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    specialization: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient(); // Initialize client

    const { error } = await supabase
      .from('trainer')
      .insert([formData]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      router.push('/trainer');
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 p-8 flex items-center justify-center text-white bg-mesh">
      <div className="glass-card p-8 w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl">
        <h2 className="text-3xl font-black uppercase italic mb-6">
          Add <span className="text-blue-500">Trainer</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase text-slate-500 mb-1 block tracking-widest">First Name</label>
            <input
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-blue-500 transition-all"
              placeholder="e.g. Aaron"
              value={formData.first_name}
              onChange={(e) => setFormData({...formData, first_name: e.target.value})}
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-slate-500 mb-1 block tracking-widest">Last Name</label>
            <input
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-blue-500 transition-all"
              placeholder="e.g. Efren"
              value={formData.last_name}
              onChange={(e) => setFormData({...formData, last_name: e.target.value})}
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-slate-500 mb-1 block tracking-widest">Specialization</label>
            <input
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-blue-500 transition-all"
              placeholder="e.g. Strength & Conditioning"
              value={formData.specialization}
              onChange={(e) => setFormData({...formData, specialization: e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Trainer'}
          </button>
        </form>
      </div>
    </main>
  );
}