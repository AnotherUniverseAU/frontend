import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../setting/loading";

export const Redirection = () => {
  const params = new URLSearchParams(window.location.search);
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      const code = params.get("code");

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/oauth/kakao`,
        {
          code: code,
        }
      );
      const { access_token, refresh_token } = res.data;

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);

      setIsLogin(true);
    };

    getToken();
  }, []);

  useEffect(() => {
    if (isLogin === true) {
      navigate("/");
    }
  }, [isLogin]);

  return <Loading></Loading>;
};

// import { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const Redirection = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const params = new URL(document.location.toString()).searchParams;
//     const code = params.get("code");
//     const grantType = "authorization_code";
//     const REST_API_KEY = `${process.env.REACT_APP_REST_API_KEY}`;
//     const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`;

//     axios
//       .post(
//         `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
//         {
//           headers: {
//             "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
//           },
//         }
//       )
//       .then((res: any) => {
//         console.log(res);
//         const { access_token } = res.data;
//         axios
//           .post(
//             `https://kapi.kakao.com/v2/user/me`,
//             {},
//             {
//               headers: {
//                 Authorization: `Bearer ${access_token}`,
//                 "Content-type":
//                   "application/x-www-form-urlencoded;charset=utf-8",
//               },
//             }
//           )
//           .then((res: any) => {
//             console.log("2번째", res);
//             // 토큰을 받아서 localStorage같은 곳에 저장하는 코드를 여기에 쓴다.
//             localStorage.setItem("access_token", access_token); // 토큰을 저장한다.
//             navigate("/authenticated"); // 인증된 페이지로 리디렉션한다.
//           });
//       })
//       .catch((Error: any) => {
//         console.log(Error);
//       });
//   }, []);

//   return <></>;
// };

// import { useCallback, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const Redirection = () => {
//   const [code, setCode] = useState("");
//   const navigate = useNavigate();

//   const fetchLogin = useCallback(
//     async (code: any) => {
//       try {
//         const param = {
//           code,
//         };

//         const response = await (
//           await fetch("http://localhost:3000/login", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(param), // string으로 전달해야함
//           })
//         ).json();

//         console.log(response); // { nickname: '#######' }

//         navigate("/main"); // API 호출 성공 시 메인 페이지로 이동
//       } catch (error) {
//         alert("Function fetchLogin error!");
//         console.error(error);
//       }
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     if (code) {
//       fetchLogin(code);
//     }
//   }, [code, fetchLogin]);

//   useEffect(() => {
//     const Address = new URL(window.location.href); // url 가져오기
//     const code = Address.searchParams.get("code") || ""; // 👈 code value

//     setCode(code);
//   }, []);

//   return <div className="App">Wait....</div>;
// };
