import styled from "styled-components";
import background from "src/assets/img/background.png";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img`
  width: 40%;
  height: auto;
`;
