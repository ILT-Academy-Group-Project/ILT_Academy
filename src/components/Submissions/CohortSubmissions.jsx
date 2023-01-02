import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DataGrid, GridToolbar, useGridApiContext} from '@mui/x-data-grid'
import { Box, Button, Link, Popper, Paper } from '@mui/material'
import moment from "moment/moment";



function CohortSubmissions() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const submissions = useSelector(store => store.submissions.cohortSubmissionsReducer);
    const assignment = useSelector(store => store.assignments.selectedAssignmentReducer);
    const cohortInfo = useSelector(store => store.cohorts.singleCohortReducer);

    // console.log('cohortInfo is', cohortInfo);

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
        console.log('params.cohortId is ', params.cohortId);
    },[params.cohortId, params.assignmentId])

    const columns = [
        {
            field: 'status',
            headerName: 'Status',
            width: 80,
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
          width: 150,
          renderCell: (params) => {
            if(params.value != null){
              return <Link href={`${params.row.file}`}>Download File</Link>
            }
            
          }
          
        },
        {
          field: 'text',
          headerName: 'Text',
          width: 150,
        },
        {
          field: 'video',
          headerName: 'Video',
          width: 130,
          renderCell: (params) => {
            if(params.value != null){
                return <Link href={`${params.row.video}`}>View Video</Link>
            }
              
          }
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
                text: submission.textInput,
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
                text: submission.textInput,
                video: submission.video
              } 
            rows.push(missingSubmission)
          }
       
      })
    // if(!cohortInfo.cohortName){
    //     return(<>loading...</>);
    // }
    return(
            <>
            <Button
            onClick={()=>history.push(`/admin/cohort/modules/${params.cohortId}/${assignment.seriesId}`)}
            >Back to Assignments</Button>
            <h1>{assignment.name}</h1>
            <h3>{cohortInfo.cohortName}</h3>
            
            <Box sx={{ height: 400, width: '90%', margin: 10 }}>
            <DataGrid
             sx={{
              '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' }, //this adds padding to 'auto' height
              '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
              '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '22px' },
            }}
              rows={rows}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[8]} 
              getRowHeight={() => 'auto'}
              components={{
                Toolbar: GridToolbar
              }} 
            />
            </Box>
            </>
            
      

            )
}

export default CohortSubmissions;