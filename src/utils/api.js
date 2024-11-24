import axios from "axios";
import { showErrorToast } from "../components/Toast";

const BaseAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    // timeout: 30000,
  },
});

BaseAPI.interceptors.request.use((config) => {
  const bearerToken = sessionStorage.getItem("token");
  if (bearerToken) {
    config.headers.Authorization = `${bearerToken}`;
    config.headers["x-access-token"] = `${bearerToken}`;
  }
  return config;
});

BaseAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.clear();
      if (!window.location.pathname.includes("sign-in")) {
        window.location.href = "/sign-in";
      }
    } else if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
      showErrorToast('Sever Timed Out! Please Try Again Later!')
      sessionStorage.clear();
      if (!window.location.pathname.includes("sign-in")) {
        window.location.href = "/sign-in";
      }
    }
    return Promise.reject(error);
  }
);

export default BaseAPI;