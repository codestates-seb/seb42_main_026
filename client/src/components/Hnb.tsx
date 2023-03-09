import { useAuth } from '../hooks/useAuth';

const Hnb = () => {
  const { isLoggedIn, logoutHandler } = useAuth();

  return (
    <div>
        <span>{'로그인 ' + isLoggedIn}</span>
        <button onClick={logoutHandler}>로그아웃</button>
    </div>
  );
};

export default Hnb;