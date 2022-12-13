import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Box,  } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

import { useHistory } from 'react-router-dom';



function Series() {
    const dispatch = useDispatch();
    const history = useHistory();
    const series = useSelector(store => store.series);
    //Create Series Modal state 
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

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
            <Button
            variant='outlined'
            onClick={() => setOpen(true)}
             >+ Add Series
            </Button>

            {/* ADD SERIES MODAL */}
            <Modal 
            open={open}
            onClose={handleClose}>
                <Box sx={style} >
                    <TextField 
                    // value
                    // onChange dispatch
                   
                    variant="outlined"
                    multiline
                    rows={4}
                    placeholder="add series"/>
                </Box>

            </Modal>
        </>
    )
};

export default Series;