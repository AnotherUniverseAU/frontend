import styled from 'styled-components';
import { ReactComponent as Purple } from 'src/assets/img/PurpleLogo.svg';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

export const Logo = styled(Purple)`
    /* width: 40%;
    height: auto; */
`;

export const TopInfoWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 4rem;
`;

export const TopInfo = styled.div`
    font-size: 1rem;
    color: #a0a0a0;
    margin-top: 0.3rem;
`;

export const KakaoWrapper = styled.div`
    background-color: #fee500;
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 4rem 10% 0;
    padding: 1rem 0;
    border-radius: 1rem;
`;

export const KakaoImg = styled.img`
    width: 1.2rem;
    height: 1.2rem;
`;

export const KakaoText = styled.div`
    font-size: 1rem;
    height: 1.2rem;
    color: #3c1e1e;
    margin-left: 0.5rem;
`;

export const BottomInfoWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 2rem;
`;

export const BottomInfo = styled.div`
    font-size: 0.8rem;
    margin-top: 0.3rem;
    color: #dfdfdf;
    margin-left: 0.5rem;
`;
