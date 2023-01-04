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
       
       //Headline
       h1: {
            fontFamily: 'circular',
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
            fontFamily: 'circular',
            fontSize: 40,
            fontWeight: 'normal',
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
            fontFamily: 'circular',
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
        //body regular
        body1: {
            fontFamily: 'circular-regular',
            fontSize: 16,
            fontWeight: 'light',
            letterSpacing: '-.5pt',
            // textTransform: 'uppercase',
            // lineHeight: '10px',
            paddingTop: '5px',
            paddingBottom: '5px',
            marginTop: '5px',
            marginBottom: '5px',
        },
        //body light
        body2: {
            fontFamily: 'circular-light',
            fontSize: 16,
            fontWeight: 'light',
            letterSpacing: '-.5pt',
            // textTransform: 'uppercase',
            // lineHeight: '10px',
            paddingTop: '5px',
            paddingBottom: '5px',
            marginTop: '5px',
            marginBottom: '5px',
        },
        //Body copy small
        body3 :  {
            fontFamily: 'circular-light',
            fontSize: 11,
            fontWeight: 'light',
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
