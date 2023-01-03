import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
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

    useEffect(() => {

        user.accessLevel === 2 ? history.push('/home')
            : user.hipsterInterest !== 0
                && user.hipsterSkill !== 0
                && user.hackerInterest !== 0
                && user.hackerSkill !== 0
                && user.hustlerInterest !== 0
                && user.hustlerSkill !== 0 ? history.push('/home') : null;

    }, []);

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


    return (
        <>
            <HHHimage />
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
            <Typography variant='h4'>
                Step 01: Understanding the founder skills you enjoy
            </Typography>
            <Typography variant='subtitle1'>
                On a scale of 1 to 10, 1 being, I don't enjoy to 10 being, I could do this all day long and never get sick of it.
                It's important to understand and identify what elements of being a founder you enjoy from the elements you don't enjoy doing.
            </Typography>
            <Typography variant='h4'>Hipstering</Typography>
            <Typography variant='subtitle1'>
                Understanding the market place/industry well, developing the creatie vision, and sharing how this idea could work to serve the market needs.
            </Typography>
            <Box sx={{ width: 500 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Typography id="input-slider" gutterBottom>
                            Don't Enjoy
                        </Typography>
                    </Grid>
                    <Grid item xs>
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
                    </Grid>
                    <Grid item>
                        <Typography id="input-slider" gutterBottom>
                            Enjoy
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            <Typography variant='h4'>Hacking</Typography>
            <Typography variant='subtitle1'>
                Finding ways to make this idea come to life. I enjoy building, tinkering and using tools / processes to build, create and can make products real.
            </Typography>
            <Box sx={{ width: 500 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Typography id="input-slider" gutterBottom>
                            Don't Enjoy
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Slider
                            aria-label="Hipster"
                            defaultValue={1}
                            getAriaValueText={setHackerInterest}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={10}
                        />
                    </Grid>
                    <Grid item>
                        <Typography id="input-slider" gutterBottom>
                            Enjoy
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Typography variant='h4'>Hustling</Typography>
            <Typography variant='subtitle1'>
                Selling the vision, bringing people together, finding the customers and partners and driving customer demand. This is all about getting people to say "yes!"
            </Typography>
            <Box sx={{ width: 500 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Typography id="input-slider" gutterBottom>
                            Don't Enjoy
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Slider
                            aria-label="Hipster"
                            defaultValue={1}
                            getAriaValueText={setHustlerInterest}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={10}
                        />
                    </Grid>
                    <Grid item>
                        <Typography id="input-slider" gutterBottom>
                            Enjoy
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Typography variant='h4'>
                Step 02: Unpacking your founder skill level
            </Typography>
            <Typography variant='subtitle1'>
                On a scale of 1 to 10, 1 being, I have little experience or expertise to 10 being, I could do this in my sleep.
                There is no wrong answer here. Many of the best startups were not founded by experts.
            </Typography>
            <Typography variant='h4'>Hipstering</Typography>
            <Typography variant='subtitle1'>
                My level of industry experience or expertise.
            </Typography>
            <Box sx={{ width: 500 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Typography id="input-slider" gutterBottom>
                            Don't Enjoy
                        </Typography>
                    </Grid>
                    <Grid item xs>
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
                    </Grid>
                    <Grid item>
                        <Typography id="input-slider" gutterBottom>
                            Enjoy
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Typography variant='h4'>Hacking</Typography>
            <Typography variant='subtitle'>
                My knowledge and experience building prototypes and final versions of your idea
            </Typography>
            <Box sx={{ width: 500 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Typography id="input-slider" gutterBottom>
                            Don't Enjoy
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Slider
                            aria-label="Hipster"
                            defaultValue={1}
                            getAriaValueText={setHackerSkill}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={10}
                        />
                    </Grid>
                    <Grid item>
                        <Typography id="input-slider" gutterBottom>
                            Enjoy
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Typography variant='h4'>Hustling</Typography>
            <Typography variant='subtitle1'>
                My experience in Sales / Marketing / Business
            </Typography>
            <Box sx={{ width: 500 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Typography id="input-slider" gutterBottom>
                            Don't Enjoy
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Slider
                            aria-label="Hipster"
                            defaultValue={1}
                            getAriaValueText={setHustlerSkill}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={10}
                        />
                    </Grid>
                    <Grid item>
                        <Typography id="input-slider" gutterBottom>
                            Enjoy
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Button onClick={submit}>Submit</Button>
        </>
    )
}

export default Hacker;