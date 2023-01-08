import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import { PrimaryMainTheme } from '../PrimaryMainTheme/PrimaryMainTheme';
import { Add } from '@mui/icons-material'



function Series() {
    const dispatch = useDispatch();
    const history = useHistory();
    const series = useSelector(store => store.series);
    //Create Series Modal state and fn
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

            <ThemeProvider theme={PrimaryMainTheme}>
                <Grid2 container spacing={2}>
                    <Grid2 direction='column'>
                        <Typography
                        variant='h2'
                        color='secondary.main'>
                            Curriculum
                        </Typography>
                        <Button
                            sx={{ minHeight: 100 }}
                            color='secondary'
                            fullWidth='true'
                            variant='contained'
                            onClick={() => history.push(`/admin/orientation/list`)}>
                               <Typography
                            variant='h3'>
                            Orientation
                            </Typography>
                        </ Button>
                        {series.map(serial => (

                            <Button
                                key={serial.id}
                                sx={{ minHeight: 100, fontSize: 60, mt: 2}}
                                color='primary'
                                fullWidth='true'
                                variant='contained'
                                onClick={() => history.push(`/admin/modules/${serial.id}`)}>
                                    <Typography variant='h3' sx={{fontSize:60}}>
                                        {serial.seriesName}
                                    </Typography>
                            </ Button>
                        ))}
                        <Button
                            sx={{ minHeight: 100, mt: 2 }}
                            color='primary'
                            fullWidth='true'
                            variant='outlined'
                            onClick={() => setOpen(true)}
                            >
                            < Add />
                            <Typography
                            variant='h3'>
                             Add Series
                            </Typography>
                        </ Button>
                    </Grid2>
                </Grid2>
            </ThemeProvider>

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
}

export default Series;