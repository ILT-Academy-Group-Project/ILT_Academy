import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';



import React from 'react';
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

function StudentModules (){
    //set up hooks
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    //toggle for accordion
    const [expanded, setExpanded] = React.useState(false);


    //redux store grab
    const modules = useSelector(store => store.modules); //modules for THIS series 
    //available modules for the students cohort
    const cohortModules = useSelector(store => store.cohortModules);
    //assignments to render in associated modules
    const assignments = useSelector(store => store.assignments.seriesAssignmentReducer);
    //user info
    const user = useSelector((store) => store.user);
    //user's submissions to check if assignments are
    const submissions = useSelector(store => store.submissions.userSubmissionsReducer);

    // console.log('submissions', submissions);

    //set up preclass post class arrays to seperately render in module
    const preClass = assignments.filter(assignment => assignment.postClass === false);
    const postClass = assignments.filter(assignment => assignment.postClass === true);

    // console.log('preclass assignments:', preClass);
    // console.log('postclass assignments:', postClass);

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

        // dispatch({
        //     type: 'FETCH_MODULES', 
        //     payload: params.seriesId
        // })

        //get the modules assigned for this user
        dispatch({
            type:'FETCH_COHORT_MODULES',
            payload: {
                cohortId: user.cohortId,
                seriesId: params.id
            }
        })

        //get the list of assignments for this series in preparation for the render
        dispatch({
            type:'FETCH_SERIES_ASSIGNMENTS',
            payload: params.id
        })

        //get the assignments that have been submitted for this user
        dispatch({
            type: 'FETCH_USER_SUBMISSIONS',
            payload: user.id,
        });

    },[params.cohortId])

    //styles
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

    //change handler for accordion
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    return (
        <>
          {/* Map the modules user has access to */}
        {cohortModules.map((publishedModule, i) =>{
            return(               
                 <Accordion key={i} expanded={expanded === `panel${publishedModule.id}`} onChange={handleChange(`panel${publishedModule.id}`)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        
                        >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            {publishedModule.moduleName}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails key={i+1}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Completed?</StyledTableCell>
                                            <StyledTableCell align="center">Name</StyledTableCell>
                                            <StyledTableCell align="center">Date Created</StyledTableCell>
                                            {/* <StyledTableCell align="center">Pre/Post Class</StyledTableCell> */}
                                            <StyledTableCell align="center">Feedback</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                     <TableBody>
                                        <TableRow>
                                            <StyledTableCell align="center">PRE-CLASS</StyledTableCell>
                                        </TableRow>
                                        {/* Display all pre-class assignments here */}
                                        {preClass.map((assignment, i) => {
                                            if (assignment.moduleId == publishedModule.moduleId) {                                                
                                                return (
                                                    <StyledTableRow key={i}
                                                        >                                                            
                                                        <StyledTableCell>
                                                        {submissions.some(sub => sub.assignmentId === assignment.id) ? <p>Completed</p> : null}
                                                        </StyledTableCell> 
                                                         <StyledTableCell align="center">
                                                            <Button
                                                                onClick={()=>history.push(`/assignment/${assignment.id}`)}>
                                                            {assignment.name}
                                                            </Button>                                                            
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">{assignment.createdDate}</StyledTableCell>
                                                        {/* <StyledTableCell align="center">{pre}</StyledTableCell> */}
                                                        <StyledTableCell align="center">{assignment.feedback}</StyledTableCell>
                                                     </StyledTableRow>
                                                )
                                            } 
                                        })}
                                        <TableRow>
                                            <StyledTableCell align="center">POST-CLASS</StyledTableCell>
                                        </TableRow>
                                        {/* display all postclass assignments here */}
                                        {postClass.map((assignment, i)  => {
                                            if (assignment.moduleId == publishedModule.moduleId) {
                                                // console.log('TRUE')
                                                let pre = ''
                                                assignment.postClass === 'false' ? pre = 'Pre-Class' : pre = 'Post-Class'
                                                return (
                                                    <StyledTableRow key={i}
                                                        >
                                                        <StyledTableCell>
                                                            {submissions.some(sub => sub.assignmentId === assignment.id) ? <p>Completed</p> : null}
                                                        </StyledTableCell>
                                                         <StyledTableCell align="center">
                                                            <Button
                                                                onClick={()=>history.push(`/assignment/${assignment.id}`)}>
                                                            {assignment.name}
                                                            </Button>
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">{assignment.createdDate}</StyledTableCell>
                                                        {/* <StyledTableCell align="center">{pre}</StyledTableCell> */}
                                                        <StyledTableCell align="center">{assignment.feedback}</StyledTableCell>
                                                     </StyledTableRow>
                                                )
                                            } 
                                        })}
                                     </TableBody>  
                                </Table>
                            </TableContainer>
                        </AccordionDetails>

                 </Accordion>
            )
        })}

        </>
    )
}

export default StudentModules;