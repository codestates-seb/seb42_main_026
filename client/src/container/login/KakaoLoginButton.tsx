import styled from 'styled-components';
import ICON_KAKAO from '../../assets/ic_login_kakao.svg';

const KakaoLoginWrapper = styled.button`
  position: relative;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #fee500;
  border: none;
  img {
    position: absolute;
    left: 32px;
    width: 18px;
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
  color: #3a3f44;
`;

const KakaoLoginButton = () => {
  const handleKakaoLogin = async () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/oauth2/authorization/kakao`;
  };
  return (
    <KakaoLoginWrapper onClick={handleKakaoLogin}>
      <img src={ICON_KAKAO} alt="kakao" />
      <Text>카카오 로그인</Text>
    </KakaoLoginWrapper>
  );
};

export default KakaoLoginButton;
