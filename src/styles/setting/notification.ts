import styled from "styled-components";
import { styled as muiStyled } from "@mui/system";
import { Switch } from "@mui/material";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #f2f3f6;
`;

export const SubContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 5rem);
  margin: 1rem 0vw;
`;

export const NotificationContainer = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background: white;
  border-radius: 0.5rem;
`;

export const NotificationText = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;

export const CustomSwitch = muiStyled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#6d2fef",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#6d2fef",
  },
}));
