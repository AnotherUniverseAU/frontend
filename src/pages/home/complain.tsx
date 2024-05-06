import * as S from 'src/styles/home/complain.ts';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BackHeader } from 'src/components/header/back/backHeader.tsx';
import { TextFooter } from 'src/components/footer/text/textFooter.tsx';

import { StyledInput } from 'src/components/styledInput/styledInput.tsx';

import { apiRequestPost } from 'src/apis/apiRequestPost';

export const Complain = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [complainment, setComplainment] = useState('');

    const nicknameEditRequest = async () => {
        await apiRequestPost(`/character/complain/${params.id}`, { complainment: complainment });
        navigate(`/detail/${params.id}`);
    };

    return (
        <S.Container>
            <BackHeader type="each" title="신고하기" />
            <S.InfoContainer className="container">
                <S.Info>캐릭터의 신고 사유를 입력해주세요.</S.Info>
                <StyledInput
                    placeholder="신고 사유를 입력해주세요"
                    content={complainment}
                    setContent={setComplainment}
                    limit={200}
                    height="10rem"
                    marginTop="2rem"
                />
            </S.InfoContainer>
            <TextFooter route="/profile" text="신고하기" onClick={nicknameEditRequest} />
        </S.Container>
    );
};
