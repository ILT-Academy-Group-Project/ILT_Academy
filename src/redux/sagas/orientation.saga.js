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

function* updateOrientation(action) {
    console.log('CURRENT STEP', action.payload);
    let data = action.payload;
    //new formdata
    let formData = new FormData;
    formData.append('id', data.id);
    formData.append('video', data.video);
    formData.append('name', data.name);
    formData.append('content', data.content);
    formData.append('step', data.step);
    // formData.append('postClass', data.postClass);
    formData.append('submission', data.submission);
    // formData.append('file', data.file);
    // formData.append('video', data.video);
    
    try{
        //send updates to the server
        yield axios.put('/api/orientation', formData, {
            
            headers:{
                headers: { "Content-Type": "multipart/form-data" },
            }
        })

        //update redux
        yield put ({
            type: 'FETCH_ORIENTATION',
        })
    } catch (err){
        console.error('in editOrientation SAGA put route:', err);
    }
}

function* deleteOrientation(action){
    // console.log('in deleteAssignment SAGA with payload of:', action.payload);

    try {
        //send id via axios delete request
        yield axios.delete(`/api/orientation/${action.payload}`);

        yield put ({
            type: 'FETCH_ORIENTATION',
        })
    } catch (err) {
        console.error('in deleteAssignment SAGA with error:', err);
    }

}



function* orientationSaga() {
  yield takeLatest('FETCH_ORIENTATION', fetchOrientation);
  yield takeLatest('CREATE_ORIENTATION', createOrientation);
  yield takeLatest('FETCH_EDIT_ORIENTATION', fetchEditOrientation);
  yield takeLatest('UPDATE_ORIENTATION', updateOrientation);
  yield takeLatest('DELETE_ORIENTATION', deleteOrientation);
//   yield takeLatest('EDIT_CURRENT_STEP', editCurrentStep);
}

export default orientationSaga;