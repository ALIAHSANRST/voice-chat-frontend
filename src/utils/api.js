'use client';

import axios from "axios";
import { COMMON_COMPONENTS } from "@/src/components";
import { ROUTES } from "./routes";

const BaseAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    timeout: 10000,
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
      const excludedPaths = ["sign-in", "user/profile", "teacher/profile"];
      const currentPath = window.location.pathname.toLocaleLowerCase();
      const isExcluded = excludedPaths.some((path) => currentPath.includes(path));
      if (!isExcluded) window.location.href = ROUTES.LOGOUT.path;
    } else if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
      COMMON_COMPONENTS.Toast.showErrorToast('Sever Timed Out! Please Try Again Later!')
      if (!window.location.pathname.includes("sign-in")) {
        window.location.href = ROUTES.LOGOUT.path;
      }
    }
    return Promise.reject(error);
  }
);

export const ImageLoader = async (link) => {
  try {
    if (!link) return null;
    if (link?.toLocaleLowerCase().startsWith("http")) return link;

    const ENDPOINT = `/file/${link.split('/').pop()}`;
    const response = await BaseAPI.get(ENDPOINT, { responseType: 'arraybuffer' });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    const contentType = response.headers['content-type'];

    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.log(`Error in ImageLoader: ${error}`);
    return null;
  }
}

export default BaseAPI;