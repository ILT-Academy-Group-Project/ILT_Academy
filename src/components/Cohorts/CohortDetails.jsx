import { NestCamWiredStandTwoTone, Publish, SwipeRightAltOutlined } from '@mui/icons-material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/system';
import {Button, Box} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { DataGrid, GridToolbar} from '@mui/x-data-grid'
import PropTypes from 'prop-types';
import { FormControlLabel, Switch } from '@mui/material';
import { PrimaryMainTheme } from '../PrimaryMainTheme/PrimaryMainTheme';

import './Cohorts.css'

function CohortDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    // const cohorts = useSelector(store => store.cohorts)
    const students = useSelector(store => store.cohortStudents); //all students in selected cohort
    const cohortSeries = useSelector(store => store.cohortSeries); // all series which contains junction tables to compare against current cohort
    const series = useSelector(store => store.series);
    const cohortInfo = useSelector(store => store.cohorts.singleCohortReducer)

    useEffect(() => {
        dispatch({
            type:'FETCH_COHORT_STUDENTS',
            payload: params.cohortId
        })

        dispatch({
            type: 'FETCH_COHORT_SERIES',
            payload: params.cohortId
        })

        dispatch({
            type: 'FETCH_SERIES'
        });
        dispatch({
            type: 'FETCH_COHORT',
            payload: params.cohortId
        });


    },[params.cohortId])

    // console.log('🎈Cohort Details params.id is ', params.cohortId);

    console.error('cohortSeries is:', cohortSeries);
    

    const cohortParam = Number(params.cohortId)
    let newSeriesObject = series;
    // for (let i = 0; i<newSeriesObject.length ; i++){
    //     if (cohortSeries[i]){
    //         newSeriesObject[i].cohortId = cohortSeries[i].cohortId
    //     };
    // };

    //FIX
    //loop through newseries object to check existing series against series published
    //for this cohort
    for(let newSeries of newSeriesObject){
        //loop through the published series in this cohort and check each against the id of the 
        //series being checked in this loop iteration (for series 1 check for same id in all published series in this cohort)
        //if === then add the cohort id to the object for render
        for(let publishedSeries of cohortSeries){
            if(publishedSeries.seriesId === newSeries.id){
                newSeries.cohortId = publishedSeries.cohortId;
            }
        }
    };

    // console.error('newSeriesObject', newSeriesObject);
    


    // assign series to cohort
    function publish(seriesId) {
        // console.log('PUBLISH')
        dispatch({
            type: 'PUBLISH_SERIES',
            payload: {
                seriesId: seriesId,
                cohortParam: cohortParam,
            }
        })
       

    }

    const rows = [];

    students.map(student => {
        console.log('student is ', student);
        let studentObject = {
            id: student.id,
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            username: student.username,
            viewStudent: RenderButton(student.username)

            
        }
        rows.push(studentObject);
    })
    const columns = [

          {
            field: 'fullName',
            headerName: 'Name',
            width: 200,
            valueGetter: getFullName,
          },
          {
            field: 'email',
            headerName: 'Email',
            width: 250,
          },
          {
            field: 'username',
            headerName: 'Username',
            width: 250,
          },
          {
            field: 'viewStudent',
            headerName: 'Details',
            width: 150,
            renderCell: RenderButton
            
          }
    ];

    function getFullName(params) {
        return `${params.row.firstName || ''} ${params.row.lastName || ''}`
    }

    function RenderButton(username) {
      
        return (
            <Button
              onClick={()=> handleClick(username)}
              component="button"
              variant="contained"
              size="small"
              style={{ marginLeft: 16 }}
            >
             Details
            </Button>
        );
    };

    function handleClick(params){
        console.log('CLICKETY CLICK username', params.row.username);
        let username = params.row.username
        history.push(`/profile/${username}`)
    }
    
 

    return(
        <>
        <h1>{cohortInfo.cohortName}</h1>

            {newSeriesObject.map(series => {
                if(series.cohortId){
                    return(
                        <>
                        <ThemeProvider
                        key={series.seriesName} theme={PrimaryMainTheme}>
                            <Grid2 
                            className='published'
                            direction='column'
                             >
                                 <Button
                                sx={{minHeight: 100, fontSize: 60}}
                                color='primary'
                                fullWidth={true}
                                variant='outlined'
                                onClick={() => history.push(`/admin/cohort/modules/${params.cohortId}/${series.id}`)}>
                                    {series.seriesName}
                                </ Button>

                            </Grid2>
                        </ThemeProvider>
                        </>
                    )
                }
                else{
                    return(
                        <>
                        <ThemeProvider
                        key={series.seriesName} theme={PrimaryMainTheme}>
                            <Grid2 
                            className='unpublished'
                            direction='column'
                             >
                                 <Button
                                sx={{minHeight: 100, fontSize: 60}}
                                color='unpublished'
                                fullWidth={true}
                                variant='outlined'
                                onClick={() => history.push(`/admin/cohort/modules/${params.cohortId}/${series.id}`)}>
                                    {series.seriesName}
                                    
                                </ Button>
                                <FormControlLabel  control={<Switch />} 
                                    label="Publish Series"
                                    onClick={(event) => publish(series.id, cohortParam)}
                                    />

                            </Grid2>
                        </ThemeProvider>
                        </>

                    )
            }
            })}   
                
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

export default CohortDetails;