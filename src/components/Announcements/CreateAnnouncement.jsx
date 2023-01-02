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
    const dispatch = useDispatch();

    //use state for form inputs
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const submitAnnouncement = (evt) => {
        evt.preventDefault();
        // console.log('in submitAnnouncement fn');
        //send announcemento SAGA for axios request
            dispatch({
                type: 'CREATE_ANNOUNCEMENT',
                payload: {
                    title,
                    content
                }
            });
            setTitle('');
            setContent('');
    }


    return(
        <form  onSubmit={submitAnnouncement}>
                <h3>Make New Announcement</h3>
                <Grid container spacing ={2}>
                    <Grid item sm={2}></Grid>
                    <Grid item sm={8}>
                        <Input 
                            type='Text' 
                            placeholder='Announcement' 
                            style={{ width: 200, fontSize:20, height: 30}}
                            value={title} // update local state                        
                            onChange={evt => setTitle(evt.target.value)}
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
                                value={content} // update local state                        
                                onChange={evt => setContent(evt.target.value)}
                        />
                        
                        <button type='submit'>Create Announcement</button>
                    </Grid>
                    <Grid item sm={2}></Grid>
                </Grid>
            </form>
    )
}


export default CreateAnnouncement;