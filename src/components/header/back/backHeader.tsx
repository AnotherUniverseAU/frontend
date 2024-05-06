import { useNavigate } from 'react-router-dom';
import * as S from './backHeader.ts';
import React, { FC } from 'react';

const backArrow = require('src/components/header/back/backArrow.png') as string;

interface FooterProps {
    route?: string;
    title: string;
    type?: string;
}

export const BackHeader: FC<FooterProps> = ({ route, title, type }) => {
    const navigate = useNavigate();
    return (
        <S.HeaderContainer className="header">
            {type === 'first' ? (
                <>
                    <S.LeftDiv />
                    <S.TitleContainer>{title}</S.TitleContainer>
                    <S.RightDiv />
                </>
            ) : route ? (
                <>
                    <S.StyledBackDiv onClick={() => navigate(route)}>
                        <S.StyledLinkArrow src={backArrow} alt="back arrow" />
                    </S.StyledBackDiv>
                    <S.TitleContainer>{title}</S.TitleContainer>
                    <S.RightDiv />
                </>
            ) : (
                <>
                    <S.StyledBackDiv onClick={() => navigate(-1)}>
                        <S.StyledLinkArrow src={backArrow} alt="back arrow" />
                    </S.StyledBackDiv>
                    <S.TitleContainer>{title}</S.TitleContainer>
                    <S.RightDiv />
                </>
            )}
        </S.HeaderContainer>
    );
};
