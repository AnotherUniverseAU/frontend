import styled from 'styled-components';

export const Container = styled.div`
    width: 28vw;
    height: calc(8rem + 4vh);
    position: relative;
    background-color: white;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    border-radius: 1rem;
    margin-right: 2vw;
    margin-bottom: 2vh;
    border: 0.1rem solid #bababa;
    box-sizing: border-box;
`;

export const BlockedText = styled.div`
    width: 28vw;
    height: 100%;
    color: #bababa;
    font-size: 0.7rem;
    font-weight: 500;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
