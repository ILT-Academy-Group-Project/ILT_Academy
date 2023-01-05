import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import moment from "moment/moment";
import { PrimaryMainTheme } from '../PrimaryMainTheme/PrimaryMainTheme';
import { ThemeProvider } from '@mui/system';

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
    Typography
} from '@mui/material'

function AnnouncementItems({announcement}){

    //case editMode = true
    return(
        <>
        <ThemeProvider theme={PrimaryMainTheme}>
            <Grid container spacing ={2}>
                <Grid item sm={.5}></Grid>
                <Grid item sm={11}>
                    <Typography
                    variant='h3'
                    color='primary.main'>
                        {announcement.title}
                    </Typography>  
                    <Typography
                    variant='body1'>
                        {moment(announcement.createdDate).format('MMMM DD YYYY, h:mm:ss a')}</Typography>
                </Grid>
                <Grid item sm={.5}>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item sm={1}></Grid>
                <Grid item sm={10}>
                    <Typography
                    variant='body2'>
                        {announcement.content}
                    </Typography>
                </Grid>
                <Grid item sm={1}></Grid>
            </Grid>
            </ThemeProvider>
        </>
        )
}

export default AnnouncementItems;