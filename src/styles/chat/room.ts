import styled, { css } from "styled-components";

export const ChatContent = styled.div<{ showChatTutorial?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CharacterMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ProfileImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 0.3rem;
`;

const userMessageStyles = css`
  background-color: #6d2fef;
  color: white;
  align-self: flex-end;
`;

const characterMessageStyles = css`
  background-color: #fcfcfc;
  align-self: flex-start;
`;

export const CharacterMessageWrapper = styled.div<{
  sentby: "user" | "character";
  showProfile?: boolean;
  showChatTutorial?: boolean;
}>`
  display: flex;
  align-items: flex-start;
  justify-content: ${(props) =>
    props.sentby === "user" ? "flex-end" : "flex-start"};
  width: 100%;
  margin-left: ${(props) =>
    props.sentby === "character" && !props.showProfile ? "3.2rem" : "0"};
  z-index: ${(props) => (props.showChatTutorial ? "60" : "0")};
`;

export const UserMessageWrapper = styled.div<{
  sentby: "user" | "character";
  showProfile?: boolean;
  showReplyTutorial?: boolean;
}>`
  display: flex;
  align-items: flex-start;
  justify-content: ${(props) =>
    props.sentby === "user" ? "flex-end" : "flex-start"};
  width: 100%;
  margin-left: ${(props) =>
    props.sentby === "character" && !props.showProfile ? "3.2rem" : "0"};
  z-index: ${(props) => (props.showReplyTutorial ? "60" : "0")};
`;

export const CharacterName = styled.span`
  font-weight: bold;
  width: fit-content;
  font-size: 1rem;
  margin-left: 0.5rem;
`;

export const MessageContent = styled.div`
  display: flex;
  align-items: center;
`;

export const Message = styled.div<{ sentby: "user" | "character" }>`
  padding: 1rem;
  border-radius: 10px;
  max-width: 70%;
  margin: 0.5rem 0.3rem; // Ensure spacing around the message
  ${(props) =>
    props.sentby === "user" ? userMessageStyles : characterMessageStyles}
`;

export const MessageImage = styled.img`
  max-width: 70%;
  max-height: 20rem;
  border-radius: 10px;
  margin: 0.5rem 0.3rem;
  align-self: flex-end;
`;

export const Time = styled.span`
  font-size: 0.75rem;
  color: #666;
  align-self: flex-end;
  padding: 0 0 1rem;
`;

export const DateLabel = styled.div`
  text-align: center;
  margin: 1rem 0 0;
  color: #666;
  width: 100%;
  font-size: 0.85rem;
`;

////room///////

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f2f3f6;
  overflow: scroll;
`;

export const SubContainer = styled.div`
  margin: 5rem 0;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;

  height: calc(100vh - 10rem);
  padding: 0 1rem;
`;

//////ChatTutorial//////

export const ChatTutorialContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
`;

export const TutorialBox = styled.div<{
  $top?: number;
  $left?: number;
}>`
  min-width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  visibility: hidden;

  position: absolute;
  top: ${(props) => (props.$top ? String(props.$top) + "px" : "0")};
  left: ${(props) => (props.$left ? String(props.$left) + "px" : "0")};
`;

export const TutorialTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 80;
`;

export const ChatTutorialText = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  margin: 0.2rem 0;
`;

export const ChatTutorialButton = styled.div`
  background: #b3b0b1;
  border: 0.2rem solid white;
  border-radius: 1rem;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  padding: 1rem 2em;
  width: 4rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;
