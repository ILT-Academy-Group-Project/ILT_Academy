import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AnnouncementItems from './AnnouncementItems';
import CreateAnnouncement from './CreateAnnouncement';
//sweet alert import
const Swal = require('sweetalert2')


//MUI imports
import {
    TextareaAutosize,
    Input,
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Grid
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
        <div>
            <header>
                <h3>Announcements</h3>         
            </header>
                {announcements.map((announcement, i) => 
                    <AnnouncementItems 
                    //assign key
                    key={i}
                    //pass state
                    announcement={announcement}
                    />
                )}                        
            {user.accessLevel ===2 ?
            <CreateAnnouncement />
            :
            null
            }
        </div>
  
  

    );
}

export default Announcements;