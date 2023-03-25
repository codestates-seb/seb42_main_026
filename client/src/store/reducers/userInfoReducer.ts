import { NICKNAME } from '../constants';

export interface nicknameProps {
  nickname: string;
}

const initialState: nicknameProps = {
  nickname: 'None',
};

const userInfoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case NICKNAME:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default userInfoReducer;
