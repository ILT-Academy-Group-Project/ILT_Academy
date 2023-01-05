import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Assignment, AssignmentSharp } from '@mui/icons-material';
import {Link} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { Input } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { PrimaryMainTheme } from '../PrimaryMainTheme/PrimaryMainTheme';
import { ThemeProvider } from '@mui/system';
import {ArrowBack, DeleteOutline, Add } from '@mui/icons-material';
import moment from "moment/moment";
//sweet alert import
const Swal = require('sweetalert2')

function Modules() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const modules = useSelector(store => store.modules);
    const assignments = useSelector(store => store.assignments.assignmentsReducer);
    const [expanded, setExpanded] = React.useState(false);
    const series = useSelector(store => store.series);


    //set up preclass post class arrays to seperately render in module
    const preClass = assignments.filter(assignment => assignment.postClass === false);
    const postClass = assignments.filter(assignment => assignment.postClass === true);

    //modal controls, opens and handles close
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    // console.log('🍏 params.id is THIS ', params.seriesId) 

    //Get current series
    let currentSeries;
    series.map(series =>{
        if(series.id == params.seriesId){
            currentSeries = series.seriesName;
        }
    })

    //state for form
    const [name, setName] = useState('');

    //modal style
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        };

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
        dispatch({
            type:'FETCH_SERIES',
            payload: params.seriesId
        })
    }, [params.seriesId])

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const createModule = (evt) => {
        evt.preventDefault();
        // console.log('in createModule');
        //dispatch to SAGA for axios to server/db
        dispatch({
            type: 'CREATE_MODULE',
            payload:{
                name,
                seriesId: params.seriesId
            }
        })
        //empty fields
        setName('')
        //close modal
        handleClose();
    }

    const deleteModule = (moduleId) =>{
        // console.log('in delete module with id of:', moduleId);
        //confirm deletion
        Swal.fire({
            title: 'Are you sure you want to delete this module?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            iconColor: 'red',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: 'red',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(            
            'The Module has been deleted!'
            )
            //dispatch delete request to saga
            dispatch({
                type:'DELETE_MODULE',
                payload: {
                    id: moduleId,
                    seriesId: params.seriesId
                }
            });
            //after delete head home
            // history.push('/home');
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            Swal.fire(
            'Cancelled'
            )
        }
        })
        
    }

    return (
        <>
        <ThemeProvider theme={PrimaryMainTheme}>
            <Box sx={{ flexGrow: 1, bgcolor:'background.dark', pl:5, pr:5, pb: 20, pt:8, mb:-10, mt:-3.8,  }}>
            <Button
            onClick={()=> history.push(`/home`)}
            variant='contained'
            >
                <ArrowBack />
                <Typography>
                Dashboard
                </Typography>
               </Button>
            <Typography
                variant="h2"
                color='primary'
                gutterBottom>
                Series {currentSeries}
            </Typography>
            {modules.map((module, i) => (
                
                <>
                    <Accordion key={i} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}
                            variant='h3'>
                                {module.name}
                            </Typography>
                                             
                        </AccordionSummary>
                        <AccordionDetails sx={{pb:5}}>
                            <TableContainer component={Paper} sx={{mb:5}}>
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
                                            if (assignment.moduleId == module.id) {                                                
                                                return (
                                                    <StyledTableRow key={i}
                                                        >                                                            
                                                         <StyledTableCell align="center">
                                                            <Button
                                                                onClick={()=>history.push(`/assignment/${assignment.id}`)}>
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
                                            if (assignment.moduleId == module.id) {
                                                // console.log('TRUE')
                                                let pre = ''
                                                assignment.postClass === 'false' ? pre = 'Pre-Class' : pre = 'Post-Class'
                                                return (
                                                    <StyledTableRow key={i}
                                                        >
                                                        <StyledTableCell align="center">
                                                            <Button
                                                                onClick={()=>history.push(`/assignment/${assignment.id}`)}>
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
                            {/* CREATE A NEW ASSIGNMENT */}
                           
                                <Grid2 item sm={9} sx={{ display:'flex', justifyContent: 'space-between' }} >
                                    <Button 
                                    variant='contained'
                                        onClick={() => history.push(`/admin/create/assignment/${params.seriesId}/${module.id}`)}
                                    >
                                    < Add />
                                      <Typography
                                      variant='body1'
                                      fontWeight='bold'
                                      color='tertiary.main'
                                      >Add assignment</Typography>
                                    </Button>
                                    <Button 
                                            sx={{ textAlign:'right'}} 
                                            variant='contained' 
                                            color='btnLight'
                                            onClick={()=>deleteModule(module.id)}
                                        >
                                      
                                            < DeleteOutline />
                                            <Typography variant='body1'>
                                            Delete Module
                                            </Typography>
                                    </Button>
                                </Grid2>
                        </AccordionDetails>
                    </Accordion>
                    {/* TO DO include icons for submission required AND completed */}
                </>
                    
                
            ))}
            {/* CREATE A NEW MODULE */}
            <Button
                sx={{mt:5}}
                onClick={()=>setOpen(!open)}
                color='primary'
                variant='contained'
            >
                 < Add />
                <Typography>
                Create New Module
                </Typography>
               
            </ Button>
            
            <Modal 
            open={open}
            onClose={handleClose}>
                <Box sx={style} >
                    <form onSubmit={createModule}>
                        <label>Module Name:&nbsp;</label>
                        <Input 
                            type='text' 
                            placeholder='Module Name'
                            value={name}
                            onChange={(evt)=>setName(evt.target.value)}
                        />
                        <Button type='submit'>Create Module</Button>
                    </form>
                </Box>
            </Modal>
        </Box>
        </ThemeProvider>
        </>
    )
}

export default Modules;

//saved code in case pre/post class render created a bug
// {assignments.map(assignment => {
//     if (assignment.moduleId === module.id) {
//         let pre = ''
//         assignment.postClass === 'false' ? pre = 'Pre-Class' : pre = 'Post-Class'
//         return (
//             <StyledTableRow key={assignment.id}>
//                 {/* <StyledTableCell component="th" scope="row">
//                     {assignment.name}
//                 </StyledTableCell> */}
//                 <StyledTableCell align="right"><Link to={`/assignment/${assignment.id}`}>{assignment.name}</Link></StyledTableCell>
//                 <StyledTableCell align="right">{assignment.createdDate}</StyledTableCell>
//                 <StyledTableCell align="right">{pre}</StyledTableCell>
//                 <StyledTableCell align="right">{assignment.feedback}</StyledTableCell>
//             </StyledTableRow>
//         )
//     }
// })}