import { LOGIN, LOGOUT } from '../constants';

export interface AuthState {
  isLogin: boolean;
  value: string;
}

const initialState: AuthState = {
  isLogin: false,
  value: '상태',
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, value: 'LOG IN', isLogin: true };
    case LOGOUT:
      return { ...state, value: 'LOG OUT', isLogin: false };
    default:
      return state;
  }
};

export default authReducer;