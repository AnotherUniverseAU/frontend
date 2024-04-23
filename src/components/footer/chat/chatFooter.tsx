import React, { useState, useRef, useEffect, useMemo } from "react";

import * as S from "./chatFooter.ts";
import { apiRequestPost } from "src/apis/apiRequestPost.ts";
import axios from "axios";
export const ChatFooter: React.FC<{
  setChatMessage: (message: {
    type: "text" | "image";
    content: string;
    imageUrl?: string;
    isSent: boolean;
  }) => void;
  isTuto: boolean;
  id: string | undefined;
}> = ({ setChatMessage, isTuto, id }) => {
  const [inputValue, setInputValue] = useState("");

  const [currentRow, setCurrentRow] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);
  const chatValidRef = useRef<HTMLTextAreaElement>(null);

  const [initialRem, setInitialRem] = useState(Number);
  const [initialScrollH, setInitialScrollH] = useState(Number);

  useEffect(() => {
    const remSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    setInitialRem(remSize);

    if (chatInputRef.current) {
      // setInitialClientH(chatInputRef.current.ClientHeight);
      setInitialScrollH(chatInputRef.current.scrollHeight);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setChatMessage({ type: "image", content: "", imageUrl, isSent: false });

      const formData = new FormData();
      formData.append("image", file);
      const response = axios.post(`/chatroom/image-reply/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // apiRequestPost(`/chatroom/image-reply/${id}`, { image: formData });
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
      setCurrentRow(1);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
    requestPermissions();
  };

  function requestPermissions() {
    // React Native의 WebView로 권한 요청 메시지 전송
    if ((window as any).ReactNativeWebView) {
      console.log("권한 요청 시도");
      (window as any).ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "REQUEST_PERMISSIONS", // 요청 유형을 변경
        })
      );
      console.log("권한 요청 완료");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);

    const checkRow = chatValidRef.current;
    if (checkRow) {
      checkRow.value = e.target.value;
      if (checkRow.scrollHeight === initialScrollH) {
        setCurrentRow(1);
      } else if (checkRow.scrollHeight === initialScrollH + initialRem) {
        setCurrentRow(2);
      } else if (checkRow.scrollHeight === initialScrollH + initialRem * 2) {
        setCurrentRow(3);
      } else if (checkRow.scrollHeight === initialScrollH + initialRem * 3) {
        setCurrentRow(4);
      } else {
        setCurrentRow(4);
      }
    }
  };
  return (
    <S.Container className="footer" currentRow={currentRow}>
      <S.AttachIcon onClick={handleIconClick} />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        style={{ display: "none" }}
        disabled={isTuto}
      />

      <S.TextAreaDiv>
        <S.ChatCalcTextArea ref={chatValidRef} readOnly></S.ChatCalcTextArea>
        <S.ChatTextArea
          currentRow={currentRow}
          ref={chatInputRef}
          value={inputValue}
          onChange={handleChange}
          spellCheck="false"
          maxLength={isTuto ? 50 : 2000}
        />
      </S.TextAreaDiv>
      <div id="chat-send-button" onClick={sendChatMessage}>
        <S.SendIcon />
      </div>
    </S.Container>
  );
};
