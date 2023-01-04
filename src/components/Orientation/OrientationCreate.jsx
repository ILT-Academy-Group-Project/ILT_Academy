import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";
import FormData from "form-data";
import OrientationStep from "./OrientationStep";
import './Orientation.css'

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

        history.push('/admin/orientation/list')

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

    const handleChange = (content) => {
        setContent(content);
    }

    //testing logs
    // console.log('submission types, textfield:', textField, 'fileSubmission', fileSubmission);
    // console.log('pre class should be false:', postClass);
    // console.log('video submission', videoSubmission);
    return (
        <>
            {/* <video width="320" height="240" controls src="/videos/assignmentVideo1670963030995.mov">
            
            </video> */}

            {/* <OrientationStep /> */}
            <form onSubmit={submitAssignment}>
                <label>Upload Video
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
                />
                <input
                    required
                    type='text'
                    placeholder="Step"
                    onChange={(evt) => setStep(evt.target.value)}
                />
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

                <div>
                    {/* <label>Pre Class</label>
                    <input defaultChecked onClick={() => setPostClass(false)} type="radio" name="classType" className="valueRadio"></input>
                    <label>Post Class</label>
                    <input onClick={() => setPostClass(true)} type="radio" name="classType" className="valueRadio"></input> */}
                    {/* <label>Orientation</label>
                    <input onClick={() => setOrientation(true)} type="radio" name="classType" className="valueRadio"></input> */}
                </div>
                <div>
                    <h3>Submission type</h3>
                    <label>Textfield</label>
                    <input onClick={() => setSubmission(!submission)} type="checkbox" name="textField" className="valueRadio"></input>
                    {/* <label>File</label>
                    <input onClick={() => setFileSubmission(!fileSubmission)} type="checkbox" name="fileSubmission" className="valueRadio"></input>
                    <label>Video</label>
                    <input onClick={() => setVideoSubmission(!videoSubmission)} type="checkbox" name="fileSubmission" className="valueRadio"></input> */}
                </div>


                <button type="submit">Create Assignment</button>
            </form>
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