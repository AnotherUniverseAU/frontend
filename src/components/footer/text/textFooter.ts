import styled from "styled-components";

export const StyledLink = styled.div`
    width: 100vw;
    height: 5rem;
    calc(5rem + var(--safe-area-inset-bottom));
    background-color: #6d2fef;
    position: fixed;
    bottom: 0;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    z-index: 5;
    padding-bottom: var(--safe-area-inset-bottom);
`;

export const StyledLinkText = styled.div`
  width: 100vw;
  color: white;
  margin: 1.5rem 0;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
