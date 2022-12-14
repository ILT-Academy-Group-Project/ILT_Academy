import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
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
import Checkbox from '@mui/material/Checkbox';



function Modules() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const modules = useSelector(store => store.modules);
    const assignments = useSelector(store => store.assignments.assignmentsReducer);
    const [expanded, setExpanded] = React.useState(false);

    // console.log('🍏 params.id is THIS ', params.seriesId) 



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



    useEffect(() => {
        dispatch({
            type: 'FETCH_MODULES',
            payload: params.seriesId
        })

        dispatch({
            type: 'FETCH_ASSIGNMENTS'
        })
    }, [params.seriesId])

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    return (
        <>

            {modules.map(module => (
                <>
                    <Accordion expanded={expanded === `panel${module.id}`} onChange={handleChange(`panel${module.id}`)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {module.name}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>Something? Maybe no Info?</Typography>
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
                                    <TableBody>
                                        {assignments.map(assignment => {
                                            if (assignment.moduleId === module.id) {
                                                let pre = ''
                                                assignment.postClass === 'false' ? pre = 'Pre-Class' : pre = 'Post-Class'
                                                return (
                                                    <StyledTableRow key={assignment.id}>
                                                        {/* <StyledTableCell component="th" scope="row">
                                                            {assignment.name}
                                                        </StyledTableCell> */}
                                                        <StyledTableCell align="right">{assignment.name}</StyledTableCell>
                                                        <StyledTableCell align="right">{assignment.createdDate}</StyledTableCell>
                                                        <StyledTableCell align="right">{pre}</StyledTableCell>
                                                        <StyledTableCell align="right">{assignment.feedback}</StyledTableCell>
                                                    </StyledTableRow>
                                                )
                                            }
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Button onClick={() => history.push(`/admin/create/assignment/${params.seriesId}/${module.id}`)}>Add assignment</Button>
                        </AccordionDetails>
                    </Accordion>
                    {/* TO DO include icons for submission required AND completed */}

                </>
            ))}
        </>
    )
}

export default Modules;