import styled from "styled-components";
import ICON_NAVER from '../../assets/ic_login_naver.png'

const NaverLoginWrapper = styled.button`
  position: relative;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #22C75A;
  border: none;
  img {
    position: absolute;
    left: 34px;
    width: 16px;
    height: 16px;
  }
`;

const Text = styled.span`
  font-family: "Noto Sans KR";
  font-weight: 400;
  text-align: center;
  vertical-align: top;
  letter-spacing: -0.05em;
  font-size: 14px;
  line-height: auto;
  color: #FFFFFF;
`;

const NaverLoginButton = () => {
  return (
      <NaverLoginWrapper>
        <img src={ICON_NAVER} alt="kakao" />
        <Text>네이버 로그인</Text>
      </NaverLoginWrapper>
  );
};

export default NaverLoginButton;