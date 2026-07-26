import { Alert, Snackbar } from "@mui/material";

export interface AppSnackbarProps {
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
    onClose: () => void;
}

export default function AppSnackbar({ open, message, severity, onClose }: AppSnackbarProps) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={onClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
        >
            <Alert severity={severity} variant="filled" onClose={onClose} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
