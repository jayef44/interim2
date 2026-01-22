'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface RegistrationProps {
  members: { member_id: number; first_name: string; last_name: string }[];
  trainers: { trainer_id: number; first_name: string; last_name: string }[];
  onSubmit: (data: any) => Promise<void>;
}

export default function MemberTrainerForm({ members, trainers, onSubmit }: RegistrationProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({ member_id: '', trainer_id: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      router.refresh();
      alert('Trainer assigned successfully!');
    } catch (err) {
      alert('Assignment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
      <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
        <span className="text-blue-500">🔗</span> Assign Personal Trainer
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-slate-400 text-xs font-bold mb-2 uppercase">Select Member</label>
          <select 
            className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.member_id}
            onChange={(e) => setFormData({...formData, member_id: e.target.value})}
            required
          >
            <option value="">Choose a member...</option>
            {members.map(m => <option key={m.member_id} value={m.member_id}>{m.first_name} {m.last_name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-slate-400 text-xs font-bold mb-2 uppercase">Select Trainer</label>
          <select 
            className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.trainer_id}
            onChange={(e) => setFormData({...formData, trainer_id: e.target.value})}
            required
          >
            <option value="">Choose a trainer...</option>
            {trainers.map(t => <option key={t.trainer_id} value={t.trainer_id}>{t.first_name} {t.last_name}</option>)}
          </select>
        </div>

        <button 
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20"
        >
          {loading ? 'Linking...' : 'Confirm Assignment'}
        </button>
      </div>
    </form>
  );
}