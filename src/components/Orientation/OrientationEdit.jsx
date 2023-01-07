import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";
import FormData from "form-data";
import OrientationStep from "./OrientationStep";
const Swal = require('sweetalert2');
import './Orientation.css'
//MUI IMPORTS
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

function OrientationEdit() {

    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const editOrientation = useSelector(store => store.orientation.editOrientationReducer);

    const [video, setVideo] = useState('');
    //use usestate to track content of WYSIWYG
    const [content, setContent] = useState('');
    //useState to track assignment title
    const [title, setTitle] = useState('');

    //submission types
    const [submission, setSubmission] = useState(false);
    const [orientation, setOrientation] = useState(false);

    const [step, setStep] = useState(0)

    useEffect(() => {
        dispatch({
            type: 'FETCH_EDIT_ORIENTATION',
            payload: params.id
        });

    }, [params.id]);


    const submitEditAssignment = (evt) => {
        evt.preventDefault();
        // console.log('in submit edit assignment');
        //ensure there is content in the WYSIWYG
        if (editOrientation.content.length <= 10) {
            alert('Must put content into the assignment');
            return
        }

        //dispatch updated assignment to saga for axios.put
        dispatch({
            type: 'UPDATE_ORIENTATION',
            payload: editOrientation
        });

        Swal.fire({
            title: 'Success!',
            confirmButtonColor: '#f96b61'
        })
            .then((result) => {
                history.push(`/admin/orientation/list`);
            })

        //------------------------todo update this push::::::---------------------------
        // history.push(`/admin/modules/${params.seriesId}`)

    }

    const handleChange = (content) => {
        dispatch({
            type: 'UPDATE_EDIT_ORIENTATION',
            payload: { content: content }
        })
    }


    const handleImageUploadBefore = (files, info, uploadHandler) => {
        // uploadHandler is a function
        // console.log(files, info)

        const callBack = async () => {
            let formData = new FormData();
            formData.append('image', files[0]);
            const response = await axios.post('/api/orientation/imagefield', formData, {
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
            type: 'UPDATE_EDIT_ORIENTATION',
            payload: { media: evt.target.files[0] }
        });
        // setVideoUrl({imageUrl: URL.createObjectURL(evt.target.files[0])})

    }



    return (

        <>


            <ThemeProvider theme={PrimaryMainTheme}>
                <Typography
                    variant="h1"
                    color='primary'
                    sx={{ textAlign: 'center' }}
                >
                    Create Orientation
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
                                    autoFocus
                                    placeholder="Orientation Name"
                                    type='text'
                                    value={editOrientation.name}
                                    onChange={(evt) => dispatch({
                                        type: 'UPDATE_EDIT_ORIENTATION',
                                        payload: { name: evt.target.value }
                                    })}
                                />
                            </Grid2>
                            <Grid2 item sm={1} sx={{ marginRight: '1rem' }}>
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
                                    placeholder="Step"
                                    required
                                    type='number'
                                    value={editOrientation.step}
                                    onChange={(evt) => dispatch({
                                        type: 'UPDATE_EDIT_ORIENTATION',
                                        payload: { step: evt.target.value }
                                    })}
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
                                    setContents={editOrientation.content}
                                />
                            </Grid2>
                            <Grid2 item sm={1}></Grid2>
                        </Grid2>
                        {editOrientation.id ?
                            <FormGroup sx={{ textAlign: 'center' }}>
                                <FormLabel>
                                    <Typography
                                        variant="h3"
                                        sx={{ fontSize: '20px' }}
                                    >
                                        Submission Type
                                    </Typography>
                                </FormLabel>
                                <FormControlLabel
                                    control={<Checkbox checked={editOrientation.submission} />}
                                    labelPlacement='top'
                                    onChange={(evt) => dispatch({
                                        type: 'UPDATE_EDIT_ORIENTATION',
                                        payload: { submission: !editOrientation.submission }
                                    })}
                                    variant='body1'
                                    color='primary'
                                />
                            </FormGroup>
                            :
                            null
                        }
                        <Grid2 container sx={{ textAlign: 'right' }} spacing={2}>
                            <Grid2 item sm={1}></Grid2>
                            <Grid2 item sm={10}>
                                <Button
                                    sx={{ marginTop: '1rem' }}
                                    size='large'
                                    type="submit"
                                    variant="contained"
                                >
                                    <Typography variant="body1">Edit Assignment</Typography>
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

export default OrientationEdit;







//VIDEO CODE

{/* { typeof editOrientation.media === 'string' && editOrientation.media !== '' && editOrientation.media !== 'undefined' ? 
                    <video width="640" height="480" controls src={editOrientation.media}></video> 
                : 
                    null}
                <button type='button' onClick={(evt)=>dispatch({
                        type: 'UPDATE_EDIT_ORIENTATION',
                        payload: {media: null}
                    })}>Delete Video</button>

                <label>Upload New Video
                    <input 
                        accept="video/*"               
                        type='file' 
                        name="selectedVideo"
                        onChange={videoChange}                                            
                    />
                </label> */}