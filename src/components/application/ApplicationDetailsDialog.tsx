import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

import StatusChip from "./StatusChip";

import type { JobApplication } from "@/types/application";

interface ApplicationDetailsDialogProps {
    open: boolean;
    application: JobApplication | null;
    onClose: () => void;
}

function DetailItem({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) {
    return (
        <Stack spacing={0.5}>
            <Typography
                variant="caption"
                color="text.secondary"
            >
                {label}
            </Typography>

            <Typography component="div">{value}</Typography>
        </Stack>
    );
}

export default function ApplicationDetailsDialog({
    open,
    application,
    onClose,
}: ApplicationDetailsDialogProps) {
    if (!application) {
        return null;
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
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

                    <DetailItem
                        label="Status"
                        value={
                            <StatusChip
                                status={application.status}
                            />
                        }
                    />

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
                            new Date(application.appliedDate),
                        )}
                    />

                    <DetailItem
                        label="Notes"
                        value={
                            application.notes ||
                            "No notes available."
                        }
                    />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}