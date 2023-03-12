import { LOGIN, LOGOUT,SET_PAGE } from './constants';


export const login = () => ({
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setPage = (page: string) => ({
  type: SET_PAGE,
  payload: page
});

