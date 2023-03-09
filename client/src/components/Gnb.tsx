import styled from "styled-components";
import { ReactComponent as ICON_HOME}  from '../assets/ic_gnb_home_button.svg'
import { ReactComponent as ICON_JANSORI} from '../assets/ic_gnb_jansori_button.svg'
import { ReactComponent as ICON_WRITE } from '../assets/ic_gnb_write_button.svg'
import { ReactComponent as ICON_RANK } from '../assets/ic_gnb_rank_button.svg'
import { ReactComponent as ICON_MYPAGE } from '../assets/ic_gnb_mypage_button.svg'
import { useAuth } from '../hooks/useAuth';
import { Link } from "react-router-dom";


const Gnb = () => {
  const { isLoggedIn } = useAuth();

  return (
    <GnbWrapper>
      <Link to={'/'}><MenuContainer><ICON_HOME /><MenuText>홈</MenuText></MenuContainer></Link>
      <Link to={'/NaggingBoard'}><MenuContainer><ICON_JANSORI /><MenuText>잔소리</MenuText></MenuContainer></Link>
      <Link to={isLoggedIn?'/Editor':'/Login'}><MenuContainer><ICON_WRITE /></MenuContainer></Link>
      <Link to={isLoggedIn?'/Rank':'/Login'}><MenuContainer><ICON_RANK /><MenuText>랭킹</MenuText></MenuContainer></Link>
      <Link to={isLoggedIn?'/MyPage':'/Login'}><MenuContainer><ICON_MYPAGE /><MenuText>마이페이지</MenuText></MenuContainer></Link>
    </GnbWrapper>
  );
};

const GnbWrapper = styled.div`
  user-select: none;
  align-self: stretch;
  height: 63px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0 16px 16px 19px;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 48px;
  height: 48px;
`

const MenuText = styled.span`
  text-align: center;
  letter-spacing: -0.05em;
  font-family: "Noto Sans KR";
  font-weight: 300;
  font-size: 10px;
  color: #212123;
`

export default Gnb;