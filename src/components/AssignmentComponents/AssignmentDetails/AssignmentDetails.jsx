import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { useParams, useHistory } from 'react-router-dom';

function AssignmentDetails () {

    //import dispatch, history, params
    const history = useHistory();
    const dispatch = useDispatch();
    const params=useParams();

    //get selected assignment for the render
    const assignment = useSelector(store => store.assignments.selectedAssignmentReducer);
    // console.log('assignment is:', assignment);

    //usestate to keep files
    const [pdfSubmission, setPdfSubmission] = useState(null);
    const [videoSubmission, setVideoSubmission] = useState(null);
    const [textSubmission, setTextSubmission] = useState(null);


    //useEffect for getting assignment by id
    useEffect(() => {
        dispatch({
            type: 'FETCH_SELECTED_ASSIGMENT',
            payload: params.id
        });
    },[params.id]);

    //handle file submission
    const handleSubmission = (evt) => {
        evt.preventDefault();
        // console.log('pdf file', pdfSubmission);
        // console.log('video file', videoSubmission);
        // console.log('text file', textSubmission);
        //dispatch to SAGA for post to server
        dispatch({
            type: 'CREATE_SUBMISSION',
            payload: {
                pdfSubmission,
                videoSubmission,
                textSubmission,
                assignmentId: assignment.id,
            }
        });
    }
    return(
        <>
            <h3 className="assignmentTitle">{assignment.name}</h3>
            {
            assignment.media ? <video width="640" height="480" controls src={assignment.media}></video>
            :
            null
            };
            {/* <div dangerouslySetInnerHTML={{__html: }}></div> */}            
            <div dangerouslySetInnerHTML={{__html: assignment.content}}></div>

            <form onSubmit={handleSubmission}>
                {  //is there a text submission requirement?
                    assignment.textField ? 
                        <div>
                            <textarea
                                id='textSubmission'
                                required
                                placeholder="Type your response here"
                                // value={story} 
                                // // update local state
                                //If text submission is null have it be an empty string, otherwise = value
                                value={textSubmission ? textSubmission : ''}
                                onChange={(evt)=>setTextSubmission(evt.target.value)}
                            />
                        </div>
                    :
                    null
                }
                {   //is there a file submission requirement?
                    assignment.file ? 
                        <div>
                            <label>Upload PDF Here</label>
                            <input 
                                required
                                title=' '
                                type='file' 
                                name="fileSubmission"                         
                                accept='.pdf'
                                onChange = {(evt)=>{setPdfSubmission(evt.target.files[0])}}
                            />
                        </div>
                    :
                    null
                }
                { //is there a video upload requirement?
                    assignment.video ?
                        <div>
                            <label> Upload Video Here</label>
                            <input 
                                type='text'
                                required   //dont cause 'cant be null error' 
                                            // if video submission != null set val, else set as empty string
                                value={videoSubmission ? videoSubmission : ''}  
                                onChange = {(evt)=>{setVideoSubmission(evt.target.value)}}
                            />
                        </div>
                    :
                    null
                }

                <input type="submit" />
            </form>
            
        </>
            

    )
}


export default AssignmentDetails;


//save suneditor format in case we change display type
{/* <SunEditor 
            // onChange={handleChange}
            setOptions={{
                height: 200,                                                   
            }}
            // hide={true}
            hideToolbar={true}
            disable={true}
            // defaultValue={'<p>&nbsp;&nbsp;&nbsp;&nbsp;Sam TEST 1Sam TEST 1Sam TEST 1Sam TEST 1<br></p>'}
            //  setContents={content}
        /> */}