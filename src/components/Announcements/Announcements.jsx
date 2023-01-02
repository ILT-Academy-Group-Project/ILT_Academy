import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AnnouncementItems from './AnnouncementItems';
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
    const announcements = useSelector(store => store.announcements.announcementsReducer)

    //useState to track if an announcement is being edited
    const [updateMode, setUpdateMode] = useState(false)
    //callbacks
    const history = useHistory();
    const dispatch = useDispatch()

    //useEffect
    useEffect(()=>{
        dispatch ({
            type: "FETCH_ANNOUNCEMENTS",            
        });
    },[]);

    const submitAnnouncement = () => {
        console.log('in submitAnnouncement fn');

    }

    return (
        
        <div>
            <header>
                <h3>Announcements</h3>         
            </header>
            <form>
                        {announcements.map((announcement, i) => 
                            <AnnouncementItems 
                            //assign key
                                key={i}
                                //pass fn through props                            
                                submitAnnouncement={submitAnnouncement}
                                //pass state
                                announcement={announcement}
                                //pass setEditMode
                                setUpdateMode={setUpdateMode}
                                updateMode={updateMode}
                            />
                        )}                        
            </form>
        </div>
  
  

    );
}

export default Announcements;