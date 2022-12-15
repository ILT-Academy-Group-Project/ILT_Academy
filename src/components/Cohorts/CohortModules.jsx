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
import { Button } from '@mui/material';

function CohortModules() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const [expanded, setExpanded] = React.useState(false);

    const modules = useSelector(store => store.modules); //modules for THIS series 
    const cohortModules = useSelector(store => store.cohortModules);

    //create new variable for modules assigned to this cohort
    
    
    
   

    useEffect(() => {
        // dispatch({
        //     type:'FETCH_COHORT_STUDENTS',
        //     payload: params.cohortId
        // })

        dispatch({
            type: 'FETCH_COHORT_SERIES',
            payload: params.cohortId
        })

        dispatch({
            type: 'FETCH_SERIES'
        });

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

    return (
        <>
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
                                            <StyledTableCell align="right">Name</StyledTableCell>
                                            <StyledTableCell align="right">Date Created</StyledTableCell>
                                            <StyledTableCell align="right">Pre/Post Class</StyledTableCell>
                                            <StyledTableCell align="right">Feedback</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    {/* <TableBody>
                                        {assignments.map(assignment => {
                                            if (assignment.moduleId === module.id) {
                                                let pre = ''
                                                assignment.postClass === 'false' ? pre = 'Pre-Class' : pre = 'Post-Class'
                                                return (
                                                    <StyledTableRow key={assignment.id}>
                                                        {/* <StyledTableCell component="th" scope="row">
                                                            {assignment.name}
                                                        </StyledTableCell> */}
                                                        {/* <StyledTableCell align="right">{assignment.name}</StyledTableCell>
                                                        <StyledTableCell align="right">{assignment.createdDate}</StyledTableCell>
                                                        <StyledTableCell align="right">{pre}</StyledTableCell>
                                                        <StyledTableCell align="right">{assignment.feedback}</StyledTableCell>
                                                    </StyledTableRow>
                                                )
                                            }
                                        })}
                                    {/* </TableBody> */}  
                                </Table>
                            </TableContainer>
                            <Button onClick={() => history.push(`/admin/create/assignment/${params.seriesId}/${module.id}`)}>Add assignment</Button>
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
                    console.log('unpublished module ', module.name)
                    return(
                        <h3>{module.name}</h3>
                    )
                }
            })
        }

        </>
    )
}

export default CohortModules;
