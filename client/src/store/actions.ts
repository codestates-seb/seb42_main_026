import { LOGIN, LOGOUT, SET_LOADING, SET_MODAL, EDITOR_STATE, POST_STATE } from './constants';

interface MenuItem {
  title: string;
  button?: () => void;
}

export const login = () => ({
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setLoading = (isLoading: boolean) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const setModal = (menu: MenuItem[], isOpen: boolean) => ({
  type: SET_MODAL,
  payload: { menu, isOpen },
});

export const setEditor = (title: string, content: string, tag: string, imgFile: File, imgSrc?: string) => ({
  type: EDITOR_STATE,
  payload: {
    title,
    content,
    tag,
    imgFile,
    imgSrc,
  },
});

export const setPostDetail = (memberId: number, questionId: number) => ({
  type: POST_STATE,
  payload: {
    memberId,
    questionId,
  },
});
