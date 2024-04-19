import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import * as S from "src/styles/join/nickname.ts";

import { BackHeader } from "src/components/header/back/backHeader.tsx";
import { TextFooter } from "src/components/footer/text/textFooter.tsx";
import { StyledInput } from "src/components/styledInput/styledInput.tsx";
import { apiRequestGet } from "src/apis/apiRequestGet";
import { apiRequestPost } from "src/apis/apiRequestPost";
import { Loading } from "../setting/loading";

export const Nickname = () => {
  const [nickname, setNickname] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [load, setLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getNickname = async () => {
      const res = await apiRequestGet("user/nickname");
      if (res.nickname !== "") {
        setNickname(res.nickname);
      }
    };
    getNickname();

    const handleMessage = async (event: any) => {
      console.log("Received message from WebView:", event.data);
      try {
        const { type, token } = JSON.parse(event.data);
        if (type === "FCM_TOKEN") {
          console.log("Received FCM Token:", token);
          localStorage.setItem("fcmToken", token);
        }
      } catch (error) {
        console.error("Error handling message from WebView:", error);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const updateNickname = async (nickname: string) => {
    if (nickname !== "") {
      const res = await apiRequestPost("/user/nickname", {
        nickname: nickname,
      });

      if (res.nickname) {
        setIsLoading(true);
        // fcm 토큰도 여기서 해주자
        async function sendFCMToken() {
          const fcmToken = localStorage.getItem("fcmToken");
          // axios를 사용하여 백엔드로 FCM Token 전송
          // axios.post('https://example.com/fcm-token', { token: fcmToken });

          return apiRequestPost("/user/fcm-token", { fcmToken: fcmToken });
        }
        sendFCMToken().then((res) => {
          if (res.fcmToken) {
            navigate("/", { state: { from: "/nickname" } });
          } else {
            // 에러 페이지
            console.log("err");
          }
        });
      }
    } else {
      if (load === false) {
        setLoad(true);
      }
    }
  };

  useEffect(() => {
    if (load === true) {
      if (nickname === "") {
        setIsEmpty(true);
        console.log("true");
      } else {
        setIsEmpty(false);
        console.log("false");
      }
    } else {
      if (nickname !== "") {
        setLoad(true);
      }
    }
  }, [nickname, load]);
  return (
    <>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <S.Container>
          <BackHeader type="first" title="프로필 설정" />
          <S.InfoContainer>
            <S.Info>캐릭터가 나를 부를 때 사용할</S.Info>
            <S.Info>기본 호칭을 입력해주세요</S.Info>
            <StyledInput
              placeholder={
                isEmpty
                  ? "호칭은 한 글자 이상이어야 합니다."
                  : "호칭을 입력해주세요"
              }
              content={nickname}
              setContent={setNickname}
              limit={20}
              height="3.8rem"
              marginTop="2rem"
              isEmpty={isEmpty}
            />
          </S.InfoContainer>
          <TextFooter
            route="/"
            text="수정완료"
            onClick={() => updateNickname(nickname)}
          />
        </S.Container>
      )}
    </>
  );
};
