import { Typography } from "@mui/material";

import AppLayout from "@/components/layout/AppLayout";
import { useApplications } from "@/hooks/useApplications";

export default function Applications() {
    const {
        applications,
        loading,
        error,
    } = useApplications();
    
    if (loading) {
        return ( 
            <AppLayout>
                <div>Loading...</div>
            </AppLayout>
        );
    }

    if (error) {
        return (
            <AppLayout>
                <div>{error.detail}</div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Typography variant="h1">
                Applications
            </Typography>
            {/*Test code for api integration. Will be removed later*/}
            <pre>
                {JSON.stringify(applications, null, 2)}
            </pre>
        </AppLayout>
    );
}