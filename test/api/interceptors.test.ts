const responseUseMock = vi.fn();

vi.mock("@/api/axios", () => ({
    default: {
        interceptors: {
            response: {
                use: responseUseMock,
            },
        },
    },
}));

await import("@/api/interceptors");

const [successHandler, errorHandler] = responseUseMock.mock.calls[0];

describe("API Response Interceptor", () => {
    it("should register a response interceptor", () => {
        expect(responseUseMock).toHaveBeenCalledTimes(1);
    });

    it("should return the response unchanged", () => {
        const response = {
            data: {
                message: "Success",
            },
        };

        expect(successHandler(response)).toEqual(response);
    });

    it("should reject with server error data", async () => {
        const error = {
            response: {
                data: {
                    title: "Validation Error",
                    detail: "Invalid request",
                    status: 400,
                },
            },
        };

        await expect(errorHandler(error)).rejects.toEqual(error.response.data);
    });

    it("should reject with a default network error", async () => {
        await expect(errorHandler({})).rejects.toEqual({
            title: "Network Error",
            detail: "Unable to connect to server.",
            status: 0,
        });
    });
});
