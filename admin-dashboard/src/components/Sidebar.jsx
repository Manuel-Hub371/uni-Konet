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
  GraduationCap
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Students', icon: Users, path: '/students' },
    { name: 'Lecturers', icon: UserSquare2, path: '/lecturers' },
    { name: 'Departments', icon: Building2, path: '/departments' },
    { name: 'Courses', icon: BookOpen, path: '/courses' },
    { name: 'Finance', icon: Wallet, path: '/finance' },
    { name: 'Reports', icon: BarChart3, path: '/reports' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary-500 p-2 rounded-lg">
          <GraduationCap size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight">UniKonet</h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
              ${isActive 
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
            `}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate text-white">Admin User</p>
            <p className="text-xs text-slate-500 truncate">Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
