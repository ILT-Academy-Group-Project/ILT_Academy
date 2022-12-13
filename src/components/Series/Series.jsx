import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { ThemeProvider } from '@mui/system';
import { PrimaryMainTheme } from '../PrimaryMainTheme/PrimaryMainTheme';



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
        <ThemeProvider theme={PrimaryMainTheme}>
        <h1>Series</h1>
            {series.map(serial => (
                <Grid2 direction='column'
                key={serial.seriesName}>
                    <Button
                    sx={{minHeight: 100, fontSize: 60}}
                    
                    color='primary'
                    fullWidth={true}
                        variant='outlined'
                        onClick={() => history.push(`/admin/modules/${serial.id}`)}>{serial.seriesName}
                    </ Button>
                </Grid2>

            ))}
            </ThemeProvider>
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