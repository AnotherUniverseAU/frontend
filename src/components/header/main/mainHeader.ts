import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  width: 100vw;
  height: 5rem;
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: white;
`;

export const StyledLink = styled(Link)`
  width: 20vw;
  height: 5rem;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CreateContainer = styled.div`
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  z-index: 99;
`;

export const ImgLogo = styled.img`
  width: 2rem;
  height: 2rem;
`;

export const TextLogo = styled.img`
  width: auto;
`;

export const CreateImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export const CircleImg = styled.img`
  width: 6rem;
  height: 3rem;
  position: absolute;
  top: -0.75rem;
  right: -0.8rem;
  z-index: 99;
`;

export const TitleText = styled.div`
  width: 60vw;
  height: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 900;
`;
