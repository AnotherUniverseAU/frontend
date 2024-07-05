import * as S from 'src/styles/home/main.ts';

import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainHeader } from 'src/components/header/main/mainHeader.tsx';
import { MainImage } from 'src/components/mainImage/mainImage.tsx';
import { StyledImage } from 'src/components/styledImage/styledImage.tsx';
import { IconFooter } from 'src/components/footer//icon/iconFooter.tsx';
import { Loading } from 'src/pages/setting/loading.tsx';

import { apiRequestGet } from 'src/apis/apiRequestGet';
import { BackgroundLower, BackgroundUpper } from 'src/components/background/background';

import { BlockedMainImage } from 'src/components/mainImage/blockedMainImage.tsx';
import { BlockedStyledImage } from 'src/components/styledImage/blockedStyledImage.tsx';

import { Modal } from 'src/components/modal/modal.tsx';

export const Main: React.FC = () => {
    const [isTutorial, setIsTutorial] = useState<boolean>(false);

    const [characters, setCharacters] = useState<any[]>([]);
    const [mainCharacter, setMainCharacter] = useState<any>([]);

    const [filteredCharacters, setFilteredCharacters] = useState<any[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string>('all');
    const [blockedCharacter, setBlockedCharacter] = useState<any[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const hasSeenModal = localStorage.getItem('hasSeenModal');
        if (!hasSeenModal) {
            setShowModal(true);
            localStorage.setItem('hasSeenModal', 'true');
        }
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        // async function requestSafetyArea() {
        //     // React Native의 WebView로 권한 요청 메시지 전송//
        //     if ((window as any).ReactNativeWebView) {
        //         console.log('권한 요청 시도');
        //         await (window as any).ReactNativeWebView.postMessage(
        //             JSON.stringify({
        //                 type: 'REMOVE_SAFETY_AREA', // 요청 유형을 변경
        //             })
        //         );
        //         console.log('권한 요청 완료');
        //     }
        // }
        // requestSafetyArea();
        const recogTuto = async () => {
            const isTuto = await localStorage.getItem('isMainTutoShown');
            if (isTuto !== 'true') {
                setIsTutorial(true);
            }
        };
        recogTuto();

        const fetchCharacters = async () => {
            const result = await apiRequestGet('/character/list');
            setCharacters(result.characters);
        };

        const fetchMainCharacter = async () => {
            const result = await apiRequestGet('/character/main-character');
            setLoading(false);
            setMainCharacter(result.mainCharacter);
        };

        const fetchBlockedCharacter = async () => {
            const result = await apiRequestGet('user/reject-ids');
            setBlockedCharacter(result.rejectedIds);
        };

        fetchCharacters();
        fetchMainCharacter();
        fetchBlockedCharacter();
    }, []);

    useEffect(() => {
        if (characters.length !== 0) {
            const filtered =
                selectedGenre === 'all'
                    ? characters
                    : characters.filter((character: any) => character.genre === selectedGenre);
            setFilteredCharacters(filtered);
        }
    }, [characters, selectedGenre]);

    return (
        <>
            {!loading ? (
                <S.Container style={{ overflow: isTutorial ? 'hidden' : 'scroll' }}>
                    <Modal show={showModal} handleClose={handleCloseModal} />
                    {isTutorial && (
                        <S.TutorialContainer>
                            <S.VirtualHeader className="header">
                                <S.VirtualLeft />
                                <S.VirtualMiddle>
                                    <S.TutorialTextContainer>
                                        <S.TutorialText>원하는 AI 캐릭터를</S.TutorialText>
                                        <S.TutorialText>직접 만들 수 있어요!</S.TutorialText>
                                        <S.TutorialButton
                                            onClick={() => {
                                                setIsTutorial(false);
                                                localStorage.setItem('isMainTutoShown', 'true');
                                            }}
                                        >
                                            OK
                                        </S.TutorialButton>
                                    </S.TutorialTextContainer>
                                </S.VirtualMiddle>
                                <S.VirtualRight>
                                    <S.CreateWhiteImg />
                                    <S.CircleWhiteImg />
                                </S.VirtualRight>
                            </S.VirtualHeader>
                        </S.TutorialContainer>
                    )}
                    <MainHeader toCreate={true} isTutorial={isTutorial} />
                    <S.SubContainer className="container">
                        <S.MainContainer>
                            {blockedCharacter.includes(mainCharacter.characterId) ? (
                                <BlockedMainImage />
                            ) : (
                                <MainImage
                                    route={`/detail/${mainCharacter.characterId}`}
                                    imgurl={mainCharacter.mainImageUrl}
                                    name={mainCharacter.name}
                                    title={mainCharacter.title}
                                    creatorNickname={mainCharacter.creatorNickname}
                                />
                            )}
                        </S.MainContainer>
                        <S.NavContainer>
                            <S.ButtonNav>
                                <S.StyledButton
                                    active={selectedGenre === 'all'}
                                    onClick={() => setSelectedGenre('all')}
                                >
                                    전체
                                </S.StyledButton>
                                <S.StyledButton
                                    active={selectedGenre === 'anime'}
                                    onClick={() => setSelectedGenre('anime')}
                                >
                                    애니
                                </S.StyledButton>
                                <S.StyledButton
                                    active={selectedGenre === 'game'}
                                    onClick={() => setSelectedGenre('game')}
                                >
                                    게임
                                </S.StyledButton>
                            </S.ButtonNav>
                            <S.ImageContainer>
                                {filteredCharacters.map((character: any, index) => (
                                    <S.StyledImageMargin key={character.characterId}>
                                        {blockedCharacter.includes(character.characterId) ? (
                                            <BlockedStyledImage />
                                        ) : (
                                            <StyledImage
                                                route={`/detail/${character.characterId}`}
                                                imgurl={character.coverImageUrl}
                                                name={character.name}
                                                title={character.title}
                                                creatorNickname={character.creatorNickname}
                                            />
                                        )}
                                    </S.StyledImageMargin>
                                ))}
                            </S.ImageContainer>
                        </S.NavContainer>
                    </S.SubContainer>
                    <IconFooter activepage="/" />
                    <BackgroundUpper color="white" />
                    <BackgroundLower color="#f2f3f6" />
                </S.Container>
            ) : (
                <Loading />
            )}
        </>
    );
};
