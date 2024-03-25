// ChatRoom.tsx

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import chatData from 'src/apis/chatData2.json';
import { ChatHeader } from 'src/components/header/chat/chatHeader.tsx';
import { ChatFooter } from 'src/components/footer/chat/chatFooter.tsx';
import * as S from 'src/styles/chat/room.ts';

import profileImg from 'src/assets/img/CreatorImg.svg'; /// 변경 예정

interface ChatMessage {
    time: string;
    content: string;
    sentby: 'user' | 'character';
    type: 'text' | 'image'; // 메시지 타입을 나타내는 필드 추가
    imageUrl?: string; // 이미지 URL을 위한 선택적 필드 추가
}

interface CharacterMessageProps {
    message: ChatMessage;
    showProfile: boolean;
    characterName: string;
    showChatTutorial: boolean;
}

const CharacterMessage: React.FC<CharacterMessageProps> = ({
    message,
    showProfile,
    characterName,
    showChatTutorial,
}) => {
    return (
        <S.CharacterMessageWrapper sentby="character" showProfile={showProfile} showChatTutorial={showChatTutorial}>
            {showProfile && <S.ProfileImage src={profileImg} alt="Character profile" />}
            <div>
                {showProfile && <S.CharacterName>{characterName}</S.CharacterName>}
                <S.MessageContent>
                    {message.type === 'text' ? (
                        <S.Message sentby="character">{message.content}</S.Message>
                    ) : (
                        <S.MessageImage src={message.imageUrl} alt="Sent image" /> // 이미지 타입 메시지를 위한 JSX
                    )}
                    <S.Time>{message.time.split(' ')[1]}</S.Time>
                </S.MessageContent>
            </div>
        </S.CharacterMessageWrapper>
    );
};

interface UserMessageProps {
    message: ChatMessage;
    showReplyTutorial: boolean;
}
const UserMessage: React.FC<UserMessageProps> = ({ message, showReplyTutorial }) => {
    return (
        <S.UserMessageWrapper sentby="user" showProfile={false} showReplyTutorial={showReplyTutorial}>
            <S.Time>{message.time.split(' ')[1]}</S.Time>
            {message.type === 'text' ? (
                <S.Message sentby="user">{message.content}</S.Message>
            ) : (
                <S.MessageImage src={message.imageUrl} alt="Sent image" /> // 이미지 타입 메시지를 위한 JSX
            )}
        </S.UserMessageWrapper>
    );
};

export const ChatRoom = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const subContainerRef = useRef<HTMLDivElement>(null); // SubContainer에 대한 ref 추가
    const [characterName, setCharacterName] = useState<string>('청명');

    const [showChatTutorial, setShowChatTutorial] = useState<boolean>(false);
    const [showReplyTutorial, setShowReplyTutorial] = useState<boolean>(false);

    //처음 마운팅될 때 chatTutorial이 보여진 적 없으면 보여줌
    useEffect(() => {
        const chatTutorialShown = localStorage.getItem(`chatTutorialShown`);
        if (chatTutorialShown == null) {
            setShowChatTutorial(true);
        }
    }, []);

    useEffect(() => {
        console.log('chatMessages', chatMessages);
    }, [chatMessages]);

    useEffect(() => {
        console.log('showChatTutorial', showChatTutorial);
    }, [showChatTutorial]);

    useEffect(() => {
        console.log('showReplyTutorial', showReplyTutorial);
    }, [showReplyTutorial]);

    const handleChatTutorialClose = () => {
        setShowChatTutorial(false);
        localStorage.setItem(`chatTutorialShown`, 'true');
    };

    const handleReplyTutorialClose = () => {
        setShowReplyTutorial(false);
        localStorage.setItem(`replyTutorialShown`, 'true');
    };

    useEffect(() => {
        setChatMessages(chatData.chat as ChatMessage[]);
    }, []);

    useEffect(() => {
        const current = subContainerRef.current;
        if (current) {
            setTimeout(() => {
                current.scrollTop = current.scrollHeight;
            }, 10);
        }
    }, [chatMessages]);

    const addChatMessage = (message: { type: 'text' | 'image'; content: string; imageUrl?: string }) => {
        //빈칸이면 안보내지도록
        // if (!message.content.trim()) return;

        const koreaTimeOffset = 9 * 60 * 60 * 1000; // Korea is UTC+9
        const timeInKorea = new Date(new Date().getTime() + koreaTimeOffset)
            .toISOString()
            .replace('T', ' ')
            .substr(0, 16);
        const newMessage: ChatMessage = {
            time: timeInKorea,
            content: message.content,
            sentby: 'user',
            type: message.type,
            imageUrl: message.imageUrl,
        };
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);
        //replyTutorial가 보여진 적 없으면 답장 튜토리얼 보여줌
        const replyTutorialShown = localStorage.getItem(`replyTutorialShown`);
        if (replyTutorialShown == null) {
            setShowReplyTutorial(true);
        }
    };

    const renderMessages = ({ showChatTutorial }: { showChatTutorial: boolean }) => {
        let lastDate = '';
        let lastSender = '';

        return (
            <S.ChatContent ref={subContainerRef}>
                {chatMessages.map((message, index) => {
                    const [date, time] = message.time.split(' ');
                    const showMessageDate = date !== lastDate;
                    if (showMessageDate) lastDate = date;

                    const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });

                    let showProfile = message.sentby === 'character' && lastSender !== 'character';
                    lastSender = message.sentby;

                    return (
                        <React.Fragment key={index}>
                            {showMessageDate && <S.DateLabel>{formattedDate}</S.DateLabel>}
                            {message.sentby === 'character' ? (
                                <CharacterMessage
                                    message={message}
                                    showProfile={showProfile}
                                    characterName={characterName}
                                    showChatTutorial={showChatTutorial}
                                />
                            ) : (
                                <UserMessage message={message} showReplyTutorial={showReplyTutorial} />
                            )}
                        </React.Fragment>
                    );
                })}
            </S.ChatContent>
        );
    };

    return (
        <S.Container>
            <ChatHeader route="/chatlist" title={characterName} />
            <S.SubContainer>
                {showChatTutorial && (
                    <S.ChatTutorialContainer>
                        <S.ChatTutorialTextContainer>
                            <S.ChatTutorialText>캐릭터는 일과 중 짬날 때,</S.ChatTutorialText>
                            <S.ChatTutorialText>하루 약 7번 찾아와요</S.ChatTutorialText>
                            <S.ChatTutorialButton onClick={handleChatTutorialClose}>OK</S.ChatTutorialButton>
                        </S.ChatTutorialTextContainer>
                    </S.ChatTutorialContainer>
                )}
                {showReplyTutorial && (
                    <S.ReplyTutorialContainer>
                        <S.ReplyTutorialTextContainer>
                            <S.ReplyTutorialText>이용자 분들의 답변 중,</S.ReplyTutorialText>
                            <S.ReplyTutorialText>캐릭터가 선택한 답변에</S.ReplyTutorialText>
                            <S.ReplyTutorialText>답장을 보내줘요</S.ReplyTutorialText>
                            <S.ReplyTutorialButton onClick={handleReplyTutorialClose}>OK</S.ReplyTutorialButton>
                        </S.ReplyTutorialTextContainer>
                    </S.ReplyTutorialContainer>
                )}
                {renderMessages({ showChatTutorial })}
            </S.SubContainer>
            <ChatFooter setChatMessage={addChatMessage} />
        </S.Container>
    );
};
