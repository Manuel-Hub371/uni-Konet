import React, { useState, useMemo } from 'react';
import {
  Users,
  GraduationCap,
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
  Eye
} from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';

const StudentsPage = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [programFilter, setProgramFilter] = useState('All Programs');
  const [levelFilter, setLevelFilter] = useState('All Levels');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Academic Intake Cycles (for the header title)
  const intakeYears = ['2023/2024', '2022/2023', '2021/2022'];
  const [selectedIntake, setSelectedIntake] = useState(intakeYears[0]);

  // Mock Students Data with Academic Lifecycle
  const students = [
    {
      id: 'STU-2024-001',
      name: 'Michael Adams',
      email: 'm.adams@university.edu',
      phone: '+234 801 234 5678',
      program: 'Computer Science',
      department: 'Technology',
      admissionYear: '2024',
      currentLevel: '200',
      status: 'Active',
      gpa: '3.85',
      timeline: [
        { year: '2024', event: 'Admission & Level 100', status: 'Active', level: '100' },
        { year: '2025', event: 'Level 200 Progression', status: 'Active', level: '200' },
      ],
      courses: ['Data Structures', 'Algorithms', 'Database Systems', 'Web Development'],
    },
    {
      id: 'STU-2023-042',
      name: 'Sarah Johnson',
      email: 's.johnson@university.edu',
      phone: '+234 802 345 6789',
      program: 'Business Admin',
      department: 'Management',
      admissionYear: '2023',
      currentLevel: '200',
      status: 'Suspended',
      gpa: '3.20',
      timeline: [
        { year: '2023', event: 'Admission & Level 100', status: 'Active', level: '100' },
        { year: '2024', event: 'Level 200 Progression', status: 'Active', level: '200' },
        { year: '2025', event: 'Academic Suspension (Disciplinary)', status: 'Suspended', level: '200' },
      ],
      courses: ['Accounting', 'Microeconomics', 'Marketing Principles'],
    },
    {
      id: 'STU-2021-015',
      name: 'David Wilson',
      email: 'd.wilson@university.edu',
      phone: '+234 803 456 7890',
      program: 'Medicine',
      department: 'Health Sciences',
      admissionYear: '2021',
      currentLevel: '400',
      status: 'Graduated',
      gpa: '4.50',
      timeline: [
        { year: '2021', event: 'Admission & Level 100', status: 'Active', level: '100' },
        { year: '2022', event: 'Level 200 Progression', status: 'Active', level: '200' },
        { year: '2023', event: 'Level 300 Progression', status: 'Active', level: '300' },
        { year: '2024', event: 'Level 400 Finals', status: 'Active', level: '400' },
        { year: '2025', event: 'Graduated', status: 'Graduated', level: '400' },
      ],
      courses: ['Anatomy', 'Physiology', 'Biochemistry', 'Clinical Practice'],
    },
     {
      id: 'STU-2024-088',
      name: 'Anita Brown',
      email: 'a.brown@university.edu',
      phone: '+234 805 111 2233',
      program: 'Law',
      department: 'Legal Studies',
      admissionYear: '2024',
      currentLevel: '100',
      status: 'Dismissed',
      gpa: '1.45',
      timeline: [
        { year: '2024', event: 'Admission & Level 100', status: 'Active', level: '100' },
        { year: '2025', event: 'Dismissed (Academic Failure)', status: 'Dismissed', level: '100' },
      ],
      courses: ['Legal Ethics', 'Constitutional Law'],
    }
  ];

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesProgram = programFilter === 'All Programs' || s.program === programFilter;
      const matchesLevel = levelFilter === 'All Levels' || s.currentLevel === levelFilter;
      const matchesStatus = statusFilter === 'All Status' || s.status === statusFilter;
      return matchesSearch && matchesProgram && matchesLevel && matchesStatus;
    });
  }, [searchQuery, programFilter, levelFilter, statusFilter]);

  const stats = [
    { title: 'Total Students', value: students.length, icon: Users, color: 'blue' },
    { title: 'Active', value: students.filter(s => s.status === 'Active').length, icon: UserCheck, color: 'emerald' },
    { title: 'Graduated', value: students.filter(s => s.status === 'Graduated').length, icon: Award, color: 'indigo' },
    { title: 'Suspended', value: students.filter(s => s.status === 'Suspended').length, icon: UserMinus, color: 'amber' },
    { title: 'Dismissed', value: students.filter(s => s.status === 'Dismissed').length, icon: UserX, color: 'rose' },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Graduated': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Suspended': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Dismissed': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  if (selectedStudent) {
    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        {/* Profile Header Navigation */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSelectedStudent(null)}
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Student Profile</h2>
            <p className="text-sm text-slate-500 font-medium">Viewing full academic records for {selectedStudent.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Personal & Academic Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden p-8 text-center space-y-6">
              <div className="w-32 h-32 bg-blue-600 rounded-[2rem] mx-auto flex items-center justify-center text-5xl font-black text-white shadow-2xl shadow-blue-900/20">
                {selectedStudent.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">{selectedStudent.name}</h3>
                <p className="text-blue-600 font-bold tracking-widest text-[11px] uppercase mt-1">{selectedStudent.id}</p>
              </div>
              <div className="pt-4 border-t border-slate-50 space-y-4 text-left">
                <div className="flex items-center gap-4 text-slate-600">
                  <Mail size={18} className="text-slate-400" />
                  <span className="text-sm font-bold">{selectedStudent.email}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-600">
                  <Phone size={18} className="text-slate-400" />
                  <span className="text-sm font-bold">{selectedStudent.phone}</span>
                </div>
              </div>
              <div className={`mt-6 py-2 rounded-full text-center text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(selectedStudent.status)}`}>
                Current Status: {selectedStudent.status}
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 space-y-6">
               <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Academic Details</h4>
               <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-50">
                    <span className="text-sm text-slate-500 font-bold">Program</span>
                    <span className="text-sm text-slate-900 font-black">{selectedStudent.program}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-50">
                    <span className="text-sm text-slate-500 font-bold">Department</span>
                    <span className="text-sm text-slate-900 font-black">{selectedStudent.department}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-slate-50">
                    <span className="text-sm text-slate-500 font-bold">Level</span>
                    <span className="text-sm text-slate-900 font-black">{selectedStudent.currentLevel}L</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm text-slate-500 font-bold">CGPA</span>
                    <span className="text-sm text-blue-600 font-black uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-lg">{selectedStudent.gpa}</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Timeline & Sections */}
          <div className="lg:col-span-2 space-y-8">
            {/* Academic Progression Timeline */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-10">
              <div className="flex items-center justify-between mb-10">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Academic Progression Timeline</h4>
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                  <History size={16} /> 4-Year Tracking Active
                </div>
              </div>

              <div className="relative space-y-12 pl-12">
                {/* Visual Line */}
                <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-slate-100 border-l border-dashed border-slate-300"></div>

                {selectedStudent.timeline.map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle Indicator */}
                    <div className={`absolute -left-[53px] top-1 w-10 h-10 rounded-2xl border-4 border-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 z-10 ${getStatusStyle(item.status)}`}>
                      {item.status === 'Active' ? <CheckCircle2 size={16} /> : item.status === 'Suspended' ? <AlertCircle size={16} /> : <Award size={16} />}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div className="md:col-span-1">
                        <span className="text-lg font-black text-slate-900">{item.year}</span>
                      </div>
                      <div className="md:col-span-3 bg-slate-50 rounded-2xl p-4 border border-slate-100 group-hover:border-blue-200 transition-all">
                        <div className="flex justify-between items-center mb-1">
                          <h5 className="font-black text-slate-800 text-sm tracking-tight">{item.event}</h5>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${getStatusStyle(item.status)}`}>{item.status}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-bold">Academic Level Position: {item.level}L</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Courses Section */}
              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">Registered Courses</h4>
                <div className="space-y-3">
                  {selectedStudent.courses.map((course, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-blue-100 transition-all shadow-sm">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <BookOpen size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{course}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents Section */}
              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">Student Repository</h4>
                <div className="space-y-4">
                  {['Admission Letter', 'Academic Transcript V1', 'Tuition Receipt'].map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <FileText size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                        <span className="text-xs font-bold text-slate-700">{doc}</span>
                      </div>
                      <Download size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none">University Student Registry</h2>
            <div className="relative group">
              <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm hover:border-blue-500 transition-all font-bold text-slate-700">
                {selectedIntake} <ChevronDown size={16} className="text-slate-400" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[110] overflow-hidden">
                {intakeYears.map(y => (
                  <button key={y} onClick={() => setSelectedIntake(y)} className="w-full text-left px-5 py-3 hover:bg-blue-50 font-bold text-sm text-slate-700">
                    {y} Intake
                  </button>
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-500 font-medium mt-1">Managing enrollment life-cycles and progression records</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} title={stat.title} value={stat.value} icon={stat.icon} isActive={statusFilter === stat.title} onClick={() => setStatusFilter(stat.title === 'Total Students' ? 'All Status' : stat.title)} />
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
                placeholder="Search Student..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/50 transition-all font-medium"
              />
            </div>

            <select 
              value={programFilter} 
              onChange={(e) => setProgramFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-black text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
            >
              <option>All Programs</option>
              <option>Computer Science</option>
              <option>Business Admin</option>
              <option>Law</option>
              <option>Medicine</option>
            </select>

            <select 
              value={levelFilter} 
              onChange={(e) => setLevelFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-black text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
            >
              <option>All Levels</option>
              <option>100</option>
              <option>200</option>
              <option>300</option>
              <option>400</option>
            </select>

             <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-black text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Suspended</option>
              <option>Graduated</option>
              <option>Dismissed</option>
            </select>
          </div>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="bg-slate-50/90 backdrop-blur-md text-slate-500 border-b border-slate-200">
                <th className="py-5 px-8 uppercase tracking-[0.15em] text-[10px] font-black">Student Details</th>
                <th className="py-5 px-6 uppercase tracking-[0.15em] text-[10px] font-black">Program & Level</th>
                <th className="py-5 px-6 uppercase tracking-[0.15em] text-[10px] font-black">Date Enrolled</th>
                <th className="py-5 px-6 uppercase tracking-[0.15em] text-[10px] font-black">Status</th>
                <th className="py-5 px-8 uppercase tracking-[0.15em] text-[10px] font-black text-right">Records</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-all duration-200 group">
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center text-sm font-black shadow-lg shadow-blue-900/20">
                          {s.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{s.name}</p>
                          <p className="text-[10px] text-slate-400 font-semibold tracking-widest mt-0.5">{s.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <p className="text-sm font-black text-slate-800 tracking-tight">{s.program}</p>
                      <p className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded inline-block mt-1 uppercase tracking-widest">{s.currentLevel}L Position</p>
                    </td>
                    <td className="py-6 px-6 text-slate-500 font-bold text-xs uppercase tracking-widest">
                      {s.admissionYear}
                    </td>
                    <td className="py-6 px-6">
                       <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(s.status)}`}>
                        {s.status === 'Active' && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse block" />}
                        {s.status}
                      </span>
                    </td>
                    <td className="py-6 px-8 text-right">
                      <button 
                        onClick={() => setSelectedStudent(s)}
                        className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-400 text-xs font-black px-4 py-2.5 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 uppercase tracking-widest"
                      >
                         <Eye size={14} /> Full Profile
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan="5" className="py-32 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                        <Users size={40} />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">No students found</h4>
                        <p className="text-sm text-slate-500 font-medium">Refine your filters to see more results</p>
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

export default StudentsPage;
