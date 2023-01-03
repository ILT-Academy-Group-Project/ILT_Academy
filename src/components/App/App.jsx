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
import CreateAssignment from '../AssignmentComponents/CreateAssignment/CreateAssignment';
import CohortDetails from '../Cohorts/CohortDetails';
import AssignmentDetails from '../AssignmentComponents/AssignmentDetails/AssignmentDetails';
import CohortModules from '../Cohorts/CohortModules';
import CohortSubmissions from '../Submissions/CohortSubmissions';
import UserDashboard from '../StudentSpecificComponents/UserDashboard/UserDashboard';
import EditAssignment from '../AssignmentComponents/EditAssignment/EditAssignment';
import OrientationCreate from '../Orientation/OrientationCreate';
import OrientationList from '../Orientation/OrientationList';
import OrientationEdit from '../Orientation/OrientationEdit';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import StudentModules from '../StudentSpecificComponents/StudentModules/StudentModules';
import ReSubmitAssignment from '../AssignmentComponents/ReSubmitAssignment/ReSubmitAssignment';
import StudentProfile from '../StudentProfile/StudentProfile';
import Hacker from '../Hacker/Hacker';

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
          {/* <Redirect exact from="/" to="/home" /> */}

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
            { user.accessLevel === 2 ? <Modules /> : <Redirect exact to="/login" />}
          </ProtectedRoute>

          {/* admin orientation creation page */}
          <ProtectedRoute
          // logged in admin shows Modules within selected Series
            exact
            path="/admin/orientation/create">              
            { user.accessLevel === 2 ? <OrientationCreate /> : <Redirect exact to="/login" />}
          </ProtectedRoute>

          <ProtectedRoute
            // logged in admin can edit assignment
            exact
            path="/admin/orientation/edit/:id">
              { user.accessLevel === 2 ? <OrientationEdit /> : <Redirect exact to="/login" />}
            </ProtectedRoute>

          <ProtectedRoute
          // logged in admin shows Modules within selected Series
            exact
            path="/admin/orientation/list">              
            { user.accessLevel === 2 ? <OrientationList /> : <Redirect exact to="/login" />}
          </ProtectedRoute>

            {/* LOGIN */}
            
          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /home page
              <Redirect to="/home" />
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
              <Redirect to="/home" />
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
            {user.accessLevel === 2 ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <AdminDashboard/>
              :
              user.accessLevel === 1 ?
              <UserDashboard />  
            //   Change to user dashboard
              :
              // Otherwise, show the Landing page
              <Redirect to ="/login"/>
            }
          </Route>

            {/* Admin Home Dashboard /admin */}
            <ProtectedRoute
          // logged in admin shows Modules within selected Series
            exact
            path="/admin">              
            { user.accessLevel === 2 ?  <AdminDashboard/>: <Redirect exact to="/login" />}
          </ProtectedRoute>

            {/* Admin cohort view of individual cohort   /admin/cohort/:id (cohort id)  */}
          <ProtectedRoute
            exact 
            path="/admin/cohort/:cohortId">
            {user.accessLevel === 2 ? 
            <CohortDetails /> 
            :
            <LoginPage />}
          </ProtectedRoute>

          {/* Admin can view cohort's modules within selected series  /admin/cohort/molues/:id (series id) */}
          <ProtectedRoute
            exact 
            path="/admin/cohort/modules/:cohortId/:seriesId">
            {user.accessLevel === 2 ? 
            <CohortModules /> 
            :
            <LoginPage />}
          </ProtectedRoute>

            {/* Admin submissions views by lesson  /admin/submissions/:id  (submission id)  */}

            {/* create lesson */}
            <ProtectedRoute
          // logged in admin shows Modules within selected Series
            exact
            path="/admin/create/assignment/:seriesId/:moduleId">
              { user.accessLevel === 2 ? <CreateAssignment /> : <Redirect exact to="/login" />}
            </ProtectedRoute>
            {/*  */}
            <ProtectedRoute
            // logged in admin can edit assignment
            exact
            path="/admin/assignment/edit/:id">
              { user.accessLevel === 2 ? <EditAssignment /> : <Redirect exact to="/login" />}
            </ProtectedRoute>

            <ProtectedRoute
            //logged in admin shows cohort submissions for assignment
            exact
            path="/admin/view/submissions/:cohortId/:assignmentId">
              { user.accessLevel === 2 ? <CohortSubmissions/> : <Redirect exact to="/login" />}
            

            </ProtectedRoute>

            {/* STUDENT BELOW HERE _______________________________ */}

            {/* orientation   /studentportal/orientation (maybe /:page) */}
            <ProtectedRoute
            //logged in admin shows cohort submissions for assignment
            exact
            path="/hipster/hacker/hustler">
              { user.id ? <Hacker /> : <Redirect exact to="/login" />}
            </ProtectedRoute>

            {/* student dashboard  /studentportal */}
            {/* *****This is here so we can let the admin visit the student dashboard to view it */}
            <ProtectedRoute
            //logged in admin shows cohort submissions for assignment
            exact
            path="/studentportal">
              { user.id ? <UserDashboard /> : <Redirect exact to="/login" />}
            </ProtectedRoute>
            {/* student portal moddules  /studentportal/modules/:id  (series id) */}
            <ProtectedRoute
                exact
                path='/studentportal/modules/:id'
            >
                <StudentModules />
            </ProtectedRoute>
            {/* individual lesson boy id (viewable by admin and student)  /lesson/:id (lesson id) */}

            <ProtectedRoute
                exact
                path='/assignment/:id'
            >
                <AssignmentDetails />
            </ProtectedRoute>
          
                {/* Assignment resubmission path
            <ProtectedRoute
                exact
                path='/assignment/update/:id'
            >
                <ReSubmitAssignment />
            </ProtectedRoute> */}


            {/* student AND admin view of student profile  /profile/:username */}
            <ProtectedRoute
              exact
              path='/profile/:username/:cohortId'>
                <StudentProfile />
            </ProtectedRoute>
          
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
