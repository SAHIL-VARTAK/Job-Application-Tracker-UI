import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Divider,
    Grid,
    List,
    ListItemButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationDetailsDialog from "@/components/application/ApplicationDetailsDialog";
import EmptyState from "@/components/application/EmptyState";
import StatusChip from "@/components/application/StatusChip";
import AppSnackbar from "@/components/common/AppSnackbar";
import { useApplicationStatusUpdate } from "@/hooks/useApplicationStatusUpdate";
import { useApplications } from "@/hooks/useApplications";
import type { JobApplication } from "@/types/application";
import type { ApplicationStatus } from "@/types/status";

function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
}

export default function RecentApplications() {
    const navigate = useNavigate();

    const { applications, loading, error, refresh } = useApplications();

    const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error" | "warning" | "info",
    });

    const { updating, updateStatus } = useApplicationStatusUpdate({
        refresh,
        onSuccess: () => setSelectedApplication(null),
    });

    const recentApplications = useMemo(
        () =>
            [...applications]
                .sort(
                    (a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime(),
                )
                .slice(0, 5),
        [applications],
    );

    const handleSnackbarClose = () => {
        setSnackbar((prev) => ({
            ...prev,
            open: false,
        }));
    };

    const handleUpdateStatus = async (id: number, status: ApplicationStatus) => {
        try {
            await updateStatus(id, status);

            setSnackbar({
                open: true,
                severity: "success",
                message: "Status updated successfully.",
            });
        } catch (error) {
            setSnackbar({
                open: true,
                severity: "error",
                message: "Failed to update status.",
            });

            console.error(error);
        }
    };

    if (loading) {
        return (
            <Paper
                elevation={0}
                sx={{
                    mt: 4,
                    p: 4,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                    textAlign: "center",
                }}
            >
                <CircularProgress />
            </Paper>
        );
    }

    if (error) {
        return (
            <Alert
                severity="error"
                action={
                    <Button
                        color="inherit"
                        size="small"
                        onClick={() => {
                            void refresh();
                        }}
                    >
                        Retry
                    </Button>
                }
            >
                {error.detail ?? "Unable to load recent applications."}
            </Alert>
        );
    }

    return (
        <>
            <Paper
                elevation={0}
                sx={{
                    mt: 4,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                }}
            >
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        px: 3,
                        py: 2,
                    }}
                >
                    <Typography component="h2" variant="h6">
                        Recent Applications
                    </Typography>

                    <Button
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => navigate("/applications")}
                    >
                        View All
                    </Button>
                </Stack>

                <Divider />

                {recentApplications.length === 0 ? (
                    <Box sx={{ p: 4 }}>
                        <EmptyState
                            title="No applications found"
                            description="Start by adding your first application."
                        />
                    </Box>
                ) : (
                    <List disablePadding>
                        {recentApplications.map((application) => (
                            <ListItemButton
                                key={application.id}
                                divider
                                onClick={() => setSelectedApplication(application)}
                                sx={{
                                    py: 2,
                                }}
                            >
                                <Grid
                                    container
                                    spacing={2}
                                    sx={{
                                        width: "100%",
                                        alignItems: "center",
                                    }}
                                >
                                    <Grid
                                        size={{
                                            xs: 12,
                                            md: 5,
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 600,
                                            }}
                                        >
                                            {application.company}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">
                                            {application.role}
                                        </Typography>
                                    </Grid>

                                    <Grid
                                        size={{
                                            xs: 6,
                                            md: 3,
                                        }}
                                    >
                                        <StatusChip status={application.status} />
                                    </Grid>

                                    <Grid
                                        size={{
                                            xs: 5,
                                            md: 3,
                                        }}
                                    >
                                        <Typography variant="body2" color="text.secondary">
                                            {formatDate(application.appliedDate)}
                                        </Typography>
                                    </Grid>

                                    <Grid
                                        size={{
                                            xs: 1,
                                            md: 1,
                                        }}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                        }}
                                    >
                                        <ChevronRightIcon color="action" />
                                    </Grid>
                                </Grid>
                            </ListItemButton>
                        ))}
                    </List>
                )}
            </Paper>

            <ApplicationDetailsDialog
                application={selectedApplication}
                open={selectedApplication !== null}
                loading={updating}
                onClose={() => setSelectedApplication(null)}
                onUpdateStatus={handleUpdateStatus}
            />

            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleSnackbarClose}
            />
        </>
    );
}
