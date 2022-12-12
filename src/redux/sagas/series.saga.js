import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchSeries() {
    try{
        let series =  yield axios.get('api/series') //get cohorts from database
         console.log('feature GET response', series)
 
         yield put({
             type: 'SET_SERIES', //dispatch to cohorts.reducer
             payload: series.data
         })
     } catch{
         console.log('error in seriesSaga')
     }
}

function* seriesSaga() {
  yield takeLatest('FETCH_SERIES', fetchSeries);
}

export default seriesSaga;