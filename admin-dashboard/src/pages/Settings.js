import React from 'react';
import { Typography, Paper, TextField, Button, Grid, Divider, Switch, FormControlLabel, Box } from '@mui/material';

export default function Settings() {
    return (
        <div>
            <Typography variant="h4" gutterBottom>Settings</Typography>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>Profile Settings</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField label="Full Name" defaultValue="Admin User" fullWidth margin="normal" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField label="Email" defaultValue="admin@unikonet.edu" fullWidth margin="normal" />
                    </Grid>
                </Grid>
                <Button variant="contained" sx={{ mt: 2 }}>Update Profile</Button>
            </Paper>

            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>System Settings</Typography>
                <FormControlLabel control={<Switch defaultChecked />} label="Enable Email Notifications" />
                <Divider sx={{ my: 1 }} />
                <FormControlLabel control={<Switch defaultChecked />} label="Allow Student Registrations" />
                <Divider sx={{ my: 1 }} />
                <FormControlLabel control={<Switch />} label="Maintenance Mode" />
                <Box sx={{ mt: 3 }}>
                    <Button variant="contained" color="secondary">Save Changes</Button>
                </Box>
            </Paper>
        </div>
    );
}
