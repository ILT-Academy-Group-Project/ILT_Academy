import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchStudent(action){
    let username = action.payload;
    // console.log('🍊 fetchStudent ', username);
    try{
        let student = yield axios.get(`api/user/${username}`)
        // console.log('🧊student in student.saga is ', student)
        yield put({
            type: 'SET_STUDENT', 
            payload: student.data
        })

    } catch(err){
        console.error('error in student.saga fetch student', err);
    }

}

function* fetchStudentAssignments(action){
    let username = action.payload;
    // console.log('👻fetch student assignments', username);
    try{
        let assignments = yield axios.get(`api/assignments/username/${username}`)
        yield put({
            type: 'SET_STUDENT_ASSIGNMENTS',
            payload: assignments.data
        })

    } catch(err) {
        console.error('error in student.saga fetch assignments', err);
    }

}

function* studentSaga(){
    yield takeLatest('FETCH_STUDENT', fetchStudent);
    yield takeLatest('FETCH_STUDENT_ASSIGNMENTS', fetchStudentAssignments);
}

export default studentSaga;