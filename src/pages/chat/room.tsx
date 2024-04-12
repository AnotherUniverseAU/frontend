import React, { ReactEventHandler } from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ChatHeader } from "src/components/header/chat/chatHeader.tsx";
import { ChatFooter } from "src/components/footer/chat/chatFooter.tsx";
import * as S from "src/styles/chat/room.ts";
import TutorialContainer from "src/pages/chat/eachInstructionEdit";

import { escapeHtml, decodeHtml } from "src/pages/chat/alterHtml";

import { apiRequestGet } from "src/apis/apiRequestGet";
import { apiRequestPost } from "src/apis/apiRequestPost";

import { getNewToken } from "../../apis/getNewToken";
import { set } from "lodash";

interface CharacterChat {
  _id: string;
  characterId: string;
  characterName: string;
  content: string[];
  reply?: string[];
  timeToSend: string;
}
const characterInfo = {
  character: {
    characterId: "65c0b542c9a646697bb644aa",
    name: "이영찬",
    profilePicUrl:
      "https://anotheruniverse.blob.core.windows.net/user-reply-image/18822cf2b4512c2ec (1).jpg",
  },
};

const nonResponse = { characterChats: [], userReplies: [] };
const response1 = {
  characterChats: [
    {
      _id: "65e1c90bc66b2b0ef618daa9",
      characterId: "65c0b542c9a646697bb644aa",
      characterName: "아냐 포저",
      content: [
        "우와 {user name}이다!!zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
        "12312413413ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ",
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
      reply: ["뭐해??", "진짜 갔어??"],
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
    // {
    //   userId: "11111111",
    //   characterId: "65c0b542c9a646697bb644aa",
    //   userReply: "안녕?",
    //   replyTime: "2024-04-01T07:14:15Z",
    // },
    // {
    //   userId: "11111111",
    //   characterId: "65c0b542c9a646697bb644aa",
    //   userReply: "지금 뭐해?",
    //   replyTime: "2024-04-01T07:14:18Z",
    // },
    // {
    //   userId: "11111111",
    //   characterId: "65c0b542c9a646697bb644aa",
    //   userReply: "오케이~~!",
    //   replyTime: "2024-04-01T23:14:16Z",
    // },
    // {
    //   userId: "11111111",
    //   characterId: "65c0b542c9a646697bb644aa",
    //   userReply: "난 이제 출근한다~~ 아냐는 뭐해??",
    //   replyTime: "2024-04-02T19:13:11Z",
    // },
    // {
    //   userId: "11111111",
    //   characterId: "65c0b542c9a646697bb644aa",
    //   userReply: "바이바이~",
    //   replyTime: "2024-04-03T13:14:15Z",
    // },
  ],
};
const firstMessage = {
  characterId: "65c0b542c9a646697bb644aa",
  helloMessage: [
    "우와 이영찬이다!!",
    "근데 아냐 지금 바빠!!",
    "좀이따 문자할게!",
    "쫌 기다려야돼!!!",
    "ㅎㅎㅎㅎㅎ",
    "ㅎㅎㅎㅎㅎ",
  ],
  helloPicture:
    "https://anotheruniverse.blob.core.windows.net/user-reply-image/18822cf2b4512c2ec (1).jpg",
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
  profileImageUrl: string;
}

const CharacterMessage: React.FC<CharacterMessageProps> = ({
  message,
  showProfile,
  characterName,
  showChatTutorial,
  showMessageTime,
  profileImageUrl,
}) => {
  return (
    <S.CharacterMessageWrapper
      sentby="character"
      showProfile={showProfile}
      showChatTutorial={showChatTutorial}
    >
      {showProfile && (
        <div>
          <S.ProfileImage src={profileImageUrl} alt="Character profile" />
        </div>
      )}
      <S.MessageDiv showProfile={showProfile}>
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
      </S.MessageDiv>
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

  //   } else {
  //     const timeMA =
  //       Number(time.substring(0, 2)) < 12 ? "오전 " + time : "오후 " + time;

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
  const navigate = useNavigate();
  const [characterName, setCharacterName] = useState<string>("");
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [nextHistory, setNextHistory] = useState<ChatMessage[]>([]);

  const subContainerRef = useRef<HTMLDivElement>(null); // SubContainer에 대한 ref 추가
  const sizeRef = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);

  const [showChatTutorial, setShowChatTutorial] = useState<boolean>(false);
  const [showReplyTutorial, setShowReplyTutorial] = useState<boolean>(false);

  const [isTuto, setIsTuto] = useState<boolean>(false);
  const [tutorialPosition, setTutorialPosition] = useState([0, 0]);
  const [apiOffeset, setApiOffset] = useState(0);
  const [isLastChat, setIsLastChat] = useState<boolean>(false);

  const [isScrollTrigger, setIsScrollTrigger] = useState(true);

  const [helloMessages, setHelloMessages] = useState<ChatMessage[]>([]);
  const [isHelloShown, setIsHelloShown] = useState<boolean>(false);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [firstChat, setFirstChat] = useState<ChatMessage[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [firstTime, setFirstTime] = useState(String);

  // 유저 맨 위 스크롤할 때 로딩창 생기게 하기
  //처음 마운팅될 때 chatTutorial이 보여진 적 없으면 보여줌
  useEffect(() => {
    // 캐릭터 정보 api콜 보내서 가져오기
    const getCharInfo = async function () {
      const res = await apiRequestGet(`character/info/${id}`);
      // const res = characterInfo;

      setCharacterName(res.character.name);
      setProfileImageUrl(res.character.profilePicUrl);
    };
    getCharInfo();

    const chatTutorialShown = localStorage.getItem(`chatTutorialShown`);
    const replyTutorialShown = localStorage.getItem(`replyTutorialShown`);
    if (chatTutorialShown && replyTutorialShown) {
      setIsTuto(false);
    } else {
      setIsTuto(true);
    }
    getHello();
    const timeStamp = new Date(new Date().getTime()).toISOString();
    setFirstTime(timeStamp);
    // api로 가져온다. 가져왔다 친다
    // const chatHistory = apiRequestGet(`/chatroom/chat-history/${id}/${timeStamp}?offset=0`);
    // const chatHistory = response1;
    const chatHistory = nonResponse;

    const firstChats = changeDataForm(chatHistory);
    setFirstChat(firstChats);

    // 일단 후순위
    // const apiCallingTimer = setInterval(() => {
    //   const timeStamp = new Date(new Date().getTime()).toISOString();
    //   // const chatHistory = apiRequestGet(`/chatroom/chat-history/${id}/${timeStamp}?offset=0`);
    // }, 1000 * 60 * 3)

    // return () => {
    //   clearInterval(apiCallingTimer);
    // };
  }, []);

  // hello 가져오기
  const getHello = async () => {
    // const helloRes = await apiRequestGet(`/character/hello/${id}`);
    const helloRes = firstMessage;
    const contentList = [...helloRes.helloMessage, helloRes.helloPicture];
    const helloList: React.SetStateAction<ChatMessage[]> = [];
    const koreaTimeOffset = 9 * 60 * 60 * 1000;
    contentList.forEach((message) => {
      if (message.startsWith("https:")) {
        helloList.push({
          // 시간은 챗룸 생성 시간
          time: new Date(Date.parse("2024-03-27T07:14:15Z") + koreaTimeOffset)
            .toISOString()
            .replace("T", " ")
            .substring(0, 16),
          content: "",
          sentby: "character",
          type: "image",
          imageUrl: message,
        });
      } else {
        helloList.push({
          // 시간은 챗룸 생성 시간
          time: new Date(Date.parse("2024-03-27T07:14:15Z") + koreaTimeOffset)
            .toISOString()
            .replace("T", " ")
            .substring(0, 16),
          content: message,
          sentby: "character",
          type: "text",
        });
      }
    });
    setHelloMessages(helloList);
  };
  // helloMessage 받아올 때 튜토리얼인지 확인, 튜토리얼이라면 받아온 데이터로 chatMessage 수정
  useEffect(() => {
    if (isTuto) {
      const chatTutorialShown = localStorage.getItem(`chatTutorialShown`);
      const replyTutorialShown = localStorage.getItem(`replyTutorialShown`);
      if (!chatTutorialShown) {
        setShowChatTutorial(true);
        setChatMessages([helloMessages[0]]);
      } else if (!replyTutorialShown) {
        setChatMessages([...helloMessages, ...firstChat]);
        setIsHelloShown(true);
      }
    } else {
      // 튜토리얼이 아니라면 처음 가져온 메시지 보여주기
      // 챗 히스토리가 있으면
      if (firstChat.length > 0) {
        setChatMessages([...firstChat]);
        // 챗 히스토리가 비어있으면 hello 보여주기
      } else {
        setChatMessages([...helloMessages]);
        setIsHelloShown(true);
      }
    }
  }, [helloMessages]);

  // DB -> front형식으로 dataform 바꿔주기
  const changeDataForm = (chatHistory: Response) => {
    const chatList: ChatMessage[] = [];
    const koreaTimeOffset = 9 * 60 * 60 * 1000; // Korea is UTC+

    // 형식 변환해 chatList에 모두 넣기
    // 각 캐릭터 메시지 뭉텅이 마다
    for (let i of chatHistory.characterChats) {
      // 각 내용마다
      for (let j of i.content) {
        if (j.startsWith("https:")) {
          // 이미지일 때
          const newMessage: ChatMessage = {
            time: new Date(Date.parse(i.timeToSend) + koreaTimeOffset)
              .toISOString()
              .replace("T", " ")
              .substring(0, 16),
            content: "",
            sentby: "character",
            type: "image",
            imageUrl: j,
          };
          chatList.push(newMessage);
        } else {
          // text일 때
          const newMessage: ChatMessage = {
            time: new Date(Date.parse(i.timeToSend) + koreaTimeOffset)
              .toISOString()
              .replace("T", " ")
              .substring(0, 16),
            content: j,
            sentby: "character",
            type: "text",
          };
          chatList.push(newMessage);
        }
      }
      // 답장이 있다면 : 5분 추가해 다 넣어주자
      if ("reply" in i && i.reply) {
        i.reply.forEach((text) => {
          const afterFiveM = new Date(
            Date.parse(i.timeToSend) + 5 * 60 * 1000 + koreaTimeOffset
          )
            .toISOString()
            .replace("T", " ")
            .substring(0, 16);
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
    // 유저 답장마다 형식 바꿔서 넣어주기
    chatHistory.userReplies.forEach((chat) => {
      if (chat.userReply.startsWith("https:")) {
        const newMessage: ChatMessage = {
          time: new Date(Date.parse(chat.replyTime) + koreaTimeOffset)
            .toISOString()
            .replace("T", " ")
            .substring(0, 16),
          content: "",
          sentby: "user",
          type: "image",
          imageUrl: chat.userReply,
        };
        chatList.push(newMessage);
      } else {
        const newMessage: ChatMessage = {
          time: new Date(Date.parse(chat.replyTime) + koreaTimeOffset)
            .toISOString()
            .replace("T", " ")
            .substring(0, 16),
          content: chat.userReply,
          sentby: "user",
          type: "text",
        };
        chatList.push(newMessage);
      }
    });

    // 캐릭터 대사, 답장, 유저 답장 순으로 만들어진 리스트 시간순 정렬
    chatList.sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );

    return chatList;
  };

  useEffect(() => {
    const current = subContainerRef.current;
    // 채팅 유형에 따른 튜토리얼 div position 계산 및 이동
    // 현재 채팅이 하나라도 있고, 튜토리얼이라면
    if (chatMessages.length > 0) {
      if (isTuto) {
        if (current) {
          const lastChat = chatMessages[chatMessages.length - 1];
          // 마지막 채팅이 캐릭터일 때
          if (lastChat.sentby === "character") {
            const lastChild = current.lastElementChild;
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
                  box.style.visibility = "visible";
                }, 100);
              } else {
                setTimeout(() => {
                  setTutorialPosition([
                    top + lastChild.clientHeight,
                    left + 10,
                  ]);
                  box.style.visibility = "visible";
                }, 100);
              }
            }
            // 마지막 채팅이 유저일 때
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
        // 튜토리얼 아닌데 chatMessages 변경될 때 : 최초 챗룸 들어왔을 때 한 번만 맨 아래 보여주는 로직
      } else {
        if (isFirst) {
          setTimeout(() => {
            const current = subContainerRef.current;
            if (current) {
              current.scrollTop = current.scrollHeight;
            }
          }, 100);

          setIsFirst(false);
        }
      }
    }
  }, [chatMessages]);

  const checkOverScroll = (e: any) => {
    // 스크롤인데
    // 튜토리얼이 아니고
    if (isTuto !== true) {
      const current = subContainerRef.current;
      if (current) {
        // 제일 상단이 아니고, 스크롤 트리거가 켜져있고, 마지막 채팅이 아니라면 api로 다음 데이터를 가져옴
        if (
          e.target.scrollTop > 0 &&
          isScrollTrigger === true &&
          isLastChat === false
        ) {
          // 아래 주석으로 교체할 것.
          const nextChat = nonResponse;
          setIsScrollTrigger(false);
          setApiOffset((offSet) => offSet + 1);
          // apiRequestGet(
          //   `/chatroom/chat-history/${id}/${firstTime}?offset=${apiOffeset + 1}`
          // ).then((response) => {
          //   setIsScrollTrigger(false);
          //   setApiOffset((current) => current + 1);
          //   setNextHistory(changeDataForm(response));
          // });

          // 다음 데이터가 비어있을 시(현재까지가 마지막 채팅)
          if (
            nextChat.characterChats.length === 0 &&
            nextChat.userReplies.length === 0
          ) {
            // 마지막채팅state -> true, 스크롤 트리거 막음, 다음 채팅 -> hello
            setIsLastChat(true);
            setIsScrollTrigger(false);

            setNextHistory(helloMessages);
          } else {
            // 다음 데이터가 안 비어있다면 그대로 다음 채팅 state에 넣어줌
            setNextHistory(changeDataForm(nextChat));
          }
          // 만약 스크롤이 맨 위고 스크롤 트리거가 막혀있고
        } else if (e.target.scrollTop === 0 && isScrollTrigger === false) {
          // 마지막 채팅일 경우
          if (isLastChat) {
            // 헬로우 메시지가 보여진 적 없다면 : 챗메시지앞에 다음 채팅 넣어주고 스크롤 현재로 유지, 트리거 끈 상태로 유지
            if (!isHelloShown) {
              const beforeScrollH = current?.scrollHeight;

              setChatMessages([...helloMessages, ...chatMessages]);
              setIsHelloShown(true);

              setTimeout(() => {
                const current = subContainerRef.current;
                if (current) {
                  const afterScrollH = current.scrollHeight;
                  current.scrollTop = afterScrollH - beforeScrollH;
                }
              }, 10);
            }
            // 마지막 채팅 아님 : 챗메시지앞에 다음 채팅 넣어주고 스크롤 현재로 유지, 트리거 켜줌
          } else {
            const beforeScrollH = current?.scrollHeight;
            setChatMessages([...nextHistory, ...chatMessages]);
            setIsScrollTrigger(true);
            setTimeout(() => {
              const current = subContainerRef.current;
              if (current) {
                const afterScrollH = current.scrollHeight;
                current.scrollTop = afterScrollH - beforeScrollH;
              }
            }, 10);
          }
        }
      }
    }
  };
  // 챗 튜토리얼 끌 때
  const handleChatTutorialClose = () => {
    setShowChatTutorial(false);
    localStorage.setItem(`chatTutorialShown`, "true");
    setChatMessages([...helloMessages, ...firstChat]);
    const current = subContainerRef.current;
    // div 조정하면서 넣었던 empty-div 삭제해주기
    if (current) {
      const element = document.querySelector(".empty-div");
      if (element) current.removeChild(element);
    }
    // 튜토리얼 끝난 뒤 생긴 채팅 리스트가 있을테니 스크롤 맨 아래로 내려줌
    setTimeout(() => {
      const current = subContainerRef.current;
      if (current) {
        current.scrollTop = current.scrollHeight;
      }
    }, 300);
  };
  // 답장 튜토리얼 끌 때
  const handleReplyTutorialClose = () => {
    setShowReplyTutorial(false);
    localStorage.setItem(`replyTutorialShown`, "true");
    const current = subContainerRef.current;
    const element = document.querySelector(".empty-div");
    // div 조정하면서 넣었던 empty-div 삭제해주기
    if (current && element) {
      current.removeChild(element);
    }
    // 튜토리얼 종료
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
    const data = { characterId: id, userReply: escapeHtml(message.content) };
    apiRequestPost(`chatroom/user-reply/${id}`, data);

    //replyTutorial가 보여진 적 없으면 답장 튜토리얼 보여줌
    if (isTuto) {
      const replyTutorialShown = localStorage.getItem(`replyTutorialShown`);
      if (replyTutorialShown === null) {
        setShowReplyTutorial(true);
      }
    }
  };

  const onRoomOut = () => {
    // 채팅방 나가는 api콜 날리기
    setIsModalOpen(false);
    const res: any = apiRequestPost("/subscription/unsubscribe", {
      characterId: id,
    }).then((response) => {
      if (response) {
        navigate("/chatlist");
      } else {
        alert("나가는데 실패했습니다");
      }
    });
  };

  const renderMessages = ({
    showChatTutorial,
  }: {
    showChatTutorial: boolean;
  }) => {
    let lastDate = "";
    let lastTime = "";
    let lastSender = "";

    return (
      <S.ChatContent
        showTutorial={showChatTutorial || showReplyTutorial}
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

          const formattedDate = new Date(date).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          let showProfile =
            (message.sentby === "character" && lastSender !== "character") ||
            lastTime !== time ||
            lastDate !== date;

          lastSender = message.sentby;

          if (lastTime !== time) lastTime = time;
          if (showMessageDate) lastDate = date;

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
                  profileImageUrl={profileImageUrl}
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
      {isModalOpen && (
        <S.StyledModal open={isModalOpen}>
          <S.ModalContainer>
            <S.ModalText>채팅방을 나가시겠습니까?</S.ModalText>
            <S.ModalButtonContainer>
              <S.ModalLeftButton onClick={() => setIsModalOpen(false)}>
                취소
              </S.ModalLeftButton>
              <S.ModalRightButton onClick={onRoomOut}>
                나가기
              </S.ModalRightButton>
            </S.ModalButtonContainer>
          </S.ModalContainer>
        </S.StyledModal>
      )}
      <ChatHeader
        route="/chatlist"
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={characterName}
        characterId={id}
      />
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
