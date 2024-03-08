import React, { useState } from "react";
import axios from "axios";

const BASE_URL =
  "https://anotheruniverse-backend.delightfuldune-c082bcd0.koreacentral.azurecontainerapps.io";

export const TokenTest = () => {
  const [accessToken, setAccessToken] = useState(""); // State to store the access token

  const getNewAccessToken = async (refreshToken: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/new-access-token`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      if (response.status === 200) {
        const newAccessToken = response.data.access_token;
        console.log("New access token received:", newAccessToken);
        setAccessToken(newAccessToken); // Update the state with the new access token
        localStorage.setItem("accessToken", newAccessToken); // Save the new access token to local storage (optional
      } else {
        console.error("Failed to get new access token:", response.data);
      }
    } catch (error) {
      console.error("Error fetching new access token:", error);
    }
  };

  // Example usage:
  const refreshToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWJjYjI1OTJjNDdmMmY1ZWUwZDQ2NGUiLCJpYXQiOjE3MDg0MDEwMDksImV4cCI6MTcxMDk5MzAwOX0.MRjlJL6Wt_9T5XareViLEBwGpYXFxVD-KE8P1J-cViM";

  getNewAccessToken(refreshToken);

  return (
    <div>
      <p>New access token: {accessToken}</p>
    </div>
  );
};
