import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchModules(action) {
    // console.log(`🔴 action.payload is `, action.payload); //action.payload is series id
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

function* fetchCohortModules(action) {
    console.log(`🔴 action.payload is `, action.payload); //action.payload is module id
    let cohortId = action.payload.cohortId;
    let seriesId = action.payload.seriesId;
    try{
        let cohortModules =  yield axios.get(`api/modules/cohort/${cohortId}/${seriesId}`) //get modules from database
         console.log('feature GET response', cohortModules)
 
         yield put({
             type: 'SET_COHORT_MODULES', //dispatch to modules.reducer
             payload: cohortModules.data
         })
     } catch{
         console.log('error in modulesSaga fetchCohortModules')
     }
}

function* publishCohortModule(action) {
    console.log(`🍍 action.payload is `, action.payload);
    let cohortId = action.payload.cohortId;
    let moduleId = action.payload.moduleId;
    let seriesId = action.payload.seriesId;

    try{
        yield axios.post(`api/modules/publish/${cohortId}/${moduleId}`)

        //update cohort modules redux

        yield put({
            type:'FETCH_COHORT_MODULES',
            payload: {
                cohortId: cohortId,
                seriesId: seriesId
            }
        });

        //fetch assignment for series for render

        yield put({
            type:'FETCH_SERIES_ASSIGNMENTS',
            payload: seriesId
        });


    } catch{
        console.log('error in modules.sage publishCohortModule')
    }
}

function* modulesSaga() {
  yield takeLatest('FETCH_MODULES', fetchModules);
  yield takeLatest('FETCH_COHORT_MODULES', fetchCohortModules);
  yield takeLatest('PUBLISH_MODULE', publishCohortModule);
}

export default modulesSaga;