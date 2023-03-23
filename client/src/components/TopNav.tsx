import styled from 'styled-components';
import { ReactComponent as ICON_ALARM } from '../assets/ic_topnav_alarm_button.svg';
import { ReactComponent as ICON_BADGE } from '../assets/ic_topnav_alarm_badge.svg';
import { ReactComponent as ICON_LOGO } from '../assets/ic_topnav_logo_button.svg';
import { ReactComponent as ICON_BACK } from '../assets/ic_topnav_back_button.svg';
import { ReactComponent as ICON_MENU } from '../assets/ic_answer_menubutton.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePage } from '../hooks/usePage';
import getCookie from '../utils/cookieUtils';
import axios from 'axios';
import MenuButton from './MenuButton';
import { useState } from 'react';
import { getUser } from '../utils/getUser';

export default function TopNav() {
  const navigate = useNavigate();
  const history = useLocation();
  const { getEditorHandler, pushPostHandler, getPostDetailHandler } = usePage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getTitle = () => {
    switch (history.pathname) {
      case '/':
        return '';
      case '/signup':
        return '회원가입';
      case '/nagging':
        return '잔소리';
      case '/rank':
        return '랭킹';
      case '/login':
        return '로그인';
      case '/mypage':
        return '마이페이지';
      case '/useredit':
        return '회원정보수정';
      case '/alarms':
        return '알림';
      case '/editor':
        return '글쓰기';
      case '/naggingboard':
        return '잔소리';
      case '/questions':
        return '';
      default:
        return '';
    }
  };

  const showBackButton = () => history.pathname !== '/';

  const postDelete = async () => {
    if (getPostDetailHandler.memberId === Number(getUser()?.memberId())) {
      try {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/questions/${getPostDetailHandler.questionId}/?memberId=${getPostDetailHandler.memberId}`, { headers: { Authorization: getCookie('accessToken') } });
        alert('삭제되었습니다.');
        return navigate('/naggingboard');
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  };

  return (
    <TopNavWrapper>
      {/* 뒤로가기 수정해야함 */}
      <LeftContainer>
        {showBackButton() ? (
          <ICON_BACK width={8} height={14} onClick={() => navigate(-1)} />
        ) : (
          <LogoTitle theme={history.pathname !== '/' ? 'normal' : undefined}>
            <ICON_LOGO width={25} height={25} />
            PPONG
          </LogoTitle>
        )}
      </LeftContainer>
      <LogoTitle theme={history.pathname !== '/' ? 'normal' : undefined}>{getTitle()}</LogoTitle>
      <RightContainer>
        {history.pathname === '/' && (
          <>
            <ICON_ALARM onClick={() => navigate('/alarms')} />
            <ICON_BADGE />
          </>
        )}
        {history.pathname === '/editor' && (
          <TopNavEditorButton id="editorBtn" disabled={getEditorHandler.title === '' && getEditorHandler.content === '' && getEditorHandler.tag === ''} onClick={pushPostHandler}>
            완료
          </TopNavEditorButton>
        )}
        {history.pathname.slice(0, 10) === '/questions' && getPostDetailHandler.memberId === getUser()?.memberId() && (
          <>
            <ICON_MENU onClick={() => setIsMenuOpen(!isMenuOpen)} />
            {isMenuOpen === true ? (
              <MenuButton
                menu={[
                  {
                    title: '갱생 변경',
                    button: function () {
                      console.log('수정');
                    },
                  },
                  {
                    title: '수정',
                    button: function () {
                      console.log('수정');
                    },
                  },
                  {
                    title: '삭제',
                    button: function () {
                      if (window.confirm('정말 삭제 하시겠습니까?')) {
                        setIsMenuOpen(false);
                        return postDelete();
                      }
                    },
                  },
                ]}
              />
            ) : null}
            {/* <button>수정</button>
            <button onClick={postDelete}>삭제</button> */}
          </>
        )}
      </RightContainer>
    </TopNavWrapper>
  );
}

const TopNavEditorButton = styled.button`
  border: none;
  font-size: var(--font-size14);
  white-space: nowrap;
  background-color: var(--color-white01);
`;

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
