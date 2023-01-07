import { NestCamWiredStandTwoTone, Publish, SwipeRightAltOutlined } from '@mui/icons-material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/system';
import {Button, Box, Typography} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { DataGrid, GridToolbar} from '@mui/x-data-grid'
import PropTypes from 'prop-types';
import { FormControlLabel, Switch } from '@mui/material';
import { PrimaryMainTheme } from '../PrimaryMainTheme/PrimaryMainTheme';
import { ArrowBack } from '@mui/icons-material';


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
    

    const cohortParam = Number(params.cohortId)
    let newSeriesObject = series;

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
            viewStudent: RenderButton(student.username),
            cohortId: student.cohortId 
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
            
          },
          {
            field: 'cohortId',
            headerName: 'Cohort ID',
            width: 80,
          }
    ];

    function getFullName(params) {
        return `${params.row.firstName || ''} ${params.row.lastName || ''}`
    }

    function RenderButton(params) {
      
        return (
            <Button
              onClick={()=> handleClick(params)}
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
        console.log('CLICKETY CLICK params.row', params.row);
        let username = params.row.username
        let cohortId = params.row.cohortId
        history.push(`/profile/${username}/${cohortId}`)
    }
    
 

    return(
        <>
        <ThemeProvider theme={PrimaryMainTheme}>
        <Box sx={{ flexGrow: 1, bgcolor:'secondary.light', pl:5, pr:5, pb: 20, pt:8, mb:-10,  }}>
            
            <Button
            onClick={() => history.push(`/home`)}
            variant='contained'>
             <ArrowBack />
                <Typography>
                Dashboard
                </Typography>
               </Button>
            <Typography
            variant='h1'
            color='tertiary.main'>
                {cohortInfo.cohortName}
            </Typography>
        <Grid2 container spacing={2} >
                {newSeriesObject.map(series => {
                    if(series.cohortId){
                        return(
                            <>
                            <ThemeProvider
                            key={series.seriesName} theme={PrimaryMainTheme}>
                                <Grid2 
                                item xs={4}
                                className='published'
                                direction='column'

                                >
                                    <Button
                                    sx={{width:300}}
                                    color='primary'
                                    variant='contained'
                                    onClick={() => history.push(`/admin/cohort/modules/${params.cohortId}/${series.id}`)}>
                                        <Typography
                                        variant='h2'>
                                        {series.seriesName}
                                        </Typography>
                                        
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
                                item xs={4}
                                className='unpublished'
                                direction='column'
                                >
                                    <Button
                                    sx={{width:300}}
                                    color='unpublished'
                                    fullWidth={true}
                                    variant='contained'
                                    onClick={() => history.push(`/admin/cohort/modules/${params.cohortId}/${series.id}`)}>
                                        <Typography
                                        variant='h2'
                                        color='#ffffff'>
                                        {series.seriesName}
                                        </Typography>
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
                    
                            <Box sx={{ height: 500, width: '90%', mt:10, }}>
                            <DataGrid
                                sx={{backgroundColor:'white', pl:5, pt:5}}
                                rows={rows}
                                columns={columns}
                                pageSize={8}
                                rowsPerPageOptions={[8]} 
                                components={{
                                Toolbar: GridToolbar
                                }} 
                        />
                            </Box>
            </Grid2>
        </Box>
        </ThemeProvider>
        </>
    )
  
    

}

export default CohortDetails;