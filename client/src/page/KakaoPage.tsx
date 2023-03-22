import { useLocation } from 'react-router-dom';

const KakaoPage = () => {
  const history = useLocation();
  console.log(history.pathname);
  // window.location.replace('/');
  return <></>;
};

export default KakaoPage;
