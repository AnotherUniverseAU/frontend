import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SubContainer = styled.div`
  height: calc(100vh - 10rem);
  display: flex;
  flex-direction: column;
`;

export const TitleContainer = styled.div`
  width: 85vw;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.8rem 0;
`;

export const Highlight = styled.span`
  color: #6d2fef;
`;

export const ListContainer = styled.div`
  width: 85vw;
  height: auto;
  margin-top: 1rem;
`;

export const ListContent = styled.li`
  width: 19rem;
  font-size: 0.95rem;
  font-weight: 300;
  margin: 0.5rem 0;
  list-style-type: none; // 마커 없애기
  text-indent: 0.3rem; // 들여쓰기
  &::before {
    // 다시 dot 붙이기
    content: "•";
    font-size: 108%;
    padding-right: 0.3rem;
  }
`;

export const LineTranslation = styled.div`
  width: 19rem;
  font-size: 0.95rem;
  margin: 0.5rem 0;
  text-indent: 1rem;
  font-weight: 300;
`;

export const Underline = styled.span`
  text-decoration: underline;
  font-weight: 700;
`;
