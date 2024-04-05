import React, { ReactEventHandler } from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import chatData from "src/apis/chatData2.json";
import chatData2 from "src/apis/chatData.json";
import anayChat from "src/apis/anayChat.json";
import tutoChat from "src/apis/firstChat.json";

import { ChatHeader } from "src/components/header/chat/chatHeader.tsx";
import { ChatFooter } from "src/components/footer/chat/chatFooter.tsx";
import * as S from "src/styles/chat/room.ts";
import TutorialContainer from "src/pages/chat/eachInstructionEdit";

import axios from "axios";

import { escapeHtml, decodeHtml } from "src/pages/chat/alterHtml";

import { apiRequestGet, apiRequestPost } from "src/apis/api.ts";
import profileImg from "src/assets/img/CreatorImg.svg"; /// 변경 예정

interface CharacterChat {
  _id: string;
  characterId: string;
  characterName: string;
  content: string[];
  reply?: string[];
  timeToSend: string;
}
const nonResponse = { characterChats: [], userReplies: [] };
const response = {
  characterChats: [
    {
      _id: "65e1c90bc66b2b0ef618daa9",
      characterId: "65c0b542c9a646697bb644aa",
      characterName: "아냐 포저",
      content: [
        "우와 {user name}이다!!",
        "12312413413",
        "alsdkfjas;ldkfja;lsdkjf",
        "https://anotheruniverse.blob.core.windows.net/user-reply-image/18822cf2b4512c2ec%20(1).jpg",
      ],
      reply: ["허허허허허허", "반가워~"],
      timeToSend: "2024-04-01T07:14:15Z",
    },
    {
      _id: "65e1c90bc66b2b0ef618daa9",
      characterId: "65c0b542c9a646697bb644aa",
      characterName: "아냐 포저",
      content: ["근데 아냐 지금 바빠!!", "아으~~~~~", "국밥을 쩝쩝"],
      timeToSend: "2024-04-01T23:14:15Z",
    },
    {
      _id: "65e1c90bc66b2b0ef618daa9",
      characterId: "65c0b542c9a646697bb644aa",
      characterName: "아냐 포저",
      content: ["좀이따 문자할게!"],
      timeToSend: "2024-04-01T03:14:15Z",
    },
    {
      _id: "65e1c90bc66b2b0ef618daa9",
      characterId: "65c0b542c9a646697bb644aa",
      characterName: "아냐 포저",
      content: ["쫌 기다려야돼!!!", "가만히 잘 있으라구~~"],
      timeToSend: "2024-04-03T13:14:15Z",
    },
  ],
  userReplies: [
    {
      userId: "11111111",
      characterId: "65c0b542c9a646697bb644aa",
      userReply: "안녕?",
      replyTime: "2024-04-01T07:14:15Z",
    },
    {
      userId: "11111111",
      characterId: "65c0b542c9a646697bb644aa",
      userReply: "지금 뭐해?",
      replyTime: "2024-04-01T07:14:18Z",
    },
    {
      userId: "11111111",
      characterId: "65c0b542c9a646697bb644aa",
      userReply: "오케이~~!",
      replyTime: "2024-04-01T23:14:16Z",
    },
    {
      userId: "11111111",
      characterId: "65c0b542c9a646697bb644aa",
      userReply: "난 이제 출근한다~~ 아냐는 뭐해??",
      replyTime: "2024-04-02T19:13:11Z",
    },
    {
      userId: "11111111",
      characterId: "65c0b542c9a646697bb644aa",
      userReply: "바이바이~",
      replyTime: "2024-04-03T13:14:15Z",
    },
  ],
};
const firstMessage = {
  characterId: "65c0b542c9a646697bb644aa",
  helloMessage: [
    "우와 이영찬이다!!",
    "근데 아냐 지금 바빠!!",
    "좀이따 문자할게!",
    "쫌 기다려야돼!!!",
  ],
  helloPicture:
    "https://i.namu.wiki/i/aoz8aZCJb_iT23eRsiEP7L6niPF6kI_AUyciLm1N74w7V_SiBVbDtK1gi7NxzVf6QjTDtzEv629IDxNTGrNJoVhD7iNyb0PfPVpwj4IbSXAT_CohU-k4jl0aaEPHDRQtjTM8Aq_oONGzxXE_kN6u6w.webp",
};
interface Response {
  characterChats: CharacterChat[];
  userReplies: UserReply[];
}

interface UserReply {
  userId: string;
  characterId: string;
  userReply: string;
  replyTime: string;
}

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
  showMessageTime: boolean;
}

const CharacterMessage: React.FC<CharacterMessageProps> = ({
  message,
  showProfile,
  characterName,
  showChatTutorial,
  showMessageTime,
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
            <S.Message
              showProfile={showProfile}
              showMessageTime={showMessageTime}
              sentby="character"
            >
              {message.content}
            </S.Message>
          ) : (
            <S.MessageImage
              showProfile
              showMessageTime
              src={message.imageUrl}
              alt="Sent image"
            /> // 이미지 타입 메시지를 위한 JSX
          )}
          {showMessageTime ? (
            <S.Time>{message.time.split(" ")[1]}</S.Time>
          ) : null}
        </S.MessageContent>
      </div>
    </S.CharacterMessageWrapper>
  );
};

