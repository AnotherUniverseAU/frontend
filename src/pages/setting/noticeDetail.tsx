import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { BackHeader } from "src/components/header/back/backHeader.tsx";
import { IconFooter } from "src/components/footer/icon/iconFooter.tsx";

import * as S from "src/styles/setting/noticeDetail";

const noticeMockdata = {
  notificiations: [
    {
      title: "????????????",
      content:
        "금일 몇 시부터 어쩌구저쩌구 취소/환불 규정 및 이용자 약관 관련 공지사항 안내드립니다 금일 몇 시부터 어쩌구저쩌구 취소/환불 규정 및 이용자 약관 관련 공지사항 안내드립니다",
      date: "2024-02-16 11:00:00",
    },

    {
      title: "취소/환불 규정 및 이용자 약관 관련 공지사항 안내드립니다",
      content:
        "금일 몇 시부터 어쩌구저쩌구 취소/환불 규정 및 이용자 약관 관련 공지사항 안내드립니다 금일 몇 시부터 어쩌구저쩌구 취소/환불 규정 및 이용자 약관 관련 공지사항 안내드립니다",
      date: "2024-02-19 11:00:00",
    },

    {
      title: "취소/환불 규정 및 이용자 약관 관련 공지사항 안내드립니다",
      content:
        "금일 몇 시부터 어쩌구저쩌구 취소/환불 규정 및 이용자 약관 관련 공지사항 안내드립니다 금일 몇 시부터 어쩌구저쩌구 취소/환불 규정 및 이용자 약관 관련 공지사항 안내드립니다",
      date: "2024-02-20 11:00:00",
    },
  ],
};

export const NoticeDetail = () => {
  const params = useParams<{ id: string }>();
  const [noticeInfo, setNoticeInfo] = useState(Object);

  useEffect(() => {
    const data = noticeMockdata.notificiations.forEach((notice, idx) => {
      console.log(idx, params);
      if (idx === Number(params.id)) {
        setNoticeInfo(notice);
      }
    });
  }, []);

  return (
    <S.Container>
      <BackHeader route="/notice" title={"공지사항"} />
      <S.SubContainer>
        <S.Title>{noticeInfo.title}</S.Title>
        <S.Date>{noticeInfo.date}</S.Date>
        <S.Content>{noticeInfo.content}</S.Content>
      </S.SubContainer>
      <IconFooter activepage="/profile" />
    </S.Container>
  );
};
