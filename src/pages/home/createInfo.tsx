import { BackHeader } from "src/components/header/back/backHeader.tsx";
import { ListTitle } from "src/components/listTitle/listTitle.tsx";
import { TextFooter } from "src/components/footer/text/textFooter.tsx";
import * as S from "src/styles/home/createInfo.ts";

export const CreateInfo = () => {
  return (
    <S.Container>
      <BackHeader route="/" title="AI 캐릭터 만들기" />
      <S.SubContainer>
        <S.TitleContainer>
          <S.Title>
            <S.Highlight>신규</S.Highlight> 캐릭터를 제작하면
          </S.Title>
          <S.Title>
            <S.Highlight>Creator</S.Highlight>로 등록 돼요.
          </S.Title>
        </S.TitleContainer>
        <S.ListContainer>
          <ListTitle
            listNumber={1}
            listText="등록 검토 기간"
            textColor="black"
          />
          <S.ListContent>
            <S.Underline>최대 3개월 소요</S.Underline>
          </S.ListContent>
        </S.ListContainer>
        <S.ListContainer>
          <ListTitle
            listNumber={2}
            listText="등록 반려 사유"
            textColor="black"
          />
          <S.ListContent>
            캐릭터/작품/이미지 정보가 불충분 할 경우
          </S.ListContent>
          <S.ListContent>
            해당 캐릭터를 우선 신청한 유저가 있을 경우
          </S.ListContent>
        </S.ListContainer>
        <S.ListContainer>
          <ListTitle
            listNumber={3}
            listText="등록 심사 결과"
            textColor="black"
          />
          {/* <S.ListContent>
            등록 심사 결과는 이메일을 통해 전달됩니다
          </S.ListContent> */}
          <S.ListContent>
            등록 승인 후 이메일을 통해 운영 방식을 안내
          </S.ListContent>
          <S.LineTranslation>드립니다</S.LineTranslation>
        </S.ListContainer>
      </S.SubContainer>
      <TextFooter route="/contributeInfo" text="확인했어요" />
    </S.Container>
  );
};
