import * as S from './blockedStyledImage.ts';
import React from 'react';

export const BlockedStyledImage: React.FC = () => {
    return (
        <S.Container>
            <S.BlockedText>차단된 캐릭터입니다</S.BlockedText>
        </S.Container>
    );
};
