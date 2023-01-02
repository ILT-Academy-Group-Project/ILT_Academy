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

    useEffect(() => {
        dispatch({
            type: 'FETCH_EDIT_ORIENTATION',
            payload: params.id
        });
    }, []);

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
                    setContents={content}
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