import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { BackHeader } from "src/components/header/back/backHeader.tsx";
import { IconFooter } from "src/components/footer/icon/iconFooter.tsx";

import * as S from "src/styles/setting/noticeDetail";

const noticeMockdata = [
  {
    id: 1,
    title: "취소/환불 규정 및 이용자 약관 관련 공지사항 안내드립니다",
    date: "2024-02-16 11:00:00",
    content: "와랄라라랄라라ㅏㄹ",
  },

  {
    id: 2,
    title: "취소/환불 규정 및 이용자 약관 관련 공지사항 안내드립니다",
    date: "2024-02-19 11:00:00",
    content: "와랄라라랄라라ㅏㄹ",
  },

  {
    id: 3,
    title: "취소/환불 규정 및 이용자 약관 관련 공지사항 안내드립니다",
    date: "2024-02-20 11:00:00",
    content: "와랄라라랄라라ㅏㄹ",
  },
];

export const NoticeDetail = () => {
  const params = useParams<{ id: string }>();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const data = noticeMockdata.find(
      (notice) => notice.id === Number(params.id)
    );
    setTitle(data?.title || "");
    setDate(data?.date || "");
    setContent(data?.content || "");
  }, [params.id]);

  return (
    <S.Container>
      <BackHeader route="/notice" title={"공지사항"} />
      <S.SubContainer>
        <S.Title>{title}</S.Title>
        <S.Date>{date}</S.Date>
        <S.Content>{content}</S.Content>
      </S.SubContainer>
      <IconFooter activepage="/profile" />
    </S.Container>
  );
};
