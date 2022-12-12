import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchEvents(){
    console.log('in fetchEvents SAGA');
    try{

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