import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function Nav() {
    const user = useSelector((store) => store.user);
    const publishedSeries = useSelector((store)=> store.cohortSeries)
    const dispatch = useDispatch();
    // console.log('publishedSeries', publishedSeries, 'cohortId:', user);

    useEffect(() => {
        //get assigned series for the render;
        dispatch({
            type: 'FETCH_COHORT_SERIES',
            payload: user.cohortId
        })

    },[user.id]);

    return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link>
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
            publishedSeries.map((series, i) =>{
                return(
                    <Link key={i} className='navLink' to={`/studentportal/modules/${series.seriesId}`}>{series.seriesName}</Link>
                )
            })
            :
            null
        }
        
        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/home">
              Home
            </Link>

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
