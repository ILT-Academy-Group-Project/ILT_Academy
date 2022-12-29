import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import announcments from './announcements.reducer';
import events from './events.reducer';
import submissions from './submissions.reducer';
import cohorts from './cohorts.reducer';
import series from './series.reducer';
import modules from './modules.reducer';
import assignments from './assignments.reducer';
import orientation from './orientation.reducer';
import cohortStudents from './cohort.student.reducer';
import cohortSeries from './cohort.series.reducer';
import cohortModules from './cohort.modules.reducer';



// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  cohorts, //contains all cohorts and single cohort
  series, //contains all series
  modules,
  assignments,
  cohortStudents,
  cohortSeries,
  orientation,
  cohortModules,
//   announcments,
//   assignments,
  events,
  submissions,
});

export default rootReducer;
