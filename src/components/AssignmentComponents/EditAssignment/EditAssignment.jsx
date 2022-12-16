import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { useParams, useHistory } from 'react-router-dom';
import { Markup } from 'interweave';



// ROUTE: /admin/assignment/edit/:id
function EditAssignment () {
//import user
const user = useSelector(store => store.user);
//setup
const dispatch = useDispatch();
const params = useParams();
const history = useHistory();
const editAssignment = useSelector(store => store.assignments.editAssignmentReducer);

//video url for display
const [videoUrl, setVideoUrl] = useState(null);

useEffect(() => {
    dispatch ({
        type: 'FETCH_EDIT_ASSIGNMENT',
        payload: params.id
    });
},[]);


const submitEditAssignment = (evt) => {
    evt.preventDefault();
    // console.log('in submit edit assignment');
    //ensure there is content in the WYSIWYG
    if(editAssignment.content.length <=10){
        alert('Must put content into the assignment');
        return
    }

    //dispatch updated assignment to saga for axios.put
    dispatch({
        type: 'UPDATE_ASSIGNMENT', 
        payload: editAssignment
    });

    //dispatch to the SAGA for serverpost route
    // dispatch({
    //     type: 'CREATE_ASSIGNMENT',
    //     payload: {
    //         assignmentVideo,
    //         assignmentContent,
    //         assignmentTitle,
    //         moduleId: params.moduleId,
    //         postClass,
    //         textField,
    //         // name to match database, lef as submission so there isnt confusion on this page
    //         file: fileSubmission,
    //         video: videoSubmission,
    //     }
    // })
    //push to modules view

    //------------------------todo update this push::::::---------------------------
    // history.push(`/admin/modules/${params.seriesId}`)

}

    const handleChange = (content) => {
        dispatch({
            type: 'UPDATE_EDIT_ASSIGNMENT',
            payload: {content: content}
        })
    }


    const handleImageUploadBefore= (files, info, uploadHandler) => {
        // uploadHandler is a function
        // console.log(files, info)
        
        const callBack = async () => { 
        let formData = new FormData();
        formData.append('image', files[0]);
        const response = await axios.post('/api/assignments/imagefield', formData, {
            //must include this header, it is what Multer uses to id file
            headers:{
                headers: { "Content-Type": "multipart/form-data" },
            }});
        console.log('response', response.data);
        uploadHandler(response.data);}

        callBack();
        // uploadHandler();

    }

    const videoChange = (evt) => {
        dispatch({
            type: 'UPDATE_EDIT_ASSIGNMENT',
            payload: { media: evt.target.files[0] }
        });
        // setVideoUrl({imageUrl: URL.createObjectURL(evt.target.files[0])})

    }

//testing logs
// console.log('submission types, textfield:', textField, 'fileSubmission', fileSubmission);
// console.log('pre class should be false:', postClass);
// console.log('video submission', videoSubmission);
    return(
        <>
            {/* <video width="320" height="240" controls src="/videos/assignmentVideo1670963030995.mov">
            
            </video> */}

        
            <form onSubmit={submitEditAssignment}>
                {/* if there is a video display it */}
                { typeof editAssignment.media === 'string' ? 
                    <video width="640" height="480" controls src={editAssignment.media}></video> 
                : 
                    null}

                <label>Upload New Video
                    <input 
                        accept="video/*"               
                        type='file' 
                        name="selectedVideo"
                        onChange={videoChange}                                            
                    />
                </label>
                <input 
                    required
                    type='text' 
                    placeholder="Assignment Name"
                    value={editAssignment.name}
                    onChange={(evt)=>dispatch({
                        type: 'UPDATE_EDIT_ASSIGNMENT',
                        payload: {name: evt.target.value}
                    })}
                />
                <SunEditor                 
                onChange={handleChange}
                setOptions={{
                    height: 200,
                    buttonList: [
                        ['font', 'align'],
                        ['fontSize'],                          
                        ['italic'],
                        ['bold'],
                        ['underline'],
                        ['video'],
                        ['image'],                                       
                    ]                                        
                }}
                onImageUploadBefore={handleImageUploadBefore} 

                setContents={editAssignment.content}
            />
            
            <div>

                <label>Pre Class</label>
                <input 
                    // if preclass default checked
                    defaultChecked = {editAssignment && !editAssignment.postClass} 
                    // onClick={()=>setPostClass(false)} 
                    type="radio" 
                    name="classType" 
                    className="valueRadio"
                    onChange={()=>{
                        dispatch({
                            type:'UPDATE_EDIT_ASSIGNMENT',
                            payload: {postClass: false}
                        })
                    }}  
                    >
                        
                </input>

                <label>Post Class</label>
                <input 
                    //if postclass default checked
                    defaultChecked = {editAssignment && editAssignment.postClass}
                    // onClick={()=>setPostClass(true)} 
                    type="radio" 
                    name="classType" 
                    className="valueRadio"
                    onChange={()=>{
                        dispatch({
                            type:'UPDATE_EDIT_ASSIGNMENT',
                            payload: {postClass: true}
                        })
                    }}    
                >                    
                </input>

            </div>
            <div>
                <h3>Submission type</h3>
                <label>Textfield</label>
                <input  
                    onClick={ () => {        
                        dispatch({
                            type: 'UPDATE_EDIT_ASSIGNMENT',
                            payload: { textField: !editAssignment.textField }
                        })}}
                    defaultChecked={editAssignment.textField}
                    type="checkbox" 
                    name="textField" 
                    className="valueRadio"
                ></input>
                <label>File</label>
                <input 
                    onClick={() => {        
                        dispatch({
                            type: 'UPDATE_EDIT_ASSIGNMENT',
                            payload: { file: !editAssignment.file}
                        })}}
                    defaultChecked={editAssignment.file}
                    value={editAssignment}
                    type="checkbox" 
                    name="fileSubmission" 
                    className="valueRadio"
                ></input>
                <label>Video</label>
                <input 
                    onClick={ ()=>{       
                        dispatch({
                            type: 'UPDATE_EDIT_ASSIGNMENT',
                            payload: { video: !editAssignment.video }
                        })}}
                    defaultChecked={editAssignment.video}
                    type="checkbox" 
                    name="fileSubmission" 
                    className="valueRadio"
                ></input>
            </div>
                

            <button type="submit">Create Assignment</button>
            </form>
        </>
)

};

export default EditAssignment;




//----------reference code----------------------------------------------------------------------
//old post dispatch for reference//

// console.log(user.accessLevel)
// // import useState and create state for selected file on video upload
// const [assignmentVideo, setAssignmentVideo] = useState('');
// //use usestate to track content of WYSIWYG
// const [assignmentContent, setAssignmentContent] = useState('');
// //useState to track assignment title
// const [assignmentTitle, setAssignmentTitle] = useState('');

// //submission types
// const [textField, setTextField] = useState(false);
// const [fileSubmission, setFileSubmission] = useState(false);
// const [postClass, setPostClass] = useState(false);
// const [videoSubmission, setVideoSubmission] = useState(false);