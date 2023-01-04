import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";
import FormData from "form-data";
import OrientationStep from "./OrientationStep";
import './Orientation.css'

import { PrimaryMainTheme } from "../PrimaryMainTheme/PrimaryMainTheme";
import { ThemeProvider } from '@mui/system';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
    TextareaAutosize,
    Typography,
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
} from '@mui/material'

function CreateAssignment() {
    //import user
    const user = useSelector(store => store.user);
    const orientationArray = useSelector((store) => store.orientation.orientationReducer);

    //setup
    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();

    // console.log(user.accessLevel)
    // import useState and create state for selected file on video upload
    const [video, setVideo] = useState('');
    //use usestate to track content of WYSIWYG
    const [content, setContent] = useState('');
    //useState to track assignment title
    const [title, setTitle] = useState('');

    //submission types
    const [submission, setSubmission] = useState(false);
    const [orientation, setOrientation] = useState(false);

    const [step, setStep] = useState(0)

    const submitAssignment = (evt) => {
        evt.preventDefault();
        console.log('in create orientation');
        //ensure there is content in the WYSIWYG
        if (content.length <= 10) {
            alert('Must put content into the assignment');
            return
        }

        // if (orientation === true) {
        dispatch({
            type: 'CREATE_ORIENTATION',
            payload: {
                video,
                content,
                title,
                submission,
                step
            }
        })

        // } else {
        //     //dispatch to the SAGA for serverpost route
        //     dispatch({
        //         type: 'CREATE_ASSIGNMENT',
        //         payload: {
        //             assignmentVideo,
        //             assignmentContent,
        //             assignmentTitle,
        //             moduleId: params.moduleId,
        //             postClass,
        //             textField,
        //             // name to match database, lef as submission so there isnt confusion on this page
        //             file: fileSubmission,
        //             video: videoSubmission,
        //         }
        //     })
        //     //push to modules view
        //     history.push(`/admin/modules/${params.seriesId}`)
        // }
    }


    // console.log('assignmentcontent', assignmentContent);


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

    const handleChange = (content) => {
        setContent(content);
    }

    //testing logs
    // console.log('submission types, textfield:', textField, 'fileSubmission', fileSubmission);
    // console.log('pre class should be false:', postClass);
    // console.log('video submission', videoSubmission);
    return (
        <>
            {/* <OrientationStep /> */}
            <ThemeProvider theme={PrimaryMainTheme}>
                <Typography
                    variant="h1"
                    color='primary'
                    sx={{ textAlign: 'center' }}
                >
                    Create New Assignment
                </Typography>
                <Box
                    sx={{
                        backgroundColor: '#80808017',
                        margin: '1rem',
                        borderRadius: '10px',
                        paddingBottom: '2rem',
                    }}
                >
                    <form onSubmit={submitAssignment}>
                        <Grid2 container spacing={3}>
                            <Grid2 item sm={1}></Grid2>
                            <Grid2 item sm={3}>
                                <InputLabel
                                    color='primary'
                                    sx={{
                                        color: '#f96b61',
                                        fontWeight: 'bold',
                                        marginBottom: 0,
                                        fontSize: '22px'
                                    }}
                                >
                                    Orientation Name
                                </InputLabel>
                                <OutlinedInput
                                    sx={{ marginTop: 0, backgroundColor: 'white', fontSize: '20px' }}
                                    required
                                    type='text'
                                    placeholder="Orientation Name"
                                    onChange={(evt) => setTitle(evt.target.value)}
                                    autoFocus
                                    require
                                />
                            </Grid2>
                            <Grid2 item sm={1} xs={2} sx={{ marginRight: '1rem' }}>
                                <InputLabel
                                    color='primary'
                                    sx={{
                                        color: '#f96b61',
                                        fontWeight: 'bold',
                                        marginBottom: 0,
                                        fontSize: '22px'
                                    }}
                                >Step</InputLabel>
                                <OutlinedInput
                                    sx={{ marginTop: 0, backgroundColor: 'white', fontSize: '20px' }}
                                    required
                                    type='number'
                                    placeholder="Step"
                                    onChange={(evt) => setStep(evt.target.value)}
                                />
                            </Grid2>
                            <Grid2 item sm={5} sx={{ alignContent: 'right' }} >
                                <InputLabel
                                    sx={{
                                        color: '#f96b61',
                                        fontWeight: 'bold',
                                        marginBottom: 0,
                                        fontSize: '22px'
                                    }}
                                >
                                    Upload Video
                                </InputLabel>
                                <OutlinedInput
                                    sx={{
                                        marginTop: 0, backgroundColor: 'white', fontSize: '20px'
                                    }}
                                    accept="video/*"
                                    type='file'
                                    name="selectedVideo"
                                    inputProps={{ accept: 'video/*' }}
                                    onChange={(evt) => setVideo(evt.target.files[0])}
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
                                        videoFileInput: false,
                                        videoUrlInput: false,
                                        videoRatioShow: false,
                                        constrainProportions: false,
                                        videoHeight: "540px",
                                        videoWidth: "960px",
                                    }}
                                    onImageUploadBefore={handleImageUploadBefore}
                                //  setContents={content}
                                />   
                            </Grid2>
                            <Grid2 item sm={1}></Grid2>      
                        </Grid2>                    
                                <FormGroup sx={{textAlign: 'center'}}>
                                <FormLabel>
                                        <Typography
                                            variant="h3"
                                            sx={{ fontSize: '20px' }}
                                        >
                                            Submission Type
                                        </Typography>
                                    </FormLabel>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        labelPlacement='top'
                                        value={true}
                                        onChange={() => setSubmission(!submission)}
                                        label="Text Field"
                                    />
                                </FormGroup>   

                                <Grid2 container sx={{ textAlign: 'right'}} spacing={2}>
                            <Grid2 item sm={1}></Grid2>
                            <Grid2 item sm={10}>
                                <Button 
                                    sx={{marginTop:'1rem'}}
                                    size='large' 
                                    type="submit" 
                                    variant="contained"
                                >
                                    Create Assignment
                                </Button>
                            </Grid2>
                            <Grid2 item sm={1}></Grid2>
                        </Grid2>
                    </form>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default CreateAssignment






// const getVideo = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: { width: 300 } })
//       .then(stream => {
//         let video = videoRef.current;
//         video.srcObject = stream;
//         video.play();
//       })
//       .catch(err => {
//         console.error("error:", err);
//       });
//   };

//   const videoRef = useRef(null);


// <button>Take selfie</button>
//                 <video ref={videoRef}></video>
//                 <input 
//                     capture="camera"                
//                     type='file' 
//                     name="assignment_video"
//                     // onChange = {changeHandler}
//                 />

//                 useEffect(() => {
//                     getVideo();
//                   }, [videoRef]);


{/* <label>Upload Video
                            <input
                                accept="video/*"
                                type='file'
                                name="selectedVideo"
                                onChange={(evt) => setVideo(evt.target.files[0])}
        
                            />
                        </label>
                        <input
                            required
                            type='text'
                            placeholder="Assignment Name"
                            onChange={(evt) => setTitle(evt.target.value)}
                        /> */}

{/* <div>
                            <label>Pre Class</label>
                            <input defaultChecked onClick={() => setPostClass(false)} type="radio" name="classType" className="valueRadio"></input>
                            <label>Post Class</label>
                            <input onClick={() => setPostClass(true)} type="radio" name="classType" className="valueRadio"></input>
                            <label>Orientation</label>
                            <input onClick={() => setOrientation(true)} type="radio" name="classType" className="valueRadio"></input>
                        </div>  */}