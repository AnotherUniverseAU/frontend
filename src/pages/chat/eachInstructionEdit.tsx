import * as S from "src/styles/chat/room.ts";

interface TutorialContainerProps {
  text: string;
}

const TutorialContainer: React.FC<TutorialContainerProps> = ({ text }) => {
  const text_list = [];
  for (let i in text.split("\n")) {
    text_list.push({ text: text.split("\n")[i], id: i });
  }

  return (
    <S.TutorialTextContainer>
      {text_list.map((e) => {
        return <S.ChatTutorialText key={e.id}>{e.text}</S.ChatTutorialText>;
      })}
    </S.TutorialTextContainer>
  );
};

export default TutorialContainer;
