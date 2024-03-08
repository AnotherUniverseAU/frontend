import * as S from "./listTitle.ts";

export const ListTitle = ({
  listNumber,
  listText,
  textColor,
}: {
  listNumber: number;
  listText: string;
  textColor: string;
}) => {
  return (
    <S.ListContainer>
      <S.ListNumber>{listNumber}</S.ListNumber>
      <S.ListText style={{ color: textColor }}>{listText}</S.ListText>
    </S.ListContainer>
  );
};
