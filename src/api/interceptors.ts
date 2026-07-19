import { AxiosError } from "axios";

import api from "./axios";

api.interceptors.response.use(
    (response) => response,

    (error: AxiosError) => {
        if (error.response?.data) {
            return Promise.reject(error.response.data);
        }

        return Promise.reject({
            title: "Network Error",
            detail: "Unable to connect to server.",
            status: 0,
        });
    }
);

export default api;