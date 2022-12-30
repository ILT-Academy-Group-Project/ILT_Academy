import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { useParams, useHistory } from 'react-router-dom';
import { Markup } from 'interweave';
//sweet alert import
const Swal = require('sweetalert2')

function AssignmentDetails () {

    //import dispatch, history, params
    const history = useHistory();
    const dispatch = useDispatch();
    const params=useParams();

    //get selected assignment for the render
    //import user
    const user = useSelector(store => store.user);
    const assignment = useSelector(store => store.assignments.selectedAssignmentReducer);
    //user's submissions to check if assignments are
    const submissions = useSelector(store => store.submissions.userSubmissionsReducer);
    const singleSubmission= useSelector(store => store.submissions.singleSubmissionReducer);

    //usestate to keep files
    const [pdfSubmission, setPdfSubmission] = useState(null);
    const [videoSubmission, setVideoSubmission] = useState(null);
    const [textSubmission, setTextSubmission] = useState(null);


    //useEffect for getting assignment by id
    useEffect(() => {
        //fetch the assignment to display on this page using params
        dispatch({
            type: 'FETCH_SELECTED_ASSIGNMENT',
            payload: params.id
        });
        //get the user's submissions to see if they have submitted this assignment already
        dispatch({
            type: 'FETCH_USER_SUBMISSIONS',
            payload: user.id,
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

        //confirm assignment is completed
        Swal.fire('Assignment Completed!')
        .then((result) => {
            history.push(`/studentportal/modules/${assignment.seriesId}`);
          })   
    }

    const deleteLesson = () => {

        //sweet alert for delete confirmation
        Swal.fire({
            title: 'Are you sure you want to delete this post?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            iconColor: 'red',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: 'red',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
            'Deleted!',
            'Assignment has been deleted.'
            )
            //dispatch delete request to saga
            dispatch({
                type: 'DELETE_ASSIGNMENT',
                payload: params.id,
            });
            //after delete head home
            history.push(`/admin/modules/${assignment.seriesId}`)
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            Swal.fire(
            'Cancelled'
            )
        }
        })

        // history.push('')
    }

    const editLesson = () => {
        // console.log('IN EDITLESSON FN');
        //go to the edit url
        history.push(`/admin/assignment/edit/${params.id}`);
    }

    //populate Fields if assignment is complete
    const populateIfComplete = () => {
        // console.log('completed!');
        dispatch({
            type: 'FETCH_SINGLE_SUBMISSION',
            payload: params.id
        });

    }

    const completed = submissions.some(submission => {return submission.assignmentId === Number(params.id)});
    //check if this assignment has been submitted already by the logged in user and then get fields to populate
    if(completed){
        //call the populate field to get this submission and then populate the fields
        populateIfComplete();
    }

    //if there is no assignment at the url with this id return 404
    if(!assignment.name){
        return <h1>404</h1>
    }
    // 
    // console.log('completed?', completed);
    return(
        <>
            <header>
                <h3 className="assignmentTitle">{assignment.name}</h3>
                {user.accessLevel === 2 ? 
                    <>
                        <button onClick={editLesson}>Edit</button>
                        <button onClick={deleteLesson}>Delete</button>
                    </>
                    :
                    null
                }
                <button onClick={()=>history.goBack()}>Go Back</button>
            </header>
                
            {
                // check if their is a video url included
                //TODO: fix db query bug where null is sent as string
                //although this fix works for now, it is a hard coded fix
            typeof assignment.media==='string' && assignment.media !== 'null' ? 
            <video width="640" height="480" controls src={assignment.media}></video>
            :
            null
            }
                {/* TODO REPLACE!!!! */}
                <div dangerouslySetInnerHTML={{__html: assignment.content}}/>
            {/* <Markup content={assignment.content}/> */}
            <form onSubmit={handleSubmission}>
                {  //is there a text submission requirement for the student?
                    assignment.textField  && user.accessLevel !== 2  ? 
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
                {   //is there a file submission requirement for the student?
                    assignment.file  && user.accessLevel !== 2 ? 
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
                { //is there a video upload requirement for the student?
                    assignment.video && user.accessLevel !== 2 ?
                        <div>
                            <label> Upload Video Here</label>
                            <input 
                                type='url'
                                placeholder="Include https://"
                                required   //dont cause 'cant be null error' 
                                            // if video submission != null set val, else set as empty string
                                value={videoSubmission ? videoSubmission : ''}  
                                onChange = {(evt)=>{setVideoSubmission(evt.target.value)}}
                            />
                        </div>
                    :
                    null
                }

                { 
                // if the user is a student and there is a submission requirement show submit button
                user.accessLevel===1 && assignment.video || assignment.file || assignment.textField ? 
                <button type="submit">Submit</button>
                :
                // if user is admin include no button
                user.accessLevel===2 ?
                null
                :
                //if user is a student and their are no submissions required show mark complete button            
                <button type="submit">Mark Complete</button>
                }
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



        