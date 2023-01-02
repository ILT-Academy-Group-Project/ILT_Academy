import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


// /api/announcements

function* fetchAnnouncements(){
    console.log('in fetchAnnouncements SAGA');
    try {
        const response = yield axios.get('/api/announcements');
        // console.log('announcements response.data', response.data);
        //send to redux
        yield put ({
            type: 'SET_ANNOUNCEMENTS',
            payload: response.data
        });
    } catch (err){
        console.error('in fetchAnnouncements SAGA error:', err);

    }
}

function* announcementsSaga() {
    yield takeEvery("FETCH_ANNOUNCEMENTS", fetchAnnouncements)
}

export default announcementsSaga;