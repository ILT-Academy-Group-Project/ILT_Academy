import { createTheme, extendTheme } from "@mui/material/styles";
import './style.css' ;

const PrimaryMainTheme = createTheme({
    palette: {
        primary: {
            dark: "#c13937",
            main: "#f96b61",
            light: "#ff9d8f"
        },
        secondary: {
            dark: "#000000",
            main: '#1d1d1d',
            light: "#444444"
        },
        tertiary: {
            main: "#ffffff"
        },
        unpublished: {
            main: '#808080'
        },
    },
    typography : {
        fontFamily: 'circular',
       //Headline
       h1: {
        fontSize: 80,
        fontWeight: 'bold',
        letterSpacing: '-4pt',
        // textTransform: 'uppercase',
        // lineHeight: '40px',
        paddingTop: '20px',
        paddingBottom: '20px',
        marginTop: '20px',
        marginBottom: '20px',
    },
    //SubHeadline
    h2: {
        fontSize: 40,
        fontWeight: 'bold',
        letterSpacing: '-1.6pt',
        // textTransform: 'uppercase',
        // lineHeight: '21px'
        paddingTop: '11px',
        paddingBottom: '11px',
        marginTop: '10px',
        marginBottom: '10px',
    },
    // Eyebrow/callout
    h3: {
        fontSize: 28,
        fontWeight: 'bold',
        letterSpacing: '-1pt',
        textTransform: 'uppercase',
        // lineHeight: '14px'
        paddingTop: '7px',
        paddingBottom: '7px',
        marginTop: '7px',
        marginBottom: '7px',
    },
    //body
    body1: {
        fontSize: 16,
        fontWeight: 'medium',
        letterSpacing: '-.5pt',
        // textTransform: 'uppercase',
        // lineHeight: '10px',
        paddingTop: '5px',
        paddingBottom: '5px',
        marginTop: '5px',
        marginBottom: '5px',
    },
    //Body copy small
    body2 :  {
        fontSize: 11,
        fontWeight: 'medium',
        letterSpacing: '0pt',
        // textTransform: 'uppercase',
        // lineHeight: '7.5px'
        paddingTop: '3.75px',
        paddingBottom: '3.75px',
        marginTop: '3.75px',
        marginBottom: '3.75px',
    },
        
    }
});

export { PrimaryMainTheme };
