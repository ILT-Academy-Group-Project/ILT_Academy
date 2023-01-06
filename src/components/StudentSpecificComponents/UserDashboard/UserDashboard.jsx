import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, } from 'react-router-dom';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {  Box, Button, Typography } from '@mui/material';
import CalendarList from '../../Calendar/CalendarList/CalendarList';
import Announcements from '../../Announcements/Announcements';
import { PrimaryMainTheme } from '../../PrimaryMainTheme/PrimaryMainTheme';
import { ThemeProvider } from '@mui/system';


function UserDashboard(){
    //get user info for cohortId
    const user = useSelector((store) => store.user);
    const orientationList = useSelector((store) => store.orientation.orientationReducer);
    const cohorts = useSelector(store => store.cohorts.cohortReducer);
    //setup dispatch and useHistory
    const dispatch = useDispatch();
    const history = useHistory();

    let username = user.username;
    let cohortId = user.cohortId;
    
    //reroute to hipster hacker hustler / orientation if it isnt complete
    {
        user.oriented <= orientationList.length 
        && user.hipsterInterest === 0 
        && user.hipsterSkill === 0 
        && user.hackerInterest === 0 
        && user.hackerSkill === 0 
        && user.hustlerInterest === 0 
        && user.hustlerSkill === 0
        ? history.push('/user') 
        : null
    }

    useEffect(() => {
        //get assigned series for the render;
        dispatch({
            type: 'FETCH_ORIENTATION'
        });
        dispatch({
            type: 'FETCH_COHORTS'
        })
    },[])


;
    return(
        <ThemeProvider theme={PrimaryMainTheme}>
            <Box sx={{ flexGrow: 1, bgcolor:'background.light', mt: -3,  height: '100%' }}>
            <Grid2 container spacing={2} sx={{m:5, height: '100%'}} >
                <Grid2 item xs={4} sx={{bgcolor: 'background.dark', ml:-5,  pl:3, pr:3, height: '100%'}}>
                    <Box sx={{ minWidth: 200, maxWidth: 325,  pt:3}}>
                        <Button
                        variant='contained'
                        onClick={() => history.push(`/profile/${username}/${cohortId}`)}
                        >My Profile</Button>
                    </Box>
                    <Box sx={{ width: .8, }}>
                        <Typography
                        variant='h2'
                        color='tertiary.main' >
                            Office Hours
                        </Typography>
                        {cohorts.map(cohort => {
                            return(
                                <>
                                <Box sx={{mb:2}}>
                                    <Typography
                                    variant='body1'
                                    color='tertiary.main'>{
                                        cohort.cohortName}
                                    </Typography>
                                    <Typography
                                    color='tertiary.main'
                                    variant='body2'>
                                        Mon-Wed: 2:00-4:00PM
                                    </Typography>
                                </Box>
                                </>
                            )
                           
                        })}
                    </Box>
                    <Box sx={{ minWidth: 200, maxWidth: 325, minHeight: 400, margin: 'auto', }}>
                        <CalendarList />
                    </Box>
                </Grid2>
                <Grid2 item xs={6.5}>     
                    <Box sx={{ height: 'fit-content', minWidth: 200, width: 1, marginLeft: 'auto', marginRight: 'auto', marginTop:1, }}>
                        <Announcements />
                    </Box>
                </Grid2>
            <Grid2 item xs={1.5}>
                <Button 
                variant='outlined'
                onClick={()=> {
                    window.location.href = "https://gather.town/app/QUkwAkENtpBq8fvW/ILTAcademy"
                }}>
                    Live Virtual Academy
                </Button>
                <Button 
                variant='outlined'
                onClick={()=> {
                    window.location.href = "https://app.mural.co/invitation/mural/iltstudios1127/1643835923197?sender=uad537750285006409c4e5090&key=41cede5b-6c1a-4e08-bafe-7f708491dcc2"
                }}>
                    Community Board
                </Button>
                <Button 
                variant='outlined'
                onClick={()=> {
                    window.location.href = "https://iltacademy-founders.slack.com/"
                }}>
                    Slack
                </Button>

            </Grid2>
            </Grid2>
            </Box>
               </ThemeProvider>
        
    )
}

export default UserDashboard;