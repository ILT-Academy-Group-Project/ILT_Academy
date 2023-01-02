import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DataGrid, GridToolbar} from '@mui/x-data-grid'
import { Box, Button } from '@mui/material'
import moment from "moment/moment";



function CohortSubmissions() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const submissions = useSelector(store => store.submissions.cohortSubmissionsReducer);
    const assignment = useSelector(store => store.assignments.selectedAssignmentReducer);
    const cohortInfo = useSelector(store => store.cohorts.singleCohortReducer);

    console.log('cohortInfo is', cohortInfo);

    useEffect(() => {
        dispatch({
            type: 'FETCH_ASSIGNMENT_SUBMISSIONS',
            payload: {
                cohortId:params.cohortId,
                assignmentId:params.assignmentId
            }
        })
        dispatch({
            type: 'FETCH_SELECTED_ASSIGNMENT',
            payload: params.assignmentId
        })
        dispatch({
            type: 'FETCH_COHORT',
            payload: params.cohortId
        })
    },[])

    const columns = [
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
          },
        {
          field: 'firstName',
          headerName: 'First name',
          width: 150,
          editable: true,
        },
        {
          field: 'lastName',
          headerName: 'Last name',
          width: 150,
          editable: true,
        },
        {
          field: 'file',
          headerName: 'File',
          width: 110,
        },
        {
            field: 'text',
            headerName: 'Text',
            width: 110,
          },
          {
            field: 'video',
            headerName: 'Video',
            width: 110,
          },
        {
          field: 'dateSubmitted',
          headerName: 'Date Submitted',
          width: 250,
        },
      ];
      
      const rows = [];

      submissions.map(submission => {

          console.log('submission is ', submission)
          if(submission.assignmentId == params.assignmentId ){
            let studentSubmission =  {
                id: submission.studentId,
                status: '✅',
                firstName: submission.firstName,
                lastName: submission.lastName,
                file: submission.file,
                text: submission.text,
                video: submission.video,
                dateSubmitted: moment(submission.submissionDate).format('MMMM Do YYYY, h:mm:ss a')
              } 
            rows.push(studentSubmission) 
          } else if(submission.assignmentId == null){
            let missingSubmission =  {
                id: submission.studentId,
                status: '❌',
                firstName: submission.firstName,
                lastName: submission.lastName,
                file: submission.file,
                text: submission.text,
                video: submission.video
              } 
            rows.push(missingSubmission)
          }
       
      })

    return(
            <>
            <Button
            onClick={()=>history.push(`/admin/cohort/modules/${params.cohortId}/${params.assignmentId}`)}>Back to Assignments</Button>
            <h1>{assignment.name}</h1>
            <h3>{cohortInfo.cohortName}</h3>
            
            <Box sx={{ height: 400, width: '90%', margin: 10 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[8]} 
              components={{
                Toolbar: GridToolbar
              }} 
            />
            </Box>
            </>
            
      

            )
}

export default CohortSubmissions;