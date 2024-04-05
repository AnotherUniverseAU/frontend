import * as S from "./chatHeader.ts";
import React, { FC, useEffect, useState } from "react";
import backArrow from "src/components/header/back/backArrow.png";
import chatSetting from "src/components/header/chat/chatSettingImg.svg";
import { useNavigate } from "react-router-dom";
import { apiRequestGet } from "src/apis/apiRequestGet.ts";

interface FooterProps {
  route: string;
  title: string;
  characterId?: string;
}

export const ChatHeader: FC<FooterProps> = ({ route, title, characterId }) => {
  const [showSetting, setShowSetting] = useState(false);
  const [isAlarm, setIsAlarm] = useState<boolean>(true);
  const [nickname, setNickname] = useState(String);

  const navigate = useNavigate();

  const handleShowSetting = () => {
    setShowSetting(!showSetting);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAlarm(!isAlarm);
  };

  const handleEachNicknameEdit = () => {
    navigate("/eachNicknameEdit", {
      state: {
        nickname: nickname,
        characterId: characterId,
        characterName: title,
      },
    });
  };

  useEffect(() => {
    // const nicknameRes = apiRequestGet('/user/nickname').nickname;
    const nicknameRes = "베이지색바다표범";
    setNickname(nicknameRes);
  }, []);

  useEffect(() => {
    console.log(isAlarm);
  }, [isAlarm]);

  return (
    <S.HeaderContainer>
      <S.StyledLink to={route}>
        <S.StyledLinkArrow src={backArrow} alt="back arrow" />
      </S.StyledLink>
      <S.TitleContainer>{title}</S.TitleContainer>
      <S.ChatSettingButton>
        <S.ChatSettingImg
          src={chatSetting}
          alt="chat setting"
          onClick={handleShowSetting}
        />
        <S.ChatSettingWrapper>
          {showSetting && (
            <S.ChatSettingBox>
              <S.AlarmSettingWrapper>
                <S.AlarmSettingText>알람설정</S.AlarmSettingText>
                <S.SwitchWrapper>
                  <S.CustomSwitch checked={isAlarm} onChange={handleChange} />
                </S.SwitchWrapper>
              </S.AlarmSettingWrapper>
              <S.NicknameEditWrapper onClick={handleEachNicknameEdit}>
                <S.NicknameEditText>닉네임 변경</S.NicknameEditText>
              </S.NicknameEditWrapper>
            </S.ChatSettingBox>
          )}
        </S.ChatSettingWrapper>
      </S.ChatSettingButton>
    </S.HeaderContainer>
  );
};
