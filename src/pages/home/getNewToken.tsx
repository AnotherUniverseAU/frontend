import axios from "axios";

export const getNewToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  console.log("새 토큰을 가져옵니다");
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
        localStorage.setItem("refreshToken", data.refresh_token);
        localStorage.setItem("accessToken", data.access_token);
        console.log("New access token received:", data.access_token);
      } else {
        localStorage.setItem("accessToken", data.access_token);
        console.log("New access token received:", data.access_token);
      }
    } else {
      console.error("Failed to get new access token:", response.data);
    }
  } catch (error) {
    console.error("Error fetching new access token:", error);
  }
};
