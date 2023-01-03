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
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

import OrientationDetails from './OrientationDetails';

function OrientationStep() {

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const orientation = useSelector((store) => store.orientation.orientationReducer);
    const [activeStep, setActiveStep] = useState(user.oriented);
    const [completed, setCompleted] = useState({});


    console.log(orientation)
    useEffect(() => {
        dispatch({
            type: 'FETCH_ORIENTATION',
            // payload: user.oriented
        })

        user.accessLevel === 2 ? history.push('/admin/dashboard') 
        : user.oriented === orientation.length ? history.push('/hipster/hacker/hustler') : null;

    }, []);

    const totalSteps = () => {
        // console.log('orientation length', orientation.length)
        return orientation.length;
    };

    const completedSteps = () => {
        // console.log('object', Object.keys(completed).length)
        // return Object.keys(completed).length;
        return user.oriented
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    // not all steps have been completed,
    // find the first step that has been completed
    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted() ? orientation.findIndex(
                (step, i) => !(i in completed)) : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };



    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);

        handleNext();

        dispatch({
            type: 'EDIT_CURRENT_STEP',
            payload: {
                step: activeStep + 1,
                id: user.id
            }
        });

        
    };

    const handleStudent = () => {

        dispatch({
            type: 'EDIT_CURRENT_STEP',
            payload: {
                step: 0,
                id: user.id
            }
        })
    };

    return (
        <>
            {/* {orientation.map(index => {
                if (index.step === step.step) {

                    return (
                        <> */}
            {/* <OrientationDetails step={step.step} />
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
                        // </Card> */}




            {/* {orientationStep(user.oriented)} */}
            {/* <OrientationStep step={activeStep} /> */}
            {/* </>
                    )

                }
            })} */}
            <Box sx={{ width: '100%' }}>
                <Stepper nonLinear activeStep={activeStep}>
                    {orientation.map((label, index) => (
                        <Step key={label.id} completed={completed[index]}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
                                {label.name}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                {user.accessLevel === 1 ?
                    <div>
                        {allStepsCompleted() ? (
                            <>
                                {/* <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleStudent}>Student Portal</Button>
                                </Box> */}
                                {history.push(`/hipster/hacker/hustler`)}
                            </>
                        ) : (
                            <>
                                {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                                    Step {activeStep + 1}
                                </Typography> */}
                                <OrientationDetails step={activeStep} />
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                                        Next
                                    </Button>
                                    {activeStep !== orientation.length &&
                                        (completed[activeStep] ? (
                                            <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                                Step {activeStep + 1} already completed
                                            </Typography>
                                        ) : (
                                            <Button onClick={handleComplete} disabled={user.oriented != activeStep} >

                                                {completedSteps() === totalSteps() - 1
                                                    ? 'Finish'
                                                    : 'Complete Step'}

                                            </Button>
                                        ))}
                                </Box>
                            </>
                        )}
                        
                    </div> 
                    : <Button>Add Step</Button>}
            </Box>
        </>
    )
}

export default OrientationStep