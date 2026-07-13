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
} from "@mui/material";
import { NavLink } from "react-router-dom";

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
            <Toolbar />

            <List>
                {navigationItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <ListItemButton
                            key={item.path}
                            component={NavLink}
                            to={item.path}
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