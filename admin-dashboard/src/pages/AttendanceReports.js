import React from 'react';
import { Typography, Paper, Grid, TextField, Button, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Box } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function AttendanceReports() {
    return (
        <div>
            <Typography variant="h4" gutterBottom>Attendance Reports</Typography>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>Report Filters</Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={3}>
                        <TextField label="Programme" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField label="Course" fullWidth />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField label="Date Range" type="date" fullWidth InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Button variant="contained" fullWidth size="large">Generate Report</Button>
                    </Grid>
                </Grid>
            </Paper>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button variant="outlined" startIcon={<FileDownloadIcon />}>Export as CSV</Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Student ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Total Classes</TableCell>
                            <TableCell>Attended</TableCell>
                            <TableCell>Percentage</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[1, 2, 3, 4, 5].map((id) => (
                            <TableRow key={id}>
                                <TableCell>STU00{id}</TableCell>
                                <TableCell>Student Name {id}</TableCell>
                                <TableCell>20</TableCell>
                                <TableCell>{15 + id}</TableCell>
                                <TableCell>
                                    <span style={{
                                        color: (15 + id) / 20 < 0.8 ? 'red' : 'green',
                                        fontWeight: 'bold'
                                    }}>
                                        {((15 + id) / 20 * 100).toFixed(0)}%
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
