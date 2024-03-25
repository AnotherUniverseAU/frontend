import styled from 'styled-components';
import Modal from '@mui/material/Modal';

////////Modal/////////
export const StyledModal = styled(Modal)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: 65vw;
    border-radius: 1rem;
    position: relative;
`;

export const PermissionCheck = styled.img`
    width: 5rem;
    height: 5rem;
    margin: 3rem 0 1rem;
`;

export const ModalText = styled.div`
    width: 65vw;
    font-size: 1.1rem;
    font-weight: 500;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalSubTextContainer = styled.div`
    width: 65vw;
    height: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ModalSubText = styled.div`
    margin: 0.2rem 0;
    font-size: 0.9rem;
    color: #a0a0a0;
`;

export const SkipText = styled.div`
    height: 2rem;
    font-size: 0.6rem;
    color: #b4b4b4;
    text-decoration: underline;
`;

export const ModalButton = styled.div`
    width: 65vw;
    height: 3rem;
    background-color: #6d2fef;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 0.9rem;
    font-weight: 500;
    border-radius: 0 0 1rem 1rem;
`;

//////////Permission//////////
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const SubContainer = styled.div`
    margin: 5rem 0 0;
    width: 70vw;
`;

export const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
`;

export const SubTitle = styled.div`
    font-size: 0.8rem;
    color: #a0a0a0;
    margin-top: 2rem;
`;

export const ListContainer = styled.div`
    margin-top: 2rem;
`;

export const ListTitle = styled.div`
    font-size: 1rem;
    font-weight: 700;
    margin: 3rem 0 0.5rem;
    color: #6d2fef;
`;

export const EachListContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3.5rem;
    border-bottom: 1px solid #e0e0e0;
`;

export const ListText = styled.div`
    font-size: 0.9rem;
    font-weight: 500;
`;

export const CheckImg = styled.img`
    width: 0.8rem;
    height: 0.8rem;
`;

export const BottomInfoWrapper = styled.div`
    width: 100%;
    margin: 2rem 0 7rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

export const BottomInfo = styled.div`
    font-size: 0.7rem;
    color: #a0a0a0;
    margin: 0.3rem 0;
`;
