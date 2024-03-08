import styled from "styled-components";

interface InputProps {
  isFocused: boolean;
  height: string;
  marginTop: string;
}

export const InputWrapper = styled.div<InputProps>`
  position: relative;
  width: 90vw;
  height: ${(props) => props.height};
  border: 0.1rem solid ${(props) => (props.isFocused ? "#6D2FEF" : "#a0a0a0")};
  border-radius: 1rem;
  padding: 1rem 4vw;
  display: flex;
  flex-direction: row;

  margin-top: ${(props) => props.marginTop};
`;

export const CustomTextarea = styled.textarea<InputProps>`
  width: 59vw;
  color: ${(props) => (props.isFocused ? "#6D2FEF" : "a0a0a0")};
  font-size: 0.8rem;
  font-weight: 500;
  border: none;
  vertical-align: top;
  outline: none;
  font-family: "Noto Sans KR", sans-serif;
  background: none;
  caret-color: transparent; // 커서를 숨김
  &::placeholder {
    color: ${(props) => (props.isFocused ? "#6D2FEF" : "a0a0a0")};
  }
`;

export const CharacterCounter = styled.div<InputProps>`
  color: ${(props) => (props.isFocused ? "#6D2FEF" : "a0a0a0")};
  width: 15vw;
  text-align: center;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 1.3rem;
  right: 3vw;
`;
