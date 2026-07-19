import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
    createTheme({
        palette: {
            mode,
            primary: {
                main: "#1976d2",
            },
            secondary: {
                main: "#2e7d32",
            },
            background: {
                default: mode === "light" ? "#f5f5f5" : "#121212",
            },
        },
    });

export default getTheme;