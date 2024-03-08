import React, { useState, useRef } from "react";

import * as S from "./chatFooter.ts";

export const ChatFooter: React.FC<{
  setChatMessage: (chatMessage: string) => void;
}> = ({ setChatMessage }) => {
  const [inputValue, setInputValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setInputValue(event.target?.result?.toString() || "");
      };
      reader.readAsText(file);
    }
  };

  const sendChatMessage = () => {
    setChatMessage(inputValue);
    setInputValue("");
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <S.Container>
      <S.AttachIcon onClick={handleIconClick} />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
      <S.ChatInput
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <S.SendIcon onClick={sendChatMessage} />
    </S.Container>
  );
};
