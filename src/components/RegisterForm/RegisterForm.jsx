import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { ThemeProvider } from '@mui/material';
import { PrimaryMainTheme } from '../PrimaryMainTheme/PrimaryMainTheme';
import { Button } from '@mui/material';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const errors = useSelector((store) => store.errors);
    const dispatch = useDispatch();


    const registerUser = (event) => {
    event.preventDefault();

    if(password===password2)
    {dispatch({
        type: 'REGISTER',
        payload: {
        username: username,
        password: password,
        accessCode: accessCode,
        },
    });}
    else{
        alert('Passwords Do Not Match!');
    }
    }; // end registerUser

    //accessCode test log
    // console.log('accessCode', accessCode);

    return (
    <ThemeProvider theme={PrimaryMainTheme}>
        <form className="formPanel" onSubmit={registerUser}>
            <h2>Register User</h2>
            {errors.registrationMessage && (
            <h3 className="alert" role="alert">
                {errors.registrationMessage}
            </h3>
            )}
            <div>
            <label htmlFor="username">
                Username:
                <input
                type="text"
                name="username"
                value={username}
                required
                onChange={(event) => setUsername(event.target.value)}
                />
            </label>
            </div>
            <div>
            <label htmlFor="password">
                Password:
                <input
                type="password"
                name="password"
                value={password}
                required
                onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            </div>
            <div>
            <label htmlFor="password">
                Confirm Password:
                <input
                type="password"
                name="password"
                value={password2}
                required
                onChange={(event) => setPassword2(event.target.value)}
                />
            </label>
            </div>
            {/* access code input */}
            <div>
            <label htmlFor="access code">
                Access Code:
                <input
                type="accessCode"
                name="accessCode"
                value={accessCode}
                required
                onChange={(event) => setAccessCode(event.target.value)}
                />
            </label>
            </div>
            <div>
            <Button type='submit' variant='contained'>Register</Button>
            </div>
        </form>
    </ThemeProvider>
    );
}

export default RegisterForm;
