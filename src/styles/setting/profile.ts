import styled from "styled-components";
import { ReactComponent as ProfileImgComponent } from "src/assets/img/CreatorImg.svg";
import { ReactComponent as NicknameEditBtn } from "src/assets/img/nicknameEditBtn.svg";
import { ReactComponent as Arrow } from "src/assets/img/Arrow.svg";

/////////NavItem Component/////////
export const NavItem = styled.div`
  width: 90vw;
  height: 3rem;
  padding: 0 10vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.5rem;
  background: #fcfcfc;
`;

export const NavText = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
`;

export const NavArrow = styled(Arrow)`
  width: auto;
`;

//////////////Profile/////////////

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #f2f3f6;
`;

export const SubContainer = styled.div`
  width: 90vw;
  height: calc(100vh - 10rem);
  margin: 5rem 5vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProfileImg = styled(ProfileImgComponent)`
  width: 30vw;
  height: 30vw;
  border-radius: 50%;
`;

export const NicknameContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

export const Nickname = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
`;

export const NicknameEditImg = styled(NicknameEditBtn)`
  width: 1rem;
  height: 1rem;
  margin-left: 0.5rem;
`;

export const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`;

export const WithDraw = styled.div`
  width: 90vw;
  height: 3rem;
  padding: 0 10vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.5rem;
  background: none;

  color: #a0a0a0;
  font-size: 0.9rem;
  font-weight: 300;
`;
