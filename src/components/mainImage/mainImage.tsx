import * as S from "./mainImage.ts";
import React from "react";

interface ImageProps {
  route: string;
  imgurl: string;
  name: string;
  title: string;
  creatorNickname: string;
}

export const MainImage: React.FC<ImageProps> = ({
  route,
  imgurl,
  name,
  title,
  creatorNickname,
}) => {
  return (
    <S.Container to={route}>
      <S.BackgroundImage src={imgurl} alt="mainImage" />
      <S.ShadowImage />
      <S.Title>{title}</S.Title>
      <S.SubContainer>
        <S.Name>{name}</S.Name>
        <S.CreatorNickname>@{creatorNickname}</S.CreatorNickname>
      </S.SubContainer>
    </S.Container>
  );
};
