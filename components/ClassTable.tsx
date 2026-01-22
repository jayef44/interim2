'use client';

export default function ClassTable({ classes }: { classes: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {classes.map((item) => (
        <div key={item.class_id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/50 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400">{item.class_name}</h3>
            <span className="bg-emerald-500/10 text-emerald-500 text-[10px] px-2 py-1 rounded-full uppercase font-black">
              Capacity: {item.capacity}
            </span>
          </div>
          
          <div className="space-y-2 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Trainer:</span>
              <span className="text-slate-200">{item.trainer_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Schedule:</span>
              <span className="text-slate-200">{new Date(item.schedule).toLocaleString()}</span>
            </div>
          </div>

          <button className="mt-6 w-full py-2 bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition-colors">
            Manage Attendance
          </button>
        </div>
      ))}
    </div>
  );
}