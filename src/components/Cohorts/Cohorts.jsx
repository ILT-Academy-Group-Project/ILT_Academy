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

    const graduateCohort = (cohortId) => {
        // console.log('in deleteCohort', cohortId);
        //confirm deletion
        Swal.fire({
            title: 'Are you sure you want to graduate this cohort?',
            icon: 'warning',
            iconColor: 'red',
            showCancelButton: true,
            confirmButtonText: 'Yes, graduate the cohort!',
            confirmButtonColor: 'red',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
            html: "<h5 style='font-size:22px ;color:red'>You won't be able to revert this!</h5>"
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(            
            'The Cohort Graduated!'
            )
            //dispatch delete/graduate cohort request to saga
            dispatch({
                type: 'GRADUATE_COHORT',
                payload: cohortId
            })
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            Swal.fire(
            'Cancelled'
            )
        }
        })        
    }

    return (
        <>
        
        <ThemeProvider theme={PrimaryMainTheme}>
            {cohorts.map(cohort => (

                <Grid2 item xs={6} sx={{}} className='cohortCard'
                    key={cohort.id}>
                    <Card sx={{margin: 'auto', width: 1, backgroundColor: 'secondary'}}>
                        <Card sx={{ width:1, margin: 'auto', backgroundColor: 'secondary' }} >
                            <CardActionArea onClick={() => history.push(`/admin/cohort/${cohort.id}`)}>
    
                                <CardMedia
                                    component="img"
                                    // height="140"
                                    image="/images/ilt.png"
                                    alt="something cool"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h3" component="div" color='primary.main' sx={{}}>
                                    {cohort.cohortName}
                                    </Typography>
    
                                    <Typography variant="body2" color="primary.main">
                                    Cohort Access Code: {cohort.accessCode}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        <Button 
                                sx={{ textAlign:'right', width: 1}} 
                                variant='contained' 
                                color='primary'
                                onClick={()=>graduateCohort(cohort.id)}
                            >
                            Graduate Cohort
                        </Button>
                    </Card>
                </Grid2>

            ))}

            {/* form section */}
            <Grid2 item xs={6} sx={{}} className='cohortCard'>
                <Card sx={{ maxWidth: 345, margin: 'auto', backgroundColor: 'secondary' }} >
                    <CardActionArea onClick={()=>setOpen(!open)}>
                        <CardMedia
                            component="img"
                            // height="140"
                            image="/images/ilt.png"
                            alt="something cool"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div" color='primary' sx={{}}>
                            Create Cohort
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>                
            </Grid2>
        </ThemeProvider>
        {/* ADD COHORT MODAL */}
        <Modal 
            open={open}
            onClose={handleClose}>
                <Box sx={style} >
                    <form onSubmit={createCohort}>
                        <label>Cohort Name</label>
                        <Input 
                            type='text' 
                            placeholder='cohortcode'
                            value={cohortName}
                            onChange={(evt)=>setCohortName(evt.target.value)}
                        />
                        <label>Cohort Code</label>
                        <Input 
                            type='text' 
                            placeholder='cohortcode'
                            value={accessCode}
                            onChange={(evt)=>setAccessCode(evt.target.value)}
                        />
                        <Button type='submit'>Create Cohort</Button>
                    </form>
                </Box>

            </Modal>
        </>
    )
}

export default Cohorts;