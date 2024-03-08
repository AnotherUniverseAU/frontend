import { BackHeader } from "src/components/header/back/backHeader.tsx";
import { IconFooter } from "src/components/footer/icon/iconFooter.tsx";

import { useNavigate } from "react-router";

import * as S from "src/styles/setting/notice";

const noticeMockdata = [
  {
    id: 1,
    title: "취소/환불 규정 및 이용자 약관 관련 공지사항 안내드립니다",
    date: "2024-02-16 11:00:00",
  },

  {
    id: 2,
    title: "취소/환불 규정 및 이용자 약관 관련 공지사항 안내드립니다",
    date: "2024-02-19 11:00:00",
  },

  {
    id: 3,
    title: "취소/환불 규정 및 이용자 약관 관련 공지사항 안내드립니다",
    date: "2024-02-20 11:00:00",
  },
];

interface NoticeProps {
  id: number;
  title: string;
  date: string;
}

const NoticeItem = ({ id, title, date }: NoticeProps) => {
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
  return (
    <S.Container>
      <BackHeader route="/profile" title={"공지사항"} />
      <S.SubContainer>
        {noticeMockdata.map((notice) => (
          <NoticeItem id={notice.id} title={notice.title} date={notice.date} />
        ))}
      </S.SubContainer>
      <IconFooter activepage="/profile" />
    </S.Container>
  );
};
