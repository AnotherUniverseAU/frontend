import styled from "styled-components";
import { Link } from "react-router-dom";
import { styled as muiStyled } from "@mui/system";
import { Switch } from "@mui/material";

export const HeaderContainer = styled.div`
  width: 100vw;
  height: 5rem;
  border-bottom: 0.1rem solid #e5e5e5;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: white;
`;

export const StyledLink = styled(Link)`
  width: 15vw;
  height: 5rem;
  position: absolute;
  top: 0rem;
  left: 0rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const StyledLinkArrow = styled.img`
  width: 1rem;
  height: 1.5rem;
  /* position: absolute;
  top: 1.7rem;
  left: 1rem; */
`;

export const TitleContainer = styled.div`
  color: black;
  font-size: 1.2rem;
  font-weight: 700;
`;

export const ChatSettingButton = styled.div`
  width: 15vw;
  height: 5rem;
  position: absolute;
  top: 0rem;
  right: 0rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ChatSettingImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export const ChatSettingWrapper = styled.div`
  position: relative;
`;

export const ChatSettingBox = styled.div`
  width: 15rem;
  background-color: white;
  position: absolute;
  top: 2.5rem;
  right: 0;
  border: 0.1rem solid #6d2fef;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: black;
`;

export const AlarmSettingWrapper = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  border-bottom: 0.1rem solid #dfdfdf;
`;

export const AlarmSettingText = styled.div`
  margin-left: 1rem;
`;

export const NicknameEditWrapper = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding-left: 1rem;
`;

export const NicknameEditText = styled.div``;

export const SwitchWrapper = styled.div`
  margin-left: 6rem;
`;

export const CustomSwitch = muiStyled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#6d2fef",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#6d2fef",
  },
}));
