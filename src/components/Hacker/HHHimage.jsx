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
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { PrimaryMainTheme } from '../PrimaryMainTheme/PrimaryMainTheme';
import Stack from '@mui/material/Stack';

const Swal = require('sweetalert2');

function HHHimage() {

    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    // const hipsterInterest = user.hipsterInterest;
    // const hackerInterest = user.hackerInterest;
    // const hustlerInterest = user.hustlerInterest;
    // const hipsterSkill = user.hipsterSkill;
    // const hackerSkill = user.hackerSkill;
    // const hustlerSkill = user.hustlerSkill;

    const [hipster, setHipster] = useState(user.hipsterInterest + user.hipsterSkill);
    const [hacker, setHacker] = useState(user.hackerInterest + user.hackerSkill);
    const [hustler, setHustler] = useState(user.hustlerInterest + user.hustlerSkill);
    const [imageHHH, setHHH] = useState(0);

    const hip = {
        image: "/images/hipster.png",
        description:  `The Creative Vision of the company, its output, its culture, and above all its tone of voice. The Hipster doesn't just write the Style Guide, they live it.`,
        title: 'Hipster',
        imgalt: 'Hipster Icon'
    }

    const hack = {
        image: "/images/hacker.png",
        description: `The geek, the tinkerer, the techie, but more importantly, the Hacker is the innovation engine of your business. Innovation extends to the tools and processes your business deploy, as well as what it creates.`,
        title: 'Hacker',
        imgalt: 'Hacker Icon'
    }

    const hust = {
        image: "/images/hustler.png",
        description: `Ruthless Business acumen, Marketing intuition, and a silver sales tongue make the Hustler an indispensable partner. The Hustler walks the walk, and is the voice of your business.`,
        title: 'Hustler',
        imgalt: 'Hustler Icon'
    }



    useEffect(() => {
        // dispatch({
        //     type: 'FETCH_USER'
        // })
        pickH();

    }, []);

    const pickH = () => {

        hipster > hacker && hipster > hustler ? setHHH(1)
            : hacker > hustler && hacker > hipster ? setHHH(2)
                : hustler > hipster && hustler > hacker ? setHHH(3)
                    : hipster === hacker && hipster > hustler ? setHHH(4)
                        : hacker === hustler && hacker > hipster ? setHHH(5)
                            : hustler === hipster && hustler > hacker ? setHHH(6) : setHHH(7)

    }

    return (
        <>
            {console.log('HHH', imageHHH)}
            <ThemeProvider theme={PrimaryMainTheme}>

                {/* {cohorts.map(cohort => ( */}

                {hipster > hacker && hipster > hustler ?

                    <Card sx={{ maxWidth: 345, margin: 'auto', backgroundColor: 'secondary.light' }} >
                        <CardMedia
                            component="img"
                            // height="140"
                            image={hip.image}
                            alt={hip.imgalt}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h3" component="div" color='primary.light' sx={{}}>
                                {hip.title}
                            </Typography>
                            <Typography variant="body2" color="primary.main">
                                {hip.description}
                            </Typography>
                        </CardContent>
                    </Card>

                    : hacker > hustler && hacker > hipster ?

                        <Card sx={{ maxWidth: 345, margin: 'auto', backgroundColor: 'secondary.light' }} >
                            <CardMedia
                                component="img"
                                // height="140"
                                image={hack.image}
                                alt={hack.imgalt}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h3" component="div" color='primary.light' sx={{}}>
                                    {hack.title}
                                </Typography>
                                <Typography variant="body2" color="primary.main">
                                    {hack.description}
                                </Typography>
                            </CardContent>
                        </Card>

                        : hustler > hipster && hustler > hacker ?

                            <Card sx={{ maxWidth: 345, margin: 'auto', backgroundColor: 'secondary.light' }} >
                                <CardMedia
                                    component="img"
                                    // height="140"
                                    image={hust.image}
                                    alt={hust.imgalt}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h3" component="div" color='primary.light' sx={{}}>
                                        {hust.title}
                                    </Typography>
                                    <Typography variant="body2" color="primary.main">
                                        {hust.description}
                                    </Typography>
                                </CardContent>
                            </Card>

                            : hipster === hacker && hipster > hustler ?

                                <Card sx={{ maxWidth: 500, margin: 'auto', backgroundColor: 'secondary.light' }} >
                                    <Stack direction="row" spacing={0}>
                                        <CardMedia
                                            component="img"
                                            // height="140"
                                            image={hip.image}
                                            alt={hip.imgalt}
                                        />
                                        <CardMedia
                                            component="img"
                                            // height="140"
                                            image={hack.image}
                                            alt={hack.imgalt}
                                        />
                                    </Stack>

                                    <CardContent>
                                        <Typography gutterBottom variant="h3" component="div" color='primary.light' sx={{}}>
                                            {hip.title} / {hack.title}
                                        </Typography>
                                        <Typography variant="body2" color="primary.main">
                                            {hip.description}

                                            {hack.description}
                                        </Typography>
                                    </CardContent>
                                </Card>

                                : hacker === hustler && hacker > hipster ?

                                    <Card sx={{ maxWidth: 500, margin: 'auto', backgroundColor: 'secondary.light' }} >
                                        <Stack direction="row" spacing={0}>
                                            <CardMedia
                                                component="img"
                                                // height="140"
                                                image={hack.image}
                                                alt={hack.imgalt}
                                            />
                                            <CardMedia
                                                component="img"
                                                // height="140"
                                                image={hust.image}
                                                alt={hust.imgalt}
                                            />
                                        </Stack>
                                        <CardContent>
                                            <Typography gutterBottom variant="h3" component="div" color='primary.light' sx={{}}>
                                                {hack.title} / {hust.title}
                                            </Typography>
                                            <Typography variant="body2" color="primary.main">
                                                {hack.description}

                                                {hust.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>

                                    : hustler === hipster && hustler > hacker ?

                                        <Card sx={{ maxWidth: 500, margin: 'auto', backgroundColor: 'secondary.light' }} >
                                            <Stack direction="row" spacing={0}>
                                                <CardMedia
                                                    component="img"
                                                    // height="140"
                                                    image={hust.image}
                                                    alt={hust.imgalt}
                                                />
                                                <CardMedia
                                                    component="img"
                                                    // height="140"
                                                    image={hip.image}
                                                    alt={hip.imgalt}
                                                />
                                            </Stack>
                                            <CardContent>
                                                <Typography gutterBottom variant="h3" component="div" color='primary.light' sx={{}}>
                                                    {hust.title} / {hip.title}
                                                </Typography>
                                                <Typography variant="body2" color="primary.main">
                                                    {hust.description}

                                                    {hip.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>

                                        :

                                        <Card sx={{ maxWidth: 750, margin: 'auto', backgroundColor: 'secondary.light' }} >
                                            <Stack direction="row" spacing={0}>
                                                <CardMedia
                                                    component="img"
                                                    // height="140"
                                                    image={hip.image}
                                                    alt={hip.imgalt}
                                                />
                                                <CardMedia
                                                    component="img"
                                                    // height="140"
                                                    image={hack.image}
                                                    alt={hack.imgalt}
                                                />
                                                <CardMedia
                                                    component="img"
                                                    // height="140"
                                                    image={hust.image}
                                                    alt={hust.imgalt}
                                                />
                                            </Stack>
                                            <CardContent>
                                                <Typography gutterBottom variant="h3" component="div" color='primary.light' sx={{}}>
                                                    {hip.title} / {hack.title} / {hust.title}
                                                </Typography>
                                                <Typography variant="body2" color="primary.main">
                                                    {hip.description}

                                                    {hack.description}

                                                    {hust.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                }
                {/* ))} */}
            </ThemeProvider>
        </>
    )
}

export default HHHimage;