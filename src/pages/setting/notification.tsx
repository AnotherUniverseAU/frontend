import { BackHeader } from "src/components/header/back/backHeader.tsx";

import { useEffect, useState } from "react";

import * as S from "src/styles/setting/notification";

export const Notification = () => {
  const [isAlarm, setIsAlarm] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAlarm(!isAlarm);
  };

  useEffect(() => {
    console.log(isAlarm);
  }, [isAlarm]);

  return (
    <S.Container>
      <BackHeader route="/profile" title={"전체 알림"} />
      <S.SubContainer className="container">
        <S.NotificationContainer>
          <S.NotificationText>전체 알림 허용</S.NotificationText>
          <S.CustomSwitch checked={isAlarm} onChange={handleChange} />
        </S.NotificationContainer>
      </S.SubContainer>
    </S.Container>
  );
};
