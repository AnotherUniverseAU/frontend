import React, { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./textFooter.ts";

interface FooterProps {
  route: string;
  text: string;
  onClick?: () => void;
}

export const TextFooter: FC<FooterProps> = ({ route, text, onClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`${route}`, { state: { from: location.pathname } });
    }
  };

  return (
    <S.StyledLink className="footer" onClick={handleClick}>
      <S.StyledLinkText>{text}</S.StyledLinkText>
    </S.StyledLink>
  );
};
