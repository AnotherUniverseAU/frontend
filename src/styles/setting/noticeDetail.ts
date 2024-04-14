import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f2f3f6;
`;

export const SubContainer = styled.div`
  width: 100%;
  height: calc(100vh - 10rem);
`;
export const ContentWrapper = styled.div`
  width: 90%;
  padding: 5% 0;
  height: 100%;
  margin: 0 5%;
  overflow: scroll;
`;
export const Title = styled.div`
  width: 100%;
  font-size: 1.3rem;
  font-weight: 700;
  padding-bottom: 0.75rem;
  overflow-wrap: break-word;
`;

export const Date = styled.div`
  width: 100%;
  font-size: 0.8rem;
  color: #a5a5a5;
  padding-bottom: 1.5rem;
`;

export const Content = styled.div`
  width: 100%;
  font-size: 1rem;
  overflow-wrap: break-word;
`;
