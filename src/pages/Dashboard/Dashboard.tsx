import { Typography } from "@mui/material";

import AppLayout from "@/components/layout/AppLayout";
import { useEffect } from "react";
import applicationService from "@/services/applicationService";

export default function Dashboard() {
    // Temporary check for API connectivity. This will be removed once the dashboard is implemented.
    useEffect(() => {
        applicationService
            .getAll()
            .then(console.log)
            .catch(console.error);
    }, []);
    
    return (
        <AppLayout>
            <Typography variant="h1">
                Dashboard
            </Typography>
        </AppLayout>
    );
}