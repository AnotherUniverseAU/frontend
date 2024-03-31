import React, { ReactEventHandler } from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import chatData from "src/apis/chatData2.json";
import chatData2 from "src/apis/chatData.json";
import tutoChat from "src/apis/firstChat.json";

import { ChatHeader } from "src/components/header/chat/chatHeader.tsx";
import { ChatFooter } from "src/components/footer/chat/chatFooter.tsx";
import * as S from "src/styles/chat/room.ts";
import TutorialContainer from "src/pages/chat/eachInstructionEdit";

import axios from "axios";

import { escapeHtml, decodeHtml } from "src/pages/chat/alterHtml";

import { apiRequestPost } from "src/apis/api.ts";
import profileImg from "src/assets/img/CreatorImg.svg"; /// 변경 예정

const BASE_URL = process.env.BASE_URL;
const token = localStorage.getItem("accessToken") as string;

interface ChatMessage {
  time: string;
  content: string;
  sentby: "user" | "character";
  type: "text" | "image"; // 메시지 타입을 나타내는 필드 추가
  imageUrl?: string; // 이미지 URL을 위한 선택적 필드 추가
  isSent: boolean; // api 요청이 보내진 메시지인지 확인
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
  const middleRef = useRef<HTMLDivElement>(null);
  const [characterName, setCharacterName] = useState<string>("청명");

  const [showChatTutorial, setShowChatTutorial] = useState<boolean>(false);
  const [showReplyTutorial, setShowReplyTutorial] = useState<boolean>(false);

  const [isTuto, setIsTuto] = useState<boolean>(false);
  const [tutorialPosition, setTutorialPosition] = useState([0, 0]);

  // 유저 맨 위 스크롤할 때 로딩창 생기게 하기
  const [loadingChat, setLoadingChat] = useState(false);
  //처음 마운팅될 때 chatTutorial이 보여진 적 없으면 보여줌
  useEffect(() => {
    const chatTutorialShown = localStorage.getItem(`chatTutorialShown`);
    const ReplyTutorialShown = localStorage.getItem(`ReplyTutorialShown`);

    if (chatTutorialShown === null) {
      setShowChatTutorial(true);
      // url로 캐릭터 id 가져와 해당 캐릭터 text 가져오기
      setChatMessages(tutoChat.anya_day as ChatMessage[]);
      setIsTuto(true);
      setChatMessages(tutoChat.anya_day as ChatMessage[]);
      // const koreaTimeOffset = 9 * 60 * 60 * 1000; // Korea is UTC+9
      // const timeInKorea = new Date(new Date().getTime() + koreaTimeOffset)
      const timeInKorea = new Date(new Date().getTime())
        .toISOString()
        .replace("T", " ")
        .substr(0, 16);
      // 튜토리얼 내용 가져오기 :
      const firstChat = tutoChat.anya_day;
      for (let message of firstChat) {
        message.time = timeInKorea;
      }
      setChatMessages(firstChat as ChatMessage[]);
    } else if (ReplyTutorialShown === null) {
      setIsTuto(true);
      setChatMessages(tutoChat.anya_day as ChatMessage[]);
      // const koreaTimeOffset = 9 * 60 * 60 * 1000; // Korea is UTC+9
      // const timeInKorea = new Date(new Date().getTime() + koreaTimeOffset)
      const timeInKorea = new Date(new Date().getTime())
        .toISOString()
        .replace("T", " ")
        .substr(0, 16);
      // 튜토리얼 내용 가져오기 :
      const firstChat = tutoChat.anya_day;
      for (let message of firstChat) {
        message.time = timeInKorea;
      }
      setChatMessages(firstChat as ChatMessage[]);
    } else {
      if (isTuto !== false) {
        setIsTuto(false);
      }
    }
  }, []);

