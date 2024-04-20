import * as S from "src/styles/home/main.ts";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MainHeader } from "src/components/header/main/mainHeader.tsx";
import { MainImage } from "src/components/mainImage/mainImage.tsx";
import { StyledImage } from "src/components/styledImage/styledImage.tsx";
import { IconFooter } from "src/components/footer//icon/iconFooter.tsx";
import { Loading } from "src/pages/setting/loading.tsx";

import { apiRequestGet } from "src/apis/apiRequestGet";
import axios from "axios";
import { apiRequestPost } from "src/apis/apiRequestPost";

export const Main: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isTutorial, setIsTutorial] = useState<boolean>(
    location.state?.from === "/nickname"
  );

  const [characters, setCharacters] = useState<any[]>([]);
  const [mainCharacter, setMainCharacter] = useState<any>({});

  const [filteredCharacters, setFilteredCharacters] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("all");

  useEffect(() => {
    const fetchCharacters = async () => {
      const result = await apiRequestGet("/character/list");
      setCharacters(result.characters);
    };

    const fetchMainCharacter = async () => {
      const result = await apiRequestGet("/character/main-character");
      setMainCharacter(result.mainCharacter);
    };

    fetchCharacters();
    fetchMainCharacter();
  }, []);

  useEffect(() => {
    if (characters.length !== 0) {
      const filteredCharacters =
        selectedGenre === "all"
          ? characters
          : characters.filter(
              (character: any) => character.genre === selectedGenre
            );
      setFilteredCharacters(filteredCharacters);
    }
  }, [characters, selectedGenre]);

  return (
    <S.Container style={{ overflow: isTutorial ? "hidden" : "scroll" }}>
      {isTutorial && (
        <S.TutorialContainer>
          <S.TutorialTextContainer>
            <S.TutorialText>원하는 AI 캐릭터를</S.TutorialText>
            <S.TutorialText>직접 만들 수 있어요!</S.TutorialText>
            <S.TutorialButton onClick={() => setIsTutorial(false)}>
              OK
            </S.TutorialButton>
          </S.TutorialTextContainer>
        </S.TutorialContainer>
      )}
      <MainHeader toCreate={true} isTutorial={isTutorial} />
      <S.SubContainer>
        <S.MainContainer>
          <MainImage
            route={`/detail/${mainCharacter?.characterId}`}
            imgurl={mainCharacter.mainImageUrl}
            name={mainCharacter.name}
            title={mainCharacter.title}
            creatorNickname={mainCharacter.creatorNickname}
          />
        </S.MainContainer>
        <S.NavContainer>
          <S.ButtonNav>
            <S.StyledButton
              active={selectedGenre === "all"}
              onClick={() => setSelectedGenre("all")}
            >
              전체
            </S.StyledButton>
            <S.StyledButton
              active={selectedGenre === "anime"}
              onClick={() => setSelectedGenre("anime")}
            >
              애니
            </S.StyledButton>
            <S.StyledButton
              active={selectedGenre === "game"}
              onClick={() => setSelectedGenre("game")}
            >
              게임
            </S.StyledButton>
          </S.ButtonNav>
          <S.ImageContainer>
            {filteredCharacters.map((character: any) => (
              <S.StyledImageMargin key={character.characterId}>
                <StyledImage
                  route={`/detail/${character.characterId}`}
                  imgurl={character.coverImageUrl}
                  name={character.name}
                  title={character.title}
                  creatorNickname={character.creatorNickname}
                />
              </S.StyledImageMargin>
            ))}
          </S.ImageContainer>
        </S.NavContainer>
      </S.SubContainer>
      <IconFooter activepage="/" />
    </S.Container>
  );
};
