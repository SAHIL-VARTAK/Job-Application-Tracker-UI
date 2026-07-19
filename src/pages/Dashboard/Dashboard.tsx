import AppLayout from "@/components/layout/AppLayout";
import { useEffect } from "react";
import applicationService from "@/services/applicationService";
import PageHeader from "@/components/common/PageHeader";
import SummaryCards from "@/components/dashboard/SummaryCards";
import RecentApplications from "@/components/dashboard/RecentApplications";
import QuickActions from "@/components/dashboard/QuickActions";

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
                subtitle="Track your job applications at a glance."
            />

            <SummaryCards />

            <RecentApplications />

            <QuickActions />
        </AppLayout>
    );
}