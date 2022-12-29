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
import './Cohorts.css'



function Cohorts() {
    const dispatch = useDispatch();
    const history = useHistory();
    const cohorts = useSelector(store => store.cohorts.cohortReducer);
    // FETCH cohorts
    useEffect(() => {
        dispatch({
            type: 'FETCH_COHORTS'
        })

    }, [])

    console.log('cohorts is ', cohorts);

    return (
        <>
        
        <ThemeProvider theme={PrimaryMainTheme}>
            {cohorts.map(cohort => (

                <Grid2 item xs={6} sx={{}} className='cohortCard'
                    key={cohort.id}>
                    <Card sx={{ maxWidth: 345, margin: 'auto', backgroundColor: 'secondary.light' }} >
                        <CardActionArea onClick={() => history.push(`/admin/cohort/${cohort.id}`)}>

                            <CardMedia
                                component="img"
                                // height="140"
                                image="/images/ilt.png"
                                alt="something cool"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h3" component="div" color='primary.light' sx={{}}>
                                {cohort.cohortName}
                                </Typography>
                                <Typography variant="body2" color="primary.main">
                                Maybe some info? Start date? End date?
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid2>

            ))}
            </ThemeProvider>
        </>
    )
}

export default Cohorts;