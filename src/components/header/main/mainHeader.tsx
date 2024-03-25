import * as S from './mainHeader.ts';
// import React from "react";

const imgLogo = require('src/components/header/main/imgLogo.png') as string;
const textLogo = require('src/components/header/main/textLogo.png') as string;
const createPurpleImg = require('src/components/header/main/createPurpleImg.png') as string;
const createWhiteImg = require('src/components/header/main/createWhiteImg.png') as string;
const circleWhiteImg = require('src/components/header/main/circleWhiteImg.png') as string;

export function MainHeader({ toCreate, isTutorial }: { toCreate: boolean; isTutorial: boolean }) {
    return (
        <S.HeaderContainer>
            <S.StyledLink to={'/'} style={{ left: 0 }}>
                <S.ImgLogo src={imgLogo} alt="Img Logo" />
            </S.StyledLink>

            <S.TitleText>
                <S.TextLogo src={textLogo} alt="Text Logo" />
            </S.TitleText>
            {toCreate && (
                <S.StyledLink to={'/createInfo'} style={{ right: 0 }}>
                    <S.CreateContainer>
                        <S.CreateImg src={isTutorial ? createWhiteImg : createPurpleImg} alt="createImg" />
                        {isTutorial && <S.CircleImg src={circleWhiteImg} alt="circle White Img" />}
                    </S.CreateContainer>
                </S.StyledLink>
            )}
        </S.HeaderContainer>
    );
}
