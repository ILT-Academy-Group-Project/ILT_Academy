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
        formData.append('pdfSubmission', data.pdfSubmission);
        formData.append('videoSubmission', data.videoSubmission);
        formData.append('textSubmission', data.videoSubmission);
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


function* submissionsSaga() {
    yield takeEvery('CREATE_SUBMISSION', createSubmission);
}

export default submissionsSaga;