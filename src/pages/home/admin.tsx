import { ReactEventHandler, useEffect, useRef, useState } from "react";
import { apiRequestGet } from "src/apis/apiRequestGet";
import styled from "styled-components";

const Table = styled.table``;
const Tr = styled.tr`
  border: 1px solid;
`;
const ContentTd = styled.td`
  border: 1px solid;
`;
const TimeTd = styled.td`
  border: 1px solid;
`;
const StyledP = styled.p`
  overflow-wrap: break-word;
  max-width: 70vw;
  padding: 0.5vw;
`;

export const Admin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [characterList, setCharacterList] = useState([]);
  const charIdRef = useRef<HTMLSelectElement>(null);
  const DateRef = useRef<HTMLInputElement>(null);
  const [characterChats, setCharacterChats] = useState<any>([]);
  const [timeValue, setTimeValue] = useState<any>();
  // const timeRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const getCharInfo = async () => {
      await apiRequestGet("user/check-admin").then((res) => {
        if (res.isAdmin) {
          setIsAdmin(true);
        }
      });
    };
    getCharInfo();
    setTimeValue(
      new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    );
  }, []);
  useEffect(() => {
    if (isAdmin) {
      const getCharList = async () => {
        const res: any = await apiRequestGet("/character/list");
        setCharacterList(res.characters);
      };
      getCharList();
    }
  }, [isAdmin]);

  const onChange = (e: any) => {
    setTimeValue(e.target.value);
  };
  const onClick = (e: any) => {
    const charIdCurrent = charIdRef.current;
    const DateCurrent = DateRef.current;
    if (charIdCurrent && DateCurrent) {
      const charId = charIdCurrent.value;
      const date = DateCurrent.value;
      const time = "24:00";

      const timestamp = new Date(date + " " + time);
      apiRequestGet(
        `/chatroom/chat-history/${charId}/${timestamp}?offset=0`
      ).then((res) => {
        console.log(res);
        const getCharMessages = async () => {
          const changedList = await changeDataForm(res);
          console.log(changedList);
          setCharacterChats(changedList);
        };
        getCharMessages();
      });
    }
  };

  const changeDataForm = async (chatHistory: any) => {
    const chatList = [];
    const koreaTimeOffset = 9 * 60 * 60 * 1000; // Korea is UTC+

    // 형식 변환해 chatList에 모두 넣기
    // 각 캐릭터 메시지 뭉텅이 마다
    for (let i of chatHistory.characterChats) {
      // 각 내용마다
      for (let j of i.content) {
        if (j.startsWith("https:")) {
          // 이미지일 때
          const newMessage = {
            time: new Date(Date.parse(i.timeToSend) + koreaTimeOffset)
              .toISOString()
              .replace("T", " ")
              .substring(0, 16),
            content: "",
            sentby: "character",
            type: "image",
            imageUrl: j,
          };
          chatList.push(newMessage);
        } else {
          // text일 때
          const newMessage = {
            time: new Date(Date.parse(i.timeToSend) + koreaTimeOffset)
              .toISOString()
              .replace("T", " ")
              .substring(0, 16),
            content: j,
            sentby: "character",
            type: "text",
          };
          chatList.push(newMessage);
        }
      }
      // 답장이 있다면 : 30분 추가해 다 넣어주자
      if ("reply" in i && i.reply) {
        i.reply.forEach((text: any) => {
          const afterFiveM = new Date(
            Date.parse(i.timeToSend) + 30 * 60 * 1000 + koreaTimeOffset
          )
            .toISOString()
            .replace("T", " ")
            .substring(0, 16);
          const newMessage = {
            time: afterFiveM,
            content: text,
            sentby: "character",
            type: "text",
          };
          chatList.push(newMessage);
        });
      }
    }
    return chatList;
  };

  return (
    <>
      {isAdmin ? (
        <>
          <div>
            <select ref={charIdRef}>
              {characterList.map((char: any, idx: number) => {
                return (
                  <option key={idx} value={char.characterId}>
                    {char.name}
                  </option>
                );
              })}
            </select>
            <input
              ref={DateRef}
              onChange={onChange}
              type="date"
              id="date"
              min="2024-04-01"
              value={timeValue}
            ></input>
            {/* <input
            ref={timeRef}
            type="time"
            onChange={onChange}
            value={new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
              .toISOString()
              .slice(11, 16)}
          ></input> */}
            <button onClick={onClick}>Search</button>
          </div>
          <Table>
            <Tr>
              <th style={{ border: "1px solid" }}>content</th>
              <th style={{ border: "1px solid" }}>time</th>
            </Tr>
            {characterChats.map((chat: any, idx: number) => {
              return (
                <Tr key={"d" + String(idx)}>
                  {chat.imageUrl ? (
                    <ContentTd key={"i" + String(idx)}>
                      <img
                        src={chat.imageUrl}
                        alt="이미지"
                        style={{ maxWidth: "50%" }}
                      ></img>
                    </ContentTd>
                  ) : (
                    <ContentTd key={"c" + String(idx)}>
                      <StyledP>{chat.content}</StyledP>
                    </ContentTd>
                  )}
                  <TimeTd key={"t" + String(idx)}>
                    <StyledP>{chat.time.substring(5, 16)}</StyledP>
                  </TimeTd>
                </Tr>
              );
            })}
          </Table>
        </>
      ) : (
        <>not authorized</>
      )}
    </>
  );
};
