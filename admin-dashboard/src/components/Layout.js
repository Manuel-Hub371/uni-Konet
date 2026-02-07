import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, CssBaseline, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';

const drawerWidth = 260;

export default function Layout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* No Top AppBar for desktop, keeps it clean. Sidebar handles branding. 
                We can add a minimal one if needed, or just let Sidebar be the nav.
                Let's keep a minimal one for page titles or mobile toggle.
            */}
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    bgcolor: '#ffffff',
                    color: '#333',
                    boxShadow: 'none',
                    borderBottom: '1px solid #e0e0e0'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
                        Dashboard Overview
                    </Typography>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#6C63FF', fontSize: 14 }}>A</Avatar>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* Mobile Drawer would go here if implemented fully, relying on desktop permanent sidebar for now */}
                <Sidebar />
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    marginTop: '64px',
                    minHeight: '100vh',
                    backgroundColor: '#F4F7FE',
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
