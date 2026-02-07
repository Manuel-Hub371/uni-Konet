import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ManageStudents from './pages/ManageStudents';
import ManageLecturers from './pages/ManageLecturers';
import Login from './pages/Login';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
        setCheckingAuth(false);
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    if (checkingAuth) {
        return null; // Or a loading spinner
    }

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
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
