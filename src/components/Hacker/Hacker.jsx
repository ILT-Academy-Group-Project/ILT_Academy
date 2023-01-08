import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory,} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import HHHimage from './HHHimage';
import { ThemeProvider } from '@mui/system';
import { PrimaryMainTheme } from '../PrimaryMainTheme/PrimaryMainTheme';
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
    const [about, setAbout] = useState('');

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
    const populateName = () => {

        setFirstName('Johnathan');
        setLastName('French');
        setEmail('Frenchie145@gmail.com');
        setAbout(`I am an enthusiastic founder who loves to spend time outside.
        My current project is focused on getting at risk youth outdoors 
        with my new app "The Urge to Wander"`)
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
                about,
                id
            }
        })
        //push to modules view
        Swal.fire({
            title: 'Success!',
            confirmButtonColor: '#f96b61'
        })
            .then((result) => {
                history.go(0);
            })
    }


    return (
        <>

            <ThemeProvider theme={PrimaryMainTheme}>
                {/* <HHHimage /> */}

                <Box marginTop={3} marginBottom={-2} display="flex"
                    justifyContent="center">
                    <img margin={2} src='/images/hipster.png'></img>
                    <img margin={2} src='/images/hacker.png'></img>
                    <img margin={2} src='/images/hustler.png'></img>
                </Box>

                <Box backgroundColor='secondary.light' sx={{ padding: 2, margin: 8 }} borderRadius={2}>
                    <Typography margin={2} color='primary.light' variant='h2'>
                        Step 01: Understanding the founder skills you enjoy
                    </Typography>
                    <Typography margin={2} color='secondary.contrastText' variant='body1'>
                        On a scale of 1 to 10, 1 being, I don't enjoy to 10 being, I could do this all day long and never get sick of it.
                        It's important to understand and identify what elements of being a founder you enjoy from the elements you don't enjoy doing.
                    </Typography>

                    <Box backgroundColor='secondary.main' sx={{ margin: 2, padding: 2 }} borderRadius={2}>
                        <Typography variant='h2' color='primary.main'>Hipstering</Typography>
                        <Typography variant='body1' color='secondary.contrastText'>
                            Understanding the market place/industry well, developing the creatie vision, and sharing how this idea could work to serve the market needs.

                        </Typography>
                        <Box sx={{ width: 500 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Typography color='secondary.contrastText' variant='body2' id="input-slider" gutterBottom>
                                        Don't Enjoy
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Slider
                                        aria-label="Hipster"
                                        defaultValue={1}
                                        getAriaValueText={setHipsterInterest}
                                        valueLabelDisplay="auto"
                                        color='primary'
                                        step={1}
                                        marks
                                        min={1}
                                        max={10}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography color='secondary.contrastText' variant='body2' id="input-slider" gutterBottom>
                                        Enjoy
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                    <Box backgroundColor='secondary.main' sx={{ margin: 2, padding: 2 }} borderRadius={2}>
                        <Typography variant='h2' color='primary.main'>Hacking</Typography>
                        <Typography variant='body1' color='secondary.contrastText'>
                            Finding ways to make this idea come to life. I enjoy building, tinkering and using tools / processes to build, create and can make products real.
                        </Typography>
                        <Box sx={{ width: 500 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Typography color='secondary.contrastText' variant='body2' id="input-slider" gutterBottom>
                                        Don't Enjoy
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Slider
                                        aria-label="Hipster"
                                        defaultValue={1}
                                        getAriaValueText={setHackerInterest}
                                        valueLabelDisplay="auto"
                                        color='primary'
                                        step={1}
                                        marks
                                        min={1}
                                        max={10}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography color='secondary.contrastText' variant='body2' id="input-slider" gutterBottom>
                                        Enjoy
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                    <Box backgroundColor='secondary.main' sx={{ margin: 2, padding: 2 }} borderRadius={2}>
                        <Typography variant='h2' color='primary.main'>Hustling</Typography>
                        <Typography variant='body1' color='secondary.contrastText'>
                            Selling the vision, bringing people together, finding the customers and partners and driving customer demand. This is all about getting people to say "yes!"
                        </Typography>
                        <Box sx={{ width: 500 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Typography color='secondary.contrastText' variant='body2' id="input-slider" gutterBottom>
                                        Don't Enjoy
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Slider
                                        aria-label="Hipster"
                                        defaultValue={1}
                                        getAriaValueText={setHustlerInterest}
                                        valueLabelDisplay="auto"
                                        color='primary'
                                        step={1}
                                        marks
                                        min={1}
                                        max={10}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography color='secondary.contrastText' variant='body2' id="input-slider" gutterBottom>
                                        Enjoy
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>

                <Box backgroundColor='secondary.light' sx={{ padding: 2, margin: 8 }} borderRadius={2}>
                    <Typography margin={2} color='primary.light' variant='h2'>
                        Step 02: Unpacking your founder skill level
                    </Typography>
                    <Typography margin={2} color='secondary.contrastText' variant='body1'>
                        On a scale of 1 to 10, 1 being, I have little experience or expertise to 10 being, I could do this in my sleep.
                        There is no wrong answer here. Many of the best startups were not founded by experts.
                    </Typography>

                    <Box backgroundColor='secondary.main' sx={{ margin: 2, padding: 2 }} borderRadius={2}>
                        <Typography variant='h2' color='primary.main'>Hipstering</Typography>
                        <Typography variant='body1' color='secondary.contrastText'>
                            My level of industry experience or expertise.
                        </Typography>
                        <Box sx={{ width: 500 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Typography color='secondary.contrastText' variant='body2' id="input-slider" gutterBottom>
                                        Novice
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Slider
                                        aria-label="Hipster"
                                        defaultValue={1}
                                        getAriaValueText={setHipsterSkill}
                                        valueLabelDisplay="auto"
                                        color='primary'
                                        step={1}
                                        marks
                                        min={1}
                                        max={10}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography color='secondary.contrastText' variant='body2' id="input-slider" gutterBottom>
                                        Expert
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                    <Box backgroundColor='secondary.main' sx={{ margin: 2, padding: 2 }} borderRadius={2}>
                        <Typography variant='h2' color='primary.main'>Hacking</Typography>
                        <Typography variant='body1' color='secondary.contrastText'>
                            My knowledge and experience building prototypes and final versions of your idea
                        </Typography>
                        <Box sx={{ width: 500 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Typography color='secondary.contrastText' variant='body2' id="input-slider" gutterBottom>
                                        Novice
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Slider
                                        aria-label="Hipster"
                                        defaultValue={1}
                                        getAriaValueText={setHackerSkill}
                                        valueLabelDisplay="auto"
                                        color='primary'
                                        step={1}
                                        marks
                                        min={1}
                                        max={10}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography color='secondary.contrastText' variant='body2' id="input-slider" gutterBottom>
                                        Expert
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                    <Box backgroundColor='secondary.main' sx={{ margin: 2, padding: 2 }} borderRadius={2}>
                        <Typography variant='h2' color='primary.main'>Hustling</Typography>
                        <Typography variant='body1' color='secondary.contrastText'>
                            My experience in Sales / Marketing / Business
                        </Typography>
                        <Box sx={{ width: 500 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Typography color='secondary.contrastText' variant='body2' id="input-slider" gutterBottom>
                                        Novice
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Slider
                                        aria-label="Hipster"
                                        defaultValue={1}
                                        getAriaValueText={setHustlerSkill}
                                        valueLabelDisplay="auto"
                                        color='primary'
                                        step={1}
                                        marks
                                        min={1}
                                        max={10}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography color='secondary.contrastText' variant='body2' id="input-slider" gutterBottom>
                                        Expert
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>


                <Box backgroundColor='secondary.light' sx={{ margin: 8, padding: 2 }} borderRadius={2}>
                    <Typography color='primary.light' margin={2} variant='h2' onClick={populateName}>Please enter your name and email.</Typography>

                    <Box sx={{ margin: 2, padding: 2 }} backgroundColor='secondary.main' display='flex' justifyContent="center" borderRadius={2}>
                        <TextField
                            required
                            type='text'
                            label="First Name"
                            value={firstName}
                            sx={{
                                width: 380, "& .MuiFormLabel-root": {
                                    color: 'primary.main'
                                },
                                "& .MuiFormLabel-root.Mui-focused": {
                                    color: 'primary.main'
                                },
                                "& .MuiInputBase-root": {
                                    color: 'secondary.contrastText'
                                }
                            }}
                            onChange={(evt) => setFirstName(evt.target.value)}
                        />
                        <TextField
                            required
                            type='text'
                            label="Last Name"
                            value={lastName}
                            sx={{
                                margin: 'auto', width: 380, "& .MuiFormLabel-root": {
                                    color: 'primary.main'
                                },
                                "& .MuiFormLabel-root.Mui-focused": {
                                    color: 'primary.main'
                                },
                                "& .MuiInputBase-root": {
                                    color: 'secondary.contrastText'
                                }
                            }}
                            onChange={(evt) => setLastName(evt.target.value)}
                        />
                        <TextField
                            required
                            type='text'
                            label="Email"
                            value={email}
                            sx={{
                                width: 380, "& .MuiFormLabel-root": {
                                    color: 'primary.main'
                                },
                                "& .MuiFormLabel-root.Mui-focused": {
                                    color: 'primary.main'
                                },
                                "& .MuiInputBase-root": {
                                    color: 'secondary.contrastText'
                                }
                            }}
                            onChange={(evt) => setEmail(evt.target.value)}
                        />
                    </Box>
                </Box>

                <Box backgroundColor='secondary.light' sx={{ margin: 8, padding: 2 }} borderRadius={2}>
                    <Typography color='primary.light' margin={2} variant='h2'>
                        Please tell us a little bit about yourself.
                    </Typography>
                    <Box sx={{ margin: 2, padding: 2 }} backgroundColor='secondary.main' display='flex' justifyContent="center" borderRadius={2}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="About Me"
                            value={about}
                            color='primary'
                            multiline
                            maxRows={10}
                            minRows={5}
                            sx={{
                                "& .MuiFormLabel-root": {
                                    color: 'primary.main'
                                },
                                "& .MuiFormLabel-root.Mui-focused": {
                                    color: 'primary.main'
                                },
                                "& .MuiInputBase-root": {
                                    color: 'secondary.contrastText'
                                }
                            }}
                            fullWidth
                            onChange={(evt) => setAbout(evt.target.value)}
                        />
                    </Box>
                </Box>
                <Box sx={{ margin: 2 }} display='flex' justifyContent="center" borderRadius={2}>
                    <Button variant='contained' onClick={submit}>Submit</Button>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default Hacker;