import * as S from "src/styles/setting/nicknameEdit";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BackHeader } from "src/components/header/back/backHeader.tsx";
import { TextFooter } from "src/components/footer/text/textFooter.tsx";

import { StyledInput } from "src/components/styledInput/styledInput.tsx";

import { apiRequestPost } from "src/apis/api.ts";

export const NicknameEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const nickname = location.state.nickname;

  const [nicknameEdit, setNicknameEdit] = useState(nickname);

  const nicknameEditRequest = async () => {
    await apiRequestPost("/user/nickname", { nickname: nicknameEdit });
    navigate("/profile");
  };

  return (
    <S.Container>
      <BackHeader route="/profile" title="기본 호칭" />
      <S.InfoContainer>
        <S.Info>캐릭터가 나를 부를 때 사용할</S.Info>
        <S.Info>기본 호칭을 설정해주세요</S.Info>
        <StyledInput
          placeholder="호칭을 입력해주세요"
          content={nicknameEdit}
          setContent={setNicknameEdit}
          limit={20}
          height="3.8rem"
          marginTop="2rem"
        />
      </S.InfoContainer>
      <TextFooter
        route="/profile"
        text="수정 완료"
        onClick={nicknameEditRequest}
      />
    </S.Container>
  );
};
