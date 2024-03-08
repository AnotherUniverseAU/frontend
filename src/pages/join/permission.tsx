import { useState } from "react";
import * as S from "src/styles/join/permission.ts";

import { TextFooter } from "src/components/footer/text/textFooter.tsx";
import purpleCheck from "src/assets/img/purpleCheck.png";
import grayCheck from "src/assets/img/grayCheck.png";

export const Permission = () => {
  const [checks, setChecks] = useState<{ [key: string]: boolean }>({
    chat: true,
    photo: true,
    camera: true,
    marketing: true,
  });

  const toggleCheck = (name: string) => {
    setChecks((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const names: { [key: string]: string } = {
    chat: "채팅 알림",
    photo: "사진",
    camera: "카메라",
    marketing: "마케팅 정보 수신 동의",
  };

  return (
    <S.Container>
      <S.SubContainer>
        <S.Title>앱 접근 권한 안내</S.Title>
        <S.SubTitle>앱 사용을 위해 아래의 권한을 허용해주세요.</S.SubTitle>
        <S.ListContainer>
          {Object.entries(checks).map(([name, isChecked]) => (
            <S.EachListContainer onClick={() => toggleCheck(name)} key={name}>
              <S.ListText>{names[name]}</S.ListText>
              <S.CheckImg
                src={isChecked ? purpleCheck : grayCheck}
                alt="check"
              />
            </S.EachListContainer>
          ))}
        </S.ListContainer>
        <S.BottomInfoWrapper>
          <S.BottomInfo>
            선택적 접근 권한의 경우 허용에 동의하지 않으셔도{" "}
          </S.BottomInfo>
          <S.BottomInfo>앱 사용이 가능합니다.</S.BottomInfo>
        </S.BottomInfoWrapper>
      </S.SubContainer>
      <TextFooter route="/nickname" text="확인" />
    </S.Container>
  );
};
