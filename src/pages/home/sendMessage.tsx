import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const Tr = styled.tr`
    border: 1px solid #ddd;
`;

const Td = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
`;

interface User {
    nickname: string;
    lastAccess: string;
}

export const SendMessage = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [userList, setUserList] = useState<User[]>([]);
    const [daysAgo, setDaysAgo] = useState<string>('');
    const [hoursAgo, setHoursAgo] = useState<string>('');
    const [messageContent, setMessageContent] = useState<string>('');
    const [dateToSend, setDateToSend] = useState<string>('');
    const [queryToSend, setQueryToSend] = useState<any>(null);
    const [nickname, setNickname] = useState<string>(''); // nickname 상태 추가

    useEffect(() => {
        const checkAdmin = async () => {
            const token = localStorage.getItem('accessToken');
            try {
                const res = await axios.get(`${BASE_URL}/user/check-admin`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.data.isAdmin) {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error('Error checking admin status:', error);
            }
        };
        checkAdmin();
    }, []);

    const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDaysAgo(e.target.value as any);
    };

    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHoursAgo(e.target.value as any);
    };

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessageContent(e.target.value);
    };

    const handleDateToSendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateToSend(e.target.value);
    };

    const handleSearchClick = async () => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - Number(daysAgo));
        currentDate.setHours(currentDate.getHours() - Number(hoursAgo));

        const lastAccessValue = currentDate.toISOString();

        const token = localStorage.getItem('accessToken');

        let query: any = {
            lastAccess: { $lt: lastAccessValue },
        };

        if (nickname) {
            query.nickname = nickname; // nickname 조건 추가
        }

        const queries = JSON.stringify(query);
        setQueryToSend(queries); // 상태 업데이트

        try {
            const response = await axios.post(
                `${BASE_URL}/user/get-users-by-query`,
                { queries: queries },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data) {
                setUserList(response.data);
                console.log('받아온 목록: ', response.data);
            } else {
                setUserList([]);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUserList([]);
        }
    };

    const handleSendMessageClick = async () => {
        if (!dateToSend || !messageContent) {
            alert('마케팅 메시지의 필요한 부분이 비어있습니다.');
            return;
        }
        const token = localStorage.getItem('accessToken');
        const body = {
            dateToSend: new Date(dateToSend).toISOString(),
            queries: queryToSend,
            marketingMessageContent: messageContent,
        };

        console.log('보낼 데이터: ', body);

        try {
            const response = await axios.post(`${BASE_URL}/user/set-send-marketing-message`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data) {
                alert('마케팅 메시지가 정상적으로 전송되었습니다.');
            } else {
                alert('마케팅 메시지 전송에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error sending marketing message:', error);
            alert('Failed to send marketing message.');
        }
    };

    const handleSendIndividualMessageClick = async (nickname: string) => {
        if (!dateToSend || !messageContent) {
            alert('마케팅 메시지의 필요한 부분이 비어있습니다.');
            return;
        }
        const token = localStorage.getItem('accessToken');
        const body = {
            dateToSend: new Date(dateToSend).toISOString(),
            queries: JSON.stringify({ nickname }), // 특정 유저를 대상으로 하는 쿼리
            marketingMessageContent: messageContent,
        };

        console.log('보낼 데이터: ', body);

        try {
            const response = await axios.post(`${BASE_URL}/user/set-send-marketing-message`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data) {
                alert(`${nickname}에게 마케팅 메시지가 정상적으로 전송되었습니다.`);
            } else {
                alert(`${nickname}에게 마케팅 메시지 전송에 실패했습니다.`);
            }
        } catch (error) {
            console.error(`Error sending marketing message to ${nickname}:`, error);
            alert(`Failed to send marketing message to ${nickname}.`);
        }
    };

    return (
        <>
            {isAdmin ? (
                <div style={{ margin: '5vw' }}>
                    <br />
                    <br />
                    <h3>
                        <strong>며칠, 몇시간 동안 안 들어온 유저를 찾고 싶은가?</strong>
                    </h3>
                    <br />
                    <br />
                    <label>
                        Days ago:
                        <input type="number" value={daysAgo} onChange={handleDaysChange} />
                    </label>
                    <br />
                    <br />
                    <label>
                        Hours ago:
                        <input type="number" value={hoursAgo} onChange={handleHoursChange} />
                    </label>
                    <br />
                    <br />
                    <br />
                    <h3>
                        <strong>찾고 싶은 특정 유저가 있는가?</strong>
                    </h3>
                    <br />
                    <br />
                    <label>
                        Nickname:
                        <input type="text" value={nickname} onChange={handleNicknameChange} />{' '}
                        {/* nickname 입력 필드 추가 */}
                    </label>
                    <br />
                    <br />
                    <button onClick={handleSearchClick}>Search</button>
                    <br />

                    <br />
                    <br />
                    <br />

                    {userList.length > 0 ? (
                        <>
                            <h3>
                                <strong>마케팅 메시지 전송</strong>
                            </h3>
                            <br />
                            <label>
                                Date to Send:
                                <input type="datetime-local" value={dateToSend} onChange={handleDateToSendChange} />
                            </label>
                            <br />
                            <br />
                            <label>
                                Message Content
                                <br />
                                <br />
                                <textarea value={messageContent} onChange={handleMessageChange}></textarea>
                            </label>
                            <br />
                            <br />
                            <br />
                            <Table>
                                <thead>
                                    <Tr>
                                        <th>Nickname</th>
                                        <th>Last Access</th>
                                        <th>Send</th>
                                    </Tr>
                                </thead>
                                <tbody>
                                    {userList.map((user: User, idx: number) => (
                                        <Tr key={idx}>
                                            <Td>{user.nickname}</Td>
                                            <Td>{new Date(user.lastAccess).toISOString()}</Td>
                                            <Td>
                                                <button onClick={() => handleSendIndividualMessageClick(user.nickname)}>
                                                    Send
                                                </button>{' '}
                                                {/* 버튼 추가 */}
                                            </Td>
                                        </Tr>
                                    ))}
                                </tbody>
                            </Table>
                            <br />
                            <br />
                            <button onClick={handleSendMessageClick}>Send All</button>
                        </>
                    ) : (
                        <>검색 결과가 없습니다</>
                    )}
                </div>
            ) : (
                <div>Not authorized</div>
            )}
        </>
    );
};

export default SendMessage;
