import React from 'react';
import { Grid, Paper, Typography, Button, Box } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ mb: 4, color: 'text.secondary' }}>
                Manage user registrations for uniKonet.
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper
                        sx={{
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            bgcolor: '#e3f2fd',
                            cursor: 'pointer',
                            '&:hover': { bgcolor: '#bbdefb' }
                        }}
                        onClick={() => navigate('/students')}
                    >
                        <PersonAddIcon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
                        <Typography variant="h5" gutterBottom>
                            Register Students
                        </Typography>
                        <Typography variant="body1" align="center" color="text.secondary">
                            Add new student records and official emails.
                        </Typography>
                        <Button variant="contained" sx={{ mt: 3 }} onClick={(e) => {
                            e.stopPropagation();
                            navigate('/students');
                        }}>
                            Go to Students
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper
                        sx={{
                            p: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            bgcolor: '#ede7f6',
                            cursor: 'pointer',
                            '&:hover': { bgcolor: '#d1c4e9' }
                        }}
                        onClick={() => navigate('/lecturers')}
                    >
                        <SchoolIcon sx={{ fontSize: 60, color: '#512da8', mb: 2 }} />
                        <Typography variant="h5" gutterBottom>
                            Register Lecturers
                        </Typography>
                        <Typography variant="body1" align="center" color="text.secondary">
                            Add new lecturer records and official emails.
                        </Typography>
                        <Button variant="contained" color="secondary" sx={{ mt: 3 }} onClick={(e) => {
                            e.stopPropagation();
                            navigate('/lecturers');
                        }}>
                            Go to Lecturers
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
