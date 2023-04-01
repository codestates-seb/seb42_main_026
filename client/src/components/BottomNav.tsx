import styled from 'styled-components';
import { ReactComponent as ICON_HOME } from '../assets/ic_bottomnav_home_button.svg';
import { ReactComponent as ICON_JANSORI } from '../assets/ic_bottomnav_jansori_button.svg';
import { ReactComponent as ICON_WRITE } from '../assets/ic_bottomnav_write_button.svg';
import { ReactComponent as ICON_RANK } from '../assets/ic_bottomnav_rank_button.svg';
import { ReactComponent as ICON_MYPAGE } from '../assets/ic_bottomnav_mypage_button.svg';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

const BottomNav = () => {
  const navigate = useNavigate();
  const history = useLocation();
  const [clickedMenu, setClickedMenu] = useState('');

  const menuData = [
    { id: 'home', icon: ICON_HOME, text: '홈', link: '/' },
    {
      id: 'naggingboard',
      icon: ICON_JANSORI,
      text: '잔소리',
      link: '/naggingboard',
    },
    { id: 'write', icon: ICON_WRITE, link: '/write' },
    {
      id: 'rank',
      icon: ICON_RANK,
      text: '랭킹',
      link: '/rank',
    },
    {
      id: 'mypage',
      icon: ICON_MYPAGE,
      text: '마이페이지',
      link: '/mypage',
    },
  ];

  const getTitle = () => {
    switch (history.pathname) {
      case '/':
        return setClickedMenu('home');
      case '/rank':
        return setClickedMenu('rank');
      case '/mypage':
        return setClickedMenu('mypage');
      case '/useredit':
        return setClickedMenu('mypage');
      case '/naggingboard':
        return setClickedMenu('naggingboard');
      case '/questions':
        return setClickedMenu('naggingboard');
      case '/checklist':
        return setClickedMenu('home');
      case '/myposts':
        return setClickedMenu('mypage');
      default:
        return '';
    }
  };

  useEffect(() => {
    getTitle();
  }, [history.pathname]);

  return (
    <GnbWrapper>
      {menuData.map(({ id, icon: Icon, text, link }) => (
        <MenuContainer
          key={id}
          onClick={() => {
            setClickedMenu(id);
            navigate(link);
          }}
        >
          <Icon fill={`${clickedMenu === id ? '#FF607C' : '#212123'}`} />
          <MenuText color={`${clickedMenu === id ? '#FF607C' : '#212123'}`}>{text}</MenuText>
        </MenuContainer>
      ))}
    </GnbWrapper>
  );
};

const GnbWrapper = styled.footer`
  position: fixed;
  z-index: 1;
  max-width: calc(720px - 32px);
  bottom: 0;
  width: calc(100% - 32px);
  user-select: none;
  align-self: stretch;
  height: 63px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0 16px 19px 16px;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.06);
`;

const MenuContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 48px;
  height: 48px;
`;

const MenuText = styled.span`
  text-align: center;
  letter-spacing: -0.05em;
  font-family: 'Noto Sans KR';
  font-weight: 300;
  font-size: var(--font-size10);
  color: ${(props) => props.color};
`;

export default BottomNav;
