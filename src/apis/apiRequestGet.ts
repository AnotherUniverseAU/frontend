import { getNewToken } from "src/apis/getNewToken";
import { AuthVerify } from "./authVerify";
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

const accessToken = localStorage.getItem("accessToken") as string;
const BASE_URL = process.env.REACT_APP_BASE_URL;
// const refresh = localStorage.getItem("refreshToken");

export const apiRequestGet = async (path: string) => {
  const customHttp = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
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
    const response = await customHttp.get(path);
    if (response.status === 200) {
      console.log(`[GET] Data received from ${path}:`, response.data);
      return response.data;
    } else {
      console.error(`[GET] Failed to get data from ${path}:`, response.data);
    }
  } catch (error) {
    console.error(`[GET] Error fetching data from ${path}:`, error);
  }
};