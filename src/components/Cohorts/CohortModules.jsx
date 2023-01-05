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


import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, FormControlLabel, Switch, Box } from '@mui/material';
import { PrimaryMainTheme } from '../PrimaryMainTheme/PrimaryMainTheme';
import { ThemeProvider } from '@mui/system';
import {ArrowBack, DeleteOutline, Add } from '@mui/icons-material';
import moment from "moment/moment";


function CohortModules() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const [expanded, setExpanded] = React.useState(false);

    const modules = useSelector(store => store.modules); //modules for THIS series 
    const cohortModules = useSelector(store => store.cohortModules);
    const assignments = useSelector(store => store.assignments.seriesAssignmentReducer)
    const series = useSelector(store => store.series);
    const cohort = useSelector(store => store.cohorts.singleCohortReducer);

    //Get series name
    let currentSeries;
    series.map(series =>{
        if(series.id == params.seriesId){
            currentSeries = series.seriesName;
        }
    })
    // console.log('ASSIGNMENTS FOR THIS SERIES ', assignments);

    //create new variable for modules assigned to this cohort

    //set up preclass post class arrays to seperately render in module
    const preClass = assignments.filter(assignment => assignment.postClass === false);
    const postClass = assignments.filter(assignment => assignment.postClass === true);


    useEffect(() => {

        dispatch({
            type: 'FETCH_MODULES',
            payload: params.seriesId
        })

        dispatch({
            type: 'FETCH_COHORT_MODULES',
            payload: {
                cohortId: params.cohortId,
                seriesId: params.seriesId
            }
        })

        dispatch({
            type: 'FETCH_SERIES_ASSIGNMENTS',
            payload: params.seriesId
        })
        dispatch({
            type:'FETCH_SERIES',
            payload: params.seriesId
        })
        dispatch({
            type:'FETCH_COHORT',
            payload: params.cohortId
        })

    }, [params.cohortId])

    let arrayToCheck = [];
    cohortModules.map(publishedModule => {
        arrayToCheck.push(publishedModule.moduleId)
        console.log('array to check is ', arrayToCheck)
    })

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

    function publishModule(moduleId) {
        // console.log(`🍭 publish module ${moduleId} for cohort ${params.cohortId}`)
        dispatch({
            type: 'PUBLISH_MODULE',
            payload: {
                moduleId: moduleId,
                cohortId: params.cohortId,
                seriesId: params.seriesId
            }
        })

    }

    return (
        <>
        <ThemeProvider theme={PrimaryMainTheme}>
        <Box sx={{ flexGrow: 1, bgcolor:'background.dark', pl:5, pr:5, pb: 20, pt:8, mb:-10, mt:-3.8,  }}>
            <Button
            onClick={() => history.push(`/admin/cohort/${params.cohortId}`)}
            variant='contained' >
                <ArrowBack />
                <Typography>
                Back to Series
                </Typography>
            </Button>
            <Typography
            variant='h1'
            color='tertiary.main'>
            {cohort.cohortName} 
            </Typography>
            <Typography
            variant="h2"
            color='primary'
            gutterBottom>
                Series {currentSeries}
            </Typography>
            {/* PUBLISHED modules */}
            {cohortModules.map(publishedModule => {
                return (
                    <>
                        <Accordion key={publishedModule.moduleId} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"

                            >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}
                                variant='h3'>
                                    {publishedModule.moduleName}
                                </Typography>

                            </AccordionSummary>
                            <AccordionDetails sx={{pb:5}}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center">
                                                    <Typography variant='h3'>Name</Typography>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <Typography variant='h3'>Date Created</Typography>
                                                </StyledTableCell> 
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <StyledTableCell align="center">
                                                <Typography variant='h3' sx={{fontSize: 22}}>PRE-CLASS</Typography>
                                                </StyledTableCell>
                                            </TableRow>
                                        {/* Display all pre-class assignments here */}
                                        {preClass.map((assignment, i) => {
                                            if (assignment.moduleId == publishedModule.moduleId) {                                                
                                                return (
                                                    <StyledTableRow key={i}
                                                        >                                                            
                                                         <StyledTableCell align="center">
                                                            <Button
                                                                onClick={()=>history.push(`/admin/view/submissions/${cohort.id}/${assignment.id}`)}>
                                                                    <Typography variant='body1'>
                                                                    {assignment.name}
                                                                    </Typography>
                                                            </Button>                                                            
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <Typography variant='body2'>
                                                            {moment(assignment.createdDate).format('MMMM D YYYY, h:mm:ss a')}
                                                            </Typography>
                                                        </StyledTableCell>
                                                        {/* <StyledTableCell align="center">{pre}</StyledTableCell> */}
                                                        {/* <StyledTableCell align="center">{assignment.feedback}</StyledTableCell> */}
                                                     </StyledTableRow>
                                                )
                                            } 
                                        })}
                                        <TableRow>
                                            <StyledTableCell align="center">
                                                <Typography variant='h3' sx={{fontSize: 22}}>POST-CLASS</Typography>
                                            </StyledTableCell>
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
                                                         <StyledTableCell align="center">
                                                            <Button
                                                                onClick={()=>history.push(`/admin/view/submissions/${cohort.id}/${assignment.id}`)}>
                                                               <Typography variant='body1'>
                                                                {assignment.name}
                                                                </Typography>
                                                            </Button>
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <Typography variant='body2'>
                                                            {moment(assignment.createdDate).format('MMMM D YYYY, h:mm:ss a')}
                                                            </Typography>
                                                        </StyledTableCell>
                                                        {/* <StyledTableCell align="center">{pre}</StyledTableCell> */}
                                                        {/* <StyledTableCell align="center">{assignment.feedback}</StyledTableCell> */}
                                                     </StyledTableRow>
                                                )
                                            } 
                                        })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {/* <Button onClick={() => history.push(`/admin/create/assignment/${params.seriesId}/${publishedModule.moduleId}`)}>Add assignment</Button> */}
                            </AccordionDetails>

                        </Accordion>
                    </>
                )
            })}

            {/* UNPUBLISHED MODULES */}
            {
                modules.map(module => {
                    if (arrayToCheck.includes(module.id)) {
                        return true
                    }
                    else {
                        return (
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
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}
                                        variant='h3'>
                                            {module.name}
                                        </Typography>
                                        {/* toggle to publish this module */}
                                        <FormControlLabel control={<Switch />}
                                            label="Publish Module"
                                            onChange={(event) => publishModule(module.id)}
                                        />
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell align="center">
                                                            <Typography variant='h3'>Name</Typography>
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <Typography variant='h3'>Date Created</Typography>
                                                        </StyledTableCell> 
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>

                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        {/* <Button onClick={() => history.push(`/admin/create/assignment/${params.seriesId}/${module.id}`)}>Add assignment</Button> */}
                                    </AccordionDetails>

                                </Accordion>
                            </>
                        )
                    }
                })
            }
        </Box>
        </ThemeProvider>
        </>
    )
}

export default CohortModules;
