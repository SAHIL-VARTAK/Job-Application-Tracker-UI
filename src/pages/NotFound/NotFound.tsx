import { Typography } from "@mui/material";

import AppLayout from "@/components/layout/AppLayout";

export default function NotFound() {
    return (
        <AppLayout>
            <Typography variant="h1">
                404 - Page Not Found
            </Typography>
        </AppLayout>
    );
}