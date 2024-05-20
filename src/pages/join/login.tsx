import * as S from "src/styles/join/login.ts";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const refToken = localStorage.getItem("refreshToken");
    if (refToken) {
      navigate("/nickname");
    }
  }, []);

  const handleLogin = async () => {
    // async function requestSafetyArea() {
    //     // React Native의 WebView로 권한 요청 메시지 전송
    //     if ((window as any).ReactNativeWebView) {
    //         console.log('권한 요청 시도');
    //         await (window as any).ReactNativeWebView.postMessage(
    //             JSON.stringify({
    //                 type: 'ADD_SAFETY_AREA', // 요청 유형을 변경
    //             })
    //         );
    //         console.log('권한 요청 완료');
    //     }
    // }
    // await requestSafetyArea();

    const kakaoOauthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_TEST_REDIRECT_URI}`;
    window.location.href = kakaoOauthUrl;
    localStorage.setItem("loginType", "kakao");
  };

  const loginWithApple = async () => {
    localStorage.setItem("loginType", "apple");
    // const appleOauthUrl = `https://appleid.apple.com/auth/authorize?response_type=code&client_id=${process.env.REACT_APP_APPLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
    const appleOauthUrl = `https://appleid.apple.com/auth/authorize?response_type=code&client_id=net.azurestaticapps.kind-pebble-0020f5710.5&redirect_uri=${process.env.REACT_APP_TEST_REDIRECT_URI}`;
    window.location.href = appleOauthUrl;
  };

  return (
    <S.Container>
      {/* <S.Logo src={purpleLogo} alt="au logo" /> */}
      <S.Logo />
      <S.TopInfoWrapper>
        <S.TopInfo>간편하게 로그인하고</S.TopInfo>
        <S.TopInfo>다양한 서비스를 이용해보세요</S.TopInfo>
      </S.TopInfoWrapper>
      <S.AppleWrapper onClick={loginWithApple}>
        <S.AppleImg />
        <S.AppleText>Apple로 로그인</S.AppleText>
      </S.AppleWrapper>
      <S.KakaoWrapper onClick={handleLogin}>
        <S.KakaoImg />
        <S.KakaoText>Kakao로 로그인</S.KakaoText>
      </S.KakaoWrapper>
      <S.BottomInfoWrapper>
        <S.BottomInfo>계정 생성 시 개인정보 처리방침 및</S.BottomInfo>
        <S.BottomInfo>이용약관에 동의하게 됩니다.</S.BottomInfo>
      </S.BottomInfoWrapper>
    </S.Container>
  );
};
