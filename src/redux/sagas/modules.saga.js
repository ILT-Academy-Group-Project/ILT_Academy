import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchModules(action) {
    console.log(`🔴 action.payload is `, action.payload);
    try{
        let modules =  yield axios.get(`api/modules/${action.payload}`) //get modules from database
         console.log('feature GET response', modules)
 
         yield put({
             type: 'SET_MODULES', //dispatch to modules.reducer
             payload: modules.data
         })
     } catch{
         console.log('error in modulesSaga')
     }
}

function* modulesSaga() {
  yield takeLatest('FETCH_MODULES', fetchModules);
}

export default modulesSaga;