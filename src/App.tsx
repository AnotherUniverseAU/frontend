import MainRouter from "./mainRouter.tsx";
import { GlobalStyle } from "src/styles/globalStyle.ts";
// import ReactGA from "react-ga4";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TagManager from "react-gtm-module";

const REACT_APP_GTM_ID = process.env.REACT_APP_GTM_ID;
export const App = () => {
  // async function getToken(refreshToken: string) {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/auth/new-access-token`, {
  //       headers: {
  //         Authorization: `Bearer ${refreshToken}`,
  //       },
  //     });

  //     if (response.status === 200) {
  //       const newAccessToken = response.data.access_token;
  //       console.log("New access token received:", newAccessToken);
  //       localStorage.setItem("accessToken", newAccessToken); // Save the new access token to local storage (optional
  //       return newAccessToken;
  //     } else {
  //       console.error("Failed to get new access token:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching new access token:", error);
  //   }
  // }
  // const location = useLocation();
  // const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (REACT_APP_GTM_ID) {
      TagManager.initialize({
        gtmId: REACT_APP_GTM_ID,
      });
    } else {
      console.error("아오");
    }

    // getToken(refreshToken);
    // ReactGA.initialize("G-RX2423BVPV");
    // setInitialized(true);
  }, []);

  // useEffect(() => {
  //   if (initialized) {
  //     ReactGA.set({ page: location.pathname });
  //     ReactGA.send("pageview");
  //   }
  // }, [initialized, location]);
  return (
    <>
      <GlobalStyle />
      <MainRouter />
    </>
  );
};
