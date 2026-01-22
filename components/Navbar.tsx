import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter italic">
          GYM<span className="text-blue-500">SYS</span>
        </Link>
        <div className="space-x-6 text-sm font-bold uppercase text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">Members</Link>
          <Link href="/trainers" className="hover:text-white transition-colors">Trainers</Link>
          <Link href="/classes" className="hover:text-white transition-colors">Classes</Link>
          <Link href="/attendance" className="hover:text-white transition-colors">Attendance</Link>
        </div>
      </div>
    </nav>
  );
}