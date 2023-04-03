import getCookie from '../../utils/cookieUtils';
import decodeJwt from '../../utils/jwtUtils';
import { LOGIN, LOGOUT } from '../constants';

function deleteExpiredCookies() {
  const cookies = document.cookie.split(';');
  const now = new Date();

  cookies.forEach((cookie) => {
    const [name, value] = cookie.split('=');
    if (name.trim() === 'accessToken') {
      const decoded = decodeJwt(value);
      const expiresAt = new Date(decoded.exp * 1000);
      if (expiresAt < now) {
        document.cookie = `${name.trim()}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      }
    }
  });
}

deleteExpiredCookies();

const accessToken = getCookie('accessToken');
const refreshToken = getCookie('refreshToken');

export interface AuthState {
  isLogin: boolean;
}

const initialState: AuthState = {
  isLogin: accessToken !== '' && refreshToken !== '',
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLogin: true };
    case LOGOUT:
      return { ...state, isLogin: false };
    default:
      return state;
  }
};

export default authReducer;
