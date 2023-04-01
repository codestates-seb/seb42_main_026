import getCookie from '../../utils/cookieUtils';
import { LOGIN, LOGOUT } from '../constants';
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
