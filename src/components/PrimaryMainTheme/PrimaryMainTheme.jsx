import { createTheme, extendTheme } from "@mui/material/styles";

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
            lineHeight: '40px'
        },
        //SubHeadline
        h2: {
            fontSize: 40,
            fontWeight: 'bold',
            letterSpacing: '-1.6pt',
            // textTransform: 'uppercase',
            lineHeight: '21px'
        },
        // Eyebrow/callout
        h3: {
            fontSize: 28,
            fontWeight: 'bold',
            letterSpacing: '-1pt',
            textTransform: 'uppercase',
            lineHeight: '14px'
        },
        //body
        body1: {
            fontSize: 16,
            fontWeight: 'medium',
            letterSpacing: '-.5pt',
            // textTransform: 'uppercase',
            lineHeight: '10px'
        },
        //Body copy small
        body2 :  {
            fontSize: 11,
            fontWeight: 'medium',
            letterSpacing: '0pt',
            // textTransform: 'uppercase',
            lineHeight: '7.5px'
        },
        
    }
});

export { PrimaryMainTheme };
