import { render } from "@test/test-utils";
import StatusChip from "@/components/application/StatusChip";
import { ApplicationStatus } from "@/types/status";

const mocks = vi.hoisted(() => ({
    chip: vi.fn(),
}));

vi.mock("@mui/material/Chip", () => ({
    default: (props: Record<string, unknown>) => {
        mocks.chip(props);
        return <div data-testid="chip">{String(props.label)}</div>;
    },
}));

describe("StatusChip", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it.each([
        [ApplicationStatus.APPLIED, "primary"],
        [ApplicationStatus.ONLINE_ASSESSMENT, "secondary"],
        [ApplicationStatus.INTERVIEW, "warning"],
        [ApplicationStatus.OFFER, "success"],
        [ApplicationStatus.REJECTED, "error"],
        [ApplicationStatus.ACCEPTED, "success"],
    ])("passes the correct props for %s", (status, color) => {
        render(<StatusChip status={status} />);

        expect(mocks.chip).toHaveBeenCalled();

        const props = mocks.chip.mock.calls.at(-1)?.[0];

        expect(props.label).toBe(status.replaceAll("_", " "));
        expect(props.color).toBe(color);
        expect(props.size).toBe("small");
    });

    it("replaces underscores with spaces", () => {
        render(<StatusChip status={ApplicationStatus.ONLINE_ASSESSMENT} />);

        const props = mocks.chip.mock.calls.at(-1)?.[0];

        expect(props.label).toBe("ONLINE ASSESSMENT");
        expect(props.label).not.toContain("_");
    });
});
