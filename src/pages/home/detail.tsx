import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BackHeader } from "src/components/header/back/backHeader.tsx";
import { TextFooter } from "src/components/footer/text/textFooter.tsx";

import { apiRequestGet } from "src/apis/apiRequestGet";
import { apiRequestPost } from "src/apis/apiRequestPost";

import { Loading } from "src/pages/setting/loading.tsx";

import * as S from "src/styles/home/detail.ts";

export const Detail = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<any>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true); // 데이터를 가져오기 전에 로딩 상태를 true로 설정
      const result: any = await apiRequestGet(`character/info/${params.id}`);
      setDetail(result.character);
      setLoading(false); // 데이터를 가져온 후에 로딩 상태를 false로 설정
    };
    fetchDetail();
  }, [params.id]);

  const handleStartChat = async () => {
    setLoading(true);

    const res: any = await apiRequestPost("/subscription/subscribe", {
      characterId: String(params.id),
    });
    setTimeout(() => {
      setLoading(false);
      navigate(`/chatroom/${params.id}`);
    }, 500);
  };

  return (
    <>
      <BackHeader route="/" title="상세 보기" />
      {!loading ? (
        <div className="container">
          <S.MainContainer>
            <S.MainImg src={detail.profilePicUrl} alt={detail.name} />
            <S.MainInfo>
              <S.MainName>{detail.name}</S.MainName>
              <S.MainTitle>{detail.title}</S.MainTitle>
            </S.MainInfo>
          </S.MainContainer>
          <S.ContentContainer>
            <S.ContentTitle style={{ paddingBottom: "1rem" }}>
              Creator
            </S.ContentTitle>
            <S.CreatorContainer>
              <S.CreatorImg />
              <S.CreatorTextContainer>
                <S.CreatorNickname>@{detail.creatorNickname}</S.CreatorNickname>
                <S.CreatorWords>"{detail.creatorWords}"</S.CreatorWords>
              </S.CreatorTextContainer>
            </S.CreatorContainer>
            <S.ContentTitle style={{ paddingBottom: "0.5rem" }}>
              Contributor
            </S.ContentTitle>
            <S.ContributorContainer>
              {detail.hashtags.map((name: string, index: number) => (
                <S.ContributorButton key={index}>@{name}</S.ContributorButton>
              ))}
            </S.ContributorContainer>
          </S.ContentContainer>
        </div>
      ) : (
        <Loading />
      )}
      <TextFooter route="." text="채팅 시작하기" onClick={handleStartChat} />
    </>
  );
};
