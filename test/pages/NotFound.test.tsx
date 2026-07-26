import { render } from "@test/page-utils";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "@/pages/NotFound/NotFound";

describe("NotFound", () => {
    it("renders the page title", () => {
        render(<NotFound />);

        expect(
            screen.getByRole("heading", {
                name: "404 - Page Not Found",
            }),
        ).toBeInTheDocument();
    });

    it("renders the subtitle", () => {
        render(<NotFound />);

        expect(
            screen.getByText("The page you are looking for does not exist."),
        ).toBeInTheDocument();
    });

    it("renders the Go Home button", () => {
        render(<NotFound />);

        expect(
            screen.getByRole("link", {
                name: "Go Home",
            }),
        ).toHaveAttribute("href", "/");
    });
});
