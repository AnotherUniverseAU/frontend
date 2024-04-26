import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import * as S from 'src/styles/join/nickname.ts';

import { BackHeader } from 'src/components/header/back/backHeader.tsx';
import { TextFooter } from 'src/components/footer/text/textFooter.tsx';
import { StyledInput } from 'src/components/styledInput/styledInput.tsx';
import { apiRequestGet } from 'src/apis/apiRequestGet';
import { getNewToken } from 'src/apis/getNewToken';

export const Nickname = () => {
    const [nickname, setNickname] = useState('');
    const [isEmpty, setIsEmpty] = useState(false);
    const [load, setLoad] = useState(false);
    const [accToken, setAccToken] = useState<any>();
    const [fcmToken, setFcmToken] = useState(String);

    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken === null) {
            getNewToken().then((res) => {
                localStorage.setItem('accessToken', res);
                setAccToken(res);
            });
        } else {
            setAccToken(accessToken);
        }

        window.addEventListener(
            'message',
            (event) => {
                try {
                    const data = JSON.parse(event.data);
                    alert('FCM 토큰 받음:' + data.token);
                    if (data.type === 'FCM_TOKEN_RECEIVE') {
                        setFcmToken(data.token);
                        localStorage.setItem('fcmToken', data.token);
                    }
                } catch (error) {
                    console.error('Error handling message from WebView:', error);
                }
            },
            true
        );

        async function requestFCMToken() {
            // React Native의 WebView로 권한 요청 메시지 전송
            if ((window as any).ReactNativeWebView) {
                console.log('권한 요청 시도');
                await (window as any).ReactNativeWebView.postMessage(
                    JSON.stringify({
                        type: 'FCM_TOKEN_REQUESTS', // 요청 유형을 변경
                    })
                );
                console.log('권한 요청 완료');
            }
        }
        requestFCMToken();
    }, []);

    useEffect(() => {
        if (accToken) {
            const getNickname = async () => {
                const res = await apiRequestGet('user/nickname');
                if (res.nickname !== '') {
                    setNickname(res.nickname);
                }
            };
            getNickname();
        }
    }, [accToken]);

    const updateNickname = async () => {
        if (nickname !== '') {
            console.log('닉네임은 입력됨');
            try {
                const customHttp = axios.create({
                    baseURL: `${BASE_URL}`,
                    timeout: 8000,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accToken}`,
                    },
                });
                customHttp
                    .post('/user/nickname', {
                        nickname: nickname,
                    })
                    .then((res: any) => {
                        if (res && res.data.nickname) {
                            if (fcmToken) {
                                try {
                                    customHttp
                                        .post('/user/fcm-token', {
                                            fcmToken: fcmToken,
                                        })
                                        .then((tokenRes) => {
                                            if (tokenRes) {
                                                navigate('/', { state: { from: '/nickname' } });
                                            } else {
                                                console.error('FCM 토큰 업데이트 실패:', tokenRes);
                                                alert(
                                                    `FCM 토큰 업데이트에 실패했습니다. 다시 시도해 주세요. => ${tokenRes}`
                                                );
                                            }
                                        });
                                } catch (error) {
                                    console.error('FCM 토큰 전송 중 오류 발생:', error);
                                    alert('FCM 토큰 전송 중 오류가 발생했습니다.');
                                }
                            } else {
                                alert(`FCM 토큰이 없습니다. => ${fcmToken}`);
                            }
                        } else {
                            console.error('닉네임 업데이트 실패:', res);
                            alert('닉네임 업데이트에 실패했습니다. 다시 시도해 주세요.');
                        }
                    });
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
                <TextFooter route="/" text="시작하기" onClick={() => updateNickname()} />
            </S.Container>
        </>
    );
};
