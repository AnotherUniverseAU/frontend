// Modal.tsx
import React from 'react';
import styled from 'styled-components';

interface ModalProps {
    show: boolean;
    handleClose: () => void;
}

const ModalBackground = styled.div<{ show: boolean }>`
    display: ${({ show }) => (show ? 'block' : 'none')};
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
    background-color: white;
    margin: 40% auto;
    border-radius: 10px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Header = styled.h2`
    margin-top: 0;
    padding: 1rem 0 1.8rem;
    font-size: 1.2rem;
    padding: 20px;
    text-align: center;
    font-weight: 600;
`;

const Paragraph = styled.p`
    margin: 0.5rem 0;
    font-size: 1rem;
    color: #333;
    padding: 0 20px;
    text-align: start;
    font-weight: 400;
`;

const Button = styled.button`
    background-color: #6200ea;
    color: white;
    padding: 18px 20px;
    border: none;
    border-radius: 0 0 5px 5px;
    cursor: pointer;
    margin-top: 20px;
    font-size: 1rem;
    width: 100%;
`;

export const Modal: React.FC<ModalProps> = ({ show, handleClose }) => {
    return (
        <ModalBackground show={show}>
            <ModalContent>
                <br />
                <Header>[서비스 종료 안내]</Header>
                <br />
                <Paragraph>안녕하세요. AU 개발자입니다.</Paragraph>
                <br />
                <Paragraph>2024년 6월 30일자로 서비스를 종료하게 되어, </Paragraph>
                <Paragraph>이용자분들께 마지막 인사를 드립니다.</Paragraph>
                <br />
                <Paragraph>운영상의 문제로 부득이하게 쉽지 않은 결정을</Paragraph>
                <Paragraph>내리게 되었습니다.</Paragraph>
                <br />
                <Paragraph>서비스 이용을 위해 수집된 모든 정보는 서비스</Paragraph>
                <Paragraph>종료 직후 파기될 예정입니다.</Paragraph>
                <br />
                <Paragraph>그동안 AU를 이용해 주신 이용자분들께 깊은</Paragraph>
                <Paragraph>감사의 인사를 드립니다.</Paragraph>
                <br />
                <Button onClick={handleClose}>확인</Button>
            </ModalContent>
        </ModalBackground>
    );
};
