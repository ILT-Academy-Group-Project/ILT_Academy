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
    try{
        let cohortStudents = yield axios.get(`api/cohorts/${action.payload}`) //get students and cohort info from specific cohort
            console.log('cohort students in cohorts.saga are ', cohortStudents)
        yield put({
            type: 'SET_COHORT_STUDENTS',
            payload: cohortStudents.data
        })
    } catch{
        console.log('error in cohort.saga')
    }
}



function* cohortsSaga() {
  yield takeLatest('FETCH_COHORTS', fetchCohorts);
  yield takeLatest('FETCH_COHORT_STUDENTS', fetchCohortStudents);

}

export default cohortsSaga;