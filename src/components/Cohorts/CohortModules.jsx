import { array } from 'prop-types';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Assignment, AssignmentSharp } from '@mui/icons-material';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, FormControlLabel, Switch } from '@mui/material';

function CohortModules() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const [expanded, setExpanded] = React.useState(false);

    const modules = useSelector(store => store.modules); //modules for THIS series 
    const cohortModules = useSelector(store => store.cohortModules);
    const assignments = useSelector(store => store.assignments.seriesAssignmentReducer)

    console.log('ASSIGNMENTS FOR THIS SERIES ', assignments);

    //create new variable for modules assigned to this cohort
    
    
    
   

    useEffect(() => {
        // dispatch({
        //     type:'FETCH_COHORT_STUDENTS',
        //     payload: params.cohortId
        // })

        // dispatch({
        //     type: 'FETCH_COHORT_SERIES',
        //     payload: params.cohortId
        // });

        // dispatch({
        //     type: 'FETCH_SERIES'
        // });

        dispatch({
            type: 'FETCH_MODULES', 
            payload: params.seriesId
        })

        dispatch({
            type:'FETCH_COHORT_MODULES',
            payload: {
                cohortId:params.cohortId,
                seriesId:params.seriesId
            }
        })

        dispatch({
            type:'FETCH_SERIES_ASSIGNMENTS',
            payload: params.seriesId
        })

    },[params.cohortId])

    let arrayToCheck = [];
    cohortModules.map(publishedModule => {
        arrayToCheck.push(publishedModule.moduleId)
        console.log('array to check is ', arrayToCheck)
    })

    // <h1
    // key={publishedModule.moduleName}>
    //     {publishedModule.moduleName[0]}</h1>
    
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function submissionDetails(assignment){
        console.log(`submit this assignment! ${assignment}`)
    }

    function publishModule(moduleId){
        console.log(`🍭 publish module ${moduleId} for cohort ${params.cohortId}`)
        dispatch({
            type: 'PUBLISH_MODULE',
            payload: {
                moduleId:moduleId,
                cohortId: params.cohortId,
                seriesId: params.seriesId                
            }
        })

        // dispatch({
        //     type: 'FETCH_COHORT_SERIES',
        //     payload: params.cohortId
        // })

        // dispatch({
        //     type: 'FETCH_SERIES'
        // });

        // dispatch({
        //     type: 'FETCH_MODULES', 
        //     payload: params.seriesId
        // })

        // dispatch({
        //     type:'FETCH_COHORT_MODULES',
        //     payload: {
        //         cohortId:params.cohortId,
        //         seriesId:params.seriesId
        //     }
        // })

        // dispatch({
        //     type:'FETCH_SERIES_ASSIGNMENTS',
        //     payload: params.seriesId
        // })
    }

    return (
        <>
      
        <Button
            onClick={()=> history.push(`/admin/cohort/${params.cohortId}`)} >
            Back to Series
        </Button>
          {/* PUBLISHED modules */}
        {cohortModules.map(publishedModule =>{
            return(
                <>
                 <Accordion key={publishedModule.moduleId} expanded={expanded === `panel${publishedModule.id}`} onChange={handleChange(`panel${publishedModule.id}`)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        
                        >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            {publishedModule.moduleName}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Name</StyledTableCell>
                                            <StyledTableCell align="center">Date Created</StyledTableCell>
                                            <StyledTableCell align="center">Pre/Post Class</StyledTableCell>
                                            <StyledTableCell align="center">Feedback</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                     <TableBody>
                                        {assignments.map(assignment => {
                                            if (assignment.moduleId == publishedModule.moduleId) {
                                                console.log('TRUE')
                                                let pre = ''
                                                assignment.postClass === 'false' ? pre = 'Pre-Class' : pre = 'Post-Class'
                                                return (
                                                    <StyledTableRow key={assignment.id}
                                                        >
                                                        {/* <StyledTableCell component="th" scope="row">
                                                            {assignment.name}
                                                        </StyledTableCell>  */}
                                                         <StyledTableCell align="center">
                                                            <Button
                                                                onClick={()=>history.push(`/admin/view/submissions/${params.cohortId}/${assignment.id}`)}>
                                                            {assignment.name}
                                                            </Button>
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">{assignment.createdDate}</StyledTableCell>
                                                        <StyledTableCell align="center">{pre}</StyledTableCell>
                                                        <StyledTableCell align="center">{assignment.feedback}</StyledTableCell>
                                                     </StyledTableRow>
                                                )
                                            } 
                                        })}
                                     </TableBody>  
                                </Table>
                            </TableContainer>
                            <Button onClick={() => history.push(`/admin/create/assignment/${params.seriesId}/${publishedModule.moduleId}`)}>Add assignment</Button>
                        </AccordionDetails>

                 </Accordion>
                </>
            )
        })}

        {/* UNPUBLISHED MODULES */}
        {
              modules.map(module => {
                if(arrayToCheck.includes(module.id)){
                    return true
                }
                else{
                    return(
                        <>
                            <Accordion 
                            key={module.id} 
                            expanded={expanded === `panel${module.id}`} 
                            onChange={handleChange(`panel${module.id}`)}
                            sx={{ backgroundColor: 'gray' }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    
                                    >
                                    <Typography sx={{ width: '33%', flexShrink: 0}}>
                                        {module.name}
                                    </Typography>
                                    {/* toggle to publish this module */}
                                    <FormControlLabel  control={<Switch />} 
                                        label="Publish Module"
                                        onChange={(event) => publishModule(module.id)}
                                        />
                                </AccordionSummary>
                                <AccordionDetails>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align="center">Name</StyledTableCell>
                                                        <StyledTableCell align="center">Date Created</StyledTableCell>
                                                        <StyledTableCell align="center">Pre/Post Class</StyledTableCell>
                                                        <StyledTableCell align="center">Feedback</StyledTableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    
                                                </TableBody>  
                                            </Table>
                                        </TableContainer>
                                        <Button onClick={() => history.push(`/admin/create/assignment/${params.seriesId}/${module.id}`)}>Add assignment</Button>
                                    </AccordionDetails>

                            </Accordion>
                </>
                    )
                }
            })
        }

        </>
    )
}

export default CohortModules;
