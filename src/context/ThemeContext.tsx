import {
    createContext,
    type ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { getTheme } from "@/theme/theme";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeContextProviderProps {
    children: ReactNode;
}

export function ThemeContextProvider({
    children,
}: ThemeContextProviderProps) {
    const [mode, setMode] = useState<ThemeMode>(() => {
        const savedTheme = localStorage.getItem("theme-mode");

        return savedTheme === "dark" ? "dark" : "light";
    });

    useEffect(() => {
        localStorage.setItem("theme-mode", mode);
    }, [mode]);

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    };

    const theme = useMemo(() => getTheme(mode), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export function useThemeContext() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useThemeContext must be used within ThemeContextProvider"
        );
    }

    return context;
}