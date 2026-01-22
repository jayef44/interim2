'use client';

export default function AttendanceLog({ logs }: { logs: any[] }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
        <h2 className="text-lg font-bold text-white">Daily Attendance</h2>
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
      </div>
      <table className="w-full">
        <thead className="bg-slate-800/50 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
          <tr>
            <th className="p-4 text-left">Member</th>
            <th className="p-4 text-left">Class Session</th>
            <th className="p-4 text-left">Time Logged</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {logs.map((log) => (
            <tr key={log.attendance_id} className="hover:bg-slate-800/20 transition-colors">
              <td className="p-4 text-white font-medium">{log.member_name}</td>
              <td className="p-4">
                <span className="text-blue-400 text-sm">●</span> 
                <span className="ml-2 text-slate-300 text-sm">{log.class_name}</span>
              </td>
              <td className="p-4 text-slate-500 font-mono text-xs">
                {new Date(log.created_at).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}