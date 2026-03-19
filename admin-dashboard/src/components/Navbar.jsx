import { Bell, Settings, BadgeCheck } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      <h2 className="text-xl font-bold text-slate-800 tracking-tight">Dashboard</h2>

      <div className="flex items-center gap-5">
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all">
          <Bell size={20} />
        </button>
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all">
          <Settings size={20} />
        </button>
        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all">
          <BadgeCheck size={20} />
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-[10px] text-white rounded-full flex items-center justify-center font-bold border-2 border-white">4</span>
        </button>
        
        <div className="flex items-center gap-3 pl-2">
          <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-100 overflow-hidden">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
