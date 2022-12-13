import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function CohortDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    // const cohorts = useSelector(store => store.cohorts)
    const students = useSelector(store => store.cohortStudents); //all students in selected cohort
    const seriesByCohort = useSelector(store => store.cohortSeries); // all series which contains junction tables to compare against current cohort
    const series = useSelector(store => store.series);

    useEffect(() => {
        dispatch({
            type:'FETCH_COHORT_STUDENTS',
            payload: params.cohortId
        })

        dispatch({
            type: 'FETCH_COHORT_SERIES',
            payload: params.cohortId
        })

        dispatch({
            type: 'FETCH_SERIES'
        });


    },[params.cohortId])

    console.log('🎈Cohort Details params.id is ', params.cohortId);

   
    return(
        <>
        <h1>working on it</h1>
       
           {/* { seriesByCohort.map(seriesInfo => {
                if(seriesInfo.cohortId == params.cohortId){
                    return(
                      <h3>{seriesInfo.seriesName}</h3>
                    )
                }
               
            })
           } */}

           { series.map(serial => {
               seriesByCohort.map(seriesInfo => {
                console.log(`serial.id is ${serial.id} AND seriesInfo.seriesId is ${seriesInfo.seriesId } AND seriesInfo.cohortId is ${seriesInfo.cohortId} AND params.cohortId is ${params.cohortId}`)
                if(serial.id == seriesInfo.seriesId && seriesInfo.cohortId == params.cohortId){
                    console.log('true@!!!!!!!!!)')
                    return (
                        <p>true</p>
                    )
                }
               })
               

           })}
       
        </>
    )

}

export default CohortDetails;