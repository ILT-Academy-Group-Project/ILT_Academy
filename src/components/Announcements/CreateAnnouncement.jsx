import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AnnouncementItems from './AnnouncementItems';

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

function CreateAnnouncement(){

        //useState

    //callbacks
    const history = useHistory();
    const dispatch = useDispatch()

    const submitAnnouncement = (announcement) => {
        // console.log('in submitAnnouncement fn');
        //send announcement to DB
        console.log('announcement', announcement);
            dispatch({
                type: 'CREATE_ANNOUNCEMENT',
                payload: announcement
            })
    }


    return(
        <form>
                <h3>Make New Announcement</h3>
                <Grid container spacing ={2}>
                    <Grid item sm={2}></Grid>
                    <Grid item sm={8}>
                        <Input 
                            type='Text' 
                            placeholder='Announcement' 
                            style={{ width: 200, fontSize:20, height: 30}}
                            // value={announcementToEdit.title} // update local state                        
                            // onChange={evt => {
                            //     dispatch({
                            //         type: 'UPDATE_ANNOUNCEMENT',
                            //         payload:{
                            //             title: evt.target.value
                            //         }
                            //     })
                            // }} 
                            required
                        />
                        
                    </Grid>
                    <Grid item sm={2}></Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item sm={2}></Grid>
                    <Grid item sm={8}>
                        <textarea
                                className='announcementTextArea'
                                required
                                placeholder="Announcement"
                                // value={announcementToEdit.content} // update local state                        
                                
                        />
                        
                        <button onClick={() => submitAnnouncement()}>Create Announcement</button>
                    </Grid>
                    <Grid item sm={2}></Grid>
                </Grid>
            </form>
    )
}


export default CreateAnnouncement;