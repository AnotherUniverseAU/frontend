import styled from "styled-components";
import Modal from "@mui/material/Modal";

////////Modal/////////
export const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 80vw;
  height: 10rem;
  border-radius: 1rem;
`;

export const ModalText = styled.div`
  width: 80vw;
  height: 10rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalButton = styled.div`
  width: 80vw;
  height: 3rem;
  background-color: #6d2fef;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1rem;
  font-weight: 700;

  border-radius: 0 0 1rem 1rem;
`;

//////////Create//////////

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 16px;
  background-color: #fff;
`;

export const SubContainer = styled.div`
  margin: 1rem 0 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputTitle = styled.div`
  width: 90vw;
  font-size: 0.9rem;
  font-weight: 700;
  color: black;
  margin-top: 0.8rem;
`;

export const RedText = styled.span`
  color: red;
`;

export const ImageContainer = styled.div`
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageInfo = styled.div`
  width: 90vw;
  font-size: 0.6rem;
  color: #a0a0a0;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.2rem;
`;

export const FileSize = styled.div`
  width: 90vw;
  color: black;
  font-size: 0.8rem;
  font-weight: 700;
  margin: 0.7rem 0 0.3rem;
`;

export const PurpleText = styled.span`
  color: #6d2fef;
`;

export const ImageLabel = styled.label`
  font-size: 0.7rem;
  font-weight: 500;
  width: 82vw;
  height: auto;
  border: 0.1rem solid #a0a0a0;
  color: #a0a0a0;
  border-radius: 1rem;
  padding: 1rem 4vw;
  margin: 0.1rem 0 0.8rem;
`;

export const ImageInput = styled.input`
  display: none;
`;

export const ImageWrapper = styled.div`
  width: 90vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.8rem;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledImage = styled.img`
  width: 7rem;
  height: 7rem;
  margin: 0 0.2rem;
`;
