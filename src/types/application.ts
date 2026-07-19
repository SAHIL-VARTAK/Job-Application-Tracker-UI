import { ApplicationStatus } from "./status";

export interface JobApplication {
    id: number;
    company: string;
    role: string;
    status: ApplicationStatus;
    appliedDate: string;
    notes?: string;
}

export interface CreateJobApplicationRequest {
    company: string;
    role: string;
    notes?: string;
}

export interface UpdateStatusRequest {
    status: ApplicationStatus;
}

export type ApplicationStatistics = Record<ApplicationStatus, number>;