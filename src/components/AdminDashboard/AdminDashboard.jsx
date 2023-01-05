import React from 'react';
import Cohorts from '../Cohorts/Cohorts';
import Series from '../Series/Series';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Card, Box, Typography } from '@mui/material';
import CalendarList from '../Calendar/CalendarList/CalendarList';
import Announcements from '../Announcements/Announcements';
import { PrimaryMainTheme } from "../PrimaryMainTheme/PrimaryMainTheme";
import { ThemeProvider } from '@mui/system';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AdminDashboard (){





    return(
        // <div className="container">
    <ThemeProvider theme={PrimaryMainTheme}>
        <Box sx={{ flexGrow: 1, bgcolor:'background.light', mt: -5 }}>
                <Grid2 container spacing={2} sx={{m:5, }}>
                <Grid2 item xs={3} sx={{bgcolor: 'background.dark', ml:-5, mb:-40, pl:3, pr:3, }}>
                    <Box sx={{ minWidth: 200, maxWidth: 325, minHeight: 400, maxHeight: 500, margin: 'auto', }}>
                        <CalendarList />
                    </Box>
                </Grid2>
                <Grid2 item xs={6} className='cohortCard'>
                 
                    <Cohorts />            
                    <Box sx={{  minWidth: 200, width: 1, minHeight: 400, margin: 'auto'}}>
                    <Announcements />
                    </Box>
                </Grid2>
                <Grid2 item xs={3}>
                    <Series />
                </Grid2>
                </Grid2>
        </Box>
    </ThemeProvider>
       
        // </div>
    )
}

export default AdminDashboard;