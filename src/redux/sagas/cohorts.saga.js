import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

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

function* createCohort(action){
    // console.log('in createCohort SAGA')

    try{
        //axios to server
        const response = yield axios.post('/api/cohorts', action.payload);
        //reGET cohorts
        console.log('response:', response);
        yield put({
            type: 'FETCH_COHORTS'
        });
        if(response.data.includes('already exists')){
            alert('AccessCode or Cohort Name already exists');
        }

    } catch (err){
        console.error('in createCohort SAGA error:', err.message);
    }

}
//GRADUATE THE COHORT ===delete the cohort assignment
//turns assigned cohort for the student to 'null'
function* graduateCohort(action){
    // console.log('in graduateCohort with id', action.payload);

    try{
        //dispatch axios.delete to server for DB deletion
        yield axios.delete(`/api/cohorts/${action.payload}`);

        //refresh redux with new cohort list
        yield put({
            type:'FETCH_COHORTS'
        });
        
    } catch (err){
        console.error('in graduateCohort SAGA error', err.message);
    }
}


function* cohortsSaga() {
  yield takeLatest('FETCH_COHORTS', fetchCohorts);
  yield takeLatest('FETCH_COHORT_STUDENTS', fetchCohortStudents);
  yield takeEvery('CREATE_COHORT', createCohort);
  yield takeLatest('GRADUATE_COHORT', graduateCohort)
}

export default cohortsSaga;