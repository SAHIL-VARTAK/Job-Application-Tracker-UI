import { useEffect } from "react";
import PageHeader from "@/components/common/PageHeader";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentApplications from "@/components/dashboard/RecentApplications";
import SummaryCards from "@/components/dashboard/SummaryCards";
import AppLayout from "@/components/layout/AppLayout";
import applicationService from "@/services/applicationService";

export default function Dashboard() {
    // Temporary check for API connectivity. This will be removed once the dashboard is implemented.
    useEffect(() => {
        applicationService.getAll().then(console.log).catch(console.error);
    }, []);

    return (
        <AppLayout>
            <PageHeader title="Dashboard" subtitle="Track your job applications at a glance." />

            <SummaryCards />

            <RecentApplications />

            <QuickActions />
        </AppLayout>
    );
}
