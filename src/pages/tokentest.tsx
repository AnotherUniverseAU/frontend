import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
        const data = response.data;
        if (data.refresh_token) {
          localStorage.setItem("refreshToken", data.refresh_token);
          localStorage.setItem("accessToken", data.access_token);
          console.log("New access token received:", data.access_token);
          setAccessToken(data.access_token); // Update the state with the new access token
        } else {
          localStorage.setItem("accessToken", data.access_token);
          console.log("New access token received:", data.access_token);
          setAccessToken(data.access_token);
        }
      } else {
        console.error("Failed to get new access token:", response.data);
      }
    } catch (error) {
      console.error("Error fetching new access token:", error);
    }
  };

  // Example usage:
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    getNewAccessToken(refreshToken);
  }

  const navigate = useNavigate();

  return (
    <div>
      <p>New access token: {accessToken}</p>
      <button onClick={() => navigate("/")}>Go to home</button>
    </div>
  );
};
