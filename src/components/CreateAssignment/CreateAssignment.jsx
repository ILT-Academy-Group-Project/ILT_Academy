import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File


function CreateAssignment(){
    //import user
    const user = useSelector(store => store.user);

    //setup dispatch
    const dispatch = useDispatch();

    // console.log(user.accessLevel)
    // import useState and create state for selected file on video upload
    const [selectedVideo, setSelectedVideo] = useState('');
    //use usestate to track content of WYSIWYG
    const [assignmentContent, setAssignmentContent] = useState('');
    //useState to track assignment title
    const [assignmentTitle, setAssignmentTitle] = useState('');

    const submitAssignment = (evt) => {
        evt.preventDefault();
        console.log('in submit assignment');
        if(assignmentContent.length <=10){
            alert('Must put content into the assignment');
            return
        }
    }


    return(
        <>
            <form onSubmit={submitAssignment}>
                <label>Upload Video
                    <input 
                        accept="video/*"               
                        type='file' 
                        name="assignment_video"
                        onChange = {(evt) => setSelectedVideo(evt.target.files)}
 
                    />
                </label>
                <input 
                    required
                    type='text' 
                    placeholder="Assignment Name"
                    onChange={(evt)=>setAssignmentTitle(evt.target.value)}
                />
                <SunEditor 
                onChange={(evt)=>setAssignmentContent(evt.target.value)}
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
                    // plugins: [font] set plugins, all plugins are set by default
					// Other option
			    }}
                            //variable, will render as a string but not as a variable.
                
                // setContents={content}
            />

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