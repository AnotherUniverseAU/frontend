import { useEffect } from "react";
import styled from "styled-components";
import errorImg from "src/assets/img/error.png";
import { useNavigate } from "react-router-dom";
import backArrow from "src/components/header/back/backArrow.png";

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

const ImgDiv = styled.div``;
const ErrorIcon = styled.img`
  width: 30vw;
  height: 30vw;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 2rem;
`;
const Content = styled.div`
  color: #9e9e9e;
  margin: 0.3rem 0;
`;
const Button = styled.button`
  margin-top: 2rem;
  width: 15rem;
  height: 3rem;
  border-radius: 15px;
  border: 0;
  background-color: #6d2fef;
  color: white;
  height: ;
`;
const BackArrow = styled.img`
  position: absolute;
  left: 5%;
  top: 3%;
`;

export const Error = () => {
  useEffect(() => {}, []);
  const navigate = useNavigate();
  function onClick() {
    navigate(-1);
  }
  return (
    <Container>
      <BackArrow src={backArrow} alt="뒤로 이동" onClick={onClick}></BackArrow>
      <ImgDiv>
        <ErrorIcon src={errorImg} alt="에러" />
      </ImgDiv>
      <Title>Page Error</Title>
      <Content>페이지에 에러가 발생했어요.</Content>
      <Content>AU가 빠른 시일 내에 해결할게요.</Content>
      <Button onClick={onClick}>뒤로 가기</Button>
    </Container>
  );
};
