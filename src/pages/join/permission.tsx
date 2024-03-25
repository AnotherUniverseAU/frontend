import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from 'src/styles/join/permission.ts';

import { TextFooter } from 'src/components/footer/text/textFooter.tsx';
import purpleCheck from 'src/assets/img/purpleCheck.png';
import grayCheck from 'src/assets/img/grayCheck.png';
import permissionCheck from 'src/assets/img/permissionCheck.png';

export const Permission = () => {
    const [checks, setChecks] = useState<{ [key: string]: boolean }>({
        chat: true,
        photo: true,
        camera: true,
        marketing: true,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const essential: { [key: string]: string } = {
        file: '파일 접근 권한',
    };

    const optional: { [key: string]: string } = {
        chat: '채팅 알림',
        photo: '사진',
        camera: '카메라',
        marketing: '마케팅 정보 수신 동의',
    };

    const toggleCheck = (name: string) => {
        if (checks.hasOwnProperty(name)) {
            setChecks((prev) => ({ ...prev, [name]: !prev[name] }));
        }
    };

    const handleSkip = () => {
        navigate('/nickname');
    };

    const handleAllowPermission = () => {
        setChecks((prev) => ({ ...prev, chat: true }));
        navigate('/nickname');
    };

    const handleNext = () => {
        if (!checks.chat) {
            setIsModalOpen(true);
        } else {
            navigate('/nickname');
        }
    };

    return (
        <S.Container>
            {isModalOpen && (
                <S.StyledModal open={isModalOpen}>
                    <S.ModalContainer>
                        <S.PermissionCheck src={permissionCheck} alt="permissionCheck" />
                        <S.ModalText>알림을 허용해주세요</S.ModalText>
                        <S.ModalSubTextContainer>
                            <S.ModalSubText>알림을 허용해야</S.ModalSubText>
                            <S.ModalSubText>캐릭터의 채팅을 받아볼 수 있어요.</S.ModalSubText>
                        </S.ModalSubTextContainer>
                        <S.SkipText onClick={handleSkip}>나중에 설정하기</S.SkipText>
                        <S.ModalButton onClick={handleAllowPermission}>알림 허용</S.ModalButton>
                    </S.ModalContainer>
                </S.StyledModal>
            )}
            <S.SubContainer>
                <S.Title>앱 접근 권한 안내</S.Title>
                <S.SubTitle>서비스 이용을 위해 아래의 권한을 허용해주세요.</S.SubTitle>
                <S.ListContainer>
                    <S.ListTitle>필수</S.ListTitle>
                    {Object.entries(essential).map(([name, description]) => (
                        <S.EachListContainer key={name}>
                            <S.ListText>{description}</S.ListText>
                            <S.CheckImg src={purpleCheck} alt="check" />
                        </S.EachListContainer>
                    ))}
                    <S.ListTitle>선택</S.ListTitle>
                    {Object.entries(optional).map(([name, description]) => (
                        <S.EachListContainer onClick={() => toggleCheck(name)} key={name}>
                            <S.ListText>{description}</S.ListText>
                            <S.CheckImg src={checks[name] ? purpleCheck : grayCheck} alt="check" />
                        </S.EachListContainer>
                    ))}
                </S.ListContainer>
                <S.BottomInfoWrapper>
                    <S.BottomInfo>선택적 접근 권한의 경우 허용에 동의하지 않으셔도 </S.BottomInfo>
                    <S.BottomInfo>앱 사용이 가능합니다.</S.BottomInfo>
                </S.BottomInfoWrapper>
            </S.SubContainer>
            <TextFooter route="." text="확인" onClick={handleNext} />
        </S.Container>
    );
};
