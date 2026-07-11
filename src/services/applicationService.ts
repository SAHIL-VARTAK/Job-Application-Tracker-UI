import api from "@/api/axios";

export const getApplications = () => {
    return api.get("/applications");
};

export const getApplication = (id: number) => {
    return api.get(`/applications/${id}`);
};

export const deleteApplication = (id: number) => {
    return api.delete(`/applications/${id}`);
};