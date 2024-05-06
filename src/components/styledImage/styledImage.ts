import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled(Link)`
  width: 28vw;

  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border-radius: 1rem;
  margin-right: 2vw;
  margin-bottom: 2vh;

  box-shadow: inset 0 -3rem 3rem rgba(0, 0, 0, 0.3);
`;

export const BackgroundImage = styled.img`
  width: 28vw;
  margin
  // height: calc(7.5rem + 3vh);

  // position: absolute;
  top: 0;
  left: 0;
  border-radius: 1rem;

  z-index: 1;
`;

export const ShadowImage = styled.div`
  width: 28vw;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 1rem;

  box-shadow: inset 0 -3rem 3rem rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

export const Title = styled.div`
  width: 100%;
  color: white;
  font-size: 0.4rem;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;

  z-index: 2;
`;

export const SubContainer = styled.div`
  width: 100%;
  margin-top: 0.2rem;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  z-index: 2;
`;

export const NameDiv = styled.div`
  display: flex;
  width: 100%;
  position: absolute;
  padding-left: 10%;
  padding-bottom: 10%;
`;

export const Name = styled.p`
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  z-index: 2;
`;

export const CreatorNickname = styled.div`
  color: #a0a0a0;
  font-size: 0.4rem;
  font-weight: 500;
  z-index: 2;
`;
