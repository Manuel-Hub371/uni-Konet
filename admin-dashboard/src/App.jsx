import { Routes, Route, Navigate } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Wallet, 
  BarChart3, 
  Plus, 
  Search,
  MoreVertical,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  ChevronRight,
  ClipboardList
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

import StatCard from './components/dashboard/StatCard';
import StudentTable from './components/dashboard/StudentTable';
import AdmissionsOverview from './components/dashboard/AdmissionsOverview';
import Announcements from './components/dashboard/Announcements';
import ClassSchedule from './components/dashboard/ClassSchedule';

import StudentsPage from './pages/Dashboard/Students';
import LecturersPage from './pages/Lecturers';
import AdmissionsPage from './pages/Dashboard/Admissions';

const Dashboard = () => (
  <div className="space-y-10">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Students" value="4,520" icon={Users} />
      <StatCard title="Total Lecturers" value="180" icon={GraduationCap} />
      <StatCard title="Pending Applications" value="32" icon={ClipboardList} />
      <StatCard title="Courses Offered" value="120" icon={BookOpen} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <StudentTable />
      </div>
      <div>
        <AdmissionsOverview />
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ClassSchedule />
      <Announcements />
    </div>
  </div>
);

const ProtectedRoute = ({ children }) => children;
;

function App() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-8 bg-[#f1f5f9]">
          <div className="max-w-[1600px] mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/lecturers" element={<LecturersPage />} />
              <Route path="/admissions" element={<AdmissionsPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
