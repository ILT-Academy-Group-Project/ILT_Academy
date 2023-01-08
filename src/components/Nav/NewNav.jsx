import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Toolbar } from '@mui/material';
import NavButton from './NavButton';
import LinkText from './LinkText';
import { Person } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
//Mui
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { PrimaryMainTheme } from "../PrimaryMainTheme/PrimaryMainTheme";
import {
    Drawer,
    ListItem,
    ListItemText,
    MenuList,
    ThemeProvider
} from '@mui/material';

function Nav() {
    const user = useSelector((store) => store.user);
    const publishedSeries = useSelector((store) => store.cohortSeries)
    const orientationList = useSelector((store) => store.orientation.orientationReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    // console.log('publishedSeries', publishedSeries, 'cohortId:', user);

    //series     //app bar
    const [seriesOpen, setSeriesOpen] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const [appAnchor, setAppAnchor] = useState(null);



    useEffect(() => {
        //get assigned series for the render;
        dispatch({
            type: 'FETCH_COHORT_SERIES',
            payload: user.cohortId
        })

        dispatch({
            type: 'FETCH_ORIENTATION'
        });
    }, [user.id]);


    return (
        <ThemeProvider theme={PrimaryMainTheme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" color="secondary" >
                    <Toolbar>
                        {/* if user isnt oriented yet redirect to orientation route */}
                        {user.accessLevel === 1
                            && user.oriented <= orientationList.length
                            && user.hipsterInterest === 0
                            && user.hipsterSkill === 0
                            && user.hackerInterest === 0
                            && user.hackerSkill === 0
                            && user.hustlerInterest === 0
                            && user.hustlerSkill === 0
                            ?

                            <Box sx={{ flexGrow: 1 }}>
                                <Link to="/user">
                                    <img
                                        src="/images/logo.png"
                                        height="70"
                                        style={{ paddingTop: '3px' }}
                                    />
                                </Link>
                            </Box>

                            :
                            <Box sx={{
                                flexGrow: 1, display: 'inline-flex',
                                flexDirection: 'row',
                                alignContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Link to="/home">
                                    <img
                                        src="/images/logo.png"
                                        height="70"
                                        style={{ paddingTop: '3px' }}
                                    />
                                </Link>   
                                {/* Show user profile button if user is oriented and is also a student (not an admin) */}
                                {user.accessLevel !== 2 && user.oriented === orientationList.length ?
                                    <Button
                                        sx={{ paddingTop: '0px', paddingBottom: '0px', marginLeft: '10px' }}
                                        size="small"
                                        variant='contained'
                                        onClick={() => history.push(`/profile/${user.username}/${user.cohortId}`)}>
                                    <Person />
                                    <Typography variant='body1'>My Profile
                                    </Typography>
                                </Button> : null}
                            </Box>

                        }



                        <Box>
                            {/* If no user is logged in, show these links */}
                            {!user.id && (
                                // If there's no user, show login/registration links
                                <Link to="/login" component={NavButton}>Login / Register</Link>
                            )}

                            {/* {
                                user.accessLevel === 1 ?
                                    publishedSeries.map((series, i) => {
                                        return (
                                            <Link key={i} to={`/studentportal/modules/${series.seriesId}`} component={NavButton}>{series.seriesName}</Link>
                                        )
                                    })
                                    :
                                    null
                            } */}

                            {/* If a user is logged in, show these links */}
                            {/* if user isnt oriented yet redirect to orientation route */}
                            {user.accessLevel === 1
                                && user.oriented <= orientationList.length
                                && user.hipsterInterest === 0
                                && user.hipsterSkill === 0
                                && user.hackerInterest === 0
                                && user.hackerSkill === 0
                                && user.hustlerInterest === 0
                                && user.hustlerSkill === 0
                                ?
                                <Link to="/user" component={NavButton}>
                                    Home
                                </Link>
                                :
                                <Link to="/home" component={NavButton}>
                                    Home
                                </Link>
                            }
                            {user.accessLevel === 1 ?
                                <>
                                    <Link
                                        onClick={(evt => setAnchor(evt.currentTarget))}
                                        component={NavButton}
                                    // sx={{fontFamily: 'circular-bold'}}
                                    >
                                        Lessons
                                    </Link>
                                    <Menu
                                        open={Boolean(anchor)}
                                        anchorEl={anchor}
                                        onClose={() => setAnchor(null)}
                                        keepMounted


                                    >
                                        <MenuList >
                                            <Typography sx={{ color: 'primary.dark', fontFamily: 'circular-bold', textAlign: 'center', fontSize: '20px' }}>Series</Typography>
                                            {publishedSeries.map((series, i) => {
                                                return (
                                                    <MenuItem sx={{ color: '#f96b61' }}><Link key={i} to={`/studentportal/modules/${series.seriesId}`} component={LinkText}>{series.seriesName}</Link></MenuItem>
                                                )
                                            })}
                                        </MenuList>
                                    </Menu>
                                </>
                                :
                                null
                            }

                            {/* Dead links for future development */}

                            <>
                                <Link
                                    onClick={(evt => setAppAnchor(evt.currentTarget))}
                                    component={NavButton}
                                // sx={{fontFamily: 'circular-bold'}}
                                >
                                    Apps
                                </Link>
                                <Menu
                                    open={Boolean(appAnchor)}
                                    anchorEl={appAnchor}
                                    onClose={() => setAppAnchor(null)}
                                    keepMounted


                                >
                                    <MenuList >
                                        <MenuItem sx={{ color: '#f96b61' }}><Link to='/' component={LinkText}>Pathways</Link></MenuItem>
                                        <MenuItem sx={{ color: '#f96b61' }}><Link to='/' component={LinkText}>Media</Link></MenuItem>
                                        <MenuItem sx={{ color: '#f96b61' }}><Link to='/' component={LinkText}>Assessments</Link></MenuItem>
                                        <MenuItem sx={{ color: '#f96b61' }}><Link to='/' component={LinkText}>Surveys</Link></MenuItem>
                                        <MenuItem sx={{ color: '#f96b61' }}><Link to='/' component={LinkText}>Resources</Link></MenuItem>
                                    </MenuList>
                                </Menu>
                            </>

                            {user.id && (
                                <>
                                    <NavButton onClick={() => dispatch({ type: 'LOGOUT' })}>Log Out</NavButton>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box >
        </ThemeProvider>
    )
}

export default Nav;
