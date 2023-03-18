import styled from 'styled-components';
import { ReactComponent as ICON_HOME } from '../assets/ic_bottomnav_home_button.svg';
import { ReactComponent as ICON_JANSORI } from '../assets/ic_bottomnav_jansori_button.svg';
import { ReactComponent as ICON_WRITE } from '../assets/ic_bottomnav_write_button.svg';
import { ReactComponent as ICON_RANK } from '../assets/ic_bottomnav_rank_button.svg';
import { ReactComponent as ICON_MYPAGE } from '../assets/ic_bottomnav_mypage_button.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const BottomNav = () => {
  const navigate = useNavigate();
  const [clickedMenu, setClickedMenu] = useState('');

  const menuData = [
    { id: 'home', icon: ICON_HOME, text: '홈', link: '/' },
    {
      id: 'nagging',
      icon: ICON_JANSORI,
      text: '잔소리',
      link: '/NaggingBoard',
    },
    { id: 'editor', icon: ICON_WRITE, link: '/Editor' },
    {
      id: 'rank',
      icon: ICON_RANK,
      text: '랭킹',
      link: '/Rank',
    },
    {
      id: 'mypage',
      icon: ICON_MYPAGE,
      text: '마이페이지',
      link: '/MyPage',
    },
  ];

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
  max-width: calc(720px - 32px);
  z-index: 3000;
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
  font-size: 10px;
  color: ${(props) => props.color};
`;

export default BottomNav;
