import React from 'react';
import { Bell, Search, LogOut } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg w-full max-w-md">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Search something..." 
          className="bg-transparent border-none outline-none text-sm text-slate-600 w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-all">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200 mx-1"></div>
        
        <button className="flex items-center gap-2 p-2 px-3 text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium text-sm">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
