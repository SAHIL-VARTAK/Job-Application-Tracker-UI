import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
    Box,
    Divider,
    Drawer,
    FormControlLabel,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Switch,
    Toolbar,
    Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";

import { navigationItems } from "@/constants/navigation";
import { useThemeContext } from "@/context/ThemeContext";
import { DRAWER_WIDTH } from "@/constants/layout";

export default function AppSidebar() {
    const { mode, toggleTheme } = useThemeContext();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: DRAWER_WIDTH,
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                },
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    px: 2,
                }}
            >
                <WorkIcon color="primary" fontSize="large" />

                <Box>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold" }}
                    >
                        Job Tracker
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                        Application Manager
                    </Typography>
                </Box>
            </Toolbar>

            <Divider />

            <List>
                {navigationItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <ListItemButton
                            key={item.path}
                            component={NavLink}
                            to={item.path}
                            end
                            sx={{
                                "&.active": {
                                    bgcolor: "primary.main",
                                    color: "primary.contrastText",
                                    "& .MuiListItemIcon-root": {
                                        color: "primary.contrastText",
                                    },
                                },
                            }}
                        >
                            <ListItemIcon>
                                <Icon />
                            </ListItemIcon>

                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    );
                })}
            </List>

            <Box sx={{ flexGrow: 1 }} />

            <Divider />

            <Box sx={{ p: 2 }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={mode === "dark"}
                            onChange={toggleTheme}
                        />
                    }
                    label={
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            {mode === "dark" ? (
                                <DarkModeIcon fontSize="small" />
                            ) : (
                                <LightModeIcon fontSize="small" />
                            )}

                            {mode === "dark" ? "Dark Mode" : "Light Mode"}
                        </Box>
                    }
                />
            </Box>
        </Drawer>
    );
}