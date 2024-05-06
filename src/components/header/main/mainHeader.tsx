import * as S from './mainHeader.ts';
// import React from "react";
// MainHeader.tsx
import React from 'react';
import { ReactComponent as ImgLogo } from 'src/components/header/main/imgLogo.svg';
import { ReactComponent as TextLogo } from 'src/components/header/main/textLogo.svg';
import { ReactComponent as CreatePurpleImg } from 'src/components/header/main/createPurpleImg.svg';

export function MainHeader({ toCreate, isTutorial }: { toCreate: boolean; isTutorial: boolean }) {
    return (
        <S.HeaderContainer className="header">
            <S.LeftDiv>
                <S.StyledLink to={'/'}>
                    <ImgLogo />
                </S.StyledLink>
            </S.LeftDiv>

            <S.CenterDiv>
                <S.TitleText>
                    <TextLogo />
                </S.TitleText>
            </S.CenterDiv>

            <S.RightDiv>
                {toCreate && (
                    <S.StyledLink to={'/createInfo'} id="create-char-button">
                        <S.CreateContainer>{!isTutorial && <CreatePurpleImg />}</S.CreateContainer>
                    </S.StyledLink>
                )}
            </S.RightDiv>
        </S.HeaderContainer>
    );
}
