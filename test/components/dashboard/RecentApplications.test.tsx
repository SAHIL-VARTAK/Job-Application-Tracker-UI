import { render } from "@test/test-utils";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RecentApplications from "@/components/dashboard/RecentApplications";
import { ApplicationStatus } from "@/types/status";

const mocks = vi.hoisted(() => ({
    navigate: vi.fn(),
    useApplications: vi.fn(),
    useApplicationStatusUpdate: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");

    return {
        ...actual,
        useNavigate: () => mocks.navigate,
    };
});

vi.mock("@/hooks/useApplications", () => ({
    useApplications: mocks.useApplications,
}));

vi.mock("@/hooks/useApplicationStatusUpdate", () => ({
    useApplicationStatusUpdate: mocks.useApplicationStatusUpdate,
}));

vi.mock("@/components/application/ApplicationDetailsDialog", () => ({
    default: ({
        open,
        application,
        loading,
        onClose,
        onUpdateStatus,
    }: {
        open: boolean;
        application: { id: number } | null;
        loading?: boolean;
        onClose: () => void;
        onUpdateStatus: (id: number, status: ApplicationStatus) => Promise<void>;
    }) =>
        open && application ? (
            <div data-testid="details-dialog">
                <div data-testid="dialog-loading">{loading ? "loading" : "idle"}</div>

                <button
                    type="button"
                    data-testid="update-status"
                    onClick={() => void onUpdateStatus(application.id, ApplicationStatus.INTERVIEW)}
                >
                    Update Status
                </button>

                <button type="button" data-testid="close-dialog" onClick={onClose}>
                    Close
                </button>
            </div>
        ) : null,
}));

vi.mock("@/components/application/StatusChip", () => ({
    default: ({ status }: { status: string }) => <span data-testid="status-chip">{status}</span>,
}));

vi.mock("@/components/application/EmptyState", () => ({
    default: ({ title }: { title: string }) => <div data-testid="empty-state">{title}</div>,
}));

vi.mock("@/components/common/AppSnackbar", () => ({
    default: ({ onClose }: { onClose: () => void }) => (
        <>
            <div data-testid="snackbar" />
            <button type="button" data-testid="close-snackbar" onClick={onClose}>
                Close Snackbar
            </button>
        </>
    ),
}));

describe("RecentApplications", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        mocks.useApplicationStatusUpdate.mockReturnValue({
            updating: false,
            updateStatus: vi.fn(),
        });
    });

    it("renders loading indicator", () => {
        mocks.useApplications.mockReturnValue({
            applications: [],
            loading: true,
            error: null,
            refresh: vi.fn(),
        });

        render(<RecentApplications />);

        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("renders error message", () => {
        mocks.useApplications.mockReturnValue({
            applications: [],
            loading: false,
            error: {
                detail: "Failed to load applications.",
            },
            refresh: vi.fn(),
        });

        render(<RecentApplications />);

        expect(screen.getByText("Failed to load applications.")).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: "Retry",
            }),
        ).toBeInTheDocument();
    });

    it("renders empty state", () => {
        mocks.useApplications.mockReturnValue({
            applications: [],
            loading: false,
            error: null,
            refresh: vi.fn(),
        });

        render(<RecentApplications />);

        expect(screen.getByTestId("empty-state")).toHaveTextContent("No applications found");
    });

    it("renders recent applications", () => {
        mocks.useApplications.mockReturnValue({
            loading: false,
            error: null,
            refresh: vi.fn(),
            applications: [
                {
                    id: 1,
                    company: "Google",
                    role: "SWE",
                    status: ApplicationStatus.APPLIED,
                    appliedDate: "2026-07-01",
                },
                {
                    id: 2,
                    company: "Microsoft",
                    role: "Backend Engineer",
                    status: ApplicationStatus.INTERVIEW,
                    appliedDate: "2026-07-02",
                },
            ],
        });

        render(<RecentApplications />);

        expect(screen.getByText("Google")).toBeInTheDocument();
        expect(screen.getByText("Microsoft")).toBeInTheDocument();

        expect(screen.getByText("SWE")).toBeInTheDocument();
        expect(screen.getByText("Backend Engineer")).toBeInTheDocument();

        expect(screen.getAllByTestId("status-chip")).toHaveLength(2);
    });

    it("navigates when View All is clicked", () => {
        mocks.useApplications.mockReturnValue({
            applications: [],
            loading: false,
            error: null,
            refresh: vi.fn(),
        });

        render(<RecentApplications />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /view all/i,
            }),
        );

        expect(mocks.navigate).toHaveBeenCalledWith("/applications");
    });

    it("opens and closes the details dialog", () => {
        mocks.useApplications.mockReturnValue({
            loading: false,
            error: null,
            refresh: vi.fn(),
            applications: [
                {
                    id: 1,
                    company: "Google",
                    role: "SWE",
                    status: ApplicationStatus.APPLIED,
                    appliedDate: "2026-07-01",
                },
            ],
        });

        render(<RecentApplications />);

        fireEvent.click(screen.getByText("Google"));

        expect(screen.getByTestId("details-dialog")).toBeInTheDocument();

        fireEvent.click(screen.getByTestId("close-dialog"));

        expect(screen.queryByTestId("details-dialog")).not.toBeInTheDocument();
    });

    it("calls refresh when Retry is clicked", () => {
        const refresh = vi.fn();

        mocks.useApplications.mockReturnValue({
            loading: false,
            applications: [],
            refresh,
            error: {
                detail: "Failed to load applications.",
            },
        });

        render(<RecentApplications />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "Retry",
            }),
        );

        expect(refresh).toHaveBeenCalledTimes(1);
    });

    it("renders the default error message when detail is missing", () => {
        mocks.useApplications.mockReturnValue({
            loading: false,
            applications: [],
            refresh: vi.fn(),
            error: {},
        });

        render(<RecentApplications />);

        expect(screen.getByText("Unable to load recent applications.")).toBeInTheDocument();
    });

    it("renders only the five most recent applications", () => {
        mocks.useApplications.mockReturnValue({
            loading: false,
            error: null,
            refresh: vi.fn(),
            applications: [
                {
                    id: 1,
                    company: "A",
                    role: "Role",
                    status: ApplicationStatus.APPLIED,
                    appliedDate: "2026-07-01",
                },
                {
                    id: 2,
                    company: "B",
                    role: "Role",
                    status: ApplicationStatus.APPLIED,
                    appliedDate: "2026-07-02",
                },
                {
                    id: 3,
                    company: "C",
                    role: "Role",
                    status: ApplicationStatus.APPLIED,
                    appliedDate: "2026-07-03",
                },
                {
                    id: 4,
                    company: "D",
                    role: "Role",
                    status: ApplicationStatus.APPLIED,
                    appliedDate: "2026-07-04",
                },
                {
                    id: 5,
                    company: "E",
                    role: "Role",
                    status: ApplicationStatus.APPLIED,
                    appliedDate: "2026-07-05",
                },
                {
                    id: 6,
                    company: "F",
                    role: "Role",
                    status: ApplicationStatus.APPLIED,
                    appliedDate: "2026-07-06",
                },
            ],
        });

        render(<RecentApplications />);

        expect(screen.queryByText("A")).not.toBeInTheDocument();

        expect(screen.getByText("B")).toBeInTheDocument();
        expect(screen.getByText("C")).toBeInTheDocument();
        expect(screen.getByText("D")).toBeInTheDocument();
        expect(screen.getByText("E")).toBeInTheDocument();
        expect(screen.getByText("F")).toBeInTheDocument();
    });

    it("updates the application status successfully", async () => {
        const updateStatus = vi.fn().mockResolvedValue(undefined);

        mocks.useApplicationStatusUpdate.mockImplementation(
            ({ onSuccess }: { onSuccess?: () => void }) => ({
                updating: false,
                updateStatus: vi.fn().mockImplementation(async () => {
                    await updateStatus();

                    onSuccess?.();
                }),
            }),
        );

        mocks.useApplications.mockReturnValue({
            loading: false,
            error: null,
            refresh: vi.fn(),
            applications: [
                {
                    id: 1,
                    company: "Google",
                    role: "SWE",
                    status: ApplicationStatus.APPLIED,
                    appliedDate: "2026-07-01",
                },
            ],
        });

        render(<RecentApplications />);

        fireEvent.click(screen.getByText("Google"));

        fireEvent.click(screen.getByTestId("update-status"));

        await waitFor(() => {
            expect(updateStatus).toHaveBeenCalled();
        });

        expect(screen.queryByTestId("details-dialog")).not.toBeInTheDocument();
    });

    it("handles update status failure", async () => {
        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

        const updateStatus = vi.fn().mockRejectedValue(new Error("Update failed"));

        mocks.useApplicationStatusUpdate.mockReturnValue({
            updating: false,
            updateStatus,
        });

        mocks.useApplications.mockReturnValue({
            loading: false,
            error: null,
            refresh: vi.fn(),
            applications: [
                {
                    id: 1,
                    company: "Google",
                    role: "SWE",
                    status: ApplicationStatus.APPLIED,
                    appliedDate: "2026-07-01",
                },
            ],
        });

        render(<RecentApplications />);

        fireEvent.click(screen.getByText("Google"));
        fireEvent.click(screen.getByTestId("update-status"));

        await waitFor(() => {
            expect(updateStatus).toHaveBeenCalled();
            expect(consoleSpy).toHaveBeenCalled();
        });

        consoleSpy.mockRestore();
    });

    it("passes the updating state to the dialog", () => {
        mocks.useApplicationStatusUpdate.mockReturnValue({
            updating: true,
            updateStatus: vi.fn(),
        });

        mocks.useApplications.mockReturnValue({
            loading: false,
            error: null,
            refresh: vi.fn(),
            applications: [
                {
                    id: 1,
                    company: "Google",
                    role: "SWE",
                    status: ApplicationStatus.APPLIED,
                    appliedDate: "2026-07-01",
                },
            ],
        });

        render(<RecentApplications />);

        fireEvent.click(screen.getByText("Google"));

        expect(screen.getByTestId("details-dialog")).toBeInTheDocument();
    });

    it("closes the snackbar", () => {
        render(<RecentApplications />);

        fireEvent.click(screen.getByTestId("close-snackbar"));

        expect(screen.getByTestId("snackbar")).toBeInTheDocument();
    });
});
