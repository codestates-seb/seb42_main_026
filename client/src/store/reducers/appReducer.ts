import { SET_LOADING } from '../constants';

interface AppState {
  isLoading: boolean;
}

const initialState: AppState = {
  isLoading: false,
};

export default function appReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
