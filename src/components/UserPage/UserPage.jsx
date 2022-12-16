import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OrientationStep from '../Orientation/OrientationStep'

function UserPage() {


  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const orientation = useSelector((store) => store.orientation);
  const [activeStep, setActiveStep] = useState(user.oriented);
  const [completed, setCompleted] = useState({});


  useEffect(() => {
    dispatch({
      type: 'FETCH_ORIENTATION',
      // payload: user.oriented
    })

  }, []);

  const totalSteps = () => {
    return orientation.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
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
      isLastStep() && !allStepsCompleted() ? orientation.findIndex((step, i) => !(i in completed)) : activeStep + 1;
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
    })

    console.log('USER ORIENTATION STEP', user.oriented);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    dispatch({
      type: 'EDIT_CURRENT_STEP',
      payload: {
        step: 0,
        id: user.id
      }
    })
  };

  // const orientationStep = () => {

  // }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
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
        <div>
          {allStepsCompleted() ? (
            <>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </>
          ) : (
            <>
              <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                Step {activeStep + 1}
              </Typography>
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
      </Box>
      {/* {orientationStep(user.oriented)} */}
      <OrientationStep step={activeStep}/>
      <LogOutButton className="btn" />
    </div>

  );
}

// this allows us to use <App /> in index.js
export default UserPage;
