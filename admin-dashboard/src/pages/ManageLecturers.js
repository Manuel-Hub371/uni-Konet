import React, { useState } from 'react';
import {
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Box,
    Grid,
    Alert,
    MenuItem
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

// Mock initial data
const initialLecturers = [
    { id: 1, name: 'Dr. Alan Grant', email: 'alan@ktu.edu.gh', department: 'Computer Science' },
    { id: 2, name: 'Dr. Ellie Sattler', email: 'ellie@ktu.edu.gh', department: 'Biology' },
];

const departments = [
    'Computer Science',
    'Information Technology',
    'Mathematics',
    'Physics',
    'Biology',
    'Business',
    'Liberal Studies'
];

export default function ManageLecturers() {
    const [lecturers, setLecturers] = useState(initialLecturers);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic validation
        if (!formData.name || !formData.email || !formData.department) {
            setError('All fields are required');
            return;
        }

        if (!formData.email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        // Simulate API call
        const newLecturer = {
            id: lecturers.length + 1,
            ...formData
        };

        setLecturers([newLecturer, ...lecturers]);
        setSuccess(`Successfully registered ${formData.name}`);
        setFormData({ name: '', email: '', department: '' });

        // Auto-hide success message
        setTimeout(() => setSuccess(''), 3000);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                Register Lecturers
            </Typography>

            {/* Registration Form */}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom display="flex" alignItems="center">
                    <SchoolIcon sx={{ mr: 1 }} /> New Lecturer Registration
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Official School Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                helperText="e.g. name@ktu.edu.gh"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                select
                                label="Department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            >
                                {departments.map((dept) => (
                                    <MenuItem key={dept} value={dept}>
                                        {dept}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                            <Button variant="contained" color="secondary" type="submit" size="large">
                                Register Lecturer
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            {/* Lecturers List */}
            <Typography variant="h5" gutterBottom>
                Registered Lecturers
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Official Email</strong></TableCell>
                            <TableCell><strong>Department</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lecturers.map((lecturer) => (
                            <TableRow key={lecturer.id}>
                                <TableCell>{lecturer.id}</TableCell>
                                <TableCell>{lecturer.name}</TableCell>
                                <TableCell>{lecturer.email}</TableCell>
                                <TableCell>{lecturer.department}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
