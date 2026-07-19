import { Button } from "@mui/material";

import AppLayout from "@/components/layout/AppLayout";
import { Link } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";

export default function NotFound() {
    return (
        <AppLayout>
            <PageHeader
                title="404 - Page Not Found"
                subtitle="The page you are looking for does not exist."
            />

            <Button component={Link} to="/">
                Go Home
            </Button>
        </AppLayout>
    );
}