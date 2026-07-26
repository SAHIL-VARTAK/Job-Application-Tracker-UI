import { Alert, Button } from "@mui/material";

interface DashboardErrorProps {
    message: string;
    onRetry: () => void;
}

export default function DashboardError({ message, onRetry }: DashboardErrorProps) {
    return (
        <Alert
            severity="error"
            action={
                <Button color="inherit" size="small" onClick={onRetry}>
                    Retry
                </Button>
            }
        >
            {message}
        </Alert>
    );
}
