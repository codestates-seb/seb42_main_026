import styled from "styled-components";
import GoogleLoginButton from "../container/login/GoogleLoginButton";
import KakaoLoginButton from "../container/login/KakaoLoginButton";
import NaverLoginButton from "../container/login/NaverLoginButton";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
      <LoginWrapper>
        <Title>PPONG</Title>
        <InputContainer>
          <LoginInput placeholder="이메일"></LoginInput>
          <LoginInput placeholder="비밀번호"></LoginInput>
          <LoginButton>
            <LoginText>로그인</LoginText>
          </LoginButton>
        </InputContainer>
        <ContourContainer>
          <ContourLine></ContourLine>
          <ContourText>또는</ContourText>
        </ContourContainer>
        <SocialContainer>
          <GoogleLoginButton />
          <KakaoLoginButton />
          <NaverLoginButton />
        </SocialContainer>
        <SignupText>PPONG에 처음이세요? <Link to='/signup'>회원가입</Link></SignupText>
      </LoginWrapper>
  );
};
const SignupText = styled.span`
  font-family: "Noto Sans KR";
  font-size: 14px;
  color: #878B93;
  text-align: center;
  letter-spacing: -0.05em;
  a {
    padding-left: 8px;
    color: #ff607c;
    font-weight: 500;
  }
`;

const ContourContainer = styled.div`
  position: relative;
  display: flex;
  align-self: stretch;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 30px;
`;

const ContourLine = styled.div`
  align-self: stretch;
  border: 0.5px solid;
  border-color: #abaeb4;
`;
const ContourText = styled.span`
  position: absolute;
  width: 62px;
  text-align: center;
  letter-spacing: -0.05em;
  background-color: #ffffff;
  font-family: "Noto Sans KR";
  font-weight: 400;
  font-size: 14px;
  color: #abaeb4;
`;

const LoginWrapper = styled.div`
  user-select: none;
  align-self: stretch;
  height: 844px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  gap: 10px;
`;

const LoginButton = styled.button`
  height: 55px;
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  background-color: #ff607c;
`;
const LoginText = styled.span`
  font-family: "Noto Sans KR";
  font-size: 14px;
  color: #ffffff;
  letter-spacing: -0.05em;
`;

const Title = styled.span`
  font-family: "Roboto";
  color: #ff607c;
  text-align: center;
  font-weight: 900;
  font-size: 40px;
  letter-spacing: -0.05em;
`;

const LoginInput = styled.input`
  /* Frame 23 */
  align-self: stretch;
  height: 48px;
  /* Gray 04 */
  background: #eeeeef;
  border: none;
  border-radius: 5px;
  padding-left: 8px;
`;

const InputContainer = styled.div`
  align-self: stretch;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const SocialContainer = styled.div`
  display: flex;
  align-self: stretch;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  gap: 10px;
  button {
    align-self: stretch;
    height: 50px;
  }
`;

export default LoginPage;
