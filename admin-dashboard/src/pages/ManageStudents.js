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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialStudents = [
    { id: 1, name: 'John Doe', email: 'john@example.com', programme: 'Computer Science', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', programme: 'Engineering', status: 'Active' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', programme: 'Business', status: 'Inactive' },
];

export default function ManageStudents() {
    const [students, setStudents] = useState(initialStudents);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);

    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id) => {
        setStudents(students.filter((student) => student.id !== id));
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4">Manage Students</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
                    Add Student
                </Button>
            </Box>

            <TextField
                label="Search Students"
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Programme</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStudents.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell>{student.id}</TableCell>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>{student.programme}</TableCell>
                                <TableCell>{student.status}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" size="small">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" size="small" onClick={() => handleDelete(student.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add Student Modal Placeholder */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Name" fullWidth variant="outlined" />
                    <TextField margin="dense" label="Email" fullWidth variant="outlined" />
                    <TextField margin="dense" label="Programme" fullWidth variant="outlined" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose} variant="contained">Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
