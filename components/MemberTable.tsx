'use client';

interface Member {
  member_id: number;
  first_name: string;
  last_name: string;
  contact_number: string;
  join_date: string;
}

export default function MemberTable({ initialMembers }: { initialMembers: Member[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
      <table className="min-w-full text-left">
        <thead className="bg-slate-800/50 text-xs font-bold uppercase tracking-widest text-slate-400">
          <tr>
            <th className="px-6 py-4">Member Name</th>
            <th className="px-6 py-4">Contact</th>
            <th className="px-6 py-4">Join Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {initialMembers.map((member) => (
            <tr key={member.member_id} className="hover:bg-slate-800/30 transition-colors">
              <td className="px-6 py-4 font-bold text-white">
                {member.first_name} {member.last_name}
              </td>
              <td className="px-6 py-4 font-mono text-sm text-blue-400">
                {member.contact_number}
              </td>
              <td className="px-6 py-4 text-sm text-slate-400">
                {member.join_date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}