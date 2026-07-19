import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import {
    Box,
    Typography,
} from "@mui/material";
import type { ReactNode } from "react";

interface EmptyStateProps {
    title: string;
    description: string;
    action?: ReactNode;
}

export default function EmptyState({
    title,
    description,
    action,
}: EmptyStateProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 8,
                textAlign: "center",
            }}
        >
            <InboxOutlinedIcon
                color="disabled"
                sx={{
                    fontSize: 72,
                    mb: 2,
                }}
            />

            <Typography
                variant="h6"
                sx={{ fontWeight: 600 }}
            >
                {title}
            </Typography>

            <Typography
                color="text.secondary"
                sx={{
                    mt: 1,
                    mb: action ? 3 : 0,
                }}
            >
                {description}
            </Typography>

            {action}
        </Box>
    );
}