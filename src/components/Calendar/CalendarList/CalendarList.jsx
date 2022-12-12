import { useState, useEffect, React,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CalendarItem from "../CalendarItem/CalendarItem";


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
            <h1>Meowmeow</h1>
            {/* MAP EVENTS */}
            <ul>
                {events.map(event =>{
                    return (
                        <CalendarItem key={event.etag} event={event}/>
                    )
                })}
            </ul>
        </>
    )
};

export default CalendarList;