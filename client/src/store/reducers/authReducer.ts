import getCookie from '../../utils/cookieUtils';
import decodeJwt from '../../utils/jwtUtils';
import { LOGIN, LOGOUT } from '../constants';

const accessToken = getCookie('accessToken');
const refreshToken = getCookie('refreshToken');

function deleteCookie(name: string, path: string = '/') {
  document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:01 GMT; path=' + path;
}


const now = new Date();

const decoded1 = decodeJwt(accessToken);
const expiresAt1 = new Date(decoded1.exp * 1000);
if (expiresAt1 < now) {
  deleteCookie('accessToken');
}

const decoded2 = decodeJwt(refreshToken);
const expiresAt2 = new Date(decoded2.exp * 1000);
if (expiresAt2 < now) {
  deleteCookie('refreshToken');
}



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
