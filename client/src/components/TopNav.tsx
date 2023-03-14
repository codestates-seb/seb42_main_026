import styled from 'styled-components';
import { ReactComponent as ICON_ALARM } from '../assets/ic_topnav_alarm_button.svg';
import { ReactComponent as ICON_BADGE } from '../assets/ic_topnav_alarm_badge.svg';
import { ReactComponent as ICON_LOGO } from '../assets/ic_topnav_logo_button.svg';
import { ReactComponent as ICON_BACK } from '../assets/ic_topnav_back_button.svg';
import { useAuth } from '../hooks/useAuth';
import { usePage } from '../hooks/usePage';
import { useNavigate } from 'react-router-dom';

export default function TopNav() {
  const { isLoggedIn } = useAuth();
  const { getPageHandler, setPageHandler } = usePage();
  const navigate = useNavigate();

  const getTitle = () => {
    switch (getPageHandler) {
      case 'home':
        return '';
      case 'signup':
        return '회원가입';
      case 'nagging':
        return '잔소리';
      case 'rank':
        return '랭킹';
      case 'login':
        return '로그인';
      case 'mypage':
        return '마이페이지';
      case 'UserEdit':
        return '회원정보수정';
      case 'alarms':
        return '알람';
      case 'editor':
        return '글쓰기';
      default:
        return '';
    }
  };

  const showBackButton = () => getPageHandler !== 'home';

  return (
    <TopNavWrapper>
      {/* 뒤로가기 수정해야함 */}
      <LeftContainer>
        {showBackButton() ? (
          <ICON_BACK width={8} height={14} onClick={() => navigate(-1)} />
        ) : (
          <LogoTitle theme={getPageHandler !== 'home' ? 'normal' : undefined}>
            <ICON_LOGO width={25} height={25} />
            PPONG
          </LogoTitle>
        )}
      </LeftContainer>
      <LogoTitle theme={getPageHandler !== 'home' ? 'normal' : undefined}>{getTitle()}</LogoTitle>
      <RightContainer>
        {getPageHandler === 'home' && (
          <>
            <ICON_ALARM onClick={() => setPageHandler(isLoggedIn, 'alarms', '/Alarms', true)} />
            <ICON_BADGE />
          </>
        )}
      </RightContainer>
    </TopNavWrapper>
  );
}

const TopNavWrapper = styled.header`
  position: fixed;
  z-index: 3000;
  max-width: calc(720px - 32px);
  width: calc(100% - 32px);
  top: 0;
  user-select: none;
  align-self: stretch;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-white01);
  /* padding: 44px 16px 0px 16px; */
  padding: 0px 16px 0px 16px;
  /* border-top: 1.5px solid var(--color-mobMain); */
  box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.25);
`;

const RightContainer = styled.div`
  display: flex;
  width: 32px;
  justify-content: center;
  cursor: pointer;
`;
const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  cursor: pointer;
`;

const LogoTitle = styled.span`
  gap: 4px;
  display: flex;
  font-weight: ${(props) => (props.theme === 'normal' ? `700` : `900`)};
  vertical-align: center;
  text-align: center;
  font-size: 20px;
  font-family: ${(props) => (props.theme === 'normal' ? `Noto Sans KR` : `Roboto`)};
  color: ${(props) => (props.theme === 'normal' ? `black01` : `var(--color-mobMain)`)};
  letter-spacing: var(--font-spacing-title);
`;
