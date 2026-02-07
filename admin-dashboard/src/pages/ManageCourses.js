import React, { useState, useEffect } from 'react';
import {
    Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TextField, Box, Grid, Alert, MenuItem, CircularProgress, Dialog, DialogTitle, DialogContent,
    DialogActions, IconButton
} from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import api from '../services/api';

const departments = ['Computer Science', 'Information Technology', 'Mathematics', 'Physics', 'Business'];
const levels = ['100', '200', '300', '400'];
const semesters = ['1', '2'];

export default function ManageCourses() {
    const [courses, setCourses] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        code: '', title: '', creditHours: '', department: '', level: '100', semester: '1', assignedLecturer: ''
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchCourses();
        fetchLecturers();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await api.get('/courses');
            setCourses(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setFetching(false);
        }
    };

    const fetchLecturers = async () => {
        try {
            const res = await api.get('/users?role=lecturer');
            setLecturers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFormData({ code: '', title: '', creditHours: '', department: '', level: '100', semester: '1', assignedLecturer: '' });
        setError('');
        setSuccess('');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const res = await api.post('/courses', formData);
            setCourses([...courses, res.data]);
            setSuccess('Course created successfully');
            setTimeout(handleClose, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create course');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this course?')) return;
        try {
            await api.delete(`/courses/${id}`);
            setCourses(courses.filter(c => c._id !== id));
        } catch (err) {
            alert('Failed to delete course');
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>Academic Courses</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen} sx={{ bgcolor: '#48BB78' }}>
                    Add Course
                </Button>
            </Box>

            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid #E2E8F0' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#F7FAFC' }}>
                            <TableCell>Code</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Credit Hours</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Level/Sem</TableCell>
                            <TableCell>Lecturer</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fetching ? (
                            <TableRow><TableCell colSpan={7} align="center"><CircularProgress /></TableCell></TableRow>
                        ) : courses.map((course) => (
                            <TableRow key={course._id}>
                                <TableCell sx={{ fontWeight: 'bold' }}>{course.code}</TableCell>
                                <TableCell>{course.title}</TableCell>
                                <TableCell>{course.creditHours}</TableCell>
                                <TableCell>{course.department}</TableCell>
                                <TableCell>{`L${course.level} / S${course.semester}`}</TableCell>
                                <TableCell>{course.assignedLecturer?.name || 'Unassigned'}</TableCell>
                                <TableCell>
                                    <IconButton color="error" onClick={() => handleDelete(course._id)} size="small">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Course</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent dividers>
                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Course Code" name="code" value={formData.code} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Credit Hours" name="creditHours" type="number" value={formData.creditHours} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Course Title" name="title" value={formData.title} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth select label="Department" name="department" value={formData.department} onChange={handleChange} required>
                                    {departments.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth select label="Level" name="level" value={formData.level} onChange={handleChange}>
                                    {levels.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth select label="Semester" name="semester" value={formData.semester} onChange={handleChange}>
                                    {semesters.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth select label="Assign Lecturer" name="assignedLecturer" value={formData.assignedLecturer} onChange={handleChange}>
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {lecturers.map(l => <MenuItem key={l._id} value={l._id}>{l.name}</MenuItem>)}
                                </TextField>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" variant="contained" disabled={loading}>Create Course</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}
