import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';



function Modules() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    useEffect(() =>{
        dispatch({
            type: 'FETCH_MODULES',
            payload: params.id
        }) 
    },[])

    return(
        <>
        </>
    )
}

export default Modules;