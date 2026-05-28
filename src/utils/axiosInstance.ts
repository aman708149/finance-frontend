import axios from "axios";

const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,

    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {

        if (typeof window !== "undefined") {

            const token =
                sessionStorage.getItem(
                    "accessToken"
                );

            if (token) {
                config.headers.Authorization =
                    `Bearer ${token}`;
            }
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(

    (response) => response,

    (error) => {

        // token expired
        if (error?.response?.status === 401) {

            sessionStorage.clear();

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;