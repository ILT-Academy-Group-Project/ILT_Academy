import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { useParams, useHistory } from 'react-router-dom';
import { Markup } from 'interweave';
import { margin, ThemeProvider } from '@mui/system';
import { PrimaryMainTheme } from "../../PrimaryMainTheme/PrimaryMainTheme";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
//sweet alert import
const Swal = require('sweetalert2')

function AssignmentDetails() {

    //import dispatch, history, params
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();

    //get selected assignment for the render
    //import user
    const user = useSelector(store => store.user);
    const assignment = useSelector(store => store.assignments.selectedAssignmentReducer);
    //user's submissions to check if assignments are
    const submissions = useSelector(store => store.submissions.userSubmissionsReducer);
    const singleSubmission = useSelector(store => store.submissions.singleSubmissionReducer);

    const parse = require('html-react-parser');

    //usestate to keep files
    // const [pdfSubmission, setPdfSubmission] = useState(null);
    // const [videoSubmission, setVideoSubmission] = useState(null);
    // const [textSubmission, setTextSubmission] = useState(null);

    //check if this assignment has been submitted already by the logged in user and then get fields to populate


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
        //check if user has completed this assignment and set it to redux

        dispatch({
            type: 'FETCH_SINGLE_SUBMISSION',
            payload: params.id
        });


    }, [params.id]);

    //handle file submission
    const handleSubmission = (evt) => {
        evt.preventDefault();
        // console.log('pdf file', pdfSubmission);
        // console.log('video file', videoSubmission);
        // console.log('text file', textSubmission);
        //dispatch to SAGA for post to server

        dispatch({
            type: 'CREATE_SUBMISSION',   //add in the assignment id if this is a new submission
            payload: { ...singleSubmission, assignmentId: assignment.id }
        });

        //confirm assignment is completed

        Swal.fire({
            title: 'Assignment Completed!',
            confirmButtonColor: '#f96b61'
        })

            .then((result) => {
                history.push(`/studentportal/modules/${assignment.seriesId}`);
            })
    }

    const deleteLesson = () => {

        //sweet alert for delete confirmation
        Swal.fire({
            title: 'Are you sure you want to delete this lesson?',
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

                Swal.fire({
                    title: 'Deleted!',
                    text: 'Assignment has been deleted.',
                    confirmButtonColor: '#f96b61'
                })

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

                Swal.fire({
                    title: 'Cancelled',
                    confirmButtonColor: '#f96b61'
                })

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





    //if there is no assignment at the url with this id return 404
    if (!assignment.name) {
        return <h1>404</h1>
    }
    // 

    return (
        <>

            <ThemeProvider theme={PrimaryMainTheme}>
                
                <Box backgroundColor='secondary.light' sx={{ padding: 2, margin: 8, mb: 0}} borderRadius={2}>

                    <header>
                        <Typography sx={{margin: 2}} color="primary.light" variant="h1" className="assignmentTitle">{assignment.name}</Typography>

                    </header>

                    {
                        // check if their is a video url included
                        //TODO: fix db query bug where null is sent as string
                        //although this fix works for now, it is a hard coded fix
                        typeof assignment.media === 'string' && assignment.media !== 'null' ?
                            <video width="640" height="480" controls src={assignment.media}></video>
                            :
                            null
                    }
                    {/* TODO REPLACE!!!! */}
                    {/* <div dangerouslySetInnerHTML={{__html: assignment.content}}/> */}
                    <Box sx={{ margin: 2, padding: 2, backgroundColor: 'secondary.main', border: 2, borderColor: 'primary.main' }} borderRadius={2}>
                        <Box sx={{ padding: 4, backgroundColor: 'tertiary.main' }} borderRadius={2}>
                            {parse(assignment.content)}
                        </Box>
                    </Box>
                    {/* <Markup content={assignment.content}/> */}
                    {/* if admin delete this box */}
                    {user.accessLevel===2 ? null : <Box sx={{ margin: 2, padding: 2, backgroundColor: 'secondary.main', border: 2, borderColor: 'primary.main' }} borderRadius={2}>
                        {/* <Box sx={{ padding: 2, backgroundColor: 'tertiary.main' }} borderRadius={2}> */}
                        <form onSubmit={handleSubmission}>
                            {  //is there a text submission requirement for the student?
                                assignment.textField && user.accessLevel !== 2 ?
                                    <div>
                                        <TextField
                                            id='textSubmission'
                                            label="Type your response here"
                                            // placeholder="Type your response here"
                                            color='primary'
                                            multiline
                                            required
                                            maxRows={10}
                                            minRows={5}
                                            sx={{
                                                "& .MuiFormLabel-root": {
                                                    color: 'primary.main'
                                                },
                                                "& .MuiFormLabel-root.Mui-focused": {
                                                    color: 'primary.main'
                                                },
                                                "& .MuiInputBase-root": {
                                                    color: 'secondary.contrastText'
                                                },
                                                margin: 2,
                                                width: '97.5%'
                                            }}
                                            
                                            value={singleSubmission.textInput ? singleSubmission.textInput : ''}
                                            onChange={(evt) => {
                                                dispatch({
                                                    type: 'UPDATE_SINGLE_SUBMISSION',
                                                    payload: { textInput: evt.target.value }
                                                })
                                            }}
                                            // value={story} 
                                            // // update local state
                                            //If text submission is null have it be an empty string, otherwise = value
                                            
                                        />
                                    </div>
                                    :
                                    null
                            }
                            {   //is there a file submission requirement for the student?
                                assignment.file && user.accessLevel !== 2 ?
                                    <div>
                                        <Typography sx={{margin: 2}} color="primary.main" variant="h2">Upload PDF Here</Typography>
                                        <TextField
                                            required
                                            title=' '
                                            type='file'
                                            name="fileSubmission"
                                            inputProps={{ accept: 'application/pdf' }}
                                            color='primary'
                                            sx={{
                                                "& .MuiFormLabel-root": {
                                                    color: 'primary.main'
                                                },
                                                "& .MuiFormLabel-root.Mui-focused": {
                                                    color: 'primary.main'
                                                },
                                                "& .MuiInputBase-root": {
                                                    color: 'secondary.contrastText'
                                                },
                                                margin: 2
                                            }}
                                            onChange={(evt) => {
                                                dispatch({
                                                    type: 'UPDATE_SINGLE_SUBMISSION',
                                                    payload: { file: evt.target.files[0] }
                                                })
                                            }}
                                        />
                                    </div>
                                    :
                                    null
                            }
                            { //is there a video upload requirement for the student?
                                assignment.video && user.accessLevel !== 2 ?
                                    <div>
                                        <Typography sx={{margin: 2}} variant="h2" color="primary.main"> Upload Video Here</Typography>
                                        <TextField
                                            type='url'
                                            label="Include https://"
                                            required   //dont cause 'cant be null error' 
                                            // if video submission != null set val, else set as empty string
                                            color='primary'
                                            sx={{
                                                "& .MuiFormLabel-root": {
                                                    color: 'primary.main'
                                                },
                                                "& .MuiFormLabel-root.Mui-focused": {
                                                    color: 'primary.main'
                                                },
                                                "& .MuiInputBase-root": {
                                                    color: 'secondary.contrastText'
                                                },
                                                margin: 2,
                                                width: 500
                                            }}
                                            value={singleSubmission.video ? singleSubmission.video : ''}
                                            onChange={(evt) => {
                                                dispatch({
                                                    type: 'UPDATE_SINGLE_SUBMISSION',
                                                    payload: { video: evt.target.value }
                                                })
                                            }}
                                        />
                                    </div>
                                    :
                                    null
                            }

                            {
                                // if user is admin include no button
                                user.accessLevel === 2 ?
                                null
                                :
                                // if the user is a student and there is a submission requirement show submit button
                                user.accessLevel === 1 && assignment.video || assignment.file || assignment.textField ?
                                    <Button sx={{ margin: 2}} variant="contained" type="submit">Submit</Button>
                                    :
                                        //if user is a student and their are no submissions required show mark complete button            
                                        <Button variant="contained" type="submit">Mark Complete</Button>
                            }
                        </form>
                    </Box>}
                    {/* </Box> */}
                </Box>
                {user.accessLevel === 2 ?
                    <>
                        <Button onClick={editLesson}>Edit</Button>
                        <Button onClick={deleteLesson}>Delete</Button>
                    </>
                    :
                    null

                }
                <Button variant="outlined" sx={{margin: 8}} onClick={() => history.goBack()}>Go Back</Button>
            </ThemeProvider>
        </>
    )
}


export default AssignmentDetails;
