import type { SvgIconComponent } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";

export interface NavigationItem {
    label: string;
    path: string;
    icon: SvgIconComponent;
}

export const navigationItems: NavigationItem[] = [
    {
        label: "Dashboard",
        path: "/",
        icon: DashboardIcon,
    },
    {
        label: "Applications",
        path: "/applications",
        icon: WorkIcon,
    },
    {
        label: "Add Application",
        path: "/applications/new",
        icon: AddCircleIcon,
    },
    {
        label: "Statistics",
        path: "/statistics",
        icon: BarChartIcon,
    },
];
