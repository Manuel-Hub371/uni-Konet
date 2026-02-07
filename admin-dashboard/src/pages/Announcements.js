import React from 'react';
import { Typography, List, ListItem, ListItemText, Paper, IconButton, TextField, Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CampaignIcon from '@mui/icons-material/Campaign';

export default function Announcements() {
    return (
        <div>
            <Typography variant="h4" gutterBottom>Announcements</Typography>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>Create New Announcement</Typography>
                <TextField label="Title" fullWidth margin="normal" />
                <TextField label="Message" multiline rows={3} fullWidth margin="normal" />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button variant="contained" startIcon={<CampaignIcon />}>Post Announcement</Button>
                </Box>
            </Paper>

            <Typography variant="h5" gutterBottom>Recent Announcements</Typography>
            <Paper>
                <List>
                    {[1, 2, 3].map((item) => (
                        <ListItem
                            key={item}
                            secondaryAction={
                                <>
                                    <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            }
                            divider
                        >
                            <ListItemText
                                primary={`Announcement Title ${item}`}
                                secondary="Posted on Oct 24, 2025 • By Admin"
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    );
}
