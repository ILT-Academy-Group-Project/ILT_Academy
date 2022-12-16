import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OrientationDetails from './OrientationDetails';

function OrientationStep(step) {

    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const orientation = useSelector((store) => store.orientation);

    // console.log('STEP TO MY MFIN LOO', step.step)
    // console.log('ORIENTATION', orientation[2].step)

    return (
        <>
            {orientation.map(index => {
                if (index.step === step.step) {
                    
                    return (
                        <OrientationDetails step={step.step} />
                        // <Card sx={{ maxWidth: 745 }}>
                        //     <CardMedia
                        //         component="video"
                        //         alt="green iguana"
                        //         height="140"
                        //         src={index.video}
                        //     />
                        //     {console.log}
                        //     <CardContent>
                        //         <Typography gutterBottom variant="h5" component="div">
                        //             {index.name}
                        //         </Typography>
                        //         <Typography variant="body2" color="text.secondary">
                        //            {index.content}
                        //         </Typography>
                        //     </CardContent>
                        //     <CardActions>
                        //         <Button size="small">Share</Button>
                        //         <Button size="small">Learn More</Button>
                        //     </CardActions>
                        // </Card>
                    )

                }
            })}
        </>
    )
}

export default OrientationStep