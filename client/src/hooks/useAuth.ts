import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { login, logout } from '../store/actions';

export function useAuth() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLogin);
  const dispatch = useDispatch();

  function decodeJwt(token: string) {
    //jwt 디코딩 코드 나중에 라이브러리로 대체 가능
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  const loginHandler = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
        username,
        password,
      });
      const { data } = response;
      document.cookie = `accessToken=${response.headers['authorization']}; path=/;`;
      document.cookie = `refreshToken=${response.headers['refresh']}; path=/;`;
      const cookieString = document.cookie;
      const cookies = cookieString.split('; ');
      const accessTokenCookie = cookies.find((cookie) => cookie.startsWith('accessToken='));
      if (accessTokenCookie) {
        const accessToken = accessTokenCookie.split('=')[1];
        const decoded = decodeJwt(accessToken);
        console.log(decoded);
        dispatch(login());
        navigate('/');
        alert('로그인 성공!');
      }
      return data;
    } catch (error) {
      console.error(error);
      alert('로그인 실패!');
      return null;
    }
  };

  const logoutHandler = () => {
    document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${process.env.REACT_APP_COOKIE_DOMAIN}; secure; httpOnly;`;
    document.cookie = `refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${process.env.REACT_APP_COOKIE_DOMAIN}; secure; httpOnly;`;
    dispatch(logout());
    navigate('/');
  };

  return { isLoggedIn, loginHandler, logoutHandler };
}
