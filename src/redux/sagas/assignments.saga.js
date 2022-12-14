import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

//IMPORT FORM DATA FOR FILE SEND
import FormData from 'form-data';

//ROUTE: '/api/assignments'

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


function* createAssignment(action) {
    // console.log('in createAssignment SAGA with payload of:', action.payload);
     
    //create payload object
    let data=action.payload;
    //new formdata for payload to multer and router
    let formData = new FormData();

    // console.log('video', data.assignmentVideo);
    // console.log('video[0]', data.assignmentVideo);
    //req.file
    formData.append('assignmentVideo', data.assignmentVideo);

    //req.body
    formData.append('assignmentTitle', data.assignmentTitle);
    formData.append('assignmentContent', data.assignmentContent);
    formData.append('moduleId', data.moduleId);
    formData.append('postClass', data.postClass);
    formData.append('textField', data.textField);
    formData.append('file', data.file);
    formData.append('video', data.video);
//post to server

    try{
        //send FormData to server for db query
        yield axios.post('/api/assignments', formData, {
            //must include this header, it is what Multer uses to id file
            headers:{
                headers: { "Content-Type": "multipart/form-data" },
            }
        });
        //get posts redux and rerender after store is updated
    } catch (err){
        console.error('in createAssignment SAGA error', err);
    }
     

}

function* assignmentsSaga() {
  yield takeLatest('FETCH_ASSIGNMENTS', fetchAssignments)

  //CREATE Assignment
  yield takeEvery('CREATE_ASSIGNMENT', createAssignment);

}

export default assignmentsSaga;