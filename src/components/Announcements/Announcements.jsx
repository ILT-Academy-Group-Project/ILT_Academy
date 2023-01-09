import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AnnouncementItems from './AnnouncementItems';
import CreateAnnouncement from './CreateAnnouncement';
import { PrimaryMainTheme } from '../PrimaryMainTheme/PrimaryMainTheme';
import { ThemeProvider } from '@mui/system';


//css
import './announcements.css';


//MUI imports
import {
   
    Card,
    Typography
} from '@mui/material'


function Announcements() {
    // console.log('in announcements');

    //state
    const user = useSelector((store) => store.user);
    const announcements = useSelector(store => store.announcements.announcementsReducer)


    const dispatch = useDispatch()
    //useEffect
    useEffect(()=>{
        dispatch ({
            type: "FETCH_ANNOUNCEMENTS",            
        });
    },[]);

    return (
       <>
        <ThemeProvider theme={PrimaryMainTheme}>
        <Typography
            variant='h2'
            color='secondary.main'
            sx={{width:600, mt:8}}>
                Announcements
        </Typography>
            <Card sx={{mb:8}}>
            {announcements.map((announcement, i) => 
                    <AnnouncementItems 
                    //assign key
                    key={i}
                    //pass state
                    announcement={announcement}
                    />
                )}  
            </Card>
                                      
            {user.accessLevel ===2 ?
            <CreateAnnouncement />
            :
            null
            }
        </ThemeProvider>
        </>
    );
}

export default Announcements;