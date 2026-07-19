import { ApplicationStatus } from "@/types/status";

export const APPLICATION_STATUS_OPTIONS = [
    { value: ApplicationStatus.APPLIED, label: "Applied" },
    { value: ApplicationStatus.ONLINE_ASSESSMENT, label: "Online Assessment" },
    { value: ApplicationStatus.INTERVIEW, label: "Interview" },
    { value: ApplicationStatus.OFFER, label: "Offer" },
    { value: ApplicationStatus.REJECTED, label: "Rejected" },
    { value: ApplicationStatus.ACCEPTED, label: "Accepted" },
];

export const STATUS_COLORS = {
    APPLIED: "#1976d2",
    ONLINE_ASSESSMENT: "#7b1fa2",
    INTERVIEW: "#ed6c02",
    OFFER: "#2e7d32",
    REJECTED: "#d32f2f",
    ACCEPTED: "#00897b",
} as const;
