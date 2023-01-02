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

function* createAnnouncement(action){
    // console.log('in createAnnouncement SAGA,', action.payload);
    try{
        //axios to endpoint for DB post
        yield axios.post('/api/announcements', action.payload);

        //update state
        yield put({
            type:"FETCH_ANNOUNCEMENTS",            
        });

    } catch (err){
        console.error('in createAnnouncement SAGA error', err.message);
    }
}

function* announcementsSaga() {
    yield takeEvery("FETCH_ANNOUNCEMENTS", fetchAnnouncements);
    yield takeEvery('CREATE_ANNOUNCEMENT', createAnnouncement);
}

export default announcementsSaga;