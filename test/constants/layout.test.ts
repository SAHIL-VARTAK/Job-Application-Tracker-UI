import { describe, expect, it } from "vitest";

import { DRAWER_WIDTH } from "@/constants/layout";

describe("layout constants", () => {
    it("should export the correct drawer width", () => {
        expect(DRAWER_WIDTH).toBe(240);
    });

    it("should export a positive drawer width", () => {
        expect(DRAWER_WIDTH).toBeGreaterThan(0);
    });
});
