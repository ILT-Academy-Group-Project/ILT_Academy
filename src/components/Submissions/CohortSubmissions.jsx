import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DataGrid, GridToolbar} from '@mui/x-data-grid'
import { Box, Button, Link, Typography } from '@mui/material'
import moment from "moment/moment";
import { PrimaryMainTheme } from '../PrimaryMainTheme/PrimaryMainTheme';
import { ThemeProvider } from '@mui/system';
import {ArrowBack, DeleteOutline, Add } from '@mui/icons-material';


function CohortSubmissions() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const submissions = useSelector(store => store.submissions.cohortSubmissionsReducer);
    const assignment = useSelector(store => store.assignments.selectedAssignmentReducer);
    const cohortInfo = useSelector(store => store.cohorts.singleCohortReducer);
    const cohortStudents = useSelector(store => store.cohortStudents)


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
        dispatch({
          type:'FETCH_COHORT_STUDENTS',
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

     //array to contain student ids of submitted students
     let submittedStudents = [];
     cohortStudents.map(student => {
      submissions.map(submission => {
        if(student.id == submission.studentId){
          submittedStudents.push(student.id);
        }
        
      })
      console.log('submittedStudents ', submittedStudents)
     })

     //check cohortStudents against submittedStudents 
     let missingStudents = [];
     cohortStudents.map(student => {
      if(!submittedStudents.includes(student.id)){
        // console.log('NOT INCLUDED ', student.firstName)
        missingStudents.push(student)
      }
      console.log('missingStudents are ', missingStudents);
     })
    



      console.log('cohort students is ', cohortStudents);
      //map through submissions and add to DataGrid rows array
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
            
          }
          
      })
      //map through missing submission students and add them to DataGrid row array
      missingStudents.map(missing => {
        let  missingSubmission =  {
                id: missing.id,
                status: '❌',
                firstName: missing.firstName,
                lastName: missing.lastName,
                file: null,
                text: null,
                video: null
              } 
            rows.push(missingSubmission)
      })
  
    return(
            <>
            <ThemeProvider theme={PrimaryMainTheme}>
              <Box sx={{ flexGrow: 1, bgcolor:'background.dark', pl:5, pr:5, pb: 20, pt:8, mb:-10, mt:-3.8,  }}>
                <Button
                variant='contained'
                onClick={()=>history.push(`/admin/cohort/modules/${params.cohortId}/${assignment.seriesId}`)}
                >
                  <ArrowBack />
                    <Typography>
                    Modules
                    </Typography>
                </Button>
                <Typography
                  variant='h1'
                  color='tertiary.main'>
                  {cohortInfo.cohortName}
                </Typography>
                <Typography
                 variant='h2'
                 color='tertiary.main'>
                  {assignment.name}
                </Typography>
                
                <Box sx={{ height: 500, width: '90%', mt:10, }}>
                <DataGrid
                sx={{
                  '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' }, //this adds padding to 'auto' height
                  '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
                  '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '22px' },
                  backgroundColor:'white', pl:5, pt:5
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
              </Box>
            </ThemeProvider>
            </>
            
      

            )
}

export default CohortSubmissions;