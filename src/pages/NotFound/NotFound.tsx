import { Button, Typography } from "@mui/material";

import AppLayout from "@/components/layout/AppLayout";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <AppLayout>
            <Typography variant="h1">
                404 - Page Not Found
            </Typography>

            <Button component={Link} to="/">
                Go Home
            </Button>
        </AppLayout>
    );
}