interface UserMessageProps {
  message: ChatMessage;
  showMessageTime: boolean;
  showReplyTutorial: boolean;
}

const UserMessage: React.FC<UserMessageProps> = ({
  message,
  showReplyTutorial,
  showMessageTime,
}) => {
  // if (showMessageTime) {
  //   let time = message.time.split(" ")[1];
  //   if (time.substring(0, 1) === "0") {
  //     time = time.substring(1);
  //     const timeMA = "오전 " + time;
  //     console.log(timeMA);
  //   } else {
  //     const timeMA =
  //       Number(time.substring(0, 2)) < 12 ? "오전 " + time : "오후 " + time;
  //     console.log(timeMA);
  //   }
  // }
  return (
    <S.UserMessageWrapper
      sentby="user"
      showProfile={false}
      showReplyTutorial={showReplyTutorial}
    >
      {showMessageTime ? <S.Time>{message.time.split(" ")[1]}</S.Time> : null}
      {message.type === "text" ? (
        <S.Message showMessageTime={showMessageTime} sentby="user">
          {message.content}
        </S.Message>
      ) : (
        <S.MessageImage
          showMessageTime={showMessageTime}
          src={message.imageUrl}
          alt="Sent image"
        /> // 이미지 타입 메시지를 위한 JSX
      )}
    </S.UserMessageWrapper>
  );
};

