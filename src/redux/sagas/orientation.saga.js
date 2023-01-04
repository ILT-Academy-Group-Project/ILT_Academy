import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import FormData from 'form-data';

function* fetchOrientation() {
  
    try{
      console.log('IN FETCH ORIENTATION')
        let orientation =  yield axios.get(`api/orientation`) //get orientation from database
         console.log('feature GET response', orientation)
 
         yield put({
             type: 'SET_ORIENTATION', //dispatch to orientation.reducer
             payload: orientation.data
         })
     } catch{
         console.log('error in orientationSaga')
     }
}

function* createOrientation(action) {
    // console.log('in createAssignment SAGA with payload of:', action.payload);
     
    //create payload object
    let data=action.payload;
    console.log('THIS IS DATA', data)
    //new formdata for payload to multer and router
    let formData = new FormData();

    // console.log('video', data.assignmentVideo);
    // console.log('video[0]', data.assignmentVideo);
    //req.file
    formData.append('video', data.video);

    //req.body
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('step', data.step);
    // formData.append('postClass', data.postClass);
    formData.append('submission', data.submission);
    // formData.append('file', data.file);
    // formData.append('video', data.video);
//post to server

    try{
        //send FormData to server for db query
        yield axios.post('/api/orientation', formData, {
            //must include this header, it is what Multer uses to id file
            headers:{
                headers: { "Content-Type": "multipart/form-data" },
            } 
        });
        //get posts redux and rerender after store is updated
    } catch (err){
        //error route tested
        console.error('in createAssignment SAGA error', err);
    }    
}

function* fetchEditOrientation(action){
    console.log('in fetchEditOrientation saga with payload of:', action.payload);
    try{
        //get selectedAssignment from server
        const editOrientation = yield axios.get(`/api/orientation/${action.payload}`);
        
        console.log('in fetchEditOrientation with response of:', editOrientation.data);

        //send results to redux store
        yield put ({
            type: 'SET_EDIT_ORIENTATION',
            payload: editOrientation.data
        });
    } catch (err) {
        //error route tested
        console.error('in fetchEditOrientation error', err);
    }
}

// function* editCurrentStep(action) {
//     console.log('CURRENT STEP', action.payload)
// }

function* orientationSaga() {
  yield takeLatest('FETCH_ORIENTATION', fetchOrientation);
  yield takeLatest('CREATE_ORIENTATION', createOrientation);
  yield takeLatest('FETCH_EDIT_ORIENTATION', fetchEditOrientation);
//   yield takeLatest('EDIT_CURRENT_STEP', editCurrentStep);
}

export default orientationSaga;