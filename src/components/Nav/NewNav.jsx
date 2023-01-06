import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Box, Toolbar } from '@mui/material';
import NavButton from './NavButton';

function Nav() {
    const user = useSelector((store) => store.user);
    const publishedSeries = useSelector((store) => store.cohortSeries)
    const orientationList = useSelector((store) => store.orientation.orientationReducer);
    const dispatch = useDispatch();
    // console.log('publishedSeries', publishedSeries, 'cohortId:', user);

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
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="secondary">
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
                                    height="80"
                                    style={{ paddingTop: '6px' }}
                                />
                            </Link>
                        </Box>

                        :
                        <Box sx={{ flexGrow: 1 }}>
                            <Link to="/home">
                                <img
                                    src="/images/logo.png"
                                    height="80"
                                    style={{ paddingTop: '6px' }}
                                />
                            </Link>
                        </Box>

                    }



                    <Box>
                        {/* If no user is logged in, show these links */}
                        {!user.id && (
                            // If there's no user, show login/registration links
                            <Link to="/login" component={NavButton}>Login / Register</Link>
                        )}

                        {
                            user.accessLevel === 1 ?
                                publishedSeries.map((series, i) => {
                                    return (
                                        <Link key={i} to={`/studentportal/modules/${series.seriesId}`} component={NavButton}>{series.seriesName}</Link>
                                    )
                                })
                                :
                                null
                        }

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

                        {user.id && (
                            <>
                                <Link to="/info" component={NavButton}>
                                    Info Page
                                </Link>

                                <NavButton onClick={() => dispatch({ type: 'LOGOUT' })}>Log Out</NavButton>
                            </>
                        )}

                        <Link to="/about" component={NavButton}>
                            About
                        </Link>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Nav;
