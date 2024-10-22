import * as S from 'src/styles/setting/profile.ts';
import React, { CSSProperties, FC, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { MainHeader } from 'src/components/header/main/mainHeader.tsx';
import { IconFooter } from 'src/components/footer/icon/iconFooter.tsx';

import { apiRequestGet } from 'src/apis/apiRequestGet';
import { BackgroundFull } from 'src/components/background/background';
import { BackHeader } from 'src/components/header/back/backHeader.tsx';
import { OpenInBrowser } from '@mui/icons-material';

interface NavItemProps {
    text: string;
    onClick: () => void;
    style?: CSSProperties;
}

const NavItem: FC<NavItemProps> = ({ text, onClick, style }) => {
    return (
        <S.NavItem onClick={onClick} style={style}>
            <S.NavText>{text}</S.NavText>
            <S.NavArrow />
        </S.NavItem>
    );
};

export const Profile = () => {
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        const fetchNickname = async () => {
            const result = await apiRequestGet('/user/nickname');
            setNickname(result.nickname);
            localStorage.setItem('nickname', result.nickname);
        };

        fetchNickname();
    }, []);

    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigate = ({ to, state }: { to: string; state?: any }) => {
        navigate(`${to}`, { state: { from: location.pathname, ...state } });
    };

    const handleCSOpen = () => {
        window.open('https://talk.naver.com/W5ZLRN');
    };

    const openAppSettings = async () => {
        if ((window as any).ReactNativeWebView) {
            console.log('설정 이동 요청');
            await (window as any).ReactNativeWebView.postMessage(
                JSON.stringify({
                    type: 'OPEN_APP_SETTINGS',
                })
            );
            console.log('설정 이동 완료');
        }
    };

    return (
        <S.Container>
            <MainHeader toCreate={false} isTutorial={false} />
            <S.SubContainer className="container">
                <S.ProfileContainer>
                    <S.ProfileImg />
                    <S.NicknameContainer>
                        <S.Nickname>{nickname}</S.Nickname>
                        <S.NicknameEditImg
                            onClick={() => handleNavigate({ to: '/nicknameEdit', state: { nickname } })}
                        />
                    </S.NicknameContainer>
                </S.ProfileContainer>
                <S.NavWrapper>
                    <div>
                        <NavItem text={'알림설정'} onClick={() => openAppSettings()} style={{ marginBottom: '1rem' }} />
                        <NavItem
                            text={'공지사항'}
                            onClick={() => handleNavigate({ to: '/notice' })}
                            style={{ borderRadius: '0.5rem 0.5rem 0 0' }}
                        />
                        <NavItem
                            text={'문의/신고'}
                            onClick={() => handleCSOpen()}
                            style={{
                                marginBottom: '1rem',
                                borderRadius: '0 0 0.5rem 0.5rem',
                            }}
                        />
                        {/* <NavItem text={'로그아웃'} onClick={() => handleNavigate({ to: '/logout' })} /> */}
                        <S.WithDraw onClick={() => handleNavigate({ to: '/withdraw', state: { nickname } })}>
                            탈퇴하기
                        </S.WithDraw>
                    </div>
                </S.NavWrapper>
            </S.SubContainer>
            <IconFooter activepage="/profile" />
            <BackgroundFull color="#f2f3f6" />
        </S.Container>
    );
};
