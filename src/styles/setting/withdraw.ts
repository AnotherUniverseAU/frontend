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
  border-radius: 1rem;
`;

export const ModalText = styled.div`
  width: 80vw;
  height: 7rem;
  font-size: 1rem;
  font-weight: 500;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalButtonContainer = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ModalLeftButton = styled.div`
  width: 40vw;
  height: 3rem;
  background-color: #a0a0a0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.8rem;
  font-weight: 700;

  border-radius: 0 0 0 1rem;
`;

export const ModalRightButton = styled.div`
  width: 40vw;
  height: 3rem;
  background-color: #6d2fef;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.8rem;
  font-weight: 700;

  border-radius: 0 0 1rem 0;
`;

export const ModalFullButton = styled.div`
  width: 80vw;
  height: 3rem;
  background-color: #6d2fef;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.8rem;
  font-weight: 700;

  border-radius: 0 0 1rem 1rem;
`;

//////////Withdraw//////////

interface OptionProps {
  selected: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  overflow: scroll;
`;

export const TitleContainer = styled.div`
  padding-top: 2rem;
  margin-left: 5vw;
  margin-right: 5vw;
`;

export const SubTitle = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: #a0a0a0;
`;

export const Title = styled.div`
  margin-top: 0.5rem;
  font-size: 1.2em;
  font-weight: 700;
  color: black;
  line-height: 1.3;
`;

export const SubContainer = styled.div`
  margin: 0 5vw;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`;

export const OptionContainer = styled.div`
  margin-top: 1rem;
  width: 70vw;
  margin-left: 20vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Option = styled.div<OptionProps>`
  width: fit-content;
  margin-bottom: 1rem;
  font-size: 0.9em;
  font-weight: ${(props) => (props.selected ? 500 : 500)};
  color: ${(props) => (props.selected ? "white" : "black")};
  background: ${(props) => (props.selected ? "#6D2FEF" : "#dfdfdf")};
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ReplyContainer = styled.div`
  width: 75vw;
  margin-right: 15vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Reply = styled.div`
  width: fit-content;
  font-size: 0.9em;
  font-weight: 500;
  color: black;
  background: #dfdfdf;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  line-height: 1.5;
`;

export const Complain = styled.div`
  width: fit-content;
  margin-bottom: 1rem;
  font-size: 0.9em;
  font-weight: 500;
  color: white;
  background: #6d2fef;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  line-height: 1.5;
  font-weight: 700;
`;

export const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WithdrawButton = styled.div`
  width: 70vw;
  color: #a0a0a0;
  text-align: center;
  font-size: 0.9em;
  font-weight: 500;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

export const ComplainReplyContainer = styled.div`
  width: 75vw;
  margin-right: 15vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ComplainReply = styled.div`
  width: fit-content;
  font-size: 0.9em;
  font-weight: 500;
  color: black;
  background: #dfdfdf;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  line-height: 1.5;
`;
