import styled from 'styled-components';
import { Link } from 'react-router-dom';
import signup from '../api/signup';

const SignupPage = () => {
  function handleSignup(e: any) {
    e.preventDefault();
    const member = {
      email: e.target[0].value,
      nickname: e.target[1].value,
      password: e.target[2].value,
      passwordcheck: e.target[3].value,
    };
    if ((member.email || member.nickname || member.password || member.passwordcheck) === '') return window.alert('빈칸을 채워주세요.');
    if (member.password === member.passwordcheck) return signup(member.email, member.password, member.nickname);
  }

  return (
    <SignupWrapper>
      <Title>PPONG</Title>
      <InputContainer onSubmit={handleSignup}>
        <InputText>이메일</InputText>
        <SignupInput name="email" type="text" placeholder="이메일"></SignupInput>
        <InputText>닉네임</InputText>
        <SignupInput name="nickname" type="text" placeholder="닉네임"></SignupInput>
        <InputText>비밀번호</InputText>
        <SignupInput name="password" type="password" placeholder="비밀번호"></SignupInput>
        <InputText>비밀번호 확인</InputText>
        <SignupInput name="passwordcheck" type="password" placeholder="비밀번호 확인"></SignupInput>
        <SignupButton type="submit">
          <SignupButtonText>회원가입</SignupButtonText>
        </SignupButton>
      </InputContainer>
      <ContourContainer>
        <ContourLine></ContourLine>
        <ContourText>또는</ContourText>
      </ContourContainer>
      <SignupText>
        <Link to="/login">로그인 하러가기</Link>
      </SignupText>
    </SignupWrapper>
  );
};

const SignupText = styled.span`
  padding-top: 20px;
  font-family: 'Noto Sans KR';
  font-size: 14px;
  color: #878b93;
  text-align: center;
  letter-spacing: -0.05em;
  a {
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
  font-size: 14px;
  color: #abaeb4;
`;

const SignupWrapper = styled.div`
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

const SignupButton = styled.button`
  margin-top: 12px;
  height: 55px;
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  background-color: #ff607c;
`;
const SignupButtonText = styled.span`
  font-family: 'Noto Sans KR';
  font-size: 14px;
  color: #ffffff;
  letter-spacing: -0.05em;
`;

const Title = styled.span`
  font-family: 'Roboto';
  color: #ff607c;
  text-align: center;
  font-weight: 900;
  font-size: 40px;
  letter-spacing: -0.05em;
`;

const SignupInput = styled.input`
  /* Frame 23 */
  align-self: stretch;
  height: 48px;
  /* Gray 04 */
  background: #eeeeef;
  border: none;
  border-radius: 5px;
  padding-left: 8px;
`;

const InputText = styled.span`
  font-family: 'Noto Sans KR';
  font-weight: 400;
  font-size: 14px;
  padding: 4px 0px;
  color: #abaeb4;
`;

const InputContainer = styled.form`
  align-self: stretch;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  input:focus {
    outline: none;
  }
  input::placeholder {
    font-family: 'Noto Sans';
    font-size: 12px;
    letter-spacing: -0.05em;
    color: #abaeb4;
  }
`;

export default SignupPage;
