// ChatRoom.tsx

import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import chatData from "src/apis/chatData2.json";
import { ChatHeader } from "src/components/header/chat/chatHeader.tsx";
import { ChatFooter } from "src/components/footer/chat/chatFooter.tsx";
import * as S from "src/styles/chat/room.ts";
import TutorialContainer from "src/pages/chat/eachInstructionEdit";

import profileImg from "src/assets/img/CreatorImg.svg"; /// 변경 예정

interface ChatMessage {
  time: string;
  content: string;
  sentby: "user" | "character";
  type: "text" | "image"; // 메시지 타입을 나타내는 필드 추가
  imageUrl?: string; // 이미지 URL을 위한 선택적 필드 추가
}

interface CharacterMessageProps {
  message: ChatMessage;
  showProfile: boolean;
  characterName: string;
  showChatTutorial: boolean;
}

const CharacterMessage: React.FC<CharacterMessageProps> = ({
  message,
  showProfile,
  characterName,
  showChatTutorial,
}) => {
  return (
    <S.CharacterMessageWrapper
      sentby="character"
      showProfile={showProfile}
      showChatTutorial={showChatTutorial}
    >
      {showProfile && (
        <div>
          <S.ProfileImage src={profileImg} alt="Character profile" />
        </div>
      )}
      <div>
        {showProfile && <S.CharacterName>{characterName}</S.CharacterName>}
        <S.MessageContent>
          {message.type === "text" ? (
            <S.Message sentby="character">{message.content}</S.Message>
          ) : (
            <S.MessageImage src={message.imageUrl} alt="Sent image" /> // 이미지 타입 메시지를 위한 JSX
          )}
          <S.Time>{message.time.split(" ")[1]}</S.Time>
        </S.MessageContent>
      </div>
    </S.CharacterMessageWrapper>
  );
};

interface UserMessageProps {
  message: ChatMessage;
  showReplyTutorial: boolean;
}

const UserMessage: React.FC<UserMessageProps> = ({
  message,
  showReplyTutorial,
}) => {
  return (
    <S.UserMessageWrapper
      sentby="user"
      showProfile={false}
      showReplyTutorial={showReplyTutorial}
    >
      <S.Time>{message.time.split(" ")[1]}</S.Time>
      {message.type === "text" ? (
        <S.Message sentby="user">{message.content}</S.Message>
      ) : (
        <S.MessageImage src={message.imageUrl} alt="Sent image" /> // 이미지 타입 메시지를 위한 JSX
      )}
    </S.UserMessageWrapper>
  );
};

