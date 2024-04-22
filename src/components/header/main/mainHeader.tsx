import * as S from "./mainHeader.ts";
// import React from "react";

const imgLogo = require("src/components/header/main/imgLogo.png") as string;
const textLogo = require("src/components/header/main/textLogo.png") as string;
const createPurpleImg =
  require("src/components/header/main/createPurpleImg.png") as string;

export function MainHeader({
  toCreate,
  isTutorial,
}: {
  toCreate: boolean;
  isTutorial: boolean;
}) {
  return (
    <S.HeaderContainer className="header">
      <S.LeftDiv>
        <S.StyledLink to={"/"} style={{ left: 0 }}>
          <S.ImgLogo src={imgLogo} alt="Img Logo" />
        </S.StyledLink>
      </S.LeftDiv>

      <S.CenterDiv>
        <S.TitleText>
          <S.TextLogo src={textLogo} alt="Text Logo" />
        </S.TitleText>
      </S.CenterDiv>

      <S.RightDiv>
        {toCreate && (
          <S.StyledLink
            to={"/createInfo"}
            style={{ right: 0 }}
            id="create-char-button"
          >
            <S.CreateContainer>
              {!isTutorial && (
                <S.CreateImg src={createPurpleImg} alt="createImg" />
              )}
            </S.CreateContainer>
          </S.StyledLink>
        )}
      </S.RightDiv>
    </S.HeaderContainer>
  );
}
