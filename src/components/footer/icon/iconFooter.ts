import styled from "styled-components";
import { Link } from "react-router-dom";

import { ReactComponent as HomeIcon } from "./homeIcon.svg";
import { ReactComponent as ChatIcon } from "./chatIcon.svg";
import { ReactComponent as SettingIcon } from "./settingIcon.svg";

interface IconFooterProps {
  activepage: string;
}

export const Container = styled.div`
  width: 100vw;
  height: 5rem;
  background-color: rgba(255, 255, 255, 0.9);
  position: fixed;
  bottom: 0;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow:
    -0.1rem -0.1rem 0.2rem rgba(0, 0, 0, 0.05),
    0.1rem -0.1rem 0.2rem rgba(0, 0, 0, 0.05);
  /* border: 0.1rem solid #e5e5e5;
  border-bottom-width: 0; */
`;

export const IconContainer = styled(Link)`
  width: 33.3vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: starrt;
`;

export const StyledHomeIcon = styled(HomeIcon)<IconFooterProps>`
  fill: ${(props) => (props.activepage === "/" ? "#6D2FEF" : "#A0A0A0")};
  width: 2rem;
`;

export const StyledChatIcon = styled(ChatIcon)<IconFooterProps>`
  fill: ${(props) =>
    props.activepage === "/chatlist" ? "#6D2FEF" : "#A0A0A0"};
  width: 2rem;
`;

export const StyledSettingIcon = styled(SettingIcon)<IconFooterProps>`
  fill: ${(props) => (props.activepage === "/profile" ? "#6D2FEF" : "#A0A0A0")};
  width: 2rem;
`;
