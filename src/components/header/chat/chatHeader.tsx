import * as S from "./chatHeader.ts";
import React, { FC, useEffect, useState } from "react";
import backArrow from "src/components/header/back/backArrow.png";
import chatSetting from "src/components/header/chat/chatSettingImg.svg";
import { useNavigate } from "react-router-dom";
import { apiRequestGet } from "src/apis/apiRequestGet.ts";
import { apiRequestPost } from "src/apis/apiRequestPost.ts";

interface FooterProps {
  route: string;
  title: string;
  characterId?: string;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export const ChatHeader: FC<FooterProps> = ({
  setIsModalOpen,
  isModalOpen,
  route,
  title,
  characterId,
}) => {
  const [showSetting, setShowSetting] = useState(false);
  // const [isAlarm, setIsAlarm] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleShowSetting = () => {
    setShowSetting(!showSetting);
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setIsAlarm(!isAlarm);
  // };

  const handleEachNicknameEdit = () => {
    navigate("/eachNicknameEdit", {
      state: {
        characterId: characterId,
        characterName: title,
      },
    });
  };
  const handleRoomOut = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (showSetting === true) {
      const handleClick = (evt: Event) => {
        // if (showSetting === true) {
        const { target } = evt;
        if (target instanceof HTMLElement) {
          const classList = target.classList; // DOMTokenList
          if (classList.contains("setting-modal")) {
          } else {
            setShowSetting(false);
          }
        }
      };
      setTimeout(() => {
        document.addEventListener("click", handleClick);
      }, 0);

      return () => {
        document.removeEventListener("click", handleClick);
      };
    }
  }, [showSetting]);
  // useEffect(() => {
  //   console.log(isAlarm);
  // }, [isAlarm]);

  return (
    <S.HeaderContainer className="header">
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
            <S.ChatSettingBox className="setting-modal">
              {/* <S.AlarmSettingWrapper>
                <S.AlarmSettingText>알람설정</S.AlarmSettingText>
                <S.SwitchWrapper>
                  <S.CustomSwitch checked={isAlarm} onChange={handleChange} />
                </S.SwitchWrapper>
              </S.AlarmSettingWrapper> */}
              <S.NicknameEditWrapper
                className="setting-modal"
                onClick={handleEachNicknameEdit}
              >
                <S.NicknameEditText className="setting-modal">
                  닉네임 변경
                </S.NicknameEditText>
              </S.NicknameEditWrapper>
              <S.NicknameEditWrapper
                className="setting-modal"
                onClick={handleRoomOut}
              >
                <S.NicknameEditText className="setting-modal">
                  채팅방 나가기
                </S.NicknameEditText>
              </S.NicknameEditWrapper>
            </S.ChatSettingBox>
          )}
        </S.ChatSettingWrapper>
      </S.ChatSettingButton>
    </S.HeaderContainer>
  );
};
