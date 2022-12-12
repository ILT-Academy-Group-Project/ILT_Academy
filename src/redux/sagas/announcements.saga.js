import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createAnnouncement(action) {
  try {
      yield axios.post('/api/announcements', action.payload);
      yield put({ type: 'FETCH_ANNOUCEMENT' });
  } catch (error) {
      console.log('Error in POST', error);
  }
}

function* fetchAnnoucement() {
  try {
    const annoucement = yield axios.get('/api/announcements');
    console.log('get announcement:', annoucement);
    yield put({ type: 'SET_ANNOUNCEMENT', payload: annoucement.data });
  } catch (error) {
    console.log('Error in fetchAnnouncments', error);
  }
}


function* announcementsSaga() {
  // yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('CREATE_ANNOUNCEMENT', createAnnouncement);
  yield takeLatest('FETCH_CURRENT_ANNOUNCEMENT', fetchAnnoucement);
}

export default announcementsSaga;