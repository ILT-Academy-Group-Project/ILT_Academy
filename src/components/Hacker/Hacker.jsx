import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import HHHimage from './HHHimage';
const Swal = require('sweetalert2');

function Hacker() {

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((store) => store.user);
    const [hipsterInterest, setHipsterI] = useState(0);
    const [hackerInterest, setHackerI] = useState(0);
    const [hustlerInterest, setHustlerI] = useState(0);
    const [hipsterSkill, setHipsterS] = useState(0);
    const [hackerSkill, setHackerS] = useState(0);
    const [hustlerSkill, setHustlerS] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    function valuetext(value) {
        // console.log('value', value)
        return `${value}`;
    }

    function setHipsterInterest(value) {
        // console.log('value', value)
        setHipsterI(value)
        return `${value}`;
    }

    function setHackerInterest(value) {
        // console.log('value', value)
        setHackerI(value)
        return `${value}`;
    }

    function setHustlerInterest(value) {
        // console.log('value', value)
        setHustlerI(value)
        return `${value}`;
    }

    function setHipsterSkill(value) {
        // console.log('value', value)
        setHipsterS(value)
        return `${value}`;
    }

    function setHackerSkill(value) {
        // console.log('value', value)
        setHackerS(value)
        return `${value}`;
    }

    function setHustlerSkill(value) {
        // console.log('value', value)
        setHustlerS(value)
        return `${value}`;
    }

    const submit = (evt) => {
        evt.preventDefault();
        console.log('in submit assignment');
        //ensure there is content in the WYSIWYG
        if (firstName === '' || lastName === '') {
            alert('Must Enter Name');
            return
        }

        const id = user.id

        console.log('firstname', firstName, 'lastname', lastName)

        //dispatch to the SAGA for serverpost route
        dispatch({
            type: 'CREATE_HIPSTER',
            payload: {
                firstName,
                lastName,
                email,
                hipsterInterest,
                hackerInterest,
                hustlerInterest,
                hipsterSkill,
                hackerSkill,
                hustlerSkill,
                id
            }
        })
        //push to modules view
        Swal.fire('Success!')
            .then((result) => {
                history.push(`/home`);
            })
    }

    const arr1 = [5, 8, 7]
    const arr2 = [1, 9, 9]

    const result = Math.max(...arr2)
    
    console.log('MATH>MAXXXXXXXX', result)


    return (
        <>
        <HHHimage/>
            <h1>Please enter your name and email</h1>
            <input
                required
                type='text'
                placeholder="First Name"
                onChange={(evt) => setFirstName(evt.target.value)}
            />
            <input
                required
                type='text'
                placeholder="Last Name"
                onChange={(evt) => setLastName(evt.target.value)}
            />
            <input
                required
                type='text'
                placeholder="Email"
                onChange={(evt) => setEmail(evt.target.value)}
            />
            <h1>Dont enjoy</h1>
            <h2>Hipstering</h2>
            <Box sx={{ width: 300 }}>
                <Slider
                    aria-label="Hipster"
                    defaultValue={1}
                    getAriaValueText={setHipsterInterest}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                />
            </Box>
            <h2>Hacking</h2>
            <Box sx={{ width: 300 }}>
                <Slider
                    aria-label="Hacker"
                    defaultValue={1}
                    getAriaValueText={setHackerInterest}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                />
            </Box>
            <h2>Hustling</h2>
            <Box sx={{ width: 300 }}>
                <Slider
                    aria-label="Hustler"
                    defaultValue={1}
                    getAriaValueText={setHustlerInterest}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                />
            </Box>
            <h1>Novice</h1>
            <h2>Hipstering</h2>
            <Box sx={{ width: 300 }}>
                <Slider
                    aria-label="Hipster"
                    defaultValue={1}
                    getAriaValueText={setHipsterSkill}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                />
            </Box>
            <h2>Hacking</h2>
            <Box sx={{ width: 300 }}>
                <Slider
                    aria-label="Hacker"
                    defaultValue={1}
                    getAriaValueText={setHackerSkill}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                />
            </Box>
            <h2>Hustling</h2>
            <Box sx={{ width: 300 }}>
                <Slider
                    aria-label="Hustler"
                    defaultValue={1}
                    getAriaValueText={setHustlerSkill}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={10}
                />
            </Box>
            <Button onClick={submit}>Submit</Button>
        </>
    )
}

export default Hacker;