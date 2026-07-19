export const ApplicationStatus = {
    APPLIED: "APPLIED",
    ONLINE_ASSESSMENT: "ONLINE_ASSESSMENT",
    INTERVIEW: "INTERVIEW",
    OFFER: "OFFER",
    REJECTED: "REJECTED",
    ACCEPTED: "ACCEPTED",
} as const;

export type ApplicationStatus =
    (typeof ApplicationStatus)[keyof typeof ApplicationStatus];