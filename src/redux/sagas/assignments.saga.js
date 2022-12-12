import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchAssignments() {
  
    try{
      console.log('IN FETCH MODULES ASSIGNMENTS 🖇️')
        let assignments =  yield axios.get(`api/assignments`) //get assignments from database
         console.log('feature GET response', assignments)
 
         yield put({
             type: 'SET_ASSIGNMENTS', //dispatch to assignments.reducer
             payload: assignments.data
         })
     } catch{
         console.log('error in assignmentsSaga')
     }
}

function* assignmentsSaga() {
  yield takeLatest('FETCH_ASSIGNMENTS', fetchAssignments)
}

export default assignmentsSaga;