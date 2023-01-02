import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

//IMPORT FORM DATA FOR FILE SEND
import FormData from 'form-data';


//ENDPOINT: /api/submissions

//createSubmission
function* createSubmission(action){
    console.log('in createSubmission SAGA with payload:', action.payload)
    let data = action.payload;
    //create form data to post to server
    try{
        let formData = new FormData;
        //APPEND TEXT AND BOTH FILES will conditionalize the query to DB server side
        formData.append('file', data.pdfSubmission);
        formData.append('video', data.videoSubmission);
        //make sure it only sends textfield if it exists, otherwise
        //there is an error where formdata converts null to 'null'as a string
        {data.textSubmission ? 
            formData.append('textSubmission', data.textSubmission)
        :
            null
        };
        
        formData.append('assignmentId', data.assignmentId);

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

function* submissionsSaga() {
    yield takeEvery('CREATE_SUBMISSION', createSubmission);
    yield takeLatest('FETCH_ASSIGNMENT_SUBMISSIONS', fetchAssignmentSubmissions);
}

export default submissionsSaga;