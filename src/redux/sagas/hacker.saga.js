import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* createHipster(action) {

    try{
        //send FormData to server for db query
        yield axios.put('/api/hipster/hacker/hustler', action.payload);
        //get posts redux and rerender after store is updated
    } catch (err){
        //error route tested
        console.error('in createAssignment SAGA error', err);
    }    
}

function* hackerSaga() {
    yield takeLatest('CREATE_HIPSTER', createHipster);

}

export default hackerSaga;