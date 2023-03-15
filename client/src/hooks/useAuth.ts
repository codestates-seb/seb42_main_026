import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { login, logout } from '../store/actions';

export function useAuth() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLogin);
  const dispatch = useDispatch();
  const jwt = require('jsonwebtoken');

  const loginHandler = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
        username,
        password,
      });
      const { data } = response;
      console.log(response);
      document.cookie = `accessToken=${response.headers['authorization']}; path=/;`;
      document.cookie = `refreshToken=${response.headers['refresh']}; path=/;`;
      dispatch(login());
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
