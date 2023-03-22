import { LOGIN, LOGOUT, EDITOR_STATE, POST_STATE } from './constants';

export const login = () => ({
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setEditor = (title: string, content: string, tag: string, imgFile: File) => ({
  type: EDITOR_STATE,
  payload: {
    title,
    content,
    tag,
    imgFile,
  },
});

export const setPostDetail = (memberId: number, questionId: number) => ({
  type: POST_STATE,
  payload: {
    memberId,
    questionId,
  },
});
