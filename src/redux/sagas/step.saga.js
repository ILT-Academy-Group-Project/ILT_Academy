import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* editCurrentStep(action) {
    console.log('CURRENT STEP', action.payload)

    try {

        console.log('IN FETCH ORIENTATION STEP')
        yield axios.put(`api/orientation/step`, action.payload) //update orientation stepper from database

        const user = yield axios.get(`api/orientation/step/${action.payload.id}`);

        yield put({ type: 'SET_USER', payload: user.data });

    } catch {
        console.log('error in orientationSaga')
    }
}

function* stepSaga() {
    yield takeLatest('EDIT_CURRENT_STEP', editCurrentStep);
}

export default stepSaga;