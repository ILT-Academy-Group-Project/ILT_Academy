import { useState, useEffect, React,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CalendarItem from "../CalendarItem/CalendarItem";
import { PrimaryMainTheme } from "../../PrimaryMainTheme/PrimaryMainTheme";
import { ThemeProvider } from '@mui/system';
import { Typography } from '@mui/material'


function CalendarList(){
    //setup dispatch
    const dispatch = useDispatch();

    //get events from store
    const events = useSelector(store => store.events.eventsReducer);
    useEffect(()=>{
        dispatch({
            type: 'FETCH_EVENTS'
        })
    }, [])
    
    // console.log('events', events);

    return (
        <>
        <ThemeProvider theme={PrimaryMainTheme}>
        <Typography gutterBottom variant='h2' color='secondary.main'>Events</Typography>
            {/* MAP EVENTS */}
                {events.map((event, i) =>{
                    return (
                        <CalendarItem key={i} event={event}/>
                    )
                })}
        </ThemeProvider>
        </>
    )
};

export default CalendarList;