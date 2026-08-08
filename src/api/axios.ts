import axios from "axios";

const baseURL = window.location.protocol === "file:" ? "http://localhost:8080/api" : "/api";

const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

export default api;
