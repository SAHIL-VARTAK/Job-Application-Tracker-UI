import { render } from "@test/page-utils";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AppSnackbarProps } from "@/components/common/AppSnackbar";
import AddApplication from "@/pages/AddApplication/AddApplication";
import applicationService from "@/services/applicationService";
import type { CreateJobApplicationRequest, JobApplication } from "@/types/application";

type FormProps = {
    loading: boolean;
    returnAfterSave: boolean;
    onCancel: () => void;
    onReturnAfterSaveChange: (value: boolean) => void;
    onSubmit: (data: CreateJobApplicationRequest) => Promise<boolean>;
};

const mockNavigate = vi.fn();

const mockApplication: JobApplication = {
    id: 1,
    company: "Google",
    role: "Software Engineer",
    status: "APPLIED",
    appliedDate: "2026-01-01",
    notes: "Test application",
};

const snackbarProps = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");

    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

vi.mock("@/services/applicationService", () => ({
    default: {
        create: vi.fn(),
    },
}));

vi.mock("@/components/layout/AppLayout", () => ({
    default: ({ children }: React.PropsWithChildren) => <div data-testid="layout">{children}</div>,
}));

vi.mock("@/components/common/PageHeader", () => ({
    default: ({ title, subtitle }: { title: string; subtitle: string }) => (
        <>
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </>
    ),
}));

vi.mock("@/components/common/AppSnackbar", () => ({
    default: (props: AppSnackbarProps) => {
        snackbarProps(props);

        return props.open ? (
            <div data-testid="snackbar">
                {props.severity}: {props.message}
                <button type="button" onClick={props.onClose}>
                    Close Snackbar
                </button>
            </div>
        ) : null;
    },
}));

vi.mock("@/components/application/ApplicationForm", () => ({
    default: ({
        loading,
        onSubmit,
        onCancel,
        returnAfterSave,
        onReturnAfterSaveChange,
    }: FormProps) => (
        <div>
            <div data-testid="loading">{String(loading)}</div>

            <div data-testid="return-after-save">{String(returnAfterSave)}</div>

            <button
                type="button"
                onClick={() => {
                    void onSubmit({
                        company: "Google",
                        role: "Software Engineer",
                    });
                }}
            >
                Submit
            </button>

            <button type="button" onClick={onCancel}>
                Cancel
            </button>

            <button type="button" onClick={() => onReturnAfterSaveChange(!returnAfterSave)}>
                Toggle Return
            </button>
        </div>
    ),
}));

describe("AddApplication", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders page title", () => {
        render(<AddApplication />);

        expect(
            screen.getByRole("heading", {
                name: "Add Application",
            }),
        ).toBeInTheDocument();
    });

    it("renders subtitle", () => {
        render(<AddApplication />);

        expect(screen.getByText("Track a new job application.")).toBeInTheDocument();
    });

    it("renders layout", () => {
        render(<AddApplication />);

        expect(screen.getByTestId("layout")).toBeInTheDocument();
    });

    it("submits an application successfully", async () => {
        vi.mocked(applicationService.create).mockResolvedValue(mockApplication);

        render(<AddApplication />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "Submit",
            }),
        );

        await waitFor(() => {
            expect(applicationService.create).toHaveBeenCalledWith({
                company: "Google",
                role: "Software Engineer",
            });
        });

        expect(screen.getByTestId("snackbar")).toHaveTextContent(
            "success: Application created successfully.",
        );
    });

    it("shows an error snackbar when creation fails", async () => {
        vi.mocked(applicationService.create).mockRejectedValue(new Error("Failure"));

        render(<AddApplication />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "Submit",
            }),
        );

        expect(await screen.findByTestId("snackbar")).toHaveTextContent(
            "error: Failed to create application.",
        );
    });

    it("passes loading=true while submitting", async () => {
        let resolvePromise!: (value: JobApplication) => void;

        vi.mocked(applicationService.create).mockReturnValue(
            new Promise<JobApplication>((resolve) => {
                resolvePromise = resolve;
            }),
        );

        render(<AddApplication />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "Submit",
            }),
        );

        expect(screen.getByTestId("loading")).toHaveTextContent("true");

        await act(async () => {
            resolvePromise(mockApplication);
        });

        await waitFor(() => expect(screen.getByTestId("loading")).toHaveTextContent("false"));
    });

    it("navigates after a successful save when returnAfterSave is true", async () => {
        vi.useFakeTimers();

        vi.mocked(applicationService.create).mockResolvedValue(mockApplication);

        render(<AddApplication />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "Submit",
            }),
        );

        await act(async () => {
            await Promise.resolve();
        });

        expect(mockNavigate).not.toHaveBeenCalled();

        act(() => {
            vi.advanceTimersByTime(800);
        });

        expect(mockNavigate).toHaveBeenCalledWith("/applications");

        vi.useRealTimers();
    });

    it("does not navigate when returnAfterSave is disabled", async () => {
        vi.useFakeTimers();

        vi.mocked(applicationService.create).mockResolvedValue(mockApplication);

        render(<AddApplication />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "Toggle Return",
            }),
        );

        expect(screen.getByTestId("return-after-save")).toHaveTextContent("false");

        fireEvent.click(
            screen.getByRole("button", {
                name: "Submit",
            }),
        );

        await act(async () => {
            await Promise.resolve();
        });

        act(() => {
            vi.advanceTimersByTime(1000);
        });

        expect(mockNavigate).not.toHaveBeenCalled();

        vi.useRealTimers();
    });

    it("navigates when Cancel is clicked", () => {
        render(<AddApplication />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "Cancel",
            }),
        );

        expect(mockNavigate).toHaveBeenCalledWith("/applications");
    });

    it("updates returnAfterSave state", () => {
        render(<AddApplication />);

        expect(screen.getByTestId("return-after-save")).toHaveTextContent("true");

        fireEvent.click(
            screen.getByRole("button", {
                name: "Toggle Return",
            }),
        );

        expect(screen.getByTestId("return-after-save")).toHaveTextContent("false");
    });

    it("closes the snackbar", async () => {
        vi.mocked(applicationService.create).mockResolvedValue(mockApplication);

        render(<AddApplication />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "Submit",
            }),
        );

        expect(await screen.findByTestId("snackbar")).toBeInTheDocument();

        fireEvent.click(
            screen.getByRole("button", {
                name: "Close Snackbar",
            }),
        );

        await waitFor(() => {
            expect(screen.queryByTestId("snackbar")).not.toBeInTheDocument();
        });
    });

    it("passes success snackbar props", async () => {
        vi.mocked(applicationService.create).mockResolvedValue(mockApplication);

        render(<AddApplication />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "Submit",
            }),
        );

        await waitFor(() => {
            expect(snackbarProps).toHaveBeenCalledWith(
                expect.objectContaining({
                    open: true,
                    severity: "success",
                    message: "Application created successfully.",
                    onClose: expect.any(Function),
                }),
            );
        });
    });

    it("passes error snackbar props", async () => {
        vi.mocked(applicationService.create).mockRejectedValue(new Error("Failure"));

        render(<AddApplication />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "Submit",
            }),
        );

        await waitFor(() => {
            expect(snackbarProps).toHaveBeenCalledWith(
                expect.objectContaining({
                    open: true,
                    severity: "error",
                    message: "Failed to create application.",
                    onClose: expect.any(Function),
                }),
            );
        });
    });
});
