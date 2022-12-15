import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function CohortModules() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const modules = useSelector(store => store.modules);

    //create new variable for modules assigned to this cohort
    let newModulesObject = modules;
    // for(let i=0; i<newModulesObject.length; i++){
    //     if(cohortModules[i]){
    //         newModulesObject[i].cohortId = cohortModules[i].cohortId
    //     }
    // }

    useEffect(() => {
        // dispatch({
        //     type:'FETCH_COHORT_STUDENTS',
        //     payload: params.cohortId
        // })

        dispatch({
            type: 'FETCH_COHORT_SERIES',
            payload: params.cohortId
        })

        dispatch({
            type: 'FETCH_SERIES'
        });

        dispatch({
            type: 'FETCH_MODULES', 
            payload: params.seriesId
        })

        dispatch({
            type:'FETCH_COHORT_MODULES',
            payload: {
                cohortId:params.cohortId,
                seriesId:params.seriesId
            }
        })


    },[params.cohortId])

    return <h1>Cohort Modules Here</h1>
}

export default CohortModules;
