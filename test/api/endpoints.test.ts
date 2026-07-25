import { describe, expect, it } from "vitest";

import { API_ENDPOINTS } from "@/api/endpoints";

describe("API_ENDPOINTS", () => {
    describe("static endpoints", () => {
        it("should return the applications endpoint", () => {
            expect(API_ENDPOINTS.APPLICATIONS).toBe("/applications");
        });

        it("should return the search endpoint", () => {
            expect(API_ENDPOINTS.SEARCH).toBe("/applications/search");
        });

        it("should return the statistics endpoint", () => {
            expect(API_ENDPOINTS.STATISTICS).toBe("/applications/statistics");
        });
    });

    describe("dynamic endpoints", () => {
        it("should generate the application by id endpoint", () => {
            expect(API_ENDPOINTS.APPLICATION_BY_ID(1)).toBe("/applications/1");

            expect(API_ENDPOINTS.APPLICATION_BY_ID(25)).toBe("/applications/25");
        });

        it("should generate the update status endpoint", () => {
            expect(API_ENDPOINTS.UPDATE_STATUS(5)).toBe("/applications/5/status");

            expect(API_ENDPOINTS.UPDATE_STATUS(100)).toBe("/applications/100/status");
        });
    });
});
