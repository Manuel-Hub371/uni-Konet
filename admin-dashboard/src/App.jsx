import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// Pages - These will be created next
const Dashboard = () => <div className="p-6 h-full w-full bg-white rounded-xl shadow-sm border border-slate-100"><h1 className="text-2xl font-bold text-slate-800">Dashboard</h1><p className="text-slate-500 mt-2">Welcome to UniKonet Admin Panel.</p></div>;
const Students = () => <div className="p-6 h-full w-full bg-white rounded-xl shadow-sm border border-slate-100"><h1 className="text-2xl font-bold text-slate-800">Students</h1></div>;
const Lecturers = () => <div className="p-6 h-full w-full bg-white rounded-xl shadow-sm border border-slate-100"><h1 className="text-2xl font-bold text-slate-800">Lecturers</h1></div>;
const Departments = () => <div className="p-6 h-full w-full bg-white rounded-xl shadow-sm border border-slate-100"><h1 className="text-2xl font-bold text-slate-800">Departments</h1></div>;
const Courses = () => <div className="p-6 h-full w-full bg-white rounded-xl shadow-sm border border-slate-100"><h1 className="text-2xl font-bold text-slate-800">Courses</h1></div>;
const Finance = () => <div className="p-6 h-full w-full bg-white rounded-xl shadow-sm border border-slate-100"><h1 className="text-2xl font-bold text-slate-800">Finance</h1></div>;
const Reports = () => <div className="p-6 h-full w-full bg-white rounded-xl shadow-sm border border-slate-100"><h1 className="text-2xl font-bold text-slate-800">Reports</h1></div>;

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  // return isAuthenticated ? children : <Navigate to="/login" />;
  // For initial dev, let's allow all
  return children;
};

function App() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
            <Route path="/lecturers" element={<ProtectedRoute><Lecturers /></ProtectedRoute>} />
            <Route path="/departments" element={<ProtectedRoute><Departments /></ProtectedRoute>} />
            <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
            <Route path="/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
