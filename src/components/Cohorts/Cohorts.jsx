import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';




function Cohorts() {
    const dispatch = useDispatch();
    const cohorts = useSelector(store => store.cohorts);
    // FETCH cohorts
    useEffect(() => {
        dispatch({
            type:'FETCH_COHORTS'
        })

    }, [])

    console.log('cohorts is ', cohorts);

    return (
        <>
        {cohorts.map(cohort => (
            <h1>{cohort.cohortName}</h1>
        ))}
        </>
    )
}

export default Cohorts;