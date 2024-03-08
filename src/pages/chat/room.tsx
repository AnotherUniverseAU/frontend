import { ChatHeader } from "src/components/header/chat/chatHeader.tsx";
import { ChatFooter } from "src/components/footer/chat/chatFooter.tsx";
import * as S from "src/styles/chat/room.ts";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ChatRoom = () => {
  const params = useParams<{ id: string }>();
  const [chatMessage, setChatMessage] = useState("");

  // const [ws, setWs] = useState<WebSocket | null>(null);
  // const [messages, setMessages] = useState<string[]>([]);
  // const [input, setInput] = useState("");

  // useEffect(() => {
  //   const websocket = new WebSocket("ws://your-websocket-url");
  //   setWs(websocket);
  // }, []);

  // useEffect(() => {
  //   if (ws) {
  //     ws.onmessage = (msg) => {
  //       setMessages((prevMessages) => [...prevMessages, msg.data]);
  //     };
  //   }
  // }, [ws]);

  // const sendMessage = () => {
  //   if (ws) {
  //     ws.send(input);
  //     setInput("");
  //   }
  // };

  return (
    <S.Container>
      <ChatHeader route="/chatlist" title="청명" />
      <S.SubContainer>
        {/* {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={sendMessage}>Send</button> */}
      </S.SubContainer>
      <ChatFooter setChatMessage={setChatMessage} />
    </S.Container>
  );
};
