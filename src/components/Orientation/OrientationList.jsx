
import { useState, useRef, useEffect } from "react";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { useParams, useHistory } from 'react-router-dom';
import { Interweave, Markup } from 'interweave';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
const Swal = require('sweetalert2');
import './Orientation.css';

function OrientationList(){
    const orientationList = useSelector((store) => store.orientation.orientationReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();


    useEffect(() => {
        dispatch({
            type: 'FETCH_ORIENTATION'
        });
    },[]);


    const deleteStep = (id) => {

        //sweet alert for delete confirmation
        Swal.fire({
            title: 'Are you sure you want to delete this post?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            iconColor: 'red',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: 'red',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Assignment has been deleted.'
                )
                //dispatch delete request to saga
                dispatch({
                    type: 'DELETE_ORIENTATION',
                    payload: id,
                });
                //after delete head home
                // history.push(`/admin/modules/${assignment.seriesId}`)
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                    'Cancelled'
                )
            }
            
        })

        

        // history.push('')
    }

    return(
        <ThemeProvider theme={PrimaryMainTheme}>
            
            {orientationList.map(step => (
                <Grid2 item xs={6} sx={{}} className='cohortCard'>
                    <Card sx={{ maxWidth: 345, mt: 5, mb: 'auto', mr: 'auto', ml: 'auto', backgroundColor: 'secondary.light' }} >
                        <CardActionArea onClick={() => history.push(`/admin/orientation/edit/${step.id}`)}>
                            <CardMedia
                                component="img"
                                // height="140"
                                image="/images/ilt.png"
                                alt="something cool"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h3" component="div" color='primary.light' sx={{}}>
                                {step.name}
                                </Typography>
                                <Typography variant="body2" color="primary.main">
                                Maybe some info? Start date? End date?
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <Button onClick={() => deleteStep(step.id)}>Delete Step</Button>
                    </Card>
                    
                </Grid2>

            ))}
            <Button onClick={() => history.push(`/admin/orientation/create`)}>Add Step</Button>
            
            </ThemeProvider>
    )

}

export default OrientationList;