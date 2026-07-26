import { Box, Paper, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface SummaryCardProps {
    title: string;
    value: number;
    icon: ReactNode;
    color: string;
}

export default function SummaryCard({ title, value, icon, color }: SummaryCardProps) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                height: "100%",
                transition: (theme) => theme.transitions.create(["transform", "box-shadow"]),
                "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 3,
                },
            }}
        >
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        {title}
                    </Typography>

                    <Typography
                        component="div"
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        {value}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        bgcolor: `${color}.50`,
                        color: `${color}.main`,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {icon}
                </Box>
            </Stack>
        </Paper>
    );
}
