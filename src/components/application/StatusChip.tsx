import Chip from "@mui/material/Chip";

import {
    ApplicationStatus,
} from "@/types/status";

interface Props {
    status: ApplicationStatus;
}

const statusColor: Record<
    ApplicationStatus,
    "primary" | "secondary" | "warning" | "success" | "error"
> = {
    APPLIED: "primary",
    ONLINE_ASSESSMENT: "secondary",
    INTERVIEW: "warning",
    OFFER: "success",
    REJECTED: "error",
    ACCEPTED: "success",
};

export default function StatusChip({
    status,
}: Props) {
    return (
        <Chip
            label={status.replaceAll("_", " ")}
            color={statusColor[status]}
            size="small"
        />
    );
}