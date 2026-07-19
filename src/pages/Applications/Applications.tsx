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
import { Link } from "react-router-dom";
import ApplicationDetailsDialog from "@/components/application/ApplicationDetailsDialog";
import DeleteApplicationDialog from "@/components/application/DeleteApplicationDialog";
import applicationService from "@/services/applicationService";
import AppSnackbar from "@/components/common/AppSnackbar";

export default function Applications() {
    const {
        applications,
        loading,
        error,
        refresh,
    } = useApplications();

    const [search, setSearch] = useState("");

    const filteredApplications = applications.filter(
        application =>
            application.company
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    const handleView = (application: JobApplication) => {
        setSelectedApplication(application);
        setDetailsOpen(true);
    };

    const handleCloseDetails = () => {
        setDetailsOpen(false);
        setSelectedApplication(null);
    };

    const handleDelete = (application: JobApplication) => {
        setSelectedApplication(application);
        setDeleteOpen(true);
    };

    const handleDeleteCancel = () => {
        if (deleting) {
            return;
        }

        setDeleteOpen(false);
        setSelectedApplication(null);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedApplication) {
            return;
        }

        setDeleting(true);

        try {
            await applicationService.delete(
                selectedApplication.id,
            );

            await refresh();

            setSnackbar({
                open: true,
                severity: "success",
                message: "Application deleted successfully.",
            });

            setDeleteOpen(false);
            setSelectedApplication(null);
        } catch (error) {
            setSnackbar({
                open: true,
                severity: "error",
                message: "Failed to delete application.",
            });
            console.error(error);
        } finally {
            setDeleting(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbar((prev) => ({
            ...prev,
            open: false,
        }));
    };
    
    const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as
            | "success"
            | "error"
            | "warning"
            | "info",
    });

    return (
        <AppLayout>
            <PageHeader
                title="Applications"
                subtitle="Track and manage your job applications."
                actions={
                    <Button
                        component={Link}
                        to="/applications/new"
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

            {error ? (
                <Typography color="error">
                    {error.detail}
                </Typography>
            ) : !loading && applications.length === 0 ? (
                <EmptyState
                    title="No Applications Found"
                    description="Start tracking your first application."
                    action={
                        <Button
                            component={Link}
                            to="/applications/new"
                            variant="contained"
                            startIcon={<AddIcon />}
                        >
                            Add Application
                        </Button>
                    }
                />
            ) : (
                <ApplicationsTable
                    applications={filteredApplications}
                    loading={loading}
                    onView={handleView}
                    onDelete={handleDelete}
                />
            )}

            <ApplicationDetailsDialog
                open={detailsOpen}
                application={selectedApplication}
                onClose={handleCloseDetails}
            />

            <DeleteApplicationDialog
                open={deleteOpen}
                application={selectedApplication}
                deleting={deleting}
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
            />

            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleSnackbarClose}
            />
        </AppLayout>
    );
}