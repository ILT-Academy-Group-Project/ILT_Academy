import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DataGrid, GridToolbar} from '@mui/x-data-grid'
import { Box, Button, Link, Popper, Paper } from '@mui/material'
import moment from "moment/moment";

function StudentProfile() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    
    const cohortInfo = useSelector(store => store.cohorts.singleCohortReducer);
    const submissions = useSelector(store => store.assignments.studentAssignmentsReducer);
    const student = useSelector(store => store.student);
    const user = useSelector(store => store.user);

    //Name, Username, Cohort, HHH, Bio, Email, Orientation status, Submissions
    // user - firstName, lastName, username, cohortId, hipsterInterest, hackerInterest,  hustlerInterest, hipsterSkill, hackerSkill, hustlerSkill, oriented
    // submissions - all
    // cohorts - cohortName

    useEffect(() => {
        dispatch({
            type: 'FETCH_COHORT',
            payload: params.cohortId
        });
        dispatch({
            type: 'FETCH_STUDENT',
            payload: params.username
        })
        dispatch({
            type:'FETCH_STUDENT_ASSIGNMENTS',
            payload: params.username
        })

    }, [params.username], [user.id])


    const columns = [
        {
        field: 'assignmentName',
        headerName: 'Assignment',
        width: 150,
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
    ]

    const rows = [];

    submissions.map(submission => {
        let studentSubmissions = {
            id: submission.submissionId,
            assignmentName: submission.assignmentName,
            file: submission.file,
            text: submission.textInput,
            video: submission.video,
            dateSubmitted: moment(submission.submissionDate).format('MMMM Do YYYY, h:mm:ss a'),
        }
        rows.push(studentSubmissions)
    })

    // map through student's assignments to display submitted/unsubmitted details



    return (
        <>
        
        {user.id ===1 ?
        <Button
        onClick={() => history.push(`/admin/cohort/${cohortInfo.id}`)}>Back to Cohort</Button>
        :
        <Button
        onClick={() => history.push(`/studentportal`)}>Back to Dashboard</Button>
        }
            
        
        <h1>{student.firstName} {student.lastName}</h1>
        <h2>{cohortInfo.cohortName}</h2>
        <h3>Hipster/Hacker/Hustler Here</h3>
        <p>About Me Here</p>

        {/* student's assignments */}
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

export default StudentProfile;