import * as S from './styledImage.ts';
import React from 'react';

interface ImageProps {
    route: string;
    imgurl: string;
    name: string;
    title: string;
    creatorNickname: string;
}

export const StyledImage: React.FC<ImageProps> = ({ route, imgurl, name, title, creatorNickname }) => {
    return (
        <S.Container to={route}>
            <S.BackgroundImage src={imgurl} alt="mainImage" />
            <S.ShadowImage />
            {/* <S.Title>{title}</S.Title>
            <S.SubContainer>
                <S.Name>{name}</S.Name>
                <S.CreatorNickname>@{creatorNickname}</S.CreatorNickname>
            </S.SubContainer> */}
            <S.NameDiv>
                <S.Name>{name}</S.Name>
            </S.NameDiv>
        </S.Container>
    );
};
