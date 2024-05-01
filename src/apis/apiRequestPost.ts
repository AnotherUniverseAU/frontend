import { getNewToken } from "src/apis/getNewToken";
import { AuthVerify } from "./authVerify";
import type { InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import sendAccessTokenToApp from "./sendAccessTokenToApp";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const onFulfilled = async (config: InternalAxiosRequestConfig) => {
  const token_validate = await AuthVerify();
  if (
    token_validate === "Access Token Expired" ||
    token_validate === "None Access Token"
  ) {
    const newAccessToken = await getNewToken();
    sendAccessTokenToApp(newAccessToken);
    if (config.headers) {
      config.headers.Authorization = `Bearer ${newAccessToken}`;
    }
  }
  return config;
};

export const apiRequestPost = async (path: string, data: any) => {
  const accessToken = localStorage.getItem("accessToken") as string;
  const customHttp = axios.create({
    baseURL: `${BASE_URL}`,
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  customHttp.interceptors.request.use(onFulfilled, (err) =>
    Promise.reject(err)
  );

  try {
    const response = await customHttp.post(path, data);
    if (response.status >= 200 && response.status < 300) {
      console.log(`[POST] Data received from ${path}:`, response.data);
      return response.data;
    } else {
      console.error(`[POST] Failed to get data from ${path}:`, response.data);
    }
  } catch (error) {
    console.error(`[POST] error fetching data from ${path}:`, error);
  }
};

export const apiRequestPostFormData = async (path: string, formData: any) => {
  const accessToken = localStorage.getItem("accessToken") as string;
  const customHttp = axios.create({
    baseURL: `${BASE_URL}`,
    timeout: 8000,
  });

  customHttp.interceptors.request.use(onFulfilled, (err) =>
    Promise.reject(err)
  );

  try {
    const response = await customHttp.post(path, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status >= 200 && response.status < 300) {
      console.log(`[POST] Data received from ${path}:`, response.data);
      return response.data;
    } else {
      console.error(`[POST] Failed to get data from ${path}:`, response.data);
    }
  } catch (error) {
    console.error(`[POST] error fetching data from ${path}:`, error);
  }
};
