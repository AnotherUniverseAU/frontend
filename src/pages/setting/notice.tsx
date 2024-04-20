import { BackHeader } from "src/components/header/back/backHeader.tsx";
import { IconFooter } from "src/components/footer/icon/iconFooter.tsx";

import { useNavigate } from "react-router";

import * as S from "src/styles/setting/notice";
import { useEffect, useState } from "react";
import { apiRequestGet } from "src/apis/apiRequestGet";

interface NoticeProps {
  title: string;
  content: string;
  date: string;
}

const NoticeItem = ({ title, content, date }: NoticeProps) => {
  const navigate = useNavigate();
  const handleClick = (route: string) => () => {
    navigate(route, { state: { title, content, date } });
  };
  return (
    <S.NoticeItem onClick={handleClick(`/noticeDetail`)}>
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
  const [notificiations, setNotificiations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiRequestGet("/notification").then((res) =>
      setNotificiations(res.notifications)
    );
  }, []);

  return (
    <S.Container>
      <BackHeader route="/profile" title={"공지사항"} />
      <S.SubContainer>
        {notificiations.map((notice: any, idx) => (
          <NoticeItem
            key={idx}
            title={notice.title}
            content={notice.content}
            date={new Date(Date.parse(notice.createdDate) + 9 * 60 * 60 * 1000)
              .toISOString()
              .replace("T", " ")
              .substring(0, 16)}
          />
        ))}
      </S.SubContainer>
      <IconFooter activepage="/profile" />
    </S.Container>
  );
};
