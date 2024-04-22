import styled from "styled-components";

import { ReactComponent as AttachIconSvg } from "src/assets/img/attachIcon.svg";
import { ReactComponent as SendIconSvg } from "src/assets/img/sendIcon.svg";

export const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background: white;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 5;
`;

export const AttachIcon = styled(AttachIconSvg)`
  width: 10vw;
  display: flex;
  align-items: center;
`;

export const ChatInput = styled.input`
  width: 78vw;
  height: 2.5rem;
  font-size: 1rem;
  border: 0.1rem solid #dfdfdf;
  border-radius: 0.5rem;
  padding: 0 0.5rem;
  margin: 0 1vw;
  &:focus {
    outline: none;
    border: 0.1rem solid #dfdfdf; // 입력 시 색상 변경되지 않도록
  }
`;

export const SendIcon = styled(SendIconSvg)`
  width: 10vw;
  display: flex;
  align-items: center;
`;
