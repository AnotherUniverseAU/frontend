import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import loadingImg from "src/assets/img/loading.svg";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;
const LoadingDiv = styled.div`
  font-size: 1rem;
  font-weight: bold;
  padding-top: 1rem;
  color: rgb(109, 47, 239);
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const ImgDiv = styled.div`
  animation: ${rotate} 2s linear infinite;
`;
const LoadingIcon = styled.img`
  width: 3.5rem;
  height: 3.5rem;
`;

export const Loading = () => {
  const [loadingStatus, setLoadingStatus] = useState(1);
  const [loadingContent, setLoadingContent] = useState("Loading");
  useEffect(() => {
    switch (loadingStatus) {
      case 1:
        setLoadingContent("Loading");
        setTimeout(() => {
          setLoadingStatus(2);
        }, 500);
        break;
      case 2:
        setLoadingContent("Loading.");
        setTimeout(() => {
          setLoadingStatus(3);
        }, 500);
        break;
      case 3:
        setLoadingContent("Loading..");
        setTimeout(() => {
          setLoadingStatus(4);
        }, 500);
        break;
      case 4:
        setLoadingContent("Loading...");
        setTimeout(() => {
          setLoadingStatus(1);
        }, 500);
        break;
      default:
        break;
    }
  }, [loadingStatus]);
  return (
    <Container>
      <ImgDiv className="App">
        <LoadingIcon src={loadingImg} alt="Loading" />
      </ImgDiv>
      <LoadingDiv>{loadingContent}</LoadingDiv>
    </Container>
  );
};
