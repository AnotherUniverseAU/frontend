import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: auto;
    overflow-y: hidden;
`;

export const InfoContainer = styled.div`
    padding-top: 4rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 5vw;
`;

export const Info = styled.div`
    margin: 0.3rem 0;
    font-size: 1.2rem;
    color: #000000;
    font-weight: 500;
`;

export const BlockInfo = styled.div`
    font-size: 0.7rem;
    color: #969696;
    margin: 0.3rem 0 0 8vw;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
    margin: 1rem 0 1rem 8vw;
`;

export const Button = styled.button`
    background-color: white;
    border: 0.1rem solid #737373;
    border-radius: 3rem;
    width: 5rem;
    height: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;

    &:hover {
        color: #6d2fef;
        border: 0.1rem solid #6d2fef;
    }
`;
