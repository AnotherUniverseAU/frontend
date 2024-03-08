import React, { useState } from "react";
import * as S from "./policyToggle.ts";
import Checked from "./Checked.png";
import NotChecked from "./NotChecked.png";

interface PolicyToggleProps {
  policy: boolean;
  setPolicy: (policy: boolean) => void;
}

export const PolicyToggle: React.FC<PolicyToggleProps> = ({
  policy,
  setPolicy,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCheck = () => {
    setPolicy(!policy);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <S.Container>
      <S.CheckContainer>
        <S.CheckboxImage
          src={policy ? Checked : NotChecked}
          onClick={toggleCheck}
        />
        <S.Text>
          개인정보 수집, 이용 동의<S.RedText>*</S.RedText>
        </S.Text>
        <S.Arrow open={isOpen} onClick={toggleOpen}>
          ▼
        </S.Arrow>
      </S.CheckContainer>
      <S.Policy open={isOpen}>
        여기에 개인정보처리방침 내용을 넣으세요.
      </S.Policy>
    </S.Container>
  );
};
