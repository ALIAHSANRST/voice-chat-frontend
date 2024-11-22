import axios from "axios";

const baseApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
    headers: {
        "Content-Type": "application/json",
        // timeout: 30000,
    },
});

baseApi.interceptors.request.use((config) => {
    const bearerToken = JSON.parse(sessionStorage.getItem("token"));
    if (bearerToken) {
        config.headers.Authorization = `${bearerToken}`;
        config.headers["x-access-token"] = `${bearerToken}`;
    }
    return config;
});

baseApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            sessionStorage.clear();
            if (!window.location.pathname.includes("login")) {
                window.location.href = "/login";
            }
        } else if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
            alert('Sever timed out! Please try again later.')
            sessionStorage.clear();
            if (!window.location.pathname.includes("login")) {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default baseApi;
