import React, { useState, useRef } from "react";

import * as S from "./chatFooter.ts";
export const ChatFooter: React.FC<{
  setChatMessage: (message: {
    type: "text" | "image";
    content: string;
    imageUrl?: string;
    isSent: boolean;
  }) => void;
  isTuto: boolean;
}> = ({ setChatMessage, isTuto }) => {
  const [inputValue, setInputValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setChatMessage({ type: "image", content: "", imageUrl, isSent: false });
    }
  };

  const sendChatMessage = () => {
    if (inputValue === "") {
      // 아이콘 색깔도 바꾸기?
      return;
    } else {
      setChatMessage({ type: "text", content: inputValue, isSent: false });
      setInputValue("");
      if (!isTuto) {
        chatInputRef.current?.focus();
      }
    }
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
        accept="image/*"
        style={{ display: "none" }}
        disabled={isTuto}
      />
      <S.ChatInput
        ref={chatInputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        maxLength={isTuto ? 50 : 1000}
      />
      <S.SendIcon onClick={sendChatMessage} />
    </S.Container>
  );
};
