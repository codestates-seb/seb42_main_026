import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { login, logout } from '../store/actions';

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
      // return data; // 서버에서 발급한 토큰 등의 정보가 담긴 객체
      return dispatch(login());
    } catch (error) {
      console.error(error);
      alert('로그인 실패!');
      return null;
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  return { isLoggedIn, loginHandler, logoutHandler };
}
