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
        console.log('assignment is:', assignment);

        //useEffect for getting assignment by id
        useEffect(() => {
            dispatch({
                type: 'FETCH_SELECTED_ASSIGMENT',
                payload: params.id
            });
        },[params.id]);
    return(
        <>
            {/* <div dangerouslySetInnerHTML={{__html: }}></div> */}
            <h3 className="assignmentTitle">{assignment.name}</h3>
            <div dangerouslySetInnerHTML={{__html: assignment.content}}></div>

            
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