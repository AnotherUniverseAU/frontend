import { MainHeader } from "src/components/header/main/mainHeader.tsx";
import { IconFooter } from "src/components/footer/icon/iconFooter.tsx";
import * as S from "src/styles/chat/list.ts";
import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { apiRequestGet } from "src/apis/apiRequestGet";
import { Loading } from "src/pages/setting/loading.tsx";
import { BackgroundFull } from "src/components/background/background";

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
  const koreaTimeOffset = 9 * 60 * 60 * 1000;
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
                {new Date(Date.parse(chat.lastChatDate) + koreaTimeOffset)
                  .toISOString()
                  .replace("T", " ")
                  .substring(11, 16)}
              </S.ChatTime>
              {chat.unreadCount !== 0 && (
                <S.ChatNum>
                  {chat.exceedCount ? chat.exceedCount : chat.unreadCount}
                </S.ChatNum>
              )}
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
  const navigate = useNavigate();
  useEffect(() => {
    async function getDatas() {
      const chatroomData: any = await apiRequestGet("/chatroom");
      setChatrooms(chatroomData);

      const bulkData: any = await apiRequestGet("character/info/bulk");
      setNameAndPics(bulkData);
    }
    getDatas();
  }, []);
  useEffect(() => {
    console.log(chatrooms);
    console.log(nameAndPics);

    if (chatrooms !== undefined && nameAndPics !== undefined) {
      const newData = [];

      // const namePicData = picNameMockData;

      for (let i in chatrooms.chatRoomDatas) {
        console.log(i);
        for (let j in nameAndPics.characters) {
          console.log(j);
          if (
            chatrooms.chatRoomDatas[i].characterId ===
            nameAndPics.characters[j].characterId
          ) {
            const { name, profilePicUrl } = nameAndPics.characters[j];
            //
            let lastChat;
            if (chatrooms.chatRoomDatas[i].lastChat) {
              chatrooms.chatRoomDatas[i].lastChat.startsWith("https")
                ? (lastChat = "사진")
                : (lastChat = chatrooms.chatRoomDatas[i].lastChat);
            }

            if (chatrooms.chatRoomDatas[i].unreadCount > 99) {
              const littleNewData = {
                ...chatrooms.chatRoomDatas[i],
                lastChat: lastChat,
                exceedCount: `+99`,
                name: name,
                profilePicUrl: profilePicUrl,
              };
              newData.push(littleNewData);
            } else {
              const littleNewData = {
                ...chatrooms.chatRoomDatas[i],
                lastChat: lastChat,
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
      <S.SubContainer className="container">
        <S.TItleContainer>
          <S.Title>CHATS</S.Title>
        </S.TItleContainer>
        {chatList.length === 0 ? (
          <NoChatsComponent />
        ) : (
          <div>
            <ChatListComponent chatRoomDatas={chatList} />
          </div>
        )}
      </S.SubContainer>
      <IconFooter activepage="/chatlist" />
      <BackgroundFull color="#f2f3f6" />
    </S.Container>
  );
};
