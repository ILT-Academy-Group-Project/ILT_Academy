import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCohorts() {
    try{
        let cohorts =  yield axios.get('api/cohorts') //get cohorts from database
         console.log('feature GET response', cohorts)
 
         yield put({
             type: 'SET_COHORTS', //dispatch to cohorts.reducer
             payload: cohorts.data
         })
     } catch{
         console.log('error in cohortsSaga')
     }
}

function* fetchCohortStudents(action){
    console.log('🚗 action.payload in cohorts.saga ', action.payload)
    try{
        let cohortStudents = yield axios.get(`api/cohorts/${action.payload}`) //get students and cohort info from specific cohort
            console.log('cohort students in cohorts.saga are ', cohortStudents)
        yield put({
            type: 'SET_COHORT_STUDENTS',
            payload: cohortStudents.data
        })
    } catch (err){
        console.error('error in cohort.saga', err.message)
    }
}

function* fetchCohort(action) {
    try{
        const cohortData = yield axios.get(`api/cohorts/name/${action.payload}`)
            console.log('get cohort info by cohort ID', cohortData);
        yield put({
            type: 'SET_COHORT', 
            payload: cohortData.data[0]
        })
    } catch{
        console.log('error in cohort.saga fetch cohort name')
    }
}



function* cohortsSaga() {
  yield takeLatest('FETCH_COHORTS', fetchCohorts);
  yield takeLatest('FETCH_COHORT_STUDENTS', fetchCohortStudents);
  yield takeLatest('FETCH_COHORT', fetchCohort);

}

export default cohortsSaga;