import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";
import FormData from "form-data";
import OrientationStep from "./OrientationStep";
import './Orientation.css'

function OrientationEdit() {

    const params = useParams();
    const dispatch = useDispatch();
    const editOrientation = useSelector(store => store.orientation.editOrientationReducer);

    useEffect(() => {
        dispatch({
            type: 'FETCH_EDIT_ORIENTATION',
            payload: params.id
        });
    }, []);

    const submitEditAssignment = (evt) => {
        evt.preventDefault();
        // console.log('in submit edit assignment');
        //ensure there is content in the WYSIWYG
        if(editOrientation.content.length <=10){
            alert('Must put content into the assignment');
            return
        }
    
        //dispatch updated assignment to saga for axios.put
        dispatch({
            type: 'UPDATE_ASSIGNMENT', 
            payload: editOrientation
        });
    
        Swal.fire('Success!')
            .then((result) => {
                history.push(`/admin/orientation/list`);
              })
    
        //------------------------todo update this push::::::---------------------------
        // history.push(`/admin/modules/${params.seriesId}`)
    
    }
    
        const handleChange = (content) => {
            dispatch({
                type: 'UPDATE_EDIT_ORIENTATION',
                payload: {content: content}
            })
        }
    
    
        const handleImageUploadBefore= (files, info, uploadHandler) => {
            // uploadHandler is a function
            // console.log(files, info)
            
            const callBack = async () => { 
            let formData = new FormData();
            formData.append('image', files[0]);
            const response = await axios.post('/api/orientation/imagefield', formData, {
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
                type: 'UPDATE_EDIT_ORIENTATION',
                payload: { media: evt.target.files[0] }
            });
            // setVideoUrl({imageUrl: URL.createObjectURL(evt.target.files[0])})
    
        }

    return (

        <>
            {/* <video width="320" height="240" controls src="/videos/assignmentVideo1670963030995.mov">
            
            </video> */}

            {/* <OrientationStep /> */}
            <form onSubmit={submitEditAssignment}>
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
                    placeholder={editOrientation.name}
                    onChange={(evt) => setTitle(evt.target.value)}
                />
                <input
                    required
                    type='text'
                    placeholder={editOrientation.step}
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
                    setContents={editOrientation.content}
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

export default OrientationEdit;