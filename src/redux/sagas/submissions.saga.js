import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

//IMPORT FORM DATA FOR FILE SEND
import FormData from 'form-data';


//ENDPOINT: /api/submissions
// {singleSubmission.textinput ? singleSubmission.textinput: ''}
// {singleSubmission.video ? singleSubmission.video : ''}
//createSubmission
function* createSubmission(action){
    console.log('in createSubmission SAGA with payload:', action.payload)
    let data = action.payload;
    //create form data to post to server
    try{
        let formData = new FormData;
        //APPEND TEXT AND BOTH FILES will conditionalize the query to DB server side
        formData.append('file', data.file);
        formData.append('video', data.video);
        //make sure it only sends textfield if it exists, otherwise
        //there is an error where formdata converts null to 'null'as a string
        //append textfield
        formData.append('textSubmission', data.textInput)
        //append assignment id
        formData.append('assignmentId', data.assignmentId);
        //append id if it exists
        formData.append('id', data.id);


        yield axios.post('/api/submissions', formData, {
            //must include this header, it is what Multer uses to id file
            headers:{
                headers: { "Content-Type": "multipart/form-data" },
            }
        })


    } catch (err) {
        console.error('in createSubmission SAGA error:', err);
    }


}

function* fetchAssignmentSubmissions(action){
   let cohortId = action.payload.cohortId;
   let assignmentId = action.payload.assignmentId;
    console.log('📰 in FETCH assignment submissions at submissions.saga', cohortId, assignmentId)
    try{
        let submissions = yield axios.get(`api/submissions/${cohortId}/${assignmentId}`) //GET submissions for assignment by cohort
        yield put({
            type: 'SET_COHORT_ASSIGNMENT_SUBMISSIONS',
            payload: submissions.data
        })
    } catch (err){
        console.error('error in submissions.saga in fetchAssignmentSubmissions', err);
    }
}

function* fetchUserSubmissions(action){
    // console.log('in fetchusersubmissions saga:', action.payload);
    try {
        //get user's submissions from the database
        let response = yield axios.get(`/api/submissions/user`)
        // console.log('userSubmissions response =', response.data);
        yield put({
            type: 'SET_USER_SUBMISSIONS',
            payload: response.data
        })
    } catch (err){
        console.error('in fetchUserSubmissions saga error', err);
    }
}
    //get a singleSubmission to use in redux as the editable submission
function* fetchSingleSubmission(action){
    // console.log('in fetchSingleSubmission');
    try {
        //get user's submissions from the database
        let response = yield axios.get(`/api/submissions/user/assignment/${action.payload}`);
        // console.log('response from server is:', response.data);

        //update redux selectedsubmission
        yield put ({
            type: 'SET_SINGLE_SUBMISSION',
            payload: response.data
        });

    } catch (err){
        console.error('in fetchSingleSubmission saga error', err);
    }


}


function* submissionsSaga() {
    yield takeEvery('CREATE_SUBMISSION', createSubmission);
    yield takeLatest('FETCH_ASSIGNMENT_SUBMISSIONS', fetchAssignmentSubmissions);
    yield takeEvery('FETCH_USER_SUBMISSIONS', fetchUserSubmissions);
    yield takeEvery('FETCH_SINGLE_SUBMISSION', fetchSingleSubmission)
}

export default submissionsSaga;