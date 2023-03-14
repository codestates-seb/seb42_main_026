import styled from 'styled-components';
import { Link } from 'react-router-dom';

const UserEditPage = () => {
  return (
    <UserEditPageWrapper>
      <InputContainer>
        <InputText>닉네임</InputText>
        <UserEditInput placeholder="변경할 닉네임을 입력해주세요."></UserEditInput>
        <InputText>현재 비밀번호</InputText>
        <UserEditInput placeholder="현재 비밀번호를 입력해주세요."></UserEditInput>
        <InputText>새 비밀번호</InputText>
        <UserEditInput placeholder="변경할 비밀번호를 입력해주세요."></UserEditInput>
        <InputText>새 비밀번호 확인</InputText>
        <UserEditInput placeholder="변경할 비밀번호를 한 번 더 입력해주세요."></UserEditInput>
        <UserEditButton>
          <UserEditButtonText>수정하기</UserEditButtonText>
        </UserEditButton>
      </InputContainer>
      <UserEditText>
        {/* 탈퇴페이지로 수정해야함 */}
        <Link to="/RemoveAccount">탈퇴</Link>
      </UserEditText>
    </UserEditPageWrapper>
  );
};

const UserEditText = styled.span`
  font-family: 'Noto Sans KR';
  font-size: 14px;
  color: #878b93;
  text-align: center;
  letter-spacing: -0.05em;
  a {
    color: var(--color-gray03);
    font-weight: 500;
  }
`;

const UserEditPageWrapper = styled.div`
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

const UserEditButton = styled.button`
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
const UserEditButtonText = styled.span`
  font-family: 'Noto Sans KR';
  font-size: 14px;
  color: #ffffff;
  letter-spacing: -0.05em;
`;
const UserEditInput = styled.input`
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

const InputContainer = styled.div`
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

export default UserEditPage;
