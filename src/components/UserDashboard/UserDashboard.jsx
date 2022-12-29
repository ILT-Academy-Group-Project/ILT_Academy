import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function UserDashboard(){
    //get user info for cohortId
    const user = useSelector((store) => store.user);
    //setup dispatch and useHistory
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        //get assigned series for the render;
        dispatch({
            type: 'FETCH_COHORT_SERIES',
            payload: user.cohortId
        })

    },[])


    return(
        <h1>MEOW</h1>
    )
};

export default UserDashboard;