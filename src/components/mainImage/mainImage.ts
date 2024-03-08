import styled from "styled-components";
import { Link } from "react-router-dom";

interface ImageProps {
  imgurl: string;
}

export const Container = styled(Link)<ImageProps>`
  width: 90vw;
  height: 90vw;

  background: url(${(props) => props.imgurl});
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border-radius: 1rem;

  box-shadow: inset 0 -3rem 3rem rgba(0, 0, 0, 0.3);
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
`;

export const SubContainer = styled.div`
  width: 75vw;
  margin-top: 0.2rem;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const Name = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
`;

export const CreatorNickname = styled.div`
  color: #a0a0a0;
  font-size: 1.2rem;
  font-weight: 500;
`;
