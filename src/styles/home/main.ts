import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 0 1rem;
  background-color: white;
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex;
  z-index: 0;
`;

export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  background-color: #f2f3f6;
`;

export const ButtonNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 90vw;
  margin: 1.5rem 0 0.5rem;
`;

export const StyledButton = styled.span<{ active: boolean }>`
  font-size: 1rem;
  text-align: center;
  margin: 0 0.3rem;
  color: ${(props) => (props.active ? "#6d2FEF" : "black")};
  font-weight: ${(props) => (props.active ? "700" : "300")};
  border-bottom: ${(props) => (props.active ? "0.1rem solid #6d2FEF" : "none")};
  padding-bottom: ${(props) => (props.active ? "0.2rem" : "0")};
  transition: all 0.3s ease-in-out;
`;
export const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // justify-content: space-between;
  align-items: center;
  width: 90vw;
`;

export const StyledImageMargin = styled.div`
  // margin: 0.3rem 0.15rem;
`;

export const TutorialContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
`;

export const TutorialTextContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;
  margin-right: 0.75rem;
`;

export const TutorialText = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
`;

export const TutorialButton = styled.div`
  background: #b3b0b1;
  border: 0.2rem solid white;
  border-radius: 1rem;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  padding: 1rem 2em;
  width: 4rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

export const VirtualHeader = styled.div`
  width: 100vw;
  z-index: 99;
  display: flex;
`;
export const VirtualLeft = styled.div`
  width: 20%;
  height: 100%;
`;
export const VirtualMiddle = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: start;
`;
export const VirtualRight = styled.div`
  width: 20%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CircleImg = styled.img`
  width: 120%;
  height: 60%;
  position: absolute;
  right: 20%;
  // top: 50%; /* 버튼의 높이에 따라 조정 가능 */
  // right: 50%; /* 버튼의 너비에 따라 조정 가능 */
  // transform: translate(-50%, -50%); /* 이미지를 정확히 중앙에 위치시키기 위해 */
`;
export const CreateImg = styled.img`
  width: 33%;
  height: 33%;
`;
