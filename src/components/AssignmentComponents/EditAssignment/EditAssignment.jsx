import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { useParams, useHistory } from 'react-router-dom';
import { Markup } from 'interweave';
//sweet alert import
const Swal = require('sweetalert2')
import axios from 'axios';

//MUI imports
import { PrimaryMainTheme } from "../../PrimaryMainTheme/PrimaryMainTheme";
import { ThemeProvider } from '@mui/system';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
    TextareaAutosize,
    Typography,
    Switch,
    FormLabel,
    Radio,
    RadioGroup,
    FormGroup,
    Input,
    Box,
    Checkbox,
    OutlinedInput,
    InputLabel,
    MenuItem,
    FormControl,
    FormControlLabel,
    Select,
    Button
} from '@mui/material';

// ROUTE: /admin/assignment/edit/:id
function EditAssignment() {
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
        dispatch({
            type: 'FETCH_EDIT_ASSIGNMENT',
            payload: params.id
        });
    }, [dispatch]);


    const submitEditAssignment = (evt) => {
        evt.preventDefault();
        // console.log('in submit edit assignment');
        //ensure there is content in the WYSIWYG
        if (editAssignment.content.length <= 10) {
            alert('Must put content into the assignment');
            return
        }

        //dispatch updated assignment to saga for axios.put
        dispatch({
            type: 'UPDATE_ASSIGNMENT',
            payload: editAssignment
        });

        Swal.fire('Success!')
            .then((result) => {
                history.push(`/admin/modules/${editAssignment.seriesId}`);
            })

        //------------------------todo update this push::::::---------------------------
        // history.push(`/admin/modules/${params.seriesId}`)

    }

    const handleChange = (content) => {
        dispatch({
            type: 'UPDATE_EDIT_ASSIGNMENT',
            payload: { content: content }
        })
    }


    const handleImageUploadBefore = (files, info, uploadHandler) => {
        // uploadHandler is a function
        // console.log(files, info)

        const callBack = async () => {
            let formData = new FormData();
            formData.append('image', files[0]);
            const response = await axios.post('/api/assignments/imagefield', formData, {
                //must include this header, it is what Multer uses to id file
                headers: {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            });
            console.log('response', response.data);
            uploadHandler(response.data);
        }

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
    return (
        <>
            <ThemeProvider theme={PrimaryMainTheme}>
                <Typography
                    variant="h1"
                    color='primary'
                    sx={{ textAlign: 'center' }}
                >
                    Edit Assignment
                </Typography>
                <Box
                    sx={{
                        backgroundColor: '#80808017',
                        margin: '1rem',
                        borderRadius: '10px',
                        paddingBottom: '2rem',
                    }}
                >
                    <form onSubmit={submitEditAssignment}>

                        {/* is there a video to display? If so display this */}
                        {typeof editAssignment.media === 'string' && editAssignment.media !== 'null' ?
                            <>
                                <Grid2 container spacing={2}>
                                    <Grid2 item sm={3}></Grid2>
                                    <Grid2 item sm={6}>
                                        <video width="100%" controls src={editAssignment.media}></video>
                                    </Grid2>
                                    <Grid2 item sm={3}></Grid2>
                                </Grid2>

                                <Grid2 container spacing={2}>
                                    <Grid2 item sm={3}></Grid2>
                                    <Grid2 item sm={3}>
                                        <Button
                                            variant='outlined'
                                            onClick={(evt) => dispatch({
                                                type: 'UPDATE_EDIT_ASSIGNMENT',
                                                payload: {
                                                    media: null
                                                }
                                            })}>Delete Video</Button>
                                    </Grid2>
                                    <Grid2 item sm={3}></Grid2>
                                </Grid2>

                            </>
                            :
                            null}

                        {/* post video inputs : if no video this is the start of the form */}
                        <Grid2 container spacing={2}>
                            <Grid2 item sm={1}></Grid2>
                            <Grid2 item sm={4}>
                                <InputLabel
                                    color='primary'
                                    sx={{
                                        color: '#f96b61',
                                        fontWeight: 'bold',
                                        marginBottom: 0,
                                        fontSize: '22px'
                                    }}
                                >
                                    Assignment Name
                                </InputLabel>
                                <OutlinedInput
                                    sx={{ marginTop: 0, backgroundColor: 'white', fontSize: '20px' }}
                                    required
                                    type='text'
                                    placeholder="Assignment Name"
                                    value={editAssignment.name}
                                    onChange={(evt) => dispatch({
                                        type: 'UPDATE_EDIT_ASSIGNMENT',
                                        payload: { name: evt.target.value }
                                    })}
                                    autoFocus
                                    variant='outligned'
                                    require
                                />
                            </Grid2>

                            <Grid2 item sm={7}>
                                <InputLabel
                                    sx={{
                                        color: '#f96b61',
                                        fontWeight: 'bold',
                                        marginBottom: 0,
                                        fontSize: '22px'
                                    }}
                                >
                                    Upload
                                    {/* if there isnt a video dont show 'new' */}
                                    {typeof editAssignment.media === 'string' && editAssignment.media !== 'null' ? <>&nbsp;New</>
                                        :
                                        null
                                    }
                                    &nbsp;Video
                                </InputLabel>
                                <OutlinedInput
                                    sx={{
                                        marginTop: 0, backgroundColor: 'white', fontSize: '20px'
                                    }}
                                    accept="video/*"
                                    type='file'
                                    name="selectedVideo"
                                    inputProps={{ accept: 'video/*' }}
                                    onChange={videoChange}
                                    color='primary'
                                />
                            </Grid2>

                        </Grid2>
                        <Grid2 container spacing={2}>
                            <Grid2 item sm={1}></Grid2>
                            <Grid2 item sm={10}>
                                <SunEditor
                                    onChange={handleChange}
                                    setOptions={{
                                        height: 500,
                                        buttonList: [
                                            ['font', 'align'],
                                            ['fontSize'],
                                            ['italic'],
                                            ['bold'],
                                            ['underline'],
                                            ['video'],
                                            ['image'],
                                        ],
                                        videoHeightShow: false,
                                        videoWidthShow: false,
                                        videoFileInput: false,
                                        videoUrlInput: false,
                                        videoRatioShow: false,
                                        videoWidth: "603px",
                                        videoHeight: "339px",
                                    }}
                                    onImageUploadBefore={handleImageUploadBefore}

                                    setContents={editAssignment.content}
                                />
                            </Grid2>
                            <Grid2 item sm={1}></Grid2>
                        </Grid2>
                        <Grid2 container sx={{ textAlign: 'center', alignContent: 'top' }} spacing={2}>
                            <Grid2 item sm={2}></Grid2>
                            <Grid2 item sm={4}>
                                <FormControl>
                                    <FormLabel><Typography variant="h3" sx={{ fontSize: '20px', marginTop: 0 }}>Pre/Post-Class?</Typography></FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        require
                                        defaultValue={editAssignment.postClass ? true : false}
                                    >
                                        <FormControlLabel
                                            control={<Radio required />}
                                            value={false}
                                            onChange={() => {
                                                dispatch({
                                                    type: 'UPDATE_EDIT_ASSIGNMENT',
                                                    payload: { postClass: false }
                                                })
                                            }}
                                            label="Pre-Class"
                                        />
                                        <FormControlLabel
                                            control={<Radio required />}
                                            value={true}
                                            label="Post-Class"
                                            onChange={() => {
                                                dispatch({
                                                    type: 'UPDATE_EDIT_ASSIGNMENT',
                                                    payload: { postClass: true }
                                                })
                                            }}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid2>
                            <Grid2 item sm={4}>
                                {editAssignment.id ?
                                    <FormGroup sx={{ display: 'inline' }}>
                                        <FormLabel>
                                            <Typography
                                                variant="h3"
                                                sx={{ fontSize: '20px' }}
                                            >
                                                Submission Type
                                            </Typography>
                                        </FormLabel>
                                        <FormControlLabel     //set starting state based on edit assignment
                                            control={<Checkbox checked={editAssignment.textField} />}
                                            labelPlacement='top'
                                            onChange={() => {
                                                dispatch({
                                                    type: 'UPDATE_EDIT_ASSIGNMENT',
                                                    payload: { textField: !editAssignment.textField }
                                                })
                                            }}
                                            label="Text Field"
                                        />
                                        <FormControlLabel       //set starting state based on edit assignment
                                            control={<Checkbox checked={editAssignment.file} />}
                                            labelPlacement='top'
                                            onChange={() => {
                                                dispatch({
                                                    type: 'UPDATE_EDIT_ASSIGNMENT',
                                                    payload: { file: !editAssignment.file }
                                                })
                                            }}
                                            label="File"
                                        />
                                        <FormControlLabel    //set starting state based on edit assignment
                                            control={<Checkbox checked={editAssignment.video} />}
                                            labelPlacement='top'
                                            onChange={() => {
                                                dispatch({
                                                    type: 'UPDATE_EDIT_ASSIGNMENT',
                                                    payload: { video: !editAssignment.video }
                                                })
                                            }}
                                            label="Video"
                                            variant='body1'
                                            color='primary'
                                        />
                                    </FormGroup>
                                    :
                                    null
                                }
                            </Grid2>
                            <Grid2 item sm={2}></Grid2>
                        </Grid2>
                        <Grid2 container sx={{ textAlign: 'right'}} spacing={2}>
                            <Grid2 item sm={1}></Grid2>
                            <Grid2 item sm={10}>
                                <Button 
                                    sx={{marginTop:'1rem'}}
                                    size='large' 
                                    type="submit" 
                                    variant="contained"
                                >
                                    Edit Assignment
                                </Button>
                            </Grid2>
                            <Grid2 item sm={1}></Grid2>
                        </Grid2>
                    </form>
                </Box>
            </ThemeProvider>
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









//original checkbox code  and radio code if there are bugs

{/* <div>
                            <h3>Submission type</h3>
                            <label>Textfield</label>
                            <input
                                onClick={() => {
                                    dispatch({
                                        type: 'UPDATE_EDIT_ASSIGNMENT',
                                        payload: { textField: !editAssignment.textField }
                                    })
                                }}
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
                                        payload: { file: !editAssignment.file }
                                    })
                                }}
                                defaultChecked={editAssignment.file}
                                value={editAssignment}
                                type="checkbox"
                                name="fileSubmission"
                                className="valueRadio"
                            ></input>
                            <label>Video</label>
                            <input
                                onClick={() => {
                                    dispatch({
                                        type: 'UPDATE_EDIT_ASSIGNMENT',
                                        payload: { video: !editAssignment.video }
                                    })
                                }}
                                defaultChecked={editAssignment.video}
                                type="checkbox"
                                name="fileSubmission"
                                className="valueRadio"
                            ></input>
                        </div> */}
{/* <div>

                            <label>Pre Class</label>
                            <input
                                // if preclass default checked
                                defaultChecked={editAssignment && !editAssignment.postClass}
                                // onClick={()=>setPostClass(false)} 
                                type="radio"
                                name="classType"
                                className="valueRadio"
                                onChange={() => {
                                    dispatch({
                                        type: 'UPDATE_EDIT_ASSIGNMENT',
                                        payload: { postClass: false }
                                    })
                                }}
                            >

                            </input>

                            <label>Post Class</label>
                            <input
                                //if postclass default checked
                                defaultChecked={editAssignment && editAssignment.postClass}
                                // onClick={()=>setPostClass(true)} 
                                type="radio"
                                name="classType"
                                className="valueRadio"
                                onChange={() => {
                                    dispatch({
                                        type: 'UPDATE_EDIT_ASSIGNMENT',
                                        payload: { postClass: true }
                                    })
                                }}
                            >
                            </input>

                        </div> */}
