import axios from "axios";

export const getNewToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  try {
    const response = await axios.get(`${BASE_URL}/auth/new-access-token`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (response.status === 200) {
      const data = response.data;
      if (data.refresh_token) {
        const accessToken = data.access_token;
        localStorage.setItem("refreshToken", data.refresh_token);
        localStorage.setItem("accessToken", accessToken);
        return accessToken;
      } else {
        const accessToken = data.access_token;
        localStorage.setItem("accessToken", data.access_token);
        return accessToken;
      }
    } else {
      console.error("Failed to get new access token:", response.data);
    }
  } catch (error) {
    console.error("Error fetching new access token:", error);
  }
};
