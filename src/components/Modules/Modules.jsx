import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { Assignment, AssignmentSharp } from '@mui/icons-material';




function Modules() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const modules = useSelector(store => store.modules);
    const assignments = useSelector(store => store.assignments);

    console.log('🍏 params.id is THIS ', params.seriesId) 

    useEffect(() =>{
        dispatch({
            type: 'FETCH_MODULES',
            payload: params.seriesId
        }) 

        dispatch({
            type: 'FETCH_ASSIGNMENTS'
        })
    },[params.seriesId])

    return(
        <>
        {modules.map(module => (
            <>
                <h1>{module.name}</h1>
                {/* TO DO include icons for submission required AND completed */}
                <ul>
                    {assignments.map(assignment => {
                        if(assignment.moduleId === module.id) {
                            return <li>{assignment.name}</li>
                        }
                    })}
                </ul>
                <Button onClick={() => history.push('/admin/create/assignment')}>Add assignment</Button>
            </>
        ))}
        </>
    )
}

export default Modules;