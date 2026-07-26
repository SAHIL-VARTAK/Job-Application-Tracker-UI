import { fireEvent, render, screen, waitFor } from "@test/test-utils";
import ApplicationDetailsDialog from "@/components/application/ApplicationDetailsDialog";
import type { JobApplication } from "@/types/application";
import { ApplicationStatus } from "@/types/status";

vi.mock("@/components/application/StatusChip", () => ({
    default: ({ status }: { status: ApplicationStatus }) => (
        <div data-testid="status-chip">{status}</div>
    ),
}));

const application: JobApplication = {
    id: 1,
    company: "Google",
    role: "Software Engineer",
    status: ApplicationStatus.APPLIED,
    appliedDate: "2026-07-01",
    notes: "Applied through careers page.",
};

describe("ApplicationDetailsDialog", () => {
    const onClose = vi.fn();
    const onUpdateStatus = vi.fn().mockResolvedValue(undefined);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("does not render when application is null", () => {
        const { container } = render(
            <ApplicationDetailsDialog
                open
                application={null}
                onClose={onClose}
                onUpdateStatus={onUpdateStatus}
            />,
        );

        expect(container).toBeEmptyDOMElement();
    });

    it("renders application details", () => {
        render(
            <ApplicationDetailsDialog
                open
                application={application}
                onClose={onClose}
                onUpdateStatus={onUpdateStatus}
            />,
        );

        expect(screen.getByText("Application Details")).toBeInTheDocument();

        expect(screen.getByText("Google")).toBeInTheDocument();
        expect(screen.getByText("Software Engineer")).toBeInTheDocument();

        expect(screen.getByTestId("status-chip")).toHaveTextContent(ApplicationStatus.APPLIED);

        expect(screen.getByText("Applied through careers page.")).toBeInTheDocument();

        expect(screen.getByText("01 July 2026")).toBeInTheDocument();
    });

    it("shows fallback text when notes are missing", () => {
        render(
            <ApplicationDetailsDialog
                open
                application={{
                    ...application,
                    notes: undefined,
                }}
                onClose={onClose}
                onUpdateStatus={onUpdateStatus}
            />,
        );

        expect(screen.getByText("No notes available.")).toBeInTheDocument();
    });

    it("calls onClose when Close is clicked", () => {
        render(
            <ApplicationDetailsDialog
                open
                application={application}
                onClose={onClose}
                onUpdateStatus={onUpdateStatus}
            />,
        );

        fireEvent.click(screen.getByRole("button", { name: /close/i }));

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("has Update Status disabled initially", () => {
        render(
            <ApplicationDetailsDialog
                open
                application={application}
                onClose={onClose}
                onUpdateStatus={onUpdateStatus}
            />,
        );

        expect(
            screen.getByRole("button", {
                name: /update status/i,
            }),
        ).toBeDisabled();
    });

    it("enables Update Status when status changes", async () => {
        render(
            <ApplicationDetailsDialog
                open
                application={application}
                onClose={onClose}
                onUpdateStatus={onUpdateStatus}
            />,
        );

        const updateButton = screen.getByRole("button", {
            name: /update status/i,
        });

        expect(updateButton).toBeDisabled();

        fireEvent.mouseDown(screen.getByRole("combobox"));

        const option = await screen.findByRole("option", {
            name: "Interview",
        });

        fireEvent.click(option);

        await waitFor(() => {
            expect(updateButton).toBeEnabled();
        });
    });

    it("calls onUpdateStatus with the selected status", async () => {
        render(
            <ApplicationDetailsDialog
                open
                application={application}
                onClose={onClose}
                onUpdateStatus={onUpdateStatus}
            />,
        );

        fireEvent.mouseDown(screen.getByRole("combobox"));

        const option = await screen.findByRole("option", {
            name: "Interview",
        });

        fireEvent.click(option);

        fireEvent.click(
            screen.getByRole("button", {
                name: /update status/i,
            }),
        );

        await waitFor(() => {
            expect(onUpdateStatus).toHaveBeenCalledWith(1, ApplicationStatus.INTERVIEW);
        });
    });

    it("disables buttons while loading", () => {
        render(
            <ApplicationDetailsDialog
                open
                application={application}
                loading
                onClose={onClose}
                onUpdateStatus={onUpdateStatus}
            />,
        );

        expect(
            screen.getByRole("button", {
                name: /close/i,
            }),
        ).toBeDisabled();

        expect(
            screen.getByRole("button", {
                name: /update status/i,
            }),
        ).toBeDisabled();

        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("updates the selected status when the application prop changes", async () => {
        const { rerender } = render(
            <ApplicationDetailsDialog
                open
                application={application}
                onClose={onClose}
                onUpdateStatus={onUpdateStatus}
            />,
        );

        rerender(
            <ApplicationDetailsDialog
                open
                application={{
                    ...application,
                    status: ApplicationStatus.INTERVIEW,
                }}
                onClose={onClose}
                onUpdateStatus={onUpdateStatus}
            />,
        );

        await waitFor(() => {
            expect(screen.getByTestId("status-chip")).toHaveTextContent(
                ApplicationStatus.INTERVIEW,
            );
        });
    });
});
