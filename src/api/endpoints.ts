export const API_ENDPOINTS = {
    APPLICATIONS: "/applications",

    APPLICATION_BY_ID: (id: number) => `/applications/${id}`,

    UPDATE_STATUS: (id: number) => `/applications/${id}/status`,

    SEARCH: "/applications/search",

    STATISTICS: "/applications/statistics",
};
