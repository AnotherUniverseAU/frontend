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

export const SendMessage = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userList, setUserList] = useState([]);
  const charIdRef = useRef<HTMLSelectElement>(null);
  const DateRef = useRef<HTMLInputElement>(null);
  const [characterChats, setCharacterChats] = useState<any>([]);
  const [dateValue, setDateValue] = useState<any>();
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
    setDateValue(
      new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    );
  }, []);
  useEffect(() => {
    if (isAdmin) {
      return;
    }
  }, [isAdmin]);

  const onDateChange = (e: any) => {
    setDateValue(e.target.value);
  };
  const onTimeChange = (e: any) => {
    setTimeValue(e.target.value);
  };
  const onSearchClick = (e: any) => {
    const charIdCurrent = charIdRef.current;
    const DateCurrent = DateRef.current;
    if (charIdCurrent && DateCurrent) {
      const charId = charIdCurrent.value;
      const date = DateCurrent.value;
      const time = "24:00";

      const timestamp = new Date(date + " " + time);

      apiRequestGet(`user/get-users-by-query?quries=${""}`).then((res) => {
        console.log(res);
        const getCharMessages = async () => {};
        getCharMessages();
      });
    }
  };

  return (
    <>
      {isAdmin ? (
        <>
          <div>
            <input
              ref={DateRef}
              onChange={onDateChange}
              type="date"
              id="date"
              min="2024-04-01"
              value={dateValue}
            ></input>
            <input type="time" onChange={onTimeChange}></input>
            <input type=""></input>
            {/* <input
            ref={timeRef}
            type="time"
            onChange={onChange}
            value={new Date(new Date().getTime() + 9 * 60 * 60 * 1000)
              .toISOString()
              .slice(11, 16)}
          ></input> */}
            <button onClick={onSearchClick}>Search</button>
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
