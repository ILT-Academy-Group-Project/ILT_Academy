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
         console.log('error in seriesSaga fetchSeries')
     }
}

function* fetchCohortSeries(action){
    console.log(`🫐 action.payload is `, action.payload);
    try{
        let cohortSeries = yield axios.get(`api/series/${action.payload}`) //get series info for cohort by id 
            // console.log('🥬Cohort series is ', cohortSeries)
        yield put({
            type: 'SET_COHORT_SERIES',
            payload: cohortSeries.data
        })
    } catch (err){
        console.error('error in series.saga fetchCohortSeries', err.message);
    }

}

function* publishCohortSeries(action) {
    let cohort = action.payload.cohortParam
    let series = action.payload.seriesId
    console.log('cohort variable', cohort);
    console.log('📰 publish cohort series action.payload is ', action.payload)
    try{
        axios.post(`api/series/publish/${cohort}/${series}`)

    } catch(err){
        console.error('error in series.saga publishCohortSeries', err);
    }
}

function* seriesSaga() {
  yield takeLatest('FETCH_SERIES', fetchSeries);
  yield takeLatest('FETCH_COHORT_SERIES', fetchCohortSeries);
  yield takeLatest('PUBLISH_SERIES', publishCohortSeries);
}

export default seriesSaga;