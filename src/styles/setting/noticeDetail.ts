import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: white;
`;

export const SubContainer = styled.div`
  width: 90vw;
  height: calc(100vh - 10rem);
  margin: 1rem 0;
`;

export const Title = styled.div`
  width: 80vw;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 2rem 10vw 0;
`;

export const Date = styled.div`
  width: 80vw;
  font-size: 0.8rem;
  color: #a5a5a5;
  margin: 1rem 10vw 1.5rem;
`;

export const Content = styled.div`
  width: 80vw;
  font-size: 1rem;
  margin: 0 10vw 2rem;
`;
