import styled from "styled-components";
import ButtonStyled from "../components/ButtonStyled";
import { useNavigate } from "react-router-dom";

const RemoveAccountPage = () => {
  const navigate = useNavigate();
  const nickname = localStorage.getItem("nickname");
  return (
    <RemoveWrapper>
      <TitleWrapper>회원 탈퇴</TitleWrapper>
      <TextWrapper style={{ whiteSpace: "pre-wrap" }}>
        {`${nickname} 님과 이별인가요? 너무 아쉬워요 
        계정을 삭제하면 티어, 랭킹, 게시글등
        모든 활동정보가 삭제됩니다.
        또한, 현재 계정으로는 다시 로그인할 수없습니다.

        `}
        <span>정말 계정을 삭제하시겠습니까?</span>
      </TextWrapper>
      <ButtonWrapper>
        <ButtonStyled
          color="normal"
          title="네, 삭제할래요"
          width="161px"
        ></ButtonStyled>
        <ButtonStyled
          color="pink"
          title="아니요, 더 사용해볼래요"
          width="161px"
          buttonClickHandler={() => navigate(`/mypage`)}
        ></ButtonStyled>
      </ButtonWrapper>
    </RemoveWrapper>
  );
};

export default RemoveAccountPage;

const RemoveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 117px 16px 0 16px;
  gap: 20px;
  width: calc(100% - 32px);
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: var(--color-mobMain);
  font-weight: 600;
  font-size: 22px;
  letter-spacing: var(--font-spacing-title);
`;
// const text1 = styled.div`
//   text-align: left;
//   vertical-align: middle;
//   font-size: 22px;
//   font-family: Roboto;
//   letter-spacing: -5%;
//   line-height: auto;
//   color: #ff607c;
// `;
// const Frame43 = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   padding: 0.625rem;
//   gap: 0.625rem;
//   background-color: #ffffff;
// `;

const TextWrapper = styled.div`
  text-align: center;
  vertical-align: middle;
  font-size: 16px;
  font-family: undefined;
  letter-spacing: -5%;
  line-height: auto;
  font-weight: 100;
  line-height: 21.79px;
  letter-spacing: var(--font-spacing-title);
  padding: 10px 0;
  span {
    letter-spacing: var(--font-spacing-title);
    color: var(--color-mobMain);
    font-weight: var(--font-weight700);
    line-height: 21.79px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 23px 0;
`;
