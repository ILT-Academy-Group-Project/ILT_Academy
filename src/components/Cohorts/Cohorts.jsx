import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';




function Cohorts() {
    const dispatch = useDispatch();
    // FETCH cohorts
    useEffect(() => {
        dispatch({
            type:'FETCH_COHORTS'
        })

    }, [])

    
    return (
        <></>
    )
}

export default Cohorts;