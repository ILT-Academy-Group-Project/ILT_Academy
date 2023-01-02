import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import announcementsSaga from './announcements.saga';
import eventsSaga from './events.saga';
import submissionsSaga from './submissions.saga';
import cohortsSaga from './cohorts.saga';
import seriesSaga from './series.saga';
import modulesSaga from './modules.saga';
import assignmentsSaga from './assignments.saga';
import orientationSaga from './orientation.saga';
import stepSaga from './step.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    cohortsSaga(),
    seriesSaga(),
    modulesSaga(),
    assignmentsSaga(),
    orientationSaga(),
    stepSaga(),
    announcementsSaga(),
    // eventsSaga(),
    // assignmentsSaga(),
    eventsSaga(),
    submissionsSaga()
  ]);
}

//test push
