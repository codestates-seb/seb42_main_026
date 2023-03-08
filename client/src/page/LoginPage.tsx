import styled from "styled-components";

const LoginWrapper = styled.div`
  width: 390px;
  height: 844px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
const LoginButton = styled.button`
  width: 348px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  background-color: #ff607c;
`;
const LoginText = styled.span`
  font-family: "Noto Sans KR";
  color: #ffffff;
  letter-spacing: -0.05em;
`;

const Title = styled.span`
  font-family: "Roboto";
  color: #ff607c;
  font-weight: 900;
  font-size: 40px;
  letter-spacing: -0.05em;
`;

const LoginInput = styled.input`
  /* Frame 23 */
  width: 340px;
  height: 48px;
  /* Gray 04 */
  background: #eeeeef;
  border: none;
  border-radius: 5px;
  padding-left: 8px;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 19px 20px;
  gap: 12px;
  input:focus {
    outline: none;
  }
  input::placeholder {
    font-family: "Noto Sans";
    font-size: 12px;
    letter-spacing: -0.05em;
    color: #abaeb4;
  }
`;

const LoginPage = () => {
  return (
    <div>
      <LoginWrapper>
        <Title>PPONG</Title>
        <InputContainer>
          <LoginInput placeholder="이메일"></LoginInput>
          <LoginInput placeholder="비밀번호"></LoginInput>
          <LoginButton>
            <LoginText>로그인</LoginText>
          </LoginButton>
        </InputContainer>
      </LoginWrapper>
    </div>
  );
};

export default LoginPage;
