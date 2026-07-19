import {
    Paper,
    Skeleton,
    Stack,
} from "@mui/material";

export default function SummaryCardSkeleton() {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
            }}
        >
            <Stack spacing={2}>
                <Skeleton width="60%" />

                <Skeleton
                    width="40%"
                    height={42}
                />

                <Skeleton
                    variant="circular"
                    width={56}
                    height={56}
                />
            </Stack>
        </Paper>
    );
}