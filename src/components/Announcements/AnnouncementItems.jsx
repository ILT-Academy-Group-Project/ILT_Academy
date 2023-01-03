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
    Grid,
    Typo
} from '@mui/material'

function AnnouncementItems({announcement}){

    //case editMode = true
    return(
        <div className='announcementContentField'>
            <Grid container spacing ={2}>
                <Grid item sm={.5}></Grid>
                <Grid item sm={11}>
                    <h3>{announcement.title}</h3>  
                    <p>{announcement.createdDate}</p>
                </Grid>
                <Grid item sm={.5}>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item sm={1}></Grid>
                <Grid item sm={10}>
                    
                    <div>
                        <p className='announcementContent'>
                            {announcement.content}
                        </p>
                    </div>
                    
                </Grid>
                <Grid item sm={1}></Grid>
            </Grid>
        </div>
        )
}

export default AnnouncementItems;