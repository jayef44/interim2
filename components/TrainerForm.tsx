'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TrainerForm({ initialData, onSubmit, isEditing = false }: any) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: initialData?.first_name || '',
    last_name: initialData?.last_name || '',
    specialization: initialData?.specialization || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      router.push('/trainers');
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
        {isEditing ? 'Update Trainer' : 'Add Professional Trainer'}
      </h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          placeholder="First Name"
          className="bg-slate-800 border border-slate-700 p-3 rounded-lg text-white outline-none focus:ring-2 focus:ring-purple-500"
          value={formData.first_name}
          onChange={(e) => setFormData({...formData, first_name: e.target.value})}
        />
        <input
          placeholder="Last Name"
          className="bg-slate-800 border border-slate-700 p-3 rounded-lg text-white outline-none focus:ring-2 focus:ring-purple-500"
          value={formData.last_name}
          onChange={(e) => setFormData({...formData, last_name: e.target.value})}
        />
      </div>

      <div className="mb-6">
        <label className="block text-slate-400 text-xs font-bold mb-2 uppercase">Specialization</label>
        <select 
          className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white outline-none focus:ring-2 focus:ring-purple-500"
          value={formData.specialization}
          onChange={(e) => setFormData({...formData, specialization: e.target.value})}
        >
          <option value="">Select Specialization</option>
          <option value="Bodybuilding">Bodybuilding</option>
          <option value="Yoga">Yoga</option>
          <option value="Cardio">Cardio</option>
          <option value="Powerlifting">Powerlifting</option>
        </select>
      </div>

      <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
        Save Trainer Profile
      </button>
    </form>
  );
}