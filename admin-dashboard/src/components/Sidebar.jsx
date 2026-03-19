import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserSquare2, 
  Building2, 
  BookOpen, 
  Wallet, 
  BarChart3,
  GraduationCap,
  ClipboardList,
  Calendar,
  CheckCircle2,
  MessageSquare,
  Settings,
  LogOut,
  ChevronRight,
  UserPlus
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Admissions', icon: UserPlus, path: '/admissions' },
    { name: 'Students', icon: Users, path: '/students' },
    { name: 'Lecturers', icon: UserSquare2, path: '/lecturers' },
    { name: 'Academic', icon: GraduationCap, path: '/academic', hasSub: true },
    { name: 'Enrollment', icon: ClipboardList, path: '/enrollment', hasSub: true },
    { name: 'Timetable', icon: Calendar, path: '/timetable', hasSub: true },
    { name: 'Results', icon: CheckCircle2, path: '/results', hasSub: true },
    { name: 'Finance', icon: Wallet, path: '/finance' },
    { name: 'Communication', icon: MessageSquare, path: '/communication', hasSub: true },
    { name: 'Reports & Analytics', icon: BarChart3, path: '/reports', hasSub: true },
    { name: 'System Management', icon: Settings, path: '/system' },
    { name: 'Logout', icon: LogOut, path: '/logout' },
  ];

  return (
    <div className="w-80 bg-[#1e293b] text-slate-300 flex flex-col h-screen transition-all duration-300">
      <div className="p-6 flex items-center gap-4">
        <div className="bg-blue-600 p-2 rounded-full flex items-center justify-center">
          <span className="text-white text-xl font-bold font-serif px-1.5">U</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">
          uniKonet
        </h1>
      </div>
      
      <nav className="flex-1 px-0 py-4 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center justify-between px-6 py-3.5 transition-all duration-200 group
              ${isActive 
                ? 'bg-blue-600 text-white font-medium' 
                : 'hover:bg-slate-800 hover:text-white'}
            `}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-4">
                  <item.icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
                  <span className="text-[15px]">{item.name}</span>
                </div>
                {item.hasSub && (
                  <ChevronRight size={14} className={isActive ? 'text-white' : 'text-slate-500'} />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
