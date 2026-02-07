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
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// Mock initial data
const initialStudents = [
    { id: 1, name: 'John Doe', email: 'john@ktu.edu.gh', programme: 'Computer Science' },
    { id: 2, name: 'Jane Smith', email: 'jane@ktu.edu.gh', programme: 'Engineering' },
];

const programmes = [
    'Computer Science',
    'Information Technology',
    'Computer Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Business Administration',
    'Accounting'
];

export default function ManageStudents() {
    const [students, setStudents] = useState(initialStudents);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        programme: ''
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
        if (!formData.name || !formData.email || !formData.programme) {
            setError('All fields are required');
            return;
        }

        if (!formData.email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }

        // Simulate API call
        const newStudent = {
            id: students.length + 1,
            ...formData
        };

        setStudents([newStudent, ...students]);
        setSuccess(`Successfully registered ${formData.name}`);
        setFormData({ name: '', email: '', programme: '' });

        // Auto-hide success message
        setTimeout(() => setSuccess(''), 3000);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                Refister Students
            </Typography>

            {/* Registration Form */}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom display="flex" alignItems="center">
                    <PersonAddIcon sx={{ mr: 1 }} /> New Student Registration
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
                                label="Programme"
                                name="programme"
                                value={formData.programme}
                                onChange={handleChange}
                                required
                            >
                                {programmes.map((prog) => (
                                    <MenuItem key={prog} value={prog}>
                                        {prog}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                            <Button variant="contained" type="submit" size="large">
                                Register Student
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            {/* Students List */}
            <Typography variant="h5" gutterBottom>
                Registered Students
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Official Email</strong></TableCell>
                            <TableCell><strong>Programme</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell>{student.id}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>{student.programme}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
