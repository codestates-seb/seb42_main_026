import { SET_MODAL } from '../constants';

interface MenuItem {
  title: string;
  button?: () => void;
}

interface AppState {
  menu: MenuItem[];
  isOpen: boolean;
}

const initialState: AppState = {
  menu: [],
  isOpen: false,
};

export default function modalReducer(state = initialState, action: { type: string; payload: any }) {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        isOpen: action.payload.isOpen,
        menu: action.payload.menu || state.menu,
      };
    default:
      return state;
  }
}
