import React from 'react';
import {
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const programmes = [
    {
        id: 1,
        name: 'BSc Computer Science',
        courses: ['Intro to Programming', 'Data Structures', 'Database Systems'],
    },
    {
        id: 2,
        name: 'BEng Mechanical Engineering',
        courses: ['Thermodynamics', 'Fluid Mechanics', 'Engineering Math'],
    },
];

export default function ProgrammesCourses() {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Typography variant="h4">Programmes & Courses</Typography>
                <Button variant="contained" startIcon={<AddIcon />}>
                    Add Programme
                </Button>
            </div>

            <Grid container spacing={3}>
                {programmes.map((prog) => (
                    <Grid item xs={12} md={6} key={prog.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div" gutterBottom>
                                    {prog.name}
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="subtitle1" color="textSecondary">
                                    Courses:
                                </Typography>
                                <List dense>
                                    {prog.courses.map((course, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={course} />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                            <CardActions>
                                <Button size="small" startIcon={<EditIcon />}>Edit</Button>
                                <Button size="small" startIcon={<AddIcon />}>Add Course</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