export const ChatRoom = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const subContainerRef = useRef<HTMLDivElement>(null); // SubContainer에 대한 ref 추가
  const sizeRef = useRef<HTMLDivElement>(null);
  const [characterName, setCharacterName] = useState<string>("청명");

  const [showChatTutorial, setShowChatTutorial] = useState<boolean>(false);
  const [showReplyTutorial, setShowReplyTutorial] = useState<boolean>(false);

  const [isTuto, setIsTuto] = useState<boolean>(false);

  const [tutorialPosition, setTutorialPosition] = useState([0, 0]);
  //처음 마운팅될 때 chatTutorial이 보여진 적 없으면 보여줌
  useEffect(() => {
    const chatTutorialShown = localStorage.getItem(`chatTutorialShown`);
    const ReplyTutorialShown = localStorage.getItem(`ReplyTutorialShown`);

    if (chatTutorialShown == null) {
      setShowChatTutorial(true);
    }
    if (chatTutorialShown && ReplyTutorialShown == null) {
      setIsTuto(true);
    } else {
      setIsTuto(false);
    }
  }, []);

  useEffect(() => {
    console.log("chatMessages", chatMessages);
  }, [chatMessages]);

  useEffect(() => {
    console.log("showChatTutorial", showChatTutorial);
  }, [showChatTutorial]);

  useEffect(() => {
    console.log("showReplyTutorial", showReplyTutorial);
  }, [showReplyTutorial]);

  const handleChatTutorialClose = () => {
    setShowChatTutorial(false);
    localStorage.setItem(`chatTutorialShown`, "true");
  };

  const handleReplyTutorialClose = () => {
    setShowReplyTutorial(false);
    localStorage.setItem(`replyTutorialShown`, "true");
    setIsTuto(false);
  };

  useEffect(() => {
    setChatMessages(chatData.chat as ChatMessage[]);
  }, []);

  //억지로 제일 아래를 보여주는 로직
  useEffect(() => {
    const current = subContainerRef.current;
    if (current) {
      setTimeout(() => {
        current.scrollTop = current.scrollHeight;
      }, 10);

      const lastChat = chatMessages[chatMessages.length - 1];
      if (lastChat !== undefined) {
        const { top, left } = current.getBoundingClientRect();
        if (lastChat.sentby === "character") {
          const imgDiv = current.lastElementChild?.firstElementChild;
          if (imgDiv) {
            const imgDivWidth = imgDiv?.clientWidth;
            setTutorialPosition([
              current.offsetHeight + top,
              left + +imgDivWidth,
            ]);
          } else {
            setTutorialPosition([current.offsetHeight + top, left]);
          }
        } else {
          const box = sizeRef.current;
          console.log(box);
          if (box) {
            const info = box.getBoundingClientRect();

            setTutorialPosition([
              current.offsetHeight + top,
              current.offsetWidth + left - info.width,
            ]);
          }
        }
      }
    }
  }, [chatMessages]);

  const addChatMessage = (message: {
    type: "text" | "image";
    content: string;
    imageUrl?: string;
  }) => {
    //빈칸이면 안보내지도록
    // if (!message.content.trim()) return;

    const koreaTimeOffset = 9 * 60 * 60 * 1000; // Korea is UTC+9
    const timeInKorea = new Date(new Date().getTime() + koreaTimeOffset)
      .toISOString()
      .replace("T", " ")
      .substr(0, 16);
    const newMessage: ChatMessage = {
      time: timeInKorea,
      content: message.content,
      sentby: "user",
      type: message.type,
      imageUrl: message.imageUrl,
    };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    //replyTutorial가 보여진 적 없으면 답장 튜토리얼 보여줌

    const replyTutorialShown = localStorage.getItem(`replyTutorialShown`);
    if (isTuto) {
      if (replyTutorialShown == null) {
        setShowReplyTutorial(true);
      }
    }
  };

  const renderMessages = ({
    showChatTutorial,
  }: {
    showChatTutorial: boolean;
  }) => {
    let lastDate = "";
    let lastSender = "";

    return (
      <S.ChatContent ref={subContainerRef}>
        {chatMessages.map((message, index) => {
          const [date, time] = message.time.split(" ");
          const showMessageDate = date !== lastDate;
          if (showMessageDate) lastDate = date;

          const formattedDate = new Date(date).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          let showProfile =
            message.sentby === "character" && lastSender !== "character";
          lastSender = message.sentby;

          return (
            <React.Fragment key={index}>
              {showMessageDate && <S.DateLabel>{formattedDate}</S.DateLabel>}
              {message.sentby === "character" ? (
                <CharacterMessage
                  message={message}
                  showProfile={showProfile}
                  characterName={characterName}
                  showChatTutorial={showChatTutorial}
                />
              ) : (
                <UserMessage
                  message={message}
                  showReplyTutorial={showReplyTutorial}
                />
              )}
            </React.Fragment>
          );
        })}
      </S.ChatContent>
    );
  };

  return (
    <S.Container>
      <ChatHeader route="/chatlist" title={characterName} />
      <S.SubContainer>
        {showChatTutorial && (
          <S.ChatTutorialContainer>
            <S.TutorialBox
              ref={sizeRef}
              $top={tutorialPosition[0]}
              $left={tutorialPosition[1]}
            >
              <TutorialContainer text="캐릭터는 일과 중 짬날 때,\n하루 약 7번 찾아와요"></TutorialContainer>
              <S.ChatTutorialButton onClick={handleChatTutorialClose}>
                OK
              </S.ChatTutorialButton>
            </S.TutorialBox>
          </S.ChatTutorialContainer>
        )}
        {showReplyTutorial && (
          <S.ChatTutorialContainer>
            <S.TutorialBox
              ref={sizeRef}
              $top={tutorialPosition[0]}
              $left={tutorialPosition[1]}
            >
              <TutorialContainer text="이용자 분들의 답변 중,\n캐릭터가 선택한 답변에\n답장을 보내줘요"></TutorialContainer>
              <S.ChatTutorialButton onClick={handleReplyTutorialClose}>
                OK
              </S.ChatTutorialButton>
            </S.TutorialBox>
          </S.ChatTutorialContainer>
        )}
        {renderMessages({ showChatTutorial })}
      </S.SubContainer>
      <ChatFooter isTuto={isTuto} setChatMessage={addChatMessage} />
    </S.Container>
  );
};
