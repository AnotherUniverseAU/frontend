import { MainHeader } from "src/components/header/main/mainHeader.tsx";
import { IconFooter } from "src/components/footer/icon/iconFooter.tsx";
import * as S from "src/styles/chat/list.ts";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { apiRequestGet } from "src/apis/apiRequestGet";
import { Loading } from "src/pages/setting/loading.tsx";

const picNameMockData = {
  nameAndPics: [
    {
      characterId: "6617e54d2957fc21b66eaf2f",
      name: "이영찬",
      profilePicUrl:
        "https://anotheruniverse.blob.core.windows.net/user-reply-image/18822cf2b4512c2ec (1).jpg",
    },
    {
      characterId: "65c0b542c9a646697bb644ab",
      name: "강동혁",
      profilePicUrl:
        "https://anotheruniverse.blob.core.windows.net/user-reply-image/18822cf2b4512c2ec (1).jpg",
    },
  ],
};

const chatRoomMockData = {
  chatRoomDatas: [
    {
      characterId: "65c0b542c9a646697bb644aa",
      lastAccess: "2024-04-03T13:14:15Z",
      lastChat: "하하하하하하하",
      unreadCount: 4,
    },
    {
      characterId: "65c0b542c9a646697bb644ab",
      lastAccess: "2024-04-03T13:28:15Z",
      lastChat: "음허허허허허허",
      unreadCount: 1,
    },
    {
      characterId: "65c0b542c9a646697bb644ac",
      lastAccess: "2024-04-08T13:50:10Z",
      lastChat: ";;;;;",
      unreadCount: 110,
    },
  ],
};

interface Chat {
  name: string;
  profilePicUrl: string;
  characterId: string;
  lastChat: string;
  lastAccess: string;
  lastChatDate: string;
  unreadCount: number;
  exceedCount?: "string";
}
interface ChatListProps {
  chatRoomDatas: Array<Chat>;
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

const ChatListComponent = ({ chatRoomDatas }: ChatListProps) => {
  return (
    <>
      {chatRoomDatas.map((chat) => (
        <StyledLink to={`/chatroom/${chat.characterId}`} key={chat.characterId}>
          <S.ChatContainer>
            <S.ChatImgWrapper>
              <S.ChatImg src={chat.profilePicUrl} alt="chatImg" />
            </S.ChatImgWrapper>
            <S.ChatContent>
              <S.ChatName>{chat.name}</S.ChatName>
              <S.ChatText>{chat.lastChat}</S.ChatText>
            </S.ChatContent>
            <S.ChatSubContent>
              <S.ChatTime>
                {chat.lastChatDate.replace("T", " ").substring(11, 16)}
              </S.ChatTime>
              <S.ChatNum>
                {chat.exceedCount ? chat.exceedCount : chat.unreadCount}
              </S.ChatNum>
            </S.ChatSubContent>
          </S.ChatContainer>
        </StyledLink>
      ))}
    </>
  );
};

export const ChatList = () => {
  const [chatrooms, setChatrooms] = useState<any>([]);
  const [nameAndPics, setNameAndPics] = useState<any>([]);
  const [chatList, setChatList] = useState<Chat[]>([]);

  useEffect(() => {
    apiRequestGet("/character/info/bulk");
    async function getDatas() {
      const apiData: any = await apiRequestGet("/chatroom");
      const namePicData: any = await apiRequestGet("/character/info/bulk");
      console.log(namePicData);
      // setChatrooms(apiData);
      // setNameAndPics(namePicData);
    }
    getDatas();
    // 에서 가져왔다 치고~
    // const apiData = chatRoomMockData;
  }, []);
  useEffect(() => {
    console.log(chatrooms);
    console.log(nameAndPics);

    if (chatrooms !== undefined && nameAndPics !== undefined) {
      const newData = [];

      // const namePicData = picNameMockData;

      for (let i in chatrooms.chatRoomDatas) {
        console.log(i);
        for (let j in nameAndPics) {
          console.log(j);
          if (
            chatrooms.chatRoomDatas[i].characterId ===
            nameAndPics[j].characterId
          ) {
            const { name, profilePicUrl } = nameAndPics[j];
            //
            if (chatrooms.chatRoomDatas[i].unreadCount > 99) {
              const littleNewData = {
                ...chatrooms.chatRoomDatas[i],
                exceedCount: `+99`,
                name: name,
                profilePicUrl: profilePicUrl,
              };
              newData.push(littleNewData);
            } else {
              const littleNewData = {
                ...chatrooms.chatRoomDatas[i],
                name: name,
                profilePicUrl: profilePicUrl,
              };
              newData.push(littleNewData);
            }
          }
        }
      }
      setChatList(newData);
    }
  }, [chatrooms, nameAndPics]);

  return (
    <S.Container>
      <MainHeader toCreate={true} isTutorial={false} />
      <S.TItleContainer>
        <S.Title>CHATS</S.Title>
      </S.TItleContainer>
      {chatList.length === 0 ? (
        <NoChatsComponent />
      ) : (
        <ChatListComponent chatRoomDatas={chatList} />
      )}

      <IconFooter activepage="/chatlist" />
    </S.Container>
  );
};
