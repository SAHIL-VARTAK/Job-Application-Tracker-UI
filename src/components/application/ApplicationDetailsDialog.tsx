import { useEffect, useState } from "react";

import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Typography,
} from "@mui/material";

import StatusChip from "./StatusChip";

import type { JobApplication } from "@/types/application";
import { ApplicationStatus } from "@/types/status";

interface ApplicationDetailsDialogProps {
    open: boolean;
    application: JobApplication | null;
    loading?: boolean;
    onClose: () => void;
    onUpdateStatus: (
        id: number,
        status: ApplicationStatus,
    ) => Promise<void>;
}

interface DetailItemProps {
    label: string;
    value: React.ReactNode;
}

function DetailItem({
    label,
    value,
}: DetailItemProps) {
    return (
        <Stack spacing={0.5}>
            <Typography
                variant="caption"
                color="text.secondary"
            >
                {label}
            </Typography>

            <Typography component="div">
                {value}
            </Typography>
        </Stack>
    );
}

export default function ApplicationDetailsDialog({
    open,
    application,
    loading = false,
    onClose,
    onUpdateStatus,
}: ApplicationDetailsDialogProps) {
    const [selectedStatus, setSelectedStatus] =
        useState<ApplicationStatus>(
            ApplicationStatus.APPLIED,
        );

    useEffect(() => {
        if (application) {
            setSelectedStatus(application.status);
        }
    }, [application]);

    if (!application) {
        return null;
    }

    const hasChanged =
        selectedStatus !== application.status;

    const handleUpdate = async () => {
        if (!application) {
            return;
        }

        await onUpdateStatus(
            application.id,
            selectedStatus,
        );
    };

    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                Application Details
            </DialogTitle>

            <Divider />

            <DialogContent>
                <Stack spacing={3}>
                    <DetailItem
                        label="Company"
                        value={application.company}
                    />

                    <DetailItem
                        label="Role"
                        value={application.role}
                    />

                    <Stack spacing={2}>
                        <DetailItem
                            label="Current Status"
                            value={
                                <StatusChip
                                    status={
                                        application.status
                                    }
                                />
                            }
                        />

                        <FormControl fullWidth>
                            <InputLabel>
                                Change Status
                            </InputLabel>

                            <Select
                                label="Change Status"
                                value={selectedStatus}
                                onChange={(event) =>
                                    setSelectedStatus(
                                        event.target
                                            .value as ApplicationStatus,
                                    )
                                }
                            >
                                {Object.values(
                                    ApplicationStatus,
                                ).map((status) => (
                                    <MenuItem
                                        key={status}
                                        value={status}
                                    >
                                        {status
                                            .replaceAll(
                                                "_",
                                                " ",
                                            )
                                            .toLowerCase()
                                            .replace(
                                                /\b\w/g,
                                                (char) =>
                                                    char.toUpperCase(),
                                            )}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>

                    <DetailItem
                        label="Applied Date"
                        value={new Intl.DateTimeFormat(
                            "en-IN",
                            {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            },
                        ).format(
                            new Date(
                                application.appliedDate,
                            ),
                        )}
                    />

                    <DetailItem
                        label="Notes"
                        value={
                            application.notes ??
                            "No notes available."
                        }
                    />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={onClose}
                    disabled={loading}
                >
                    Close
                </Button>

                <Button
                    variant="contained"
                    disabled={loading || !hasChanged}
                    onClick={() => {
                        void handleUpdate();
                    }}
                    startIcon={
                        loading ? (
                            <CircularProgress size={18} />
                        ) : undefined
                    }
                >
                    Update Status
                </Button>
            </DialogActions>
        </Dialog>
    );
}