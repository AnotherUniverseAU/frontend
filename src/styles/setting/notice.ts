import styled from "styled-components";

import { ReactComponent as Arrow } from "src/assets/img/Arrow.svg";

//////////NoticeItem//////////
export const NoticeItem = styled.div`
  width: 100vw;
  height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 1px solid #e5e5e5;
  background: white;
`;

export const NoticeContainer = styled.div`
  width: 80vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 5vw;
`;

export const NoticeTitle = styled.div`
  width: 80vw;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.2rem;
  text-overflow: ellipsis; // 텍스트가 너무 길면 ...으로 표시
  white-space: nowrap;
  overflow: hidden;
`;

export const NoticeDate = styled.div`
  width: 80vw;
  font-size: 0.8rem;
  color: #a5a5a5;
`;

export const NavArrowWrapper = styled.div`
  width: 10vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavArrow = styled(Arrow)`
  width: auto;
  height: 1.2rem;
`;

//////////Notice//////////
export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #f2f3f5;
`;

export const SubContainer = styled.div`
  width: 90vw;
  height: calc(100vh - 10rem);
  margin: 1rem 0;
`;
