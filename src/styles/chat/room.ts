import styled, { css } from "styled-components";
import Modal from "@mui/material/Modal";

export const ChatContent = styled.div<{ showTutorial: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;

  ::-webkit-scrollbar {
    display: none;
  }

  overflow: scroll;
  pointer-events: ${(props) => (props.showTutorial ? "none" : "auto")};
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
  max-width: 100%;
  align-items: flex-start;
  justify-content: ${(props) =>
    props.sentby === "user" ? "flex-end" : "flex-start"};
  padding-left: ${(props) =>
    props.sentby === "character" && !props.showProfile ? "3.2rem" : "0"};
  z-index: ${(props) => (props.showChatTutorial ? "60" : "0")};
`;

export const UserMessageWrapper = styled.div<{
  sentby: "user" | "character";
  showProfile?: boolean;
  showReplyTutorial?: boolean;
}>`
  display: flex;
  overflow-wrap: break-word;
  align-items: flex-end;
  justify-content: flex-end;
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
  margin-bottom: 0.3rem;
`;

export const MessageContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow-wrap: break-word;
`;

export const MessageDiv = styled.div<{
  showProfile?: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: calc(100% - 3rem);
  flex-grow: 1;
`;

export const Message = styled.div<{
  sentby: "user" | "character";
  showProfile?: boolean;
  showMessageTime: boolean;
}>`
  padding: 1rem;
  border-radius: 10px;
  max-width: ${(props) =>
    props.sentby === "user" ? "70%" : "calc(100% - 3rem)"};
  overflow-wrap: break-word;
  margin: ${(props) =>
    props.showMessageTime === false
      ? "0 0.3rem 0.4rem 0.3rem"
      : "0 0.3rem 0.75rem 0.3rem"};
  margin-top: ${(props) => (props.showProfile === true ? "0.5rem" : "0")};
  ${(props) =>
    props.sentby === "user" ? userMessageStyles : characterMessageStyles};
`;

export const MessageImage = styled.img<{
  showProfile?: boolean;
  showMessageTime: boolean;
}>`
  max-width: 70%;
  max-height: 20rem;
  border-radius: 10px;
  padding: ${(props) =>
    props.showMessageTime === false
      ? "0 0.3rem 0.4rem 0.3rem"
      : "0 0.3rem 0.75rem 0.3rem"};
  padding-top: ${(props) => (props.showProfile === false ? "0.5rem" : "0")};
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
  margin: 1rem 0;
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
  flex-direction: column;
  justify-content: flex;

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
  z-index: 60;
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
  margin: 1rem 0;
`;

////////Modal/////////
export const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 80vw;
  border-radius: 1rem;
`;

export const ModalText = styled.div`
  width: 80vw;
  height: 7rem;
  font-size: 1rem;
  font-weight: 500;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalButtonContainer = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ModalLeftButton = styled.div`
  width: 40vw;
  height: 3rem;
  background-color: #a0a0a0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.8rem;
  font-weight: 700;

  border-radius: 0 0 0 1rem;
`;

export const ModalRightButton = styled.div`
  width: 40vw;
  height: 3rem;
  background-color: #6d2fef;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.8rem;
  font-weight: 700;

  border-radius: 0 0 1rem 0;
`;

export const ModalFullButton = styled.div`
  width: 80vw;
  height: 3rem;
  background-color: #6d2fef;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.8rem;
  font-weight: 700;

  border-radius: 0 0 1rem 1rem;
`;
