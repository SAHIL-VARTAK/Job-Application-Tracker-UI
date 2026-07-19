import { Button, Typography } from "@mui/material";

import AppLayout from "@/components/layout/AppLayout";
import ApplicationsTable from "@/components/application/ApplicationsTable";
import EmptyState from "@/components/application/EmptyState";
import { useApplications } from "@/hooks/useApplications";
import PageHeader from "@/components/common/PageHeader";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import ApplicationToolbar from "@/components/application/ApplicationToolbar";
import type { JobApplication } from "@/types/application";

export default function Applications() {
    const {
        applications,
        loading,
        error,
    } = useApplications();

    const [search, setSearch] = useState("");

    const filteredApplications = applications.filter(
        application =>
            application.company
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    const handleView = (application: JobApplication) => {
        console.log("View application:", application);
    };

    const handleDelete = (application: JobApplication) => {
        console.log("Delete application:", application);
    };

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

            <ApplicationToolbar
                search={search}
                onSearchChange={setSearch}
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
                    applications={filteredApplications}
                    loading={loading}
                    onView={handleView}
                    onDelete={handleDelete}
                />
            )}
        </AppLayout>
    );
}