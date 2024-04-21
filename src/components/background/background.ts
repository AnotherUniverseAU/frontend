import styled from "styled-components";

export const BackgroundUpper = styled.div<{ color: string }>`
  width: 100%;
  height: 50%;
  top: 0;
  position: fixed;
  background-color: ${(props) => props.color};
  z-index: -1;
`;
export const BackgroundLower = styled.div<{ color: string }>`
  width: 100%;
  height: 50%;
  top: 50%;
  position: fixed;
  background-color: ${(props) => props.color};
  z-index: -1;
`;
export const BackgroundFull = styled.div<{ color: string }>`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: ${(props) => props.color};
  z-index: -1;
`;
