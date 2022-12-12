import { useState, useEffect, React } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


function CalendarList(){
    //setup dispatch
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({
            type: 'FETCH_EVENTS'
        })

    }, [])
    


    return (
        <>
            <h1>Meowmeow</h1>
        </>
    )
};

export default CalendarList;