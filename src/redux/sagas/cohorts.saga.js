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

function* cohortsSaga() {
  yield takeLatest('FETCH_COHORTS', fetchCohorts);
}

export default cohortsSaga;