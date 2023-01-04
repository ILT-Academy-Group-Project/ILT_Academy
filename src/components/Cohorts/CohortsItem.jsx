import { useState, useEffect, React,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid, CardContent, CardActionArea, Button } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { PrimaryMainTheme } from "../PrimaryMainTheme/PrimaryMainTheme";
import { ThemeProvider } from '@mui/system';
import { Typography, Card, Link } from '@mui/material'
import { Input } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
const Swal = require('sweetalert2')

function CohortsItem({cohort}) {
    const dispatch = useDispatch();
    const history = useHistory();

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
        <ThemeProvider theme={PrimaryMainTheme}>
        <Grid2 item xs={6} sx={{}} className='cohortCard'
        key={cohort.id}>
        <Card sx={{margin: 'auto', width: 1, }}>
            <Card sx={{ width:1, margin: 'auto', }} >
                <CardActionArea  sx={{bgcolor: 'primary.main'}}
                onClick={() => history.push(`/admin/cohort/${cohort.id}`)}>

                  
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div" color='tertiary.main' sx={{}}>
                        {cohort.cohortName}
                        </Typography>

                        <Typography variant="body2" color="primary.contrastText">
                        Code: {cohort.accessCode}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Button 
                    sx={{ textAlign:'right', width: 1}} 
                    variant='contained' 
                    color='btnLight'
                    onClick={()=>graduateCohort(cohort.id)}
                >
                    <Typography
                    variant='body1'
                    fontWeight='bold'
                    color='secondary.main'>
                    Graduate
                    </Typography>
               
            </Button>
        </Card>
    </Grid2>
     
    </ThemeProvider>
    )

}

export default CohortsItem;