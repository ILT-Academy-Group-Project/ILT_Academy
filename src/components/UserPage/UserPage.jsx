import React from 'react';

// import { useEffect, useState } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepButton from '@mui/material/StepButton';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import OrientationStep from '../Orientation/OrientationStep';
// import HHHimage from '../Hacker/HHHimage';

function UserPage() {

  // const user = useSelector((store) => store.user);

  
  

  return (
    <div className="container">
      {/* <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p> */}
      <OrientationStep/>
      
      {/* <LogOutButton className="btn" /> */}
      {/* //<HHHimage/> */}
    </div>

  );
}

// this allows us to use <App /> in index.js
export default UserPage;
