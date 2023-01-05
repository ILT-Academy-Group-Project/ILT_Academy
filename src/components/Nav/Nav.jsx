import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

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
        <div className="nav">
            {/* if user isnt oriented yet redirect to orientation route */}
            {   user.accessLevel === 1
                && user.oriented <= orientationList.length 
                && user.hipsterInterest === 0 
                && user.hipsterSkill === 0 
                && user.hackerInterest === 0 
                && user.hackerSkill === 0 
                && user.hustlerInterest === 0 
                && user.hustlerSkill === 0
            ? 
                <Link to="/user">
                    <h2 className="nav-title">Prime Solo Project</h2>
                </Link>
            :
                <Link to="/home">
                    <h2 className="nav-title">Prime Solo Project</h2>
                </Link>
            }
            <div>
                {/* If no user is logged in, show these links */}
                {!user.id && (
                    // If there's no user, show login/registration links
                    <Link className="navLink" to="/login">
                        Login / Register
                    </Link>
                )}

                {
                    user.accessLevel === 1 ?
                        publishedSeries.map((series, i) => {
                            return (
                                <Link key={i} className='navLink' to={`/studentportal/modules/${series.seriesId}`}>{series.seriesName}</Link>
                            )
                        })
                        :
                        null
                }

                {/* If a user is logged in, show these links */}
                {/* if user isnt oriented yet redirect to orientation route */}
                {   user.accessLevel === 1
                    && user.oriented <= orientationList.length 
                    && user.hipsterInterest === 0 
                    && user.hipsterSkill === 0 
                    && user.hackerInterest === 0 
                    && user.hackerSkill === 0 
                    && user.hustlerInterest === 0 
                    && user.hustlerSkill === 0 
                ?
                    <Link className="navLink" to="/user">
                        Home
                    </Link>
                :
                    <Link className="navLink" to="/home">
                        Home
                    </Link>
                }

                {user.id && (
                    <>
                        <Link className="navLink" to="/info">
                            Info Page
                        </Link>

                        <LogOutButton className="navLink" />
                    </>
                )}

                <Link className="navLink" to="/about">
                    About
                </Link>
            </div>
        </div>
    );
}

export default Nav;
