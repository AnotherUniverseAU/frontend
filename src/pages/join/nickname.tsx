import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import * as S from "src/styles/join/nickname.ts";

import { BackHeader } from "src/components/header/back/backHeader.tsx";
import { TextFooter } from "src/components/footer/text/textFooter.tsx";
import { StyledInput } from "src/components/styledInput/styledInput.tsx";
import { apiRequestGet } from "src/apis/apiRequestGet";
import { apiRequestPost } from "src/apis/apiRequestPost";
import { Loading } from "../setting/loading";
import { getNewToken } from "src/apis/getNewToken";

export const Nickname = () => {
  const [nickname, setNickname] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [load, setLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accToken, setAccToken] = useState<any>();
  const [fcmToken, setFcmToken] = useState(String);

  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleMessage = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      // JSON 데이터 파싱
      const messageData = JSON.parse(event.data);
      alert("메시지 받음" + event.data);
      alert("메시지 받음" + messageData);
      console.log("Received message from WebView:", messageData);

      const { type, data } = messageData;
      if (type === "FCM_TOKEN") {
        console.log("Received FCM Token:", data);
        localStorage.setItem("fcmToken", data);
        alert(`Received FCM token: ${data}`);
      }
    } catch (error) {
      console.error("Error handling message from WebView:", error);
      alert(`Error receiving FCM Token. Please try again, ${error}`);
    }
  };

  // const handleMessage = async (event: any) => {
  //     event.preventDefault();
  //     event.stopPropagation();

  //     // 이 예제에서는 테스트를 위해 임의의 데이터를 사용합니다.
  //     // 실제 사용 시에는 event.data가 실제로 존재하는지 확인하고 사용해야 합니다.
  //     const testData = event.data || { type: 'FCM_TOKEN', data: 'test-token-from-event' };

  //     console.log('Received message from WebView:', testData);
  //     try {
  //         const { type, data } = testData;
  //         if (type === 'FCM_TOKEN') {
  //             console.log('Received FCM Token:', data);
  //             localStorage.setItem);
  //             alert(`전달 받은 FCM 토큰: ${type}이고 ${data}`);
  //         }
  //     } catch (error) {
  //         console.error('Error handling message from WebView:', error);
  //         alert(`FCM 토큰 수신 중 오류가 발생했습니다. 다시 시도해 주세요. ${error}`);
  //     }
  // };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    alert(accessToken);
    if (accessToken === null) {
      getNewToken().then((res) => {
        localStorage.setItem("accessToken", res);
        setAccToken(res);
      });
    } else {
      setAccToken(accessToken);
    }

    window.addEventListener(
      "message",
      (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "FCM_TOKEN") {
            console.log("Received FCM Token:", data.token);
            setFcmToken(data.token);
            localStorage.setItem("fcmToken", data.token);
          }
        } catch (error) {
          console.error("Error handling message from WebView:", error);
        }
      },
      true
    );
  }, []);
  useEffect(() => {
    if (accToken) {
      const getNickname = async () => {
        // try {
        const res = await apiRequestGet("user/nickname");
        if (res.nickname !== "") {
          setNickname(res.nickname);
        }
        // }
        // } catch (e) {
        //     window.location.reload();
        // }
      };
      getNickname();
    }
  }, [accToken]);

  const updateNickname = async () => {
    if (nickname !== "") {
      console.log("닉네임은 입력됨");
      try {
        const customHttp = axios.create({
          baseURL: `${BASE_URL}`,
          timeout: 8000,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accToken}`,
          },
        });
        customHttp
          .post("/user/nickname", {
            nickname: nickname,
          })
          .then((res: any) => {
            alert(res);
            alert(res.data.nickname);
            if (res && res.data.nickname) {
              // 닉네임 업데이트 성공 시, FCM 토큰 전송을 시도합니다.
              if (fcmToken) {
                try {
                  customHttp
                    .post("/user/fcm-token", {
                      fcmToken: fcmToken,
                    })
                    .then((tokenRes) => {
                      if (tokenRes) {
                        // FCM 토큰 업데이트가 성공하면 홈으로 네비게이트합니다.
                        navigate("/", { state: { from: "/nickname" } });
                      } else {
                        // FCM 토큰 업데이트 실패
                        console.error("FCM 토큰 업데이트 실패:", tokenRes);
                        alert(
                          `FCM 토큰 업데이트에 실패했습니다. 다시 시도해 주세요. => ${tokenRes}`
                        );
                      }
                    });
                } catch (error) {
                  console.error("FCM 토큰 전송 중 오류 발생:", error);
                  alert("FCM 토큰 전송 중 오류가 발생했습니다.");
                }
              } else {
                alert(`FCM 토큰이 없습니다. => ${fcmToken}`);
              }
            } else {
              // 서버 응답이 올바르지 않을 때
              console.error("닉네임 업데이트 실패:", res);
              alert("닉네임 업데이트에 실패했습니다. 다시 시도해 주세요.");
            }
          });
      } catch (error) {
        console.error("닉네임 업데이트 중 오류 발생:", error);
        alert("닉네임 업데이트 중 오류가 발생했습니다.");
      }
    } else {
      if (!load) {
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
            text="시작하기"
            onClick={() => updateNickname()}
          />
        </S.Container>
      )}
    </>
  );
};
