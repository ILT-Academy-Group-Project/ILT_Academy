import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function CohortSubmissions() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        dispatch({
            type: 'FETCH_ASSIGNMENT_SUBMISSIONS',
            payload: {
                cohortId:params.cohortId,
                assignmentId:params.assignmentId
            }
        })
    })
    return(
        <h1>Submissions</h1>
    )
}

export default CohortSubmissions;