import { describe, expect, it } from "vitest";

import { navigationItems } from "@/constants/navigation";

describe("navigation constants", () => {
    it("should contain four navigation items", () => {
        expect(navigationItems).toHaveLength(4);
    });

    it("should have unique labels", () => {
        const labels = navigationItems.map((item) => item.label);

        expect(new Set(labels).size).toBe(labels.length);
    });

    it("should have unique paths", () => {
        const paths = navigationItems.map((item) => item.path);

        expect(new Set(paths).size).toBe(paths.length);
    });

    it("should contain the expected navigation labels", () => {
        expect(navigationItems.map((item) => item.label)).toEqual([
            "Dashboard",
            "Applications",
            "Add Application",
            "Statistics",
        ]);
    });

    it("should contain the expected navigation paths", () => {
        expect(navigationItems.map((item) => item.path)).toEqual([
            "/",
            "/applications",
            "/applications/new",
            "/statistics",
        ]);
    });

    it("should define an icon for every navigation item", () => {
        navigationItems.forEach((item) => {
            expect(item.icon).toBeDefined();
        });
    });
});
