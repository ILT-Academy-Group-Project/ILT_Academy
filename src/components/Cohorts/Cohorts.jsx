import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { ThemeProvider } from '@mui/system';
import { PrimaryMainTheme } from '../PrimaryMainTheme/PrimaryMainTheme';
import './Cohorts.css';
import { Input } from '@mui/material';
import Modal from '@mui/material/Modal';
import CohortsItem from './CohortsItem';
//sweet alerts import
const Swal = require('sweetalert2')



function Cohorts() {
    const dispatch = useDispatch();
    const history = useHistory();

    const cohorts = useSelector(store => store.cohorts.cohortReducer);
    // FETCH cohorts

    //modal controls, opens and handles close
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    //state for creation values when creating a new cohort
    const [cohortName, setCohortName] = useState('');
    const [accessCode, setAccessCode] = useState('');

    //modal style
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

    // FETCH cohorts for map fn

    useEffect(() => {
        dispatch({
            type: 'FETCH_COHORTS'
        })
    }, [])

    // console.log('cohorts is ', cohorts);

    const createCohort = (evt) => {
        evt.preventDefault();
        // console.log('in createCohort');
        dispatch({
            type: 'CREATE_COHORT',
            payload:{
                cohortName,
                accessCode
            }
        })
        //empty fields
        setAccessCode('');
        setCohortName('');
        handleClose();
    }

    return (
        <>
        
        <ThemeProvider theme={PrimaryMainTheme}>
        <Typography
            variant='h2'
            color='secondary.main'
            sx={{width:600}}>
                Cohorts
        </Typography>
            {cohorts.map((cohort, i) => {
                return (
                    <CohortsItem key={i} cohort={cohort}/>
                )
            })}

            {/* form section */}
        <Grid2 item xs={6} sx={{}} className='cohortCard'>
            <Button sx={{ maxWidth: 345, minHeight:100, margin: 'auto', backgroundColor: 'secondary' }} 
                onClick={()=>setOpen(!open)}
                color='primary'
                // fullWidth='true'
                variant='outlined'>
                <Typography
                variant='h3'>
                + Add Cohort
                </Typography>
                
            </Button>               
        </Grid2>
     
        {/* ADD COHORT MODAL */}
        <Modal 
            open={open}
            onClose={handleClose}>
                <Box sx={style} >
                    <form onSubmit={createCohort}>
                        <label>Cohort Name&nbsp;</label>
                        <Input 
                            type='text' 
                            placeholder=''
                            value={cohortName}
                            onChange={(evt)=>setCohortName(evt.target.value)}
                        />
                        <label>Cohort Code&nbsp;</label>
                        <Input 
                            type='text' 
                            placeholder=''
                            value={accessCode}
                            onChange={(evt)=>setAccessCode(evt.target.value)}
                        />
                        <Button type='submit'
                        variant='outlined'>
                            <Typography
                            
                            >
                            Add Cohort
                            </Typography>  
                        </Button>
                    </form>
                </Box>

            </Modal>
        </ThemeProvider>
        </>
    )
}

export default Cohorts;