export const ChatRoom = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [characterName, setCharacterName] = useState<string>("청명");

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const subContainerRef = useRef<HTMLDivElement>(null); // SubContainer에 대한 ref 추가
  const sizeRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);

  const [showChatTutorial, setShowChatTutorial] = useState<boolean>(false);
  const [showReplyTutorial, setShowReplyTutorial] = useState<boolean>(false);

  const [isTuto, setIsTuto] = useState<boolean>(false);
  const [tutorialPosition, setTutorialPosition] = useState([0, 0]);

  // 유저 맨 위 스크롤할 때 로딩창 생기게 하기
  const [loadingChat, setLoadingChat] = useState(false);
  //처음 마운팅될 때 chatTutorial이 보여진 적 없으면 보여줌
  useEffect(() => {
    const chatTutorialShown = localStorage.getItem(`chatTutorialShown`);
    const replyTutorialShown = localStorage.getItem(`replyTutorialShown`);

    // api콜 보내서 가져오기

    const timeStamp = new Date(new Date().getTime()).toISOString();
    // api로 가져온다. 가져왔다 친다
    // const chatHistory = apiRequestGet(`/chatroom/chat-history/${id}/${timeStamp}?offset=0`);
    const chatHistory = response;

    // 어떻게 처음인지 알 수 있을까? => 튜토리얼에서 무조건 하나 이상 입력하게 하기 때문에 있/없으로 판단?
    // 튜토리얼 끝냈지만 처음인 채팅방이라면?
    if (chatHistory.userReplies.length === 0) {
      // 튜토리얼
      // hello api로 가져와 주기
      // const greetMessage = apiRequestGet(`/character/hello/${id}`)
      const greetMessage = firstMessage;
    } else {
      // 일반적인 상태
      const changedChats = changeDataForm(chatHistory);
      setChatMessages(changedChats);
    }

    // apiRequestGet(`hello/${id}`)
  }, []);

  const changeDataForm = (chatHistory: Response) => {
    const chatList: ChatMessage[] = [];
    // 형식 변환해 chatList에 모두 넣기
    // 각 캐릭터 메시지 뭉텅이 마다
    for (let i of chatHistory.characterChats) {
      // 각 내용마다
      for (let j of i.content) {
        if (j.startsWith("https:") && j.endsWith(".jpg")) {
          // 이미지일 때
          const newMessage: ChatMessage = {
            time: i.timeToSend,
            content: "",
            sentby: "character",
            type: "image",
            imageUrl: j,
          };
          chatList.push(newMessage);
        } else {
          // text일 때
          const newMessage: ChatMessage = {
            time: i.timeToSend,
            content: j,
            sentby: "character",
            type: "text",
          };
          chatList.push(newMessage);
        }
      }
      // 답장이 있다면
      if ("reply" in i && i.reply) {
        i.reply.forEach((text) => {
          const afterFiveM = new Date(
            Date.parse(i.timeToSend) + 5 * 60 * 1000
          ).toISOString();

          const newMessage: ChatMessage = {
            time: afterFiveM,
            content: text,
            sentby: "character",
            type: "text",
          };
          chatList.push(newMessage);
        });
      }
    }

    chatHistory.userReplies.forEach((chat) => {
      if (
        chat.userReply.startsWith("https:") &&
        chat.userReply.endsWith(".jpg")
      ) {
        const newMessage: ChatMessage = {
          time: chat.replyTime,
          content: "",
          sentby: "user",
          type: "image",
          imageUrl: chat.userReply,
        };
        chatList.push(newMessage);
      } else {
        const newMessage: ChatMessage = {
          time: chat.replyTime,
          content: chat.userReply,
          sentby: "user",
          type: "text",
        };
        chatList.push(newMessage);
      }
    });

    chatList.sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );

    return chatList;
  };

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
                console.log(current.children[current.children.length - 1]);
                const element = document.querySelector(".empty-div");
                current.scrollTop = current.scrollHeight;
                if (element) {
                  setTutorialPosition([
                    element.getBoundingClientRect().top,
                    left + 10,
                  ]);
                }
                box.style.visibility = "visible";
              }, 100);
            } else {
              setTimeout(() => {
                setTutorialPosition([top + lastChild.clientHeight, left + 10]);
                box.style.visibility = "visible";
              }, 100);
            }
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
            const { top, left, height, width } =
              lastChild.getBoundingClientRect();
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
                    left + width - info.width,
                  ]);
                  box.style.visibility = "visible";
                }
              }, 100);
            } else {
              setTimeout(() => {
                setTutorialPosition([
                  top + lastChild.clientHeight,
                  left + width - info.width,
                ]);
                box.style.visibility = "visible";
              }, 100);
            }
          }
        }
      }
    }
  }, [isTuto, chatMessages]);

  const checkOverScroll = (e: any) => {
    // 로직 고쳐야 함. 처음인지 어떻게 알 수 있을까
    if (isTuto !== true) {
      if (e.target.scrollTop === 0) {
        console.log(chatMessages[0]);

        setLoadingChat(true);
        // 목 데이터 테스트
        // 현재 최상위 offset 기반으로 가져오기
        // offset

        // setTimeout(() => {
        //   const current = subContainerRef.current;
        //   if (current) {
        //     const beforeScrollH = current?.scrollHeight;
        //     const newMessages = chatData2.chat;
        //     console.log(newMessages);
        //     newMessages.map((message) => {
        //       // 백에서 안 줄 때
        //       message.isSent = true;
        //     });
        //     setLoadingChat(false);
        //     const newAddedMessages = newMessages.concat(chatMessages);
        //     console.log(newMessages);
        //     setChatMessages(newAddedMessages as ChatMessage[]);

        //     setTimeout(() => {
        //       const current = subContainerRef.current;
        //       if (current) {
        //         const afterScrollH = current.scrollHeight;
        //         current.scrollTop = afterScrollH - beforeScrollH;
        //       }
        //     }, 10);
        //   }
        // }, 1000);
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
      // 고쳐야 함. 그 전 항목들밖에 안됨
      chatMessages[i].content = decodeHtml(chatMessages[i].content);
      // console.log("after", chatMessages[i].content);
    }
  }, [loadingChat]);

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
    // api 콜 현재 메시지 전송
    // apiRequestPost
    for (let message of chatMessages) {
      console.log(message);
      // apiRequestPost()
    }
    console.log(
      "api로 현재까지 튜토리얼 내용을 DB에 저장하는 코드를 구현하시오."
    );
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
      .substring(0, 16);
    const newMessage: ChatMessage = {
      time: timeInKorea,
      content: message.content,
      sentby: "user",
      type: message.type,
      imageUrl: message.imageUrl,
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
      <S.ChatContent
        isTuto={isTuto}
        ref={subContainerRef}
        onScroll={checkOverScroll}
      >
        {chatMessages.map((message, index) => {
          const [date, time] = message.time.split(" ");
          const showMessageDate = date !== lastDate;
          let showMessageTime = true;

          if (index < chatMessages.length - 1) {
            const nextSentby = chatMessages[index + 1].sentby;
            const [nextDate, nextTime] =
              chatMessages[index + 1].time.split(" ");
            if (message.sentby !== nextSentby) {
              showMessageTime = true;
            } else {
              if (date === nextDate && time === nextTime) {
                showMessageTime = false;
              } else {
                showMessageTime = true;
              }
            }
          }

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
                  showMessageTime={showMessageTime}
                />
              ) : (
                <UserMessage
                  message={message}
                  showMessageTime={showMessageTime}
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
        {(showChatTutorial || showReplyTutorial) && (
          <S.ChatTutorialContainer>
            <S.TutorialBox
              ref={sizeRef}
              $top={tutorialPosition[0]}
              $left={tutorialPosition[1]}
            >
              <TutorialContainer
                text={
                  showChatTutorial
                    ? "캐릭터는 일과 중 짬날 때,\n하루 약 7번 찾아와요"
                    : "이용자 분들의 답변 중,\n캐릭터가 선택한 답변에\n답장을 보내줘요"
                }
              ></TutorialContainer>
              <S.ChatTutorialButton
                onClick={
                  showChatTutorial
                    ? handleChatTutorialClose
                    : handleReplyTutorialClose
                }
              >
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
