import * as S from "src/styles/setting/nicknameEdit";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BackHeader } from "src/components/header/back/backHeader.tsx";
import { TextFooter } from "src/components/footer/text/textFooter.tsx";

import { StyledInput } from "src/components/styledInput/styledInput.tsx";

import { apiRequestGet } from "src/apis/apiRequestGet";
import { apiRequestPost } from "src/apis/apiRequestPost";

export const EachNicknameEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { characterName } = location.state;

  const [nicknameEdit, setNicknameEdit] = useState("");

  useEffect(() => {
    const getNickname = async function () {
      const res = await apiRequestGet("/user/nickname");
      console.log(res);
      //   console.log(res.nickname);
      //   setNicknameEdit(res.nickname);
    };
    getNickname();
  }, []);

  const nicknameEditRequest = async () => {
    if (nicknameEdit !== "") {
      await apiRequestPost("/user/nickname", { nickname: nicknameEdit });
      navigate(-1);
    }
  };

  return (
    <S.Container>
      <BackHeader route="/profile" title="기본 호칭" />
      <S.InfoContainer>
        <S.Info>{characterName}이/가 나를 부를 때 사용할</S.Info>
        <S.Info>호칭을 설정해주세요</S.Info>
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
