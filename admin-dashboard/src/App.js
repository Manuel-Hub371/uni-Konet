import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ManageStudents from './pages/ManageStudents';
import ManageLecturers from './pages/ManageLecturers';
import ProgrammesCourses from './pages/ProgrammesCourses';
import Timetable from './pages/Timetable';
import Announcements from './pages/Announcements';
import AttendanceReports from './pages/AttendanceReports';
import Settings from './pages/Settings';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/students" element={<ManageStudents />} />
                    <Route path="/lecturers" element={<ManageLecturers />} />
                    <Route path="/programmes" element={<ProgrammesCourses />} />
                    <Route path="/timetable" element={<Timetable />} />
                    <Route path="/announcements" element={<Announcements />} />
                    <Route path="/reports" element={<AttendanceReports />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
