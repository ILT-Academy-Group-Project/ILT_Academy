import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* assignmentsSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
}

export default assignmentsSaga;