  useEffect(() => {
    const current = subContainerRef.current;
    // 채팅 유형에 따른 튜토리얼 div position 계산 및 이동
    if (isTuto) {
      if (current) {
        const lastChat = chatMessages[chatMessages.length - 1];
        if (lastChat.sentby === "character") {
          const lastChild = current.lastElementChild?.firstElementChild;
          const box = sizeRef.current;
          const middleBody = middleRef.current;
          if (lastChild && box && middleBody) {
            const { top, left, height } = lastChild.getBoundingClientRect();
            const info = box.getBoundingClientRect();

            if (
              top + height + info.height >
              middleBody.getBoundingClientRect().top + middleBody.offsetHeight
            ) {
              const newDiv = document.createElement("div");
              newDiv.className = "empty-div";
              newDiv.style.minHeight = info.height + "px";
              current.appendChild(newDiv);
              setTimeout(() => {
                const element = document.querySelector(".empty-div");
                current.scrollTop = current.scrollHeight;
                if (element) {
                  setTutorialPosition([
                    element.getBoundingClientRect().top,
                    left + 10,
                  ]);
                }
              }, 0);
            }
            setTutorialPosition([top + lastChild.clientHeight, left + 10]);
          }
        } else {
          const element = document.querySelector(".empty-div");
          if (element) {
            current.removeChild(element);
          }

          const lastChild = current.lastElementChild?.lastElementChild;
          const box = sizeRef.current;
          const middleBody = middleRef.current;
          if (lastChild && box && middleBody) {
            const { top, left, height } = lastChild.getBoundingClientRect();
            const info = box.getBoundingClientRect();
            if (
              top + height + info.height >
              middleBody.getBoundingClientRect().top + middleBody.offsetHeight
            ) {
              const newDiv = document.createElement("div");
              newDiv.style.minHeight = info.height + "px";
              newDiv.className = "empty-div";
              current.appendChild(newDiv);
              setTimeout(() => {
                const element = document.querySelector(".empty-div");
                current.scrollTop = current.scrollHeight;
                if (element) {
                  setTutorialPosition([
                    element.getBoundingClientRect().top,
                    left + 10,
                  ]);
                }
              }, 0);
            } else {
              setTutorialPosition([top + lastChild.clientHeight, left + 10]);
            }
          }
        }
      }
    }
  }, [isTuto, chatMessages]);

  const checkOverScroll = (e: any) => {
    if (isTuto !== true) {
      if (e.target.scrollTop === 0) {
        setLoadingChat(true);
        // 목 데이터 테스트
        setTimeout(() => {
          const newMessages = chatData.chat;
          console.log(newMessages);
          newMessages.map((message) => {
            // 백에서 안 줄 때
            message.isSent = true;
          });
          setLoadingChat(false);
          const newAddedMessages = newMessages.concat(chatMessages);
          console.log(newMessages);
          setChatMessages(newAddedMessages as ChatMessage[]);

          const current = subContainerRef.current;
          if (current) {
            setTimeout(() => {
              current.scrollTop = 110;
            }, 10);
          }
        }, 1000);
        // api 호출
      } else {
        return;
      }
    }
  };

  // 먼저 구현할 것
  useEffect(() => {
    // api 콜 : 마지막 페이지에 있는 내용 가져오기
    // 각 메시지마다 html코드 있다면 해독
    for (let i in chatMessages) {
      // console.log(i);
      // console.log("before", chatMessages[i].content);
      chatMessages[i].content = decodeHtml(chatMessages[i].content);
      // console.log("after", chatMessages[i].content);
    }
  }, [loadingChat]);

  // const apiNewChattingPost = async (path: string, data: any) => {
  //   setLoadingChat(true);
  //   try {
  //     console.log("Data to be posted: ", data);
  //     const response = await axios.post(`${BASE_URL}${path}`, data, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.status >= 200 && response.status < 300) {
  //       console.log(`[POST] Data received from ${path}:`, response.data);
  //       setLoadingChat(false);
  //       return response.data;
  //     } else {
  //       console.error(`[POST] Failed to get data from ${path}:`, response.data);
  //       setLoadingChat(false);
  //     }
  //   } catch (error) {
  //     console.error(`[POST] rror fetching data from ${path}:`, error);
  //     setLoadingChat(false);
  //   }
  // };

  const handleChatTutorialClose = () => {
    setShowChatTutorial(false);
    localStorage.setItem(`chatTutorialShown`, "true");
    const current = subContainerRef.current;
    const element = document.querySelector(".empty-div");
    if (current && element) {
      current.removeChild(element);
    }
  };

  const handleReplyTutorialClose = () => {
    setShowReplyTutorial(false);
    localStorage.setItem(`replyTutorialShown`, "true");
    const current = subContainerRef.current;
    const element = document.querySelector(".empty-div");
    if (current && element) {
      current.removeChild(element);
    }
    setIsTuto(false);
  };

  const addChatMessage = (message: {
    type: "text" | "image";
    content: string;
    imageUrl?: string;
    isSent: boolean;
  }) => {
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
      isSent: false,
    };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);

    //새로운 채팅 입력시 제일 아래를 보여주는 로직
    const current = subContainerRef.current;
    if (current) {
      setTimeout(() => {
        current.scrollTop = current.scrollHeight;
      }, 10);
    }

    // api로 새 메시지 전송
    newMessage.content = escapeHtml(newMessage.content);
    newMessage.isSent = true;
    // const data = apiRequestPost("/zzz", newMessage);

    //replyTutorial가 보여진 적 없으면 답장 튜토리얼 보여줌
    if (isTuto) {
      const replyTutorialShown = localStorage.getItem(`replyTutorialShown`);
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
      <S.ChatContent ref={subContainerRef} onScroll={checkOverScroll}>
        {loadingChat && <div>로딩중~~</div>}

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
      <S.SubContainer ref={middleRef}>
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
