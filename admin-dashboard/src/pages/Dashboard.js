import React, { useState, useEffect } from 'react';
import {
    Grid,
    Paper,
    Typography,
    Box,
    Button,
    Card,
    CardContent,
    useTheme,
    LinearProgress
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    const [stats, setStats] = useState({
        students: 0,
        lecturers: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Parallel fetching of students and lecturers to get counts
                const [studentsRes, lecturersRes] = await Promise.all([
                    api.get('/users?role=student'),
                    api.get('/users?role=lecturer')
                ]);

                setStats({
                    students: studentsRes.data.length,
                    lecturers: lecturersRes.data.length
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const StatCard = ({ title, count, icon, color, path }) => (
        <Card
            sx={{
                height: '100%',
                borderRadius: 4,
                boxShadow: '0px 10px 30px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0px 15px 35px rgba(0,0,0,0.1)',
                },
                cursor: 'pointer'
            }}
            onClick={() => navigate(path)}
        >
            <CardContent sx={{ p: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h6" color="textSecondary" sx={{ mb: 1, fontWeight: 500 }}>
                        {title}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2D3748' }}>
                        {loading ? '...' : count}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: `${color}20`, // 20% opacity
                        color: color
                    }}
                >
                    {icon}
                </Box>
            </CardContent>
            {/* Decorative bottom bar */}
            <Box sx={{ height: 6, bgcolor: color, width: '100%' }} />
        </Card>
    );

    return (
        <Box>
            <Box sx={{ mb: 5 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C', mb: 1 }}>
                    Dashboard Overview
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Welcome back, Admin. Here's what's happening today.
                </Typography>
            </Box>

            {loading && <LinearProgress sx={{ mb: 3, borderRadius: 2 }} />}

            {/* Stats Section */}
            <Grid container spacing={4} sx={{ mb: 6 }}>
                <Grid item xs={12} md={6}>
                    <StatCard
                        title="Total Students"
                        count={stats.students}
                        icon={<PeopleIcon sx={{ fontSize: 32 }} />}
                        color="#6C63FF"
                        path="/students"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <StatCard
                        title="Total Lecturers"
                        count={stats.lecturers}
                        icon={<SchoolIcon sx={{ fontSize: 32 }} />}
                        color="#FF6B6B"
                        path="/lecturers"
                    />
                </Grid>
            </Grid>

            {/* Quick Actions / Recent Activity Area */}
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#1A202C', mb: 3 }}>
                Quick Actions
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            border: '1px solid #E2E8F0',
                            textAlign: 'center'
                        }}
                    >
                        <PeopleIcon sx={{ fontSize: 50, color: '#6C63FF', mb: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Register New Student</Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                            Add a new student to the platform quickly.
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/students')}
                            sx={{ borderRadius: 2, textTransform: 'none', px: 4 }}
                        >
                            Go to Registration
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            border: '1px solid #E2E8F0',
                            textAlign: 'center'
                        }}
                    >
                        <SchoolIcon sx={{ fontSize: 50, color: '#FF6B6B', mb: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Register New Lecturer</Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                            Add a new lecturer to the platform quickly.
                        </Typography>
                        <Button
                            variant="outlined"
                            color="error" // Matches the red theme
                            onClick={() => navigate('/lecturers')}
                            sx={{ borderRadius: 2, textTransform: 'none', px: 4 }}
                        >
                            Go to Registration
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
