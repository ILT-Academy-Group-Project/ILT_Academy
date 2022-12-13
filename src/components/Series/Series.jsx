import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { ThemeProvider } from '@mui/system';
import { PrimaryMainTheme } from '../PrimaryMainTheme/PrimaryMainTheme';


function Series() {
    const dispatch = useDispatch();
    const history = useHistory();
    const series = useSelector(store => store.series);

    useEffect(() => {
        dispatch({
            type: 'FETCH_SERIES'
        });

    }, []);

    return (

        <>
        <ThemeProvider theme={PrimaryMainTheme}>
        <h1>Series</h1>
            {series.map(serial => (
                <Grid2 direction='column'>
                    <Button
                    sx={{minHeight: 100, fontSize: 60}}
                    color='primary'
                    fullWidth='true'
                        variant='outlined'
                        onClick={() => history.push(`/admin/modules/${serial.id}`)}>{serial.seriesName}
                    </ Button>
                </Grid2>

            ))}
            </ThemeProvider>
        </>
    )
};

export default Series;