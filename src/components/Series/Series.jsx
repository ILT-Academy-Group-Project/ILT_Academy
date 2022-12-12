import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Series() {
    const dispatch = useDispatch();
    const series = useSelector(store => store.series);

    useEffect(() => {
        dispatch({
            type: 'FETCH_SERIES'
        });

    }, []);

    return (
        <>
            {series.map(serial => (
                <h1>{serial.seriesName}</h1>
            ))}
        </>
    )
};

export default Series;