import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ManageStudents from './pages/ManageStudents';
import ManageLecturers from './pages/ManageLecturers';
import ProgrammesCourses from './pages/ProgrammesCourses';
import Timetable from './pages/Timetable';
import Announcements from './pages/Announcements';
import AttendanceReports from './pages/AttendanceReports';
import Settings from './pages/Settings';
import Login from './pages/Login';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />

                {/* Protected Routes */}
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Layout>
                                <Dashboard />
                            </Layout>
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/students"
                    element={
                        isAuthenticated ? (
                            <Layout>
                                <ManageStudents />
                            </Layout>
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/lecturers"
                    element={
                        isAuthenticated ? (
                            <Layout>
                                <ManageLecturers />
                            </Layout>
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/programmes"
                    element={
                        isAuthenticated ? (
                            <Layout>
                                <ProgrammesCourses />
                            </Layout>
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/timetable"
                    element={
                        isAuthenticated ? (
                            <Layout>
                                <Timetable />
                            </Layout>
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/announcements"
                    element={
                        isAuthenticated ? (
                            <Layout>
                                <Announcements />
                            </Layout>
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/reports"
                    element={
                        isAuthenticated ? (
                            <Layout>
                                <AttendanceReports />
                            </Layout>
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/settings"
                    element={
                        isAuthenticated ? (
                            <Layout>
                                <Settings />
                            </Layout>
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
