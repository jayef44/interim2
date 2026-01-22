'use client';

export default function RegistrationTable({ registrations }: { registrations: any[] }) {
  return (
    <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-800/50">
          <tr className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">
            <th className="p-4">Member Name</th>
            <th className="p-4">Assigned Trainer</th>
            <th className="p-4 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {registrations.map((reg, idx) => (
            <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
              <td className="p-4 font-semibold text-white">{reg.member_name}</td>
              <td className="p-4 text-blue-400">Coach {reg.trainer_name}</td>
              <td className="p-4 text-right">
                <span className="bg-emerald-500/10 text-emerald-500 text-[10px] px-2 py-1 rounded-full font-bold">ACTIVE</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}