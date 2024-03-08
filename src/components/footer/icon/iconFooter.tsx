import React from "react";
import * as S from "./iconFooter.ts";

interface IconFooterProps {
  activepage: string;
}

export const IconFooter = ({ activepage }: IconFooterProps) => {
  return (
    <S.Container>
      <S.IconContainer to="/">
        <S.StyledHomeIcon activepage={activepage} />
      </S.IconContainer>
      <S.IconContainer to="/chatlist">
        <S.StyledChatIcon activepage={activepage} />
      </S.IconContainer>
      <S.IconContainer to="/profile">
        <S.StyledSettingIcon activepage={activepage} />
      </S.IconContainer>
    </S.Container>
  );
};
