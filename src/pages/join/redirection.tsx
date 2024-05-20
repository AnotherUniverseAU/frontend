import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../setting/loading";
import sendAccessTokenToApp from "src/apis/sendAccessTokenToApp";

export const Redirection = () => {
  const params = new URLSearchParams(window.location.search);
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      const type = await localStorage.getItem("loginType");
      if (type === "apple") {
        const code = params.get("code");
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/oauth/apple`,
          {
            code: code,
          }
        );
        const { access_token, refresh_token } = res.data;
        await sendAccessTokenToApp(access_token);
        return { access_token, refresh_token };
      } else {
        const code = params.get("code");

        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/oauth/kakao`,
          {
            code: code,
          }
        );
        const { access_token, refresh_token } = res.data;
        await sendAccessTokenToApp(access_token);
        return { access_token, refresh_token };
      }
    };

    getToken()
      .then((res) => {
        localStorage.setItem("accessToken", res.access_token);
        localStorage.setItem("refreshToken", res.refresh_token);
      })
      .then(() => {
        setIsLogin(true);
      });
  }, []);

  useEffect(() => {
    if (isLogin === true) {
      navigate("/nickname");
    }
  }, [isLogin]);

  return <Loading></Loading>;
};
