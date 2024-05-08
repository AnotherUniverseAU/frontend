import { BackHeader } from 'src/components/header/back/backHeader.tsx';
import { ListTitle } from 'src/components/listTitle/listTitle.tsx';
import { TextFooter } from 'src/components/footer/text/textFooter.tsx';
import * as S from 'src/styles/home/contributeInfo.ts';

export const ContributeInfo = () => {
    return (
        <S.Container>
            <BackHeader route="/createInfo" title="AI 캐릭터 만들기" />
            <S.SubContainer className="container">
                <S.TitleContainer>
                    <S.Title>
                        <S.Highlight>기존</S.Highlight> 캐릭터를 보완하면
                    </S.Title>
                    <S.Title>
                        <S.Highlight>Contributor</S.Highlight>로 등록 돼요.
                    </S.Title>
                </S.TitleContainer>
                <S.ListContainer>
                    <ListTitle listNumber={1} listText="등록 검토 기간" textColor="black" />
                    <S.ListContent>
                        <S.Underline>최대 1개월 소요</S.Underline>
                    </S.ListContent>
                </S.ListContainer>
                <S.ListContainer>
                    <ListTitle listNumber={2} listText="등록 반려 사유" textColor="black" />
                    <S.ListContent>캐릭터/작품/이미지 정보가 불충분 할 경우</S.ListContent>
                </S.ListContainer>
                <S.AdditionalInfo>부적절하거나 불쾌감을 줄 수 있는 컨텐츠는 제재를 받을 수 있습니다.</S.AdditionalInfo>
                <S.AdditionalInfo>
                    타당한 사유로 3회 이상 신고를 받은 유저는 캐릭터를 만들 수 없습니다.
                </S.AdditionalInfo>
                <S.ListContainer>
                    <ListTitle listNumber={3} listText="등록 심사 결과" textColor="black" />
                    <S.ListContent>등록 심사 통과 시 채팅 추가 화면에</S.ListContent>
                    <S.LineTranslation>
                        <S.Underline>Contributor 배지</S.Underline>가 추가됩니다.
                    </S.LineTranslation>
                </S.ListContainer>
            </S.SubContainer>
            <TextFooter route="/create " text="확인했어요" />
        </S.Container>
    );
};
