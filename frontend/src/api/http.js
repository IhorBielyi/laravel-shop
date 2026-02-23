import axios from "axios";

export const http = axios.create({
    baseURL: "http://localhost:8080",
    headers: {Accept: "application/json"},
});

http.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

http.interceptors.response.use(
    (res) => res,
    (error) => {
        const status = error?.response?.status;

        if (status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            if (!window.location.pathname.startsWith("/login")) {
                window.location.replace("/login");
            }
        }

        return Promise.reject(error);
    }
);