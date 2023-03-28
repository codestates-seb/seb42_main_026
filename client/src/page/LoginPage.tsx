import styled from 'styled-components';
import GoogleLoginButton from '../container/login/GoogleLoginButton';
import KakaoLoginButton from '../container/login/KakaoLoginButton';
import NaverLoginButton from '../container/login/NaverLoginButton';
import ButtonStyled from '../components/ButtonStyled';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const { loginHandler } = useAuth();

  function handleLogin(e: any) {
    e.preventDefault();
    const member = {
      username: e.target[0].value,
      password: e.target[1].value,
    };
    loginHandler(member.username, member.password); // 리덕스
  }

  return (
    <LoginWrapper>
      <InputContainer onSubmit={handleLogin}>
        <LoginInput name="email" type="text" placeholder="이메일"></LoginInput>
        <LoginInput
          name="password"
          type="password"
          placeholder="비밀번호"
        ></LoginInput>
        <ButtonStyled type="submit" color="pink" title="로그인"></ButtonStyled>
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
      <SignupText>
        PPONG에 처음이세요? <Link to="/signup">회원가입</Link>
      </SignupText>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.section`
  position: relative;
  /* top: 92px; */
  width: 100%;
  user-select: none;
  align-self: stretch;
  height: calc(100vh - 174px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  gap: 10px;
`;

const SignupText = styled.span`
  font-family: 'Noto Sans KR';
  font-size: var(--font-size14);
  color: #878b93;
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
  font-family: 'Noto Sans KR';
  font-weight: 400;
  font-size: var(--font-size14);
  color: #abaeb4;
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

const InputContainer = styled.form`
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
    font-family: 'Noto Sans';
    font-size: var(--font-size12);
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
