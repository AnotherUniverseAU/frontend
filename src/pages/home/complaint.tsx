import * as S from 'src/styles/home/complaint';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BackHeader } from 'src/components/header/back/backHeader.tsx';
import { TextFooter } from 'src/components/footer/text/textFooter.tsx';

import { StyledInput } from 'src/components/styledInput/styledInput.tsx';

import { apiRequestPost } from 'src/apis/apiRequestPost';

export const Complaint = () => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    // const nickname = location.state.nickname;

    const [complaint, setComplaint] = useState('');

    const nicknameEditRequest = async () => {
        // await apiRequestPost(`/complaint/${params.id}`, { complaint: complaint });
        navigate(`/detail/${params.id}`);
    };

    return (
        <S.Container>
            <BackHeader route="/profile" type="each" title="신고하기" />
            <S.InfoContainer className="container">
                <S.Info>캐릭터의 신고 사유를 입력해주세요.</S.Info>
                <StyledInput
                    placeholder="신고 사유를 입력해주세요"
                    content={complaint}
                    setContent={setComplaint}
                    limit={200}
                    height="10rem"
                    marginTop="2rem"
                />
            </S.InfoContainer>
            <TextFooter route="/profile" text="신고하기" onClick={nicknameEditRequest} />
        </S.Container>
    );
};
