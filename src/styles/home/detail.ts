import styled from "styled-components";

import { ReactComponent as CreatorImgComponent } from "src/assets/img/CreatorImg.svg";

export const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: scroll;
  position: relative;
  background: #f2f3f6;
  height: 48rem;
`;

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0.3rem 0.5rem 0 rgba(0, 0, 0, 0.1);
  background: white;
`;

export const MainImg = styled.img`
  width: 100vw;
  height: 100vw;
  object-fit: cover;
`;

export const MainInfo = styled.div`
  width: 100vw;
  height: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const MainName = styled.div`
  margin-left: 5vw;
  font-size: 1.5rem;
  font-weight: 700;
  height: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const MainTitle = styled.div`
  margin-left: 3vw;
  font-size: 0.9rem;
  height: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  padding-bottom: 1.3rem;
  box-shadow: 0 10rem 10rem 0 rgba(0, 0, 0, 0.5);
`;

export const ContentContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0 5rem;
`;

export const ContentTitle = styled.div`
  width: 90vw;
  font-size: 1rem;
  font-weight: 700;
  color: #a0a0a0;
`;

export const CreatorContainer = styled.div`
  width: 90vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
`;

export const CreatorImg = styled(CreatorImgComponent)`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

export const CreatorTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const CreatorNickname = styled.div`
  font-size: 1rem;
  font-weight: 700;
  margin-right: 1rem;
`;

export const CreatorWords = styled.div`
  font-size: 0.8rem;
  color: #a0a0a0;
  margin-top: 0.3rem;
`;

export const ContributorContainer = styled.div`
  width: 90vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
`;

export const ContributorButton = styled.span`
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  border: 0.15rem solid #6d2fef;
  margin: 0.3rem 0.2rem;
`;
