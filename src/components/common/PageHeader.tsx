import { Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    actions?: ReactNode;
}

export default function PageHeader({
    title,
    subtitle,
    actions,
}: PageHeaderProps) {
    return (
        <Stack
            sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 3,
            }}
        >
            <Stack spacing={0.5}>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 600 }}
                >
                    {title}
                </Typography>

                {subtitle && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {subtitle}
                    </Typography>
                )}
            </Stack>

            {actions}
        </Stack>
    );
}