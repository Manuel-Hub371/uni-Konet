import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

export default function SummaryCard({ title, value, icon, color }) {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <Typography color="textSecondary" gutterBottom variant="overline">
                            {title}
                        </Typography>
                        <Typography variant="h4" component="div">
                            {value}
                        </Typography>
                    </div>
                    <Box sx={{
                        backgroundColor: color || '#e3f2fd',
                        borderRadius: '50%',
                        p: 1,
                        display: 'flex',
                        color: '#1976d2'
                    }}>
                        {icon}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
