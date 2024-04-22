import MainRouter from "src/mainRouter.tsx";
import { GlobalStyle } from "src/styles/globalStyle.ts";
// import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";
import { Helmet } from "react-helmet-async";
import { ReactEventHandler, useEffect } from "react";
import AutoRouter from "src/components/auth/autoRouter.tsx";

const refreshToken = localStorage.getItem("refreshToken");
const REACT_APP_GTM_ID = process.env.REACT_APP_GTM_ID;
export const App = () => {
  useEffect(() => {
    if (REACT_APP_GTM_ID) {
      TagManager.initialize({
        gtmId: REACT_APP_GTM_ID,
      });
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>AU</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover"
        ></meta>
      </Helmet>
      <GlobalStyle />
      <AutoRouter refreshToken={refreshToken} />
    </>
  );
};
