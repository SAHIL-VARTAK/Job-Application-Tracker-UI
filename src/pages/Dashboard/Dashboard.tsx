import { Button, Stack, Typography } from "@mui/material";

import { useThemeContext } from "@/context/ThemeContext";

export default function Dashboard() {
    const { mode, toggleTheme } = useThemeContext();

    return (
        <Stack spacing={2} sx={{ p: 4 }}>
            <Typography variant="h1">
                Dashboard ({mode} mode)
            </Typography>

            <Button variant="contained" onClick={toggleTheme}>
                Toggle Theme
            </Button>
        </Stack>
    );
}