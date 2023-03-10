import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { login, logout } from '../store/actions';

export function useAuth() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLogin);
  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(login());
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return { isLoggedIn, loginHandler, logoutHandler };
}