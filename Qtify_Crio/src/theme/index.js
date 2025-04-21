import { createTheme } from "@mui/material";
import '@fontsource/poppins';

const theme = createTheme({
    palette: {
        primary: {
            main: "#34C94B",
        },
        secondary: {
            main: "#121212",
        },
        background: {
            default: "#FFFFFF",
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
        fontSize: 14,
        h1: {
            fontSize: "2rem",
            fontWeight: 700,
        },
        h2: {
            fontSize: "1.5rem",
            fontWeight: 600,
        },
    },
})

export default theme;