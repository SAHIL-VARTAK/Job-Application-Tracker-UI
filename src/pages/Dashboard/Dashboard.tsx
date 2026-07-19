import AppLayout from "@/components/layout/AppLayout";
import { useEffect } from "react";
import applicationService from "@/services/applicationService";
import PageHeader from "@/components/common/PageHeader";

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
            <PageHeader
                title="Dashboard"
                subtitle="Get an overview of your job application progress."
            />
        </AppLayout>
    );
}