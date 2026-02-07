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
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';
import api from '../services/api';
import { facultyData } from '../utils/facultyData';

// const departments = [...]; // Removed in favor of facultyData

const ranks = ['Assistant Lecturer', 'Lecturer', 'Senior Lecturer', 'Associate Professor', 'Professor'];
const statuses = ['Active', 'On Leave', 'Retired', 'Suspended'];

export default function ManageLecturers() {
    const [lecturers, setLecturers] = useState([]);
    const [filteredLecturers, setFilteredLecturers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        faculty: '',
        staffId: '',
        rank: 'Lecturer',
        staffStatus: 'Active'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetchLecturers();
    }, []);

    useEffect(() => {
        // Search and filter logic
        const lowercasedFilter = searchTerm.toLowerCase();
        const filtered = lecturers.filter(lecturer =>
            lecturer.name.toLowerCase().includes(lowercasedFilter) ||
            lecturer.email.toLowerCase().includes(lowercasedFilter) ||
            (lecturer.faculty && lecturer.faculty.toLowerCase().includes(lowercasedFilter)) ||
            (lecturer.staffId && lecturer.staffId.toLowerCase().includes(lowercasedFilter))
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
        setFormData({
            name: '', email: '', department: '', faculty: '',
            staffId: '', rank: 'Lecturer', staffStatus: 'Active'
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'success';
            case 'On Leave': return 'warning';
            case 'Retired': return 'default';
            case 'Suspended': return 'error';
            default: return 'default';
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
                        Manage staff records, roles, and status.
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
                    placeholder="Search by name, ID, email, or faculty..."
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
                            <TableCell sx={{ fontWeight: 600, color: '#4A5568' }}>Name & ID</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#4A5568' }}>Details</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: '#4A5568' }}>Faculty</TableCell>
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
                                            <Avatar sx={{ width: 40, height: 40, mr: 2, bgcolor: '#FF6B6B', fontSize: 16 }}>
                                                {lecturer.name.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {lecturer.name}
                                                </Typography>
                                                <Typography variant="caption" color="textSecondary">
                                                    ID: {lecturer.staffId || 'N/A'}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{lecturer.email}</Typography>
                                        <Typography variant="caption" color="textSecondary">{lecturer.rank}</Typography>
                                    </TableCell>
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
                                            {lecturer.faculty || 'Unassigned'}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={lecturer.staffStatus || 'Active'}
                                            size="small"
                                            color={getStatusColor(lecturer.staffStatus)}
                                            variant="outlined"
                                        />
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
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Staff ID"
                                    name="staffId"
                                    value={formData.staffId}
                                    onChange={handleChange}
                                    variant="outlined"
                                    placeholder="e.g. SF001"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Rank"
                                    name="rank"
                                    value={formData.rank}
                                    onChange={handleChange}
                                    variant="outlined"
                                >
                                    {ranks.map((r) => (
                                        <MenuItem key={r} value={r}>{r}</MenuItem>
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
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
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
                                    label="Status"
                                    name="staffStatus"
                                    value={formData.staffStatus}
                                    onChange={handleChange}
                                    variant="outlined"
                                >
                                    {statuses.map((status) => (
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
