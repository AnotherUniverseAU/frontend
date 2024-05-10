import * as S from './blockedMainImage.ts';
import React from 'react';

export const BlockedMainImage: React.FC = () => {
    return (
        <S.Container>
            <S.BlockedText>차단된 캐릭터입니다</S.BlockedText>
        </S.Container>
    );
};
