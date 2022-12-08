import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* announcementsSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
}

export default announcementsSaga;