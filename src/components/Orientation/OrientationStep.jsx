import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/system';
import { PrimaryMainTheme } from '../PrimaryMainTheme/PrimaryMainTheme';
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
import { StepLabel } from '@mui/material';

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

        if(orientation.id){{
            user.accessLevel === 2 ? history.push('/home')
                : user.oriented === orientation.length ? history.push('/hipster/hacker/hustler') : null}}

    }, []);


    {user.accessLevel === 2 ? history.push('/home'): null}


    const totalSteps = () => {
        // console.log('orientation length', orientation.length)
        if (orientation.length > 0) {
            return orientation.length;
        }

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
            <ThemeProvider theme={PrimaryMainTheme}>
                <Box sx={{ width: '100%' }}>
                    {/* <Box sx={{ width: '100%', padding: 2, backgroundColor: 'secondary.main' }}> */}
                    <Stepper nonLinear activeStep={activeStep}>
                        {orientation.map((label, index) => (
                            <Step key={label.id} completed={completed[index]}>
                                <StepButton color="primary" onClick={handleStep(index)}>
                                    <Typography sx={{}} variant='body1' color="primary.dark">
                                        {label.name}
                                    </Typography>

                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                    {/* </Box> */}
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
                                    {/* <Box sx={{ width: '100%', padding: 3, }}> */}
                                    <OrientationDetails step={activeStep} />
                                    {/* </Box> */}

                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

                                        <Button
                                            color="primary"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ ml: 2 }}
                                            variant='contained'
                                        >
                                            Back
                                        </Button>
                                        <Box />
                                        <Button
                                            color="primary"
                                            onClick={handleNext}
                                            sx={{ mr: 1, ml: 2 }}
                                            variant='contained'
                                        >
                                            Next
                                        </Button>
                                        {activeStep !== orientation.length &&
                                            (completed[activeStep] ? (
                                                <Typography variant="caption" color="secondary" sx={{ display: 'inline-block' }}>
                                                    Step {activeStep + 1} already completed
                                                </Typography>
                                            ) : (
                                                <Button
                                                    variant='contained'
                                                    sx={{ml: '74%'}}
                                                    onClick={handleComplete} disabled={user.oriented != activeStep} >

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
            </ThemeProvider>
        </>
    )
}

export default OrientationStep