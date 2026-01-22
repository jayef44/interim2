'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface MemberFormProps {
  initialData?: {
    first_name: string;
    last_name: string;
    contact_number: string;
    join_date: string;
  };
  onSubmit: (data: any) => Promise<void>;
  isEditing?: boolean;
}

export default function MemberForm({ initialData, onSubmit, isEditing = false }: MemberFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: initialData?.first_name || '',
    last_name: initialData?.last_name || '',
    contact_number: initialData?.contact_number || '',
    join_date: initialData?.join_date || new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onSubmit(formData);
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
        {isEditing ? 'Update Member Profile' : 'Register New Member'}
      </h2>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Contact Number</label>
        <input
          type="text"
          name="contact_number"
          placeholder="+1 234 567 890"
          value={formData.contact_number}
          onChange={handleChange}
          className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      <div className="mb-8">
        <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Join Date</label>
        <input
          type="date"
          name="join_date"
          value={formData.join_date}
          onChange={handleChange}
          required
          className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
      >
        {loading ? 'Processing...' : isEditing ? 'Save Changes' : 'Complete Registration'}
      </button>
    </form>
  );
}