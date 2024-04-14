import MainRouter from "src/mainRouter.tsx";
import { GlobalStyle } from "src/styles/globalStyle.ts";
// import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";
import { Helmet } from "react-helmet-async";
import { ReactEventHandler, useEffect } from "react";
import { getNewToken } from "src/apis/getNewToken.tsx";
import AutoRouter from "src/components/auth/autoRouter.tsx";

const REACT_APP_GTM_ID = process.env.REACT_APP_GTM_ID;
export const App = () => {
  useEffect(() => {
    if (REACT_APP_GTM_ID) {
      TagManager.initialize({
        gtmId: REACT_APP_GTM_ID,
      });
    }
    getNewToken();

    // const handleMessage = (event: any) => {
    //   console.log("Received message from WebView:", event.data);
    //   try {
    //     const { type, token } = JSON.parse(event.data);
    //     if (type === "FCM_TOKEN") {
    //       console.log("Received FCM Token:", token);
    //       localStorage.setItem("fcmToken", token);
    //     }
    //   } catch (error) {
    //     console.error("Error handling message from WebView:", error);
    //   }
    // };

    // window.addEventListener("message", handleMessage);

    // // 컴포넌트 언마운트 시 리스너 제거
    // return () => {
    //   window.removeEventListener("message", handleMessage);
    // };
  }, []);
  return (
    <>
      <Helmet>
        <title>AU</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
        ></meta>
      </Helmet>
      <GlobalStyle />
      <AutoRouter />
    </>
  );
};
