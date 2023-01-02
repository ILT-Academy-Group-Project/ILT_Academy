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

    }, [params.username])


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
    ]

    const rows = [];

    // map through student's assignments to display submitted/unsubmitted details


    return (
        <>
        <h1>Student Profile</h1>

        {/* student's assignments */}

        </>
    )
}

export default StudentProfile;