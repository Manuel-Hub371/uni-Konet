import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Download,
  RefreshCw,
  Filter,
  Eye,
  FileText,
  Mail,
  User,
  Users,
  ClipboardList,
  Lock,
  ChevronDown,
  AlertTriangle,
  Info,
  CalendarDays,
  MoreVertical,
  Inbox
} from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';

const AdmissionsPage = () => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosingModalOpen, setIsClosingModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [programFilter, setProgramFilter] = useState('All Programs');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Admission Cycles Mock Data
  const cycles = [
    { id: 1, name: '2026 Intake', status: 'OPEN' },
    { id: 2, name: '2025 Intake', status: 'CLOSED' },
    { id: 3, name: '2024 Intake', status: 'CLOSED' },
  ];

  const [selectedCycleId, setSelectedCycleId] = useState(1);
  const selectedCycle = cycles.find(c => c.id === selectedCycleId);
  const isOpen = selectedCycle.status === 'OPEN';

  // Applications Data (Refactored to state for interactivity)
  const [allApplications, setAllApplications] = useState([
    { id: 'APP-2026-001', cycleId: 1, name: 'John Doe', email: 'john@example.com', program: 'Computer Science', date: '2024-03-15', status: 'Pending' },
    { id: 'APP-2026-002', cycleId: 1, name: 'Jane Smith', email: 'jane@example.com', program: 'Business Admin', date: '2024-03-14', status: 'Approved' },
    { id: 'APP-2026-003', cycleId: 1, name: 'Mike Ross', email: 'mike@example.com', program: 'Law', date: '2024-03-13', status: 'Rejected' },
    { id: 'APP-2026-004', cycleId: 1, name: 'Sarah Wilson', email: 'sarah@example.com', program: 'Medicine', date: '2024-03-12', status: 'Pending' },
    { id: 'APP-2025-001', cycleId: 2, name: 'Alice Brown', email: 'alice@example.com', program: 'Physics', date: '2023-11-20', status: 'Approved' },
    { id: 'APP-2025-002', cycleId: 2, name: 'Bob White', email: 'bob@example.com', program: 'History', date: '2023-11-18', status: 'Rejected' },
  ]);

  // Action Handlers
  const handleUpdateStatus = (appId, newStatus) => {
    setAllApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ));
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp(prev => ({ ...prev, status: newStatus }));
    }
    // No need to close modal immediately, allow user to see the change
  };

  const filteredApplications = useMemo(() => {
    return allApplications
      .filter(app => app.cycleId === selectedCycleId)
      .filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesProgram = programFilter === 'All Programs' || app.program === programFilter;
        const matchesStatus = statusFilter === 'All Status' || app.status === statusFilter;
        return matchesSearch && matchesProgram && matchesStatus;
      })
      .sort((a, b) => (a.status === 'Pending' ? -1 : 1)); // Prioritize pending
  }, [selectedCycleId, searchQuery, programFilter, statusFilter]);

  const pendingCount = filteredApplications.filter(a => a.status === 'Pending').length;
  const reviewProgress = isOpen ? 85 : 100;

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-20">
      {/* Top Section: Header & Cycle Selection */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Admissions</h2>
            <div className="relative group">
              <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm hover:border-blue-400 transition-all font-bold text-slate-700">
                {selectedCycle.name} <ChevronDown size={16} className="text-slate-400" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[110] overflow-hidden">
                <div className="p-3 bg-slate-50 border-b border-slate-100 italic text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Admission Cycle</div>
                {cycles.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCycleId(c.id)}
                    className={`w-full text-left px-5 py-3 hover:bg-blue-50 flex items-center justify-between transition-colors ${selectedCycleId === c.id ? 'bg-blue-50/50' : ''}`}
                  >
                    <span className={`font-bold text-sm ${selectedCycleId === c.id ? 'text-blue-600' : 'text-slate-700'}`}>{c.name}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded ${c.status === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {c.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[14px] text-slate-500 font-medium italic mt-1 flex items-center gap-2">
            {isOpen ? (
              <><Clock size={14} className="text-blue-500" /> Processing active student intake</>
            ) : (
              <><Lock size={14} className="text-red-500" /> This admission cycle is closed. No further actions allowed.</>
            )}
          </p>
        </div>

        <div className="flex gap-3 w-full lg:w-auto">
          {isOpen ? (
            <button
              onClick={() => setIsClosingModalOpen(true)}
              className="flex-1 lg:flex-none bg-white text-red-600 border border-red-100 px-5 py-3 rounded-xl text-sm font-bold shadow-sm hover:bg-red-50 transition-all flex items-center justify-center gap-2"
            >
              <Lock size={18} />
              Close Cycle
            </button>
          ) : (
            <div className="px-5 py-3 bg-slate-800 text-slate-400 rounded-xl border border-slate-700 flex items-center gap-2 text-sm font-bold">
              <CheckCircle2 size={18} className="text-emerald-500" />
              Intake Finalized
            </div>
          )}
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-blue-900/10 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
            <Download size={18} />
            Export Data
          </button>
        </div>
      </div>

      {!isOpen && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-4 text-red-700 animate-in slide-in-from-top-4 duration-500">
          <div className="bg-red-100 p-2 rounded-lg"><Lock size={20} /></div>
          <p className="text-sm font-bold">Archived Record: This cycle was closed on Dec 31, 2025. Applications are in read-only mode.</p>
        </div>
      )}

      {/* Stats Section with Interactive Filtering */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Applicants" 
          value={allApplications.filter(a => a.cycleId === selectedCycleId).length} 
          icon={Users} 
          onClick={() => setStatusFilter('All Status')}
          isActive={statusFilter === 'All Status'}
        />
        <StatCard 
          title="Approved" 
          value={allApplications.filter(a => a.cycleId === selectedCycleId && a.status === 'Approved').length} 
          icon={CheckCircle2} 
          onClick={() => setStatusFilter('Approved')}
          isActive={statusFilter === 'Approved'}
        />
        <StatCard 
          title="Rejected" 
          value={allApplications.filter(a => a.cycleId === selectedCycleId && a.status === 'Rejected').length} 
          icon={XCircle} 
          onClick={() => setStatusFilter('Rejected')}
          isActive={statusFilter === 'Rejected'}
        />
        {isOpen ? (
          <StatCard 
            title="Pending Review" 
            value={allApplications.filter(a => a.cycleId === selectedCycleId && a.status === 'Pending').length} 
            icon={Clock} 
            onClick={() => setStatusFilter('Pending')}
            isActive={statusFilter === 'Pending'}
          />
        ) : (
          <div className="bg-emerald-50 p-5 px-6 rounded-2xl border border-emerald-100 flex items-center gap-5 shadow-sm">
            <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-900/20">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-[12px] font-black text-emerald-600 uppercase tracking-widest opacity-80">Cycle Result</p>
              <h3 className="text-sm font-black text-emerald-900">All Processed</h3>
            </div>
          </div>
        )}
      </div>

      {/* Main Container: Filters & Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Persistent Filter Bar */}
        <div className="p-6 border-b border-slate-100 space-y-6 bg-white/50 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2 px-1">Control Center</h3>
              <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                Showing: <span className="text-blue-600">{selectedCycle.name}</span> Applications
              </p>
            </div>
            <div className="flex items-center gap-3 text-right">
              <div className="text-right">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Review Progress</p>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-slate-700">{reviewProgress}%</span>
                  <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${reviewProgress}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-medium"
              />
            </div>

            <select
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 focus:outline-none focus:border-blue-400"
            >
              <option>All Programs</option>
              <option>Computer Science</option>
              <option>Business Admin</option>
              <option>Law</option>
              <option>Medicine</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 focus:outline-none focus:border-blue-400"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="bg-slate-50/90 backdrop-blur-md text-slate-500 border-b border-slate-200">
                <th className="py-5 px-8 uppercase tracking-[0.15em] text-[10px] font-black">Applicant Portfolio</th>
                <th className="py-5 px-6 uppercase tracking-[0.15em] text-[10px] font-black">Academic Program</th>
                <th className="py-5 px-6 uppercase tracking-[0.15em] text-[10px] font-black">Date Applied</th>
                <th className="py-5 px-6 uppercase tracking-[0.15em] text-[10px] font-black">Current Status</th>
                <th className="py-5 px-8 uppercase tracking-[0.15em] text-[10px] font-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app, i) => (
                  <tr key={app.id} className={`hover:bg-gradient-to-r hover:from-blue-50/40 hover:to-transparent transition-all duration-200 group ${app.status === 'Pending' && isOpen ? 'bg-amber-50/30' : 'bg-white'}`}>
                    <td className="py-6 px-8">
                      <div className="flex items-center gap-4">
                          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-black transition-all duration-200 shadow-sm ${
                            app.status === 'Pending' 
                              ? 'bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700' 
                              : 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 group-hover:from-blue-600 group-hover:to-blue-700 group-hover:text-white group-hover:shadow-blue-900/20 group-hover:shadow-lg'
                          }`}>
                            {app.name.charAt(0)}
                          </div>
                        <div>
                          <p className="font-bold text-slate-900">{app.name}</p>
                          <p className="text-[10px] text-slate-400 font-semibold tracking-widest mt-0.5">{app.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <p className="text-sm font-bold text-slate-600">{app.program}</p>
                      <p className="text-[10px] text-slate-400 font-medium">Bachelors Degree</p>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex items-center gap-2 text-slate-400 font-medium text-xs">
                        <Calendar size={12} />
                        {app.date}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${app.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          app.status === 'Pending' ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-rose-50 text-rose-600 border border-rose-100'
                        }`}>
                        {app.status === 'Pending' && <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse block" />}
                        {app.status === 'Approved' && <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full block" />}
                        {app.status === 'Rejected' && <span className="w-1.5 h-1.5 bg-rose-400 rounded-full block" />}
                        {app.status}
                      </span>
                    </td>
                    <td className="py-5 px-8 text-right">
                      <button
                        onClick={() => { setSelectedApp(app); setIsModalOpen(true); }}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm shadow-blue-900/20 transition-all duration-200 hover:shadow-md hover:shadow-blue-900/25 hover:-translate-y-0.5"
                      >
                        <Eye size={14} /> View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-24 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                        <Inbox size={40} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-800">No applications found</h4>
                        <p className="text-sm text-slate-400 font-medium">Try adjusting your filters or selecting a different intake cycle.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cycle Closure Refined Modal */}
      {isClosingModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setIsClosingModalOpen(false)} />
          <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl relative overflow-hidden border border-white/20">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-amber-500" />

            <div className="p-10 text-center">
              <div className="w-24 h-24 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3 shadow-inner">
                <AlertTriangle size={48} />
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight uppercase">Confirm Cycle Closure</h3>
              <p className="text-slate-500 text-base leading-relaxed mb-10 px-4">
                Closing the <span className="text-slate-900 font-bold underline underline-offset-4">{selectedCycle.name}</span> will finalize all admissions and lock the database for editing.
                {pendingCount > 0 && (
                  <span className="block mt-4 p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-700 font-bold text-sm">
                    ⚠️ WARNING: There are {pendingCount} applications still pending review.
                  </span>
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsClosingModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest text-xs"
                >
                  Review Applications
                </button>
                <button
                  onClick={() => { setIsClosingModalOpen(false); setIsConfirmationOpen(true); }}
                  className="flex-1 py-4 bg-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-900/20 hover:bg-red-700 transition-all uppercase tracking-widest text-xs"
                >
                  Force Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal Refinement */}
      {isModalOpen && selectedApp && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] border border-slate-100">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                  <Inbox size={24} />
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">APPLICATION PORTFOLIO</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="bg-slate-50 text-slate-400 hover:text-red-500 p-2 rounded-xl transition-all">
                <XCircle size={28} />
              </button>
            </div>

            <div className="p-10 space-y-10 overflow-y-auto">
              <div className="flex flex-col md:flex-row items-center gap-8 bg-blue-50/30 p-8 rounded-[2rem] border border-blue-100/50">
                <div className="w-24 h-24 rounded-3xl bg-blue-600 text-white flex items-center justify-center text-4xl font-black shadow-xl shadow-blue-900/20">
                  {selectedApp.name.charAt(0)}
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-3xl font-black text-slate-900 tracking-tight mb-1">{selectedApp.name}</h4>
                  <p className="text-slate-500 font-bold text-sm tracking-wide">{selectedApp.email}</p>
                  <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                    <span className="px-4 py-1.5 bg-white text-blue-600 rounded-lg text-[11px] font-mono font-black tracking-tight border border-blue-100 shadow-sm">{selectedApp.id}</span>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${selectedApp.status === 'Approved' ? 'bg-green-500 text-white border-green-400' :
                        selectedApp.status === 'Pending' ? 'bg-amber-500 text-white border-amber-400' : 'bg-red-500 text-white border-red-400'
                      }`}>
                      {selectedApp.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2 group">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Plus size={12} className="text-blue-500" /> Intended Program
                  </p>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group-hover:border-blue-200 transition-all">
                    <p className="text-lg font-black text-slate-800">{selectedApp.program}</p>
                  </div>
                </div>
                <div className="space-y-2 group">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={12} className="text-blue-500" /> Submission Date
                  </p>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group-hover:border-blue-200 transition-all">
                    <p className="text-lg font-black text-slate-800">{selectedApp.date}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Document Repository</h4>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">3 FILES ATTACHED</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {['Official Academic Transcript', 'National ID / Bio Data', 'Statement of Purpose'].map(doc => (
                    <div key={doc} className="flex justify-between items-center p-5 border border-slate-100 rounded-2xl bg-white hover:bg-slate-50 hover:border-blue-200 transition-all cursor-pointer group shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all text-slate-400">
                          <FileText size={20} />
                        </div>
                        <span className="text-[15px] font-bold text-slate-700">{doc}</span>
                      </div>
                      <Download size={20} className="text-slate-300 group-hover:text-blue-600 transition-all" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-4 ${!isOpen && 'opacity-60 pointer-events-none'}`}>
              {!isOpen && (
                <div className="flex-1 flex items-center gap-2 text-slate-400 font-bold text-sm italic">
                  <Lock size={16} /> Modifications restricted for archived cycles
                </div>
              )}
              {selectedApp.status === 'Pending' && (
                <>
                  <button
                    onClick={() => handleUpdateStatus(selectedApp.id, 'Rejected')}
                    className="px-8 py-4 bg-white text-rose-600 font-black rounded-2xl border border-rose-100 hover:bg-rose-600 hover:text-white transition-all text-xs uppercase tracking-widest shadow-sm"
                  >
                    Reject Application
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedApp.id, 'Approved')}
                    className="px-8 py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-900/20 hover:bg-emerald-700 transition-all text-xs uppercase tracking-widest shadow-sm"
                  >
                    Approve Enrollment
                  </button>
                </>
              )}
              {selectedApp.status !== 'Pending' && (
                <div className="flex-1 flex items-center gap-2 text-slate-500 font-bold text-sm">
                  <Info size={16} className="text-blue-500" /> This application is already <span className={`uppercase font-black ${selectedApp.status === 'Approved' ? 'text-emerald-600' : 'text-rose-600'}`}>{selectedApp.status}</span>.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionsPage;
