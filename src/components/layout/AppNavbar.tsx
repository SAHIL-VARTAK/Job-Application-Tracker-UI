import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import { DRAWER_WIDTH } from "@/constants/layout";

export default function AppNavbar() {
    const location = useLocation();

    const pageTitles: Record<string, string> = {
        "/": "Dashboard",
        "/applications": "Applications",
        "/applications/new": "Add Application",
        "/statistics": "Statistics",
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - ${DRAWER_WIDTH}px)`,
                ml: `${DRAWER_WIDTH}px`,
            }}
        >
            <Toolbar>
                <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
                    {pageTitles[location.pathname] ?? "Job Application Tracker"}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
