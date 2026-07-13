import { DRAWER_WIDTH } from "@/constants/layout";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

export default function AppNavbar() {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - ${DRAWER_WIDTH}px)`,
                ml: `${DRAWER_WIDTH}px`,
            }}
        >
            <Toolbar>
                <IconButton color="inherit">
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6">
                    Job Application Tracker
                </Typography>
            </Toolbar>
        </AppBar>
    );
}