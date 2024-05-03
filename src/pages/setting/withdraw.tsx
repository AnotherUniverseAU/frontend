import { BackHeader } from "src/components/header/back/backHeader.tsx";
import { TextFooter } from "src/components/footer/text/textFooter.tsx";
import { ComplainFooter } from "src/components/footer/complain/complainFooter.tsx";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import * as S from "src/styles/setting/withdraw";
import { BackgroundFull } from "src/components/background/background";
import { apiRequestPost } from "src/apis/apiRequestPost";

export const Withdraw = () => {
  const location = useLocation();
  const { nickname } = location.state;

  const [selectedOption, setSelectedOption] = useState(0);
  const [complain, setComplain] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [realWithdraw, setRealWithdraw] = useState(false);
  const [failWithdraw, setFailWithdraw] = useState(false);

  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setRealWithdraw(false);
    setFailWithdraw(false);
  };

  const onWithDraw = () => {
    apiRequestPost("/user/withdraw", {
      cancelType: selectedOption,
      reason: complain,
      nickname,
    }).then((res) => {
      if (res && res.msg === "deleted") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setRealWithdraw(true);
      } else {
        setFailWithdraw(true);
      }
    });
  };

  useEffect(() => {
    setComplain("");
  }, [selectedOption]);

  const withdrawEnd = () => {
    navigate("/login");
  };

  return (
    <S.Container>
      {isModalOpen && !realWithdraw && (
        <S.StyledModal open={isModalOpen}>
          <S.ModalContainer>
            <S.ModalText>정말 탈퇴하시겠습니까?</S.ModalText>
            <S.ModalButtonContainer>
              <S.ModalLeftButton onClick={onWithDraw}>탈퇴</S.ModalLeftButton>
              <S.ModalRightButton onClick={closeModal}>취소</S.ModalRightButton>
            </S.ModalButtonContainer>
          </S.ModalContainer>
        </S.StyledModal>
      )}
      {isModalOpen && realWithdraw && (
        <S.StyledModal open={isModalOpen}>
          <S.ModalContainer>
            <S.ModalText>탈퇴가 완료되었습니다</S.ModalText>
            <S.ModalButtonContainer>
              <S.ModalFullButton onClick={withdrawEnd}>확인</S.ModalFullButton>
            </S.ModalButtonContainer>
          </S.ModalContainer>
        </S.StyledModal>
      )}
      {isModalOpen && failWithdraw && (
        <S.StyledModal open={isModalOpen}>
          <S.ModalContainer>
            <S.ModalText>탈퇴에 실패했습니다</S.ModalText>
            <S.ModalButtonContainer>
              <S.ModalFullButton onClick={closeModal}>확인</S.ModalFullButton>
            </S.ModalButtonContainer>
          </S.ModalContainer>
        </S.StyledModal>
      )}
      <BackHeader route="/profile" title={"회원탈퇴"} />
      <div className="container">
        <S.TitleContainer>
          <S.SubTitle>{nickname}님이 떠나신다니 아쉬워요</S.SubTitle>
          <S.Title>{nickname}님이 탈퇴하시려는 이유가 궁금해요</S.Title>
        </S.TitleContainer>
        <S.SubContainer>
          <S.OptionContainer>
            <S.Option
              selected={selectedOption === 1}
              onClick={() => setSelectedOption(selectedOption === 1 ? 0 : 1)}
            >
              캐릭터의 채팅 내용이 맘에 들지 않아요
            </S.Option>
            <S.Option
              selected={selectedOption === 2}
              onClick={() => setSelectedOption(selectedOption === 2 ? 0 : 2)}
            >
              앱을 자주 사용하지 않아요
            </S.Option>
            <S.Option
              selected={selectedOption === 3}
              onClick={() => setSelectedOption(selectedOption === 3 ? 0 : 3)}
            >
              개인정보 유출이 우려돼요
            </S.Option>
            <S.Option
              selected={selectedOption === 4}
              onClick={() => setSelectedOption(selectedOption === 4 ? 0 : 4)}
            >
              직접 입력
            </S.Option>
          </S.OptionContainer>
          <S.ReplyContainer>
            {selectedOption === 1 && (
              <S.Reply>
                캐릭터를 더욱 쉽고 완벽하게 만들 수 있도록 빠른 시일 내에 앱을
                업데이트 할 예정입니다.
                <br /> <br />
                업데이트 이후 더욱 생생하고 재미있는 캐릭터의 채팅을 받아보실 수
                있으니, AU를 조금만 더 이용해 보시는건 어떨까요?
              </S.Reply>
            )}
            {selectedOption === 2 && (
              <S.Reply>
                캐릭터를 더욱 쉽고 완벽하게 만들 수 있도록 빠른 시일 내에 앱을
                업데이트 할 예정입니다.
                <br /> <br />
                업데이트 이후 더욱 생생하고 재미있는 캐릭터의 채팅을 받아보실 수
                있으니, AU를 조금만 더 이용해 보시는건 어떨까요?
              </S.Reply>
            )}
            {selectedOption === 3 && (
              <S.Reply>
                캐릭터와의 대화 내역을 비롯한 이용자님의 정보는 {}
                <b>절대로 타인에게 노출되지 않아요.</b> <br /> <br />
                AU는 이용자님의 {}
                <b>개인정보 보호를 위해 최선</b>을 다하고 있으니, AU를 조금만 더
                이용해 보시는건 어떨까요?
              </S.Reply>
            )}{" "}
            {selectedOption === 4 && (
              <S.Reply>
                사용하면서 <b>불편하셨던 내용</b>을 알려주시면 더 나은 서비스를
                제공할 수 있도록 노력하겠습니다.
              </S.Reply>
            )}
          </S.ReplyContainer>
          {complain && (
            <S.OptionContainer>
              <S.Complain>{complain}</S.Complain>
            </S.OptionContainer>
          )}
          {complain && selectedOption === 4 && (
            <S.ComplainReplyContainer>
              <S.ComplainReply>
                이용자님의 불편 사항을 이해했습니다. 해당 불편 사항을 빠르게
                해결 할 예정이니, AU를 조금만 더 이용해 보시는건 어떨까요?
              </S.ComplainReply>
            </S.ComplainReplyContainer>
          )}
        </S.SubContainer>
        {(selectedOption === 1 ||
          selectedOption === 2 ||
          selectedOption === 3 ||
          (complain && selectedOption === 4)) && (
          <S.FooterContainer>
            <S.WithdrawButton onClick={openModal}>
              그래도 탈퇴할래요
            </S.WithdrawButton>
            <TextFooter route="/profile" text={"더 사용해볼래요"} />
          </S.FooterContainer>
        )}
      </div>
      {!complain && selectedOption === 4 && (
        <S.FooterContainer>
          <ComplainFooter setChatMessage={setComplain} />
        </S.FooterContainer>
      )}
      <BackgroundFull color="#f2f3f6" />
    </S.Container>
  );
};
