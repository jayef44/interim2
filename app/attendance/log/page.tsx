'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function LogAttendancePage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [formData, setFormData] = useState({ member_id: '', class_id: '' });

  useEffect(() => {
    async function fetchData() {
      const { data: memberData } = await supabase.from('member').select('member_id, first_name, last_name');
      const { data: classData } = await supabase.from('class').select('class_id, class_name');
      if (memberData) setMembers(memberData);
      if (classData) setClasses(classData);
    }
    fetchData();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('attendance').insert([{
      member_id: parseInt(formData.member_id),
      class_id: parseInt(formData.class_id)
    }]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      router.push('/attendance');
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-8 flex items-center justify-center bg-mesh">
      <div className="glass-card p-10 w-full max-w-md">
        <h2 className="gym-title mb-8 text-white">
          Mark <span className="text-blue-500">Attendance</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-2 block">Select Member</label>
            <select 
              required 
              className="gym-input w-full appearance-none"
              onChange={(e) => setFormData({...formData, member_id: e.target.value})}
            >
              <option value="" className="bg-slate-900">Choose Member</option>
              {members.map(m => (
                <option key={m.member_id} value={m.member_id} className="bg-slate-900">
                  {m.first_name} {m.last_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-2 block">Select Session</label>
            <select 
              required 
              className="gym-input w-full appearance-none"
              onChange={(e) => setFormData({...formData, class_id: e.target.value})}
            >
              <option value="" className="bg-slate-900">Choose Class</option>
              {classes.map(c => (
                <option key={c.class_id} value={c.class_id} className="bg-slate-900">
                  {c.class_name}
                </option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="gym-btn-primary w-full"
          >
            {loading ? 'Logging...' : 'Confirm Presence'}
          </button>
        </form>
      </div>
    </main>
  );
}