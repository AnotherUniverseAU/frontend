import MainRouter from "./mainRouter.tsx";
import { GlobalStyle } from "src/styles/globalStyle.ts";
// import ReactGA from "react-ga4";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TagManager from "react-gtm-module";
import { Helmet } from "react-helmet-async";
import { apiRequestGet } from "./apis/api.ts";
import { Loading } from "./pages/setting/loading.tsx";
import { getNewToken } from "./pages/home/getNewToken.tsx";

const REACT_APP_GTM_ID = process.env.REACT_APP_GTM_ID;
const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
export const App = () => {
  const [mainCharacter, setMainCharacter] = useState<any[]>([]);
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const apiRequestGet = async (path: string) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const response = await axios.get(`${REACT_APP_BASE_URL}${path}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        console.log(`[GET] Data received from ${path}:`, response.data);
        return response.data;
      } else {
        console.error(`[GET] Failed to get data from ${path}:`, response.data);
        if (refreshToken) getNewToken(refreshToken);
      }
    } catch (error) {
      console.error(`[GET] Error fetching data from ${path}:`, error);
      if (refreshToken) {
        getNewToken(refreshToken);
      }
    }
  };

  useEffect(() => {
    if (REACT_APP_GTM_ID) {
      TagManager.initialize({
        gtmId: REACT_APP_GTM_ID,
      });
    } else {
      console.error("아오");
    }
    const fetchCharacters = async () => {
      const result = await apiRequestGet("/character/list");
      localStorage.setItem(
        "characters",
        JSON.stringify(await result.characters)
      );
      setCharacters(await result.characters);
    };
    const fetchMainCharacter = async () => {
      const result = await apiRequestGet("/character/main-character");
      localStorage.setItem(
        "mainCharacter",
        JSON.stringify(await result.mainCharacter)
      );
      setMainCharacter(await result.mainCharacter);
    };

    fetchCharacters();
    fetchMainCharacter();
    // ReactGA.initialize("G-RX2423BVPV");
    // setInitialized(true);
  }, []);

  useEffect(() => {
    if (mainCharacter.length !== 0 && characters.length !== 0) {
      setLoading(false);
    }
  }, [mainCharacter, characters]);

  // useEffect(() => {
  //   if (initialized) {
  //     ReactGA.set({ page: location.pathname });
  //     ReactGA.send("pageview");
  //   }
  // }, [initialized, location]);
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
      {loading ? <Loading /> : <MainRouter />}
    </>
  );
};
