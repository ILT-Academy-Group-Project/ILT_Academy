import React from 'react';
import { useEffect,  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/system';
import { PrimaryMainTheme } from '../PrimaryMainTheme/PrimaryMainTheme';
import { Typography } from '@mui/material';



function SeriesStudent() {
    const dispatch = useDispatch();
    const history = useHistory();
    const series = useSelector(store => store.cohortSeries);

    useEffect(() => {
        dispatch({
            type: 'FETCH_SERIES'
        });

    }, []);

    return (
        <>
            <ThemeProvider theme={PrimaryMainTheme}>
                
                    <Grid2 direction='column' sx={{paddingLeft:'0'}}>

                        {
                            series.length>0 ?
                            <Typography variant='h2'>My Curriculum</Typography>
                        :
                            null    
                        }
                        
                        {series.map(serial => (

                            <Button
                                key={serial.seriesId}
                                sx={{  minHeight: 100, width:350,  mt: 2, }}
                                color='primary'
                                fullWidth='true'
                                variant='contained'
                                onClick={() => history.push(`/studentportal/modules/${serial.seriesId}`)}>
                                    <Typography variant='h3' sx={{fontSize: 60}} >{serial.seriesName}</Typography>
                                    
                            </ Button>
                        ))}
                     
                    </Grid2>
              
            </ThemeProvider>

        </>
    )
}

export default SeriesStudent;