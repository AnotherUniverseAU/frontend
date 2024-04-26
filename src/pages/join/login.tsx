import * as S from 'src/styles/join/login.ts';
import purpleLogo from 'src/assets/img/purpleLogo.png';
import kakaoIcon from 'src/assets/img/kakaoIcon.png';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const refToken = localStorage.getItem('refreshToken');
        if (refToken) {
            navigate('/');
        }
    }, []);

    const handleLogin = () => {
        const kakaoOauthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
        window.location.href = kakaoOauthUrl;
        // const getCode = async () => {
        //   const res = axios.get(kakaoOauthUrl);
        //   console.log(res);
        // };
        // getCode();

        // setTimeout(() => {

        //   console.log(urlParameter);
        //   const a = async () => {
        //     const res = await axios.post(`${process.env.REACT_APP_BASE_URL}`, data);
        //     return res;
        //   }

        // }, 3000);
    };

    return (
        <S.Container>
            <S.Logo src={purpleLogo} alt="au logo" />
            <div>Web ver 1.2.3</div>
            <S.TopInfoWrapper>
                <S.TopInfo>간편하게 로그인하고</S.TopInfo>
                <S.TopInfo>다양한 서비스를 이용해보세요</S.TopInfo>
            </S.TopInfoWrapper>
            <S.KakaoWrapper onClick={handleLogin}>
                <S.KakaoImg src={kakaoIcon} alt="kakao Icon" />
                <S.KakaoText>카카오로 시작하기</S.KakaoText>
            </S.KakaoWrapper>
            <S.BottomInfoWrapper>
                <S.BottomInfo>계정 생성 시 개인정보 처리방침 및</S.BottomInfo>
                <S.BottomInfo>이용약관(마케팅 정보 수신 동의 포함)에 동의하게 됩니다.</S.BottomInfo>
            </S.BottomInfoWrapper>
        </S.Container>
    );
};
