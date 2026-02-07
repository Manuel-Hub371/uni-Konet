import React from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import SummaryCard from '../components/SummaryCard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Week 1', attendance: 85 },
    { name: 'Week 2', attendance: 88 },
    { name: 'Week 3', attendance: 82 },
    { name: 'Week 4', attendance: 90 },
    { name: 'Week 5', attendance: 87 },
    { name: 'Week 6', attendance: 91 },
];

export default function Dashboard() {
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Dashboard Overview
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ mb: 4, color: 'text.secondary' }}>
                Welcome to uniKonet Admin Dashboard
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard title="Total Students" value="1,245" icon={<PeopleIcon />} color="#e3f2fd" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard title="Total Lecturers" value="84" icon={<SchoolIcon />} color="#ede7f6" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard title="Active Courses" value="62" icon={<ClassIcon />} color="#e8f5e9" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <SummaryCard title="Avg. Attendance" value="88%" icon={<AssessmentIcon />} color="#fff3e0" />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" gutterBottom>
                            Attendance Trends
                        </Typography>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="attendance" stroke="#1976d2" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" gutterBottom>
                            Recent Announcements
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="Exam Schedule Released" secondary="2 hours ago" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Maintenance Downtime" secondary="1 day ago" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Department Meeting" secondary="3 days ago" />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
