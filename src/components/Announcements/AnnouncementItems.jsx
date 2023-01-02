import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

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

function AnnouncementItems({announcement}){

    //case editMode = true
    return(
        <>
            <Grid container spacing ={2}>
                <Grid item sm={2}></Grid>
                <Grid item sm={8}>
                    <h3>{announcement.title}</h3>  
                    <p>{announcement.createdDate}</p>
                </Grid>
                <Grid item sm={2}>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item sm={2}></Grid>
                <Grid item sm={8}>
                    
                    <div className='announcementContentField'>
                        <p>
                            {announcement.content}
                        </p>
                    </div>
                    
                </Grid>
                <Grid item sm={2}></Grid>
            </Grid>
        </>
        )
}

export default AnnouncementItems;