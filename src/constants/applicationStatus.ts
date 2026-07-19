import { ApplicationStatus } from "@/types/status";

export const APPLICATION_STATUS_OPTIONS = [
    { value: ApplicationStatus.APPLIED, label: "Applied" },
    { value: ApplicationStatus.ONLINE_ASSESSMENT, label: "Online Assessment" },
    { value: ApplicationStatus.INTERVIEW, label: "Interview" },
    { value: ApplicationStatus.OFFER, label: "Offer" },
    { value: ApplicationStatus.REJECTED, label: "Rejected" },
    { value: ApplicationStatus.ACCEPTED, label: "Accepted" },
];