import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

import type { JobApplication } from "@/types/application";

export interface DeleteApplicationDialogProps {
    open: boolean;
    application: JobApplication | null;
    deleting: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export default function DeleteApplicationDialog({
    open,
    application,
    deleting,
    onCancel,
    onConfirm,
}: DeleteApplicationDialogProps) {
    return (
        <Dialog open={open} onClose={deleting ? undefined : onCancel} maxWidth="xs" fullWidth>
            <DialogTitle>Delete Application</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete your application for{" "}
                    <strong>{application?.role}</strong> at <strong>{application?.company}</strong>?
                </DialogContentText>

                <DialogContentText sx={{ mt: 2 }}>This action cannot be undone.</DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={onCancel} disabled={deleting}>
                    Cancel
                </Button>

                <Button color="error" variant="contained" onClick={onConfirm} loading={deleting}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
