import * as S from "./chatHeader.ts";
import React, { FC } from "react";

const backArrow = require("src/components/header/back/backArrow.png") as string;

interface FooterProps {
  route: string;
  title: string;
}

export const ChatHeader: FC<FooterProps> = ({ route, title }) => {
  return (
    <S.HeaderContainer>
      <S.StyledLink to={route}>
        <S.StyledLinkArrow src={backArrow} alt="back arrow" />
      </S.StyledLink>
      <S.TitleContainer>{title}</S.TitleContainer>
    </S.HeaderContainer>
  );
};
