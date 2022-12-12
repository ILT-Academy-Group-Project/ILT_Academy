import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createAnnouncement(action) {
  try {
      yield axios.post('/api/annoucements', action.payload);
      yield put({ type: 'FETCH_ANNOUCEMENT' });
  } catch (error) {
      console.log('Error in POST', error);
  }
}

function* fetchAnnoucement() {
  try {
    const annoucement = yield axios.get('/api/announcements');
    console.log('get annoucement:', annoucement);
    yield put({ type: 'SET_ANNOUCEMENT', payload: annoucement });
  } catch (error) {
    console.log('Error in fetchAnnoucments', error);
  }
}


function* announcementsSaga() {
  // yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('CREATE_ANNOUCEMENT', createAnnouncement);
  yield takeLatest('FETCH_ANNOUCEMENT', fetchAnnoucement);
}

export default announcementsSaga;