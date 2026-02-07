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
    Avatar
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';
import api from '../services/api';

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
    const [lecturers, setLecturers] = useState([]);
    const [filteredLecturers, setFilteredLecturers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetchLecturers();
    }, []);

    useEffect(() => {
        const lowercasedFilter = searchTerm.toLowerCase();
        const filtered = lecturers.filter(lecturer =>
            lecturer.name.toLowerCase().includes(lowercasedFilter) ||
            lecturer.email.toLowerCase().includes(lowercasedFilter) ||
            lecturer.department.toLowerCase().includes(lowercasedFilter)
        );
        setFilteredLecturers(filtered);
    }, [searchTerm, lecturers]);

    const fetchLecturers = async () => {
        setFetching(true);
        try {
            const response = await api.get('/users?role=lecturer');
            setLecturers(response.data);
            setFilteredLecturers(response.data);
        } catch (err) {
            console.error('Failed to fetch lecturers', err);
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
        setFormData({ name: '', email: '', department: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await api.post('/users', {
                ...formData,
                role: 'lecturer'
            });

            const newLecturer = response.data;
            setLecturers([...lecturers, newLecturer]);
            setSuccess(`Successfully registered ${newLecturer.name}`);

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

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C' }}>
                        Lecturers
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Manage all registered lecturers here.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<SchoolIcon />}
                    onClick={handleOpen}
                    sx={{
                        bgcolor: '#FF6B6B',
                        '&:hover': { bgcolor: '#e55b5b' },
                        borderRadius: 2,
                        px: 3,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 600
                    }}
                >
                    Add Lecturer
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
                    placeholder="Search by name, email, or department..."
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
                    onClick={fetchLecturers}
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

            {/* Lecturers List Table */}
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#F7FAFC' }}>
                            <TableCell sx={{ fontWeight: 600, color: '#4A5568' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#4A5568' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#4A5568' }}>Department</TableCell>
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
                        ) : filteredLecturers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 5, color: '#718096' }}>
                                    {searchTerm ? 'No matching lecturers found.' : 'No lecturers registered yet.'}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredLecturers.map((lecturer) => (
                                <TableRow
                                    key={lecturer._id}
                                    sx={{ '&:hover': { bgcolor: '#F9FAFB' } }}
                                >
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: '#FF6B6B', fontSize: 14 }}>
                                                {lecturer.name.charAt(0)}
                                            </Avatar>
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {lecturer.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{lecturer.email}</TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: 'inline-block',
                                                bgcolor: '#FFF5F5',
                                                color: '#C53030',
                                                px: 1.5,
                                                py: 0.5,
                                                borderRadius: 1,
                                                fontSize: '0.75rem',
                                                fontWeight: 600
                                            }}
                                        >
                                            {lecturer.department}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            component="span"
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                bgcolor: '#48BB78',
                                                display: 'inline-block',
                                                mr: 1
                                            }}
                                        />
                                        Active
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add Lecturer Modal */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Register New Lecturer
                    <IconButton onClick={handleClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent dividers>
                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                        <Grid container spacing={2}>
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
                                    label="Department"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    required
                                    variant="outlined"
                                >
                                    {departments.map((dept) => (
                                        <MenuItem key={dept} value={dept}>
                                            {dept}
                                        </MenuItem>
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
                            sx={{ bgcolor: '#FF6B6B', '&:hover': { bgcolor: '#e55b5b' } }}
                        >
                            {loading ? 'Registering...' : 'Register Lecturer'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}
