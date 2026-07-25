import { describe, expect, it } from "vitest";

import { APPLICATION_STATUS_OPTIONS, STATUS_COLORS } from "@/constants/applicationStatus";
import { ApplicationStatus } from "@/types/status";

describe("applicationStatus constants", () => {
    it("should contain all application status options", () => {
        expect(APPLICATION_STATUS_OPTIONS).toEqual([
            {
                value: ApplicationStatus.APPLIED,
                label: "Applied",
            },
            {
                value: ApplicationStatus.ONLINE_ASSESSMENT,
                label: "Online Assessment",
            },
            {
                value: ApplicationStatus.INTERVIEW,
                label: "Interview",
            },
            {
                value: ApplicationStatus.OFFER,
                label: "Offer",
            },
            {
                value: ApplicationStatus.REJECTED,
                label: "Rejected",
            },
            {
                value: ApplicationStatus.ACCEPTED,
                label: "Accepted",
            },
        ]);
    });

    it("should contain a color for every application status", () => {
        expect(STATUS_COLORS).toEqual({
            APPLIED: "#1976d2",
            ONLINE_ASSESSMENT: "#7b1fa2",
            INTERVIEW: "#ed6c02",
            OFFER: "#2e7d32",
            REJECTED: "#d32f2f",
            ACCEPTED: "#00897b",
        });
    });

    it("should have unique status values", () => {
        const values = APPLICATION_STATUS_OPTIONS.map((option) => option.value);

        expect(new Set(values).size).toBe(values.length);
    });

    it("should have unique labels", () => {
        const labels = APPLICATION_STATUS_OPTIONS.map((option) => option.label);

        expect(new Set(labels).size).toBe(labels.length);
    });
});
