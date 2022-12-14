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

function* fetchCohortSeries(action){
    // console.log(`🫐 action.payload is `, action.payload);
    try{
        let cohortSeries = yield axios.get(`api/series/${action.payload}`) //get series info for cohort by id 
            // console.log('🥬Cohort series is ', cohortSeries)
        yield put({
            type: 'SET_COHORT_SERIES',
            payload: cohortSeries.data
        })
    } catch{
        console.log('error in cohort.saga')
    }

}

function* seriesSaga() {
  yield takeLatest('FETCH_SERIES', fetchSeries);
  yield takeLatest('FETCH_COHORT_SERIES', fetchCohortSeries);
}

export default seriesSaga;