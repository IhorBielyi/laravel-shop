import axios from "axios";

export const http = axios.create({
    baseURL: "http://localhost:8080",
    headers: { Accept: "application/json" },
});

// Подставляем токен к каждому запросу (если есть)
http.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});