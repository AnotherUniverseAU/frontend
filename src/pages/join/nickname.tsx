import { useState } from "react";
import axios from "axios";

import * as S from "src/styles/join/nickname.ts";

import { BackHeader } from "src/components/header/back/backHeader.tsx";
import { TextFooter } from "src/components/footer/text/textFooter.tsx";
import { StyledInput } from "src/components/styledInput/styledInput.tsx";

export const Nickname = () => {
  const [nickname, setNickname] = useState("");

  const updateNickname = async (nickname: string) => {
    const token = localStorage.getItem("accessToken"); // replace with your Bearer token

    const BASE_URL =
      "https://anotheruniverse-backend.delightfuldune-c082bcd0.koreacentral.azurecontainerapps.io";

    try {
      const response = await axios.post(
        `${BASE_URL}/user/nickname`,
        { nickname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Nickname updated successfully:", response.data);
      } else {
        console.log("Failed to update nickname:", response.data);
      }
    } catch (error) {
      console.error("Error updating nickname:", error);
    }
  };

  return (
    <S.Container>
      <BackHeader route="/permission" title="프로필 설정" />
      <S.InfoContainer>
        <S.Info>캐릭터가 나를 부를 때 사용할</S.Info>
        <S.Info>기본 호칭을 입력해주세요</S.Info>
        <StyledInput
          placeholder="호칭을 입력해주세요"
          content={nickname}
          setContent={setNickname}
          limit={20}
          height="3.8rem"
          marginTop="2rem"
        />
      </S.InfoContainer>
      <TextFooter
        route="/"
        text="수정완료"
        onClick={() => updateNickname(nickname)}
      />
    </S.Container>
  );
};
