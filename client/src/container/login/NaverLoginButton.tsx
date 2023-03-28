import styled from 'styled-components';
import ICON_NAVER from '../../assets/ic_login_naver.png';

const NaverLoginWrapper = styled.button`
  position: relative;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #22c75a;
  border: none;
  img {
    position: absolute;
    left: 34px;
    width: 16px;
    height: 16px;
  }
`;

const Text = styled.span`
  font-family: 'Noto Sans KR';
  font-weight: 400;
  text-align: center;
  vertical-align: top;
  letter-spacing: -0.05em;
  font-size: var(--font-size14);
  line-height: auto;
  color: #ffffff;
`;

const handleNaverLogin = async () => {
  window.location.href = `${process.env.REACT_APP_BASE_URL}/oauth2/authorization/naver`;
};

const NaverLoginButton = () => {
  return (
    <NaverLoginWrapper onClick={handleNaverLogin}>
      <img src={ICON_NAVER} alt="kakao" />
      <Text>네이버 로그인</Text>
    </NaverLoginWrapper>
  );
};

export default NaverLoginButton;
