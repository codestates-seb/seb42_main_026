import { useLocation } from 'react-router-dom';

const OAuthPage = () => {
  const history = useLocation();
  console.log(history);
  //split써보세요
  // window.location.replace('/');
  return <></>;
};

export default OAuthPage;
