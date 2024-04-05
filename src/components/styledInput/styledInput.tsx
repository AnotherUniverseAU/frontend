import React, { useState } from "react";
import * as S from "./styledInput.ts";

interface InputComponentProps {
  placeholder: string;
  content: string;
  setContent: (content: string) => void;
  limit: number;
  height: string;
  marginTop: string;
  required?: boolean;
}

export const StyledInput: React.FC<InputComponentProps> = ({
  placeholder,
  content,
  setContent,
  limit,
  height,
  marginTop,
  required,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (event.target.value.length <= limit) {
      setContent(event.target.value);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <S.InputWrapper isFocused={isFocused} height={height} marginTop={marginTop}>
      <S.CustomTextarea
        value={content}
        onChange={handleTextareaChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        isFocused={isFocused}
        height={height}
        marginTop={marginTop}
        spellCheck="false"
        required
      />
      <S.CharacterCounter
        isFocused={isFocused}
        height={height}
        marginTop={marginTop}
      >{`${content.length.toLocaleString()}/${limit.toLocaleString()}`}</S.CharacterCounter>
    </S.InputWrapper>
  );
};
