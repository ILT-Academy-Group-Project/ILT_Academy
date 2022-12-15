import { array } from 'prop-types';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function CohortModules() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const modules = useSelector(store => store.modules); //modules for THIS series 
    const cohortModules = useSelector(store => store.cohortModules);

    //create new variable for modules assigned to this cohort
    
    
    
   

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

    let arrayToCheck = [];
    cohortModules.map(publishedModule => {
        arrayToCheck.push(publishedModule.moduleId)
        console.log('array to check is ', arrayToCheck)
    })


    return (
        <>
        {/* published modules */}
        {cohortModules.map(publishedModule =>{
            return(
                <h1
                key={publishedModule.moduleName}>
                    {publishedModule.moduleName[0]}</h1>
            )
        })}
        {
              modules.map(module => {
                if(arrayToCheck.includes(module.id)){
                    return true
                }
                else{
                    console.log('unpublished module ', module.name)
                    return(
                        <h3>{module.name}</h3>
                    )
                }
            })
        }

        </>
    )
}

export default CohortModules;
