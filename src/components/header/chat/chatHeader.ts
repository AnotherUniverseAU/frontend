import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  width: 100vw;
  height: 5rem;
  border-bottom: 0.1rem solid #e5e5e5;
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: white;
`;

export const StyledLink = styled(Link)`
  width: 15vw;
  height: 5rem;
  position: absolute;
  top: 0rem;
  left: 0rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const StyledLinkArrow = styled.img`
  width: 1rem;
  height: 1.5rem;
  /* position: absolute;
  top: 1.7rem;
  left: 1rem; */
`;

export const TitleContainer = styled.div`
  color: black;
  font-size: 1.2rem;
  font-weight: 700;
`;
