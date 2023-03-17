import styled from 'styled-components';
import { Link } from 'react-router-dom';
import signup from '../api/signup';
import { useState, useEffect, useRef } from 'react';

const SignupPage = () => {
  const [errorMessage, setErrorMessage] = useState({ field: '', message: '' });

  function handleSignup(e: any) {
    e.preventDefault();
    const member = {
      email: e.target[0].value,
      nickname: e.target[1].value,
      password: e.target[2].value,
      passwordcheck: e.target[3].value,
    };
    if (member.password === member.passwordcheck) return signup(member.email, member.password, member.nickname, setErrorMessage);
    else setErrorMessage({ field: 'passwordcheck', message: '비밀번호를 다시 확인해주세요.' });
  }

  useEffect(() => {}, [errorMessage]);

  return (
    <SignupWrapper>
      <Title>PPONG</Title>
      <InputContainer onSubmit={handleSignup}>
        <InputText>이메일</InputText>
        <SignupInput name="email" type="id" placeholder="이메일"></SignupInput>
        {errorMessage.field === 'email' ? <VaildCheckText>{errorMessage.message}</VaildCheckText> : null}
        <InputText>닉네임</InputText>
        <SignupInput name="nickname" type="text" placeholder="닉네임"></SignupInput>
        {errorMessage.field === 'nickname' ? <VaildCheckText>{errorMessage.message}</VaildCheckText> : null}
        <InputText>비밀번호</InputText>
        <SignupInput name="password" type="password" placeholder="비밀번호"></SignupInput>
        {errorMessage.field === 'password' ? <VaildCheckText>{errorMessage.message}</VaildCheckText> : null}
        <InputText>비밀번호 확인</InputText>
        <SignupInput name="passwordcheck" type="password" placeholder="비밀번호 확인"></SignupInput>
        {errorMessage.field === 'passwordcheck' ? <VaildCheckText>{errorMessage.message}</VaildCheckText> : null}
        <SignupButton type="submit" onClick={() => setErrorMessage({ field: '', message: '' })}>
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
const VaildCheckText = styled.span`
  text-align: center;
  letter-spacing: -0.05em;
  font-family: 'Noto Sans KR';
  font-weight: 500;
  font-size: 12px;
  color: red;
  opacity: 0.8;
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
    /* outline-color: red; */
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
