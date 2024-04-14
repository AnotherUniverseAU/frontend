import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { BackHeader } from "src/components/header/back/backHeader.tsx";
import { IconFooter } from "src/components/footer/icon/iconFooter.tsx";

import * as S from "src/styles/setting/noticeDetail";
import { apiRequestGet } from "src/apis/apiRequestGet";
import { useLocation } from "react-router-dom";

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

interface NoticeProps {
  title: string;
  content: string;
  date: string;
}

export const NoticeDetail = () => {
  const [noticeInfo, setNoticeInfo] = useState(Object);
  const location = useLocation();
  const { title, content, date } = location.state;

  useEffect(() => {
    setNoticeInfo({
      title: title,
      content: content,
      date: date,
    });
    // const noticeData: any = apiRequestGet("/notification").then((res) => {
    //   const notices = res.notifications
    //   notices.forEach((notice, idx) => {
    //     console.log(idx, params);
    //     if (idx === Number(params.id)) {
    //       setNoticeInfo(notice);
    //     }
    //   })
    // });

    // const data = noticeMockdata.notificiations.forEach();
  }, []);

  return (
    <S.Container>
      <BackHeader route="/notice" title={"공지사항"} />
      <S.SubContainer>
        <S.ContentWrapper>
          <S.Title>{noticeInfo.title}</S.Title>
          <S.Date>수정일 : {noticeInfo.date}</S.Date>
          <S.Content>{noticeInfo.content}</S.Content>
        </S.ContentWrapper>
      </S.SubContainer>
      <IconFooter activepage="/profile" />
    </S.Container>
  );
};
