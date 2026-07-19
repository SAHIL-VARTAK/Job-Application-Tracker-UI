import {
    Box,
    Button,
    Typography,
} from "@mui/material";

export default function EmptyState() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 8,
            }}
        >
            <Typography variant="h6">
                No applications found
            </Typography>

            <Typography
                color="text.secondary"
                sx={{ mb: 2 }}
            >
                Start tracking your first application.
            </Typography>

            <Button variant="contained">
                Add Application
            </Button>
        </Box>
    );
}