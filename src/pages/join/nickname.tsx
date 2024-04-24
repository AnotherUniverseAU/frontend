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
import { getNewToken } from 'src/apis/getNewToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const Nickname = () => {
    const [nickname, setNickname] = useState('');
    const [isEmpty, setIsEmpty] = useState(false);
    const [load, setLoad] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [accToken, setAccToken] = useState<any>();
    const [fcmToken, setFcmToken] = useState(String);

    const navigate = useNavigate();

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

        const onMessage = (event: any) => {
            try {
                const data = JSON.parse(event.data);
                alert('data:' + data);
                alert('data.type:' + data.type);
                alert('data.token:' + data.token);
                alert('data.message:' + data.message);
                if (data.type === 'FCM_TOKEN') {
                    console.log('Received FCM Token:', data.token);
                    setFcmToken(data.token);
                    localStorage.setItem('fcmToken', data.token);
                }
            } catch (error) {
                console.error('Error handling message from WebView:', error);
            }
        };

        window.addEventListener('message', onMessage);

        return window.removeEventListener('message', onMessage);
    }, []);
    useEffect(() => {
        alert(`fcmToken: ${fcmToken}`);
    }, [fcmToken]);

    useEffect(() => {
        if (accToken) {
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
        }
    }, [accToken]);

    const updateNickname = async () => {
        if (nickname !== '') {
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
                            // 닉네임 업데이트 성공 시, FCM 토큰 전송을 시도합니다.
                            if (fcmToken) {
                                alert(fcmToken);
                                try {
                                    customHttp
                                        .post('/user/fcm-token', {
                                            fcmToken: fcmToken,
                                        })
                                        .then((tokenRes) => {
                                            if (tokenRes) {
                                                // FCM 토큰 업데이트가 성공하면 홈으로 네비게이트합니다.
                                                navigate('/', { state: { from: '/nickname' } });
                                            } else {
                                                // FCM 토큰 업데이트 실패
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
                            // 서버 응답이 올바르지 않을 때
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
            {isLoading ? (
                <Loading></Loading>
            ) : (
                <S.Container>
                    <BackHeader type="first" title="프로필 설정" />
                    <S.InfoContainer className="container">
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
            )}
        </>
    );
};
