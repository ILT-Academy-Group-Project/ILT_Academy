import React from 'react';
import Cohorts from '../Cohorts/Cohorts';
import Series from '../Series/Series';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Card, Box } from '@mui/material';


// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    // <div className="container">
    <Box sx={{ flexGrow: 1 }}>
      <Grid2 container spacing={2} >
        <Grid2 item xs={3}>
          <h1>Anouncements</h1>
          <Box sx={{ backgroundColor: 'grey', minWidth: 200, maxWidth: 325, minHeight: 400, maxHeight: 500, margin: 'auto', }}>
          </Box>
        </Grid2>
        <Grid2 item xs={6} className='cohortCard'>
          <Cohorts />
        </Grid2>
        <Grid2 item xs={3}>
          <Series />
        </Grid2>
      </Grid2>
    </Box>
    // </div>
  );
}

export default AboutPage;
