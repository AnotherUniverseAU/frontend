import { MainHeader } from "src/components/header/main/mainHeader.tsx";
import { IconFooter } from "src/components/footer/icon/iconFooter.tsx";
import * as S from "src/styles/chat/list.ts";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";

const imgMockdata = [
  {
    id: 1,
    imgUrl: require("src/assets/img/background.png") as string,
    name: "병찬햄",
    content: "학교에서 훈련하다가 오른쪽 무릎이 아파서 힘들었어",
    timeStamp: "18:24",
    chatNum: 3,
  },
  {
    id: 2,
    imgUrl: require("src/assets/img/background.png") as string,
    name: "문대",
    content: "온르은 유진이와 같이 새로운 뮤직비디오 시청을 했어어",
    timeStamp: "18:24",
    chatNum: 1,
  },
  {
    id: 3,
    imgUrl: require("src/assets/img/background.png") as string,
    name: "병찬햄",
    content:
      "사시쯤이었나? 윤종 사형이랑 백천 사형이 같이 막걸이 마시자고 해서 한탕 땡기고 옴ㅋㅋㅋㅋㄹㅇ",
    timeStamp: "18:24",
    chatNum: 1,
  },
];

interface Chat {
  id: number;
  imgUrl: string;
  name: string;
  content: string;
  timeStamp: string;
  chatNum: number;
}
interface ChatListProps {
  chatList: Chat[];
}

const NoChatsComponent = () => {
  return (
    <>
      <S.NoChatsContainer>
        <S.NoChatsText>Another Universe 친구를 만들어 보세요!</S.NoChatsText>
        <S.NoChatsLink to={"/"}>채팅 추가하기</S.NoChatsLink>
      </S.NoChatsContainer>
    </>
  );
};

const StyledLink = styled(Link)``;

const ChatListComponent = ({ chatList }: ChatListProps) => {
  return (
    <>
      {chatList.map((chat) => (
        <StyledLink to="/chatroom/1" key={chat.id}>
          <S.ChatContainer>
            <S.ChatImgWrapper>
              <S.ChatImg src={chat.imgUrl} alt="chatImg" />
            </S.ChatImgWrapper>
            <S.ChatContent>
              <S.ChatName>{chat.name}</S.ChatName>
              <S.ChatText>{chat.content}</S.ChatText>
            </S.ChatContent>
            <S.ChatSubContent>
              <S.ChatTime>{chat.timeStamp}</S.ChatTime>
              <S.ChatNum>{chat.chatNum}</S.ChatNum>
            </S.ChatSubContent>
          </S.ChatContainer>
        </StyledLink>
      ))}
    </>
  );
};

export const ChatList = () => {
  const [chatList, setChatList] = useState<Chat[]>([]);

  useEffect(() => {
    setChatList(imgMockdata);
    // setChatList([]);
  }, []);

  return (
    <S.Container>
      <MainHeader toCreate={true} isTutorial={false} />
      <S.TItleContainer>
        <S.Title>CHATS</S.Title>
      </S.TItleContainer>
      {chatList.length === 0 ? (
        <NoChatsComponent />
      ) : (
        <ChatListComponent chatList={chatList} />
      )}

      <IconFooter activepage="/chatlist" />
    </S.Container>
  );
};
