import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    background: white;
`;

export const InfoContainer = styled.div`
    width: 90vw;
    height: calc(100vh - 10rem);
    margin: 4rem 5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Info = styled.div`
    margin: 0.3rem 0;
    font-size: 1.2rem;
    color: #000000;
    font-weight: 500;
`;
