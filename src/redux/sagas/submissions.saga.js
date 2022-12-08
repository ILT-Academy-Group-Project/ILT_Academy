import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* submissionsSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
}

export default submissionsSaga;