import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import * as S from 'src/styles/join/nickname.ts';

import { BackHeader } from 'src/components/header/back/backHeader.tsx';
import { TextFooter } from 'src/components/footer/text/textFooter.tsx';
import { StyledInput } from 'src/components/styledInput/styledInput.tsx';
import { apiRequestGet } from 'src/apis/apiRequestGet';
import { apiRequestPost } from 'src/apis/apiRequestPost';
import { Loading } from '../setting/loading';

export const Nickname = () => {
    const [nickname, setNickname] = useState('');
    const [isEmpty, setIsEmpty] = useState(false);
    const [load, setLoad] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // const handleMessage = (event: any) => {
    //     event.preventDefault();
    //     event.stopPropagation();

    //     try {
    //         // JSON 데이터 파싱
    //         const messageData = JSON.parse(event.data);
    //         alert('메시지 받음' + event.data);
    //         alert('메시지 받음' + messageData);
    //         console.log('Received message from WebView:', messageData);

    //         const { type, data } = messageData;
    //         if (type === 'FCM_TOKEN') {
    //             console.log('Received FCM Token:', data);
    //             localStorage.setItem('fcmToken', data);
    //             alert(`Received FCM token: ${data}`);
    //         }
    //     } catch (error) {
    //         console.error('Error handling message from WebView:', error);
    //         alert(`Error receiving FCM Token. Please try again, ${error}`);
    //     }
    // };

    useEffect(() => {
        const getNickname = async () => {
            // try {
            const res = await apiRequestGet('user/nickname');
            if (res.nickname !== '') {
                setNickname(res.nickname);
            }
            // }
            // } catch (e) {
            //     window.location.reload();
            // }
        };
        getNickname();

        const sendTokenToWebView = () => {
            if ((window as any).ReactNativeWebView) {
                console.log('Sending token to WebView');
                (window as any).ReactNativeWebView.postMessage(
                    JSON.stringify({
                        type: 'SendTokenToWebview',
                    })
                );
            }
        };

        sendTokenToWebView();

        window.addEventListener(
            'message',
            (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'FCM_TOKEN') {
                        console.log('Received FCM Token:', data.token);
                        localStorage.setItem('fcmToken', data.token);
                    }
                } catch (error) {
                    console.error('Error handling message from WebView:', error);
                }
            },
            true
        );
    }, []);

    const updateNickname = async (nickname: string) => {
        if (nickname !== '') {
            console.log('닉네임은 입력됨');
            try {
                const res = await apiRequestPost('/user/nickname', {
                    nickname: nickname,
                });

                if (res && res.nickname) {
                    // 닉네임 업데이트 성공 시, FCM 토큰 전송을 시도합니다.
                    try {
                        const fcmToken = localStorage.getItem('fcmToken');
                        const tokenRes = await apiRequestPost('/user/fcm-token', { fcmToken: fcmToken });

                        if (tokenRes) {
                            // FCM 토큰 업데이트가 성공하면 홈으로 네비게이트합니다.
                            navigate('/', { state: { from: '/nickname' } });
                        } else {
                            // FCM 토큰 업데이트 실패
                            console.error('FCM 토큰 업데이트 실패:', tokenRes);
                            alert(`FCM 토큰 업데이트에 실패했습니다. 다시 시도해 주세요. => ${tokenRes}`);
                        }
                    } catch (error) {
                        console.error('FCM 토큰 전송 중 오류 발생:', error);
                        alert('FCM 토큰 전송 중 오류가 발생했습니다.');
                    }
                } else {
                    // 서버 응답이 올바르지 않을 때
                    console.error('닉네임 업데이트 실패:', res);
                    alert('닉네임 업데이트에 실패했습니다. 다시 시도해 주세요.');
                }
            } catch (error) {
                console.error('닉네임 업데이트 중 오류 발생:', error);
                alert('닉네임 업데이트 중 오류가 발생했습니다.');
            }
        } else {
            if (!load) {
                setLoad(true);
            }
        }
    };

    useEffect(() => {
        if (load === true) {
            if (nickname === '') {
                setIsEmpty(true);
                console.log('true');
            } else {
                setIsEmpty(false);
                console.log('false');
            }
        } else {
            if (nickname !== '') {
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
                            placeholder={isEmpty ? '호칭은 한 글자 이상이어야 합니다.' : '호칭을 입력해주세요'}
                            content={nickname}
                            setContent={setNickname}
                            limit={20}
                            height="3.8rem"
                            marginTop="2rem"
                            isEmpty={isEmpty}
                        />
                    </S.InfoContainer>
                    <TextFooter route="/" text="수정완료" onClick={() => updateNickname(nickname)} />
                </S.Container>
            )}
        </>
    );
};
