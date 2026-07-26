import { render, screen } from "@test/test-utils";
import EmptyState from "@/components/application/EmptyState";

describe("EmptyState", () => {
    it("renders the title and description", () => {
        render(<EmptyState title="No Applications" description="Add your first application." />);

        expect(screen.getByText("No Applications")).toBeInTheDocument();
        expect(screen.getByText("Add your first application.")).toBeInTheDocument();
    });

    it("renders the provided action", () => {
        render(
            <EmptyState
                title="No Applications"
                description="Add your first application."
                action={<button type="button">Retry</button>}
            />,
        );

        expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
    });

    it("does not render an action when none is provided", () => {
        render(<EmptyState title="No Applications" description="Add your first application." />);

        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("renders the inbox icon", () => {
        const { container } = render(
            <EmptyState title="No Applications" description="Add your first application." />,
        );

        expect(container.querySelector("svg")).toBeInTheDocument();
    });
});
