import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Modules from '../Modules/Modules';
import Series from '../Series/Series';
import CreateAssignment from '../CreateAssignment/CreateAssignment';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          {/* ABOUT PAGE */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          
          {/* USER PAGE --- REMOVE */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

            {/* INFO */}
          <Route
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </Route>


         {/* ADMIN DASHBOARD ProtectedRoute HERE! */}

          <ProtectedRoute
          // logged in admin shows Modules within selected Series
            exact
            path="/admin/modules/:seriesId">
              <Modules />
          </ProtectedRoute>

          <ProtectedRoute
          // logged in admin shows Modules within selected Series
            exact
            path="/admin/create/assignment">
              <CreateAssignment />
          </ProtectedRoute>

            {/* LOGIN */}
            
          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

            {/* registration */}
          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

            {/* /home */}
          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

            {/* Admin Home  /admin */}

            {/* Admin cohort view of individual cohort   /admin/:id (cohort id)  */}

            {/* Amin submissions views by lesson  /admin/submissions/:id  (submission id)  */}

            {/* STUDENT BELOW HERE _______________________________ */}

            {/* orientation   /studentportal/orientation (maybe /:page) */}

            {/* student dashboard  /studentportal */}

            {/* student portal moddules  /studentportal/modules/:id  (series id) */}

            {/* lesson   /studentportal/:id (lesson id) */}

            {/* profile  /studentportal/profile/:username */}
          
          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
