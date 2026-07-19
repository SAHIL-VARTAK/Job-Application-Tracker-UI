import { Box, Toolbar } from "@mui/material";
import type { ReactNode } from "react";

import AppNavbar from "./AppNavbar";
import AppSidebar from "./AppSidebar";

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <Box sx={{ display: "flex" }}>
            <AppNavbar />

            <AppSidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                }}
            >
                <Toolbar />

                {children}
            </Box>
        </Box>
    );
}
