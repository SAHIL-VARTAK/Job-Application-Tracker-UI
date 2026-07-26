import { fireEvent, render, screen } from "@test/test-utils";
import ApplicationToolbar from "@/components/application/ApplicationToolbar";

describe("ApplicationToolbar", () => {
    const onSearchChange = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the search field", () => {
        render(<ApplicationToolbar search="" onSearchChange={onSearchChange} />);

        expect(screen.getByPlaceholderText("Search by company...")).toBeInTheDocument();
    });

    it("displays the current search value", () => {
        render(<ApplicationToolbar search="Google" onSearchChange={onSearchChange} />);

        expect(screen.getByDisplayValue("Google")).toBeInTheDocument();
    });

    it("calls onSearchChange when typing", () => {
        render(<ApplicationToolbar search="" onSearchChange={onSearchChange} />);

        fireEvent.change(screen.getByPlaceholderText("Search by company..."), {
            target: {
                value: "Microsoft",
            },
        });

        expect(onSearchChange).toHaveBeenCalledWith("Microsoft");
    });

    it("calls onSearchChange when clearing the search", () => {
        render(<ApplicationToolbar search="Google" onSearchChange={onSearchChange} />);

        fireEvent.change(screen.getByPlaceholderText("Search by company..."), {
            target: {
                value: "",
            },
        });

        expect(onSearchChange).toHaveBeenCalledWith("");
    });

    it("renders the search icon", () => {
        const { container } = render(
            <ApplicationToolbar search="" onSearchChange={onSearchChange} />,
        );

        expect(container.querySelector("svg")).toBeInTheDocument();
    });
});
