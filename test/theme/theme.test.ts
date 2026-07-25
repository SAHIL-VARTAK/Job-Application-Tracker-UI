import { describe, expect, it } from "vitest";

import { getTheme } from "@/theme/theme";

describe("getTheme", () => {
    it("should create a light theme", () => {
        const theme = getTheme("light");

        expect(theme.palette.mode).toBe("light");
        expect(theme.palette.primary.main).toBe("#1976d2");
        expect(theme.palette.secondary.main).toBe("#2e7d32");
        expect(theme.palette.background.default).toBe("#f5f5f5");
    });

    it("should create a dark theme", () => {
        const theme = getTheme("dark");

        expect(theme.palette.mode).toBe("dark");
        expect(theme.palette.primary.main).toBe("#1976d2");
        expect(theme.palette.secondary.main).toBe("#2e7d32");
        expect(theme.palette.background.default).toBe("#121212");
    });

    it("should create different theme instances", () => {
        const lightTheme = getTheme("light");
        const darkTheme = getTheme("dark");

        expect(lightTheme).not.toBe(darkTheme);
    });
});
