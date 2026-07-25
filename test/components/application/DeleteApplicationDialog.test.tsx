import { fireEvent, render, screen } from "@test/test-utils";
import DeleteApplicationDialog from "@/components/application/DeleteApplicationDialog";
import type { JobApplication } from "@/types/application";
import { ApplicationStatus } from "@/types/status";

describe("DeleteApplicationDialog", () => {
    const application: JobApplication = {
        id: 1,
        company: "Google",
        role: "Software Engineer",
        status: ApplicationStatus.APPLIED,
        appliedDate: "2026-07-01",
        notes: "Applied online",
    };

    const onCancel = vi.fn();
    const onConfirm = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the dialog with application details", () => {
        render(
            <DeleteApplicationDialog
                open
                application={application}
                deleting={false}
                onCancel={onCancel}
                onConfirm={onConfirm}
            />,
        );

        expect(screen.getByText("Delete Application")).toBeInTheDocument();

        expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();

        expect(screen.getByText(/Google/i)).toBeInTheDocument();

        expect(screen.getByText(/This action cannot be undone./i)).toBeInTheDocument();
    });

    it("calls onCancel when Cancel is clicked", () => {
        render(
            <DeleteApplicationDialog
                open
                application={application}
                deleting={false}
                onCancel={onCancel}
                onConfirm={onConfirm}
            />,
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: /cancel/i,
            }),
        );

        expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it("calls onConfirm when Delete is clicked", () => {
        render(
            <DeleteApplicationDialog
                open
                application={application}
                deleting={false}
                onCancel={onCancel}
                onConfirm={onConfirm}
            />,
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: /delete/i,
            }),
        );

        expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it("disables the Cancel button while deleting", () => {
        render(
            <DeleteApplicationDialog
                open
                application={application}
                deleting
                onCancel={onCancel}
                onConfirm={onConfirm}
            />,
        );

        expect(
            screen.getByRole("button", {
                name: /cancel/i,
            }),
        ).toBeDisabled();
    });

    it("shows the loading state on the Delete button", () => {
        render(
            <DeleteApplicationDialog
                open
                application={application}
                deleting
                onCancel={onCancel}
                onConfirm={onConfirm}
            />,
        );

        expect(
            screen.getByRole("button", {
                name: /delete/i,
            }),
        ).toBeDisabled();
    });

    it("renders correctly when application is null", () => {
        render(
            <DeleteApplicationDialog
                open
                application={null}
                deleting={false}
                onCancel={onCancel}
                onConfirm={onConfirm}
            />,
        );

        expect(screen.getByText("Delete Application")).toBeInTheDocument();

        expect(screen.getByText(/This action cannot be undone./i)).toBeInTheDocument();
    });
});
