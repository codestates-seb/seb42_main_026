import { LOGIN, LOGOUT, EDITOR_STATE, POST_STATE } from './constants';

export const login = () => ({
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setEditor = (title: string, content: string, tag: string) => ({
  type: EDITOR_STATE,
  payload: {
    title,
    content,
    tag,
  },
});

export const setPostDetail = (memberId: number, questionId: number) => ({
  type: POST_STATE,
  payload: {
    memberId,
    questionId,
  },
});
