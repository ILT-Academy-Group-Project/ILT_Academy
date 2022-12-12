import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchEvents(){
    // console.log('in fetchEvents SAGA');
    try{
        //get events from google calender in the calendar router.
        let response = yield axios.get('/api/calendar');
        console.log('response.data fetchevents', response.data);
        //set redux events
        yield put ({
            type: 'SET_EVENTS',
            payload: response.data.events
        });
    }
    catch (err){
        console.error('in fetchEvents SAGA error', err);
    }

}

function* eventsSaga() {
    //fetch calendar events
  yield takeEvery('FETCH_EVENTS', fetchEvents);
}

export default eventsSaga;