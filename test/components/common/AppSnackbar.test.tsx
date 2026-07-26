import { Button } from "@mui/material";
import { render } from "@test/test-utils";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PageHeader from "@/components/common/PageHeader";

describe("PageHeader", () => {
    it("renders the title", () => {
        render(<PageHeader title="Applications" />);

        expect(
            screen.getByRole("heading", {
                level: 4,
                name: "Applications",
            }),
        ).toBeInTheDocument();
    });

    it("renders the subtitle when provided", () => {
        render(<PageHeader title="Applications" subtitle="Manage your job applications" />);

        expect(screen.getByText("Manage your job applications")).toBeInTheDocument();
    });

    it("does not render a subtitle when not provided", () => {
        render(<PageHeader title="Applications" />);

        expect(screen.queryByText("Manage your job applications")).not.toBeInTheDocument();
    });

    it("renders actions when provided", () => {
        render(<PageHeader title="Applications" actions={<Button>Add Application</Button>} />);

        expect(
            screen.getByRole("button", {
                name: "Add Application",
            }),
        ).toBeInTheDocument();
    });

    it("renders without actions", () => {
        render(<PageHeader title="Applications" />);

        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("uses an h4 heading", () => {
        render(<PageHeader title="Applications" />);

        expect(
            screen.getByRole("heading", {
                level: 4,
            }),
        ).toBeInstanceOf(HTMLHeadingElement);
    });
});
