import styled from "styled-components";
import { Link } from "react-router-dom";

////////NoChatsComponent////////
export const NoChatsContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 20rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const NoChatsText = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 1rem;
  color: #acacac;
`;

export const NoChatsLink = styled(Link)`
  font-size: 1rem;
  font-weight: 700;
  margin-top: 1rem;
  color: black;
  text-decoration: underline;
`;

////////ChatListComponent////////

export const ChatContainer = styled.div`
  width: 100vw;
  height: 5rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ebebeb;
  background: white;
  padding: 0 5vw;
`;

export const ChatImgWrapper = styled.div`
  width: 15vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const ChatImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

export const ChatContent = styled.div`
  width: 60vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0.3rem 0 0;
`;

export const ChatName = styled.div`
  width: 60vw;
  height: 1.1rem;
  font-size: 0.9rem;
  font-weight: 700;
`;

export const ChatText = styled.div`
  width: 60vw;
  height: 1.2rem;
  margin-top: 0.2rem;
  font-size: 0.8rem;
  color: #7e7e7e;
  text-overflow: ellipsis; // 텍스트가 너무 길면 ...으로 표시
  white-space: nowrap;
  overflow: hidden;
`;

export const ChatSubContent = styled.div`
  width: 15vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

export const ChatTime = styled.div`
  font-size: 0.7rem;
  color: #7e7e7e;
  margin-bottom: 0.5rem;
`;

export const ChatNum = styled.div`
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6d2fef;
  color: white;
  font-size: 0.7rem;
  text-align: center;
`;

///////ChatList//////////
export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #f2f3f6;
`;
export const SubContainer = styled.div`
  margin: 5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: flex;

  height: calc(100vh - 10rem);
  overflow: scroll;
`;

export const TItleContainer = styled.div`
  width: 90vw;
  height: 4rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0.8rem 0;
  padding-left: 5vw;
`;
