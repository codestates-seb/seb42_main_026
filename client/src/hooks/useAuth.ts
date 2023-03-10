import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { login, logout } from '../store/actions';

export function useAuth() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLogin);
  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(login());
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  return { isLoggedIn, loginHandler, logoutHandler };
}