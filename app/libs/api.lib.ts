import axios from "axios";

export const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const email = localStorage.getItem("user_email");
        if (email) {
            config.headers["x-user-email"] = email;
        }
    }
    return config;
});
