import { Button, Typography } from "@mui/material";

import AppLayout from "@/components/layout/AppLayout";
import ApplicationsTable from "@/components/application/ApplicationsTable";
import EmptyState from "@/components/application/EmptyState";
import { useApplications } from "@/hooks/useApplications";
import PageHeader from "@/components/common/PageHeader";
import AddIcon from "@mui/icons-material/Add";

export default function Applications() {
    const {
        applications,
        loading,
        error,
    } = useApplications();

    return (
        <AppLayout>
            <PageHeader
                title="Applications"
                subtitle="Track and manage your job applications."
                actions={
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                    >
                        Add Application
                    </Button>
                }
            />

            {error && (
                <Typography color="error">
                    {error.detail}
                </Typography>
            )}

            {!error && !loading && applications.length === 0 && (
                <EmptyState />
            )}

            {!error && (
                <ApplicationsTable
                    applications={applications}
                    loading={loading}
                />
            )}
        </AppLayout>
    );
}