import { Publish, SwipeRightAltOutlined } from '@mui/icons-material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/system';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
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
        // dispatch({
        //     type: 'FETCH_COHORT_SERIES',
        //     payload: params.cohortId
        // })
        // dispatch({
        //     type: 'FETCH_SERIES'
        // })

    }


    return(
        <>
        <h1></h1>

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

            <table>
            <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Slack</th>
            </tr>
                {/* MAP through and display all cohort students */}
                {students.map(student => {
                    return (
                        <>
                            <tr key={student.id}>
                                <td>{student.firstName} {student.lastName}</td>
                                <td>{student.username}</td>
                                <td>{student.email}</td>
                                <td>{student.slack}</td>
                            </tr>
                        </>

                    )
                    
                
                })}
            </table> 
          
       
        </>
    )
  
    

}

export default CohortDetails;