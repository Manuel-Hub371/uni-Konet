import React from 'react';
import { Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@mui/material';

const timeSlots = ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function Timetable() {
    return (
        <div>
            <Typography variant="h4" gutterBottom>Timetable Management</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Time / Day</TableCell>
                            {days.map(day => <TableCell key={day} align="center" sx={{ fontWeight: 'bold' }}>{day}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {timeSlots.map(slot => (
                            <TableRow key={slot}>
                                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                                    {slot}
                                </TableCell>
                                {days.map(day => (
                                    <TableCell key={day} align="center" sx={{ border: '1px solid #e0e0e0' }}>
                                        {/* Placeholder for scheduled item */}
                                        {Math.random() > 0.7 ? (
                                            <div style={{ backgroundColor: '#e3f2fd', padding: '4px', borderRadius: '4px', fontSize: '0.8rem' }}>
                                                CS101<br />Lab 1
                                            </div>
                                        ) : ''}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
