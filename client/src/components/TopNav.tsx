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
import { getUser } from '../utils/getUser';
import { useDispatch } from 'react-redux';
import { setModal } from '../store/actions';

export default function TopNav() {
  const navigate = useNavigate();
  const history = useLocation();
  const dispatch = useDispatch();
  const { getEditorHandler, patchPostHandler, pushPostHandler, getPostDetailHandler, setEditorHandler } = usePage();

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
      case '/edit':
        return '글수정';
      case '/write':
        return '글쓰기';
      case '/naggingboard':
        return '잔소리';
      case '/questions':
        return '';
      case '/checklist':
        return '체크리스트';
      case '/myposts':
        return '내가 쓴 글';
      default:
        return '';
    }
  };

  const isHome = () => history.pathname === '/';

  const showBackButton = () => !isHome();

  const postMenuItems = [
    {
      title: '수정',
      button: async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${history.pathname}`);
          const { data } = response.data;
          if (data.tag === '운동') data.tag = 'EXERCISE';
          if (data.tag === '공부') data.tag = 'STUDY';
          if (data.tag === '기상') data.tag = 'WAKE_UP';
          if (data.tag === '기타') data.tag = 'ETC';
          setEditorHandler(data.title, data.content, data.tag, data.imgFile, data.questionImageUrl);
          navigate(`/edit/${data.questionId}`);
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    },
    {
      title: '삭제',
      button: function () {
        if (window.confirm('정말 삭제 하시겠습니까?')) {
          postDelete();
          return dispatch(setModal([], false));
        }
      },
    },
  ];

  const postDelete = async () => {
    if (getPostDetailHandler.memberId === Number(getUser()?.memberId())) {
      try {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/questions/${getPostDetailHandler.questionId}`, { headers: { Authorization: getCookie('accessToken') } });
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
      <LeftContainer>
        {showBackButton() ? (
          <ICON_BACK width={8} height={14} onClick={() => navigate(-1)} />
        ) : (
          <LogoTitle theme={isHome() ? undefined : 'normal'}>
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
        {history.pathname === '/write' && (
          <TopNavEditorButton id="editorBtn" disabled={getEditorHandler.title === '' && getEditorHandler.content === '' && getEditorHandler.tag === ''} onClick={pushPostHandler}>
            완료
          </TopNavEditorButton>
        )}
        {history.pathname.slice(0, 5) === '/edit' && (
          <TopNavEditorButton id="editorBtn" disabled={getEditorHandler.title === '' && getEditorHandler.content === '' && getEditorHandler.tag === ''} onClick={() => patchPostHandler({ id: Number(history.pathname.slice(6)) })}>
            수정
          </TopNavEditorButton>
        )}
        {history.pathname.slice(0, 10) === '/questions' && getPostDetailHandler.memberId === getUser()?.memberId() && <ICON_MENU onClick={() => dispatch(setModal(postMenuItems, true))} />}
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
  z-index: 100;
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
  padding: 0px 16px 0px 16px;
  border-bottom: 0.1px solid var(--color-gray03);
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
  font-size: var(font-size20);
  font-family: ${(props) => (props.theme === 'normal' ? `Noto Sans KR` : `Roboto`)};
  color: ${(props) => (props.theme === 'normal' ? `black01` : `var(--color-mobMain)`)};
  letter-spacing: var(--font-spacing-title);
`;
