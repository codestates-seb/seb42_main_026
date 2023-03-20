import { LOGIN, LOGOUT, EDITOR_STATE } from './constants';

export const login = () => ({
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setEditor = (title: string, content: string, tag: string) => ({
  type: EDITOR_STATE,
  payload: {
    title: title,
    content: content,
    tag: tag,
  },
});
