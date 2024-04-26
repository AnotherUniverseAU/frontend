import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import * as S from 'src/styles/home/create.ts';
import { BackHeader } from 'src/components/header/back/backHeader.tsx';
import { ListTitle } from 'src/components/listTitle/listTitle.tsx';
import { StyledInput } from 'src/components/styledInput/styledInput.tsx';
import { PolicyToggle } from 'src/components/policyToggle/policyToggle.tsx';
import { TextFooter } from 'src/components/footer/text/textFooter.tsx';
import { apiRequestPost } from 'src/apis/apiRequestPost';
import permissionCheck from 'src/assets/img/permissionCheck.png';
import { escapeHtml } from '../chat/alterHtml';

export const Create = () => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [gender, setGender] = useState('');
    const [appearance, setAppearance] = useState('');
    const [personality, setPersonality] = useState('');
    const [hobby, setHobby] = useState('');
    const [tone, setTone] = useState('');
    const [extraInfo, setExtraInfo] = useState('');

    const [summary, setSummary] = useState('');
    const [relationship, setRelationship] = useState('');

    const [images, setImages] = useState<string[]>([]);

    const [creatorNickname, setCreatorNickname] = useState('');
    const [email, setEmail] = useState('');
    const [creatorWords, setCreatorWords] = useState('');

    const [totalSize, setTotalSize] = useState(0);
    const [isPolicyOpen, setIsPolicyOpen] = useState(false);

    const [isSubmit, setIsSubmit] = useState(false);
    const [isTextModalOpen, setIsTextModalOpen] = useState(false);
    const [isAgreeModalOpen, setIsAgreeModalOpen] = useState(false);

    const [cameraPermission, setCameraPermission] = useState(false);
    const [libraryPermission, setLibraryPermission] = useState(false);
    const [permissionsReady, setPermissionsReady] = useState(false);

    const navigate = useNavigate();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const newTotalSize = totalSize + newFiles.reduce((sum, file) => sum + file.size, 0); // 바이트 계산

            if (
                images.length + newFiles.length <= 20 && //갯수가 20개 이하이도록
                newTotalSize <= 5 * 1024 * 1024 // 용량이 5MB 이하이도록
            ) {
                setImages([...images, ...newFiles.map((file) => URL.createObjectURL(file))]);
                setTotalSize(newTotalSize);
            }
        }
    };

    const handleSubmit = () => {
        if (
            images.length !== 0 &&
            name &&
            title &&
            genre &&
            creatorWords &&
            gender &&
            appearance &&
            personality &&
            hobby &&
            tone &&
            extraInfo &&
            summary &&
            relationship &&
            email
        ) {
            console.log(isPolicyOpen);
            if (isPolicyOpen === false) {
                setIsAgreeModalOpen(true);
            } else {
                setIsTextModalOpen(false);
                const formData = new FormData();

                // formData.append("image", new Blob(images));
                formData.append('name', escapeHtml(name));
                formData.append('title', escapeHtml(title));
                formData.append('genre', escapeHtml(genre));
                formData.append('creatorWords', escapeHtml(creatorWords));
                formData.append('gender', escapeHtml(gender));
                formData.append('appearance', escapeHtml(appearance));
                formData.append('personality', escapeHtml(personality));
                formData.append('hobby', escapeHtml(hobby));
                formData.append('tone', escapeHtml(tone));
                formData.append('extraInfo', escapeHtml(extraInfo));
                formData.append('summary', escapeHtml(summary));
                formData.append('relationship', escapeHtml(relationship));
                formData.append('email', escapeHtml(email));
                // formData.append("creatorNickname", creatorNickname);

                // for (let key of formData.keys()) {
                //   console.log(key, ":", formData.get(key));
                // }

                apiRequestPost('/character/request-create', formData);
                setIsSubmit(true);
            }
        } else {
            setIsTextModalOpen(true);
        }
    };

    const handleModalClose = () => {
        setIsSubmit(false);
        navigate('/');
    };

    const handleTextModalClose = () => {
        setIsTextModalOpen(false);
    };
    const handleAgreeModalClose = () => {
        setIsAgreeModalOpen(false);
    };

    // async function requestPermissionCheck() {
    //     if ((window as any).ReactNativeWebView) {
    //         console.log('권한 요청 시도');
    //         await (window as any).ReactNativeWebView.postMessage(
    //             JSON.stringify({
    //                 type: 'REQUEST_PERMISSIONS_CHECK',
    //             })
    //         );
    //         console.log('권한 요청 완료');
    //     }
    // }

    // async function requestPermissionCheckReceive() {
    //     const handlePermissionMessage = (event: any) => {
    //         try {
    //             const data = JSON.parse(event.data);

    //             // 메시지 유형 확인 및 상태 업데이트
    //             if (data.cameraPermission !== undefined && data.libraryPermission !== undefined) {
    //                 setCameraPermission(data.cameraPermission);
    //                 setLibraryPermission(data.libraryPermission);
    //             }
    //         } catch (error) {
    //             console.error('Error handling message from WebView:', error);
    //         }
    //     };

    //     await window.addEventListener('message', handlePermissionMessage, true);
    // }

    // async function removeEventListener() {
    //     await window.removeEventListener('message', requestPermissionCheckReceive);
    // }

    // async function requestOrUpload() {
    //     alert('이미지 업로드를 시도합니다.');
    //     if (cameraPermission && libraryPermission) {
    //         alert('모든 권한이 허용되어 이미지 업로드를 진행합니다.');
    //         console.log('모든 권한이 허용되어 이미지 업로드를 진행합니다.');
    //         const uploadInput = document.getElementById('image-upload');
    //         if (uploadInput) {
    //             uploadInput.click(); // 파일 선택 창을 열어줍니다.
    //         } else {
    //             console.error('업로드 요소를 찾을 수 없습니다.');
    //         }
    //     } else {
    //         // 필요한 권한이 없으면 업로드를 차단하고 권한 요청을 합니다.
    //         console.log('필요한 권한이 부여되지 않았습니다. 권한을 요청합니다.');
    //         if ((window as any).ReactNativeWebView) {
    //             (window as any).ReactNativeWebView.postMessage(
    //                 JSON.stringify({
    //                     type: 'REQUEST_PERMISSIONS', // 권한 요청 메시지 전송
    //                 })
    //             );
    //             console.log('권한 요청 메시지가 전송되었습니다.');
    //         }
    //     }
    // }

    // async function requestPermissionsOrUpload(event: any) {
    //     event?.preventDefault();

    //     await requestPermissionCheck();
    //     await requestPermissionCheckReceive();
    //     await removeEventListener();
    //     await requestOrUpload();
    // }

    async function requestPermissionsOrUpload(event: any) {
        event.preventDefault(); // 브라우저의 기본 동작을 방지합니다.

        // 권한 상태를 확인하고 업데이트하는 함수입니다.
        async function updatePermissions() {
            return new Promise<void>((resolve) => {
                if ((window as any).ReactNativeWebView) {
                    console.log('권한 상태를 확인합니다.');
                    (window as any).ReactNativeWebView.postMessage(
                        JSON.stringify({
                            type: 'REQUEST_PERMISSIONS_CHECK',
                        })
                    );

                    const handlePermissionMessage = (event: any) => {
                        try {
                            const data = JSON.parse(event.data);
                            if (data.cameraPermission !== undefined && data.libraryPermission !== undefined) {
                                setCameraPermission(data.cameraPermission);
                                setLibraryPermission(data.libraryPermission);
                                setPermissionsReady(true);
                            }
                            console.log('권한 상태가 업데이트 되었습니다.');
                            resolve(); // 응답을 받은 후에 resolve 호출
                        } catch (error) {
                            console.error('Error handling message from WebView:', error);
                            resolve(); // 에러가 발생해도 다음 단계로 진행합니다.
                        } finally {
                            window.removeEventListener('message', handlePermissionMessage);
                        }
                    };

                    window.addEventListener('message', handlePermissionMessage, { once: true });
                } else {
                    resolve(); // WebView가 없는 경우 바로 resolve 호출
                }
            });
        }

        await updatePermissions();

        useEffect(() => {
            if (permissionsReady && cameraPermission && libraryPermission) {
                alert('모든 권한이 허용되어 이미지 업로드를 진행합니다.');
                console.log('All permissions granted. Proceeding with file upload.');
                const uploadInput = document.getElementById('image-upload');
                if (uploadInput) {
                    uploadInput.click(); // Trigger the file input
                } else {
                    console.error('Upload input not found.');
                }
                setPermissionsReady(false); // Reset permissions check
            } else if (permissionsReady) {
                alert('필요한 권한이 허용되지 않았습니다. 권한을 요청합니다.');
                console.log('Required permissions not granted.');
                setPermissionsReady(false); // Reset permissions check
            }
        }, [permissionsReady, cameraPermission, libraryPermission]);

        // alert('cameraPermission: ' + cameraPermission + ' libraryPermission: ' + libraryPermission);

        // if (cameraPermission && libraryPermission) {
        //     console.log('모든 권한이 허용되어 이미지 업로드를 진행합니다.');
        //     const uploadInput = document.getElementById('image-upload');
        //     if (uploadInput) {
        //         uploadInput.click(); // 파일 선택 창을 열어줍니다.
        //     } else {
        //         console.error('업로드 요소를 찾을 수 없습니다.');
        //     }
        // } else {
        //     console.log('필요한 권한이 부여되지 않았습니다. 권한을 요청합니다.');
        //     if ((window as any).ReactNativeWebView) {
        //         (window as any).ReactNativeWebView.postMessage(
        //             JSON.stringify({
        //                 type: 'REQUEST_PERMISSIONS', // 권한 요청 메시지 전송
        //             })
        //         );
        //     }
        // }
    }

    return (
        <S.Container>
            {isSubmit && (
                <S.StyledModal open={isSubmit}>
                    <S.ModalContainer>
                        <S.ModalText>제출이 완료 되었습니다</S.ModalText>
                        <S.ModalButton onClick={handleModalClose}>확인</S.ModalButton>
                    </S.ModalContainer>
                </S.StyledModal>
            )}
            {isTextModalOpen && (
                <S.StyledModal open={isTextModalOpen}>
                    <S.ModalContainer>
                        <S.PermissionCheck src={permissionCheck} alt="permissionCheck" />
                        <S.ModalText type="unfulfilled">전체 내용을 입력해 주세요.</S.ModalText>
                        <S.ModalSubTextContainer>
                            <S.ModalSubText>누락된 정보가 있어 제출이</S.ModalSubText>
                            <S.ModalSubText>불가합니다.</S.ModalSubText>
                        </S.ModalSubTextContainer>
                        <S.ModalButton onClick={handleTextModalClose}>확인</S.ModalButton>
                    </S.ModalContainer>
                </S.StyledModal>
            )}
            {isAgreeModalOpen && (
                <S.StyledModal open={isAgreeModalOpen}>
                    <S.ModalContainer>
                        <S.PermissionCheck src={permissionCheck} alt="permissionCheck" />
                        <S.ModalText type="unfulfilled">개인정보 수집/이용 동의</S.ModalText>
                        <S.ModalSubTextContainer>
                            <S.ModalSubText>하단의 개인정보 수집/이용 동의란에</S.ModalSubText>
                            <S.ModalSubText>체크하셔야 제출이 가능합니다.</S.ModalSubText>
                        </S.ModalSubTextContainer>
                        <S.ModalButton onClick={handleAgreeModalClose}>확인</S.ModalButton>
                    </S.ModalContainer>
                </S.StyledModal>
            )}

            <BackHeader route="/contributeInfo" title="AI 캐릭터 만들기" />
            <S.SubContainer className="container">
                <ListTitle listNumber={1} listText="캐릭터 정보" textColor="#6D2FEF" />
                <S.InputTitle>
                    이름 <S.RedText>*</S.RedText>
                </S.InputTitle>
                <StyledInput
                    placeholder="캐릭터 이름을 입력해주세요"
                    content={name}
                    setContent={setName}
                    limit={20}
                    height="5.1rem"
                    marginTop="0.5rem"
                />
                <S.InputTitle>
                    작품 <S.RedText>*</S.RedText>
                </S.InputTitle>
                <StyledInput
                    placeholder="작품의 제목을 입력해주세요"
                    content={title}
                    setContent={setTitle}
                    limit={50}
                    height="5.1rem"
                    marginTop="0.5rem"
                />
                <S.InputTitle>
                    작품 장르 <S.RedText>*</S.RedText>
                </S.InputTitle>
                <StyledInput
                    placeholder="애니/게임 중 입력해주세요"
                    content={genre}
                    setContent={setGenre}
                    limit={2}
                    height="3.8rem"
                    marginTop="0.5rem"
                />

                <S.InputTitle>
                    성별<S.RedText>*</S.RedText>
                </S.InputTitle>
                <StyledInput
                    placeholder="캐릭터의 성별을 입력해주세요"
                    content={gender}
                    setContent={setGender}
                    limit={10}
                    height="3.8rem"
                    marginTop="0.5rem"
                />
                <S.InputTitle>
                    외모<S.RedText>*</S.RedText>
                </S.InputTitle>
                <StyledInput
                    placeholder="캐릭터의 외모를 설명해주세요"
                    content={appearance}
                    setContent={setAppearance}
                    limit={500}
                    height="11.6rem"
                    marginTop="0.5rem"
                />
                <S.InputTitle>
                    성격<S.RedText>*</S.RedText>
                </S.InputTitle>
                <StyledInput
                    placeholder="캐릭터의 성격을 설명해주세요"
                    content={personality}
                    setContent={setPersonality}
                    limit={500}
                    height="11.6rem"
                    marginTop="0.5rem"
                />
                <S.InputTitle>
                    취미<S.RedText>*</S.RedText>
                </S.InputTitle>
                <StyledInput
                    placeholder="캐릭터의 취미를 설명해주세요"
                    content={hobby}
                    setContent={setHobby}
                    limit={500}
                    height="11.6rem"
                    marginTop="0.5rem"
                />
                <S.InputTitle>
                    말투<S.RedText>*</S.RedText>
                </S.InputTitle>
                <StyledInput
                    placeholder="캐릭터의 말투(대사) 예시를 입력해주세요"
                    content={tone}
                    setContent={setTone}
                    limit={700}
                    height="11.6rem"
                    marginTop="0.5rem"
                />
                <S.InputTitle>
                    기타 정보<S.RedText>*</S.RedText>
                </S.InputTitle>
                <StyledInput
                    placeholder="캐릭터의 기타 정보를 설명해주세요"
                    content={extraInfo}
                    setContent={setExtraInfo}
                    limit={900}
                    height="11.6rem"
                    marginTop="0.5rem"
                />
                <ListTitle listNumber={2} listText="작품 정보" textColor="#6D2FEF" />
                <S.InputTitle>
                    줄거리<S.RedText>*</S.RedText>
                </S.InputTitle>
                <StyledInput
                    placeholder="작품의 줄거리를 입력해주세요"
                    content={summary}
                    setContent={setSummary}
                    limit={900}
                    height="11.6rem"
                    marginTop="0.5rem"
                />
                <S.InputTitle>
                    등장인물과의 관계<S.RedText>*</S.RedText>
                </S.InputTitle>
                <StyledInput
                    placeholder="타 등장인물과의 관계를 설명해주세요"
                    content={relationship}
                    setContent={setRelationship}
                    limit={900}
                    height="11.6rem"
                    marginTop="0.5rem"
                />
                <ListTitle listNumber={3} listText="이미지" textColor="#6D2FEF" />
                <S.ImageContainer>
                    <S.InputTitle>
                        캐릭터 이미지 (10개 이상)<S.RedText>*</S.RedText>
                    </S.InputTitle>
                    <S.FileSize>
                        <S.PurpleText>{(totalSize / (1024 * 1024)).toFixed(2)}MB</S.PurpleText>
                        /5MB
                    </S.FileSize>
                    <S.ImageLabel htmlFor="image-upload" onClick={(event) => requestPermissionsOrUpload(event)}>
                        + 이미지 업로드
                    </S.ImageLabel>
                    <S.ImageInput
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        multiple
                    />
                    <S.ImageInfo>5MB 이하까지 첨부 가능합니다.</S.ImageInfo>
                    <S.ImageInfo> 이미지 파일 (GIF,PNG,JPG) 기준으로 최대 20개까지 등록 가능합니다.</S.ImageInfo>
                    <S.ImageWrapper>
                        {images.map((image, index) => (
                            <S.StyledImage key={index} src={image} alt={`uploaded ${index}`} />
                        ))}
                    </S.ImageWrapper>
                </S.ImageContainer>

                <ListTitle listNumber={4} listText="제작자 정보" textColor="#6D2FEF" />
                <S.InputTitle>
                    제작자 <S.RedText>*</S.RedText>
                </S.InputTitle>
                <StyledInput
                    placeholder="제작자의 닉네임을 알려주세요"
                    content={creatorNickname}
                    setContent={setCreatorNickname}
                    limit={20}
                    height="5.1rem"
                    marginTop="0.5rem"
                />
                <S.InputTitle>
                    이메일<S.RedText>*</S.RedText>
                </S.InputTitle>
                <StyledInput
                    placeholder="등록심사 결과를 안내 받은 이메일 주소를 입력해주세요"
                    content={email}
                    setContent={setEmail}
                    limit={50}
                    height="5.1rem"
                    marginTop="0.5rem"
                />
                <S.InputTitle>
                    제작자의 말<S.RedText>*</S.RedText>
                </S.InputTitle>
                <StyledInput
                    placeholder="제작 동기 등을 자유롭게 말해주세요"
                    content={creatorWords}
                    setContent={setCreatorWords}
                    limit={100}
                    height="11.6rem"
                    marginTop="0.5rem"
                />

                <PolicyToggle policy={isPolicyOpen} setPolicy={setIsPolicyOpen} />
            </S.SubContainer>
            <TextFooter route="." text="제출할게요" onClick={handleSubmit} />
        </S.Container>
    );
};
