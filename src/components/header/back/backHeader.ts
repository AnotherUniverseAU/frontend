import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  width: 100%;
  height: calc(5rem + env(safe-area-inset-top));
  border-bottom: 0.1rem solid #e5e5e5;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: white;
  padding-top: env(safe-area-inset-top);
`;

export const StyledLink = styled(Link)`
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const StyledBackDiv = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const StyledLinkArrow = styled.img`
  width: 1rem;
  height: 1.5rem;
`;

export const TitleContainer = styled.div`
  color: black;
  font-size: 1.2rem;
  font-weight: 700;
  flex-grow: 1;
  text-align: center;
`;

export const LeftDiv = styled.div`
  width: 15%;
  height: 100%;
`;
export const RightDiv = styled.div`
  width: 15%;
  height: 100%;
`;
