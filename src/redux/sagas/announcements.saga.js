import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* createAnnouncement(action) {
  try {
      yield axios.post('/api/announcements', action.payload);
      yield put({ type: 'FETCH_ANNOUNCEMENT' });
  } catch (error) {
      console.log('Error in POST', error);
  }
}

function* fetchAnnouncement() {
  try {
    const announcements = yield axios.get('/api/announcements');
    console.log('get announcement:', announcements.data);
    yield put({ type: 'SET_ANNOUNCEMENT', payload: announcements.data });
  } catch (error){
    console.log('Error in fetchAnnouncments', error);
  }
}


function* announcementsSaga() {
  // yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('CREATE_ANNOUNCEMENT', createAnnouncement);
  yield takeLatest('FETCH_ANNOUNCEMENT', fetchAnnouncement);
}

export default announcementsSaga;