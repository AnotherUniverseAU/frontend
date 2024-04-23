import styled from "styled-components";

import { ReactComponent as AttachIconSvg } from "src/assets/img/attachIcon.svg";
import { ReactComponent as SendIconSvg } from "src/assets/img/sendIcon.svg";

export const Container = styled.div<{
  currentRow: number;
}>`
  width: 100%;
  height: ${(props) =>
    props.currentRow < 3
      ? "calc(5rem + constant(safe-area-inset-bottom))"
      : `calc(${
          props.currentRow * 1 + 2
        }rem + constant(safe-area-inset-bottom))`};
  height: ${(props) =>
    props.currentRow < 3
      ? "calc(5rem + env(safe-area-inset-bottom))"
      : `calc(${props.currentRow * 1 + 2}rem + env(safe-area-inset-bottom))`};

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 5;
`;
export const LeftDiv = styled.div`
  width: 10vw;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const AttachIcon = styled(AttachIconSvg)`
  width: 10vw;
`;
export const TextAreaDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: auto;
`;
export const ChatCalcTextArea = styled.textarea`
  width: 65vw;
  font-size: 1rem;
  line-height: 1rem;
  height: 1rem;
  border: 0.1rem solid #dfdfdf;
  border-radius: 0.5rem;
  margin: 0;
  padding: 0.3rem 0.5rem;
  &:focus {
    outline: none;
    border: 0.1rem solid #dfdfdf; // 입력 시 색상 변경되지 않도록
  }
  visibility: hidden;
  position: absolute;
`;
export const ChatTextArea = styled.textarea<{
  currentRow: number;
}>`
  width: 65vw;
  font-size: 1rem;
  line-height: 1rem;
  height: ${(props) => props.currentRow + "rem"};
  max-height: 4rem;
  border: 0.1rem solid #dfdfdf;
  border-radius: 0.5rem;
  margin: 0;
  padding: 0.3rem 0.5rem;
  overflow: hidden;
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
