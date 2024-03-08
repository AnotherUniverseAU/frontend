import styled from "styled-components";

interface ToggleProps {
  open: boolean;
}

export const Container = styled.div`
  width: 90vw;
  margin-top: 1.5rem;
`;

export const CheckContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CheckboxImage = styled.img`
  width: 1rem;
  height: 1rem;
  transition: all 0.3s ease-in-out;
`;

export const Arrow = styled.div<ToggleProps>`
  font-size: 0.8rem;
  margin-left: 0.5rem;
  cursor: pointer;
  transform: ${(props) => (props.open ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.3s ease-in-out;
`;

export const Text = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  margin-left: 10px;
`;

export const Policy = styled.div<ToggleProps>`
  font-size: 0.7rem;
  margin-top: 0.5rem;
  max-height: ${(props) => (props.open ? "100px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

export const RedText = styled.span`
  color: red;
`;
