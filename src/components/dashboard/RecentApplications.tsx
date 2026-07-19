import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

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

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import type { JobApplication } from "@/types/application";

import ApplicationDetailsDialog from "@/components/application/ApplicationDetailsDialog";
import EmptyState from "@/components/application/EmptyState";
import StatusChip from "@/components/application/StatusChip";
import { useApplications } from "@/hooks/useApplications";

function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
}

export default function RecentApplications() {
    const navigate = useNavigate();

    const {
        applications,
        loading,
        error,
        refresh,
    } = useApplications();

    const [
        selectedApplication,
        setSelectedApplication,
    ] = useState<JobApplication | null>(null);

    const recentApplications = useMemo(
        () =>
            [...applications]
                .sort(
                    (a, b) =>
                        new Date(
                            b.appliedDate,
                        ).getTime() -
                        new Date(
                            a.appliedDate,
                        ).getTime(),
                )
                .slice(0, 5),
        [applications],
    );

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
                {error.detail ??
                    "Unable to load recent applications."}
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
                        justifyContent:
                            "space-between",
                        alignItems: "center",
                        px: 3,
                        py: 2,
                    }}
                >
                    <Typography
                        component="h2"
                        variant="h6"
                    >
                        Recent Applications
                    </Typography>

                    <Button
                        endIcon={
                            <ArrowForwardIcon />
                        }
                        onClick={() =>
                            navigate(
                                "/applications",
                            )
                        }
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
                        {recentApplications.map(
                            (
                                application,
                            ) => (
                                <ListItemButton
                                    key={
                                        application.id
                                    }
                                    divider
                                    onClick={() =>
                                        setSelectedApplication(
                                            application,
                                        )
                                    }
                                    sx={{
                                        py: 2,
                                    }}
                                >
                                    <Grid
                                        container
                                        spacing={2}
                                        sx={{
                                            width: "100%",
                                            alignItems:
                                                "center",
                                        }}
                                    >
                                        <Grid
                                            size={{
                                                xs: 12,
                                                md: 5,
                                            }}
                                        >
                                            <Typography
                                                component="div"
                                                variant="subtitle1"
                                                sx={{
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {
                                                    application.company
                                                }
                                            </Typography>

                                            <Typography
                                                component="div"
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {
                                                    application.role
                                                }
                                            </Typography>
                                        </Grid>

                                        <Grid
                                            size={{
                                                xs: 6,
                                                md: 3,
                                            }}
                                        >
                                            <StatusChip
                                                status={
                                                    application.status
                                                }
                                            />
                                        </Grid>

                                        <Grid
                                            size={{
                                                xs: 5,
                                                md: 3,
                                            }}
                                        >
                                            <Typography
                                                component="div"
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {formatDate(
                                                    application.appliedDate,
                                                )}
                                            </Typography>
                                        </Grid>

                                        <Grid
                                            size={{
                                                xs: 1,
                                                md: 1,
                                            }}
                                            sx={{
                                                display:
                                                    "flex",
                                                justifyContent:
                                                    "flex-end",
                                            }}
                                        >
                                            <ChevronRightIcon
                                                color="action"
                                            />
                                        </Grid>
                                    </Grid>
                                </ListItemButton>
                            ),
                        )}
                    </List>
                )}
            </Paper>

            <ApplicationDetailsDialog
                application={
                    selectedApplication
                }
                open={
                    selectedApplication !==
                    null
                }
                onClose={() =>
                    setSelectedApplication(
                        null,
                    )
                }
            />
        </>
    );
}