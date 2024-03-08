import { BackHeader } from "src/components/header/back/backHeader.tsx";

import { useState } from "react";

import * as S from "src/styles/setting/notification";

export const Notification = () => {
  const [isAlarm, setIsAlarm] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAlarm(!isAlarm);
    console.log(isAlarm);
  };

  return (
    <S.Container>
      <BackHeader route="/profile" title={"기본 호칭"} />
      <S.SubContainer>
        <S.NotificationContainer>
          <S.NotificationText>전체 알림 허용</S.NotificationText>
          <S.CustomSwitch checked={isAlarm} onChange={handleChange} />
        </S.NotificationContainer>
      </S.SubContainer>
    </S.Container>
  );
};
