import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import getCookie from '../utils/cookieUtils';
import { useDispatch, useSelector } from 'react-redux';
import { setNickname } from '../store/actions';
import { RootState } from '../store/store';

const UserEditPage = () => {
  const dispatch = useDispatch();
  const nickname = useSelector((state: RootState) => state.user.nickname);
  const [newNickname, setNewNickname] = useState(nickname);
  const [isNameError, setIsNameError] = useState(true);
  const [isNowPasswordError, setIsNowPasswordError] = useState(true);
  const [isNewPasswordError, setIsNewPasswordError] = useState(true);

  const handleNameChange = (e: any) => {
    setNewNickname(e.target.value);
  };

  const handleNicknameChange = (e: any) => {
    e.preventDefault();
    if (nickname === newNickname) {
      setIsNameError(false);
    } else {
      setIsNameError(true);

      const headers = {
        Authorization: getCookie('accessToken'),
      };

      axios
        .patch(
          `${process.env.REACT_APP_BASE_URL}/members/nickname`,
          { nickname: e.target[0].value },
          { headers }
        )
        .then((response) => {
          setNewNickname(response.data);
          dispatch(setNickname(response.data));
          alert('닉네임이 변경되었습니다.');
        })
        .catch((err) => {
          console.log(err);
          alert('닉네임에 실패했습니다. 다시 시도해주세요.');
          console.log(headers);
        });
    }
  };

  const handlePasswordChange = (e: any) => {
    e.preventDefault();
    if (e.target[1].value !== e.target[2].value) {
      setIsNewPasswordError(false);
    } else {
      setIsNewPasswordError(true);
      const headers = {
        Authorization: getCookie('accessToken'),
      };
      axios
        .patch(
          `${process.env.REACT_APP_BASE_URL}/members/password`,
          { password: e.target[0].value, changePassword: e.target[1].value },
          { headers }
        )
        .then((response) => {
          setIsNowPasswordError(true);
          alert('비밀번호가 변경되었습니다.');
        })
        .catch((err) => {
          console.log(err);
          setIsNowPasswordError(false);
        });
    }
  };

  return (
    <UserEditPageWrapper>
      <NicknameContainer>
        <InputText>닉네임</InputText>
        <NicknameForm onSubmit={handleNicknameChange}>
          <NameInput
            name="nickname"
            type="text"
            value={newNickname || ''}
            onChange={handleNameChange}
          ></NameInput>
          <NameEditButton type="submit">닉네임 변경</NameEditButton>
        </NicknameForm>
        {isNameError === false ? (
          <div className="err">변경사항이 없습니다.</div>
        ) : null}
      </NicknameContainer>

      <InputPasswordContainer onSubmit={handlePasswordChange}>
        <InputText>현재 비밀번호</InputText>
        <PasswordEditInput
          name="nowPassword"
          placeholder="현재 비밀번호를 입력해주세요."
          type="password"
        ></PasswordEditInput>
        {isNowPasswordError === false ? (
          <div className="err">현재 비밀번호와 일치하지 않습니다.</div>
        ) : null}
        <InputText>새 비밀번호</InputText>
        <PasswordEditInput
          name="newPassword"
          placeholder="변경할 비밀번호를 입력해주세요."
          type="password"
        ></PasswordEditInput>
        <InputText>새 비밀번호 확인</InputText>
        <PasswordEditInput
          name="passwordCheck"
          placeholder="변경할 비밀번호를 한 번 더 입력해주세요."
          type="password"
        ></PasswordEditInput>
        {isNewPasswordError === false ? (
          <div className="err">변경할 비밀번호를 제대로 입력해 주세요</div>
        ) : null}
        <PasswordEditButton type="submit">비밀번호 변경</PasswordEditButton>
      </InputPasswordContainer>

      <UserEditText>
        <Link to="/removeaccount">탈퇴</Link>
      </UserEditText>
    </UserEditPageWrapper>
  );
};
const UserEditPageWrapper = styled.div`
  user-select: none;
  height: 844px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  gap: 10px;
  padding: 0px 16px;

  input::placeholder {
    font-family: 'Noto Sans';
    font-size: var(--font-size12);
    letter-spacing: -0.05em;
    color: #abaeb4;
  }
  .err {
    text-align: center;
    letter-spacing: -0.05em;
    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-size: var(--font-size12);
    color: red;
    opacity: 0.8;
    margin-left: 5px;
  }
  input:focus {
    outline: 0.1px solid var(--color-mobMain);
    color: var(--color-black01);
    background-color: var(--color-white01);
    box-shadow: 0px 0.5px 1px rgba(255, 96, 124, 1);
  }
`;
const NicknameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;
const NicknameForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 10px;
  input::placeholder {
    font-family: 'Noto Sans';
    font-size: var(--font-size12);
    letter-spacing: -0.05em;
    color: #abaeb4;
  }
  .err {
    text-align: center;
    letter-spacing: -0.05em;
    font-family: 'Noto Sans KR';
    font-weight: 500;
    font-size: var(--font-size12);
    color: red;
    opacity: 0.8;
  }
`;

const NameInput = styled.input`
  width: calc(100% - 10px);
  height: 48px;
  background: #eeeeef;
  border: none;
  border-radius: 5px;
  padding-left: 10px;
  color: var(--color-gray01);
`;
const InputText = styled.div`
  font-family: 'Noto Sans KR';
  font-weight: 400;
  font-size: var(--font-size14);
  color: var(--color-black01);
  margin-top: 16px;
  padding-bottom: 10px;
`;

const NameEditButton = styled.button`
  margin-top: 15px;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  background-color: #ff607c;
  color: var(--color-white01);
  font-family: 'Noto Sans KR';
  font-size: var(--font-size14);
`;

const InputPasswordContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 18px;
  margin-top: 12px;
  padding-top: 10px;
  border-top: solid 0.5px var(--color-gray04);
`;
const PasswordEditInput = styled.input`
  width: calc(100% - 8px);
  height: 48px;
  background: #eeeeef;
  border: none;
  border-radius: 5px;
  padding-left: 10px;
`;

const PasswordEditButton = styled.button`
  margin-top: 15px;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  background-color: #ff607c;
  color: var(--color-white01);
  font-family: 'Noto Sans KR';
  font-size: var(--font-size14);
`;
const UserEditText = styled.span`
  font-family: 'Noto Sans KR';
  font-size: var(--font-size14);
  color: #878b93;
  text-align: center;
  letter-spacing: -0.05em;
  a {
    color: var(--color-gray03);
    font-weight: 500;
  }
`;
export default UserEditPage;
