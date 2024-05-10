import styled from 'styled-components';

export const Container = styled.div`
    width: 90vw;
    height: 90vw;

    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    border: 0.1rem solid #bababa;
    box-sizing: border-box;
`;

export const BlockedText = styled.div`
    width: 75vw;
    color: #bababa;
    /* font-size: 1.2rem; */
    font-size: 4.5vw;
    font-weight: 500;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 2;
`;
