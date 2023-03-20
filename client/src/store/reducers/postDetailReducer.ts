import { POST_STATE } from '../constants';

export interface postDetailPage {
  memberId: number;
  questionId: number;
}

const initialState: postDetailPage = {
  memberId: -1,
  questionId: -1,
};

const postDetailReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case POST_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default postDetailReducer;
