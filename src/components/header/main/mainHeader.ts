import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  width: 100%;
  height: calc(5rem + env(safe-area-inset-top));

  padding-top: constant(safe-area-inset-top); /* iOS 11.0 이전 */
  padding-top: env(safe-area-inset-top);

  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: white;
`;

export const StyledLink = styled(Link)`
  width: 100%;
  height: 100%;
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
  width: 1.965rem;
  height: 1.5rem;
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
  z-index: 1000;
`;

export const TitleText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 900;
`;

export const LeftDiv = styled.div`
  width: 20%;
  height: 100%;
`;
export const CenterDiv = styled.div`
  width: 60%;
  height: 100%;
`;
export const RightDiv = styled.div`
  width: 20%;
  height: 100%;
`;
