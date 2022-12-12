import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';


function Series() {
    const dispatch = useDispatch();
    const history = useHistory();
    const series = useSelector(store => store.series);

    useEffect(() => {
        dispatch({
            type: 'FETCH_SERIES'
        });

    }, []);

    return (
        
        <> 
            {series.map(serial => (
                <Button 
                variant='outlined'
                onClick={() => history.push(`/admin/modules/${serial.id}`)}>{serial.seriesName}
                </ Button>
            ))}
        </>
    )
};

export default Series;