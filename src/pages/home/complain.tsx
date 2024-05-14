import * as S from "src/styles/home/complain.ts";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BackHeader } from "src/components/header/back/backHeader.tsx";
import { TextFooter } from "src/components/footer/text/textFooter.tsx";

import { StyledInput } from "src/components/styledInput/styledInput.tsx";

import { apiRequestPost } from "src/apis/apiRequestPost";
import { ListTitle } from "src/components/listTitle/listTitle.tsx";

export const Complain = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [complainment, setComplainment] = useState("");
  const [isRejected, setIsRejected] = useState<boolean | undefined>(undefined);

  const handleReject = (choice: boolean) => {
    setIsRejected(choice);
  };

  const nicknameEditRequest = async () => {
    await apiRequestPost(`/character/complain/${params.id}`, {
      isRejected: isRejected,
      complainment: complainment,
    });
    setTimeout(() => {
      navigate(`/`);
    }, 1500);
  };

  return (
    <S.Container>
      <BackHeader type="each" title="캐릭터 차단" />
      <S.InfoContainer className="container">
        <ListTitle
          listNumber={1}
          listText="캐릭터를 차단하시겠습니까?"
          textColor="black"
        />
        <S.BlockInfo>차단 시, 해당 캐릭터를 앱에서 볼 수 없습니다.</S.BlockInfo>
        <S.ButtonsContainer>
          <S.Button
            onClick={() => handleReject(false)}
            isSelected={!isRejected}
          >
            아니오
          </S.Button>
          <S.Button onClick={() => handleReject(true)} isSelected={isRejected}>
            예
          </S.Button>
        </S.ButtonsContainer>
        <ListTitle
          listNumber={2}
          listText="차단 사유 (선택사항)"
          textColor="black"
        />
        <StyledInput
          placeholder="신고 내용에 따라 해당 캐릭터가
                    앱에서 영구 삭제될 수 있습니다."
          content={complainment}
          setContent={setComplainment}
          limit={200}
          height="10rem"
          marginTop="1rem"
        />
      </S.InfoContainer>
      <TextFooter route="/" text="차단하기" onClick={nicknameEditRequest} />
    </S.Container>
  );
};
