import axios from "axios";

const token = localStorage.getItem("accessToken") as string;

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const apiRequestGet = async (path: string) => {
  try {
    const response = await axios.get(`${BASE_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

export const apiRequestPost = async (path: string, data: any) => {
  try {
    console.log("Data to be posted: ", data);
    const response = await axios.post(`${BASE_URL}${path}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status >= 200 && response.status < 300) {
      console.log(`[POST] Data received from ${path}:`, response.data);
      return response.data;
    } else {
      console.error(`[POST] Failed to get data from ${path}:`, response.data);
    }
  } catch (error) {
    console.error(`[POST] rror fetching data from ${path}:`, error);
  }
};
