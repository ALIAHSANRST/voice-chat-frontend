'use client';

import axios from "axios";
import { COMMON_COMPONENTS } from "@/src/components";

const BaseAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    // timeout: 30000,
  },
});

BaseAPI.interceptors.request.use((config) => {
  const bearerToken = JSON.parse(localStorage.getItem("token"));
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
      if (!window.location.pathname.includes("sign-in")) {
        window.location.href = "/auth/logout";
      }
    } else if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
      COMMON_COMPONENTS.Toast.showErrorToast('Sever Timed Out! Please Try Again Later!')
      if (!window.location.pathname.includes("sign-in")) {
        window.location.href = "/auth/logout";
      }
    }
    return Promise.reject(error);
  }
);

export default BaseAPI;