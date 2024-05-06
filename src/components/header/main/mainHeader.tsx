import * as S from './mainHeader.ts';
// import React from "react";
// MainHeader.tsx
import React from 'react';

export function MainHeader({ toCreate, isTutorial }: { toCreate: boolean; isTutorial: boolean }) {
    return (
        <S.HeaderContainer className="header">
            <S.LeftDiv>
                <S.StyledLink to={'/'}>
                    <S.ImgLogo />
                </S.StyledLink>
            </S.LeftDiv>

            <S.CenterDiv>
                <S.TitleText>
                    <S.TextLogo />
                </S.TitleText>
            </S.CenterDiv>

            <S.RightDiv>
                {toCreate && (
                    <S.StyledLink to={'/createInfo'} id="create-char-button">
                        <S.CreateContainer>{!isTutorial && <S.CreatePurpleImg />}</S.CreateContainer>
                    </S.StyledLink>
                )}
            </S.RightDiv>
        </S.HeaderContainer>
    );
}
