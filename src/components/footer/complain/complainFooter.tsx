import React, { useState } from "react";

import * as S from "src/components/footer/complain/complainFooter.ts";

export const ComplainFooter: React.FC<{
  setChatMessage: (chatMessage: string) => void;
}> = ({ setChatMessage }) => {
  const [inputValue, setInputValue] = useState("");

  const sendChatMessage = () => {
    setChatMessage(inputValue);
    setInputValue("");
  };

  return (
    <S.Container>
      <S.ChatInput
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <S.SendIcon onClick={sendChatMessage} />
    </S.Container>
  );
};
