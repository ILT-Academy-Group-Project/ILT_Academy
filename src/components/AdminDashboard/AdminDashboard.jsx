import React from 'react';
import Cohorts from '../Cohorts/Cohorts';
import Series from '../Series/Series';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {  Box,  } from '@mui/material';
import CalendarList from '../Calendar/CalendarList/CalendarList';
import Announcements from '../Announcements/Announcements';
import { PrimaryMainTheme } from "../PrimaryMainTheme/PrimaryMainTheme";
import { ThemeProvider } from '@mui/system';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AdminDashboard() {
    return (
        // <div className="container">
        <ThemeProvider theme={PrimaryMainTheme}>
            <Box sx={{ flexGrow: 1, bgcolor: 'background.light', }}>
                <Grid2 container spacing={2}>
                    <Grid2 item xs={3} sx={{ bgcolor: 'secondary.light', pl: 3, pr: 3, }}>
                        <Box sx={{ minWidth: 200, maxWidth: 325, minHeight: 400, margin: 'auto', }}>
                            <CalendarList />
                        </Box>
                    </Grid2>
                    <Grid2 item xs={6} sx={{pl: 4}}>

                        <Cohorts />
                        <Box sx={{ minWidth: 200, minHeight: 400, margin: 'auto' }}>
                            <Announcements />
                        </Box>
                    </Grid2>
                    <Grid2 item xs={3} sx={{pr: 4}}>
                        <Series />
                    </Grid2>
                </Grid2>
            </Box>
        </ThemeProvider>

        // </div>
    )
}

export default AdminDashboard;