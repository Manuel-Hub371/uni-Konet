import React, { useState, useEffect } from 'react';
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
    MenuItem,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    InputAdornment,
    IconButton,
    Avatar,
    Chip
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';
import api from '../services/api';
import { facultyData } from '../utils/facultyData';

// const programmes = [...]; // Removed in favor of facultyData

const levels = ['100', '200', '300', '400'];

const studentStatuses = ['Active', 'Deferred', 'Withdrawn', 'Graduated'];

export default function ManageStudents() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        programme: '',
        faculty: '',
        studentId: '',
        level: '100',
        admissionDate: new Date().toISOString().split('T')[0],
        studentStatus: 'Active'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {
        const lowercasedFilter = searchTerm.toLowerCase();
        const filtered = students.filter(student =>
            student.name.toLowerCase().includes(lowercasedFilter) ||
            student.email.toLowerCase().includes(lowercasedFilter) ||
            student.programme.toLowerCase().includes(lowercasedFilter) ||
            (student.studentId && student.studentId.toLowerCase().includes(lowercasedFilter))
        );
        setFilteredStudents(filtered);
    }, [searchTerm, students]);

    const fetchStudents = async () => {
        setFetching(true);
        try {
            const response = await api.get('/users?role=student');
            setStudents(response.data);
            setFilteredStudents(response.data);
        } catch (err) {
            console.error('Failed to fetch students', err);
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setError('');
        setSuccess('');
        setFormData({
            name: '', email: '', programme: '', faculty: '',
            studentId: '', level: '100',
            admissionDate: new Date().toISOString().split('T')[0],
            studentStatus: 'Active'
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await api.post('/users', {
                ...formData,
                role: 'student'
            });

            const newStudent = response.data;
            setStudents([...students, newStudent]);
            setSuccess(`Successfully registered ${newStudent.name}`);

            // Close dialog after short delay
            setTimeout(() => {
                handleClose();
                setSuccess('');
            }, 1500);

        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'success';
            case 'Deferred': return 'warning';
            case 'Withdrawn': return 'error';
            case 'Graduated': return 'info';
            default: return 'default';
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C' }}>
                        Students
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Manage admissions, records, and student statuses.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    onClick={handleOpen}
                    sx={{
                        bgcolor: '#6C63FF',
                        '&:hover': { bgcolor: '#5a52d5' },
                        borderRadius: 2,
                        px: 3,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 600
                    }}
                >
                    Add Student
                </Button>
            </Box>

            {/* Search and Filter Bar */}
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 3,
                    border: '1px solid #E2E8F0'
                }}
            >
                <TextField
                    placeholder="Search by name, ID, email, or programme..."
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                        sx: { borderRadius: 2, bgcolor: '#F7FAFC' }
                    }}
                    sx={{ mr: 2 }}
                />
                <Button
                    startIcon={<RefreshIcon />}
                    onClick={fetchStudents}
                    sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        color: '#718096',
                        minWidth: 100
                    }}
                >
                    Refresh
                </Button>
            </Paper>

            {/* Students List Table */}
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#F7FAFC' }}>
                            <TableCell sx={{ fontWeight: 600, color: '#4A5568' }}>Name & ID</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#4A5568' }}>Details</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#4A5568' }}>Level</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#4A5568' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fetching ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                                    <CircularProgress size={30} />
                                </TableCell>
                            </TableRow>
                        ) : filteredStudents.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 5, color: '#718096' }}>
                                    {searchTerm ? 'No matching students found.' : 'No students registered yet.'}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredStudents.map((student) => (
                                <TableRow
                                    key={student._id}
                                    sx={{ '&:hover': { bgcolor: '#F9FAFB' } }}
                                >
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar sx={{ width: 40, height: 40, mr: 2, bgcolor: '#6C63FF', fontSize: 16 }}>
                                                {student.name.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {student.name}
                                                </Typography>
                                                <Typography variant="caption" color="textSecondary">
                                                    ID: {student.studentId || 'N/A'}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{student.email}</Typography>
                                        <Typography variant="caption" color="textSecondary">{student.programme}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: 'inline-block',
                                                bgcolor: '#EBF8FF',
                                                color: '#3182CE',
                                                px: 1.5,
                                                py: 0.5,
                                                borderRadius: 1,
                                                fontSize: '0.75rem',
                                                fontWeight: 600
                                            }}
                                        >
                                            Lvl {student.level || '100'}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={student.studentStatus || 'Active'}
                                            size="small"
                                            color={getStatusColor(student.studentStatus)}
                                            variant="outlined"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add Student Modal */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Register New Student
                    <IconButton onClick={handleClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent dividers>
                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Student ID (Index No.)"
                                    name="studentId"
                                    value={formData.studentId}
                                    onChange={handleChange}
                                    variant="outlined"
                                    placeholder="e.g. 04/2023/001"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Level"
                                    name="level"
                                    value={formData.level}
                                    onChange={handleChange}
                                    variant="outlined"
                                >
                                    {levels.map((lvl) => (
                                        <MenuItem key={lvl} value={lvl}>{lvl}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Official School Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    helperText="e.g. name@ktu.edu.gh"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Faculty"
                                    name="faculty"
                                    value={formData.faculty || ''}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            faculty: e.target.value,
                                            department: '',
                                            programme: '' // Clear programme as it depends on department
                                        });
                                    }}
                                    variant="outlined"
                                >
                                    {Object.keys(facultyData).map((faculty) => (
                                        <MenuItem key={faculty} value={faculty}>{faculty}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Department / Programme"
                                    name="programme" // keeping name as 'programme' for student model consistency, but UI says Dept
                                    value={formData.programme || ''}
                                    onChange={handleChange}
                                    disabled={!formData.faculty}
                                    variant="outlined"
                                >
                                    {formData.faculty && facultyData[formData.faculty].map((dept) => (
                                        <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Admission Date"
                                    name="admissionDate"
                                    type="date"
                                    value={formData.admissionDate}
                                    onChange={handleChange}
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Status"
                                    name="studentStatus"
                                    value={formData.studentStatus}
                                    onChange={handleChange}
                                    variant="outlined"
                                >
                                    {studentStatuses.map((status) => (
                                        <MenuItem key={status} value={status}>{status}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ p: 3 }}>
                        <Button onClick={handleClose} color="inherit">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{ bgcolor: '#6C63FF', '&:hover': { bgcolor: '#5a52d5' } }}
                        >
                            {loading ? 'Registering...' : 'Register Student'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}
