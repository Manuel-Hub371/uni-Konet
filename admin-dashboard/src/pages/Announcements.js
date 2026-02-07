import React, { useState, useEffect } from 'react';
import {
    Typography, Button, Card, CardContent, CardActions, Grid, TextField, Box,
    Alert, MenuItem, CircularProgress, Dialog, DialogTitle, DialogContent,
    DialogActions, Chip
} from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../services/api';

const categories = ['General', 'Academic', 'Event', 'Emergency'];
const audiences = ['All', 'Student', 'Lecturer', 'Staff'];

export default function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '', message: '', category: 'General', targetAudience: 'All'
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const res = await api.get('/announcements');
            setAnnouncements(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setFetching(false);
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFormData({ title: '', message: '', category: 'General', targetAudience: 'All' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/announcements', formData);
            setAnnouncements([res.data, ...announcements]);
            handleClose();
        } catch (err) {
            alert('Failed to post announcement');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this announcement?')) return;
        try {
            await api.delete(`/announcements/${id}`);
            setAnnouncements(announcements.filter(a => a._id !== id));
        } catch (err) {
            alert('Failed to delete');
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>Announcements</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen} sx={{ bgcolor: '#ED8936' }}>
                    Post Announcement
                </Button>
            </Box>

            {fetching ? <CircularProgress /> : (
                <Grid container spacing={3}>
                    {announcements.map((announcement) => (
                        <Grid item xs={12} md={6} key={announcement._id}>
                            <Card elevation={2} sx={{ borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                                        <Chip label={announcement.category} size="small" color="primary" variant="outlined" />
                                        <Typography variant="caption" color="textSecondary">
                                            {new Date(announcement.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        {announcement.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                        {announcement.message}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Chip label={`@${announcement.targetAudience}`} size="small" sx={{ bgcolor: '#EDF2F7' }} />
                                        <Typography variant="caption" sx={{ alignSelf: 'center' }}>
                                            by {announcement.author?.name}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(announcement._id)}>
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Post New Announcement</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent dividers>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} required />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth select label="Category" name="category" value={formData.category} onChange={handleChange}>
                                    {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth select label="Target Audience" name="targetAudience" value={formData.targetAudience} onChange={handleChange}>
                                    {audiences.map(a => <MenuItem key={a} value={a}>{a}</MenuItem>)}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth multiline rows={4} label="Message" name="message" value={formData.message} onChange={handleChange} required />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" variant="contained" disabled={loading} sx={{ bgcolor: '#ED8936' }}>Post</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
}
