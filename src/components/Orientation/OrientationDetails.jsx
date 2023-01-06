import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { useParams, useHistory } from 'react-router-dom';
import { Interweave, Markup } from 'interweave';
import { ThemeProvider } from '@mui/system';
import { PrimaryMainTheme } from '../PrimaryMainTheme/PrimaryMainTheme';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './Orientation.css'

const parse = require('html-react-parser');

function OrientationDetails({ step }) {

    //import dispatch, history, params
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();

    //get selected assignment for the render
    const assignment = useSelector(store => store.orientation.orientationReducer);
    // console.log('assignment is:', assignment);

    //usestate to keep files
    const [pdfSubmission, setPdfSubmission] = useState(null);
    const [videoSubmission, setVideoSubmission] = useState(null);
    const [textSubmission, setTextSubmission] = useState(null);

    console.log('step', step)

    //useEffect for getting assignment by id
    // useEffect(() => {
    //     dispatch({
    //         type: 'FETCH_SELECTED_ASSIGMENT',
    //         payload: params.id
    //     });
    // },[params.id]);

    //handle file submission
    const handleSubmission = (evt) => {
        evt.preventDefault();
        // console.log('pdf file', pdfSubmission);
        // console.log('video file', videoSubmission);
        // console.log('text file', textSubmission);
        //dispatch to SAGA for post to server
        dispatch({
            type: 'CREATE_SUBMISSION',
            payload: {
                textSubmission,
                assignmentId: assignment.id,
            }
        });
    }

    // var support = (function () {
    //     if (!window.DOMParser) return false;
    //     var parser = new DOMParser();
    //     try {
    //         parser.parseFromString('x', 'text/html');
    //     } catch (err) {
    //         return false;
    //     }
    //     return true;
    // })();

    // var stringToHTML = function (str) {

    //     // If DOMParser is supported, use it
    //     if (support) {
    //         var parser = new DOMParser();
    //         var doc = parser.parseFromString(str, 'text/html');
    //         return doc.body;
    //     }

    //     // Otherwise, fallback to old-school method
    //     var dom = document.createElement('div');
    //     dom.innerHTML = str;
    //     return dom;

    // };

    var stringToHTML = function (str) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(str, 'text/html');
        return doc.body;
    };

    // var stringToHTML = function (str) {
    //     var dom = document.createElement('div');
    //     dom.innerHTML = str;
    //     console.log('why is this so complicated', dom)
    //     return dom;
    // };

    // function transform(node: HTMLElement, children: Node[]): React.ReactNode {
    //     if (node.tagName === 'a') {
    //         return <Link href={node.getAttribute('href')}>{children}</Link>;
    //     }
    // }

    return (
        <>
            <ThemeProvider theme={PrimaryMainTheme}>
            <Box backgroundColor='secondary.light' sx={{ padding: 2, margin: 8 }} borderRadius={2}>
                {assignment.map(orient => (

                    orient.step === step ?
                        <>
                            
                                <Typography variant="h2" color="primary.light" sx={{ mt: 2, mb: 2 }} textAlign="center">
                                    {orient.name}
                                </Typography>
                            

                            {/* <Markup content={orient.content} /> */}

                            <Box sx={{ margin: 2, padding: 2, backgroundColor: 'secondary.main', border: 2, borderColor: 'primary.main' }}  borderRadius={2}>
                                <Box sx={{ padding: 2, backgroundColor: 'tertiary.main' }} borderRadius={2}>
                                    {parse(orient.content, {
                                        replace: ({ attribs }) => attribs && attribs.style === "width: 100%; height: 100%;" && "height: '50vh', width: '75%' "
                                    })}
                                </Box>
                            </Box>

                            {/* {orient.video ? <iframe width="560" 
                            height="315" 
                            src={orient.video} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen></iframe>
                            : null} */}



                            <form onSubmit={handleSubmission}>
                                {  //is there a text submission requirement?
                                    assignment.textField ?
                                        <div>
                                            <textarea
                                                id='textSubmission'
                                                required
                                                placeholder="Type your response here"
                                                // value={story} 
                                                // // update local state
                                                //If text submission is null have it be an empty string, otherwise = value
                                                value={textSubmission ? textSubmission : ''}
                                                onChange={(evt) => setTextSubmission(evt.target.value)}
                                            />
                                        </div>
                                        :
                                        null
                                }
                                {/* 
                            <input type="submit" /> */}
                            </form>
                        </>
                        : null
                ))}
                </Box>

            </ThemeProvider>
        </>
    )
}


export default OrientationDetails;


//save suneditor format in case we change display type
{/* <SunEditor 
            // onChange={handleChange}
            setOptions={{
                height: 200,                                                   
            }}
            // hide={true}
            hideToolbar={true}
            disable={true}
            // defaultValue={'<p>&nbsp;&nbsp;&nbsp;&nbsp;Sam TEST 1Sam TEST 1Sam TEST 1Sam TEST 1<br></p>'}
            //  setContents={content}
        /> */}