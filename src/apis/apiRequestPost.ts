import { getNewToken } from "src/apis/getNewToken";
import { AuthVerify } from "./authVerify";
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

const accessToken = localStorage.getItem("accessToken") as string;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const apiRequestPost = async (path: string, data: any) => {
  console.log(accessToken);
  const customHttp = axios.create({
    baseURL: `${BASE_URL}`,
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const onFulfilled = async (config: InternalAxiosRequestConfig) => {
    if (AuthVerify() === "Access Token Expired") {
      const newAccessToken = await getNewToken();
      if (config.headers) {
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      }
    }
    return config;
  };

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
