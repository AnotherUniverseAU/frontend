import { BackHeader } from "src/components/header/back/backHeader.tsx";
import { IconFooter } from "src/components/footer/icon/iconFooter.tsx";

import { useNavigate } from "react-router";

import * as S from "src/styles/setting/notice";
import { useEffect, useState } from "react";
import { apiRequestGet } from "src/apis/apiRequestGet";

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
  id: number;
  title: string;
  content: string;
  date: string;
}

const NoticeItem = ({ id, title, content, date }: NoticeProps) => {
  const navigate = useNavigate();
  const handleClick = (route: string) => () => {
    navigate(route);
  };
  return (
    <S.NoticeItem onClick={handleClick(`/noticeDetail/${id}`)}>
      <S.NoticeContainer>
        <S.NoticeTitle>{title}</S.NoticeTitle>
        <S.NoticeDate>{date}</S.NoticeDate>
      </S.NoticeContainer>
      <S.NavArrowWrapper>
        <S.NavArrow />
      </S.NavArrowWrapper>
    </S.NoticeItem>
  );
};

export const Notice = () => {
  const [notificiations, setNotificiations] = useState({});

  useEffect(() => {
    // const noticeData = apiRequestGet("/notificaition").notifications;
    const noticeData = noticeMockdata;
    setNotificiations(noticeData);
  }, []);

  return (
    <S.Container>
      <BackHeader route="/profile" title={"공지사항"} />
      <S.SubContainer>
        {noticeMockdata.notificiations.map((notice, idx) => (
          <NoticeItem
            key={idx}
            id={idx + 1}
            title={notice.title}
            content={notice.content}
            date={notice.date}
          />
        ))}
      </S.SubContainer>
      <IconFooter activepage="/profile" />
    </S.Container>
  );
};
