import React, { useState, useMemo } from 'react';
import {
  Users,
  UserCheck,
  UserMinus,
  UserX,
  Search,
  Filter,
  ChevronDown,
  MoreVertical,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  Award,
  FileText,
  ChevronRight,
  ArrowLeft,
  Clock,
  History,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Download,
  Eye,
  Plus,
  FileDown,
  ArrowUpDown,
  Laptop
} from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';

const LecturersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [programFilter, setProgramFilter] = useState('All Programs');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  // Mock Lecturers Data
  const [lecturers] = useState([
    {
      id: 'LEC-2024-001',
      name: 'Dr. Robert Fox',
      email: 'r.fox@university.edu',
      department: 'Computer Science',
      program: 'Software Engineering',
      status: 'Active',
      coursesCount: 4,
      isOverloaded: false,
      avatar: 'R'
    },
    {
      id: 'LEC-2023-042',
      name: 'Prof. Jane Cooper',
      email: 'j.cooper@university.edu',
      department: 'Business Admin',
      program: 'Management',
      status: 'Active',
      coursesCount: 6,
      isOverloaded: true,
      avatar: 'J'
    },
    {
      id: 'LEC-2022-015',
      name: 'Dr. Guy Hawkins',
      email: 'g.hawkins@university.edu',
      department: 'Medicine',
      program: 'Health Sciences',
      status: 'Suspended',
      coursesCount: 0,
      isOverloaded: false,
      avatar: 'G'
    },
    {
      id: 'LEC-2021-088',
      name: 'Marvin McKinney',
      email: 'm.mckinney@university.edu',
      department: 'Law',
      program: 'Legal Studies',
      status: 'Retired',
      coursesCount: 0,
      isOverloaded: false,
      avatar: 'M'
    },
    {
      id: 'LEC-2024-102',
      name: 'Dr. Leslie Alexander',
      email: 'l.alexander@university.edu',
      department: 'Computer Science',
      program: 'Cybersecurity',
      status: 'Active',
      coursesCount: 5,
      isOverloaded: true,
      avatar: 'L'
    }
  ]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredLecturers = useMemo(() => {
    let result = lecturers.filter(l => {
      const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = deptFilter === 'All Departments' || l.department === deptFilter;
      const matchesProgram = programFilter === 'All Programs' || l.program === programFilter;
      const matchesStatus = statusFilter === 'All Status' || l.status === statusFilter;
      return matchesSearch && matchesDept && matchesProgram && matchesStatus;
    });

    return result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [lecturers, searchQuery, deptFilter, programFilter, statusFilter, sortConfig]);

  const stats = [
    { title: 'Total Lecturers', value: lecturers.length, icon: Users, color: 'blue' },
    { title: 'Active', value: lecturers.filter(l => l.status === 'Active').length, icon: UserCheck, color: 'emerald' },
    { title: 'Suspended', value: lecturers.filter(l => l.status === 'Suspended').length, icon: UserMinus, color: 'amber' },
    { title: 'Dismissed / Retired', value: lecturers.filter(l => l.status === 'Retired' || l.status === 'Dismissed').length, icon: UserX, color: 'rose' },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Suspended': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Retired':
      case 'Dismissed': return 'bg-slate-50 text-slate-500 border-slate-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Lecturers — All Departments</h2>
          <p className="text-sm text-slate-500 font-medium mt-2">Managing faculty members, departments, and course allocations</p>
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-slate-100 text-slate-700 hover:bg-slate-200 px-5 py-3 rounded-xl font-bold transition-all shadow-sm">
            <FileDown size={18} /> Export CSV
          </button>
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-5 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20">
            <Plus size={18} /> Add Lecturer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard 
            key={i} 
            title={stat.title} 
            value={stat.value} 
            icon={stat.icon} 
            isActive={statusFilter === stat.title || (stat.title === 'Dismissed / Retired' && statusFilter === 'Retired')} 
            onClick={() => setStatusFilter(stat.title === 'Total Lecturers' ? 'All Status' : (stat.title === 'Dismissed / Retired' ? 'Retired' : stat.title))} 
          />
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        {/* Filter Bar */}
        <div className="p-8 border-b border-slate-100 space-y-6 bg-white/50 backdrop-blur-xl">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search Name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 transition-all font-medium"
              />
            </div>

            <select 
              value={deptFilter} 
              onChange={(e) => setDeptFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-black text-slate-600 focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
            >
              <option>All Departments</option>
              <option>Computer Science</option>
              <option>Business Admin</option>
              <option>Law</option>
              <option>Medicine</option>
            </select>

            <select 
              value={programFilter} 
              onChange={(e) => setProgramFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-black text-slate-600 focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
            >
              <option>All Programs</option>
              <option>Software Engineering</option>
              <option>Management</option>
              <option>Legal Studies</option>
              <option>Health Sciences</option>
            </select>

             <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-black text-slate-600 focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Suspended</option>
              <option>Retired</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="bg-slate-50/90 backdrop-blur-md text-slate-500 border-b border-slate-200">
                <th 
                  className="py-5 px-8 uppercase tracking-[0.15em] text-[10px] font-black cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Lecturer Details <ArrowUpDown size={12} />
                  </div>
                </th>
                <th 
                  className="py-5 px-6 uppercase tracking-[0.15em] text-[10px] font-black cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => handleSort('department')}
                >
                  <div className="flex items-center gap-2">
                    Department & Program <ArrowUpDown size={12} />
                  </div>
                </th>
                <th 
                  className="py-5 px-6 uppercase tracking-[0.15em] text-[10px] font-black"
                >
                  Assigned Courses
                </th>
                <th 
                  className="py-5 px-6 uppercase tracking-[0.15em] text-[10px] font-black cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-2">
                    Status <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="py-5 px-8 uppercase tracking-[0.15em] text-[10px] font-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLecturers.length > 0 ? (
                filteredLecturers.map((l) => (
                  <tr key={l.id} className="hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-all duration-200 group">
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center text-sm font-black shadow-lg shadow-blue-900/20">
                          {l.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{l.name}</p>
                          <p className="text-[10px] text-slate-400 font-semibold tracking-widest mt-0.5">{l.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <p className="text-sm font-black text-slate-800 tracking-tight">{l.department}</p>
                      <p className="text-[10px] font-bold text-slate-500 mt-0.5">{l.program}</p>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-black text-xs ${
                          l.isOverloaded ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {l.coursesCount}
                        </span>
                        {l.isOverloaded && (
                          <span className="flex items-center gap-1 text-[9px] font-black uppercase text-rose-500 tracking-widest bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                            <AlertCircle size={10} /> Overloaded
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-6 px-6">
                       <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(l.status)}`}>
                        {l.status === 'Active' && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse block" />}
                        {l.status}
                      </span>
                    </td>
                    <td className="py-6 px-8 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors" title="View Profile">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors" title="Edit">
                          <FileText size={18} />
                        </button>
                        <button className={`p-2 transition-colors ${l.status === 'Active' ? 'text-slate-400 hover:text-amber-500' : 'text-emerald-500 hover:text-emerald-600'}`} title={l.status === 'Active' ? 'Suspend' : 'Reactivate'}>
                          {l.status === 'Active' ? <UserMinus size={18} /> : <UserCheck size={18} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan="5" className="py-32 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                        <Laptop size={40} />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">No lecturers found</h4>
                        <p className="text-sm text-slate-500 font-medium">Refine your search or adjust the filters</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LecturersPage;
