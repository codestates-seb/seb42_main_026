import { SET_PAGE } from "../constants";

export interface currentPage {
  currentPage: string;
}

const initialState: currentPage = {
  currentPage: "home",
};

const pageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

export default pageReducer;
