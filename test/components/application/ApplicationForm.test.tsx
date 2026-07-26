import { fireEvent, render, screen, waitFor } from "@test/test-utils";
import userEvent from "@testing-library/user-event";

import ApplicationForm from "@/components/application/ApplicationForm";

describe("ApplicationForm", () => {
    const defaultProps = {
        returnAfterSave: false,
        onReturnAfterSaveChange: vi.fn(),
        onSubmit: vi.fn().mockResolvedValue(true),
        onCancel: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();

        defaultProps.onSubmit.mockReset();
        defaultProps.onSubmit.mockResolvedValue(true);

        defaultProps.onReturnAfterSaveChange.mockReset();
        defaultProps.onCancel.mockReset();
    });

    const renderForm = (props: Partial<React.ComponentProps<typeof ApplicationForm>> = {}) =>
        render(<ApplicationForm {...defaultProps} {...props} />);

    it("renders all fields", () => {
        renderForm();

        expect(
            screen.getByRole("textbox", {
                name: /company/i,
            }),
        ).toBeInTheDocument();

        expect(
            screen.getByRole("textbox", {
                name: /role/i,
            }),
        ).toBeInTheDocument();

        expect(
            screen.getByRole("textbox", {
                name: /notes/i,
            }),
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /save application/i,
            }),
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /cancel/i,
            }),
        ).toBeInTheDocument();

        expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("renders initial values", () => {
        renderForm({
            initialValues: {
                company: "Google",
                role: "SDE",
                notes: "Existing notes",
            },
        });

        expect(
            screen.getByRole("textbox", {
                name: /company/i,
            }),
        ).toHaveValue("Google");

        expect(
            screen.getByRole("textbox", {
                name: /role/i,
            }),
        ).toHaveValue("SDE");

        expect(
            screen.getByRole("textbox", {
                name: /notes/i,
            }),
        ).toHaveValue("Existing notes");
    });

    it("uses empty defaults when no initial values are provided", () => {
        renderForm();

        expect(
            screen.getByRole("textbox", {
                name: /company/i,
            }),
        ).toHaveValue("");

        expect(
            screen.getByRole("textbox", {
                name: /role/i,
            }),
        ).toHaveValue("");

        expect(
            screen.getByRole("textbox", {
                name: /notes/i,
            }),
        ).toHaveValue("");
    });

    it("calls onReturnAfterSaveChange when checkbox changes", async () => {
        const user = userEvent.setup();

        renderForm();

        await user.click(screen.getByRole("checkbox"));

        expect(defaultProps.onReturnAfterSaveChange).toHaveBeenCalledWith(true);
    });

    it("renders checkbox checked", () => {
        renderForm({
            returnAfterSave: true,
        });

        expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("shows loading state", () => {
        renderForm({
            loading: true,
        });

        expect(
            screen.getByRole("button", {
                name: /save application/i,
            }),
        ).toBeDisabled();
    });

    it("calls onCancel when form is pristine", async () => {
        const user = userEvent.setup();

        renderForm();

        await user.click(
            screen.getByRole("button", {
                name: /cancel/i,
            }),
        );

        expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
    });

    it("shows required validation errors", async () => {
        const user = userEvent.setup();

        renderForm();

        await user.click(
            screen.getByRole("button", {
                name: /save application/i,
            }),
        );

        expect(await screen.findByText("Company is required")).toBeInTheDocument();

        expect(await screen.findByText("Role is required")).toBeInTheDocument();

        expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    });

    it("validates company max length", async () => {
        const user = userEvent.setup();

        renderForm();

        await user.type(
            screen.getByRole("textbox", {
                name: /company/i,
            }),
            "a".repeat(101),
        );

        await user.click(
            screen.getByRole("button", {
                name: /save application/i,
            }),
        );

        expect(
            await screen.findByText("Company cannot exceed 100 characters."),
        ).toBeInTheDocument();

        expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    });

    it("validates role max length", async () => {
        const user = userEvent.setup();

        renderForm();

        await user.type(
            screen.getByRole("textbox", {
                name: /role/i,
            }),
            "a".repeat(101),
        );

        await user.click(
            screen.getByRole("button", {
                name: /save application/i,
            }),
        );

        expect(await screen.findByText("Role cannot exceed 100 characters.")).toBeInTheDocument();

        expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    });

    it("validates notes max length", async () => {
        const user = userEvent.setup();

        renderForm();

        const notes = screen.getByRole("textbox", {
            name: /notes/i,
        });

        fireEvent.change(notes, {
            target: {
                value: "a".repeat(1001),
            },
        });

        await user.click(
            screen.getByRole("button", {
                name: /save application/i,
            }),
        );

        expect(await screen.findByText("Notes cannot exceed 1000 characters.")).toBeInTheDocument();

        expect(defaultProps.onSubmit).not.toHaveBeenCalled();
    });

    it("submits valid form data", async () => {
        const onSubmit = vi.fn().mockResolvedValue(true);

        renderForm({
            onSubmit,
        });

        fireEvent.change(
            screen.getByRole("textbox", {
                name: /company/i,
            }),
            {
                target: {
                    value: "Google",
                },
            },
        );

        fireEvent.change(
            screen.getByRole("textbox", {
                name: /role/i,
            }),
            {
                target: {
                    value: "Software Engineer",
                },
            },
        );

        fireEvent.change(
            screen.getByRole("textbox", {
                name: /notes/i,
            }),
            {
                target: {
                    value: "Interesting opportunity",
                },
            },
        );

        const saveButton = screen.getByRole("button", {
            name: /save application/i,
        });

        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1);
        });

        expect(onSubmit).toHaveBeenCalledWith({
            company: "Google",
            role: "Software Engineer",
            notes: "Interesting opportunity",
        });
    });

    it("resets the form after a successful submit when returnAfterSave is false", async () => {
        const user = userEvent.setup();

        const onSubmit = vi.fn().mockResolvedValue(true);

        renderForm({
            onSubmit,
            returnAfterSave: false,
        });

        const company = screen.getByRole("textbox", {
            name: /company/i,
        });

        const role = screen.getByRole("textbox", {
            name: /role/i,
        });

        await user.clear(company);
        await user.type(company, "Google");
        await user.clear(role);
        await user.type(role, "SDE");

        await user.click(
            screen.getByRole("button", {
                name: /save application/i,
            }),
        );

        await waitFor(() => {
            expect(company).toHaveValue("");
            expect(role).toHaveValue("");
        });

        expect(company).toHaveValue("");
        expect(role).toHaveValue("");
    });

    it("does not reset the form when returnAfterSave is true", async () => {
        const user = userEvent.setup();

        const onSubmit = vi.fn().mockResolvedValue(true);

        renderForm({
            onSubmit,
            returnAfterSave: true,
        });

        const company = screen.getByRole("textbox", {
            name: /company/i,
        });

        const role = screen.getByRole("textbox", {
            name: /role/i,
        });

        await user.clear(company);
        await user.type(company, "Google");
        await user.clear(role);
        await user.type(role, "SDE");

        await user.click(
            screen.getByRole("button", {
                name: /save application/i,
            }),
        );

        expect(company).toHaveValue("Google");
        expect(role).toHaveValue("SDE");
    });

    it("does not reset the form when submit fails", async () => {
        const user = userEvent.setup();

        const onSubmit = vi.fn().mockResolvedValue(false);

        renderForm({
            onSubmit,
        });

        const company = screen.getByRole("textbox", {
            name: /company/i,
        });

        const role = screen.getByRole("textbox", {
            name: /role/i,
        });

        await user.clear(company);
        await user.type(company, "Google");
        await user.clear(role);
        await user.type(role, "SDE");

        await user.click(
            screen.getByRole("button", {
                name: /save application/i,
            }),
        );

        expect(company).toHaveValue("Google");
        expect(role).toHaveValue("SDE");
    });

    it("changes Cancel to Reset when the form becomes dirty", async () => {
        const user = userEvent.setup();

        renderForm();

        await user.type(
            screen.getByRole("textbox", {
                name: /company/i,
            }),
            "Google",
        );

        expect(
            screen.getByRole("button", {
                name: /reset/i,
            }),
        ).toBeInTheDocument();

        expect(
            screen.queryByRole("button", {
                name: /cancel/i,
            }),
        ).not.toBeInTheDocument();
    });

    it("resets the form when Reset is clicked", async () => {
        const user = userEvent.setup();

        renderForm();

        const company = screen.getByRole("textbox", {
            name: /company/i,
        });

        await user.clear(company);
        await user.type(company, "Google");

        await user.click(
            screen.getByRole("button", {
                name: /reset/i,
            }),
        );

        expect(company).toHaveValue("");

        expect(
            screen.getByRole("button", {
                name: /cancel/i,
            }),
        ).toBeInTheDocument();
    });

    it("does not throw when onCancel is omitted", async () => {
        const user = userEvent.setup();

        renderForm({
            onCancel: undefined,
        });

        await user.click(
            screen.getByRole("button", {
                name: /cancel/i,
            }),
        );
    });
});
