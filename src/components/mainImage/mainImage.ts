import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled(Link)`
  width: 90vw;
  height: 90vw;

  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border-radius: 1rem;
`;

export const BackgroundImage = styled.img`
  width: 90vw;
  height: 90vw;

  object-fit: cover;

  position: absolute;
  top: 0;
  left: 0;
  border-radius: 1rem;

  z-index: 1;
`;

export const ShadowImage = styled.div`
  width: 90vw;
  height: 90vw;

  position: absolute;
  top: 0;
  left: 0;
  border-radius: 1rem;

  box-shadow: inset 0 -5rem 5rem rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

export const Title = styled.div`
  width: 75vw;
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  z-index: 2;
`;

export const SubContainer = styled.div`
  width: 75vw;
  margin-top: 0.2rem;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  z-index: 2;
`;

export const Name = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  z-index: 2;
`;

export const CreatorNickname = styled.div`
  color: #a0a0a0;
  font-size: 0.9rem;
  font-weight: 500;
  z-index: 2;
`;
