import * as S from 'src/styles/setting/profile.ts';
import React, { CSSProperties, FC, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { MainHeader } from 'src/components/header/main/mainHeader.tsx';
import { IconFooter } from 'src/components/footer/icon/iconFooter.tsx';

import { apiRequestGet } from 'src/apis/api.ts';

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
        window.open('https://pf.kakao.com/_tmxfFG/chat');
    };

    return (
        <S.Container>
            <MainHeader toCreate={false} isTutorial={false} />
            <S.SubContainer>
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
                    <NavItem
                        text={'알림설정'}
                        onClick={() => handleNavigate({ to: '/notification' })}
                        style={{ marginBottom: '1rem' }}
                    />
                    <NavItem
                        text={'공지사항'}
                        onClick={() => handleNavigate({ to: '/notice' })}
                        style={{ borderRadius: '0.5rem 0.5rem 0 0' }}
                    />
                    <NavItem
                        text={'문의하기'}
                        onClick={() => handleCSOpen()}
                        style={{
                            marginBottom: '1rem',
                            borderRadius: '0 0 0.5rem 0.5rem',
                        }}
                    />
                    <NavItem text={'로그아웃'} onClick={() => handleNavigate({ to: '/logout' })} />
                    <S.WithDraw onClick={() => handleNavigate({ to: '/withdraw' })}>탈퇴하기</S.WithDraw>
                </S.NavWrapper>
            </S.SubContainer>
            <IconFooter activepage="/profile" />
        </S.Container>
    );
};
