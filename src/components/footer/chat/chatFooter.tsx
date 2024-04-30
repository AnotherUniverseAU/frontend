import React, { useState, useRef, useEffect } from 'react';

import * as S from './chatFooter.ts';
import axios from 'axios';
import { apiRequestPostFormData } from 'src/apis/apiRequestPost.ts';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const ChatFooter: React.FC<{
    setChatMessage: (message: { type: 'text' | 'image'; content: string; imageUrl?: string; isSent: boolean }) => void;
    isTuto: boolean;
    id: string | undefined;
}> = ({ setChatMessage, isTuto, id }) => {
    const [inputValue, setInputValue] = useState('');

    const [currentRow, setCurrentRow] = useState(1);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const chatInputRef = useRef<HTMLTextAreaElement>(null);
    const chatValidRef = useRef<HTMLTextAreaElement>(null);

    const [initialRem, setInitialRem] = useState(Number);
    const [initialScrollH, setInitialScrollH] = useState(Number);

    useEffect(() => {
        const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
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
            setChatMessage({ type: 'image', content: '', imageUrl, isSent: false });

            const formData = new FormData();
            formData.append('image', file);
            apiRequestPostFormData(`${BASE_URL}/chatroom/image-reply/${id}`, formData);
        }
    };

    const sendChatMessage = () => {
        if (inputValue === '') {
            // 아이콘 색깔도 바꾸기?
            return;
        } else {
            setChatMessage({ type: 'text', content: inputValue, isSent: false });
            setInputValue('');
            if (!isTuto) {
                chatInputRef.current?.focus();
            }
            setCurrentRow(1);
        }
    };

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

    async function requestPermissionsOrUpload(event: any) {
        event.preventDefault();

        async function updatePermissions() {
            if ((window as any).ReactNativeWebView) {
                console.log('권한 상태를 확인합니다.');
                (window as any).ReactNativeWebView.postMessage(
                    JSON.stringify({
                        type: 'REQUEST_PERMISSIONS_CHECK',
                    })
                );

                return new Promise((resolve) => {
                    const handlePermissionMessage = (event: any) => {
                        try {
                            const data = JSON.parse(event.data);
                            if (data.cameraPermission !== undefined && data.libraryPermission !== undefined) {
                                console.log('권한 상태가 업데이트 되었습니다.');
                                resolve({
                                    cameraPermission: data.cameraPermission,
                                    libraryPermission: data.libraryPermission,
                                });
                            }
                        } catch (error) {
                            console.error('Error handling message from WebView:', error);
                            resolve({ cameraPermission: false, libraryPermission: false });
                        } finally {
                            window.removeEventListener('message', handlePermissionMessage);
                        }
                    };

                    window.addEventListener('message', handlePermissionMessage, true);
                });
            } else {
                return { cameraPermission: false, libraryPermission: false };
            }
        }

        const { cameraPermission, libraryPermission }: { cameraPermission: boolean; libraryPermission: boolean } =
            (await updatePermissions()) as {
                cameraPermission: boolean;
                libraryPermission: boolean;
            };

        if (cameraPermission && libraryPermission) {
            const uploadInput = document.getElementById('image-upload');
            if (uploadInput) {
                uploadInput.click(); // 파일 선택 창 열기
            } else {
                console.error('업로드 요소를 찾을 수 없습니다.');
            }
            // } else {
            //     if ((window as any).ReactNativeWebView) {
            //         (window as any).ReactNativeWebView.postMessage(
            //             JSON.stringify({
            //                 type: 'REQUEST_PERMISSIONS', // 권한 요청 메시지 전송
            //             })
            //         );
            //     }
        }
    }
    return (
        <S.Container className="footer" currentRow={currentRow}>
            <S.LeftDiv>
                <S.AttachIcon onClick={(event) => requestPermissionsOrUpload(event)} />
                <input
                    id="image-upload"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    style={{ display: 'none' }}
                />
            </S.LeftDiv>

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
