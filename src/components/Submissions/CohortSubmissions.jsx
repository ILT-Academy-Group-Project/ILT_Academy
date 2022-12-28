import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { Box } from '@mui/material'


function CohortSubmissions() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const submissions = useSelector(store => store.submissions.cohortSubmissionsReducer);

    console.log('💜submissions for cohort are ', submissions.cohortSubmissionsReducer);

    useEffect(() => {
        dispatch({
            type: 'FETCH_ASSIGNMENT_SUBMISSIONS',
            payload: {
                cohortId:params.cohortId,
                assignmentId:params.assignmentId
            }
        })
    },[])

    const columns = [
       
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
          field: 'notes',
          headerName: 'Notes',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 250,
          editable: true,
        },
      ];
      
      const rows = [
        // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        // { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        // { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        // { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        // { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        // { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        // { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        // { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        // { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },

     
      ];

      submissions.map(submission => {

          console.log('submission is ', submission)
        let studentSubmission =  {
            id: submission.studentId,
            firstName: submission.firstName,
            lastName: submission.lastName,
            file: submission.file,
            text: submission.text,
            video: submission.video
          } 
        rows.push(studentSubmission) 
      })

    return(
        <>
            <h1>Submissions</h1>
            {submissions.map( submission => {
                <a href={submission.file}></a>
            })}
            <Box sx={{ height: 400, width: '90%', margin: 10 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[8]}  
            />
            </Box>
            
        </>

    )
}

export default CohortSubmissions;