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
    IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialLecturers = [
    { id: 1, name: 'Dr. Alan Grant', email: 'alan@example.com', department: 'Paleontology' },
    { id: 2, name: 'Dr. Ellie Sattler', email: 'ellie@example.com', department: 'Botany' },
];

export default function ManageLecturers() {
    const [lecturers, setLecturers] = useState(initialLecturers);

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">Manage Lecturers</Typography>
                <Button variant="contained" startIcon={<AddIcon />}>
                    Add Lecturer
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lecturers.map((lecturer) => (
                            <TableRow key={lecturer.id}>
                                <TableCell>{lecturer.id}</TableCell>
                                <TableCell>{lecturer.name}</TableCell>
                                <TableCell>{lecturer.email}</TableCell>
                                <TableCell>{lecturer.department}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" size="small"><EditIcon /></IconButton>
                                    <IconButton color="error" size="small"><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
