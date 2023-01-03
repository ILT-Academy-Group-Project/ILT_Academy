import { createTheme } from "@mui/material/styles";

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
    }
});

export { PrimaryMainTheme };
