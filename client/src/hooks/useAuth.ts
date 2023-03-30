import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { login, logout } from '../store/actions';
import decodeJwt from '../utils/jwtUtils';
import getCookie from '../utils/cookieUtils';

export function useAuth() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLogin);
  const dispatch = useDispatch();

  const loginHandler = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
        username,
        password,
      });
      const { data } = response;
      const accessToken = response.headers['authorization'];
      const decodedAccessToken = decodeJwt(accessToken);
      const accessTokenExp = new Date(decodedAccessToken.exp * 1000);
      const refreshToken = response.headers['refresh'];
      const decodedRefreshToken = decodeJwt(refreshToken);
      const refreshTokenExp = new Date(decodedRefreshToken.exp * 1000);

      document.cookie = `accessToken=${accessToken}; path=/; expires=${accessTokenExp};`;
      document.cookie = `refreshToken=${refreshToken}; path=/; expires=${refreshTokenExp};`;
      const cookieString = document.cookie;
      const cookies = cookieString.split('; ');
      const accessTokenCookie = cookies.find((cookie) => cookie.startsWith('accessToken='));
      if (accessTokenCookie) {
        const accessToken = accessTokenCookie.split('=')[1];
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

  const checkTokenExpiration = async () => {
    const accessToken = getCookie('accessToken');
    if (accessToken === '') {
      // 만료되었음
      const refreshToken = getCookie('refreshToken');
      if (refreshToken !== '') {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/refresh`, {
            headers: { Refresh: `${getCookie('refreshToken')}` },
          });
          const accessToken = response.headers['authorization'];
          const decodedAccessToken = decodeJwt(accessToken);
          const accessTokenExp = new Date(decodedAccessToken.exp * 1000);
          const refreshToken = response.headers['refresh'];
          const decodedRefreshToken = decodeJwt(refreshToken);
          const refreshTokenExp = new Date(decodedRefreshToken.exp * 1000);

          document.cookie = `accessToken=${accessToken}; path=/; expires=${accessTokenExp};`;
          document.cookie = `refreshToken=${refreshToken}; path=/; expires=${refreshTokenExp};`;
          const cookieString = document.cookie;
          const cookies = cookieString.split('; ');
          const accessTokenCookie = cookies.find((cookie) => cookie.startsWith('accessToken='));
          if (accessTokenCookie) {
            const accessToken = accessTokenCookie.split('=')[1];
          }
          dispatch(login());
          return true;
        } catch (error) {
          console.error(error);
          dispatch(logout());
          return false;
        }
      } else {
        // 리프레시 토큰이 없음
        return false;
      }
    }
  };

  function deleteCookie(name: string, path: string = '/') {
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:01 GMT; path=' + path;
  }

  const logoutHandler = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    localStorage.removeItem('searchHistory');
    dispatch(logout());
    navigate('/');
  };

  return { isLoggedIn, loginHandler, logoutHandler, checkTokenExpiration };
}
