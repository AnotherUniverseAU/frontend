import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SubContainer = styled.div`
  margin: 5rem 0 0;
  width: 70vw;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;

export const SubTitle = styled.div`
  font-size: 0.8rem;
  color: #a0a0a0;
  margin-top: 2rem;
`;

export const ListContainer = styled.div`
  margin-top: 2rem;
`;

export const EachListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.5rem;
  border-bottom: 1px solid #e0e0e0;
  margin-top: 0.5rem;
`;

export const ListText = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
`;

export const CheckImg = styled.img`
  width: 0.8rem;
  height: 0.8rem;
`;

export const BottomInfoWrapper = styled.div`
  width: 100%;
  position: fixed;
  bottom: 7rem;
`;

export const BottomInfo = styled.div`
  font-size: 0.8rem;
  color: #a0a0a0;
  margin: 0.3rem 0;
`;
